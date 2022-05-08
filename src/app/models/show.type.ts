import { Genre } from "./genre.type";

export interface Show {
    backdrop_path: string;
    created_by: object[];
    episode_run_time: number[]
    first_air_date: string;
    genres: Genre[];
    genre_ids: number[];
    homepage: string;
    id: number;
    in_production: boolean;
    languages: string[];
    last_air_date: string;
    last_episode_to_air: Episode;
    name: string;
    next_episode_to_air: Episode;
    networks: object[];
    number_of_episodes: number;
    number_of_seasons: number;
    origin_country: string[];
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: object[];
    production_countries: object[];
    seasons: Season[];
    spoken_languages: object[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

export interface Season {
    id: number;
    name: string;
    air_date: string;
    episode_count: number;
    overview: string;
    poster_path: string;
    season_number: number;
    episodes: Episode[];
}

export interface Episode {
    id: number;
    name: string;
    overview: string;
    air_date: string;
    episode_number: number;
    production_code: string;
    season_number: number;
    still_path: string;
    vote_average: number;
    vote_count: number;
    crew: object[];
    guest_stars: object[];
    runtime: number;
}