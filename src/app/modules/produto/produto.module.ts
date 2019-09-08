import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoListComponent } from './components/produto-list/produto-list.component';
import { ProdutoEditComponent } from './components/produto-edit/produto-edit.component';
import { ProdutoViewComponent } from './components/produto-view/produto-view.component';
import { ProdutoRoutingModule } from './produto-routing.module';

@NgModule({
  declarations: [ProdutoListComponent, ProdutoEditComponent, ProdutoViewComponent],
  imports: [
    CommonModule,
    ProdutoRoutingModule
  ]
})
export class ProdutoModule { }
