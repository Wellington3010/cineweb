import { Action, createAction, props, createSelector } from "@ngrx/store";
import { IMovie } from "../interfaces/IMovie";

export class ActionModel implements Action {
    type: string = "";
}

export const getCurrentMovies = createAction(
    '[CurrentMovies Movies] Movies',
    props<{ movies: Array<IMovie> }>()
)

export const getHomeMovies = createAction(
    '[Home Movies] Movies',
    props<{ movies: Array<IMovie> }>()
)

export const getComingSoonMovies = createAction(
    '[ComingSoonMovies Movies] Movies',
    props<{ movies: Array<IMovie> }>()
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
        default:
            return state;
    }
}