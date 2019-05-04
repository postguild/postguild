import React from 'react';

export default class Counter extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            cnt: 0
        }
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
    }
    increment(e){
        e.preventDefault();
        this.setState({cnt: this.state.cnt+1})
    }
    decrement(e){
        e.preventDefault();
         this.setState({cnt: this.state.cnt-1})
    }
    render(){
        let msgClass = "pg-bodyCopy " + (this.props.layout == 'centered'  ? 'pg-skinny ' : ''),
            //If you provide inline styles it needs to be an object not a string. Also note you set styles in camelCase instead of with dashes
            h5StyleOverride = {"marginTop": 5};

        //Look for the dangerouslySetInnerHTML property below. Read more about it here: https://facebook.github.io/react/docs/dom-elements.html#dangerouslysetinnerhtml

        return(
        <div>
            <h2 className={"pg-h3 " + (this.props.layout == 'centered'  ? 'pg-skinny ' : '')}>{this.props.reactText}</h2>

            <p className={msgClass}  dangerouslySetInnerHTML={{__html:this.props.msg}} />

            <div className={(this.props.layout == 'centered'  ? 'pg-skinny ' : '')}>
                <h4>Count</h4>
                <button className="col-lg-1" onClick={this.increment}>+</button>
                <h5 style={h5StyleOverride}  className="col-lg-1 text-center">{this.state.cnt}</h5>
                <button  className="col-lg-1" onClick={this.decrement}>-</button>
            </div>
        </div>
        )
    }
}
