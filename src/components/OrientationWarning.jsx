import React, { useEffect, useState } from "react";

const OrientationWarning = ({ children }) => {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerHeight > window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isPortrait ? (
        <div className="orientation-warning">
          <p>Please rotate your device to landscape mode to view the content.</p>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default OrientationWarning;
