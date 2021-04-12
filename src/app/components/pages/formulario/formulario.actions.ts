import { createAction, props } from '@ngrx/store';
import { Cliente } from '../../../models/cliente.model';

export const setCliente = createAction('[FormularioComponent] setCliente',
    props<{cliente: Cliente}>()
);