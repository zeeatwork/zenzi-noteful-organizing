import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Note from '../Note/Note'
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import './NoteListMain.css'
import ErrorBoundary from './../ErrorBoundary'

export default class NoteListMain extends React.Component {
  static defaultProps = {
    match: {
      params: {}
    }
  }
 static contextType = ApiContext
 getNotesForFolder = (notes=[], folderId) => (
  (!folderId)
    ? notes
    : notes.filter(note => note.folderId === folderId)
)
    render() {
      const { folderId } = this.props.match.params
        const {notes=[]} = this.context
        const notesForFolder = this.getNotesForFolder(notes, folderId)
        console.log('notes', notes);
        return (
          <section className='NoteListMain'>
            <ul>
              {notesForFolder.map(note =>
                <li key={note.id}>
                  <ErrorBoundary>
                    <Note
                      id={note.id}
                      name={note.name}
                      modified={note.modified}
                    />
                  </ErrorBoundary>
                </li>
              )}
            </ul>
            <div className='NoteListMain__button-container'>
              <CircleButton
                tag={Link}
                to='/add-note'
                type='button'
                className='NoteListMain__add-note-button'
              >
                <FontAwesomeIcon icon='plus' />
                <br />
                Note
              </CircleButton>
            </div>
          </section>
        )
      }
   }
//   return (
//     <section className='NoteListMain'>
//       <ul>
//         {props.notes.map(note =>
//           <li key={note.id}>
//             <Note
//               id={note.id}
//               name={note.name}
//               modified={note.modified}
//             />
//           </li>
//         )}
//       </ul>
//       <div className='NoteListMain__button-container'>
//         <CircleButton
//           tag={Link}
//           to='/add-note'
//           type='button'
//           className='NoteListMain__add-note-button'
//         >
//           <FontAwesomeIcon icon='plus' />
//           <br />
//           Note
//         </CircleButton>
//         </div>
//         </section>   
              
              
          
     
  
//   )
// }

 