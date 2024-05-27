export const NAVIGATION = [
  { key: "主页", href: "/" },
  { key: "工具", href: "/toolset" },
  { key: "FELYS", href: "/felys" },
];

export const LINKTREE = [
  { icon: "/icon/linkedin.svg", href: "https://www.linkedin.com/in/jonny-jin" },
  { icon: "/icon/github.svg", href: "https://github.com/FelysNeko" },
  { icon: "/icon/instagram.svg", href: "https://www.instagram.com/felysneko" },
];

export const EXPERIENCE = [
  {
    time: "2024/01 - 2024/04",
    title: "全栈开发",
    employer:
      "Bridging Entrepreneurs to Students Initiative - University of Waterloo",
    about:
      "设计并实现网站后端和管理仪表板，深度参与前端开发，将前端和后端容器化打包，并且最终将其部署在具在云服务上，支持负载平衡和弹性伸缩。",
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

export const MORE = [
  {
    topic: "我的名字",
    response: "常用网名是银河猫猫侠。",
  },
  {
    topic: "兴趣爱好",
    response: "喜欢弹琴、敲代码和打盘。",
  },
  {
    topic: "技术栈",
    response:
      "个人最喜欢也最擅长Python和C，同时在学习Rust，主要是因为喜欢像编程语言或者操作系统这种偏底层的东西。虽然我也做全栈开发，但毕竟不算事最喜欢的，所以应该不会走的很深。",
  },
  {
    topic: "副业项目",
    response:
      "我不再公开我的项目代目，但是会将比较好的项目重新整合，然后做进这个网站用于展示，并且源代码保持公开。",
  },
  {
    topic: "特别鸣谢",
    response:
      "十分感谢由CuriousR82制作的AutonotionR开源项目，此项目作者也是滑铁卢大学的学生。它帮助我快速的入门了现代网站开发，是不错的参考。",
  },
  {
    topic: "Lisence",
    response: "参考Apache-2.0",
  },
];

export const DOCS = (
  <>
    Felys支持函数、变量、逻辑/表达式运算，属于纯解释性语言，语言风格类似于Rust和Python。项目仅是个人爱好，没有时间去做大量测试所以并不稳定。
    <br />
    <br />
    数据类型数字、字符串、布尔值和无共四种，并且为强类型无法转换（个别例外）。数字运算是转换为Rust中最大的双精度浮点型，超出这个值损失精度。
    <code className="badge">"elysia"</code>或者
    <code className="badge">'elysia'</code>都是合法的字符串。布尔值为
    <code className="badge">true</code>或者
    <code className="badge">false</code>。无为
    <code className="badge">none</code>
    ，但是这个类型是无返回值函数的默认返回值，一般不会用到的
    <br />
    <br />
    所有变量和函数需要用<code className="badge">{"let x = 10;"}</code>或者
    <code className="badge">{"let x = |x| x+1;"}</code>
    声明，变量再次被赋值的时候不需要声明。函数不能被再次赋值。如果函数有多行或者不需要返回值那可以使用
    <code className="badge">{"let x = |x| { x-1; }"}</code>
    。同时，变量和函数允许重名，之间独立存在互不影响。
    <br />
    <br />
    四则运算符支持
    <>
      {["+", "-", "*", "/", "%"].map((each) => (
        <code className="badge mx-1" key={each}>
          {each}
        </code>
      ))}
    </>
    <br />
    一元运算符支持
    <>
      {["!"].map((each) => (
        <code className="badge mx-1" key={each}>
          {each}
        </code>
      ))}
    </>
    <br />
    比较运算符支持
    <>
      {[">", ">=", "==", "<=", "<"].map((each) => (
        <code className="badge mx-1" key={each}>
          {each}
        </code>
      ))}
    </>
    <br />
    逻辑运算符支持
    <>
      {["and", "or"].map((each) => (
        <code className="badge mx-1" key={each}>
          {each}
        </code>
      ))}
    </>
    <br />
    以及赋值运算符
    <code className="badge mx-1">=</code>
    <br />
    注：可以用<code className="badge">+</code>来拼接字符串和数字
    <br />
    <br />
    关键字<code className="badge">if</code>、<code className="badge">elif</code>
    、<code className="badge">else</code>以及
    <code className="badge">while</code>
    和其他语言基本一致，表达式不需要加括号，后面一定需要跟一个代码块，即大括号。
    <code className="badge">render</code>等同于Python中的
    <code className="badge">print</code>
    ，就是打印输出的意思。<code className="badge">return</code>
    如果不在函数中使用会提前终止程序，和C语言一致。此外，除非以大括号结尾，否侧必须要加分号。
  </>
);

export const TOOLSET = [
  {
    key: "图片处理",
    href: "/toolset/image",
  },
  {
    key: "化学计算器",
    href: "/toolset/chemistry",
  },
];
