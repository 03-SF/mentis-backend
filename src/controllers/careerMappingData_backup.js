// Comprehensive career mapping covering all major professions
// Structure: { primary: [], secondary: [], minScores: {}, environment: [], pace: [] }

module.exports = {
  // ============ HEALTHCARE & MEDICINE ============
  'Medicine & Surgery': { primary: ['A', 'S'], secondary: ['P'], minScores: { A: 65, S: 55 }, environment: ['office'], pace: ['fast'] },
  'Dentistry': { primary: ['P', 'S'], secondary: ['A'], minScores: { P: 50, S: 45 }, environment: ['office'], pace: ['routine'] },
  'Pharmacy': { primary: ['A', 'S'], secondary: [], minScores: { A: 55, S: 45 }, environment: ['office'], pace: ['routine'] },
  'Nursing': { primary: ['S', 'P'], secondary: [], minScores: { S: 50, P: 45 }, environment: ['office'], pace: ['fast'] },
  'Veterinary Medicine': { primary: ['A', 'S', 'P'], secondary: [], minScores: { A: 50, S: 45, P: 45 }, environment: ['office', 'outdoor'], pace: ['routine'] },
  'Physical Therapy': { primary: ['P', 'S'], secondary: [], minScores: { P: 50, S: 45 }, environment: ['office'], pace: ['routine'] },
  'Occupational Therapy': { primary: ['P', 'S'], secondary: [], minScores: { P: 50, S: 45 }, environment: ['office'], pace: ['routine'] },
  'Medical Laboratory Technology': { primary: ['A', 'P'], secondary: [], minScores: { A: 55, P: 45 }, environment: ['workshop'], pace: ['routine'] },
  'Radiology & Imaging': { primary: ['A', 'P'], secondary: [], minScores: { A: 55, P: 45 }, environment: ['office'], pace: ['routine'] },
  'Public Health': { primary: ['S', 'A'], secondary: [], minScores: { S: 45, A: 50 }, environment: ['office'], pace: ['routine'] },
  'Nutrition & Dietetics': { primary: ['A', 'S'], secondary: [], minScores: { A: 50, S: 45 }, environment: ['office'], pace: ['flexible'] },
  
  // ============ ENGINEERING ============
  'Civil Engineering': { primary: ['A', 'P'], secondary: [], minScores: { A: 70, P: 65 }, environment: ['office', 'outdoor'], pace: ['project'] },
  'Mechanical Engineering': { primary: ['A', 'P'], secondary: [], minScores: { A: 70, P: 65 }, environment: ['office', 'workshop'], pace: ['project'] },
  'Electrical Engineering': { primary: ['A', 'P'], secondary: [], minScores: { A: 70, P: 65 }, environment: ['office', 'workshop'], pace: ['project'] },
  'Software Engineering': { primary: ['A', 'P'], secondary: [], minScores: { A: 65, P: 60 }, environment: ['office'], pace: ['flexible'] },
  'Chemical Engineering': { primary: ['A', 'P'], secondary: [], minScores: { A: 72, P: 65 }, environment: ['workshop'], pace: ['project'] },
  'Petroleum Engineering': { primary: ['A', 'P'], secondary: [], minScores: { A: 75, P: 70 }, environment: ['outdoor', 'workshop'], pace: ['project'] },
  'Biomedical Engineering': { primary: ['A', 'P'], secondary: ['S'], minScores: { A: 72, P: 65 }, environment: ['workshop'], pace: ['project'] },
  'Aerospace Engineering': { primary: ['A', 'P'], secondary: [], minScores: { A: 75, P: 70 }, environment: ['office', 'workshop'], pace: ['project'] },
  'Environmental Engineering': { primary: ['A', 'P'], secondary: [], minScores: { A: 68, P: 60 }, environment: ['outdoor', 'office'], pace: ['project'] },
  'Industrial Engineering': { primary: ['A', 'P'], secondary: [], minScores: { A: 68, P: 65 }, environment: ['office', 'workshop'], pace: ['project'] },
  'Agricultural Engineering': { primary: ['A', 'P'], secondary: [], minScores: { A: 68, P: 65 }, environment: ['outdoor', 'workshop'], pace: ['project'] },
  'Textile Engineering': { primary: ['A', 'P'], secondary: ['C'], minScores: { A: 65, P: 60 }, environment: ['workshop'], pace: ['project'] },
  'Mining Engineering': { primary: ['A', 'P'], secondary: [], minScores: { A: 70, P: 70 }, environment: ['outdoor', 'workshop'], pace: ['project'] },
  'Nuclear Engineering': { primary: ['A', 'P'], secondary: [], minScores: { A: 78, P: 70 }, environment: ['workshop'], pace: ['project'] },
  
  // ============ TECHNOLOGY & IT ============
  'Information Technology': { primary: ['A', 'P'], secondary: [], minScores: { A: 60, P: 55 }, environment: ['office'], pace: ['flexible'] },
  'Computer Science': { primary: ['A', 'P'], secondary: [], minScores: { A: 65, P: 60 }, environment: ['office'], pace: ['flexible'] },
  'Data Science & Analytics': { primary: ['A'], secondary: [], minScores: { A: 75 }, environment: ['office'], pace: ['flexible'] },
  'Cybersecurity': { primary: ['A', 'P'], secondary: [], minScores: { A: 70, P: 60 }, environment: ['office'], pace: ['fast'] },
  'Web Development': { primary: ['A', 'P'], secondary: ['C'], minScores: { A: 60, P: 55 }, environment: ['office'], pace: ['flexible'] },
  'Mobile App Development': { primary: ['A', 'P'], secondary: ['C'], minScores: { A: 60, P: 55 }, environment: ['office'], pace: ['flexible'] },
  'Artificial Intelligence & ML': { primary: ['A'], secondary: [], minScores: { A: 78 }, environment: ['office'], pace: ['project'] },
  'Game Development': { primary: ['A', 'P', 'C'], secondary: [], minScores: { A: 60, P: 60, C: 55 }, environment: ['office', 'studio'], pace: ['project'] },
  
  // ============ BUSINESS & FINANCE ============
  'Banking & Finance': { primary: ['A'], secondary: ['S'], minScores: { A: 70 }, environment: ['office'], pace: ['fast'] },
  'Accounting & Chartered Accountancy': { primary: ['A'], secondary: [], minScores: { A: 75 }, environment: ['office'], pace: ['routine'] },
  'Business Administration': { primary: ['S', 'A'], secondary: [], minScores: { S: 65, A: 60 }, environment: ['office'], pace: ['fast'] },
  'Marketing & Sales': { primary: ['S', 'C'], secondary: [], minScores: { S: 65, C: 55 }, environment: ['office'], pace: ['fast'] },
  'Human Resources Management': { primary: ['S', 'A'], secondary: [], minScores: { S: 70, A: 60 }, environment: ['office'], pace: ['routine'] },
  'Investment Banking': { primary: ['A'], secondary: ['S'], minScores: { A: 78 }, environment: ['office'], pace: ['fast'] },
  'Insurance & Actuarial Science': { primary: ['A'], secondary: [], minScores: { A: 75 }, environment: ['office'], pace: ['routine'] },
  'Supply Chain Management': { primary: ['A', 'P'], secondary: [], minScores: { A: 65, P: 60 }, environment: ['office'], pace: ['routine'] },
  'International Business': { primary: ['S', 'A'], secondary: [], minScores: { S: 65, A: 65 }, environment: ['office'], pace: ['fast'] },
  'Entrepreneurship': { primary: ['S', 'A'], secondary: ['C'], minScores: { S: 70, A: 65 }, environment: ['office'], pace: ['flexible'] },
  'Real Estate & Property Management': { primary: ['S', 'P'], secondary: ['A'], minScores: { S: 65, P: 55 }, environment: ['office', 'outdoor'], pace: ['flexible'] },
  
  // ============ LAW & GOVERNANCE ============
  'Law & Legal Practice': { primary: ['A', 'S'], secondary: [], minScores: { A: 75, S: 65 }, environment: ['office'], pace: ['fast'] },
  'Corporate Law': { primary: ['A', 'S'], secondary: [], minScores: { A: 78, S: 65 }, environment: ['office'], pace: ['fast'] },
  'Civil Services (CSS/PMS)': { primary: ['A', 'S'], secondary: [], minScores: { A: 75, S: 70 }, environment: ['office'], pace: ['routine'] },
  'Political Science & Governance': { primary: ['A', 'S'], secondary: [], minScores: { A: 70, S: 65 }, environment: ['office'], pace: ['flexible'] },
  'International Relations': { primary: ['A', 'S'], secondary: [], minScores: { A: 70, S: 65 }, environment: ['office'], pace: ['flexible'] },
  
  // ============ EDUCATION ============
  'Teaching (Primary)': { primary: ['S', 'P'], secondary: [], minScores: { S: 70, P: 55 }, environment: ['office'], pace: ['routine'] },
  'Teaching (Secondary)': { primary: ['S', 'A'], secondary: [], minScores: { S: 70, A: 60 }, environment: ['office'], pace: ['routine'] },
  'University Professor': { primary: ['A', 'S'], secondary: [], minScores: { A: 75, S: 60 }, environment: ['office'], pace: ['flexible'] },
  'Education Administration': { primary: ['S', 'A'], secondary: [], minScores: { S: 70, A: 65 }, environment: ['office'], pace: ['routine'] },
  'Special Education': { primary: ['S', 'P'], secondary: [], minScores: { S: 75, P: 60 }, environment: ['office'], pace: ['routine'] },
  'Educational Technology': { primary: ['A', 'P'], secondary: ['S'], minScores: { A: 60, P: 55 }, environment: ['office'], pace: ['flexible'] },
  
  // ============ MILITARY & DEFENSE ============
  'Armed Forces': { primary: ['P', 'S'], secondary: ['A'], minScores: { P: 70, S: 65 }, environment: ['outdoor'], pace: ['fast'] },
  'Aviation & Pilot (Military)': { primary: ['P', 'A'], secondary: [], minScores: { P: 75, A: 70 }, environment: ['outdoor'], pace: ['routine'] },
  'Naval Services': { primary: ['P', 'A'], secondary: ['S'], minScores: { P: 70, A: 65 }, environment: ['outdoor'], pace: ['fast'] },
  
  // ============ ARCHITECTURE & DESIGN ============
  'Architecture': { primary: ['C', 'A', 'P'], secondary: [], minScores: { C: 65, A: 65, P: 60 }, environment: ['office'], pace: ['project'] },
  'Interior Design': { primary: ['C', 'P'], secondary: [], minScores: { C: 65, P: 55 }, environment: ['studio'], pace: ['project'] },
  'Urban Planning': { primary: ['A', 'C'], secondary: ['P'], minScores: { A: 68, C: 60 }, environment: ['office'], pace: ['project'] },
  'Landscape Architecture': { primary: ['C', 'P'], secondary: [], minScores: { C: 65, P: 60 }, environment: ['outdoor', 'studio'], pace: ['project'] },
  
  // ============ CREATIVE ARTS ============
  'Graphic Design': { primary: ['C'], secondary: ['A'], minScores: { C: 70 }, environment: ['studio'], pace: ['project'] },
  'Fashion Design': { primary: ['C'], secondary: ['P'], minScores: { C: 70 }, environment: ['studio'], pace: ['project'] },
  'Fine Arts': { primary: ['C'], secondary: [], minScores: { C: 75 }, environment: ['studio'], pace: ['flexible'] },
  'Animation & VFX': { primary: ['C', 'P'], secondary: ['A'], minScores: { C: 65, P: 55 }, environment: ['studio'], pace: ['project'] },
  'Photography & Videography': { primary: ['C', 'P'], secondary: [], minScores: { C: 60, P: 55 }, environment: ['studio', 'outdoor'], pace: ['flexible'] },
  'Film & Television Production': { primary: ['C', 'P'], secondary: ['S'], minScores: { C: 65, P: 60 }, environment: ['studio'], pace: ['project'] },
  'Music & Sound Production': { primary: ['C'], secondary: [], minScores: { C: 70 }, environment: ['studio'], pace: ['flexible'] },
  'Theater & Drama': { primary: ['C', 'S'], secondary: [], minScores: { C: 70, S: 60 }, environment: ['studio'], pace: ['flexible'] },
  'Industrial Design': { primary: ['C', 'P'], secondary: ['A'], minScores: { C: 65, P: 60 }, environment: ['studio'], pace: ['project'] },
  
  // ============ MEDIA & COMMUNICATION ============
  'Journalism': { primary: ['C', 'S'], secondary: [], minScores: { C: 60, S: 60 }, environment: ['office'], pace: ['fast'] },
  'Mass Communication': { primary: ['S', 'C'], secondary: [], minScores: { S: 65, C: 60 }, environment: ['office', 'studio'], pace: ['fast'] },
  'Broadcasting': { primary: ['C', 'S'], secondary: [], minScores: { C: 65, S: 65 }, environment: ['studio'], pace: ['fast'] },
  'Digital Marketing': { primary: ['C', 'A'], secondary: ['S'], minScores: { C: 60, A: 55 }, environment: ['office'], pace: ['fast'] },
  'Public Relations': { primary: ['S', 'C'], secondary: [], minScores: { S: 65, C: 60 }, environment: ['office'], pace: ['fast'] },
  'Content Writing': { primary: ['C'], secondary: [], minScores: { C: 65 }, environment: ['office'], pace: ['flexible'] },
  'Advertising': { primary: ['C', 'S'], secondary: [], minScores: { C: 65, S: 60 }, environment: ['office'], pace: ['fast'] },
  
  // ============ SOCIAL SCIENCES ============
  'Psychology': { primary: ['S', 'A'], secondary: [], minScores: { S: 75, A: 65 }, environment: ['office'], pace: ['flexible'] },
  'Clinical Psychology': { primary: ['S', 'A'], secondary: [], minScores: { S: 78, A: 68 }, environment: ['office'], pace: ['flexible'] },
  'Social Work': { primary: ['S'], secondary: ['A'], minScores: { S: 75 }, environment: ['office'], pace: ['flexible'] },
  'Sociology': { primary: ['S', 'A'], secondary: [], minScores: { S: 70, A: 65 }, environment: ['office'], pace: ['flexible'] },
  'Economics': { primary: ['A'], secondary: [], minScores: { A: 75 }, environment: ['office'], pace: ['flexible'] },
  'Anthropology': { primary: ['S', 'A'], secondary: [], minScores: { S: 68, A: 68 }, environment: ['office', 'outdoor'], pace: ['flexible'] },
  
  // ============ PURE SCIENCES ============
  'Biological Sciences': { primary: ['A'], secondary: ['P'], minScores: { A: 70 }, environment: ['workshop'], pace: ['project'] },
  'Chemistry': { primary: ['A'], secondary: ['P'], minScores: { A: 75 }, environment: ['workshop'], pace: ['project'] },
  'Physics': { primary: ['A'], secondary: [], minScores: { A: 75 }, environment: ['workshop'], pace: ['project'] },
  'Mathematics': { primary: ['A'], secondary: [], minScores: { A: 78 }, environment: ['office'], pace: ['flexible'] },
  'Statistics': { primary: ['A'], secondary: [], minScores: { A: 75 }, environment: ['office'], pace: ['flexible'] },
  'Environmental Science': { primary: ['A'], secondary: ['P'], minScores: { A: 70 }, environment: ['outdoor', 'workshop'], pace: ['project'] },
  'Marine Biology': { primary: ['A', 'P'], secondary: [], minScores: { A: 70, P: 65 }, environment: ['outdoor'], pace: ['project'] },
  'Biotechnology': { primary: ['A'], secondary: ['P'], minScores: { A: 75 }, environment: ['workshop'], pace: ['project'] },
  'Microbiology': { primary: ['A'], secondary: ['P'], minScores: { A: 72 }, environment: ['workshop'], pace: ['project'] },
  'Geology': { primary: ['A', 'P'], secondary: [], minScores: { A: 70, P: 65 }, environment: ['outdoor', 'workshop'], pace: ['project'] },
  'Forensic Science': { primary: ['A', 'P'], secondary: [], minScores: { A: 75, P: 65 }, environment: ['workshop'], pace: ['routine'] },
  
  // ============ HOSPITALITY & TOURISM ============
  'Hotel Management': { primary: ['S', 'P'], secondary: [], minScores: { S: 65, P: 60 }, environment: ['office'], pace: ['fast'] },
  'Culinary Arts & Chef': { primary: ['P', 'C'], secondary: [], minScores: { P: 70, C: 55 }, environment: ['workshop'], pace: ['fast'] },
  'Tourism Management': { primary: ['S', 'P'], secondary: [], minScores: { S: 70, P: 55 }, environment: ['outdoor', 'office'], pace: ['routine'] },
  'Event Management': { primary: ['S', 'P', 'C'], secondary: [], minScores: { S: 65, P: 60 }, environment: ['office'], pace: ['project'] },
  'Aviation & Commercial Pilot': { primary: ['P', 'A'], secondary: [], minScores: { P: 75, A: 70 }, environment: ['outdoor'], pace: ['routine'] },
  'Cabin Crew & Flight Attendant': { primary: ['S', 'P'], secondary: [], minScores: { S: 70, P: 60 }, environment: ['outdoor'], pace: ['fast'] },
  
  // ============ AGRICULTURE ============
  'Agriculture & Farming': { primary: ['P'], secondary: ['A'], minScores: { P: 70 }, environment: ['outdoor'], pace: ['routine'] },
  'Agribusiness Management': { primary: ['A', 'S'], secondary: ['P'], minScores: { A: 65, S: 60 }, environment: ['office', 'outdoor'], pace: ['routine'] },
  'Horticulture': { primary: ['P'], secondary: ['C'], minScores: { P: 70 }, environment: ['outdoor'], pace: ['routine'] },
  'Forestry': { primary: ['P'], secondary: ['A'], minScores: { P: 70 }, environment: ['outdoor'], pace: ['routine'] },
  'Wildlife Conservation': { primary: ['A', 'P'], secondary: ['S'], minScores: { A: 68, P: 65 }, environment: ['outdoor'], pace: ['project'] },
  'Fisheries': { primary: ['P'], secondary: ['A'], minScores: { P: 70 }, environment: ['outdoor'], pace: ['routine'] },
  
  // ============ PUBLIC SAFETY & EMERGENCY ============
  'Police & Law Enforcement': { primary: ['P', 'S'], secondary: [], minScores: { P: 70, S: 65 }, environment: ['outdoor'], pace: ['fast'] },
  'Firefighting': { primary: ['P', 'S'], secondary: [], minScores: { P: 75, S: 65 }, environment: ['outdoor'], pace: ['fast'] },
  'Emergency Medical Services': { primary: ['P', 'S'], secondary: [], minScores: { P: 75, S: 70 }, environment: ['outdoor'], pace: ['fast'] },
  'Disaster Management': { primary: ['A', 'S', 'P'], secondary: [], minScores: { A: 70, S: 70, P: 65 }, environment: ['office', 'outdoor'], pace: ['fast'] },
  
  // ============ SPORTS & FITNESS ============
  'Sports & Athletics': { primary: ['P'], secondary: ['S'], minScores: { P: 80 }, environment: ['outdoor'], pace: ['fast'] },
  'Physical Education': { primary: ['P', 'S'], secondary: [], minScores: { P: 70, S: 65 }, environment: ['outdoor'], pace: ['routine'] },
  'Sports Management': { primary: ['S', 'A'], secondary: ['P'], minScores: { S: 70, A: 60 }, environment: ['office'], pace: ['fast'] },
  'Fitness Training & Coaching': { primary: ['P', 'S'], secondary: [], minScores: { P: 75, S: 60 }, environment: ['workshop', 'outdoor'], pace: ['flexible'] },
  'Sports Medicine': { primary: ['A', 'S', 'P'], secondary: [], minScores: { A: 70, S: 65, P: 70 }, environment: ['office'], pace: ['routine'] },
  
  // ============ SKILLED TRADES ============
  'Automotive Technology': { primary: ['P', 'A'], secondary: [], minScores: { P: 75, A: 55 }, environment: ['workshop'], pace: ['routine'] },
  'Electrical Technology': { primary: ['P', 'A'], secondary: [], minScores: { P: 75, A: 55 }, environment: ['workshop', 'outdoor'], pace: ['routine'] },
  'Construction Management': { primary: ['P', 'A'], secondary: [], minScores: { P: 70, A: 65 }, environment: ['outdoor', 'office'], pace: ['project'] },
  'HVAC Technology': { primary: ['P', 'A'], secondary: [], minScores: { P: 70, A: 55 }, environment: ['workshop', 'outdoor'], pace: ['routine'] },
  'Welding & Fabrication': { primary: ['P'], secondary: [], minScores: { P: 75 }, environment: ['workshop'], pace: ['routine'] },
  'Carpentry & Woodworking': { primary: ['P'], secondary: ['C'], minScores: { P: 75 }, environment: ['workshop', 'outdoor'], pace: ['routine'] },
  'Plumbing Technology': { primary: ['P'], secondary: [], minScores: { P: 75 }, environment: ['workshop', 'outdoor'], pace: ['routine'] },
  
  // ============ PERSONAL SERVICES ============
  'Cosmetology & Beauty': { primary: ['C', 'P', 'S'], secondary: [], minScores: { C: 55, P: 60, S: 55 }, environment: ['workshop'], pace: ['routine'] },
  'Massage Therapy': { primary: ['P', 'S'], secondary: [], minScores: { P: 70, S: 60 }, environment: ['workshop'], pace: ['flexible'] },
  
  // ============ LIBRARY & INFORMATION ============
  'Library & Information Science': { primary: ['A', 'S'], secondary: [], minScores: { A: 60, S: 55 }, environment: ['office'], pace: ['routine'] }
};
