import notesImg from "../../assets/notes.jpg";
import { Search } from "lucide-react";
import { useNotes } from "../../context/notes-context";
import { Link } from "react-router-dom";

export const Navbar = () => {
    const { searchQuery, setSearchQuery } = useNotes();

    return(
        <header className='flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200/50 shadow-sm'>
            <Link to="/" className='flex items-center gap-3'>
                <div className='w-10 h-10 rounded-xl overflow-hidden shadow-sm'>
                    <img className='w-full h-full object-cover' src={notesImg} alt="logo"/>
                </div>
                <h1 className="text-primary text-2xl font-bold tracking-tight">NoteIt</h1>
            </Link>
            
            <div className="relative w-full max-w-md hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-slate-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-full leading-5 bg-slate-50 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-300 sm:text-sm"
                />
            </div>
            
            <div className="w-10"></div> {/* Spacer to balance flex-between */}
        </header>
    )
}