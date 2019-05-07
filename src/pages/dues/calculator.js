import React from "react";

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.rate = 0.013846
    let dues = 70000*this.rate
    
    this.state = {
      salary: 70000,
      dues:dues
    };

    this.handleChange = this.handleChange.bind(this)
    
  }
  increment(e) {
    e.preventDefault();
    this.setState({ cnt: this.state.cnt + 1 });
  }
  decrement(e) {
    e.preventDefault();
    this.setState({ cnt: this.state.cnt - 1 });
  }
  handleChange(e){
    let dues = e.target.value*this.rate
    this.setState({
      salary:e.target.value,
      dues:dues
    })
  }
  render() {
    let msgClass =
        "pg-bodyCopy " + (this.props.layout == "centered" ? "pg-skinny " : ""),
      //If you provide inline styles it needs to be an object not a string. Also note you set styles in camelCase instead of with dashes
      h5StyleOverride = { marginTop: 5 };

    //Look for the dangerouslySetInnerHTML property below. Read more about it here: https://facebook.github.io/react/docs/dom-elements.html#dangerouslysetinnerhtml

    return (
      <div>
        <div className="dues-calculator">
          <p class="explainer-text">If your annual salary is {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.state.salary).replace(/\D00$/, '')}</p>
          <input 
          type="range"
          value={this.state.salary}
          min="0"
          max="200000"
          step="1000"
          onChange={this.handleChange}
          ></input>
          <h5 style={h5StyleOverride} className="col-lg-1 text-center">
            You will pay {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.state.dues)} yearly.
          </h5>
          <h5 style={h5StyleOverride} className="col-lg-1 text-center">
            You will pay {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.state.dues/12)} monthly.
          </h5>
          <h5 style={h5StyleOverride} className="col-lg-1 text-center">
            You will pay {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(this.state.dues/52)} weekly.
          </h5>
        </div>
      </div>
    );
  }
}
