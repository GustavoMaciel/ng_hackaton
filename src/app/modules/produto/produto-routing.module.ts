import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { ProdutoEditComponent } from './components/produto-edit/produto-edit.component';
import { ProdutoViewComponent } from './components/produto-view/produto-view.component';

const routes: Routes = [
  { path: '', component: ProdutoListComponent },
  { path: 'create', component: ProdutoEditComponent, data: {breadcrumb: 'Create'} },
  { path: 'edit/:id', component: ProdutoEditComponent, data: {breadcrumb: 'Edit'} },
  { path: 'view/:id', component: ProdutoViewComponent, data: {breadcrumb: 'View'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
