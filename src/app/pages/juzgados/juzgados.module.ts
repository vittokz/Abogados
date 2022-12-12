import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainJuzgadosComponent } from './main-juzgados/main-juzgados.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAlertModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  {
    path: '',
    component: MainJuzgadosComponent,
    data: {
      breadcrumb: 'Default',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  }
];

@NgModule({
  declarations: [MainJuzgadosComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbPaginationModule, NgbAlertModule,
    RouterModule.forChild(routes)
  ]
})
export class JuzgadosModule { }
