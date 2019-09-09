import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';
import { PessoaEditComponent } from './components/pessoa-edit/pessoa-edit.component';
import { PessoaViewComponent } from './components/pessoa-view/pessoa-view.component';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaService } from './services/pessoa.service';
import {IPessoaService} from './services/Ipessoa.service';
import { PessoaMockService } from './services/pessoa.mock.service';

@NgModule({
  declarations: [PessoaListComponent, PessoaEditComponent, PessoaViewComponent],
  imports: [
    CommonModule,
    PessoaRoutingModule
  ],
  providers: [{provide: PessoaService, useClass: PessoaMockService}]
})
export class PessoaModule { }
