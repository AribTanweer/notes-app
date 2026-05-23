import { Inbox } from 'lucide-react';

export const EmptyState = ({ message, icon: Icon = Inbox }) => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-[60vh] text-slate-400 animate-fade-in">
            <div className="bg-slate-100 p-6 rounded-full mb-4">
                <Icon size={48} className="text-slate-300" />
            </div>
            <h3 className="text-xl font-medium text-slate-500">{message}</h3>
        </div>
    );
};
