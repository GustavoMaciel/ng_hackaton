import { Component, OnInit } from '@angular/core';
import { BaseComponent } from 'src/app/shared/shared-components/base.component';
import { Pessoa } from '../../pessoa';
import { ActivatedRoute } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { Telefone } from '../../telefone';

@Component({
    selector: 'app-pessoa-view',
    templateUrl: './pessoa-view.component.html',
    styleUrls: ['./pessoa-view.component.scss']
})
export class PessoaViewComponent extends BaseComponent {

    person: any;
    loading: boolean = true;

    constructor(private route: ActivatedRoute, private service: PessoaService) {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        const id: number = +this.route.snapshot.paramMap.get("id");
        this.setPessoa(id);
    }

    private delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Set the pessoa var into a Pessoa object with the informed id
     * 
     * @param {number} id 
     */
    async setPessoa(id: number) {
        this.loading = true;      
        this.service.getById(id).subscribe((result) => {
            let pessoa: Pessoa = new Pessoa(result.id, result.nome, result.sobrenome, result.email, result.cpf);
            if (result.telefones) {
                pessoa.telefones = result.telefones;
            } else {
                pessoa.telefones = []
            }
            this.person = pessoa;
            this.loading = false;
        });
    }

}
