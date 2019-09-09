import { Observable } from 'rxjs';
import { Pessoa } from '../pessoa';

export interface IPessoaService {
    getPessoas(): Observable<any>;
    delete(id: number): Observable<any>;
    update(id: number): Observable<any>;
    patch(id: number): Observable<any>;
    create(pessoa: Pessoa): Observable<any>;

}