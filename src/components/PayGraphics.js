import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PercentilePlot from "./PercentilePlot";
import { Dropdown, Tabs } from "react-bulma-components";

import "../components/styles/pay-graphics.scss";

const d3 = Object.assign({}, require("d3-array"), require("d3-format"));
let payData = require("../../static/data/pay_study_int_data.json");
payData = payData.map(d => {
  Object.keys(d).map(field => {
    if (field != "groups" && parseFloat(d[field])) {
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
    level1: "Overall",
    level2: "",
    pay_rate_type: "Salaried"
  });

  useEffect(() => {
    let filteredData = payData.filter(d => {
      return d.level1 == filters.level1;
    });

    filteredData = filteredData.filter(d => {
      return filters.level2
        ? d.level2 == filters.level2
        : d.level2 == "Overall";
    });

    // console.log(filteredData);

    let salariedData = filteredData.filter(d => d.pay_rate_type === "Salaried");
    let hourlyData = filteredData.filter(d => d.pay_rate_type === "Hourly");

    let salariedRange = [
      parseInt(
        d3.format(".2r")(d3.min(salariedData, d => d.percentile_25_pay) * 0.75)
      ),
      parseInt(
        d3.format(".2r")(d3.max(salariedData, d => d.percentile_75_pay) * 1.2)
      )
    ];
    let hourlyRange = [
      parseInt(
        d3.format(".2r")(d3.min(hourlyData, d => d.percentile_25_pay) * 0.75)
      ),
      parseInt(
        d3.format(".2r")(d3.max(hourlyData, d => d.percentile_75_pay) * 1.2)
      )
    ];

    if (Number.isNaN(salariedRange[0]) || Number.isNaN(salariedRange[1])) {
      salariedRange = [
        parseInt(
          d3.format(".2r")(
            d3.min(salariedData, d => d.percentile_50_pay) * 0.75
          )
        ),
        parseInt(
          d3.format(".2r")(d3.max(salariedData, d => d.percentile_50_pay) * 1.2)
        )
      ];
    }

    if (Number.isNaN(hourlyRange[0]) || Number.isNaN(hourlyRange[1])) {
      hourlyRange = [
        parseInt(
          d3.format(".2r")(d3.min(hourlyData, d => d.percentile_50_pay) * 0.75)
        ),
        parseInt(
          d3.format(".2r")(d3.max(hourlyData, d => d.percentile_50_pay) * 1.2)
        )
      ];
    }

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

      return newFilters;
    });
  }

  return (
    <div className="pay-graphics">
      <div className="chart-explainer">
        <h3>How to read these charts</h3>
        <p>
          These charts represent employee salaries in the middle 50% range. Each
          chart shows the median salary for the group. Charts for groups with
          seven or more members also show the 25th and 75th percentile salaries.
        </p>
        <br />
        <PercentilePlot
          keyChart={true}
          data={{
            groups: "Example group",
            employees: 100,
            pay_rate_type: "Salaried",
            percentile_25_pay: 80000,
            percentile_50_pay: 100000,
            percentile_75_pay: 140000
          }}
          domain={[60000, 160000]}
        />
        <p className="none-note center">
          The scale shown in gray is for reference only and is not based on
          minimum or maximum pay.
        </p>
        <p>
          Because these charts show the middle 50% of salaries, it's important
          to note that half of the employees in each group earn more or less
          than the range shown. The charts also don't show salaries for
          non-Guild-covered employees or for groups with fewer than five people.
        </p>
        <p>
          Using the filters below, you can find visualizations for employee
          salaries grouped by race, age and gender. They are organized by
          department, and when applicable, by desk.
        </p>
        <br />
      </div>
      <div className="sticky-controls">
        <div className="sticky-controls-row">
          <Tabs type="toggle">
            <Tabs.Tab
              key="tab-0"
              renderAs="div"
              className="toggle-tab"
              active={filters.level1 === "Overall"}
            >
              <FilterLink
                label="Overall"
                runFilters={runFilters}
                filters={{
                  level1: "Overall",
                  level2: "Overall"
                }}
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
                filters={{
                  level1: "Commercial",
                  level2: "Overall"
                }}
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
                filters={{
                  level1: "News",
                  level2: "Overall"
                }}
              />
            </Tabs.Tab>
          </Tabs>
        </div>
        <div className="sticky-controls-row">
          {dataView.level2Items.length > 0 && filters.level1 != "Overall" && (
            <div className="dropdown-container">
              <p className="dropdown-label">Choose department:</p>
              <Dropdown
                className="dropdown"
                label="Overall"
                value={filters.level2}
                onChange={e => {
                  runFilters({ level2: e });
                }}
              >
                {dataView.level2Items.map((d, i) => (
                  <Dropdown.Item
                    value={d}
                    key={`dropdown-item-${i}`}
                    renderAs="a"
                  >
                    {d}
                  </Dropdown.Item>
                ))}
              </Dropdown>
            </div>
          )}
          <Tabs type="toggle">
            <Tabs.Tab
              key="tab-salaried"
              renderAs="div"
              className={`toggle-tab ${!dataView.salaried && "is-disabled"}`}
              active={
                filters.pay_rate_type === "Salaried" ||
                (filters.pay_rate_type === "Hourly" && !dataView.hourly)
              }
            >
              <FilterLink
                label="Salaried"
                runFilters={runFilters}
                filters={{
                  pay_rate_type: "Salaried"
                }}
              />
            </Tabs.Tab>
            <Tabs.Tab
              key="tab-hourly"
              renderAs="div"
              className={`toggle-tab ${!dataView.hourly && "is-disabled"}`}
              active={
                filters.pay_rate_type === "Hourly" ||
                (filters.pay_rate_type === "Salaried" && !dataView.salaried)
              }
            >
              <FilterLink
                label="Hourly"
                runFilters={runFilters}
                filters={{
                  pay_rate_type: "Hourly"
                }}
              />
            </Tabs.Tab>
          </Tabs>
        </div>
        <div>
          {!dataView.hourly && (
            <p className="none-note">
              This department has fewer than five hourly workers.
            </p>
          )}
          {!dataView.salaried && (
            <p className="none-note">
              This department has fewer than five salaried workers.
            </p>
          )}
        </div>
      </div>
      {/* when needed, create a div to hold each subdesk (level 3 categorizations) */}
      {Array.from(
        new Set(
          dataView.data
            .filter(d => d.pay_rate_type === filters.pay_rate_type)
            .map(d => d.level3)
        )
      ).map(l => {
        return (
          <div className="desk-section" key={`desk-section-${l}`}>
            <h4>{l != "Overall" ? `Sub-department: ${l}` : ""}</h4>
            {/* create a div to hold each "type" group (race/gender/etc) */}
            {Array.from(
              new Set(
                dataView.data.filter(d => d.level3 === l).map(d => d.type)
              )
            ).map(t => {
              return (
                <div
                  className="group-type-section"
                  key={`group-type-section-${t}`}
                >
                  <h5 className="italic">
                    {t != "overall" ? `Grouped by ${t}` : ""}
                  </h5>
                  {dataView.data
                    .filter(
                      d =>
                        d.pay_rate_type === filters.pay_rate_type &&
                        d.level3 === l &&
                        d.type === t
                    )
                    .map((d, i) => (
                      <PercentilePlot
                        key={`plot-${i}`}
                        domain={
                          filters.pay_rate_type === "Salaried"
                            ? dataView.salariedScale
                            : dataView.hourlyScale
                        }
                        data={d}
                      ></PercentilePlot>
                    ))}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
