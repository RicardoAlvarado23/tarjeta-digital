import { createReducer, on } from '@ngrx/store';
import { showCountDown, hideCountDown } from './ui.actions';

export interface State {
    time: number;
}

export const initialState: State = {
    time: 0,
}

const _uiReducer = createReducer(
    initialState,
    on(showCountDown, (state, {time}) => ({ ...state, time: time})),
    on(hideCountDown, state => ({ ...state, time: 0}))
);

export function uiReducer(state, action) {
    return _uiReducer(state, action);
}