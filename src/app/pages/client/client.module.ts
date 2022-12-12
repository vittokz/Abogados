import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainClientComponent } from './main-client/main-client.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: MainClientComponent,
    data: {
      breadcrumb: 'Default',
      icon: 'icofont-home bg-c-blue',
      status: false
    }
  }
];


@NgModule({
  declarations: [MainClientComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientModule { }
