import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainProcesosRamaJudicialComponent } from './main-procesos-rama-judicial/main-procesos-rama-judicial.component';

const routes: Routes = [
  {
    path: '',
    component: MainProcesosRamaJudicialComponent,
    data: {
      breadcrumb: 'Default',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  }
];

@NgModule({
  declarations: [MainProcesosRamaJudicialComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProcesosRamaJudicialModule { }
