import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

function getAnchor(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 \-]/g, "")
    .replace(/[ ]/g, "-");
}

const H2 = ({ children }) => {
  const anchor = getAnchor(children);
  const link = `#${anchor}`;

  return (
    <h2>
      <span id={anchor} className="anchor-offset"></span>
      {children}
      <a href={link} className="anchor-link">
        <FontAwesomeIcon icon={faLink} />
      </a>
    </h2>
  );
};

export default H2;
