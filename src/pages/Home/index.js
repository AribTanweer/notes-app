import { Navbar } from "../../components/Navbar";
import { SideBar } from "../../components/Sidebar";
import { NotesCard } from "../../components/NotesCard";
import { EmptyState } from "../../components/EmptyState";
import { Fragment } from 'react';
import { useNotes } from "../../context/notes-context";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";

export const Home = () => {

    const { title, text, notes, searchQuery, notesDispatch } = useNotes();

    const onTitleChange = (e) => {
        notesDispatch({ type: 'TITLE', payload: e.target.value })
    }
    
    const onTextChange = (e) => {
        notesDispatch({ type: 'TEXT', payload: e.target.value })
    }

    const onAddClick = () => {
        notesDispatch({ type: 'ADD_NOTE' })
        notesDispatch({ type: 'CLEAR_INPUT' })
        toast.success("Note added successfully");
    }

    // Filter by search query
    const filteredNotes = notes?.filter(note => 
        note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        note.text.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

    const pinnedNotes = filteredNotes.filter(({ isPinned }) => isPinned);
    const otherNotes = filteredNotes.filter(({ isPinned }) => !isPinned);

    return (
        <Fragment>
            <Navbar />
            <main className="flex">
                <SideBar />
                <div className="flex-1 p-6 md:p-10 overflow-y-auto h-[calc(100vh-73px)]">
                    <div className="max-w-7xl mx-auto flex flex-col items-center">
                        
                        {/* Note Input Area */}
                        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden mb-12 transition-all duration-300 focus-within:shadow-md focus-within:border-primary/30">
                            <input 
                                id="note-title" 
                                name="title" 
                                value={title} 
                                onChange={onTitleChange}
                                className="w-full p-4 text-lg font-semibold text-slate-800 placeholder-slate-400 focus:outline-none"
                                placeholder="Title" 
                            />
                            <textarea 
                                id="note-text" 
                                name="text" 
                                value={text} 
                                onChange={onTextChange}
                                className="w-full p-4 pt-0 min-h-[100px] text-slate-600 placeholder-slate-400 focus:outline-none resize-none"
                                placeholder="Take a note..." 
                            />
                            <div className="flex justify-end p-3 bg-slate-50/50 border-t border-slate-100">
                                <button 
                                    disabled={!title?.trim()} 
                                    onClick={onAddClick} 
                                    className="flex items-center gap-2 px-5 py-2 bg-primary text-white font-medium rounded-full hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow"
                                >
                                    <Plus size={18} />
                                    <span>Add Note</span>
                                </button>
                            </div>
                        </div>

                        {/* Notes Display */}
                        <div className="w-full">
                            {filteredNotes.length === 0 ? (
                                searchQuery ? (
                                    <EmptyState message={`No notes found for "${searchQuery}"`} />
                                ) : (
                                    <EmptyState message="Notes you add appear here" />
                                )
                            ) : (
                                <div className="flex flex-col gap-10">
                                    {pinnedNotes.length > 0 && (
                                        <section className="animate-slide-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
                                            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 ml-1">Pinned</h3>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                                {pinnedNotes.map(({ id, title, text, isPinned }) => (
                                                    <NotesCard key={id} id={id} title={title} text={text} isPinned={isPinned} />
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                    
                                    {otherNotes.length > 0 && (
                                        <section className="animate-slide-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                                            {pinnedNotes.length > 0 && <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 ml-1">Others</h3>}
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                                {otherNotes.map(({ id, title, text, isPinned }) => (
                                                    <NotesCard key={id} id={id} title={title} text={text} isPinned={isPinned} />
                                                ))}
                                            </div>
                                        </section>
                                    )}
                                </div>
                            )}
                        </div>
                        
                    </div>
                </div>
            </main>
        </Fragment>
    )
}