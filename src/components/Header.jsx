import { useState } from "react";

export default function Header({ setFormClass }) {
  const [buttonContent, setButtonContent] = useState("SHARE A FACT");

  const hideornot = () => {
    if (buttonContent == "SHARE A FACT") {
      setFormClass("fact-form");
      setButtonContent("CLOSE");
    } else {
      setButtonContent("SHARE A FACT");
      setFormClass("fact-form hidden");
    }
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <img
            src="/src/assets/logo.png"
            height="68"
            width="68"
            alt="Today I Learned Logo"
          />
          <h1>Today I Learned</h1>
        </div>

        <button className="btn btn-large btn-open" onClick={hideornot}>
          {buttonContent}
        </button>
      </header>
    </>
  );
}
