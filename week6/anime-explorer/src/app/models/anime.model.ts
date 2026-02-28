export interface AnimeImage {
  jpg: {
    image_url: string;
    large_image_url: string;
  };
}

export interface Anime {
  mal_id: number;
  title: string;
  title_english: string | null;
  images: AnimeImage;
  episodes: number | null;
  score: number | null;
  synopsis: string | null;
  status: string;
  year: number | null;
  genres: { mal_id: number; name: string }[];
  studios: { mal_id: number; name: string }[];
}

export interface AnimeResponse {
  data: Anime[];
}

export interface AnimeDetailResponse {
  data: Anime;
}

export interface Character {
  character: {
    mal_id: number;
    name: string;
    images: AnimeImage;
  };
  role: string;
}

export interface CharactersResponse {
  data: Character[];
}
