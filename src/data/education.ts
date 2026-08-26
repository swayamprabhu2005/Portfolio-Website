export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  location: string;
  period: string;
  gradeLabel: string;
  gradeValue: string;
  highlights: string[];
  current?: boolean;
}

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'pcce',
    institution: 'Padre Conceicao College of Engineering',
    degree: 'Bachelor of Engineering (B.E.)',
    field: 'Computer Engineering',
    location: 'Verna, Goa, India',
    period: '2023 – 2027',
    gradeLabel: 'Current CGPA (Sem I – Sem IV)',
    gradeValue: '9.23 / 10.0',
    current: true,
    highlights: [
      'Top academic percentile with strong foundational coursework in Data Structures, OOP, Database Systems, Computer Networks, and Microcontrollers.',
      'Active hardware/software project builder: Led the development of the IDEAS 4.0 Finalist IoT Smart Water Monitoring System and VeritaScan AI platform.',
      'Exploring edge intelligence, embedded C/C++ firmware, and computer vision systems.'
    ]
  },
  {
    id: 'damodar',
    institution: 'Shri Damodar Higher Secondary School of Science',
    degree: 'Higher Secondary School Certificate (HSSC)',
    field: 'Science Stream (Physics, Chemistry, Mathematics, CS)',
    location: 'Margao, Goa, India',
    period: '2021 – 2023',
    gradeLabel: 'Percentage',
    gradeValue: '70.00%',
    highlights: [
      'Developed strong analytical and mathematical problem-solving foundations.',
      'Engaged in computer science programming and scientific laboratory experimentation.'
    ]
  },
  {
    id: 'mahila-nutan',
    institution: 'Mahila and Nutan English High School',
    degree: 'Secondary School Certificate (SSC)',
    field: 'General Academics & Sciences',
    location: 'Margao, Goa, India',
    period: '2021',
    gradeLabel: 'Percentage',
    gradeValue: '91.83%',
    highlights: [
      'Achieved Distinction with 91.83% aggregate.',
      'Demonstrated consistent academic excellence and strong foundation in STEM disciplines.'
    ]
  }
];

export interface AchievementItem {
  id: string;
  title: string;
  organization: string;
  year: string;
  stage: string;
  description: string;
  projectLinked: string;
}

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ideas-4',
    title: 'IDEAS 4.0 Innovation Competition',
    organization: 'Padre Conceicao College of Engineering',
    year: '2026',
    stage: 'REACHED FINAL ROUND (FINALIST)',
    description: 'Selected as a Finalist in the prestigious college-wide engineering innovation competition for engineering the IoT-Based Smart Water Quality Monitoring & Predictive Anomaly platform.',
    projectLinked: 'smart-water-monitoring'
  }
];
