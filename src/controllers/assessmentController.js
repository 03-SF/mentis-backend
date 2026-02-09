const { Question, Response, Result, Recommendation, User } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const { sendAssessmentResultsEmail, sendAdminAssessmentNotification } = require('../services/emailService');

/**
 * GET /assessment/questions
 * Fetch all active questions without scores
 */
exports.getQuestions = asyncHandler(async (req, res) => {
  console.log('GET /assessment/questions - User:', req.user?._id);
  
  // Fetch all active questions
  const questions = await Question.find({ isActive: true }).lean();
  console.log('Found questions:', questions.length);

  if (!questions || questions.length === 0) {
    throw new ApiError(404, 'No active questions found');
  }

  // Remove scores from options for frontend
  const sanitizedQuestions = questions.map(q => ({
    _id: q._id,
    questionText: q.questionText,
    options: q.options.map(opt => ({
      text: opt.text
    }))
  }));

  // Optional: Randomize order
  const shuffled = sanitizedQuestions.sort(() => Math.random() - 0.5);

  console.log('Returning questions:', shuffled.length);
  res.status(200).json({
    success: true,
    count: shuffled.length,
    data: shuffled
  });
});

/**
 * POST /assessment/submit
 * Submit test answers, compute scores, save results
 */
exports.submitTest = asyncHandler(async (req, res) => {
  const { answers, preferences } = req.body;
  const userId = req.user._id;

  console.log('Submit assessment - User ID:', userId);
  console.log('Submit assessment - Answers count:', answers?.length);
  console.log('Submit assessment - Preferences:', preferences);

  // Validation: Check answers array
  if (!answers || !Array.isArray(answers) || answers.length === 0) {
    throw new ApiError(400, 'Answers are required');
  }

  // Save preferences to user profile if provided
  if (preferences) {
    const { User } = require('../models');
    await User.findByIdAndUpdate(userId, {
      preferences: {
        comfortableWithPhysicalWork: preferences.comfortableWithPhysicalWork,
        wantsUniversityDegree: preferences.wantsUniversityDegree,
        openToVocationalCareers: preferences.openToVocationalCareers
      }
    });
    console.log('User preferences saved');
  }

  // Fetch all active questions
  const questions = await Question.find({ isActive: true });
  console.log('Active questions count:', questions.length);
  
  if (answers.length !== questions.length) {
    throw new ApiError(400, `You must answer all ${questions.length} questions`);
  }

  // Create question lookup map
  const questionMap = new Map();
  questions.forEach(q => {
    questionMap.set(q._id.toString(), q);
  });

  // Validate all question IDs and option indexes
  for (const answer of answers) {
    const question = questionMap.get(answer.questionId);
    if (!question) {
      console.error('Invalid question ID:', answer.questionId);
      throw new ApiError(400, `Invalid question ID: ${answer.questionId}`);
    }
    if (answer.selectedOptionIndex < 0 || answer.selectedOptionIndex >= question.options.length) {
      throw new ApiError(400, `Invalid option index for question ${answer.questionId}`);
    }
  }

  // Compute raw scores per category
  const rawScores = { A: 0, C: 0, S: 0, P: 0 };
  const maxScores = { A: 0, C: 0, S: 0, P: 0 };

  answers.forEach((answer, index) => {
    const question = questionMap.get(answer.questionId);
    const selectedOption = question.options[answer.selectedOptionIndex];
    const category = question.category;
    
    console.log(`Q${index + 1}: Category=${category}, Selected score=${selectedOption.score}`);
    
    rawScores[category] += selectedOption.score;
    
    // Track max possible score per category
    const maxOptionScore = Math.max(...question.options.map(opt => opt.score));
    maxScores[category] += maxOptionScore;
  });

  console.log('Raw scores by category:', rawScores);
  console.log('Max scores by category:', maxScores);

  // Normalize scores to 0-100
  const normalizedScores = {};
  Object.keys(rawScores).forEach(cat => {
    normalizedScores[cat] = maxScores[cat] > 0 
      ? Math.round((rawScores[cat] / maxScores[cat]) * 100)
      : 0;
  });

  console.log('Normalized scores:', normalizedScores);

  try {
    // Save response
    const response = await Response.create({
      userId,
      answers: answers.map(a => ({
        questionId: a.questionId,
        selectedOptionIndex: a.selectedOptionIndex
      })),
      submittedAt: new Date()
    });

    console.log('Response saved:', response._id);

    // Save result
    const result = await Result.create({
      userId,
      scores: rawScores,
      normalizedScores
    });

    console.log('Result saved:', result._id);
    
    // Delete any existing recommendations so they regenerate with new scores
    const { Recommendation } = require('../models');
    await Recommendation.deleteMany({ userId });
    console.log('Deleted old recommendations for user');

    // Get user details for email
    const user = await User.findById(userId);
    
    // Send assessment results email asynchronously (don't block response)
    if (user && user.email) {
      // Note: In a real implementation, you would generate the PDF here on the backend
      // For now, we'll send email without PDF attachment
      sendAssessmentResultsEmail(user.name, user.email, null).catch(err => {
        console.error('Failed to send assessment results email:', err);
      });

      // Notify admin of assessment completion
      sendAdminAssessmentNotification(
        user.name, 
        user.email, 
        userId.toString(), 
        result._id.toString()
      ).catch(err => {
        console.error('Failed to send admin assessment notification:', err);
      });
    }

    res.status(201).json({
      success: true,
      message: 'Assessment submitted successfully',
      data: {
        responseId: response._id,
        resultId: result._id,
        scores: rawScores,
        normalizedScores
      }
    });
  } catch (dbError) {
    console.error('Database error while saving:', dbError);
    throw new ApiError(500, `Failed to save assessment: ${dbError.message}`);
  }
});

/**
 * GET /assessment/result
 * Get user's latest assessment result
 */
exports.getResult = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const result = await Result.findOne({ userId }).sort({ createdAt: -1 });

  if (!result) {
    throw new ApiError(404, 'No assessment result found. Please take the assessment first.');
  }

  res.status(200).json({
    success: true,
    data: result
  });
});

/**
 * GET /assessment/results/all
 * Get all assessment results for current user
 */
exports.getAllResults = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const results = await Result.find({ userId }).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: results.length,
    data: results
  });
});

/**
 * GET /assessment/result/:resultId
 * Get a specific assessment result by ID
 */
exports.getResultById = asyncHandler(async (req, res) => {
  const { resultId } = req.params;
  const userId = req.user._id;

  const result = await Result.findOne({ _id: resultId, userId });

  if (!result) {
    throw new ApiError(404, 'Result not found or you do not have permission to view it');
  }

  res.status(200).json({
    success: true,
    data: result
  });
});

/**
 * DELETE /assessment/result/:resultId
 * Delete a specific assessment result permanently
 */
exports.deleteResult = asyncHandler(async (req, res) => {
  const { resultId } = req.params;
  const userId = req.user._id;

  // Check if result exists and belongs to user
  const result = await Result.findOne({ _id: resultId, userId });

  if (!result) {
    throw new ApiError(404, 'Result not found or you do not have permission to delete it');
  }

  // Delete the result
  await Result.deleteOne({ _id: resultId });

  // Also delete associated recommendations
  await Recommendation.deleteMany({ userId, createdAt: { $gte: result.createdAt } });

  res.status(200).json({
    success: true,
    message: 'Result deleted successfully'
  });
});
