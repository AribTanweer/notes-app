import { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { notesReducer } from '../reducers/notesReducer';

const NotesContext = createContext();

const NotesProvider = ({children}) => {
    const initialState = {
        title: '',
        text: '',
        notes: [],
        archive: [],
        trash: []
    };

    const [state, notesDispatch] = useReducer(notesReducer, initialState);
    const [searchQuery, setSearchQuery] = useState('');

    // Load from local storage on mount
    useEffect(() => {
        const savedState = localStorage.getItem('noteIt_state');
        if (savedState) {
            try {
                const parsedState = JSON.parse(savedState);
                notesDispatch({ type: 'SET_STATE', payload: { ...parsedState, title: '', text: '' } });
            } catch (error) {
                console.error("Failed to parse local storage data", error);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        const { title, text, ...stateToSave } = state; // Don't save current inputs
        localStorage.setItem('noteIt_state', JSON.stringify(stateToSave));
    }, [state.notes, state.archive, state.trash]);

    return (
        <NotesContext.Provider value={{ ...state, notesDispatch, searchQuery, setSearchQuery }}>
            {children}
        </NotesContext.Provider>
    )
}

const useNotes = () => useContext(NotesContext);

export { NotesProvider, useNotes }