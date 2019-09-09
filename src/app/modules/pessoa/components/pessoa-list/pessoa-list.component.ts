import { Component, OnInit } from '@angular/core';
import { AppInjector } from 'src/app/app.injector';
import { PessoaService } from '../../services/pessoa.service';
import { Pessoa } from '../../pessoa';

@Component({
  selector: 'app-pessoa-list',
  templateUrl: './pessoa-list.component.html',
  styleUrls: ['./pessoa-list.component.scss']
})
export class PessoaListComponent implements OnInit {

  public totalPages = 1;
  public currentPage = 1;
  protected currentPageSize = 10;
  public loading: boolean = true;
  
  public pessoas: Pessoa[] = []

  //private service: PessoaService = AppInjector.get(PessoaService)

  constructor(private service: PessoaService) { }

  ngOnInit() {
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

}
