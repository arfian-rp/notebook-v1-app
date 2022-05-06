import React, { useEffect, useRef, useState } from "react";
import SettingsPopup from "./components/SettingsPopup";

export default function App() {
  const [text, setText] = useState<string>("");
  const [popUp, setPopUp] = useState<boolean>(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setText(localStorage.getItem("nB") ?? "");
    textAreaRef.current.selectionStart = text.length;
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.key === "s") {
        e.preventDefault();
        setPopUp(true);
      }
    });
  }, []);

  function download(strData: string, strFileName: string, strMimeType: string) {
    var D = document,
      A = arguments,
      a = D.createElement("a"),
      d = A[0],
      n = A[1],
      t = A[2] || "text/plain";

    //build download link:
    a.href = "data:" + strMimeType + "charset=utf-8," + escape(strData);

    if (window.MSBlobBuilder) {
      // IE10
      var bb = new MSBlobBuilder();
      bb.append(strData);
      return navigator.msSaveBlob(bb, strFileName);
    } /* end if(window.MSBlobBuilder) */

    if ("download" in a) {
      //FF20, CH19
      a.setAttribute("download", n);
      a.innerHTML = "downloading...";
      D.body.appendChild(a);
      setTimeout(function () {
        var e = D.createEvent("MouseEvents");
        e.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        a.dispatchEvent(e);
        D.body.removeChild(a);
      }, 66);
      return true;
    } /* end if('download' in a) */

    //do iframe dataURL download: (older W3)
    var f = D.createElement("iframe");
    D.body.appendChild(f);
    f.src = "data:" + (A[2] ? A[2] : "application/octet-stream") + (window.btoa ? ";base64" : "") + "," + (window.btoa ? window.btoa : escape)(strData);
    setTimeout(function () {
      D.body.removeChild(f);
    }, 333);
    return true;
  }

  function save(fileName: string) {
    if (text.trim()) {
      download(text, fileName, "text/plain");
      setPopUp(false);
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
    return;
  }

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
      <SettingsPopup display={popUp ? "block" : "none"} saveHandl={save} clearHandl={clear} />
      <div className="flex justify-between items-center px-10 lg:px-40 font-semibold text-center my-5">
        <div className="text-4xl hover:cursor-pointer hover:text-secondary-hover">NoteBook</div>
        <div className="text-2xl hover:cursor-pointer hover:text-secondary-hover" onClick={() => setPopUp(true)}>
          S
        </div>
      </div>
      <textarea
        ref={textAreaRef}
        className="w-full h-[80vh] bg-primary text-lg outline-none resize-none scrollbar"
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
    </div>
  );
}
