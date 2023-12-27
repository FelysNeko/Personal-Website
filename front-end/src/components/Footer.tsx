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
        <span className="navbar-text">Authored by GalaxyNeko &nbsp;|&nbsp; 银河猫猫侠</span>
      </div>
    </nav>
  );
};

export default Footer;
