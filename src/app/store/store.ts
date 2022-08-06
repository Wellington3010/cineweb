import { Action, createAction, props } from "@ngrx/store";
import { IMovie } from "../interfaces/IMovie";

export const getCurrentMovies = createAction(
    '[CurrentMovies Movies] Movies'
)

export const getHomeMovies = createAction(
    '[Home Movies] Movies'
)

export const getComingSoonMovies = createAction(
    '[ComingSoonMovies Movies] Movies'
)

export const findMoviesByParameter = createAction(
    '[FindMoviesByParameter] Movies',
    props<{parameter: string, parameterType: string, page: string }>()
)

export const findAllMovies = createAction(
    '[AllMovies Movies] Movies',
)

let movieState!: IterableIterator<IMovie>;

export const reducer = (state = movieState, action: Action) => {
    switch(action.type) {
        case '[Home Movies] Movies':
            return state;
        case '[ComingSoonMovies Movies] Movies':
            return state;
        case '[Current Movies] Movies':
            return state;
        case '[AllMovies Movies] Movies':
            return state;
        case '[FindMoviesByParameter] Movies':
            return state;
        default:
            return state;
    }
}