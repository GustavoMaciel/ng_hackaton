import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmpresaListComponent } from './components/empresa-list/empresa-list.component';
import { EmpresaEditComponent } from './components/empresa-edit/empresa-edit.component';
import { EmpresaViewComponent } from './components/empresa-view/empresa-view.component';

const routes: Routes = [
  { path: '', component: EmpresaListComponent },
  { path: 'create', component: EmpresaEditComponent, data: {breadcrumb: 'Create'} },
  { path: 'edit/:id', component: EmpresaEditComponent, data: {breadcrumb: 'Edit'} },
  { path: 'view/:id', component: EmpresaViewComponent, data: {breadcrumb: 'View'} }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpresaRoutingModule { }
