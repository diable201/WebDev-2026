export interface Album {
  id: number;
  title: string;
  artist: string;
  released: number;
  song_count: number;
}

export interface Song {
  id: number;
  title: string;
  duration: number;
  track: number;
  album: Album;
  album_id: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
