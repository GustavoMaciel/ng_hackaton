import { Component, OnInit } from '@angular/core';
import { AppInjector } from 'src/app/app.injector';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../pessoa';
import { BaseComponent } from 'src/app/shared/shared-components/base.component';
import { PessoaURL } from 'src/app/shared/url/url.domain';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss']
})
export class PessoaListComponent extends BaseComponent {

  /**
   * Number of total pages
   */
  public totalPages = 1;
  /**
   * Current page
   */
  public currentPage = 1;
  /**
   * Number of items per page
   */
  protected currentPageSize = 10;
  /**
   * If the items are loading
   */
  public loading: boolean = true;
  /**
   * List of people
   */
  public pessoas: Pessoa[] = []

  //private service: PessoaService = AppInjector.get(PessoaService)

  constructor(private service: PessoaService) { super(); }

  ngOnInit() {
    super.ngOnInit();
    this.listPessoas();
  }

  listPessoas(): void{
    this.loading = true;
    this.service.getPessoas()
    .subscribe(
      result => {
        this.totalPages = result.totalPages;
        this.pessoas = result.items;
        this.loading = false;
      },
      error => {
        this.loading = false;
      }
    );
  }

  edit(id: number){
    this.navigate([this.getRouterURL(), 'edit', id ? id : '']);
    return false;
  }

  view(id: number){
    this.navigate([this.getRouterURL(), 'view', id ? id : '']);
    return false;
  }

  add(){
    this.navigate([this.getRouterURL(), 'create']);
    return false;
  }

  delete(id: number){
    return false;
  }

  protected getRouterURL(): string{
    return 'pessoa';
  }

}
