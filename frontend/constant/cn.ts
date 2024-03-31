export const NAVIGATION = [
  { key: "经历", href: "#experience" },
  { key: "项目", href: "#project" },
  { key: "更多", href: "#more" },
];

export const LINKREE = [
  { icon: "/icon/linkedin.svg", href: "https://www.linkedin.com/in/jonny-jin" },
  { icon: "/icon/github.svg", href: "https://github.com/FelysNeko" },
  { icon: "/icon/instagram.svg", href: "https://www.instagram.com/jhanny_kin" },
];

export const EXPERIENCE = [
  {
    time: "2024/01 - 2024/04",
    title: "全栈开发",
    employer: "GroovEver",
    about:
      "设计并实现网站后端和管理仪表板，深度参与前端开发，将前端和后端容器化，并且最终将其部署在具在云服务上，支持负载平衡和弹性伸缩。",
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
    time: "2021/09 - 2023/05",
    title: "志愿课程辅导",
    employer: "上海协和双语教科学校",
    about:
      "辅导其他同学高中代数/微积分/编程超过80小时，内容包括帮助同学复习上课内容以及制作模拟测验和测试。",
    skills: ["tutoring", "python"],
  },
];

export const PROJECT = [
  {
    image: "/firemoth-light.png",
    title: "Felys解释器项目",
    skills: ["C", "Rust", "Makefile"],
    about:
      "制作了一款AST解析器和一个简易的编程语言，可以做到基本的计算和逻辑运算",
    github: "https://github.com/FelysNeko/S-Expression-Converter",
  },
  {
    image: "/firemoth-light.png",
    title: "个人网站",
    skills: ["next.js", "typescript", "tailwindcss"],
    about: "制作了一个静态的网站用作于我的主页",
    github: "https://github.com/FelysNeko/Personal-Website",
  },
  {
    image: "/firemoth-light.png",
    title: "化学计算器",
    skills: ["python", "flask"],
    about:
      "这是一个Python的包可以解决一些高中难度的化学题，并且以此为基础制作了一个命令行工具和网站",
    github: "https://github.com/FelysNeko/Chemistry-Calculator",
  },
  {
    image: "/firemoth-light.png",
    title: "B站社区维护包",
    skills: ["bs4", "scikit-learn", "pandas"],
    about:
      "提供一系列工具从B站抓取数据，然后训练了一个词袋模型用于过滤和举报违规评论，成功率高达90%",
    github: "https://github.com/FelysNeko/BiliBili-Community-Suite",
  },
];

export const MORE = [
  {
    topic: "我的名字",
    response:
      "在加拿大这边我一般叫Jonny Jin，常用网名是FelysNeko和Jhanny Kin。值得提一嘴的是：Felys是帕朵（Pardofelis）和爱莉（Elysia）名字的结合，然后Neko的意思是猫猫。",
  },
  {
    topic: "兴趣爱好",
    response:
      "以普遍理性而言，我还是偏好于二次元的世界，唯二的例外是敲代码和打盘。最喜欢崩坏这个IP，单推爱莉，同时也是EVA厨，个人比较喜欢明日香。",
  },
  {
    topic: "技术栈",
    response:
      "个人最喜欢也最擅长Python和C，同时在学习Rust，主要是因为喜欢像编程语言或者操作系统这种偏底层的东西。虽然我也做全栈开发，但毕竟不算事最喜欢的，所以应该不会走的很深。",
  },
  {
    topic: "特别鸣谢",
    response:
      "十分感谢由CuriousR82制作的AutonotionR开源项目，作者也是滑铁卢大学的学生。这个项目帮助我快速的入门了现代网站开发，是不错的参考。",
  },
  {
    topic: "Lisence",
    response: "参考MIT LISENCE。",
  },
];
