import React, { useEffect, useState } from "react";
let payData = require("../../static/data/pay_study_int_data@1.json");
const commafy = require("commafy");

const d3 = Object.assign({}, require("d3-scale"));

function formatPay(d) {
  return d >= 1000
    ? `${commafy((d / 1000).toFixed(0))}K`
    : commafy(d.toFixed(2));
}

export default function PercentilePlot(props) {
  let path = props.path || null;
  const pathLevels = ["level1", "level2", "level3", "groups"];

  const [data, setData] = useState(props.data || payData[0]);
  const [domain, setDomain] = useState(props.domain || [0, 100000]);

  useEffect(() => {
    if (path) {
      let tempData = [...payData];
      path = path.split("/").map((d, i) => {
        return [pathLevels[i], d];
      });

      tempData = payData;
      path.forEach(p => {
        tempData = tempData.filter(d => {
          return d[p[0]] === p[1];
        });
      });
      if (tempData.length === 1) {
        setData(tempData[0]);
        // setDomain([d3.min(tempData[0], d => d.percentile_25_pay),
        // d3.max(tempData[0], d => d.percentile_75_pay)])
      } else {
        console.error(`Data filtering did not work for chart`);
      }
    }
  }, []);
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
