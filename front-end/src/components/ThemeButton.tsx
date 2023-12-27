interface Props {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeButton = ({ mode, setMode }: Props) => {
  const reverseMode = mode === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      className={"btn btn-" + reverseMode}
      onClick={() => {
        setMode(reverseMode);
      }}
    >
      {reverseMode}
    </button>
  );
};

export default ThemeButton;
