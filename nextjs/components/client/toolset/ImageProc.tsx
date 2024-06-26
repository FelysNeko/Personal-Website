"use client";
import { useState, useRef, useEffect } from "react";
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

  const reload = async () => {
    if (raw === null) {
      return;
    }

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
      setResult(URL.createObjectURL(raw));
      setErr(false);
    } else {
      setResult("/firemoth-dark.png");
      setRaw(null);
      setErr(true);
    }
  };

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      reload();
    }, 150);
  }, [thr]);

  useEffect(() => {
    reload();
  }, [clr, rev, raw]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const image = e.target.files[0];
      setOriginal(URL.createObjectURL(image));
      setRaw(image);
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
    <>
      <div className="flex flex-col w-full md:flex-row h-[calc(100vh-322px)] min-h-48 p-2">
        <div className="flex-grow relative">
          <Image src={original} alt="" style={{ objectFit: "contain" }} fill />
        </div>
        <div className="divider md:divider-horizontal" />
        <div className="flex-grow relative">
          <Image src={result} alt="" style={{ objectFit: "contain" }} fill />
        </div>
      </div>

      <div className="w-full border border-neutral-800 py-2 mt-3 lg:mt-11">
        <div className="p-2 md:px-6 lg:flex items-center justify-between">
          <input
            type="file"
            className="file-input file-input-bordered w-full lg:max-w-xs"
            accept=".jpg, .png"
            onChange={handleUpload}
          />
          <div className="flex">
            {COLORCHOICE.map((color) => (
              <button
                key={color.en}
                className={`btn btn-sm lg:btn-md w-1/4 ${
                  clr === color.en ? "btn-primary" : ""
                }`}
                onClick={() => setClr(color.en)}
              >
                {lang === "中" ? color.cn : color.en.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="p-2 md:px-6 flex items-center gap-2 lg:gap-4">
          <h3 className="break-keep">{lang === "中" ? "反转" : "REVERSE"}</h3>
          <input
            type="checkbox"
            className="checkbox"
            onChange={(e) => setRev(e.target.checked)}
          />
          <h3 className="break-keep">{lang === "中" ? "阈值" : "THRESHOLD"}</h3>
          <input
            type="range"
            min="0"
            max="255"
            value={thr}
            className="range"
            onChange={(e) => setThr(e.target.value)}
          />
          <button className="ms-2 me-1" onClick={handleDownload}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              style={{ scale: 1.4 }}
            >
              <path
                d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5"
                stroke="#ffc6f5"
                strokeWidth={1}
              />
              <path
                d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708z"
                stroke="#ffc6f5"
                strokeWidth={1}
              />
            </svg>
          </button>
        </div>
      </div>

      {err && (
        <div className="toast toast-start">
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
        </div>
      )}
    </>
  );
};

export default ImageProc;
