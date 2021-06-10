
export interface Song {
    _id: string
    title: string;
    artist?: string;
    created?: number;
    year_released?: number;
    genres?: Array<string>;
  }