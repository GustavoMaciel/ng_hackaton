import { Component, OnInit } from '@angular/core';
import { AppInjector } from 'src/app/app.injector';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../pessoa';
import { BaseListComponent } from 'src/app/shared/shared-components/base-list.component';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss']
})
export class PessoaListComponent extends BaseListComponent {



  //private service: PessoaService = AppInjector.get(PessoaService)

  constructor(private service: PessoaService) { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.getAll(this.service);
  }

  protected getRouterURL(): string {
    return 'pessoa';
  }

  get people() {
    return this.getAll(this.service);
  }
}
