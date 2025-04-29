import type { Routes } from '@angular/router';

export const routes: Routes = [
  // redireciona raiz para /login
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Autenticação
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./auth/register-user/register-user.component').then(
        m => m.RegisterUserComponent
      )
  },

  // Clientes
  {
    path: 'clientes',
    loadComponent: () =>
      import('./customers/customer-list/customer-list.component').then(
        m => m.CustomerListComponent
      )
  },
  {
    path: 'clientes/new',
    loadComponent: () =>
      import('./customers/customer-form/customer-form.component').then(
        m => m.CustomerFormComponent
      )
  },

  // Empresas
  {
    path: 'empresas',
    loadComponent: () =>
      import('./companies/company-list/company-list.component').then(
        m => m.CompanyListComponent
      )
  },
  {
    path: 'empresas/new',
    loadComponent: () =>
      import('./companies/company-form/company-form.component').then(
        m => m.CompanyFormComponent
      )
  },

  // Qualquer outra rota volta para /login
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
