export const NAVIGATION = [
  { key: "Experience", href: "/#experience" },
  { key: "Project", href: "/#project" },
  { key: "More", href: "/#more" },
  { key: "Felys", href: "/felys" },
];

export const LINKREE = [
  { icon: "/icon/linkedin.svg", href: "https://www.linkedin.com/in/jonny-jin" },
  { icon: "/icon/github.svg", href: "https://github.com/FelysNeko" },
  { icon: "/icon/instagram.svg", href: "https://www.instagram.com/jhanny_kin" },
];

export const EXPERIENCE = [
  {
    time: "Jan 2024 - Apr 2024",
    title: "Full-Stack Developer",
    employer:
      "Bridging Entrepreneurs to Students Initiative - University of Waterloo",
    about:
      "Designed and implemented website backend and admin dashboard, participated in frontend development, dockerized frontend and backend, and deployed them on cloud with loading balancing and auto-scaling ability.",
    skills: [
      "flask",
      "sqlalchemy",
      "nginx",
      "postgresql",
      "next.js",
      "typescript",
      "tailwindcss",
      "aws",
      "docker",
      "power automate",
      "cloudflare",
    ],
  },
  {
    time: "Sep 2021 - May 2023",
    title: "Voluntary Peer Tutor",
    employer: "Shanghai United International School - Jiaoke",
    about:
      "Over 80 hours peer tutoring in pre-calculus, calculus, and programming in high school. Roles include reviewing class content and making mock quiz and test for other students.",
    skills: ["tutoring", "python"],
  },
];

export const PROJECT = [
  {
    image: "/firemoth-light.png",
    title: "Felys Project",
    skills: ["C", "Rust", "Makefile"],
    about:
      "Wrote a AST parser and a simple interpretered programming language which can do basic expression evaluation and logical operation.",
    github: "https://github.com/FelysNeko/Felys-Project",
  },
  {
    image: "/firemoth-light.png",
    title: "Personal Website",
    skills: ["next.js", "typescript", "axum"],
    about:
      "Made a static landing website as my portfolio page that support two languages.",
    github: "https://github.com/FelysNeko/Personal-Website",
  },
  {
    image: "/firemoth-light.png",
    title: "Chemistry Calculator",
    skills: ["python", "flask"],
    about:
      "Created a python package that can do high school chemistry problems, and build cli tool and website based on it.",
    github: "https://github.com/FelysNeko/Chemistry-Calculator",
  },
  {
    image: "/firemoth-light.png",
    title: "BiliBili Community Suite",
    skills: ["bs4", "scikit-learn", "pandas"],
    about:
      "Provide tools to fetch data from BiliBili, and trained a bag-of-word model to filter and report comments against community rules with 90% success rate.",
    github: "https://github.com/FelysNeko/BiliBili-Community-Suite",
  },
];

export const MORE = [
  {
    topic: "General Information",
    response:
      "My preferred name is Jonny Jin, and you might know me as FelysNeko or Jhanny Kin on the Internet. By the way, Felys is the combination of two names: Pardofelis and Elysia from Honkai Impact 3rd, and Neko means cat.",
  },
  {
    topic: "Hobbies and Interests",
    response:
      "I enjoy playing frisbee, guitar, and coding. Elysia is my only waifu. Evangelion is my favourite anime, and Asuka is my favourite character.",
  },
  {
    topic: "Tech Stack",
    response:
      "I know Python and C the best, and am currently learning Rust, because I want to do lower level development like programming language or operating system in the future. Although I can also do full stack web development, it's not my favourite path, so I won't get too deep into it.",
  },
  {
    topic: "Special Thanks",
    response:
      "Special thanks to the open source project AutonotionR by CuriousR82, another uWaterloo underguadate. This project helped me get into modern web development.",
  },
  {
    topic: "Lisence",
    response: "See MIT LISENCE.",
  },
];

export const FELYS = {
  Typing: [
    "String: 'elysia' | \"elysia\"",
    "Integer: 42 (only support up to Rust isize)",
    "Boolean: true | false",
  ],
  Variable: ["Value assignment: x = y = z = 'elysia is my waifu'"],
  Evalutaion: [
    "Parenthesis: (a)",
    "Arithmatic: a+b, a-b, a*b, a/b, a%b",
    "Comparison: a>b, a>=b, a==b, a!=b, a<=b, a<=b, a>b",
    "Logical: a&&b, a||b",
    "Unary: +a, -a, !a",
    "You can also use + to concat String.",
  ],
};
