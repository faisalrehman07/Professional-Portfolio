export interface ProjectItem {
  id: string;
  title: string;
  category: 'Full Stack' | 'AI & Deep Learning' | 'IoT / Hardware' | 'Internship Case Study';
  type: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  features: string[];
  outcomes: string[];
  role: string;
  affiliation?: string;
  iconName: string;
  featured?: boolean;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface ExperienceItem {
  id: string;
  title: string;
  organization: string;
  location?: string;
  period: string;
  category: 'Professional Experience' | 'Internship' | 'Workshop' | 'Expo' | 'Training';
  summary: string;
  highlights: string[];
  skillsGained: string[];
  badge: string;
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  dateOrYear?: string;
  category: 'Cybersecurity' | 'AI & Prompt Engineering' | 'Professional & Office' | 'Expos & Competitions' | 'Full Stack';
  description: string;
  skillsCovered: string[];
}

export interface SkillCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    description: string;
    tags: string[];
  }[];
}

export interface ToolItem {
  name: string;
  category: 'Development' | 'Data & BI' | 'Collaboration & Agile' | 'Diagramming & Planning' | 'AI Tools & Prototyping';
  purpose: string;
  icon: string;
}

export interface UniversalSkillNode {
  id: string;
  name: string;
  category: 'Programming and Databases' | 'Web Development' | 'AI and Machine Learning' | 'Data Science' | 'Developer and AI Tools' | 'Additional Tools';
  iconName: string;
  description: string;
  practicalUse: string;
  relatedSkills: string[];
  color: string;
  phi: number;
  theta: number;
}

export interface ResumeData {
  personal: {
    name: string;
    role: string;
    supportingTitles: string;
    positioning: string;
    tagline: string;
    heroIntro: string;
    location: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    resumeUrl: string;
    availability: string;
    careerObjective: string;
    aboutNarrative: string;
    quickHighlights: { label: string; value: string }[];
  };
  education: {
    degree: string;
    institution: string;
    university: string;
    year: string;
    cgpa: string;
    location: string;
    coreCourses: string[];
  };
  industryExpertise: { title: string; desc: string }[];
  areasOfExpertise: string[];
  skillClusters: SkillCategory[];
  universalSkillNodes: UniversalSkillNode[];
  tools: ToolItem[];
  projects: ProjectItem[];
  experience: ExperienceItem[];
  certifications: CertificationItem[];
  languages: { name: string; proficiency: string }[];
  beyondCode: { title: string; category: string; description: string; icon: string }[];
}

