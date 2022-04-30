export interface Movie {
    id: number;
    title: string;
    releaseDate: string;
    runtime: number;
    genres: string[];
    overview: string;
    voteAvarage: number;
    posterPath: string;
}