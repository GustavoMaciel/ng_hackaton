import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';
import { PessoaEditComponent } from './components/pessoa-edit/pessoa-edit.component';
import { PessoaViewComponent } from './components/pessoa-view/pessoa-view.component';

const routes: Routes = [
  { path: '', component: PessoaListComponent },
  {
    path: 'edit/:id', component: PessoaEditComponent, data: {
      breadcrumb: 'Edit'
    }
  },
  {
    path: 'view/:id', component: PessoaViewComponent, data: {
      breadcrumb: 'View'
    }
  },
  {
    path: 'create', component: PessoaEditComponent, data: {
      breadcrumb: 'Create'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PessoaRoutingModule { }
