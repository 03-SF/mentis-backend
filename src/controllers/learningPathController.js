const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');

// Initialize Gemini API (Google Generative AI)
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize the Gemini API with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

/**
 * @desc    Generate learning paths for a specific career using Gemini API
 * @route   POST /api/learning-path/generate
 * @access  Private
 */
exports.generateLearningPath = asyncHandler(async (req, res) => {
  const { career, userLevel, countryContext } = req.body;

  // Validation
  if (!career) {
    throw new ApiError(400, 'Career is required');
  }

  // Default values
  const level = userLevel || 'Grade 10 / O Levels';
  const context = countryContext || 'Generic / Global';

  console.log(`Generating learning path for: ${career}`);

  // Build the prompt for Gemini
  const prompt = `You are a career guidance system.

The student has completed Grade 10 / O-Levels.

Career target: "${career}"

Provide exactly 3 different learning paths to reach this career.

IMPORTANT GUIDELINES:
- Each path MUST have a clear one-line summary (under 100 characters)
- Split duration into phases: intermediate_duration + degree_duration
- Group skills into categories for better UI rendering
- Include concrete, actionable skills with specific tools/techniques
- For Digital/Entrepreneurial paths, include learning timelines and milestones
- NO emojis in JSON data
- Keep structure JSON-friendly for frontend parsing

Each learning path MUST include:
1. path_name: Name of the path (e.g., "Academic & Theoretical Mastery")
2. summary: One-line description under 100 characters
3. intermediate_duration: Time for intermediate phase (e.g., "1-2 years")
4. degree_duration: Time for degree/diploma phase (e.g., "3-4 years")
5. intermediate_phase: Post-Grade 10 subjects/courses (array of strings)
6. degree_or_diploma_options: Available qualifications (array of strings)
7. skills_grouped: Object with categorized skills:
   - technical_tools: Array of specific software/tools
   - core_skills: Array of fundamental domain skills
   - business_skills: Array of marketing/entrepreneurial skills (if applicable)
8. entry_level_roles: Realistic starting positions (array of strings)

Return STRICT JSON only.
Do NOT include explanations, markdown, emojis, or extra text.

Expected JSON format:
{
  "career": "${career}",
  "location": "${context}",
  "disclaimer": "Learning paths are advisory. Duration and options may vary by institution, region, and personal circumstances.",
  "paths": [
    {
      "path_name": "Academic & Theoretical Mastery",
      "summary": "Build strong fundamentals and research skills for professional careers",
      "intermediate_duration": "1-2 years",
      "degree_duration": "3-4 years",
      "intermediate_phase": [
        "A-Levels (Subject 1, Subject 2, Subject 3)",
        "Foundation course in relevant field"
      ],
      "degree_or_diploma_options": [
        "Bachelor degree option 1",
        "Bachelor degree option 2",
        "Master's degree option"
      ],
      "skills_grouped": {
        "core_skills": [
          "Domain skill 1",
          "Domain skill 2",
          "Domain skill 3"
        ],
        "technical_tools": [
          "Software/Tool 1",
          "Software/Tool 2"
        ],
        "business_skills": [
          "Business skill 1",
          "Business skill 2"
        ]
      },
      "entry_level_roles": [
        "Entry-level role 1",
        "Entry-level role 2",
        "Entry-level role 3"
      ]
    },
    {
      "path_name": "Vocational & Practical Specialization",
      "summary": "Hands-on skill building in specific discipline",
      "intermediate_duration": "6 months-1 year",
      "degree_duration": "2-3 years",
      "intermediate_phase": [
        "Vocational program 1",
        "Short certificate course 2"
      ],
      "degree_or_diploma_options": [
        "Diploma option 1",
        "Advanced certificate option 2"
      ],
      "skills_grouped": {
        "core_skills": [
          "Practical skill 1",
          "Practical skill 2"
        ],
        "technical_tools": [
          "Tool 1",
          "Tool 2"
        ],
        "business_skills": [
          "Client management",
          "Portfolio building"
        ]
      },
      "entry_level_roles": [
        "Practical role 1",
        "Practical role 2"
      ]
    },
    {
      "path_name": "Digital & Entrepreneurial Focus",
      "summary": "Digital skills and self-directed career building",
      "intermediate_duration": "6 months-1 year per skill",
      "degree_duration": "2-4 years (flexible, online)",
      "intermediate_phase": [
        "A-Levels (Digital/Business subjects)",
        "Online courses in digital tools",
        "Self-taught learning milestones: Build portfolio (3-6 months) → Get first client (6-12 months) → Scale online presence (1-2 years)"
      ],
      "degree_or_diploma_options": [
        "Online certifications",
        "Digital degree option",
        "Self-paced MOOCs"
      ],
      "skills_grouped": {
        "core_skills": [
          "Core digital skill 1",
          "Core digital skill 2"
        ],
        "technical_tools": [
          "Digital tool 1",
          "Digital tool 2",
          "Digital tool 3"
        ],
        "business_skills": [
          "Personal branding",
          "Online marketing",
          "Freelance client management"
        ]
      },
      "entry_level_roles": [
        "Freelance role 1",
        "Digital role 2",
        "Self-employed option"
      ]
    }
  ]
}`;

  try {
    // Call Gemini API using SDK with gemini-2.5-flash
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini API response received');

    // Parse the JSON response
    let learningPaths;
    try {
      // Remove markdown code blocks if present
      let cleanedText = text.trim();
      if (cleanedText.startsWith('```json')) {
        cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
      } else if (cleanedText.startsWith('```')) {
        cleanedText = cleanedText.replace(/```\n?/g, '');
      }
      
      learningPaths = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('Failed to parse Gemini response:', text);
      throw new ApiError(500, 'Failed to parse AI response. Please try again.');
    }

    // Validate the response structure
    if (!learningPaths.paths || !Array.isArray(learningPaths.paths)) {
      throw new ApiError(500, 'Invalid response format from AI');
    }

    // Return the structured learning paths
    res.status(200).json({
      success: true,
      data: {
        career: learningPaths.career || career,
        userLevel: level,
        countryContext: context,
        paths: learningPaths.paths,
        generatedAt: new Date().toISOString()
      }
    });

  } catch (error) {
    console.error('Gemini API error:', error);
    
    // Check for rate limit error (429)
    if (error.message && (error.message.includes('429') || error.message.includes('quota') || error.message.includes('Too Many Requests'))) {
      return res.status(429).json({
        success: false,
        error: 'API Rate Limit Exceeded',
        message: 'The AI service has reached its daily limit. Please try again in 24 hours or contact support for increased quota.',
        retryAfter: '24 hours',
        fallbackAvailable: true
      });
    }
    
    // If Gemini API is not available, return fallback paths
    if (error.message && error.message.includes('API key')) {
      console.log('Gemini API key not configured, using fallback');
      return res.status(200).json({
        success: true,
        data: {
          career,
          userLevel: level,
          countryContext: context,
          paths: getFallbackPaths(career),
          generatedAt: new Date().toISOString(),
          note: 'Fallback data - Gemini API not configured'
        }
      });
    }

    throw new ApiError(500, error.message || 'Failed to generate learning paths');
  }
});

/**
 * Fallback learning paths when Gemini API is not available
 */
function getFallbackPaths(career) {
  return [
    {
      type: 'Academic Path',
      description: 'Traditional educational route through formal degrees',
      duration: '4-6 years',
      steps: [
        `Choose relevant subjects in A Levels related to ${career}`,
        `Pursue Bachelor's degree in ${career} or related field`,
        'Complete internships during degree program',
        `Start entry-level position in ${career}`
      ]
    },
    {
      type: 'Skill-Based Path',
      description: 'Focus on practical skills and portfolio building',
      duration: '1-2 years',
      steps: [
        `Learn fundamental skills for ${career} through online courses`,
        'Practice with real-world projects',
        'Build a professional portfolio',
        'Apply for freelance or entry-level positions'
      ]
    },
    {
      type: 'Hybrid Path',
      description: 'Combination of formal education and practical skills',
      duration: '2-3 years',
      steps: [
        `Complete short diploma or certification in ${career}`,
        'Take online skill courses to supplement knowledge',
        'Gain practical experience through internships',
        'Start career with combined credentials'
      ]
    }
  ];
}

