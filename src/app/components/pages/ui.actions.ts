import { createAction, props } from '@ngrx/store';

export const showCountDown = createAction('[FormularioComponent] showCountDown',
    props<{time: number}>()
);

export const hideCountDown = createAction('[FormularioComponent] hideCountDown');