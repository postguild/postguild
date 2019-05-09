import React from "react";
import { Range } from "react-range";
import "./calc.scss";

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.rate = 0.013846;
    let dues = 70000 * this.rate;

    this.state = {
      salary: 70000,
      dues: dues
    };

    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(v) {
    let dues = v[0] * this.rate;
    this.setState({
      salary: v[0],
      dues: dues
    });
  }
  render() {
    let msgClass =
        "pg-bodyCopy " + (this.props.layout == "centered" ? "pg-skinny " : ""),
      //If you provide inline styles it needs to be an object not a string. Also note you set styles in camelCase instead of with dashes
      h5StyleOverride = { marginTop: 5 };

    //Look for the dangerouslySetInnerHTML property below. Read more about it here: https://facebook.github.io/react/docs/dom-elements.html#dangerouslysetinnerhtml

    return (
      <div>
        <div className="calculator-container">
          <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
            How much are my dues?
          </h2>
          <p className="explainer-text">
            NewsGuild members pay <em>1.3846%</em> of their salary as dues,
            which support the larger union organization's work on our behalf.
            This tool will give you an estimate of how much you can expect to
            contribute through dues, which are automatically deducted from your
            paycheck.
          </p>
          <h3 className="viz-label">A member with a yearly salary of</h3>
          <Range
            values={[this.state.salary]}
            min={0}
            max={200000}
            step={1000}
            onChange={values => {
              this.handleChange(values);
            }}
            renderTrack={({ props, children }) => (
              <div
                className="slider-track"
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  backgroundColor: "#ccc"
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                className="drag-handle"
                {...props}
                style={{
                  ...props.style
                }}
              >
                <div className="salary-text">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD"
                  })
                    .format(this.state.salary)
                    .replace(/\D00$/, "")}
                </div>
              </div>
            )}
          />
          <h3 className="viz-label">will pay:</h3>
          <p className="salary-text">
            {" "}
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD"
            }).format(this.state.dues)}{" "}
            yearly
          </p>
          <p className="salary-text">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD"
            }).format(this.state.dues / 12)}{" "}
            monthly
          </p>
          <p className="salary-text">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency: "USD"
            }).format(this.state.dues / 52)}{" "}
            weekly
          </p>
        </div>
      </div>
    );
  }
}
