'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiGithub } from "react-icons/si";
import { UserNav } from "@/components/dashboard/user-data";

interface AppHeaderProps {
    onMenuHover: () => void;
    chatPosition: 'left' | 'right';
    setChatPosition: (position: 'left' | 'right') => void;
}

export function AppHeader({ onMenuHover, chatPosition, setChatPosition }: AppHeaderProps) {
    return (
        <header className="h-[69px] border-b bg-white dark:bg-black text-black dark:text-white backdrop-blur flex items-center justify-between px-4 sticky top-0 z-40 shadow-none">
            <div className="flex items-center" >
                <nav className="flex items-center" onMouseEnter={onMenuHover}
                    onClick={onMenuHover}>
                    <div className="flex items-center px-2 py-2 rounded-none text-sm font-sans">
                        IMVision
                    </div>
                </nav>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="hidden border md:flex gap-2 rounded-none" asChild>
                    <Link href="https://github.com/gitKarasune/im-vision" target="_blank" rel="noopener noreferrer">
                        <SiGithub className="w-4 h-4" />
                    </Link>
                </Button>

                <UserNav chatPosition={chatPosition} setChatPosition={setChatPosition} />
            </div>
        </header>
    );
}
