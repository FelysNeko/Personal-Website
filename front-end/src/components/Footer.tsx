interface Props {
  mode: string;
}

const Footer = ({ mode }: Props) => {
  return (
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary"
      data-bs-theme={mode}
    >
      <div className="container-lg">
        <span className="navbar-text">Website authored by FelysNeko</span>
      </div>
    </nav>
  );
};

export default Footer;
