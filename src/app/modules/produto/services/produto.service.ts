import { IProdutoService } from './iproduto.service';
import { Observable } from 'rxjs';
import { Produto } from '../produto';

export class ProdutoService implements IProdutoService {
    getAll(): Observable<any> {
        throw new Error("Method not implemented.");
    }

    getById(id: number): Observable<any> {
        throw new Error("Method not implemented.");
    }

    delete(id: number): Observable<any> {
        throw new Error("Method not implemented.");
    }

    update(newProduto: Produto): Observable<any> {
        throw new Error("Method not implemented.");
    }

    patch(produto: Produto): Observable<any> {
        throw new Error("Method not implemented.");
    }
    
    create(produto: Produto): Observable<any> {
        throw new Error("Method not implemented.");
    }
}