import React, { Component } from 'react';

class Spinner extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}
   render() {
   	return (
   		<div className="spinner">
  				{this.props.message && <div className={"result alert alert-" + this.props.urgency}>{this.props.message}</div> }
  				<button type="button" className="btn btn-primary btn-lg" onClick={this.props.onSpin}>Spin the Wheel!</button>
  			</div>
    	);
  	}
}

export default Spinner;
