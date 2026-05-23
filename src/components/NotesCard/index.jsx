import { useNotes } from "../../context/notes-context"
import { findNotesInArchive } from "../../utils/findNotesInArchive";

export const NotesCard = ({ id, title, text, isPinned }) => {
    const { notesDispatch, archive } = useNotes();

    const onPinClick = (id) => {
        !isPinned ? notesDispatch({
            type: 'PIN',
            payload: { id }
        }) : notesDispatch({
            type: 'UNPIN',
            payload: { id }
        })
    }

    const onArchiveClick = (id) => {
        !isNotesInArchive ? notesDispatch({
            type: 'ADD_TO_ARCHIVE',
            payload: { id }
        }) : notesDispatch({
            type: 'REMOVE_FROM_ARCHIVE',
            payload: { id }
        })
    }

    const isNotesInArchive = findNotesInArchive(archive, id);



    return (
        <div className="w-56 border border-netural-800 p-2 rounded-md w-[300px]" key={id}>
            <div className="flex justify-between items-start border-b-2 pb-2 mb-2">
                <p className="font-bold flex-1">{title}</p>
                {
                    !isNotesInArchive ? 
                    <button onClick={() => onPinClick(id)} className="flex-shrink-0 ml-2">
                        <span className={isPinned ? "material-icons" : "material-icons-outlined"}>
                            push_pin
                        </span>
                    </button> : <></>
                }
            </div>
            <div className="flex flex-col">
                <p className="mb-3">{text}</p>
                <div className="ml-auto flex gap-2">
                    <button onClick={() => onArchiveClick(id)}>
                        <span className={`${isNotesInArchive ? 'material-icons' : 'material-icons-outlined'}`}>
                            archive
                        </span>
                    </button>

                    <button>
                        <span className="material-icons-outlined">
                            delete
                        </span>
                    </button>
                </div>
            </div>

        </div>
    )
}