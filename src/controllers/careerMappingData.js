// Comprehensive career mapping with weighted scoring
// Structure: { weights: {S, A, P, C}, environment: [], pace: [] }
// weights: Each category (S, A, P, C) has a weight (0.0 to 1.0), sum should be ~1.0
// Higher weight = more important for that career

module.exports = {
  // ============ HEALTHCARE & MEDICINE ============
  'Medicine & Surgery': { weights: { S: 0.4, A: 0.4, P: 0.2, C: 0.0 }, environment: ['office'], pace: ['fast'] },
  'Dentistry': { weights: { S: 0.35, A: 0.25, P: 0.4, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'Pharmacy': { weights: { S: 0.3, A: 0.5, P: 0.2, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'Nursing': { weights: { S: 0.5, A: 0.0, P: 0.5, C: 0.0 }, environment: ['office'], pace: ['fast'] },
  'Veterinary Medicine': { weights: { S: 0.35, A: 0.35, P: 0.3, C: 0.0 }, environment: ['office', 'outdoor'], pace: ['routine'] },
  'Physical Therapy': { weights: { S: 0.4, A: 0.0, P: 0.6, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'Occupational Therapy': { weights: { S: 0.4, A: 0.0, P: 0.6, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'Medical Laboratory Technology': { weights: { S: 0.0, A: 0.6, P: 0.4, C: 0.0 }, environment: ['workshop'], pace: ['routine'] },
  'Radiology & Imaging': { weights: { S: 0.0, A: 0.6, P: 0.4, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'Public Health': { weights: { S: 0.4, A: 0.6, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'Nutrition & Dietetics': { weights: { S: 0.4, A: 0.6, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  
  // ============ ENGINEERING ============
  'Civil Engineering': { weights: { S: 0.0, A: 0.55, P: 0.45, C: 0.0 }, environment: ['office', 'outdoor'], pace: ['project'] },
  'Mechanical Engineering': { weights: { S: 0.0, A: 0.55, P: 0.45, C: 0.0 }, environment: ['office', 'workshop'], pace: ['project'] },
  'Electrical Engineering': { weights: { S: 0.0, A: 0.55, P: 0.45, C: 0.0 }, environment: ['office', 'workshop'], pace: ['project'] },
  'Software Engineering': { weights: { S: 0.0, A: 0.6, P: 0.4, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  'Chemical Engineering': { weights: { S: 0.0, A: 0.6, P: 0.4, C: 0.0 }, environment: ['workshop'], pace: ['project'] },
  'Petroleum Engineering': { weights: { S: 0.0, A: 0.55, P: 0.45, C: 0.0 }, environment: ['outdoor', 'workshop'], pace: ['project'] },
  'Biomedical Engineering': { weights: { S: 0.15, A: 0.55, P: 0.3, C: 0.0 }, environment: ['workshop'], pace: ['project'] },
  'Aerospace Engineering': { weights: { S: 0.0, A: 0.55, P: 0.45, C: 0.0 }, environment: ['office', 'workshop'], pace: ['project'] },
  'Environmental Engineering': { weights: { S: 0.0, A: 0.6, P: 0.4, C: 0.0 }, environment: ['outdoor', 'office'], pace: ['project'] },
  'Industrial Engineering': { weights: { S: 0.0, A: 0.55, P: 0.45, C: 0.0 }, environment: ['office', 'workshop'], pace: ['project'] },
  'Agricultural Engineering': { weights: { S: 0.0, A: 0.55, P: 0.45, C: 0.0 }, environment: ['outdoor', 'workshop'], pace: ['project'] },
  'Textile Engineering': { weights: { S: 0.0, A: 0.5, P: 0.35, C: 0.15 }, environment: ['workshop'], pace: ['project'] },
  'Mining Engineering': { weights: { S: 0.0, A: 0.5, P: 0.5, C: 0.0 }, environment: ['outdoor', 'workshop'], pace: ['project'] },
  'Nuclear Engineering': { weights: { S: 0.0, A: 0.6, P: 0.4, C: 0.0 }, environment: ['workshop'], pace: ['project'] },
  
  // ============ TECHNOLOGY & IT ============
  'Information Technology': { weights: { S: 0.0, A: 0.7, P: 0.3, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  'Computer Science': { weights: { S: 0.0, A: 0.6, P: 0.4, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  'Data Science & Analytics': { weights: { S: 0.0, A: 1.0, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  'Cybersecurity': { weights: { S: 0.0, A: 0.6, P: 0.4, C: 0.0 }, environment: ['office'], pace: ['fast'] },
  'Web Development': { weights: { S: 0.0, A: 0.6, P: 0.3, C: 0.1 }, environment: ['office'], pace: ['flexible'] },
  'Mobile App Development': { weights: { S: 0.0, A: 0.6, P: 0.3, C: 0.1 }, environment: ['office'], pace: ['flexible'] },
  'Artificial Intelligence & ML': { weights: { S: 0.0, A: 1.0, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['project'] },
  'Game Development': { weights: { S: 0.0, A: 0.5, P: 0.3, C: 0.2 }, environment: ['office', 'studio'], pace: ['project'] },
  
  // ============ BUSINESS & FINANCE ============
  'Banking & Finance': { weights: { S: 0.2, A: 0.8, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['fast'] },
  'Accounting & Chartered Accountancy': { weights: { S: 0.0, A: 1.0, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'Business Administration': { weights: { S: 0.5, A: 0.5, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['fast'] },
  'Marketing & Sales': { weights: { S: 0.5, A: 0.0, P: 0.0, C: 0.5 }, environment: ['office'], pace: ['fast'] },
  'Human Resources Management': { weights: { S: 0.6, A: 0.4, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'Investment Banking': { weights: { S: 0.15, A: 0.85, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['fast'] },
  'Insurance & Actuarial Science': { weights: { S: 0.0, A: 1.0, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'Supply Chain Management': { weights: { S: 0.0, A: 0.55, P: 0.45, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'International Business': { weights: { S: 0.5, A: 0.5, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['fast'] },
  'Entrepreneurship': { weights: { S: 0.5, A: 0.35, P: 0.0, C: 0.15 }, environment: ['office'], pace: ['flexible'] },
  'Real Estate & Property Management': { weights: { S: 0.5, A: 0.2, P: 0.3, C: 0.0 }, environment: ['office', 'outdoor'], pace: ['flexible'] },
  
  // ============ LAW & GOVERNANCE ============
  'Law & Legal Practice': { weights: { S: 0.4, A: 0.6, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['fast'] },
  'Corporate Law': { weights: { S: 0.4, A: 0.6, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['fast'] },
  'Civil Services (CSS/PMS)': { weights: { S: 0.45, A: 0.55, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'Political Science & Governance': { weights: { S: 0.5, A: 0.5, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  'International Relations': { weights: { S: 0.5, A: 0.5, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  
  // ============ EDUCATION ============
  'Teaching (Primary)': { weights: { S: 0.7, A: 0.0, P: 0.3, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'Teaching (Secondary)': { weights: { S: 0.6, A: 0.4, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'University Professor': { weights: { S: 0.4, A: 0.6, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  'Education Administration': { weights: { S: 0.55, A: 0.45, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'Special Education': { weights: { S: 0.65, A: 0.0, P: 0.35, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  'Educational Technology': { weights: { S: 0.15, A: 0.6, P: 0.25, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  
  // ============ MILITARY & DEFENSE ============
  'Armed Forces': { weights: { S: 0.4, A: 0.1, P: 0.5, C: 0.0 }, environment: ['outdoor'], pace: ['fast'] },
  'Aviation & Pilot (Military)': { weights: { S: 0.0, A: 0.45, P: 0.55, C: 0.0 }, environment: ['outdoor'], pace: ['routine'] },
  'Naval Services': { weights: { S: 0.2, A: 0.35, P: 0.45, C: 0.0 }, environment: ['outdoor'], pace: ['fast'] },
  
  // ============ ARCHITECTURE & DESIGN ============
  'Architecture': { weights: { S: 0.0, A: 0.35, P: 0.3, C: 0.35 }, environment: ['office'], pace: ['project'] },
  'Interior Design': { weights: { S: 0.0, A: 0.0, P: 0.4, C: 0.6 }, environment: ['studio'], pace: ['project'] },
  'Urban Planning': { weights: { S: 0.0, A: 0.5, P: 0.15, C: 0.35 }, environment: ['office'], pace: ['project'] },
  'Landscape Architecture': { weights: { S: 0.0, A: 0.0, P: 0.45, C: 0.55 }, environment: ['outdoor', 'studio'], pace: ['project'] },
  
  // ============ CREATIVE ARTS ============
  'Graphic Design': { weights: { S: 0.0, A: 0.2, P: 0.0, C: 0.8 }, environment: ['studio'], pace: ['project'] },
  'Fashion Design': { weights: { S: 0.0, A: 0.0, P: 0.2, C: 0.8 }, environment: ['studio'], pace: ['project'] },
  'Fine Arts': { weights: { S: 0.0, A: 0.0, P: 0.0, C: 1.0 }, environment: ['studio'], pace: ['flexible'] },
  'Animation & VFX': { weights: { S: 0.0, A: 0.15, P: 0.3, C: 0.55 }, environment: ['studio'], pace: ['project'] },
  'Photography & Videography': { weights: { S: 0.0, A: 0.0, P: 0.4, C: 0.6 }, environment: ['studio', 'outdoor'], pace: ['flexible'] },
  'Film & Television Production': { weights: { S: 0.15, A: 0.0, P: 0.35, C: 0.5 }, environment: ['studio'], pace: ['project'] },
  'Music & Sound Production': { weights: { S: 0.0, A: 0.0, P: 0.0, C: 1.0 }, environment: ['studio'], pace: ['flexible'] },
  'Theater & Drama': { weights: { S: 0.35, A: 0.0, P: 0.0, C: 0.65 }, environment: ['studio'], pace: ['flexible'] },
  'Industrial Design': { weights: { S: 0.0, A: 0.15, P: 0.35, C: 0.5 }, environment: ['studio'], pace: ['project'] },
  
  // ============ MEDIA & COMMUNICATION ============
  'Journalism': { weights: { S: 0.5, A: 0.0, P: 0.0, C: 0.5 }, environment: ['office'], pace: ['fast'] },
  'Mass Communication': { weights: { S: 0.55, A: 0.0, P: 0.0, C: 0.45 }, environment: ['office', 'studio'], pace: ['fast'] },
  'Broadcasting': { weights: { S: 0.5, A: 0.0, P: 0.0, C: 0.5 }, environment: ['studio'], pace: ['fast'] },
  'Digital Marketing': { weights: { S: 0.15, A: 0.4, P: 0.0, C: 0.45 }, environment: ['office'], pace: ['fast'] },
  'Public Relations': { weights: { S: 0.55, A: 0.0, P: 0.0, C: 0.45 }, environment: ['office'], pace: ['fast'] },
  'Content Writing': { weights: { S: 0.0, A: 0.0, P: 0.0, C: 1.0 }, environment: ['office'], pace: ['flexible'] },
  'Advertising': { weights: { S: 0.45, A: 0.0, P: 0.0, C: 0.55 }, environment: ['office'], pace: ['fast'] },
  
  // ============ SOCIAL SCIENCES ============
  'Psychology': { weights: { S: 0.6, A: 0.4, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  'Clinical Psychology': { weights: { S: 0.55, A: 0.45, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  'Social Work': { weights: { S: 0.8, A: 0.2, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  'Sociology': { weights: { S: 0.55, A: 0.45, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  'Economics': { weights: { S: 0.0, A: 1.0, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  'Anthropology': { weights: { S: 0.5, A: 0.5, P: 0.0, C: 0.0 }, environment: ['office', 'outdoor'], pace: ['flexible'] },
  
  // ============ PURE SCIENCES ============
  'Biological Sciences': { weights: { S: 0.0, A: 0.8, P: 0.2, C: 0.0 }, environment: ['workshop'], pace: ['project'] },
  'Chemistry': { weights: { S: 0.0, A: 0.8, P: 0.2, C: 0.0 }, environment: ['workshop'], pace: ['project'] },
  'Physics': { weights: { S: 0.0, A: 1.0, P: 0.0, C: 0.0 }, environment: ['workshop'], pace: ['project'] },
  'Mathematics': { weights: { S: 0.0, A: 1.0, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  'Statistics': { weights: { S: 0.0, A: 1.0, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['flexible'] },
  'Environmental Science': { weights: { S: 0.0, A: 0.8, P: 0.2, C: 0.0 }, environment: ['outdoor', 'workshop'], pace: ['project'] },
  'Marine Biology': { weights: { S: 0.0, A: 0.55, P: 0.45, C: 0.0 }, environment: ['outdoor'], pace: ['project'] },
  'Biotechnology': { weights: { S: 0.0, A: 0.8, P: 0.2, C: 0.0 }, environment: ['workshop'], pace: ['project'] },
  'Microbiology': { weights: { S: 0.0, A: 0.75, P: 0.25, C: 0.0 }, environment: ['workshop'], pace: ['project'] },
  'Geology': { weights: { S: 0.0, A: 0.55, P: 0.45, C: 0.0 }, environment: ['outdoor', 'workshop'], pace: ['project'] },
  'Forensic Science': { weights: { S: 0.0, A: 0.6, P: 0.4, C: 0.0 }, environment: ['workshop'], pace: ['routine'] },
  
  // ============ HOSPITALITY & TOURISM ============
  'Hotel Management': { weights: { S: 0.5, A: 0.0, P: 0.5, C: 0.0 }, environment: ['office'], pace: ['fast'] },
  'Culinary Arts & Chef': { weights: { S: 0.0, A: 0.0, P: 0.8, C: 0.2 }, environment: ['workshop'], pace: ['fast'] },
  'Tourism Management': { weights: { S: 0.6, A: 0.0, P: 0.4, C: 0.0 }, environment: ['outdoor', 'office'], pace: ['routine'] },
  'Event Management': { weights: { S: 0.4, A: 0.0, P: 0.4, C: 0.2 }, environment: ['office'], pace: ['project'] },
  'Aviation & Commercial Pilot': { weights: { S: 0.0, A: 0.45, P: 0.55, C: 0.0 }, environment: ['outdoor'], pace: ['routine'] },
  'Cabin Crew & Flight Attendant': { weights: { S: 0.6, A: 0.0, P: 0.4, C: 0.0 }, environment: ['outdoor'], pace: ['fast'] },
  
  // ============ AGRICULTURE ============
  'Agriculture & Farming': { weights: { S: 0.0, A: 0.2, P: 0.8, C: 0.0 }, environment: ['outdoor'], pace: ['routine'] },
  'Agribusiness Management': { weights: { S: 0.35, A: 0.5, P: 0.15, C: 0.0 }, environment: ['office', 'outdoor'], pace: ['routine'] },
  'Horticulture': { weights: { S: 0.0, A: 0.0, P: 0.8, C: 0.2 }, environment: ['outdoor'], pace: ['routine'] },
  'Forestry': { weights: { S: 0.0, A: 0.2, P: 0.8, C: 0.0 }, environment: ['outdoor'], pace: ['routine'] },
  'Wildlife Conservation': { weights: { S: 0.15, A: 0.45, P: 0.4, C: 0.0 }, environment: ['outdoor'], pace: ['project'] },
  'Fisheries': { weights: { S: 0.0, A: 0.2, P: 0.8, C: 0.0 }, environment: ['outdoor'], pace: ['routine'] },
  
  // ============ PUBLIC SAFETY & EMERGENCY ============
  'Police & Law Enforcement': { weights: { S: 0.4, A: 0.0, P: 0.6, C: 0.0 }, environment: ['outdoor'], pace: ['fast'] },
  'Firefighting': { weights: { S: 0.4, A: 0.0, P: 0.6, C: 0.0 }, environment: ['outdoor'], pace: ['fast'] },
  'Emergency Medical Services': { weights: { S: 0.45, A: 0.0, P: 0.55, C: 0.0 }, environment: ['outdoor'], pace: ['fast'] },
  'Disaster Management': { weights: { S: 0.35, A: 0.35, P: 0.3, C: 0.0 }, environment: ['office', 'outdoor'], pace: ['fast'] },
  
  // ============ SPORTS & FITNESS ============
  'Sports & Athletics': { weights: { S: 0.1, A: 0.0, P: 0.9, C: 0.0 }, environment: ['outdoor'], pace: ['fast'] },
  'Physical Education': { weights: { S: 0.4, A: 0.0, P: 0.6, C: 0.0 }, environment: ['outdoor'], pace: ['routine'] },
  'Sports Management': { weights: { S: 0.6, A: 0.3, P: 0.1, C: 0.0 }, environment: ['office'], pace: ['fast'] },
  'Fitness Training & Coaching': { weights: { S: 0.4, A: 0.0, P: 0.6, C: 0.0 }, environment: ['workshop', 'outdoor'], pace: ['flexible'] },
  'Sports Medicine': { weights: { S: 0.35, A: 0.35, P: 0.3, C: 0.0 }, environment: ['office'], pace: ['routine'] },
  
  // ============ SKILLED TRADES ============
  'Automotive Technology': { weights: { S: 0.0, A: 0.3, P: 0.7, C: 0.0 }, environment: ['workshop'], pace: ['routine'] },
  'Electrical Technology': { weights: { S: 0.0, A: 0.3, P: 0.7, C: 0.0 }, environment: ['workshop', 'outdoor'], pace: ['routine'] },
  'Construction Management': { weights: { S: 0.0, A: 0.5, P: 0.5, C: 0.0 }, environment: ['outdoor', 'office'], pace: ['project'] },
  'HVAC Technology': { weights: { S: 0.0, A: 0.3, P: 0.7, C: 0.0 }, environment: ['workshop', 'outdoor'], pace: ['routine'] },
  'Welding & Fabrication': { weights: { S: 0.0, A: 0.0, P: 1.0, C: 0.0 }, environment: ['workshop'], pace: ['routine'] },
  'Carpentry & Woodworking': { weights: { S: 0.0, A: 0.0, P: 0.8, C: 0.2 }, environment: ['workshop', 'outdoor'], pace: ['routine'] },
  'Plumbing Technology': { weights: { S: 0.0, A: 0.0, P: 1.0, C: 0.0 }, environment: ['workshop', 'outdoor'], pace: ['routine'] },
  
  // ============ PERSONAL SERVICES ============
  'Cosmetology & Beauty': { weights: { S: 0.3, A: 0.0, P: 0.4, C: 0.3 }, environment: ['workshop'], pace: ['routine'] },
  'Massage Therapy': { weights: { S: 0.4, A: 0.0, P: 0.6, C: 0.0 }, environment: ['workshop'], pace: ['flexible'] },
  
  // ============ LIBRARY & INFORMATION ============
  'Library & Information Science': { weights: { S: 0.3, A: 0.7, P: 0.0, C: 0.0 }, environment: ['office'], pace: ['routine'] }
};
