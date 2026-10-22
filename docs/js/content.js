/** Portfolio content. Edit this file to update project and learning entries. */
export const projects = [
  {
    id: 'agent', category: 'ai', title: 'Memory-Augmented AI Agent',
    subtitle: 'An agent that carries experience into its next task.',
    tags: ['FastAPI', 'Qdrant', 'React', 'PostgreSQL'],
    caption: 'PERSISTENT MEMORY / AGENT SYSTEMS',
    problem: 'An agent needs access to previous experience to support subsequent task execution.',
    approach: 'A platform that plans, executes, and evaluates tasks, storing experience in persistent memory for retrieval. A React and TypeScript dashboard presents agent activity and decision history.',
    contribution: 'Built the agent platform and dashboard described in my résumé, using FastAPI, PostgreSQL, Redis, and Qdrant.',
    flow: ['Task input', 'Planning and execution', 'Evaluation', 'Persistent memory and retrieval'],
    limitation: 'The résumé records deployment. Benchmark results, reliability measurements, and a detailed repository walkthrough are not yet documented here.',
    url: 'https://self-learning-ai-agent-one.vercel.app',
    repository: 'https://github.com/Prachethsingh/self-learning-AI-agent',
  },
  {
    id: 'alert', category: 'ai', title: 'Sound, translated into awareness.',
    subtitle: 'An AI-based smart alert system for deaf people.',
    tags: ['Audio ML', 'Python', 'Accessibility'],
    caption: 'SOUND RECOGNITION / ACCESSIBLE TECHNOLOGY',
    problem: 'Critical sounds such as alarms and sirens may not be accessible to people who are deaf.',
    approach: 'Detect critical sounds using audio-based machine learning and translate detections into visual or physical alerts.',
    contribution: 'Developed the final-year smart-alert system described in my résumé and co-authored a technical paper documenting its design and findings.',
    flow: ['Audio input', 'Sound classification', 'Alert decision', 'Visual or physical feedback'],
    limitation: 'Accuracy, false-alarm rates, device latency, and deployment conditions need documented evaluation before any safety-critical use.',
  },
  {
    id: 'business', category: 'data', title: 'BUSINESS.IN',
    subtitle: 'Exploring where a business could belong in Bengaluru.',
    tags: ['Python', 'Monte Carlo', 'Geospatial data'],
    caption: 'LOCATION INTELLIGENCE / PROBABILISTIC SIMULATION',
    problem: 'Commercial location decisions involve uncertain demand and different business requirements.',
    approach: 'A location decision-support tool using geospatial pedestrian telemetry and a 10,000-draw Monte Carlo simulation engine, as described in my résumé.',
    contribution: 'Built a simulator that models business viability for cafés, retail stores, restaurants, and salons using Bengaluru corridor benchmarks.',
    flow: ['Location and business inputs', 'Corridor benchmarks', 'Monte Carlo simulation', 'Probabilistic comparison'],
    limitation: 'Outputs depend on source-data quality and modeling assumptions. Simulations are decision-support estimates, not guaranteed business outcomes.',
    url: 'https://business-in.onrender.com',
    repository: 'https://github.com/Prachethsingh/business.in',
  },
  {
    id: 'erp', category: 'software', title: 'Full-Stack Operations ERP',
    subtitle: 'Inventory and operations, connected end to end.',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'Docker'],
    caption: 'TRANSACTIONAL WORKFLOWS / OPERATIONS ENGINEERING',
    problem: 'Inventory, work orders, transfers, and reservations need consistent records across operational workflows.',
    approach: 'An operations application covering inventory, work orders, stock checks, internal transfers, shortages, and customer reservations.',
    contribution: 'Implemented transactional inventory logic, JWT authentication, RBAC, validation, automated tests, OpenAPI documentation, an ER diagram, Docker configuration, and CI, as recorded in my résumé.',
    flow: ['Authenticated request', 'Role and input validation', 'Transactional inventory update', 'Operational response'],
    limitation: 'Production load, security-audit results, and business impact metrics are not yet documented here.',
    repository: 'https://github.com/Prachethsingh/Full-Stack-Mini-Operations-ERP',
  },
];

export const skills = [
  ['01', 'Applied intelligence', 'Python · TensorFlow · CNNs · OpenCV · Hugging Face · TensorFlow Lite'],
  ['02', 'Agents & retrieval', 'RAG · LLMs · Prompt engineering · Persistent memory · Qdrant'],
  ['03', 'Software & interfaces', 'React · TypeScript · JavaScript · React Native · Java'],
  ['04', 'Backend systems', 'FastAPI · Django · Flask · Node.js · Spring Boot · OpenAPI'],
  ['05', 'Data & infrastructure', 'SQL · PostgreSQL · Redis · NumPy · Pandas · Docker · AWS · Git · CI'],
  ['06', 'Physical computing', 'Electrical engineering foundation · Raspberry Pi · Sensors · Computer vision'],
];

export const studyTopics = [
  ['Machine learning', 'Classification, regression, supervised and unsupervised learning, Random Forest, SVM, anomaly detection, and evaluation.'],
  ['Vision & deep learning', 'CNNs, augmentation, U-Net, MobileNetV2, Cityscapes segmentation, camera inference, and TensorFlow Lite export.'],
  ['Web engineering', 'REST APIs, authentication, JWT and sessions, RBAC, validation, relational design, transactions, testing, and deployment.'],
  ['IoT & robotics', 'Arduino, ESP32, sensor and actuator exercises, wearable alerts, ROS 2 publishers/subscribers, and simulation.'],
  ['Systems & networking', 'Linux, Docker, cloud concepts, wireless networking, server setup, and practical troubleshooting.'],
  ['Generative AI', 'LLMs, retrieval-augmented generation, vector retrieval, agent planning, evaluation, and memory.'],
];

export const experiments = [
  ['AI-powered voice booking', 'Implementation explored'],
  ['Real-time semantic segmentation', 'Training & inference explored'],
  ['Network anomaly detection', 'Learning experiment'],
  ['The Celluloid Cafe', 'Project in development'],
  ['Computer-vision waste segregation', 'Prototype explored'],
  ['Arduino sensors & ROS 2', 'Hands-on exercises'],
  ['ThresholdGuard / AquaSentinel', 'Research proposal'],
  ['Salary & expense tracker', 'Product concept'],
];
