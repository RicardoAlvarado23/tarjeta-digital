import { ActionReducerMap } from '@ngrx/store';
import * as cliente from './components/pages/formulario/formulario.reducer';
import * as ui from './components/pages/ui.reducers';


export interface AppState {
   cliente: cliente.State,
   ui: ui.State,
}



export const appReducers: ActionReducerMap<AppState> = {
    cliente:  cliente.clienteReducer,
    ui: ui.uiReducer,
};