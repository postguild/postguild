import React, { useEffect, useState } from "react";
const commafy = require("commafy");

const d3 = Object.assign({}, require("d3-scale"));

function formatPay(d) {
  return d >= 1000
    ? `${commafy((d / 1000).toFixed(0))}K`
    : commafy(d.toFixed(2));
}

export default function PercentilePlot(props) {
  const { data, domain } = props;
  const scale = d3
    .scaleLinear()
    .domain(domain)
    .range([0, 100]);
  // console.log(domain)
  const barWidth =
    scale(data.percentile_75_pay) - scale(data.percentile_25_pay);
  // console.log(scale(data.percentile_25_pay))

  return (
    <div className="percentile-plot">
      {data.percentile_25_pay && (
        <>
          <div
            className="plot-bar"
            style={{
              left: `${scale(data.percentile_25_pay)}%`,
              width: `${barWidth}%`
            }}
          ></div>
          <div
            className="marker marker-25"
            data-tooltip={`$${formatPay(data.percentile_25_pay)}`}
            style={{
              left: `${scale(data.percentile_25_pay)}%`
            }}
          ></div>
          <div
            className="marker marker-75"
            data-tooltip={`$${formatPay(data.percentile_75_pay)}`}
            style={{
              left: `${scale(data.percentile_75_pay)}%`
            }}
          ></div>
        </>
      )}
      <div
        className="marker marker-50"
        data-tooltip={`$${formatPay(data.percentile_50_pay)}`}
        style={{
          left: `${scale(data.percentile_50_pay)}%`
        }}
      ></div>
    </div>
  );
}
