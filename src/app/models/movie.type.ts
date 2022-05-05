import { Genre } from "./genre.type";

export interface Movie {
    id: number;
    title: string;
    release_year: string;
    release_date: string;
    runtime: number;
    genres: Genre[];
    overview: string;
    vote_average: number;
    poster_path: string;
}

export interface MovieResult {
    page: number;
    results: MoviePopular[];
    total_results: number;
    total_pages: number
}

export interface MoviePopular {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieDetails {
    adult: boolean;
    backdrop_pat: string;
    belongs_to_collection: object;
    budget: number;
    genres: Genre[];
    homepage: string;
    id: number;
    imdb_id: string;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: object;
    production_countries: object;
    release_date: string;
    revenue: number
    runtime: number;
    spoken_languages: object;
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface MovieCredits {
    id: number;
    cast: MovieCast[];
    crew: object[];
}

export interface MovieCast {
    adult: boolean;
    gender: number;
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string;
    cast_id: number;
    character: string;
    credit_id: string;
    order: number;
}