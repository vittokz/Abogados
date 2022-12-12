import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainAbogadosComponent } from './main-abogados/main-abogados.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: MainAbogadosComponent,
    data: {
      breadcrumb: 'Default',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  }
];

@NgModule({
  declarations: [MainAbogadosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    NgbPaginationModule, NgbAlertModule,
    ReactiveFormsModule,
  ]
})
export class AbogadosModule { }
