import { Injectable } from '@angular/core';
import { Pessoa } from '../pessoa';
import { Observable, empty, observable, throwError, of } from 'rxjs';
import { BaseService } from 'src/app/shared/shared-services/base.service';
import { PessoaURL } from 'src/app/shared/url/url.domain';
import { map, catchError } from 'rxjs/operators';
import { IPessoaService } from './Ipessoa.service';
import { Telefone } from '../telefone';
import { BaseMockService } from 'src/app/shared/shared-services/base.mock.service';
import { PESSOAS } from './mock.data';

@Injectable()
export class PessoaMockService extends BaseMockService implements IPessoaService {
    private lastIdPessoa = 3;
    private lastIdTelefone = 4;

    constructor() {
        super();
        this.items = PESSOAS;
    }

    create(pessoa: Pessoa): Observable<any> {
        return new Observable<any>(
            (obs) => {
                pessoa.id = ++this.lastIdPessoa;
                for (let tel of pessoa.telefones) {
                    tel.id = ++this.lastIdTelefone;
                }
                this.items.push(pessoa);
                obs.next(pessoa);
                obs.complete();
            });
    }

    getSearchedItems(searchParam: any): any {
        let auxItems = []
        //if (searchParam.name) {
        for (let item of this.items) {
            if (`${item.nome + ' ' + item.sobrenome}`.toLowerCase().indexOf(searchParam.name) !== -1 || searchParam.name === "") {
                auxItems.push(item);
            }
        }
        return auxItems;
    }


}
