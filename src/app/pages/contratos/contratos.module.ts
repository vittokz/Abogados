import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContratosComponent } from './main-contratos/main-contratos.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';


const routes: Routes = [
  {
    path: '',
    component: MainContratosComponent,
    data: {
      breadcrumb: 'Default',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  }
];

@NgModule({
  declarations: [MainContratosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule, NgbAlertModule,
    RouterModule.forChild(routes)
  ]
})
export class ContratosModule { }
