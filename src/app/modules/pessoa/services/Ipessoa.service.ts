import { Observable } from 'rxjs';
import { Pessoa } from '../pessoa';

export interface IPessoaService {
    getPessoas(): Observable<any>;
    delete(id: number): Observable<any>;
    update(newPessoa: Pessoa): Observable<any>;
    patch(pessoa: Pessoa): Observable<any>;
    create(pessoa: Pessoa): Observable<any>;

}