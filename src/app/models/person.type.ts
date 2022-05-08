export interface Person {
    birthday: string;
    known_for_department: string;
    known_for: object[];
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

export interface PersonCast {
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