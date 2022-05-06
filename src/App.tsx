import React, { useEffect, useRef, useState } from "react";
import SettingsPopup from "./components/SettingsPopup";

export default function App() {
  const [text, setText] = useState<string>("");
  const [popUp, setPopUp] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(localStorage.getItem("nB") ?? "");
    textAreaRef.current!.selectionStart = text.length;
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        setPopUp(true);
      }
    });
  }, []);

  useEffect(() => {
    if (popUp) {
      textAreaRef.current!.disabled = true;
    } else textAreaRef.current!.disabled = false;
  }, [popUp]);

  function clear() {
    if (confirm("clear ?")) {
      if (confirm("sure ??")) {
        setText("");
        localStorage.removeItem("nB");
        window.location.reload();
      }
    }
  }

  return (
    <div className="mx-[0.7rem] md:mx-[1rem] lg:mx-[10rem] text-secondary font-mono">
      <SettingsPopup setPopUp={setPopUp} display={popUp ? "block" : "none"} text={text} clearHandl={clear} />
      <div className="flex justify-between items-center px-10 lg:px-40 font-semibold text-center my-5">
        <div className="text-4xl hover:cursor-pointer hover:text-secondary-hover">NoteBook</div>
        <div className="text-2xl hover:cursor-pointer hover:text-secondary-hover" onClick={() => setPopUp(true)}>
          ()
        </div>
      </div>
      <hr />
      <textarea
        ref={textAreaRef}
        style={{ opacity: popUp ? 0.5 : 1 }}
        className="w-full h-[85vh] bg-primary text-lg outline-none resize-none scrollbar"
        onKeyDown={(e) => {
          if (e.keyCode === 9) {
            e.preventDefault();
            var v = e.currentTarget.value,
              s = e.currentTarget.selectionStart,
              en = e.currentTarget.selectionEnd;
            e.currentTarget.value = v.substring(0, s) + "\t" + v.substring(en);
            e.currentTarget.selectionStart = e.currentTarget.selectionEnd = s + 1;
          }
        }}
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          localStorage.setItem("nB", e.target.value);
        }}
        autoFocus
      ></textarea>
      <hr />
    </div>
  );
}
