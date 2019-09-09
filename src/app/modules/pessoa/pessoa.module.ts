import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaListComponent } from './components/pessoa-list/pessoa-list.component';
import { PessoaEditComponent } from './components/pessoa-edit/pessoa-edit.component';
import { PessoaViewComponent } from './components/pessoa-view/pessoa-view.component';
import { PessoaRoutingModule } from './pessoa-routing.module';
import { PessoaService } from './services/pessoa.service';
import { PessoaMockService } from './services/pessoa.mock.service';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { BasicSearchComponent } from 'src/app/shared/shared-components/basic-search/basic-search.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [PessoaListComponent, PessoaEditComponent, PessoaViewComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PessoaRoutingModule,
    SharedComponentsModule
  ],
  providers: [{provide: PessoaService, useClass: PessoaMockService}]
})
export class PessoaModule { }
