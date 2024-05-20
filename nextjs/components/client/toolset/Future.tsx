"use client";

interface Props {
  lang: string;
}

const Future = ({ lang }: Props) => {
  return (
    <div className="h-full firemoth flex items-center justify-center">
      <h1 className="text-elypink text-3xl font-bold text-center p-2">
        {lang === "中" ? "敬请期待更多项目" : "MORE PROJECTS COMING SOON"}
      </h1>
    </div>
  );
};

export default Future;
