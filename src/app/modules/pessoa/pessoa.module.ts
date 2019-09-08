import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';
import { PessoaEditComponent } from './components/pessoa-edit/pessoa-edit.component';
import { PessoaViewComponent } from './components/pessoa-view/pessoa-view.component';
import { PessoaRoutingModule } from './pessoa-routing.module';

@NgModule({
  declarations: [PessoaListComponent, PessoaEditComponent, PessoaViewComponent],
  imports: [
    CommonModule,
    PessoaRoutingModule
  ]
})
export class PessoaModule { }
