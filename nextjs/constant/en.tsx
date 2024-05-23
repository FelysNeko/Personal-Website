export const NAVIGATION = [
  { key: "Home", href: "/" },
  { key: "Toolset", href: "/toolset" },
  { key: "Felys", href: "/felys" },
];

export const LINKTREE = [
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

export const MORE = [
  {
    topic: "General Information",
    response:
      "My preferred name is Jonny Jin, and you might know me as FelysNeko or Jhanny Kin on the Internet.",
  },
  {
    topic: "Hobbies and Interests",
    response: "I enjoy playing frisbee, guitar, and coding.",
  },
  {
    topic: "Tech Stack",
    response:
      "I know Python and C the best, and am currently learning Rust, because I want to do lower level development like programming language or operating system in the future. Although I can also do full stack web development, it's not my favourite path, so I won't get too deep into it.",
  },
  {
    topic: "Side Projects",
    response:
      "I no longer post my side projects to the public. However, I will bring the big ones to this website for demo purpose, and the source code will be available in website repository.",
  },
  {
    topic: "Special Thanks",
    response:
      "Special thanks to the open source project AutonotionR by CuriousR82, another uWaterloo underguadate. This project helped me get into modern web development.",
  },
  {
    topic: "Lisence",
    response: "See Apache-2.0",
  },
];

export const DOCS = (
  <>
    Felys is an interpreted language that supports function, variable,
    expression evaluation. Code style is similar to Rust and Python. This
    project is hobby only. Since I do not have time to do enough testing, it is
    still unstable.
    <br />
    <br />
    There are four data types: number, string, boolean, and none, and you cannot
    convert them to each others with a few exceptions. Numbers in Felys is
    calculated by the largest decimal number in Rust. If a number exceeded the
    limit, it will lose accuracy. Either
    <code className="badge">"elysia"</code> or
    <code className="badge">'elysia'</code> is a valid string.
    <code className="badge">true</code> and
    <code className="badge">false</code> are boolean.
    <code className="badge">none</code> is none, but it is the default value
    returned from a function that does not explicitly return anything. Thus, we
    usually do not use it.
    <br />
    <br />
    All variables and callables need to be declared as
    <code className="badge">{"let x = 10;"}</code> or
    <code className="badge">{"let x = |x| x+1;"}</code>. You do not need to
    re-declared a variable when assigning a value to it. Assigning a new
    function to callable is invalid. If a function has multiple lines or you do
    not want to return anything, you can decalre it like this:
    <code className="badge">{"let x = |x| { x-1; }"}</code>
    Also, a variable can have the same name as a callable, since they
    standalone.
    <br />
    <br />
    Arithmatic operator:
    <>
      {["+", "-", "*", "/", "%"].map((each) => (
        <code className="badge mx-1" key={each}>
          {each}
        </code>
      ))}
    </>
    <br />
    Unary operator:
    <>
      {["!"].map((each) => (
        <code className="badge mx-1" key={each}>
          {each}
        </code>
      ))}
    </>
    <br />
    Comparison operator:
    <>
      {[">", ">=", "==", "<=", "<"].map((each) => (
        <code className="badge mx-1" key={each}>
          {each}
        </code>
      ))}
    </>
    <br />
    logical operator:
    <>
      {["and", "or"].map((each) => (
        <code className="badge mx-1" key={each}>
          {each}
        </code>
      ))}
    </>
    <br />
    Assignement operator:
    <code className="badge mx-1">=</code>
    <br />
    Note that you can use <code className="badge">+</code> to concat string and
    number.
    <br />
    <br />
    Keyword <code className="badge">if</code>,
    <code className="badge">elif</code>, <code className="badge">else</code>,
    and
    <code className="badge">while</code>
    is pretty much the same as other languages. You do not need to put
    parentheses around the expression, but you do need a code block after it,
    meaing braces.
    <code className="badge">render</code> is the same as
    <code className="badge">print</code>
    in Python, which means to show some output. If{" "}
    <code className="badge">return</code> is not used in a function, the program
    will exit early just like C. Additionally, semicolun is a must unless the
    line of code end with brace.
  </>
);

export const TOOLSET = [
  {
    key: "image",
    href: "/toolset/image",
  },
  {
    key: "chemistry",
    href: "/toolset/chemistry",
  },
];
