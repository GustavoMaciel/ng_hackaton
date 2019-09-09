import { Injectable } from '@angular/core';
import { Pessoa } from '../pessoa';
import { Observable, empty, observable } from 'rxjs';
import { BaseService } from 'src/app/shared/shared-services/base.service';
import { PessoaURL } from 'src/app/shared/url/url.domain';
import { map, catchError } from 'rxjs/operators';
import { IPessoaService } from './Ipessoa.service';

@Injectable()
export class PessoaService extends BaseService implements IPessoaService{
  constructor() {
    super();
   }

  public getPessoas(): Observable<any>{
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

  
  update(pessoa: Pessoa): Observable<any> {
    throw new Error("Method not implemented.");
  }
  create(pessoa: Pessoa): Observable<any> {
    throw new Error("Method not implemented.");
  }


}
