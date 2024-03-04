import React, { useEffect, useState } from "react";
import footor from "./images/footor.png";

export default function Footer() {
  const [isFixed, setIsFixed] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      const isScrollable =
        document.documentElement.scrollHeight > window.innerHeight;
      setIsFixed(!isScrollable);
    };

    // Initial check on mount
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      style={{
        width: "100%",
        position: isFixed ? "fixed" : "relative",
        bottom: 0,
      }}
    >
      <img
        style={{
          width: "100%",
          height: "auto",

          marginBottom: "25px",

        }}
        src={footor}
        alt="Footor"
      />
    </div>
  );
}
