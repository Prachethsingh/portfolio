import { projects, skills, studyTopics, experiments } from './content.js';
import { repositories } from './repositories.js';

/** Curated public portfolio facts. This is the only answer source. */
export const knowledge = [
  {
    id: 'profile', title: 'About Pracheth', href: '#about',
    keywords: 'who about introduction introduce profile background location bengaluru pracheth singh',
    text: 'Pracheth Singh is an Artificial Intelligence & Machine Learning student based in Bengaluru, India. His background combines electrical engineering with applied AI, software development, sensors, and robotics.',
  },
  {
    id: 'education', title: 'Education', href: '#education',
    keywords: 'education college university degree studied study graduation graduate cgpa marks diploma school qualification',
    text: 'B.E. Artificial Intelligence & Machine Learning at Dayananda Sagar Academy of Technology and Management, Bengaluru: 2024–2027 (expected), CGPA 8.22. Diploma in Electrical & Electronics Engineering at PES Institute of Technology and Management, Shivamogga: 2021–2024, CGPA 8.35. Class XII: Commerce, State Board, 79% (2021). Class X: State Board, 72.16% (2019).',
  },
  {
    id: 'experience', title: 'Internship experience', href: '#experience',
    keywords: 'experience internship intern worked employment arohan suprajit healthcare company',
    text: 'Software Engineer Intern at Arohan / Hasprana Health Care Solutions, January–June 2026: supported healthtech development, payment-gateway integration, and domain, cPanel, and deployment infrastructure. Electrical Maintenance Intern at Suprajit Automotive Limited, January–April 2024: assisted technical documentation and manufacturing process understanding.',
  },
  {
    id: 'contact', title: 'Contact & professional profiles', href: '#contact',
    keywords: 'contact email reach connect linkedin github hire hiring job opportunity roles looking',
    text: 'Email: prachethsingh@gmail.com. GitHub: github.com/Prachethsingh. LinkedIn: linkedin.com/in/pracheth-singh/. Pracheth is seeking a 6-month internship running January–June 2027 (his final semester), and early-career applied AI and software engineering opportunities.',
  },
  {
    id: 'resume', title: 'Résumé', href: 'resume.html',
    keywords: 'resume cv download pdf curriculum vitae',
    text: 'Open the résumé page and choose “Print / Save as PDF” to download a PDF through your browser’s print dialog.',
  },
  {
    id: 'aws-event', title: 'AWS Future Builders Connect', href: '#research',
    keywords: 'aws amazon cloud future builders connect bengaluru event networking attended',
    text: 'Pracheth attended AWS Future Builders Connect in Bengaluru. The experience involved learning, exchanging ideas, and connecting with technology enthusiasts. It strengthened his interest in cloud computing and the practical deployment of AI applications. Specific sessions and dates are not documented here.',
  },
  {
    id: 'research', title: 'Research & achievements', href: '#research',
    keywords: 'research paper publication springer achievement award hackathon leadership racing sevc icoiics ieee first place exhibition smart alert',
    text: 'Pracheth won 1st Place at the DSATM Project Exhibition (Open Day 2026, 13–14 November 2026) for the AI-based smart alert system for deaf people, built with Deekshitha G, Varshita VA and Pavan Gowda K and guided by Prof. Indu B; the system reached 98.80% audio classification accuracy, and a co-authored paper on it was presented at ICOIICS 2026, an IEEE conference. He also co-authored “Literature Survey in AI in Education (AIED)” in a Springer book series, was 1st Runner-up at the SSCE Healthcare Hackathon, contributed to SEVC and Vulcan Racing Club, and organised Bridge Ally 4.0 and ALMATRON.',
  },
  {
    id: 'skills', title: 'Technical skills', href: '#knowledge',
    keywords: 'skills stack technologies tools programming languages python java react backend frontend database',
    text: skills.map(([, title, tools]) => `${title}: ${tools}.`).join('\n'),
  },
  {
    id: 'study', title: 'Study topics', href: '#knowledge',
    keywords: 'subjects syllabus coursework topics learning studied courses robotics machine learning',
    text: studyTopics.map(([title, description]) => `${title}: ${description}`).join('\n') + '\nThis is a topic summary, not a complete academic transcript.',
  },
  {
    id: 'projects', title: 'Featured projects', href: '#work',
    keywords: 'projects portfolio work built applications showcase',
    text: 'Featured work includes Setu — a live two-way voice bridge for deaf users, the Memory-Augmented AI Agent, the AI Smart Alert System for Deaf People (1st Place, DSATM Project Exhibition 2026), BUSINESS.IN commercial location simulator, and Full-Stack Operations ERP. Individual case studies describe contributions, architecture, and limitations.',
  },
  ...projects.map(project => ({
    id: project.id, title: project.title, href: '#work',
    keywords: `${project.title} ${project.tags.join(' ')} ${project.id === 'alert' ? 'deaf audio sound siren accessibility final year' : ''}`,
    text: `${project.subtitle}\n${project.approach}\nContribution: ${project.contribution}\nLimitations: ${project.limitation}`,
  })),
  {
    id: 'repositories', title: 'Public GitHub directory', href: '#repositories',
    keywords: 'repositories repository source code github repo',
    text: `The directory contains ${repositories.length} public repositories, verified on 17 November 2026: ${repositories.join(', ')}. Repository availability does not establish completion or production readiness.`,
  },
  {
    id: 'experiments', title: 'Ongoing experiments', href: '#experiments-section',
    keywords: 'experiments voice booking celluloid cafe segmentation waste thresholdguard aquasentinel salary tracker',
    text: experiments.map(([name, status]) => `${name}: ${status}.`).join('\n'),
  },
];
