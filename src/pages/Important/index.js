import { Fragment } from 'react';
import { Navbar } from '../../components/Navbar';
import { SideBar } from '../../components/Sidebar';
import { useNotes } from "../../context/notes-context";
import { NotesCard } from "../../components/NotesCard";
import { EmptyState } from "../../components/EmptyState";
import { Star } from "lucide-react";

export const Important = () => {
    const { notes, searchQuery } = useNotes();
    
    const importantNotes = notes?.filter(note => note.isPinned && 
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
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                            <Star className="text-yellow-500" />
                            Important Notes
                        </h2>
                        
                        {importantNotes?.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {importantNotes.map(({ id, title, text, isPinned }) => (
                                    <NotesCard key={id} id={id} title={title} text={text} isPinned={isPinned} />
                                ))}
                            </div>
                        ) : (
                            <EmptyState message="No important notes found." icon={Star} />
                        )}
                    </div>
                </div>
            </main>
        </Fragment>
    );
};
