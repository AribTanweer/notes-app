import { useNotes } from "../../context/notes-context"
import { findNotesInArchive } from "../../utils/findNotesInArchive";
import { Pin, Archive as ArchiveIcon, Trash2, RefreshCcw, XCircle } from "lucide-react";
import toast from "react-hot-toast";

export const NotesCard = ({ id, title, text, isPinned, deletedAt, isTrash }) => {
    const { notesDispatch, archive } = useNotes();
    const isNotesInArchive = findNotesInArchive(archive, id);

    const onPinClick = (id) => {
        if (!isPinned) {
            notesDispatch({ type: 'PIN', payload: { id } });
            toast.success("Note pinned");
        } else {
            notesDispatch({ type: 'UNPIN', payload: { id } });
            toast.success("Note unpinned");
        }
    }

    const onArchiveClick = (id) => {
        if (!isNotesInArchive) {
            notesDispatch({ type: 'ADD_TO_ARCHIVE', payload: { id } });
            toast.success("Note archived");
        } else {
            notesDispatch({ type: 'REMOVE_FROM_ARCHIVE', payload: { id } });
            toast.success("Removed from archive");
        }
    }

    const onTrashClick = (id) => {
        notesDispatch({ type: 'MOVE_TO_TRASH', payload: { id } });
        toast.error("Note moved to trash");
    }

    const onRestoreClick = (id) => {
        notesDispatch({ type: 'RESTORE_FROM_TRASH', payload: { id } });
        toast.success("Note restored");
    }

    const onPermanentDeleteClick = (id) => {
        notesDispatch({ type: 'DELETE_PERMANENTLY', payload: { id } });
        toast.success("Note deleted permanently");
    }

    // Calculate days left in trash
    const getDaysLeft = () => {
        if (!deletedAt) return 0;
        const diffTime = Math.abs(new Date() - new Date(deletedAt));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const daysLeft = 7 - diffDays;
        return daysLeft > 0 ? daysLeft : 0;
    }

    return (
        <div className="glass-card p-5 w-full sm:w-[300px] flex flex-col group relative overflow-hidden animate-fade-in" key={id}>
            {/* Visual Indicators */}
            {isPinned && !isTrash && <div className="absolute top-0 left-0 w-full h-1 bg-yellow-400"></div>}
            {isNotesInArchive && !isTrash && <div className="absolute top-0 left-0 w-full h-1 bg-blue-400"></div>}
            {isTrash && <div className="absolute top-0 left-0 w-full h-1 bg-red-400"></div>}

            <div className="flex justify-between items-start border-b border-slate-100 pb-3 mb-3">
                <p className="font-semibold text-lg text-slate-800 break-words flex-1 pr-2">{title}</p>
                {
                    !isNotesInArchive && !isTrash && (
                        <button 
                            onClick={() => onPinClick(id)} 
                            className={`flex-shrink-0 p-1.5 rounded-full transition-colors ${isPinned ? 'bg-yellow-100 text-yellow-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                            title={isPinned ? "Unpin note" : "Pin note"}
                        >
                            <Pin size={18} fill={isPinned ? "currentColor" : "none"} />
                        </button>
                    )
                }
            </div>
            
            <div className="flex flex-col flex-grow">
                <p className="text-slate-600 mb-4 whitespace-pre-wrap flex-grow">{text}</p>
                
                <div className="mt-auto flex items-center justify-between pt-2">
                    {isTrash ? (
                        <div className="text-xs font-medium text-red-500 bg-red-50 px-2 py-1 rounded-md">
                            Deletes in {getDaysLeft()} days
                        </div>
                    ) : (
                        <div className="text-xs text-slate-400">
                            {/* Date can go here if added */}
                        </div>
                    )}
                    
                    <div className="flex gap-2">
                        {isTrash ? (
                            <>
                                <button 
                                    onClick={() => onRestoreClick(id)}
                                    className="p-1.5 text-slate-400 hover:bg-emerald-50 hover:text-emerald-600 rounded-full transition-colors"
                                    title="Restore"
                                >
                                    <RefreshCcw size={18} />
                                </button>
                                <button 
                                    onClick={() => onPermanentDeleteClick(id)}
                                    className="p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors"
                                    title="Delete Permanently"
                                >
                                    <XCircle size={18} />
                                </button>
                            </>
                        ) : (
                            <>
                                <button 
                                    onClick={() => onArchiveClick(id)}
                                    className={`p-1.5 rounded-full transition-colors ${isNotesInArchive ? 'bg-blue-100 text-blue-600' : 'text-slate-400 hover:bg-slate-100 hover:text-slate-600'}`}
                                    title={isNotesInArchive ? "Unarchive" : "Archive"}
                                >
                                    <ArchiveIcon size={18} fill={isNotesInArchive ? "currentColor" : "none"} />
                                </button>
                                <button 
                                    onClick={() => onTrashClick(id)}
                                    className="p-1.5 text-slate-400 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}