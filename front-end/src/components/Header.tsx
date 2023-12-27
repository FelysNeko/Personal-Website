import ThemeButton from "./ThemeButton";
import lightLogo from "../images/firemoth-light.png";
import darkLogo from "../images/firemoth-dark.png";
import { useEffect, useState } from "react";

interface Props {
  mode: string;
  setMode: (mode: string) => void;
}

const Header = ({ mode, setMode }: Props) => {
  const [links, setLinks] = useState([{ platform: "", href: "" }]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/information", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ action: "links" }),
    })
      .then((response) => response.json())
      .then((data) => setLinks(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <nav
      className="navbar fixed-top navbar-expand-lg bg-body-tertiary"
      data-bs-theme={mode}
    >
      <div className="container-lg">
        <a className="navbar-brand" href="#home">
          <img
            className="me-1 d-inline-block align-text-center"
            src={mode === "light" ? darkLogo : lightLogo}
            alt="Elysia"
            height="40"
          />
          GalaxyNeko
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="nav-link active"
                aria-current="page"
                href="#projects"
              >
                Projects
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#more">
                More
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Linktree
              </a>
              <ul className="dropdown-menu">
                {links.map((each) => (
                  <li key={each.platform}>
                    <a
                      className="dropdown-item"
                      target="_blank"
                      rel="noreferrer"
                      href={each.href}
                    >
                      {each.platform}
                    </a>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <ThemeButton mode={mode} setMode={setMode} />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
