import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainUsuariosComponent } from './main-usuarios/main-usuarios.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: MainUsuariosComponent,
    data: {
      breadcrumb: 'Default',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  }
];

@NgModule({
  declarations: [MainUsuariosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbPaginationModule, NgbAlertModule,
    ReactiveFormsModule,
  ]
})
export class UsuariosModule { }
