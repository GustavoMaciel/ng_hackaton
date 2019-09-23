import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { ProdutoEditComponent } from './components/produto-edit/produto-edit.component';
import { ProdutoViewComponent } from './components/produto-view/produto-view.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoService } from './services/produto.service';
import { ProdutoMockService } from './services/produto.mock.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'src/app/shared/shared-components/shared-components.module';
import { BRMoney } from './pipes/produto.pipes';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ProdutoListComponent, ProdutoEditComponent, ProdutoViewComponent, BRMoney],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    ProdutoRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    {provide: ProdutoService, useClass: ProdutoMockService}
  ]
})
export class ProdutoModule { }
