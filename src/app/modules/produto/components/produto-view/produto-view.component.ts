import { Component, OnInit } from '@angular/core';
import { Produto } from '../../produto';
import { ProdutoService } from '../../services/produto.service';
import { ActivatedRoute } from '@angular/router';
import { BaseViewComponent } from 'src/app/shared/shared-components/base.view.component';

@Component({
  selector: 'app-produto-view',
  templateUrl: './produto-view.component.html',
  styleUrls: ['./produto-view.component.scss']
})
export class ProdutoViewComponent extends BaseViewComponent {

  constructor(private route: ActivatedRoute, service: ProdutoService) { super(service); }

  ngOnInit() {
    super.ngOnInit();
  }

  get product(){
    return this.item;
  }

  getId(){
    return +this.route.snapshot.paramMap.get("id");
  }

  getRouterURL(){
    return 'produto';
  }

}
