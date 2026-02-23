import React from 'react'
import SidebarIcon from '../buttons/SidebarIcon'

interface TopBarProps {
    search: string;
    onSearchChange: (value: string) => void;

    sort: string;
    onSortChange: (value: string) => void;

    onReload: () => void;
    onClear: () => void;
    onRandom: () => void;
}

export default function TopBar({
    search,
    onSearchChange,
    sort,
    onSortChange,
    onReload,
    onClear,
    onRandom,
}: TopBarProps) {
    return (
        <div className="flex-[1] flex">
            <div className="rounded-md px-4 bg-[var(--surface)] flex items-center gap-6 w-full h-full">

                {/* Search */}
                <div className="flex-1">
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => onSearchChange(e.target.value)}
                        placeholder="Buscar wallpapers…"
                        className="h-9 w-full rounded-full px-4 bg-[var(--background)] text-sm outline-none border border-transparent focus:border-[var(--primary)]"
                    />
                </div>

                {/* Actions */}
                <button onClick={onReload}>
                    <SidebarIcon name="Refresh" />
                </button>

                <button onClick={onClear}>
                    <SidebarIcon name="Xmark" />
                </button>

                <button onClick={onRandom}>
                    <SidebarIcon name="HelpCircle" />
                </button>

                {/* Sort */}
                <select
                    value={sort}
                    onChange={(e) => onSortChange(e.target.value)}
                    className="h-9 rounded-md bg-[var(--background)] px-2 text-sm outline-none"
                >
                    <option value="name-asc">A–Z</option>
                    <option value="name-desc">Z–A</option>

                    <option value="created-desc">Más recientes</option>
                    <option value="created-asc">Más antiguos</option>

                    <option value="modified-desc">Modificados recientemente</option>
                    <option value="modified-asc">Modificados antiguos</option>
                </select>

            </div>
        </div>
    );
}
