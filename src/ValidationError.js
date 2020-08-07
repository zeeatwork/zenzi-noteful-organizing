import React from 'react';

export default class ValidationError extends React.Component{
	render(){
		if(this.props.message) {
			return (
				<div className="validationError">{this.props.message}
				</div>
				)
		}
		return <></>
	}
}
	
	


