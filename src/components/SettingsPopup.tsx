import React, { useState } from "react";

interface Props {
  saveHandl: (fileName: string) => void;
  clearHandl: () => void;
  display: string;
}
export default function SettingsPopup({ saveHandl, clearHandl, display = "hidden" }: Props) {
  const [fileName, setFileName] = useState<string>(`FILE-${new Date().toLocaleString()}.txt`);

  return (
    <div style={{ display }} className="fixed border-2 border-secondary bg-primary w-[25rem] top-[25vh] left-[50%] transform -translate-x-[50%] h-fit">
      <div className="text-center m-auto">Settings</div>
      <hr />
      <div className="m-6">
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <div>File name:</div>
            <input className="m-1 p-1 text-center text-primary rounded-md" value={fileName} onChange={(e) => setFileName(e.target.value)} type="text" autoFocus />
          </div>
          <div className="flex justify-between items-center">
            <button onClick={clearHandl} className="p-2 px-5 rounded-md border-2 transition duration-300 ease-in-out bg-secondary text-primary hover:bg-primary hover:text-secondary hover:border-secondary">
              Clear
            </button>
            <button
              onClick={() => {
                setFileName(`FILE-${new Date().toLocaleString()}.txt`);
                saveHandl(fileName);
              }}
              className="p-2 px-5 rounded-md border-2 transition duration-300 ease-in-out bg-secondary text-primary hover:bg-primary hover:text-secondary hover:border-secondary"
            >
              Download
            </button>
            <button
              onClick={() => {
                window.location.reload();
              }}
              className="p-2 px-5 rounded-md border-2 transition duration-300 ease-in-out bg-red-500 text-secondary hover:bg-primary hover:text-red-500 hover:border-red-500"
            >
              Exit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
