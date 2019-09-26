import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/shared-components/base-list.component';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent extends BaseListComponent {

  constructor(service: ProdutoService) { 
    super();
    this.service = service;
   }

  ngOnInit() {
    super.ngOnInit();
    this.search(this.searched);
  }

  
  protected getRouterURL(): string {
    return 'produto';
  }

  get products() {
    return this.items;
  }
}
