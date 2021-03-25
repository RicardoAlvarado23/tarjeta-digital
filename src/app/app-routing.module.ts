import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Homepage1Component } from './components/pages/homepage1/homepage1.component';
import { FormularioComponent } from './components/pages/formulario/formulario.component';

const routes: Routes = [

{path: '', component: Homepage1Component},
{path: 'solicitud', component: FormularioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
