import { Component, OnInit } from '@angular/core';
import { Produto } from '../../produto';
import { ProdutoService } from '../../services/produto.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from 'src/app/shared/shared-components/base.component';

@Component({
  selector: 'app-produto-view',
  templateUrl: './produto-view.component.html',
  styleUrls: ['./produto-view.component.scss']
})
export class ProdutoViewComponent extends BaseComponent {

  private product: Produto;


  constructor(private route: ActivatedRoute, private service: ProdutoService) { super(); }

  ngOnInit() {
    super.ngOnInit();
    const id: number = +this.route.snapshot.paramMap.get("id");
    this.setItem(id);
  }

  setItem(id: number): void {
    this.service.getById(id).subscribe(result => {
      this.product = result;
    });
  }

}