export const resumeData: ResumeData = {
  personal: {
    name: "Faisal Rehman",
    role: "Software Engineer",
    supportingTitles: "Full-Stack Developer | AI & Data Science Graduate",
    positioning: "Software Engineer & Full-Stack Developer",
    tagline: "Building Practical Software. Integrating Intelligent AI.",
    heroIntro: "I'm a Software Engineer and Full-Stack Developer with a background in Artificial Intelligence and Data Science. I enjoy building practical applications, integrating APIs, working with databases, and exploring AI-powered solutions.",
    location: "Bengaluru, India",
    email: "faisalshaikhrehmani@gmail.com",
    phone: "+91 9620532473",
    linkedin: "https://www.linkedin.com/in/faisal-rehman-377731237/",
    github: "https://github.com/faisalrehman07/",
    resumeUrl: "./FAISAL_REHMAN.pdf",
    availability: "Available for Software Engineering Opportunities (Dubai & International)",
    careerObjective: "Pursuing software engineering and full-stack development opportunities, particularly in Dubai and the UAE, while remaining suitable for international opportunities.",
    aboutNarrative: `I am a Software Engineer and Full-Stack Developer with an engineering degree (B.E.) in Artificial Intelligence and Data Science from Navkis College of Engineering, affiliated with Visvesvaraya Technological University (VTU), graduating with a CGPA of 8.2/10.

My professional background includes working as a Digital Advisor on the Email and Social Media team at [24]7.ai in Bengaluru, where I honed clear written communication, professional email etiquette, customer-oriented problem solving, and effective collaboration within fast-paced operational workflows.

In software development, I completed an internship at CifTech Solutions Pvt. Ltd., developing a full-stack Hospital Management System using .NET and MySQL. I actively build practical real-world applications using modern web technologies and AI developer platforms, including a personal voice assistant integrated with the Gemini API, a hotel management website with table booking and ordering, a finance tracking wallet, and a car parking management system.

I am driven to contribute my hands-on software development, database engineering, and AI integration capabilities to high-impact engineering teams in Dubai, the UAE, and globally.`,
    quickHighlights: [
      { label: "Degree", value: "B.E. AI & Data Science" },
      { label: "CGPA", value: "8.2 / 10" },
      { label: "University", value: "VTU / Navkis College" },
      { label: "Primary Role", value: "Software Engineer" },
      { label: "Location", value: "Bengaluru, India" },
      { label: "Target Market", value: "Dubai & UAE / Global" }
    ]
  },

  education: {
    degree: "B.E. in Artificial Intelligence and Data Science",
    institution: "Navkis College of Engineering",
    university: "Visvesvaraya Technological University (VTU)",
    year: "2025",
    cgpa: "8.2 / 10",
    location: "Bengaluru / Hassan, India",
    coreCourses: [
      "Artificial Intelligence & Machine Learning",
      "Data Structures & Algorithms",
      "Database Management Systems (DBMS)",
      "Object-Oriented Programming (Java & Python)",
      "Full-Stack Web Development",
      "Deep Learning & Neural Networks",
      "Data Visualization & Analytics",
      "Operating Systems & Computer Networks"
    ]
  },

  industryExpertise: [
    { title: "Software Engineering", desc: "Building practical web applications, structured MVC architectures, API integrations, and maintainable codebases." },
    { title: "Full-Stack Development", desc: "End-to-end development spanning responsive frontend interfaces, server-side logic, and database schemas." },
    { title: "Database Systems", desc: "Relational database modeling, SQL queries, MySQL optimization, schema normalization, and CRUD data flows." },
    { title: "AI & API Integration", desc: "Practical AI integration using the Gemini API, Google AI Studio, prompt engineering, and machine learning pipelines." },
    { title: "Professional Communication", desc: "Experience in written customer communications, email etiquette, issue resolution, and cross-functional team collaboration." },
    { title: "Cybersecurity Fundamentals", desc: "Hands-on training in web application Vulnerability Assessment and Penetration Testing (VAPT) and defensive practices." }
  ],

  areasOfExpertise: [
    "Full-Stack Development",
    "API & AI Integration",
    "Relational Databases (SQL / MySQL)",
    "Python & Java Programming",
    ".NET Application Development",
    "Prompt Engineering & Gemini API",
    "System Planning & Debugging",
    "Professional Communication"
  ],

  // 4 Recruiter-Scannable Skill Categories
  skillClusters: [
    {
      id: "programming-databases",
      name: "Programming and Databases",
      icon: "Database",
      description: "Core programming languages, backend frameworks, relational databases, and data modeling.",
      skills: [
        { name: "Python", description: "Scripting, machine learning pipelines, backend logic, and API integration.", tags: ["Core Language", "AI / ML", "Backend"] },
        { name: "Java", description: "Object-oriented programming, data structures, and enterprise logic.", tags: ["OOP", "Core Language", "Architecture"] },
        { name: "SQL", description: "Relational queries, table joins, data retrieval, and schema integrity.", tags: ["Database", "Querying", "CRUD"] },
        { name: "MySQL", description: "Relational database schema design, normalization, indexing, and storage.", tags: ["Database", "Storage", "MySQL"] },
        { name: ".NET", description: "Application architecture applied during internship for hospital management software.", tags: ["Backend", "Enterprise", "Framework"] }
      ]
    },
    {
      id: "ai-data-science",
      name: "AI and Data Science",
      icon: "Brain",
      description: "Generative AI, machine learning fundamentals, deep learning libraries, and exploratory data analysis.",
      skills: [
        { name: "Gemini API", description: "Integrating multimodal Gemini models into voice assistants and practical applications.", tags: ["GenAI", "API Integration", "LLM"] },
        { name: "Generative AI", description: "Exploration of practical text generation, assistants, and generative AI workflows.", tags: ["AI", "GenAI", "Innovation"] },
        { name: "Prompt Engineering", description: "Structured system prompts, few-shot prompting, and deterministic AI responses.", tags: ["Prompting", "AI Studio", "Workflows"] },
        { name: "Machine Learning Fundamentals", description: "Supervised and unsupervised learning, classification, regression, and model evaluation.", tags: ["ML", "Algorithms", "Core AI"] },
        { name: "Scikit-learn", description: "Data preprocessing, feature selection, estimators, and model evaluation.", tags: ["Python", "ML", "Pipelines"] },
        { name: "TensorFlow & Keras", description: "Neural network modeling applied in loan eligibility and deep learning projects.", tags: ["Deep Learning", "Neural Nets"] },
        { name: "Pandas", description: "Data manipulation, cleaning, tabular analysis, and feature transformation.", tags: ["Data Science", "Data Wrangling"] },
        { name: "NumPy", description: "Numerical operations, array transformations, and matrix computations.", tags: ["Math", "Data Science"] },
        { name: "Matplotlib & Seaborn", description: "Statistical plotting, distribution charts, and data visualization.", tags: ["Visualization", "Plotting"] }
      ]
    },
    {
      id: "web-development",
      name: "Web and Application Development",
      icon: "Code2",
      description: "Modern frontend and full-stack development, API integration, and responsive user interfaces.",
      skills: [
        { name: "HTML & CSS", description: "Semantic markup, modern layouts, responsive styling, and accessible structure.", tags: ["Frontend", "Markup", "CSS3"] },
        { name: "JavaScript", description: "Client-side interactivity, DOM manipulation, asynchronous flows, and logic.", tags: ["Frontend", "Core Web", "ES6+"] },
        { name: "Web Development", description: "Building responsive, user-friendly websites with online service workflows.", tags: ["Web", "Responsive", "UI"] },
        { name: "Full-Stack Development", description: "Integrating frontend interfaces with backend services and database storage.", tags: ["Architecture", "End-to-End"] },
        { name: "API Integration", description: "Connecting web frontends to REST APIs and cloud AI service endpoints.", tags: ["REST APIs", "Integration"] },
        { name: "UI/UX Design", description: "User-centered design principles, clean visual hierarchy, and intuitive navigation.", tags: ["Design", "User Experience"] }
      ]
    },
    {
      id: "tools-platforms",
      name: "Tools and Platforms",
      icon: "Cpu",
      description: "Development tools, AI experimentation platforms, analytics suites, and project management software.",
      skills: [
        { name: "Google Antigravity", description: "AI-assisted development platform used for rapid exploration and software workflows.", tags: ["AI Tooling", "Development"] },
        { name: "Google AI Studio", description: "Rapid prototyping with Gemini models, system instructions, and API key management.", tags: ["AI Studio", "Prototyping"] },
        { name: "Jupyter", description: "Interactive Python notebook environment for data analysis and ML experiments.", tags: ["Notebooks", "Data Science"] },
        { name: "Tableau & Power BI", description: "Business intelligence dashboards, metric reporting, and visual analytics.", tags: ["BI", "Analytics", "Dashboards"] },
        { name: "Jira & Confluence", description: "Agile task tracking, sprint organization, and technical documentation.", tags: ["Agile", "Collaboration"] },
        { name: "Salesforce", description: "Enterprise CRM workflows and customer lifecycle tracking awareness.", tags: ["CRM", "Enterprise"] },
        { name: "Lucidchart & MS Project", description: "System architecture diagrams, process flowcharts, and project timelines.", tags: ["Diagrams", "Project Planning"] }
      ]
    }
  ],

  // 30 Verified Resume Technologies for the 3D Skills Universe Globe
  universalSkillNodes: [
    // Programming & Databases (Indigo / Violet)
    {
      id: "python",
      name: "Python",
      category: "Programming and Databases",
      iconName: "Code",
      description: "Core programming language for machine learning, backend logic, data processing, and automation scripts.",
      practicalUse: "Applied in voice assistant backend, rPPG signal processing, and loan eligibility prediction.",
      relatedSkills: ["Scikit-learn", "Pandas", "Gemini API"],
      color: "#818cf8",
      phi: 0.35,
      theta: 0.6
    },
    {
      id: "java",
      name: "Java",
      category: "Programming and Databases",
      iconName: "Coffee",
      description: "Object-oriented programming language foundational to data structures, software engineering, and system design.",
      practicalUse: "Academic foundation in OOP, algorithms, and modular software architecture.",
      relatedSkills: ["SQL", "Data Structures"],
      color: "#818cf8",
      phi: 0.75,
      theta: 1.8
    },
    {
      id: "sql",
      name: "SQL",
      category: "Programming and Databases",
      iconName: "Database",
      description: "Structured Query Language for relational database querying, joins, aggregations, and data retrieval.",
      practicalUse: "Engineered database queries across hospital and car parking management systems.",
      relatedSkills: ["MySQL", ".NET", "Python"],
      color: "#818cf8",
      phi: 1.15,
      theta: 3.1
    },
    {
      id: "mysql",
      name: "MySQL",
      category: "Programming and Databases",
      iconName: "HardDrive",
      description: "Relational database management system for persistent data storage, normalization, and ACID integrity.",
      practicalUse: "Designed and implemented relational database schema for the Hospital Management System during internship.",
      relatedSkills: ["SQL", ".NET", "Full-Stack Development"],
      color: "#818cf8",
      phi: 1.55,
      theta: 4.4
    },
    {
      id: "dotnet",
      name: ".NET",
      category: "Programming and Databases",
      iconName: "Layers",
      description: "Software framework used for developing structured enterprise applications and database-connected business logic.",
      practicalUse: "Applied during CifTech Solutions internship to build the Hospital Management System application.",
      relatedSkills: ["MySQL", "SQL", "Full-Stack Development"],
      color: "#818cf8",
      phi: 1.95,
      theta: 5.7
    },

    // Web Development (Emerald)
    {
      id: "html",
      name: "HTML",
      category: "Web Development",
      iconName: "Code2",
      description: "Standard markup language creating semantic, accessible, and structured foundations for web applications.",
      practicalUse: "Constructed structural layouts for hotel management, wallet, and parking platforms.",
      relatedSkills: ["CSS", "JavaScript", "Web Development"],
      color: "#10b981",
      phi: 2.35,
      theta: 0.9
    },
    {
      id: "css",
      name: "CSS",
      category: "Web Development",
      iconName: "Palette",
      description: "Cascading style sheets used for responsive styling, layouts, animations, and visual presentation.",
      practicalUse: "Crafted responsive, mobile-adapted interfaces for web projects.",
      relatedSkills: ["HTML", "JavaScript", "UI/UX Design"],
      color: "#10b981",
      phi: 2.75,
      theta: 2.2
    },
    {
      id: "javascript",
      name: "JavaScript",
      category: "Web Development",
      iconName: "FileCode",
      description: "Core client-side programming language for dynamic web interactivity, state management, and API calls.",
      practicalUse: "Implemented interactive table booking and food ordering logic in the Hotel Management Website.",
      relatedSkills: ["HTML", "CSS", "Web Development"],
      color: "#10b981",
      phi: 0.55,
      theta: 3.5
    },
    {
      id: "web-dev",
      name: "Web Development",
      category: "Web Development",
      iconName: "Globe",
      description: "Comprehensive practices in developing responsive, accessible, and standards-compliant web solutions.",
      practicalUse: "Built customer-facing interfaces with booking, catalog, and operational tracking workflows.",
      relatedSkills: ["Full-Stack Development", "JavaScript", "HTML"],
      color: "#10b981",
      phi: 0.95,
      theta: 4.8
    },
    {
      id: "fullstack-dev",
      name: "Full-Stack Development",
      category: "Web Development",
      iconName: "Server",
      description: "End-to-end software development uniting frontend user experiences with backend logic and databases.",
      practicalUse: "Engineered full-stack solutions including Hospital Management, Finance Wallet, and Parking System.",
      relatedSkills: [".NET", "MySQL", "JavaScript", "API Integration"],
      color: "#10b981",
      phi: 1.35,
      theta: 6.1
    },
    {
      id: "api-integration",
      name: "API Integration",
      category: "Web Development",
      iconName: "Workflow",
      description: "Connecting software frontends with external REST APIs and cloud intelligence endpoints.",
      practicalUse: "Integrated the Gemini API to power the Personal AI Voice Assistant.",
      relatedSkills: ["Gemini API", "JavaScript", "Python"],
      color: "#10b981",
      phi: 1.75,
      theta: 1.3
    },
    {
      id: "ui-ux-design",
      name: "UI/UX Design",
      category: "Web Development",
      iconName: "Layout",
      description: "Designing clear, readable user interfaces with intuitive navigation, hierarchy, and responsive behavior.",
      practicalUse: "Designed clean table reservation layouts and wallet transaction visualizers.",
      relatedSkills: ["CSS", "HTML", "Web Development"],
      color: "#10b981",
      phi: 2.15,
      theta: 2.6
    },

    // AI and Machine Learning (Cyan / Sky Blue)
    {
      id: "gemini-api",
      name: "Gemini API",
      category: "AI and Machine Learning",
      iconName: "Cpu",
      description: "Google's foundational multi-modal AI models accessed programmatically to generate intelligent responses.",
      practicalUse: "Engineered voice-based intelligent response generation for the Personal AI Voice Assistant.",
      relatedSkills: ["Google AI Studio", "Prompt Engineering", "Python"],
      color: "#06b6d4",
      phi: 2.55,
      theta: 3.9
    },
    {
      id: "generative-ai",
      name: "Generative AI",
      category: "AI and Machine Learning",
      iconName: "Cpu",
      description: "Modern artificial intelligence domain focusing on content generation, conversational agents, and LLMs.",
      practicalUse: "Explored practical generative applications, assistants, and intelligent workflow acceleration.",
      relatedSkills: ["Gemini API", "Prompt Engineering", "Google AI Studio"],
      color: "#06b6d4",
      phi: 0.45,
      theta: 5.2
    },
    {
      id: "prompt-engineering",
      name: "Prompt Engineering",
      category: "AI and Machine Learning",
      iconName: "Terminal",
      description: "Structured design of prompts, system instructions, and context framing for consistent AI model outputs.",
      practicalUse: "Crafted effective prompts in Google AI Studio to calibrate Gemini model responses.",
      relatedSkills: ["Gemini API", "Google AI Studio", "Generative AI"],
      color: "#06b6d4",
      phi: 0.85,
      theta: 0.2
    },
    {
      id: "ml-fundamentals",
      name: "Machine Learning Fundamentals",
      category: "AI and Machine Learning",
      iconName: "Brain",
      description: "Core algorithms including classification, regression, clustering, loss minimization, and model validation.",
      practicalUse: "Applied ML principles to academic predictive models including loan eligibility and stress classification.",
      relatedSkills: ["Scikit-learn", "Python", "Data Science"],
      color: "#06b6d4",
      phi: 1.25,
      theta: 1.5
    },
    {
      id: "scikit-learn",
      name: "Scikit-learn",
      category: "AI and Machine Learning",
      iconName: "Activity",
      description: "Python machine learning library providing efficient tools for predictive data analysis and preprocessing.",
      practicalUse: "Built data preprocessing, scaling, and classification pipelines for academic projects.",
      relatedSkills: ["Python", "Pandas", "Machine Learning Fundamentals"],
      color: "#06b6d4",
      phi: 1.65,
      theta: 2.8
    },
    {
      id: "tensorflow",
      name: "TensorFlow",
      category: "AI and Machine Learning",
      iconName: "Network",
      description: "Open-source deep learning framework for training and deploying numerical neural network architectures.",
      practicalUse: "Constructed deep learning layers for loan eligibility prediction.",
      relatedSkills: ["Keras", "Python", "Deep Learning"],
      color: "#06b6d4",
      phi: 2.05,
      theta: 4.1
    },
    {
      id: "keras",
      name: "Keras",
      category: "AI and Machine Learning",
      iconName: "Boxes",
      description: "High-level neural network API running on top of TensorFlow for intuitive model layer construction.",
      practicalUse: "Designed sequential deep learning architectures for classification tasks.",
      relatedSkills: ["TensorFlow", "Python"],
      color: "#06b6d4",
      phi: 2.45,
      theta: 5.4
    },

    // Data Science (Amber)
    {
      id: "pandas",
      name: "Pandas",
      category: "Data Science",
      iconName: "Table",
      description: "Fast, flexible data analysis and manipulation library offering DataFrame structures for tabular data.",
      practicalUse: "Data cleaning, feature transformation, and exploratory dataset analysis across academic projects.",
      relatedSkills: ["NumPy", "Python", "Matplotlib"],
      color: "#f59e0b",
      phi: 0.65,
      theta: 0.7
    },
    {
      id: "numpy",
      name: "NumPy",
      category: "Data Science",
      iconName: "Hash",
      description: "Fundamental package for scientific computing with Python, enabling multi-dimensional arrays and math routines.",
      practicalUse: "Array manipulations and numerical signal operations in rPPG video frame processing.",
      relatedSkills: ["Pandas", "Python", "Matplotlib"],
      color: "#f59e0b",
      phi: 1.05,
      theta: 2.0
    },
    {
      id: "matplotlib",
      name: "Matplotlib",
      category: "Data Science",
      iconName: "BarChart3",
      description: "Comprehensive plotting library for creating static, animated, and interactive visualizations in Python.",
      practicalUse: "Plotted performance curves, confusion matrices, and exploratory data distributions.",
      relatedSkills: ["Seaborn", "Pandas", "Python"],
      color: "#f59e0b",
      phi: 1.45,
      theta: 3.3
    },
    {
      id: "seaborn",
      name: "Seaborn",
      category: "Data Science",
      iconName: "LineChart",
      description: "Statistical data visualization library based on Matplotlib providing attractive statistical graphics.",
      practicalUse: "Generated correlation heatmaps and feature distribution plots for academic research.",
      relatedSkills: ["Matplotlib", "Pandas", "Data Science"],
      color: "#f59e0b",
      phi: 1.85,
      theta: 4.6
    },

    // Developer and AI Tools (Sky Blue / Cyan)
    {
      id: "google-antigravity",
      name: "Google Antigravity",
      category: "Developer and AI Tools",
      iconName: "Compass",
      description: "Modern AI-assisted development environment used for accelerated software exploration and workflows.",
      practicalUse: "Explored AI integration and rapid software engineering workflows.",
      relatedSkills: ["Google AI Studio", "Gemini API", "Python"],
      color: "#38bdf8",
      phi: 2.25,
      theta: 5.9
    },
    {
      id: "google-ai-studio",
      name: "Google AI Studio",
      category: "Developer and AI Tools",
      iconName: "Sliders",
      description: "Web-based prototyping environment for experimenting with Gemini models, system instructions, and prompt tuning.",
      practicalUse: "Tuned system prompts and tested API response behaviors for the voice assistant project.",
      relatedSkills: ["Gemini API", "Prompt Engineering", "Google Antigravity"],
      color: "#38bdf8",
      phi: 0.40,
      theta: 1.1
    },
    {
      id: "jupyter",
      name: "Jupyter",
      category: "Developer and AI Tools",
      iconName: "BookOpen",
      description: "Interactive web-based computing environment for executing Python code cells and visualizing outputs.",
      practicalUse: "Conducted iterative machine learning experiments, dataset exploration, and model evaluations.",
      relatedSkills: ["Python", "Pandas", "Scikit-learn"],
      color: "#38bdf8",
      phi: 0.80,
      theta: 2.4
    },

    // Additional Tools (Violet / Purple)
    {
      id: "tableau",
      name: "Tableau",
      category: "Additional Tools",
      iconName: "PieChart",
      description: "Visual analytics platform used to transform raw data into interactive, shareable business intelligence dashboards.",
      practicalUse: "Built exploratory visual dashboards to communicate structured data trends.",
      relatedSkills: ["Power BI", "SQL"],
      color: "#a855f7",
      phi: 1.20,
      theta: 3.7
    },
    {
      id: "power-bi",
      name: "Power BI",
      category: "Additional Tools",
      iconName: "BarChart",
      description: "Business analytics service providing interactive visualizations and business intelligence reporting.",
      practicalUse: "Modeled metrics and reports for academic data analysis coursework.",
      relatedSkills: ["Tableau", "SQL"],
      color: "#a855f7",
      phi: 1.60,
      theta: 5.0
    },
    {
      id: "jira",
      name: "Jira",
      category: "Additional Tools",
      iconName: "CheckSquare",
      description: "Project management tool for agile software teams to plan, track, and manage software releases.",
      practicalUse: "Familiar with agile issue tracking, backlog management, and sprint task organization.",
      relatedSkills: ["Confluence", "MS Project"],
      color: "#a855f7",
      phi: 2.00,
      theta: 0.3
    },
    {
      id: "salesforce",
      name: "Salesforce",
      category: "Additional Tools",
      iconName: "Cloud",
      description: "Enterprise CRM platform for tracking customer lifecycle interactions, accounts, and business processes.",
      practicalUse: "Understanding of structured enterprise CRM workflows and customer communication handling.",
      relatedSkills: ["Jira"],
      color: "#a855f7",
      phi: 2.40,
      theta: 1.6
    },
    {
      id: "confluence",
      name: "Confluence",
      category: "Additional Tools",
      iconName: "FileText",
      description: "Team collaboration software used for creating technical documentation, project specs, and knowledge bases.",
      practicalUse: "Familiarity with maintaining technical documentation and team knowledge sharing.",
      relatedSkills: ["Jira"],
      color: "#a855f7",
      phi: 0.50,
      theta: 2.9
    },
    {
      id: "lucidchart",
      name: "Lucidchart",
      category: "Additional Tools",
      iconName: "Workflow",
      description: "Intelligent diagramming application used to visualize software architecture, ER diagrams, and flowcharts.",
      practicalUse: "Drafted database ER diagrams and system process flows for project architecture.",
      relatedSkills: ["MS Project", "MySQL"],
      color: "#a855f7",
      phi: 0.90,
      theta: 4.2
    },
    {
      id: "ms-project",
      name: "MS Project",
      category: "Additional Tools",
      iconName: "Calendar",
      description: "Project management software developed for developing schedules, assigning resources, and tracking progress.",
      practicalUse: "Project timeline planning, milestone scheduling, and task dependency mapping.",
      relatedSkills: ["Jira", "Lucidchart"],
      color: "#a855f7",
      phi: 1.30,
      theta: 5.5
    }
  ],

  tools: [
    { name: "Google Antigravity", category: "AI Tools & Prototyping", purpose: "AI-assisted development platform for software engineering workflows.", icon: "Compass" },
    { name: "Google AI Studio", category: "AI Tools & Prototyping", purpose: "Prototyping with Gemini models, system instructions, and API key management.", icon: "Sliders" },
    { name: "Jupyter", category: "Development", purpose: "Interactive Python execution, exploratory data analysis, and ML model experimentation.", icon: "BookOpen" },
    { name: "Tableau", category: "Data & BI", purpose: "Building visual analytics dashboards and communicating complex data trends.", icon: "PieChart" },
    { name: "Power BI", category: "Data & BI", purpose: "Business intelligence modeling, reporting dashboards, and dataset visualization.", icon: "BarChart" },
    { name: "Jira", category: "Collaboration & Agile", purpose: "Agile issue tracking, sprint planning, and task backlog management.", icon: "CheckSquare" },
    { name: "Salesforce", category: "Collaboration & Agile", purpose: "Enterprise CRM ecosystem awareness and structured data workflows.", icon: "Cloud" },
    { name: "Confluence", category: "Collaboration & Agile", purpose: "Technical documentation, architecture notes, and team knowledge sharing.", icon: "FileText" },
    { name: "Lucidchart", category: "Diagramming & Planning", purpose: "System architecture diagrams, database ER schemas, and process flowcharts.", icon: "Workflow" },
    { name: "MS Project", category: "Diagramming & Planning", purpose: "Project scheduling, milestone tracking, and resource allocation planning.", icon: "Calendar" }
  ],

  projects: [
    {
      id: "personal-ai-voice-assistant",
      title: "Personal AI Voice Assistant",
      category: "AI & Deep Learning",
      type: "AI & Voice Application",
      shortDescription: "Built a personal voice assistant integrated with the Gemini API, enabling voice-based interaction and AI-generated responses. Explored AI integration using Google AI Studio and Google Antigravity.",
      fullDescription: `Built a personal voice assistant integrated with the Gemini API, enabling voice-based interaction and AI-generated responses. The project explores practical AI integration using Google AI Studio and Google Antigravity.

The application captures voice input, processes user queries, transmits structured prompts to Google's Gemini models via API, and generates clear voice responses, demonstrating hands-on proficiency with modern generative AI toolchains and API integration.`,
      technologies: ["Gemini API", "Google AI Studio", "Google Antigravity", "Python", "Prompt Engineering", "Voice Interaction"],
      features: [
        "Voice input capture and spoken query processing",
        "API integration connecting application logic to Google Gemini models",
        "Prompt engineering to calibrate structured, accurate AI responses",
        "Audio feedback and voice-based interaction output",
        "Workflow exploration using Google AI Studio and Google Antigravity"
      ],
      outcomes: [
        "Delivered a working voice assistant prototype demonstrating generative AI capabilities",
        "Gained practical experience orchestrating AI model APIs and prompt structures"
      ],
      role: "Software Developer",
      affiliation: "Independent Engineering Project",
      iconName: "Bot",
      featured: true,
      githubUrl: "https://github.com/faisalrehman07/"
    },
    {
      id: "hotel-management-website",
      title: "Hotel Management Website",
      category: "Full Stack",
      type: "Full Stack Web Application",
      shortDescription: "Developed a hotel management website with table booking and food ordering functionality, focusing on user interaction and online service management.",
      fullDescription: `Developed a hotel management website designed to streamline online customer service operations. The platform incorporates table booking and food ordering features, emphasizing clear user interaction, responsive design, and intuitive online service management.

Customers can view available tables, make reservations, browse menu categories, and assemble orders through a clean, responsive web interface.`,
      technologies: ["Web Development", "JavaScript", "HTML5", "CSS3", "Table Booking", "Food Ordering", "Responsive UI"],
      features: [
        "Interactive table reservation workflow with date and time selection",
        "Food menu catalog with item details and category filtering",
        "Client-side order assembly and cart management logic",
        "Mobile-responsive layout optimized for smartphones and desktops",
        "Clear confirmation and booking status feedback for users"
      ],
      outcomes: [
        "Created an accessible web platform focusing on real-world customer service workflows",
        "Strengthened client-side state handling, DOM manipulation, and responsive layout styling"
      ],
      role: "Frontend / Web Developer",
      affiliation: "Independent Engineering Project",
      iconName: "Utensils",
      featured: true,
      githubUrl: "https://github.com/faisalrehman07/"
    },
    {
      id: "hospital-management-system",
      title: "Healthcare and Hospital Management System",
      category: "Internship Case Study",
      type: "Full Stack Internship Project",
      shortDescription: "Developed a Hospital Management System during my internship at CifTech Solutions Pvt. Ltd., using .NET and MySQL.",
      fullDescription: `Developed during an internship at CifTech Solutions Pvt. Ltd., Bengaluru, titled "A Study of Hospital Management System". The project was engineered to improve administrative and operational efficiency across healthcare workflows.

The system incorporates structured relational database architecture built with MySQL and application development via the .NET framework, delivering reliable patient records handling, staff management, and operational clarity.`,
      technologies: [".NET", "MySQL", "Full-Stack Development", "Database Management", "SQL", "Healthcare Workflow"],
      features: [
        "Patient registration and medical record database management",
        "Operational workflow tracking for improved healthcare administration",
        "Relational database schema designed and normalized using MySQL",
        "Application backend and business logic implemented using .NET",
        "Comprehensive project lifecycle from planning to execution and delivery"
      ],
      outcomes: [
        "Delivered full-stack software solution during professional IT internship",
        "Received positive feedback for potential long-term structural improvements",
        "Successfully applied academic software principles to a real-world IT workflow"
      ],
      role: "Full-Stack Development Intern",
      affiliation: "CifTech Solutions Pvt. Ltd., Bengaluru",
      iconName: "Hospital",
      featured: true,
      githubUrl: "https://github.com/faisalrehman07/"
    },
    {
      id: "finance-tracking-wallet",
      title: "Finance Tracking Wallet",
      category: "Full Stack",
      type: "Full Stack Financial Application",
      shortDescription: "Developed a full-stack application designed to track and manage financial activities.",
      fullDescription: `Developed a full-stack application designed for personal financial management and expense tracking. The system enables users to log income and expenditures, assign custom budget categories, track spending trends over time, and maintain organized financial records.

Focuses on straightforward data entry, category filtering, and clear financial summaries for users.`,
      technologies: ["Full-Stack Development", "Database Management", "JavaScript", "HTML5", "CSS3", "UI/UX Design"],
      features: [
        "Categorized expense and income logging with date tracking",
        "Category breakdown to visualize spending distribution",
        "Transaction history with search and filtering capabilities",
        "Persistent record storage and clear balance calculations",
        "Clean, user-friendly interface tailored for daily financial logging"
      ],
      outcomes: [
        "Delivered a practical personal finance utility for managing income and expenses",
        "Applied database concepts and client-side logic to real-world personal accounting"
      ],
      role: "Full-Stack Developer",
      affiliation: "Independent Engineering Project",
      iconName: "Wallet",
      featured: true,
      githubUrl: "https://github.com/faisalrehman07/"
    },
    {
      id: "car-parking-management",
      title: "Car Parking Management System",
      category: "Full Stack",
      type: "Full Stack Software Project",
      shortDescription: "A full-stack application for managing parking operations using web development and database technologies.",
      fullDescription: `Developed a full-stack software application to organize and streamline parking facility operations. The application provides slot availability tracking, automated entry and exit timestamping, ticket billing calculation, and database tracking for parking lots.`,
      technologies: ["Web Development", "SQL Database", "Full-Stack Development", "CRUD Operations", "Backend Logic"],
      features: [
        "Parking slot availability monitoring and status updates",
        "Entry and exit ticketing with automated parking fee calculations",
        "Relational database storage for historical vehicle records and transactions",
        "Operator dashboard with quick search and vehicle lookup functionality"
      ],
      outcomes: [
        "Streamlined vehicular tracking and reduced manual parking bookkeeping",
        "Implemented database transactions ensuring data consistency and record reliability"
      ],
      role: "Full-Stack Developer",
      affiliation: "Academic Project",
      iconName: "Car",
      featured: false,
      githubUrl: "https://github.com/faisalrehman07/"
    },
    {
      id: "loan-eligibility-prediction",
      title: "Loan Eligibility Prediction",
      category: "AI & Deep Learning",
      type: "Academic Machine Learning Project",
      shortDescription: "An academic machine learning project using deep learning techniques to predict loan eligibility.",
      fullDescription: `Built as an academic machine learning project using deep learning techniques to predict applicant loan eligibility based on financial attributes. The project utilizes neural network classification to evaluate applicant profiles, credit history, income brackets, and asset values.`,
      technologies: ["Python", "Deep Learning", "TensorFlow / Keras", "Scikit-learn", "Pandas", "Feature Engineering"],
      features: [
        "Applicant data preprocessing, missing value imputation, and feature encoding",
        "Feature correlation analysis to identify key drivers of loan eligibility",
        "Multi-layer neural network model training using TensorFlow and Keras",
        "Evaluation using confusion matrix, precision, recall, and accuracy metrics"
      ],
      outcomes: [
        "Built an end-to-end machine learning pipeline from raw dataset to trained model",
        "Demonstrated practical application of deep learning techniques in financial risk modeling"
      ],
      role: "Developer / Analyst",
      affiliation: "Navkis College of Engineering / VTU",
      iconName: "BadgePercent",
      featured: false,
      githubUrl: "https://github.com/faisalrehman07/"
    },
    {
      id: "heart-rate-stress-rppg",
      title: "Heart Rate Monitoring and Stress-Level Prediction using rPPG",
      category: "AI & Deep Learning",
      type: "Academic Major Project",
      shortDescription: "A major academic project focused on heart-rate monitoring and stress-level prediction using remote photoplethysmography (rPPG).",
      fullDescription: `A major academic project focused on contactless physiological monitoring using remote photoplethysmography (rPPG). The system detects subtle facial color variations from video feeds to extract optical pulse signals and predict real-time stress levels.

Combines computer vision techniques with machine learning predictive modeling for non-invasive health analytics.`,
      technologies: ["Python", "Computer Vision", "rPPG Signal Processing", "Machine Learning", "NumPy", "Pandas"],
      features: [
        "Contactless optical pulse extraction from facial video streams using rPPG",
        "Signal filtering and color channel processing to isolate heart rate frequencies",
        "Machine learning model evaluation for classifying stress states",
        "Visual analytics display presenting extracted pulse signals"
      ],
      outcomes: [
        "Completed rigorous major project defense with technical demonstrations",
        "Demonstrated practical competence in computer vision and biomedical signal processing"
      ],
      role: "Lead Student Researcher / Developer",
      affiliation: "Navkis College of Engineering / VTU",
      iconName: "HeartPulse",
      featured: false,
      githubUrl: "https://github.com/faisalrehman07/"
    },
    {
      id: "self-manual-driven-rover",
      title: "Self and Manual Driven Rover",
      category: "IoT / Hardware",
      type: "IoT & Embedded Project",
      shortDescription: "An IoT-based rover project focused on rover control and functionality.",
      fullDescription: `An IoT-based robotics project focused on rover control, autonomous obstacle avoidance, and manual teleoperation functionality. The vehicle features dual-mode operation: autonomous guidance driven by proximity sensors, and manual wireless remote control.`,
      technologies: ["IoT Architecture", "Embedded Sensors", "Autonomous Navigation", "Hardware Interfacing", "Motor Control"],
      features: [
        "Dual-mode operation switching between autonomous and manual control",
        "Sensor integration for real-time obstacle detection and avoidance",
        "Wireless remote command transmission and motor control execution",
        "Chassis design and power-distribution wiring for embedded mobility"
      ],
      outcomes: [
        "Demonstrated practical IoT embedded system integration and hardware-software interfacing",
        "Exhibited in academic project exhibitions"
      ],
      role: "IoT Systems Developer",
      affiliation: "Navkis College of Engineering",
      iconName: "Bot",
      featured: false,
      githubUrl: "https://github.com/faisalrehman07/"
    }
  ],

  experience: [
    {
      id: "twenty-four-seven-ai",
      title: "Digital Advisor",
      organization: "[24]7.ai",
      location: "Bengaluru, India",
      period: "09/2025 - 12/2026",
      category: "Professional Experience",
      badge: "Digital Advisory",
      summary: "Supported customer interactions through email and social media channels in a digital customer service environment.",
      highlights: [
        "Supported customer interactions through email and social media channels in a digital customer service environment.",
        "Focused on clear written communication, professional email etiquette, and customer-oriented responses.",
        "Built experience working within team processes, adapting to customer needs, and taking responsibility for assigned tasks.",
        "Contributed strong problem-solving capabilities, adaptability, and high professional standards in a collaborative team setting."
      ],
      skillsGained: ["Professional Communication", "Email Etiquette", "Customer Problem Solving", "Team Collaboration", "Digital Channels"]
    },
    {
      id: "ciftech-internship",
      title: "Full-Stack Development Intern",
      organization: "CifTech Solutions Pvt. Ltd.",
      location: "Bengaluru, India",
      period: "2024 - 2025",
      category: "Internship",
      badge: "Software Internship",
      summary: "Developed a Hospital Management System project using .NET and MySQL, applying full-stack development and database concepts to a practical healthcare workflow.",
      highlights: [
        "Developed a Hospital Management System project using .NET and MySQL.",
        "Applied full-stack development and database concepts to a practical healthcare workflow.",
        "Gained hands-on experience with project planning, implementation, debugging, and delivering a functional software solution.",
        "Designed structured relational schemas, table relationships, and data operations ensuring data consistency."
      ],
      skillsGained: [".NET", "MySQL", "Full-Stack Development", "Database Management", "Debugging", "Project Planning"]
    },
    {
      id: "nicc-internship",
      title: "Cyber Security Intern",
      organization: "National Information and Cyber Security Council (NICC)",
      location: "Bengaluru, India",
      period: "10/2023 - 11/2023",
      category: "Internship",
      badge: "Security Internship",
      summary: "Completed training in web application Vulnerability Assessment and Penetration Testing (VAPT), networking fundamentals, and responsible security practices.",
      highlights: [
        "Completed training in web application Vulnerability Assessment and Penetration Testing (VAPT).",
        "Practiced networking fundamentals, web application scanning, vulnerability analysis, and penetration-testing concepts.",
        "Learned about common cyber threats, defensive measures, and responsible security practices.",
        "Applied security principles to evaluate common web vulnerabilities and defensive countermeasures."
      ],
      skillsGained: ["VAPT", "Vulnerability Analysis", "Web Application Scanning", "Networking Fundamentals", "Defensive Security"]
    }
  ],

  certifications: [
    {
      id: "cert-ieee-2025",
      title: "Participant in IEEE Project Expo 2025",
      issuer: "IEEE Bangalore Section and Mysore Subsection",
      dateOrYear: "01/2025 - 12/2025",
      category: "Expos & Competitions",
      description: "Participated in a technical project exhibition in association with the IEEE Bangalore Section and Mysore Subsection.",
      skillsCovered: ["Technical Presentation", "Project Defense", "IEEE Exhibition"]
    },
    {
      id: "cert-mini-expo-2024",
      title: "Mini Project Expo 2024 Participant",
      issuer: "Department of IT, Navkis College of Engineering",
      dateOrYear: "2024",
      category: "Expos & Competitions",
      description: "Department of IT, Navkis College of Engineering, Hassan; presented a technical project and engaged with evaluators and peer teams.",
      skillsCovered: ["Project Presentation", "Peer Evaluation", "Technical Demonstration"]
    },
    {
      id: "cert-nicc",
      title: "Cyber Security Internship & Training",
      issuer: "National Information and Cyber Security Council (NICC)",
      dateOrYear: "2025",
      category: "Cybersecurity",
      description: "Web application Vulnerability Assessment and Penetration Testing (VAPT) and cyber defense fundamentals.",
      skillsCovered: ["VAPT", "Web App Defense", "Vulnerability Scanning", "Network Fundamentals"]
    },
    {
      id: "cert-10seconds",
      title: "Soft Skills & Microsoft Office Trainee",
      issuer: "10 Seconds",
      dateOrYear: "07/2022 - 08/2022",
      category: "Professional & Office",
      description: "Developed workplace communication, time management, organization, and collaboration skills. Practiced document formatting in Word, data entry and analysis in Excel, and presentation creation in PowerPoint.",
      skillsCovered: ["Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint", "Workplace Communication"]
    },
    {
      id: "cert-chatgpt-guvi",
      title: "ChatGPT for Everyone",
      issuer: "GUVI",
      dateOrYear: "2024",
      category: "AI & Prompt Engineering",
      description: "Training covering generative AI concepts, prompt design, and AI tooling workflows.",
      skillsCovered: ["ChatGPT", "Generative AI", "Prompt Engineering"]
    },
    {
      id: "cert-ai-be10x",
      title: "AI Tools and ChatGPT Workshop",
      issuer: "be10X",
      dateOrYear: "2024",
      category: "AI & Prompt Engineering",
      description: "Hands-on workshop on leveraging modern AI tools for productivity, automation, and accelerated shipping.",
      skillsCovered: ["AI Tools", "Productivity", "Prompting Techniques"]
    },
    {
      id: "cert-atingi",
      title: "Computing Skills for Business",
      issuer: "atingi",
      dateOrYear: "2024",
      category: "Professional & Office",
      description: "Digital business computing certification focusing on IT competencies, digital ethics, and workplace technology.",
      skillsCovered: ["Business Computing", "Digital Literacy", "Data Management"]
    }
  ],

  languages: [
    { name: "English", proficiency: "Advanced" },
    { name: "Hindi", proficiency: "Advanced" },
    { name: "Arabic", proficiency: "Basic" }
  ],

  beyondCode: [
    {
      title: "AI Tools & Emerging Tech",
      category: "Technology",
      description: "Exploring new AI developer tooling, multi-modal APIs, and modern frontend design paradigms.",
      icon: "Cpu"
    },
    {
      title: "Outer Space & Astronomy",
      category: "Science",
      description: "Fascinated by astrophysics, planetary exploration missions, space sciences, and orbital mechanics.",
      icon: "Orbit"
    },
    {
      title: "Personal Coding Projects",
      category: "Software Craft",
      description: "Building utilities, exploring new frameworks, database schemas, and micro-applications.",
      icon: "Laptop"
    },
    {
      title: "Fitness & Wellness",
      category: "Lifestyle",
      description: "Maintaining mental resilience, focus, and energy through consistent physical training.",
      icon: "Activity"
    }
  ]
};
