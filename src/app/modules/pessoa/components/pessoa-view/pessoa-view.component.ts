import { Component, OnInit } from '@angular/core';
import { Pessoa } from '../../pessoa';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { BaseViewComponent } from 'src/app/shared/shared-components/base.view.component';

@Component({
  selector: 'app-pessoa-view',
  templateUrl: './pessoa-view.component.html',
  styleUrls: ['./pessoa-view.component.scss']
})
export class PessoaViewComponent extends BaseViewComponent {


  constructor(private route: ActivatedRoute, service: PessoaService) {
    super(service);
  }

  get person() {
    return this.item;
  }

  ngOnInit() {
    super.ngOnInit();
  }

  getId() {
    return +this.route.snapshot.paramMap.get("id");
  }

  protected getRouterURL(): string {
    return 'pessoa'
  }
}
