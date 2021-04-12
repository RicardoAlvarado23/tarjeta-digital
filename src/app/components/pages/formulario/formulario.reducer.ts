import { createReducer, on } from '@ngrx/store';
import { Cliente } from '../../../models/cliente.model';
import { setCliente } from './formulario.actions';

export interface State {
    cliente: Cliente; 
}

export const initialState: State = {
    cliente: null,
}

const _clienteReducer = createReducer(
    initialState,
    on(setCliente, (state, {cliente}) => ({...state, cliente: {...cliente}}), ),
);

export function clienteReducer(state, action) {
    return _clienteReducer(state, action);
}