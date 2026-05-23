import { Fragment } from 'react';
import { Navbar } from '../../components/Navbar';
import { SideBar } from '../../components/Sidebar';
import { useNotes } from "../../context/notes-context";
import { NotesCard } from "../../components/NotesCard";
import { EmptyState } from "../../components/EmptyState";
import { Trash2 } from "lucide-react";

export const Trash = () => {
    const { trash, searchQuery } = useNotes();
    
    const trashNotes = trash?.filter(note => 
        (note.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
         note.text.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <Fragment>
            <Navbar />
            <main className="flex">
                <SideBar />
                <div className="flex-1 p-6 md:p-10 overflow-y-auto h-[calc(100vh-73px)]">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <Trash2 className="text-red-500" />
                                Trash
                            </h2>
                            <p className="text-sm text-slate-500 bg-white px-3 py-1.5 rounded-full shadow-sm border border-slate-100">
                                Notes in trash will be deleted after 7 days.
                            </p>
                        </div>
                        
                        {trashNotes?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {trashNotes.map(({ id, title, text, isPinned, deletedAt }) => (
                                    <NotesCard 
                                        key={id} 
                                        id={id} 
                                        title={title} 
                                        text={text} 
                                        isPinned={isPinned}
                                        deletedAt={deletedAt}
                                        isTrash={true} 
                                    />
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="Trash is empty." icon={Trash2} />
                        )}
                    </div>
                </div>
            </main>
        </Fragment>
    );
};
