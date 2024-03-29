import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './layout/admin/admin.component';
import {AuthComponent} from './layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      }, 
      {
        path: 'clientes',
        loadChildren: () => import('./pages/client/client.module').then(m => m.ClientModule)
      },
      {
        path: 'abogados',
        loadChildren: () => import('./pages/abogados/abogados.module').then(m => m.AbogadosModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./pages/usuarios/usuarios.module').then(m => m.UsuariosModule)
      },
      {
        path: 'juzgados',
        loadChildren: () => import('./pages/juzgados/juzgados.module').then(m => m.JuzgadosModule)
      },
      {
        path: 'contratos',
        loadChildren: () => import('./pages/contratos/contratos.module').then(m => m.ContratosModule)
      },
      {
        path: 'procesos',
        loadChildren: () => import('./pages/procesos/procesos.module').then(m => m.ProcesosModule)
      },
      {
        path: 'procesos-externos',
        loadChildren: () => import('./pages/procesos-rama-judicial/procesos-rama-judicial.module').then(m => m.ProcesosRamaJudicialModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard-default/dashboard-default.module').then(m => m.DashboardDefaultModule)
      }, {
        path: 'basic',
        loadChildren: () => import('./pages/ui-elements/basic/basic.module').then(m => m.BasicModule)
      }, {
        path: 'notifications',
        loadChildren: () => import('./pages/ui-elements/advance/notifications/notifications.module').then(m => m.NotificationsModule)
      }, {
        path: 'bootstrap-table',
        loadChildren: () => import('./pages/ui-elements/tables/bootstrap-table/basic-bootstrap/basic-bootstrap.module').then(m => m.BasicBootstrapModule),
      }, {
        path: 'map',
        loadChildren: () => import('./pages/map/google-map/google-map.module').then(m => m.GoogleMapModule),
      }, {
        path: 'user',
        loadChildren: () => import('./pages/user/profile/profile.module').then(m => m.ProfileModule)
      }, {
        path: 'simple-page',
        loadChildren: () => import('./pages/simple-page/simple-page.module').then(m => m.SimplePageModule)
      },
      
    ]
  },
  {
    path: 'authentication',
        loadChildren: () => import('./pages/auth/login/basic-login/basic-login.module').then(m => m.BasicLoginModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
