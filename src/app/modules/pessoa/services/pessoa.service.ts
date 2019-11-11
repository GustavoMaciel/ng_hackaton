import { Injectable } from '@angular/core';
import { Pessoa, PessoaDTO } from '../pessoa';
import { Observable, empty, observable } from 'rxjs';
import { BaseService } from 'src/app/shared/shared-services/base.service';
import { PessoaURL, ProdutoURL } from 'src/app/shared/url/url.domain';
import { map, catchError } from 'rxjs/operators';
import { IPessoaService } from './Ipessoa.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class PessoaService extends BaseService implements IPessoaService {
    constructor() {
        super();
    }

    search(searchParam: any, page?: number): Observable<any> {
        let params: HttpParams = new HttpParams();
        if(page) {
            params = params.append("pageNumber", page.toString());
        } else {
            params = params.append("pageNumber", "1");
        }
        params = params.append("pageSize", this.defaultPageSize.toString());
        params = params.append("searchName", searchParam.name);
        
        return this.get(PessoaURL.BASE, params);
    }

    public getAll(): Observable<any> {
        return this.get(PessoaURL.BASE)
            .pipe(map((result: any) => {
                result.json();
            }), catchError((error) => {
                console.log(error);
                return empty();
            }));
    }

    public delete(id: number): Observable<any> {
        return this.get(PessoaURL.DELETE_PESSOA + id)
            .pipe(map((result: any) => {
                result.json();
            }), catchError((error) => {
                return empty();
            }));
    }

    getById(id: number): Observable<any> {
        return this.get(PessoaURL.VIEW_PESSOA + id)
    }


    update(pessoa: Pessoa): Observable<any> {
        const body = new PessoaDTO(pessoa)
        return this.put(PessoaURL.BASE, JSON.stringify(body));
    }
    create(pessoa: Pessoa): Observable<any> {
        pessoa.id = null;
        for (let tel of pessoa.telefones){
            tel.pessoaId = null;
            tel.id = null;
        }
        const body = JSON.stringify(pessoa);
        return this.post(PessoaURL.BASE, body);
    }


}
