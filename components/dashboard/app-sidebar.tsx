'use client';

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    History,
    PanelLeftClose,
    MoreHorizontal,
    Pencil,
    Trash2,
} from "lucide-react"
import { useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppSidebarProps {
    className?: string;
    isOpen: boolean;
    onClose: () => void;
    onNewChat?: () => void;
}

export function AppSidebar({ className, isOpen, onClose, onNewChat }: AppSidebarProps) {
    const [history, setHistory] = useState([
        { id: '1', title: "Yesterday's Session...", date: 'Yesterday' },
        { id: '2', title: "Cyberpunk City...", date: '2 days ago' },
        { id: '3', title: "Neon Samurai...", date: '3 days ago' },
        { id: '4', title: "Abstract Shapes...", date: '4 days ago' },
        { id: '5', title: "Mountain Landscape...", date: '5 days ago' },
        { id: '6', title: "Future Car Design...", date: '6 days ago' },
        { id: '7', title: "Space Station Interior...", date: '1 week ago' },
    ]);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editValue, setEditValue] = useState("");
    const [activeMenuId, setActiveMenuId] = useState<string | null>(null);

    const handleRename = (id: string, currentTitle: string) => {
        setEditingId(id);
        setEditValue(currentTitle);
        setActiveMenuId(null); // Menu closes when renaming starts
    };

    const saveRename = (id: string) => {
        setHistory(prev => prev.map(item => item.id === id ? { ...item, title: editValue } : item));
        setEditingId(null);
        onClose(); // Close sidebar after rename
    };

    const handleDelete = (id: string) => {
        setHistory(prev => prev.filter(item => item.id !== id));
        setActiveMenuId(null);
        onClose(); // Close sidebar after delete
    };

    const handleMouseLeave = () => {
        // Only close if no menu is open and not currently editing
        if (!activeMenuId && !editingId) {
            onClose();
        }
    }

    return (
        <div
            className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-black text-black dark:text-white border-r transform transition-transform duration-300 ease-in-out flex flex-col",
                isOpen ? "translate-x-0" : "-translate-x-full",
                className
            )}
            onMouseLeave={handleMouseLeave}
        >
            <div className="p-4 border-b shadow-none flex items-center justify-between shrink-0">
                <div className="flex items-center">
                    <div className="flex items-center px-2 py-2 rounded-none text-sm font-sans">
                        IMvision
                    </div>
                </div>
                <PanelLeftClose onClick={onClose} className="w-4 h-4 md:hidden cursor-pointer" />
            </div>

            <div className="flex-1 relative overflow-hidden flex flex-col min-h-0">
                <div className="p-4 pb-4 border-t absolute bottom-0 w-full">
                    <Button
                        className="w-full justify-center border items-center cursor-pointer rounded-none"
                        onClick={() => {
                            if (onNewChat) onNewChat();
                            onClose();
                        }}
                    >
                        New Chat
                    </Button>
                </div>

                {/* Add an input and make search functionality across the histories */}

                <div className="flex-1 overflow-y-auto px-2 min-h-0 custom-scrollbar">
                    <h4 className="px-4 pt-10 pb-5 text-xs font-semibold text-muted-foreground tracking-wider sticky top-0 z-10">
                        History
                    </h4>
                    <div className="space-y-1 px-2 pb-4">
                        {history.map((item) => (
                            <div key={item.id} className="group relative flex items-center">
                                {editingId === item.id ? (
                                    <div className="flex items-center gap-1 w-full px-2 py-1">
                                        <input
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                            onBlur={() => saveRename(item.id)}
                                            onKeyDown={(e) => e.key === 'Enter' && saveRename(item.id)}
                                            className="flex-1 text-sm px-1 py-0.5 rounded-none border-none focus:ring-1 focus:ring-primary outline-none"
                                            autoFocus
                                        />
                                    </div>
                                ) : (
                                    <Button
                                        size="sm"
                                        className="w-full justify-start font-normal text-muted-foreground hover:text-foreground pr-8 truncate h-9 bg-white dark:bg-black border rounded-none py-3"
                                    >
                                        <span className="truncate text-left">{item.title}</span>
                                    </Button>
                                )}

                                {!editingId && (
                                    <div className="absolute right-1 transition-opacity text-black dark:text-white backdrop-blur-sm rounded-none">
                                        <DropdownMenu onOpenChange={(open) => setActiveMenuId(open ? item.id : null)}>
                                            <DropdownMenuTrigger asChild>
                                                <Button size="icon" className="h-6 w-6 rounded-full bg-white dark:bg-black text-black dark:text-white">
                                                    <MoreHorizontal className="w-3 h-3" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent className="rounded-none" align="start">
                                                <DropdownMenuItem onClick={() => handleRename(item.id, item.title)}>
                                                    <Pencil className="w-4 h-4 mr-2" />
                                                    Rename
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-500 focus:text-red-500 focus:bg-red-50 dark:focus:bg-red-950/20"
                                                >
                                                    <Trash2 className="w-4 h-4 mr-2" />
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
