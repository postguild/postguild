import React, { useEffect, useState } from "react";
let payData = require("../../static/data/pay_study_int_data.json");
const commafy = require("commafy");

const d3 = Object.assign({}, require("d3-scale"));

function formatPay(d) {
  return d >= 1000
    ? `${commafy((d / 1000).toFixed(0))}K`
    : commafy(d.toFixed(2));
}

console.log(payData);

export default function PercentilePlot(props) {
  let path = props.path || null;
  let keyChart = props.keyChart || false;
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

  useEffect(() => {
    if (props.data && props.domain) {
      setData(props.data);
      setDomain(props.domain);
    }
  }, [props.data, props.domain]);

  const scale = d3
    .scaleLinear()
    .domain(domain)
    .range([0, 100]);
  // console.log(domain)
  const barWidth =
    scale(data.percentile_75_pay) - scale(data.percentile_25_pay);

  return (
    <div className="percentile-plot">
      {data.percentile_25_pay && (
        <>
          <div
            key="plot-bar"
            className="plot-bar"
            style={{
              left: `${scale(data.percentile_25_pay)}%`,
              width: `${barWidth}%`
            }}
          ></div>
          <div
            key="marker-25"
            className={`marker marker-25 ${keyChart && "marker-example"}`}
            data-tooltip={`$${formatPay(data.percentile_25_pay)}`}
            style={{
              left: `${scale(data.percentile_25_pay)}%`
            }}
          ></div>
          <div
            key="marker-75"
            className={`marker marker-75 ${keyChart && "marker-example"}`}
            data-tooltip={`$${formatPay(data.percentile_75_pay)}`}
            style={{
              left: `${scale(data.percentile_75_pay)}%`
            }}
          ></div>
        </>
      )}
      {!data.percentile_25_pay && (
        <>
          <div
            className="plot-bar plot-bar-fuzzy"
            key="plot-bar-fuzzy"
            style={{
              left: `${scale(data.percentile_50_pay * 0.8)}%`,
              width: `${scale(data.percentile_50_pay * 1.2) -
                scale(data.percentile_50_pay * 0.8)}%`
            }}
          ></div>
          <div
            className="marker marker-nodata"
            key="marker-nodata"
            style={{
              left: `${scale(data.percentile_50_pay * 1.2)}%`
            }}
          ></div>
        </>
      )}
      <div
        key="marker-50"
        className={`marker marker-50 ${keyChart && "marker-example"}`}
        data-tooltip={`$${formatPay(data.percentile_50_pay)}`}
        style={{
          left: `${scale(data.percentile_50_pay)}%`
        }}
      ></div>
    </div>
  );
}
