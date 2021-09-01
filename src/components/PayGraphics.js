import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PercentilePlot from "./PercentilePlot";
import { Dropdown, Tabs } from "react-bulma-components";
import { filter } from "lodash-es";

import "../components/styles/pay-graphics.scss";
import { data } from "jquery";

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
    level2Items: ["Overall"],
    data: payData
  });
  const [filters, setFilters] = useState({
    level1: "",
    level2: "",
    level3: "Overall"
  });

  useEffect(() => {
    let filteredData = payData.filter(d => {
      return d.level1 == filters.level1;
    });
    if (filters.level2) {
      filteredData = filteredData.filter(d => {
        return d.level2 == filters.level2;
      });
    }
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

    let level2Items = new Set(
      payData
        .filter(d => d.level1 == filters.level1)
        .map(d => d.level2)
        .filter(d => d !== "")
    );

    setDataView({
      salariedScale: salariedRange,
      hourlyScale: hourlyRange,
      salaried: salariedData.length > 0,
      hourly: hourlyData.length > 0,
      level2Items: Array.from(level2Items),
      data: filteredData
    });
  }, [filters]);

  function runFilters(filters) {
    setFilters(f => {
      let newFilters = { ...f, ...filters };
      if (filters.level1) {
        delete newFilters.level2;
      }

      return newFilters;
    });
  }

  return (
    <div className="pay-graphics container">
      <Tabs type="toggle">
        <Tabs.Tab
          key="tab-0"
          renderAs="div"
          className="toggle-tab"
          active={filters.level1 === ""}
        >
          <FilterLink
            label="Overall"
            runFilters={runFilters}
            filters={{ level1: "", level3: "Overall" }}
          />
        </Tabs.Tab>
        <Tabs.Tab
          key="tab-1"
          renderAs="div"
          className="toggle-tab"
          active={filters.level1 === "Commercial"}
        >
          <FilterLink
            label="Commercial"
            runFilters={runFilters}
            filters={{ level1: "Commercial", level3: "Overall" }}
          />
        </Tabs.Tab>
        <Tabs.Tab
          key="tab-2"
          renderAs="div"
          className="toggle-tab"
          active={filters.level1 === "News"}
        >
          <FilterLink
            label="Newsroom"
            runFilters={runFilters}
            filters={{ level1: "News", level3: "Overall" }}
          />
        </Tabs.Tab>
      </Tabs>
      {dataView.level2Items.length > 0 && (
        <Dropdown
          label="Department"
          value={filters.level2}
          onChange={e => {
            runFilters({ level2: e });
          }}
        >
          {dataView.level2Items.map((d, i) => (
            <Dropdown.Item value={d} key={`dropdown-item-${i}`} renderAs="a">
              {d}
            </Dropdown.Item>
          ))}
        </Dropdown>
      )}
      {dataView.salaried && (
        <div className="pay-type-section" key="salaried-section">
          <h3>Salaried employees</h3>
          {Array.from(
            new Set(
              dataView.data
                .filter(d => d.pay_rate_type === "Salaried")
                .map(d => d.level3)
            )
          ).map(l => {
            return (
              <div className="desk-section">
                <h4>{l}</h4>
                {dataView.data
                  .filter(d => d.pay_rate_type === "Salaried" && d.level3 === l)
                  .map((d, i) => (
                    <div key={`plot-${i}`}>
                      <h5>{d.groups}</h5>
                      <h5>{d.employees} employees</h5>
                      <PercentilePlot
                        domain={dataView.salariedScale}
                        data={d}
                      ></PercentilePlot>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      )}
      {dataView.hourly && (
        <div className="pay-type-section" key="hourly-section">
          <h3>Hourly employees</h3>
          {Array.from(
            new Set(
              dataView.data
                .filter(d => d.pay_rate_type === "Hourly")
                .map(d => d.level3)
            )
          ).map(l => {
            return (
              <div className="desk-section">
                <h4>{l}</h4>
                {dataView.data
                  .filter(d => d.pay_rate_type === "Hourly" && d.level3 == l)
                  .map((d, i) => (
                    <div key={`plot-${i}`}>
                      <h5>{d.groups}</h5>
                      <h5>{d.employees} employees</h5>
                      <PercentilePlot
                        domain={dataView.hourlyScale}
                        data={d}
                      ></PercentilePlot>
                    </div>
                  ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
