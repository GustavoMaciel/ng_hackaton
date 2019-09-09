import { Injectable } from '@angular/core';
import { Pessoa } from '../pessoa';
import { Observable, empty, observable, throwError } from 'rxjs';
import { BaseService } from 'src/app/shared/shared-services/base.service';
import { PessoaURL } from 'src/app/shared/url/url.domain';
import { map, catchError } from 'rxjs/operators';
import { IPessoaService } from './Ipessoa.service';

@Injectable()
export class PessoaMockService extends BaseService implements IPessoaService{
  private lastId = 3;
  private mock: Pessoa[] = [
    new Pessoa(1, "Gustavo", "Maciel Nunes", "gm.nunes92@gmail.com", "027.613.692-62"),
    new Pessoa(2, "John", "Doe", "john.doe@gmail.com", "123.456.789-10"),
    new Pessoa(3, "Maria", "Doe", "maria.doe@gmail.com", "321.123.321-12")
  ];

  constructor() {
    super();
   }

  public getPessoas(): Observable<any>{
    return new Observable<any>((observable) => {
      observable.next({
        "totalPages": 1,
        "items": this.mock
      });
      observable.complete();
    });
  }

  public delete(id: number): Observable<any>{
    return new Observable<any>(
      (obs) => {
        this.mock = this.mock.filter(pes => pes.id !== id);
        obs.next({"message": "Pessoa deletada com sucesso!", "status": 200});
        obs.complete();
      });
  }

  getById(id: number): Pessoa{
    return null;
  }
  
  update(newPessoa: Pessoa): Observable<any> {
    return new Observable<any>((obs) => {
      const oldPessoa = this.getById(newPessoa.id);
      if(!oldPessoa) {
        throwError({"message":"Pessoa não encontrada", "status": 404})
      }
      Object.assign(oldPessoa, newPessoa);
      obs.next(oldPessoa);
      obs.complete();
    });
  }
  
  create(pessoa: Pessoa): Observable<any> {
    return new Observable<any>(
      (obs) => {
        this.mock.push(pessoa);
        obs.next(pessoa);
        obs.complete();
      });
  }


}
