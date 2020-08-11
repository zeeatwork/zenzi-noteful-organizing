import React from 'react';
import PropTypes from 'prop-types';

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
	
ValidationError.propTypes = {
  message: PropTypes.string.isRequired
};


