export interface Person {
    id: number;
    name: string;
    gender: string;
    birthday: string;
    biography: string;
    place_of_birth: string;
    profile_path: string;
}

export interface PersonResult {
    page: number;
    results: PersonResult[];
    total_results: number;
    total_pages: number
}

export interface PersonResult {
    adult: boolean;
    gender: number;
    id: number;
    known_for: object[];
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string
}

export interface PersonDetails {
    birthday: string;
    known_for_department: string;
    deathday: string;
    id: number;
    name: string;
    also_known_as: object[];
    gender: number;
    biography: string;
    popularity: number;
    place_of_birth: string;
    profile_path: string;
    adult: boolean;
    imdb_id: string;
    homepage: string
}

export interface PersonCredits {
    cast: Cast[];
    crew: object[];
    id: number;
}

export interface Cast {
    character: string;
    credit_id: string;
    release_date: string;
    vote_count: number;
    video: boolean;
    adult: boolean;
    vote_average: number;
    title: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    original_name: string;
    popularity: number;
    id: number;
    backdrop_path: string;
    overview: string;
    poster_path: string;
    name: string;
    episode_count: number;
    first_air_date: string;
    origin_country: string[];
}