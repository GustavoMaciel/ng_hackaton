import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule',
    data: {
      breadcrumb: 'Início'
    }
  },
  {
    path: 'pessoa',
    loadChildren: './modules/pessoa/pessoa.module#PessoaModule',
    data: {
      breadcrumb: 'Pessoa'
    }
  },
  {
    path: 'produto',
    loadChildren: './modules/produto/produto.module#ProdutoModule',
    data: {
      breadcrumb: 'Produto'
    }
  },
  {
    path: 'empresa',
    loadChildren: './modules/empresa/empresa.module#EmpresaModule',
    data: {
      breadcrumb: 'Empresa'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
