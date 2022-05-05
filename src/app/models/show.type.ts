import { Genre } from "./genre.type";

export interface Show {
    id: number;
    name: string;
    first_air_date: string;
    genres: Genre[];
    vote_average: number;
    overview: string;
    num_of_episodes: number;
    num_of_seasons: number;
    poster_path: string;
    seasons: SeasonDetails[];
}

export interface ShowResult {
    page: number;
    results: ShowPopular[];
    total_results: number;
    total_pages: number
}

export interface ShowPopular {
    poster_path: string;
    popularity: number;
    id: number;
    backdrop_path: string;
    vote_average: number;
    overview: string;
    first_air_date: string;
    origin_country: string[];
    genre_ids: number[];
    original_language: string;
    vote_count: number;
    name: string;
    original_name: string;
}

export interface ShowDetails {
    backdrop_path: string;
    created_by: object[];
    episode_run_time: number[]
    first_air_date: string;
    genres: Genre[];
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
    seasons: SeasonDetails[];
    spoken_languages: object[];
    status: string;
    tagline: string;
    type: string;
    vote_average: number;
    vote_count: number;
}

export interface SeasonDetails {
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