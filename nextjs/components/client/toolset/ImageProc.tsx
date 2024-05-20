"use client";
import { useState, useRef } from "react";
import Image from "next/image";

interface Props {
  lang: string;
}

const COLORCHOICE = [
  { cn: "金色", en: "gold" },
  { cn: "暗色", en: "dark" },
  { cn: "亮色", en: "light" },
  { cn: "粉色", en: "pink" },
];

const ImageProc = ({ lang }: Props) => {
  const [clr, setClr] = useState("pink");
  const [thr, setThr] = useState("120");
  const [rev, setRev] = useState(false);
  const [raw, setRaw] = useState<File | null>(null);
  const [err, setErr] = useState(false);
  const [original, setOriginal] = useState("/firemoth-dark.png");
  const [result, setResult] = useState("/firemoth-dark.png");
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  const reload = async (raw: File, clr: string, thr: string, rev: boolean) => {
    const formData = new FormData();
    formData.append("file", raw);

    const response = await fetch(
      `https://api.felysneko.com/fast/image/process?color=${clr}&threshold=${thr}&rev=${rev}`,
      {
        method: "POST",
        body: formData,
      }
    ).catch((e) => console.log(e));

    if (response && response.ok) {
      const raw = await response.blob();
      URL.revokeObjectURL(result);
      setResult(URL.createObjectURL(raw));
      return true;
    } else {
      setErr(true);
      setRaw(null);
      URL.revokeObjectURL(original);
      URL.revokeObjectURL(result);
      setOriginal("/firemoth-dark.png");
      setResult("/firemoth-dark.png");
      return false;
    }
  };

  const handleRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setThr(e.target.value);
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      if (raw) {
        reload(raw, clr, e.target.value, rev);
      }
    }, 150);
  };

  const handleColor = async (color: string) => {
    setClr(color);
    raw && reload(raw, color, thr, rev);
  };

  const handleReverse = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setRev(e.target.checked);
    raw && reload(raw, clr, thr, e.target.checked);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];
      setRaw(image);
      const success = await reload(image, clr, thr, rev);
      success && setOriginal(URL.createObjectURL(image));
    }
  };

  const handleDownload = async () => {
    if (raw) {
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = result;
      a.setAttribute("download", result.split("/").at(-1) || "felysneko.png");
      document.body.appendChild(a);
      a.click();
    }
  };

  return (
    <div className="h-full">
      <div className="flex flex-col w-full md:flex-row h-[calc(100vh-380px)] min-h-48 p-2">
        <div className="flex-grow relative">
          <Image src={original} alt="" style={{ objectFit: "contain" }} fill />
        </div>
        <div className="divider md:divider-horizontal" />
        <div className="flex-grow relative">
          <Image src={result} alt="" style={{ objectFit: "contain" }} fill />
        </div>
      </div>

      <div className="py-4 px-2 md:px-6 lg:flex items-center justify-between lg:mt-4">
        <input
          type="file"
          className="file-input file-input-bordered w-full lg:max-w-xs"
          accept=".jpg, .png"
          onChange={handleUpload}
        />
        <div role="tablist" className="tabs tabs-boxed">
          {COLORCHOICE.map((color) => (
            <button
              key={color.en}
              role="tab"
              className={`tab ${clr === color.en ? "tab-active" : ""}`}
              onClick={() => handleColor(color.en)}
            >
              {lang === "中" ? color.cn : color.en.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="py-4 px-2 md:px-6 flex items-center gap-2 lg:gap-4">
        <h3 className="break-keep">{lang === "中" ? "反转" : "REVERSE"}</h3>
        <input type="checkbox" className="checkbox" onChange={handleReverse} />
        <h3 className="break-keep">{lang === "中" ? "阈值" : "THRESHOLD"}</h3>
        <input
          type="range"
          min="0"
          max="255"
          value={thr}
          className="range"
          onChange={handleRange}
        />
        <button className="ms-2" onClick={handleDownload}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#ffc6f5"
            viewBox="0 0 16 16"
            style={{ scale: 1.4 }}
          >
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5" />
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z" />
          </svg>
        </button>
      </div>
      
      {err && (
        <button className="toast toast-start" onClick={() => setErr(false)}>
          <div className="alert">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-elypink shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span>Image must be less than 1MB</span>
          </div>
        </button>
      )}
    </div>
  );
};

export default ImageProc;
