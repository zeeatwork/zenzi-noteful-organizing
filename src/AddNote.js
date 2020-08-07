import React from 'react'
import config from './config';

import ApiContext from './ApiContext';
import ValidationError from './ValidationError';

class AddNote extends React.Component {
  //create AddNote component
  constructor(props) {
    super(props);
    this.state = {
      name: {
        value: '',
        touched: false,
      },
      content: {
        value: ''
      },
      folder: {
        value: '' /*dropdown list to be populated*/
      },
      error: ''
    };
  }
  static contextType = ApiContext;


  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }
  updateContent(content) {
    this.setState({content: {value: content}});
  }
  updateFolder(folder) {
    this.setState({folder: {value: folder}});
  }
  handleSubmit(event) {
    //fetch
    event.preventDefault();

    const nameIsValid = this.validateNameAndFolder();
    if (!nameIsValid) {
      return;
    }

    const { name, content, folder } = this.state;

    const newNote = {
      name: name.value,
      content: content.value,
      folderId: folder.value,
      modified: new Date()
    }

    fetch(`${config.API_ENDPOINT}/notes/`, {
			method: 'POST',
			body:JSON.stringify(newNote),
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
				this.context.addNote(data)
				this.props.history.push(`/folder/`+data.folderId)
			})
			.catch(error => {
				console.error({error})
			})
		
  }
  validateNameAndFolder() {
    const { name, folder } = this.state;
    if (name.value.trim().length === 0) {
      this.setState({
        error: 'Name is required'
      });
      return false;
    }

    if (folder.value.trim().length === 0) {
      this.setState({
        error: 'Please select a folder'
      });
      return false;
    }



    return true;
  }
  getFolder=() => {
    const {folders} = this.context;
    return folders.map(folder => {
      return(
        <option value={folder.id} key={folder.id}>{folder.name}</option>
      )
    })
  }
  render() {
    return(
      <form className="new-note" onSubmit={e => this.handleSubmit(e)}>
          <h2>Add New Note</h2>
          <div className="note-name">
            <p>* required field</p>
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              className="note-new"
              name="name"
              id="name"
              onChange={e => this.updateName(e.target.value)}
              />
              
          </div>
          <div className="note-content">
            <label htmlFor="content">Content</label>
            <input
              type="text"
              className="note-new"
              name="folder"
              id="folder"
              onChange={e => this.updateContent(e.target.value)}
              />
          </div>
          <div className="note-folder">
          <label htmlFor="folder">Select Folder*:</label>
          <select name="folders" id="folders" onChange={(e) => this.updateFolder(e.target.value) }>
            <option value=''>Select a folder</option>
            {this.getFolder()}
            </select>
            <button>Submit</button>

            <ValidationError message={this.state.error} />
          </div>
      </form>
    )
  }
}
//map list of folder
export default AddNote;
//add validation to prevent note name === empty string
//render form
//form should include input for name, content and folder (folder path or folder name??--list of existing folders--dropdown list?)
//submit form to POST /notes endpoint

//handle errors

//add button to note list page to invoke form