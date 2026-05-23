import { NavLink } from 'react-router-dom';
import { Home, Archive, Star, Trash2 } from 'lucide-react';

export const SideBar = () => {
    const getStyles = ({ isActive }) => {
        const baseStyles = 'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium';
        return isActive 
            ? `${baseStyles} bg-primary/10 text-primary shadow-sm`
            : `${baseStyles} text-slate-600 hover:bg-slate-100 hover:text-slate-900`;
    }

    return (
        <aside className='hidden md:flex flex-col gap-2 w-64 h-[calc(100vh-73px)] p-4 sticky top-[73px]'>
            <NavLink className={getStyles} to='/'>
                <Home size={20} />
                <span>Notes</span>
            </NavLink>
            <NavLink className={getStyles} to='/important'>
                <Star size={20} />
                <span>Important</span>
            </NavLink>
            <NavLink className={getStyles} to='/archive'>
                <Archive size={20} />
                <span>Archive</span>
            </NavLink>
            <NavLink className={getStyles} to='/bin'>
                <Trash2 size={20} />
                <span>Trash</span>
            </NavLink>
        </aside>
    )
}