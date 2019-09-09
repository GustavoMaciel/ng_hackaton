import { Injectable } from '@angular/core';
import { Pessoa } from '../pessoa';
import { Observable, empty, observable } from 'rxjs';
import { BaseService } from 'src/app/shared/shared-services/base.service';
import { PessoaURL } from 'src/app/shared/url/url.domain';
import { map, catchError } from 'rxjs/operators';
import { IPessoaService } from './Ipessoa.service';

@Injectable()
export class PessoaMockService extends BaseService implements IPessoaService{

  get: any = {
    'totalPages':1,
    'items': [
              new Pessoa(1, "Gustavo", "Maciel Nunes", "gm.nunes92@gmail.com", "027.613.692-62"),
              new Pessoa(2, "John", "Doe", "john.doe@gmail.com", "123.456.789-10"),
              new Pessoa(3, "Maria", "Doe", "maria.doe@gmail.com", "321.123.321-12")
            ]
  }

  constructor() {
    super();
   }

  public getPessoas(): Observable<any>{
    return new Observable<any>((observable) => {
      observable.next(this.get);
      observable.complete();
    });
  }

}
