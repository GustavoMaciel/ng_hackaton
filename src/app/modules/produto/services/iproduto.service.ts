import { Observable } from 'rxjs';
import { Produto } from '../produto';

export interface IProdutoService {
    getAll(): Observable<any>;
    delete(id: number): Observable<any>;
    update(newProduto: Produto): Observable<any>;
    patch(produto: Produto): Observable<any>;
    create(produto: Produto): Observable<any>;

}