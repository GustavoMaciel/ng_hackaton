import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/shared-components/base.component';
import { Pessoa } from '../../pessoa';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';

@Component({
  selector: 'app-pessoa-view',
  templateUrl: './pessoa-view.component.html',
  styleUrls: ['./pessoa-view.component.scss']
})
export class PessoaViewComponent extends BaseComponent {

  person: Pessoa;

  constructor(private route: ActivatedRoute, private service: PessoaService) {
    super();
   }

  ngOnInit() {
    super.ngOnInit();
    const id: number = +this.route.snapshot.paramMap.get("id");
    this.setPessoa(id);
  }

  /**
   * Set the pessoa var into a Pessoa object with the informed id
   * 
   * @param {number} id 
   */
  setPessoa(id: number): void{
    this.service.getById(id).subscribe((result) => {
      this.person = result;
    });
  }

}
