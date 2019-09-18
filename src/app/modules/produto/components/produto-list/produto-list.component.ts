import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/shared/shared-components/base-list.component';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-list',
  templateUrl: './produto-list.component.html',
  styleUrls: ['./produto-list.component.scss']
})
export class ProdutoListComponent extends BaseListComponent {

  constructor(private service: ProdutoService) { 
    super();
   }

  ngOnInit() {
    super.ngOnInit();
    this.getAll(this.service);
  }

  
  protected getRouterURL(): string {
    return 'produto';
  }

  get products() {
    return this.getAll(this.service);
  }
}
