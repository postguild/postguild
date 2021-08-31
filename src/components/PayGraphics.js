import React, { useEffect, useState } from "react";
import PercentilePlot from "./PercentilePlot";

const d3 = Object.assign({}, require("d3-array"));
let payData = require("../../static/data/pay_study_int_data@1.json");
payData = payData.map(d => {
  Object.keys(d).map(field => {
    if (parseFloat(d[field])) {
      d[field] = parseFloat(d[field]);
    } else if (d[field] === "NA") {
      d[field] = null;
    }
  });
  return d;
});

export default function PayGraphics(props) {
  const [dataView, setDataView] = useState({
    salaried: true,
    salariedScale: [0, 100000],
    hourly: true,
    hourlyScale: [0, 40],
    data: payData
  });
  const [filters, setFilters] = useState({
    level1: "",
    level2: ""
  });
  console.log(payData);

  useEffect(() => {
    let filteredData = payData.filter(d => {
      return d.level1 == filters.level1 && d.level2 == filters.level2;
    });
    let salariedData = filteredData.filter(d => d.pay_rate_type === "Salaried");
    let hourlyData = filteredData.filter(d => d.pay_rate_type === "Hourly");
    let salariedRange = [
      d3.min(salariedData, d => d.percentile_25_pay),
      d3.max(salariedData, d => d.percentile_75_pay)
    ];
    let hourlyRange = [
      d3.min(hourlyData, d => d.percentile_25_pay),
      d3.max(hourlyData, d => d.percentile_75_pay)
    ];

    setDataView({
      salariedScale: salariedRange,
      hourlyScale: hourlyRange,
      salaried: salariedData.length > 0,
      hourly: hourlyData.length > 0,
      data: filteredData
    });
  }, [filters]);

  return (
    <div className="container">
      {dataView.salaried && (
        <div className="pay-type-section">
          <h3>Salaried employees</h3>
          {dataView.data
            .filter(d => d.pay_rate_type === "Salaried")
            .map(d => (
              <>
                <h5>{d.groups}</h5>
                <PercentilePlot
                  domain={dataView.salariedScale}
                  data={d}
                ></PercentilePlot>
              </>
            ))}
        </div>
      )}
      {dataView.hourly && (
        <div className="pay-type-section">
          <h3>Hourly employees</h3>
          {dataView.data
            .filter(d => d.pay_rate_type === "Hourly")
            .map(d => (
              <>
                <h5>{d.groups}</h5>
                <PercentilePlot
                  domain={dataView.hourlyScale}
                  data={d}
                ></PercentilePlot>
              </>
            ))}
        </div>
      )}
    </div>
  );
}
