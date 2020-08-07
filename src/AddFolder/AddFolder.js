//'use strict';

// Create a new component AddFolder that implements a form to capture 
// the name of a new folder from the user. This form should submit the 
// name of the new folder to the POST /folders endpoint on the server. 
// Ensure that any errors are properly handled. Add a button to the 
// navigation to invoke the new form.

import React from 'react';
import './AddFolder.css';
import config from '../config';
import ApiContext from '../ApiContext';
import ValidationError from '../ValidationError';

export default class AddFolder extends React.Component {
	constructor(props) {
		super(props);
		this.state ={
			error: '',
			folderInput: {value: '', touched: false}
			}
		}

	static contextType = ApiContext;

		handleSubmit = (event) => {
			event.preventDefault();


			//validate the data first before processing it
			let formIsValid = this.validateNewFolderName();

			console.log('state error ', this.state.error);
			if (!formIsValid) {
				return;
			}

			console.log('FORM IS BEING SUBMITTED');




			const {folderInput} = this.state;
			const folder = { name: folderInput.value}

			//const folder = { name: this.state.folderInput.value}


			fetch(`${config.API_ENDPOINT}/folders/`, {
			method: 'POST',
			body:JSON.stringify(folder),
			headers: {
				'content-type': 'application/json'
			},		
		})
			.then(res => {
				if(!res.ok)
					return res.json().then(e => Promise.reject(e))
				return res.json()
			})
			.then((data) => {
				this.context.addFolder(data)
				this.props.history.push(`/folder/`+data.id)
			})
			.catch(error => {
				console.error({error})
			})
		}
		
		updateFolderName(e) {
			this.setState({folderInput: {value: e.target.value, touched: true}})
		}

		validateNewFolderName = () => {
			console.log('FORM IS BEING VALIDATED');
			const newFolderName = this.state.folderInput.value.trim();
			if(newFolderName.length === 0) {
				this.setState({error: "Name me, please!"});
				return false;
			} else if (newFolderName.length <3) {
				this.setState({error: "I'd like a longer name!"});
				return false;
			}

			this.setState({error: ""});
			return true;

		}

		render() {
			//const newFolderError = this.validateNewFolderName;
			return (
				<div>
					<h2>Create New Folder</h2>
					<form className="newFolder" onSubmit={e => this.handleSubmit(e)}>
						<div className="folder-name"> 
							<label htmlFor="name"> Folder Name * </label>
							<input type="text" className="folderEntry"
							name="folderName" id="folderName" onChange={e => this.updateFolderName(e)} />
							
							<button type="submit" className="newFolderAddButton"> 
							Add to Folders
							</button>

							<ValidationError message={this.state.error} />
						</div>
					</form>
				</div>
			)
		}
	}
