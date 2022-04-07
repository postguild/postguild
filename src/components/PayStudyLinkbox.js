import React from "react";

const payStudyLinks = [
  {
    title: "Introduction",
    path: "2022-pay-study"
  },
  {
    title: "Data Analysis",
    path: "2022-pay-study-data-analysis/"
  },
  {
    title: "Testimonials",
    path: "2022-pay-study-testimonials"
  },
  {
    title: "Black Caucus Report",
    path: "2022-pay-study-black-caucus-report"
  },
  {
    title: "Recommendations",
    path: "2022-pay-study-recommendations"
  }
];

const PayStudyLinkbox = props => {
  const entryIndex = props.seriesTag.match(/(\d+)/);

  return (
    <div className="pay-study-linkbox">
      <h6 className="linkbox-header">2022 Post Guild Pay Study</h6>
      <ul>
        {payStudyLinks.map((d, i) => {
          return (
            <li
              className={`linkbox-item ${
                entryIndex[0] - 1 === i ? "active" : ""
              }`}
            >
              {entryIndex[0] - 1 !== i ? (
                <a href={`/${d.path}`}>{d.title}</a>
              ) : (
                d.title
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export { payStudyLinks, PayStudyLinkbox };
