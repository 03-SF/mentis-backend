const { Result, Recommendation, Profile } = require('../models');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const CAREER_MAPPING = require('./careerMappingData');

// Category full names for display
const CATEGORY_NAMES = {
  A: 'Analytical',
  C: 'Creative',
  S: 'Social',
  P: 'Practical'
};

/**
 * GET /recommendation/:userId (or current user)
 * Generate and return career recommendations with weighted confidence scores
 */
exports.getRecommendation = asyncHandler(async (req, res) => {
  const userId = req.params.userId || req.user._id.toString();

  // Authorization check: Users can only access their own recommendations
  if (userId !== req.user._id.toString() && req.user.role !== 'admin') {
    throw new ApiError(403, 'You can only access your own recommendations');
  }

  // Fetch user's LATEST result
  const result = await Result.findOne({ userId }).sort({ createdAt: -1 });
  if (!result) {
    throw new ApiError(404, 'No assessment result found. Please take the assessment first.');
  }

  // Fetch user preferences for career feasibility filtering
  const { User } = require('../models');
  const user = await User.findById(userId).select('preferences');
  const userPreferences = user?.preferences || {};

  // Check if recommendation already exists
  let recommendation = await Recommendation.findOne({ userId });
  
  // Check if there's a newer result than the recommendation
  if (recommendation) {
    const latestResult = await Result.findOne({ userId }).sort({ createdAt: -1 });
    if (latestResult && latestResult.createdAt > recommendation.createdAt) {
      // Delete old recommendation, we'll generate a new one
      await Recommendation.deleteOne({ userId });
      recommendation = null;
    }
  }
  
  if (recommendation) {
    // Return existing recommendation
    return res.status(200).json({
      success: true,
      data: {
        topCategories: recommendation.topCategories,
        categoryNames: recommendation.topCategories.map(c => CATEGORY_NAMES[c]),
        recommendedCareers: recommendation.recommendedCareers,
        normalizedScores: result.normalizedScores
      }
    });
  }

  // Generate new recommendation
  const { normalizedScores } = result;
  
  console.log('Normalized scores from result:', normalizedScores);

  // Sort categories by score (descending)
  const sortedCategories = Object.entries(normalizedScores)
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0]);
  
  console.log('Sorted categories:', sortedCategories);

  // Select top 3 categories (considering scores above 60%)
  const topCategories = sortedCategories.filter((cat, idx) => 
    idx < 3 && normalizedScores[cat] >= 60
  );
  
  // If less than 2 categories above 60%, take top 2 anyway
  if (topCategories.length < 2) {
    topCategories.push(...sortedCategories.filter(cat => !topCategories.includes(cat)).slice(0, 2 - topCategories.length));
  }
  
  console.log('Top categories selected:', topCategories);

  // NEW WEIGHTED SCORING SYSTEM WITH DOMINANCE WEIGHTING
  // Match careers using category weights
  const matchedCareers = [];
  
  // Calculate dominance multipliers (top categories get more weight)
  const dominanceMultipliers = {
    [sortedCategories[0]]: 1.0,   // Top category: full weight
    [sortedCategories[1]]: 0.85,  // 2nd: 85%
    [sortedCategories[2]]: 0.7,   // 3rd: 70%
    [sortedCategories[3]]: 0.6    // 4th: 60%
  };
  
  for (const [careerName, careerData] of Object.entries(CAREER_MAPPING)) {
    const { weights, environment, pace } = careerData;
    
    // STEP 1: Calculate weighted fit score with dominance multiplier
    // fitScore = Σ(userScore × careerWeight × dominanceMultiplier)
    let fitScore = 0;
    const categories = ['S', 'A', 'P', 'C'];
    
    for (const category of categories) {
      const userScore = normalizedScores[category] || 0;
      const careerWeight = weights[category] || 0;
      const dominanceMultiplier = dominanceMultipliers[category] || 0.6;
      fitScore += (userScore * careerWeight * dominanceMultiplier);
    }
    
    // STEP 2: Identify which categories are most important for this career
    const importantCategories = Object.entries(weights)
      .filter(([cat, weight]) => weight >= 0.3)
      .map(([cat, weight]) => ({ 
        category: cat, 
        weight, 
        userScore: normalizedScores[cat] || 0 
      }))
      .sort((a, b) => b.weight - a.weight);
    
    // STEP 3: Generate detailed, explainable recommendation text
    const topRequirements = importantCategories.slice(0, 2);
    
    // Build sophisticated "why this career" explanation
    let whyThisCareer = '';
    let reason = ''; // Legacy field for backward compatibility
    
    if (topRequirements.length > 0) {
      const strongCategories = topRequirements.filter(r => r.userScore >= 60);
      const allTopCategories = topRequirements.map(r => ({ 
        name: CATEGORY_NAMES[r.category], 
        score: r.userScore,
        weight: r.weight 
      }));
      
      // Generate context-aware explanation
      if (strongCategories.length === 2) {
        // Both required categories are strong
        const cat1 = allTopCategories[0];
        const cat2 = allTopCategories[1];
        
        if (cat1.weight >= 0.5) {
          whyThisCareer = `This career strongly aligns with your ${cat1.name} abilities (${cat1.score}%), ` +
                          `with valuable support from your ${cat2.name} skills (${cat2.score}%). ` +
                          `Both are essential for success in this field.`;
        } else {
          whyThisCareer = `Your ${cat1.name} (${cat1.score}%) and ${cat2.name} (${cat2.score}%) ` +
                          `scores indicate strong potential for this career, which requires balanced skills in both areas.`;
        }
        reason = `Recommended because your ${cat1.name} and ${cat2.name} scores are strong`;
        
      } else if (strongCategories.length === 1) {
        // One strong, one moderate (or just one strong)
        const strong = allTopCategories.find(c => c.score >= 60);
        const moderate = allTopCategories.find(c => c.score < 60);
        
        if (strong && moderate) {
          whyThisCareer = `This career is recommended primarily for your strong ${strong.name} skills (${strong.score}%). ` +
                          `Your ${moderate.name} abilities (${moderate.score}%), while moderate, provide useful complementary skills.`;
          reason = `Recommended because your ${strong.name} scores are strong`;
        } else if (strong) {
          whyThisCareer = `Your exceptional ${strong.name} abilities (${strong.score}%) make you well-suited for this career path, ` +
                          `which heavily emphasizes these skills.`;
          reason = `Recommended because your ${strong.name} scores are strong`;
        } else {
          // Fallback if no strong category found
          const cat1 = allTopCategories[0];
          whyThisCareer = `This career aligns with your ${cat1.name} abilities (${cat1.score}%).`;
          reason = `Aligns with ${cat1.name} (${cat1.score}%)`;
        }
        
      } else {
        // Both moderate - still aligned but less confident
        const cat1 = allTopCategories[0];
        const cat2 = allTopCategories[1];
        
        if (cat1 && cat2) {
          whyThisCareer = `This career aligns with your ${cat1.name} (${cat1.score}%) and ${cat2.name} (${cat2.score}%) profile. ` +
                          `While these scores are moderate, they match the skill requirements for this field. ` +
                          `Consider developing these areas further.`;
          reason = `Aligns with ${cat1.name} (${cat1.score}%), ${cat2.name} (${cat2.score}%)`;
        } else if (cat1) {
          whyThisCareer = `This career aligns with your ${cat1.name} (${cat1.score}%) profile.`;
          reason = `Aligns with ${cat1.name} (${cat1.score}%)`;
        }
      }
    } else {
      // Fallback for careers with no dominant requirements
      const userTopCategories = sortedCategories.slice(0, 2).map(cat => 
        `${CATEGORY_NAMES[cat]} (${normalizedScores[cat]}%)`
      ).join(' and ');
      
      whyThisCareer = `This career offers a good general fit based on your overall profile, ` +
                      `particularly your ${userTopCategories}. It provides diverse opportunities that match your balanced skill set.`;
      reason = `General fit based on overall profile`;
    }
    
    matchedCareers.push({
      career: careerName,
      fitScore,
      importantCategories,
      whyThisCareer,
      reason, // Keep for backward compatibility
      environment,
      pace
    });
  }
  
  // STEP 3.5: Apply career feasibility filters based on user preferences
  // Soft vetoes: reduce scores for careers that don't match practical preferences
  console.log('Applying preferences-based feasibility filters...');
  console.log('User preferences:', userPreferences);
  
  const PHYSICAL_WORK_CAREERS = [
    'Armed Forces', 'Naval Services', 'Aviation & Pilot (Military)',
    'Agriculture & Farming', 'Veterinary Medicine', 'Agricultural Engineering',
    'Mining Engineering', 'Petroleum Engineering', 'Civil Engineering',
    'Construction Management', 'Forestry', 'Plumbing', 'Electrical Work',
    'Carpentry & Woodworking', 'Welding', 'Automotive Technician',
    'HVAC Technician', 'Landscape Architecture', 'Sports & Athletics',
    'Adventure Tourism', 'Wildlife Conservation'
  ];
  
  const DEGREE_REQUIRED_CAREERS = [
    'Medicine & Surgery', 'Dentistry', 'Pharmacy', 'Nursing', 'Veterinary Medicine',
    'Law & Legal Practice', 'Corporate Law', 'Civil Engineering', 'Mechanical Engineering',
    'Electrical Engineering', 'Software Engineering', 'Chemical Engineering',
    'Biomedical Engineering', 'Aerospace Engineering', 'Architecture',
    'University Professor', 'Chartered Accountancy', 'Investment Banking',
    'Civil Services (CSS/PMS)', 'International Relations', 'Data Science & Analytics',
    'Artificial Intelligence & ML', 'Cybersecurity', 'Psychology & Counseling'
  ];
  
  const VOCATIONAL_CAREERS = [
    'Plumbing', 'Electrical Work', 'Carpentry & Woodworking', 'Welding',
    'Automotive Technician', 'HVAC Technician', 'Cosmetology & Beauty',
    'Chef & Culinary Arts', 'Medical Laboratory Technology', 'Radiology & Imaging',
    'Physical Therapy', 'Occupational Therapy', 'Graphic Design',
    'Web Development', 'Mobile App Development', 'Photography & Videography',
    'Fashion Design', 'Interior Design', 'Animation & VFX'
  ];
  
  for (const career of matchedCareers) {
    let scoreMultiplier = 1.0;
    const adjustments = [];
    
    // Filter 1: Physical outdoor work preference
    if (userPreferences.comfortableWithPhysicalWork === false) {
      if (PHYSICAL_WORK_CAREERS.includes(career.career) || 
          career.environment?.includes('outdoor')) {
        scoreMultiplier *= 0.65; // Reduce score by 35%
        adjustments.push('physical work mismatch (-35%)');
      }
    }
    
    // Filter 2: University degree preference
    if (userPreferences.wantsUniversityDegree === false) {
      if (DEGREE_REQUIRED_CAREERS.includes(career.career)) {
        scoreMultiplier *= 0.70; // Reduce score by 30%
        adjustments.push('degree requirement mismatch (-30%)');
      }
    }
    
    // Filter 3: Vocational careers preference
    if (userPreferences.openToVocationalCareers === false) {
      if (VOCATIONAL_CAREERS.includes(career.career)) {
        scoreMultiplier *= 0.75; // Reduce score by 25%
        adjustments.push('vocational path mismatch (-25%)');
      }
    }
    
    // Boost careers that match positive preferences
    if (userPreferences.comfortableWithPhysicalWork === true) {
      if (PHYSICAL_WORK_CAREERS.includes(career.career) || 
          career.environment?.includes('outdoor')) {
        scoreMultiplier *= 1.05; // Boost by 5%
        adjustments.push('physical work preference match (+5%)');
      }
    }
    
    if (userPreferences.openToVocationalCareers === true) {
      if (VOCATIONAL_CAREERS.includes(career.career)) {
        scoreMultiplier *= 1.05; // Boost by 5%
        adjustments.push('vocational preference match (+5%)');
      }
    }
    
    // Apply multiplier
    if (scoreMultiplier !== 1.0) {
      const originalScore = career.fitScore;
      career.fitScore *= scoreMultiplier;
      console.log(`${career.career}: ${Math.round(originalScore)} → ${Math.round(career.fitScore)} (${adjustments.join(', ')})`);
    }
  }
  
  // Sort by fit score (highest first)
  matchedCareers.sort((a, b) => b.fitScore - a.fitScore);
  
  console.log('All careers count:', matchedCareers.length);
  
  // FIX: Apply minimum fit score cutoff to reduce noise
  // Only keep careers in top 20% OR with fitScore >= 45
  const cutoffIndex = Math.ceil(matchedCareers.length * 0.20);
  const minimumFitScore = 45;
  
  const qualifiedCareers = matchedCareers.filter((career, index) => 
    index < cutoffIndex || career.fitScore >= minimumFitScore
  );
  
  console.log('Qualified careers after cutoff:', qualifiedCareers.length);
  
  // STEP 4: Calculate RELATIVE confidence based on score gaps and position
  for (let i = 0; i < qualifiedCareers.length; i++) {
    const career = qualifiedCareers[i];
    
    // Base confidence: how strong are the user's scores in important categories?
    let baseConfidence = 0;
    let totalWeight = 0;
    
    career.importantCategories.forEach(item => {
      // If user score is high in important category, boost confidence
      const scoreContribution = (item.userScore / 100) * item.weight;
      baseConfidence += scoreContribution * 100;
      totalWeight += item.weight;
    });
    
    if (totalWeight > 0) {
      baseConfidence = baseConfidence / totalWeight;
    } else {
      baseConfidence = career.fitScore * 0.7; // Fallback
    }
    
    // Gap-based confidence adjustment (relative to position)
    let gapAdjustment = 0;
    let confidenceLabel = 'Moderate Match';
    
    if (i === 0) {
      // Top recommendation: check gap to 2nd
      if (qualifiedCareers.length > 1) {
        const gap = career.fitScore - qualifiedCareers[1].fitScore;
        if (gap > 5) {
          gapAdjustment = 15;  // Clear winner
          confidenceLabel = 'Strong Match';
        } else if (gap > 2) {
          gapAdjustment = 8;  // Leading
          confidenceLabel = 'Strong Match';
        } else {
          gapAdjustment = 3;  // Close race
          confidenceLabel = 'Moderate Match';
        }
      } else {
        confidenceLabel = 'Strong Match';
      }
    } else if (i < 5) {
      // Top 5: check gap from top
      const gapFromTop = qualifiedCareers[0].fitScore - career.fitScore;
      if (gapFromTop < 3) {
        gapAdjustment = 0;  // Very close to top
        confidenceLabel = 'Moderate Match';
      } else if (gapFromTop < 6) {
        gapAdjustment = -5;  // Somewhat behind
        confidenceLabel = 'Moderate Match';
      } else {
        gapAdjustment = -10;  // Further behind
        confidenceLabel = 'Exploratory Option';
      }
    } else {
      // Beyond top 5: exploratory
      gapAdjustment = -15;
      confidenceLabel = 'Exploratory Option';
    }
    
    // Final confidence calculation
    let confidence = baseConfidence + gapAdjustment;
    confidence = Math.max(50, Math.min(90, confidence));  // Clamp between 50-90%
    
    career.confidence = Math.round(confidence);
    career.confidenceLabel = confidenceLabel;
  }
  
  console.log('Top 5 scores:', qualifiedCareers.slice(0, 5).map(c => ({ 
    career: c.career, 
    score: Math.round(c.fitScore), 
    confidence: c.confidence,
    label: c.confidenceLabel
  })));

  // Optional: Filter by education level from profile
  let filteredCareers = qualifiedCareers;
  
  try {
    const profile = await Profile.findOne({ user: userId });
    if (profile && profile.educationLevel) {
      // Example filtering logic (can be expanded)
      if (profile.educationLevel === 'high-school') {
        // Exclude careers requiring advanced degrees
        filteredCareers = matchedCareers.filter(c => 
          !c.career.includes('Medicine') && !c.career.includes('Law')
        );
      }
    }
  } catch (err) {
    // Profile doesn't exist, use all matched careers
    console.log('No profile found, using all matched careers');
  }

  // Limit to top 10 careers with full details
  const topCareers = filteredCareers.slice(0, 10);
  
  // Format recommendations with confidence scores and explanations
  const detailedRecommendations = topCareers.map(c => ({
    career: c.career,
    fitScore: Math.round(c.fitScore),
    confidence: `${c.confidence}%`,
    confidenceLabel: c.confidenceLabel,
    whyThisCareer: c.whyThisCareer,
    reason: c.reason,  // Keep for backward compatibility
    environment: c.environment,
    pace: c.pace
  }));
  
  // Also keep simple list for backward compatibility
  const recommendedCareers = topCareers.slice(0, 5).map(c => c.career);
  
  console.log('Recommended careers:', recommendedCareers);
  console.log('Top categories:', topCategories);

  // Save recommendation
  recommendation = await Recommendation.create({
    userId,
    topCategories,
    recommendedCareers
  });

  res.status(200).json({
    success: true,
    data: {
      topCategories,
      categoryNames: topCategories.map(c => CATEGORY_NAMES[c]),
      recommendedCareers,  // Simple list (top 5)
      detailedRecommendations,  // Full details with confidence (top 10)
      normalizedScores
    }
  });
});

/**
 * GET /recommendation/all (Admin only)
 * Get all recommendations
 */
exports.getAllRecommendations = asyncHandler(async (req, res) => {
  if (req.user.role !== 'admin') {
    throw new ApiError(403, 'Admin access required');
  }

  const recommendations = await Recommendation.find()
    .populate('userId', 'firstName lastName email')
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: recommendations.length,
    data: recommendations
  });
});
