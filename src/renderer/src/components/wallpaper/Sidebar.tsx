import React from 'react'
import SidebarIcon from '../buttons/SidebarIcon'

interface SidebarProps {
    onSelectFolder: () => void;
}

export default function Sidebar({ onSelectFolder }: SidebarProps) {
    return (
        <div className="p-4 min-w-min">
            <div className="h-full rounded-md p-5 bg-[var(--surface)] flex flex-col gap-4">

                <SidebarIcon name="HomeAlt" />

                <button onClick={onSelectFolder}>
                    <SidebarIcon name="Folder" />
                </button>

                <SidebarIcon name="MediaImage" />
                <SidebarIcon name="Settings" />
                <SidebarIcon name="ArrowLeftCircle" />

            </div>
        </div>
    );
}


