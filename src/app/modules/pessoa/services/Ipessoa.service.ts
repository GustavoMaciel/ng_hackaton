import { Observable } from 'rxjs';

export interface IPessoaService {
    getPessoas(): Observable<any>;
}