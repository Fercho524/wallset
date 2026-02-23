import { Wallpaper } from "../entities/Wallpaper";

export type SortBy = "date" | "name";
export type SortOrder = "asc" | "desc";

export interface WallpaperRepository {
    list(options: {
        dir: string;
        recursive?: boolean;
        sortBy?: SortBy;
        order?: SortOrder;
        withThumbnails?: boolean;
    }): Promise<Wallpaper[]>;
}