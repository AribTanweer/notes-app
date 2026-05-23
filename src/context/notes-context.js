 import { createContext, useContext, useReducer} from 'react';
 import { notesReducer } from '../reducers/notesReducer';

 const NotesContext= createContext();
 const NotesProvider = ({children}) => {

    const intialState={
        title:'',
        text:'',
        notes:[],
        archive:[]
    }

    const [{title, text, notes, archive},notesDispatch]= useReducer(notesReducer, intialState)





    return (
        <NotesContext.Provider value={{title, text, notes, archive, notesDispatch}}>
            {children}
        </NotesContext.Provider>
    )
 }

 const useNotes=()=> useContext(NotesContext);

 export { NotesProvider, useNotes}