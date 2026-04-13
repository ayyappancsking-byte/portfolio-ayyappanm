export const personalInfo = {
  name: "Ayyappan M",
  phone: "+91 7540042693",
  email: "ayyappancsking@gmail.com",
  linkedin: "https://www.linkedin.com/in/-ayyappanm",
  github: "https://github.com/ayyappancsking-byte",
  githubHandle: "ayyappancsking-byte",
  role: "BSc Computer Science Student",
  tagline: "AI Developer · Full-Stack Builder · Data Enthusiast",
};

export const careerObjective =
  "Ambitious BSc Computer Science final year student with a strong academic foundation and passion for technology. Seeking an entry-level position in a growth-oriented organization where I can apply my programming knowledge, analytical thinking, and quick learning abilities to contribute to team success while continuously enhancing my technical skills.";

export const education = [
  {
    institution: "Kaveri Arts and Science College",
    university: "Periyar University",
    degree: "B.Sc. Computer Science",
    period: "2023 – 2026",
    type: "primary",
    icon: "graduation",
  },
  {
    institution: "Government Higher Secondary School",
    location: "Chettimankurichi",
    degree: "Higher Secondary (HSC)",
    period: "2022 – 2023",
    type: "secondary",
    icon: "school",
  },
];

export const skillCategories = [
  {
    title: "Programming Languages",
    icon: "code",
    skills: ["Python", "SQL", "HTML", "CSS", "JavaScript"],
    accent: "#8b5e3c",
  },
  {
    title: "Data Analysis & Visualization",
    icon: "bar-chart",
    skills: ["Pandas", "NumPy", "Matplotlib", "Seaborn"],
    accent: "#6b7f5e",
  },
  {
    title: "Cloud & Development Tools",
    icon: "cloud",
    skills: ["Google Cloud", "MongoDB"],
    accent: "#5e6b7f",
  },
  {
    title: "Web Development",
    icon: "globe",
    skills: ["FastAPI", "REST APIs"],
    accent: "#7f5e6b",
  },
  {
    title: "Other",
    icon: "layers",
    skills: ["Data Structures", "Algorithms", "Jupyter Notebooks", "Colab"],
    accent: "#7a6b5e",
  },
];

export const projects = [
  {
    id: 1,
    title: "AI Chatbot with Custom Memory",
    summary:
      "Full-stack AI conversational chatbot with custom memory system delivering context-aware responses across multi-turn dialogues using browser-based frontend and FastAPI backend.",
    highlights: [
      {
        metric: "Sub-500ms",
        label: "Response latency in local development",
      },
      {
        metric: "98%",
        label: "Response relevance via Chain of Thought prompting",
      },
      {
        metric: "85%",
        label: "Context loss eliminated via vector embeddings",
      },
      {
        metric: "100%",
        label: "Cross-browser compatibility achieved",
      },
    ],
    bulletPoints: [
      "Implemented Groq API integration with FastAPI backend for real-time response generation.",
      "Developed Advanced Chain of Thought (CoT) prompting system ensuring consistent conversational persona.",
      "Built custom memory retrieval using vector embeddings and cosine similarity search.",
      "Created comprehensive memory persistence system enabling session recovery across browser restarts.",
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Groq API",
      "HTML/CSS/JS",
      "Postman",
      "Local Dev",
    ],
    accentColor: "#8b5e3c",
    tag: "AI · Full-Stack",
  },
  {
    id: 2,
    title: "AI-Based Multi-Item Order & Billing System",
    summary:
      "AI-powered full-stack order processing and automated billing system integrating Google Sheets for real-time multi-item order management and invoice generation using Groq API.",
    highlights: [
      {
        metric: "98%",
        label: "Professional formatting accuracy on receipts",
      },
      {
        metric: "Zero-error",
        label: "Grand total computation across all test cases",
      },
      {
        metric: "100%",
        label: "Uptime for retail business demonstrations",
      },
      {
        metric: "Real-time",
        label: "Order validation via gspread API",
      },
    ],
    bulletPoints: [
      "Implemented real-time order validation using gspread API and service account authentication.",
      "Developed Groq API-powered intelligent receipt generation using gpt-oss-120b model.",
      "Designed interactive customer order interface with real-time total calculations.",
      "Integrated Kaggle Secrets for secure API key management ensuring production-grade security.",
    ],
    technologies: [
      "Python",
      "gspread",
      "Google Sheets API",
      "Groq API",
      "Kaggle Notebooks",
      "JSON",
    ],
    accentColor: "#5e6b8b",
    tag: "AI · Automation",
  },
];

export const internship = {
  role: "Full Stack Development Intern",
  company: "R Tech Solution",
  location: "Perambalur",
  period: "30 May 2025 – 14 June 2025",
  contributions: [
    "Developed and tested basic full-stack web applications using HTML, CSS, JavaScript and backend technologies.",
    "Learned and applied concepts like frontend–backend integration, database handling and version control in real-world scenarios.",
  ],
};

export const certifications = [
  {
    title: "Python for Data Science and AI",
    issuer: "Coursera",
    date: "May 2025",
    color: "#0056d2",
  },
  {
    title: "TCS iON Certification",
    issuer: "Tata Consultancy Services",
    date: "Jan 2025",
    color: "#1a1a5e",
  },
  {
    title: "Guvi Python Certification",
    issuer: "Guvi",
    date: "Sep 2024",
    color: "#e53935",
  },
  {
    title: "Communicating with Confidence",
    issuer: "LinkedIn",
    date: "Jul 2024",
    color: "#0077b5",
  },
  {
    title: "Digital Marketing",
    issuer: "Reliance Foundation Skilling Academy",
    date: "Jun 2025",
    color: "#1565c0",
  },
  {
    title: "Python Programming",
    issuer: "Reliance Foundation Skilling Academy",
    date: "Dec 2025",
    color: "#1565c0",
  },
  {
    title: "MongoDB Basics for Students",
    issuer: "MongoDB",
    date: "Aug 2025",
    color: "#13aa52",
  },
];

export const achievements = [
  {
    title: "Machine Learning Workshop",
    description:
      "Actively participated in a hands-on Machine Learning Workshop conducted by Odugatech Pvt. Ltd., Salem.",
    date: "Oct 19, 2024",
    icon: "cpu",
  },
  {
    title: "Connect with Work Programme",
    description:
      "Successfully completed the Connect with Work Programme by Magic Bus India Foundation, improving communication, teamwork and workplace readiness skills.",
    date: "Completed",
    icon: "users",
  },
  {
    title: "Comprehensive Value Education Programme",
    description:
      "Participated in the CVE Programme at Ramakrishna Mission Ashrama, focusing on ethics, discipline and personality development.",
    date: "Completed",
    icon: "award",
  },
];

export const softSkills = [
  { label: "Teamwork & Collaboration", icon: "users" },
  { label: "Communication", icon: "message-circle" },
  { label: "Problem-Solving", icon: "lightbulb" },
  { label: "Time Management", icon: "clock" },
];

export const languages = [
  { name: "Tamil", level: "Native", flag: "TA" },
  { name: "English", level: "Fluent", flag: "EN" },
  { name: "Telugu", level: "Conversational", flag: "TE" },
];
