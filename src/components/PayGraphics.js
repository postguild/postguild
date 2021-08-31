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

function FilterLink(props) {
  const { runFilters, filters, label } = props;
  function handleClick() {
    runFilters(filters);
  }
  return (
    <a onClick={handleClick}>
      <span>{label}</span>
    </a>
  );
}

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
    level2: "",
    level3: "Overall"
  });
  console.log(dataView);

  useEffect(() => {
    let filteredData = payData.filter(d => {
      return d.level1 == filters.level1;
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

  function runFilters(filters) {
    setFilters(f => {
      let newFilters = { ...filters };
      console.log(newFilters);
      return newFilters;
    });
  }

  return (
    <div className="pay-graphics container">
      <div className="tabs is-toggle">
        <ul>
          <li className={`toggle-tab ${filters.level1 === "" && "is-active"}`}>
            <FilterLink
              label="Overall"
              runFilters={runFilters}
              filters={{ level1: "", level3: "Overall" }}
            />
          </li>
          <li
            className={`toggle-tab ${filters.level1 === "Commercial" &&
              "is-active"}`}
          >
            <FilterLink
              label="Commercial"
              runFilters={runFilters}
              filters={{ level1: "Commercial", level3: "" }}
            />
          </li>
          <li
            className={`toggle-tab ${filters.level1 === "News" && "is-active"}`}
          >
            <FilterLink
              label="Newsroom"
              runFilters={runFilters}
              filters={{ level1: "News", level3: "" }}
            />
          </li>
        </ul>
      </div>
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
