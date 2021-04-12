import { ActionReducerMap } from '@ngrx/store';
import * as cliente from './components/pages/formulario/formulario.reducer';


export interface AppState {
   cliente: cliente.State
}



export const appReducers: ActionReducerMap<AppState> = {
    cliente:  cliente.clienteReducer,
}