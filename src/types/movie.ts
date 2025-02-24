export interface Movie {
  id: string;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids: string[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  genres: { id: string; name: string }[];
  cast: {
    id: number;
    name: string;
    profile_path: string;
    character: string;
  }[];
}