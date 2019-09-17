import { IProdutoService } from './iproduto.service';
import { Observable, throwError } from 'rxjs';
import { Produto, Categoria, CATEGORIES } from '../produto';
import { PRODUTOS } from './mock.data';

export class ProdutoMockService implements IProdutoService {

    private lastId: number = 2
    private mock: Produto[] = PRODUTOS;

    getAll(): Observable<any> {
        return new Observable<any>((obs) => {
            obs.next({
                "totalPages": 1,
                "items": this.mock
            });
            obs.complete();
        });
    }

    getById(id: number): Observable<any> {
        return new Observable<any>(
            (obs) => {
                const produto: Produto = this.mock.filter(prod => prod.id === id).pop();
                obs.next(produto);
                obs.complete();
            });
    }

    delete(id: number): Observable<any> {
        return new Observable<any>(
            (obs) => {
                this.mock = this.mock.filter(prod => prod.id !== id);
                obs.next({ "message": "Produto deletada com sucesso!", "status": 200 });
                obs.complete();
            });
    }

    update(newProduto: Produto): Observable<any> {
        return new Observable<any>((obs) => {
            const oldProduto = this.getById(newProduto.id);
            if (!oldProduto) {
                throwError({ "message": "Pessoa não encontrada", "status": 404 })
            }
            Object.assign(oldProduto, newProduto);
            obs.next(oldProduto);
            obs.complete();
        });
    }

    patch(produto: Produto): Observable<any> {
        throw new Error("Method not implemented.");
    }
    
    create(produto: Produto): Observable<any> {
        return new Observable<any>(
            (obs) => {
                produto.id = ++this.lastId;
                this.mock.push(produto);
                obs.next(produto);
                obs.complete();
            }
        );
    }
    
    getCategory(name: string): Observable<any>{
        return new Observable<any>(
            (obs) => {
                const category: Categoria = CATEGORIES.filter(cat => cat.name === name).pop();
                obs.next(category);
                obs.complete();
            });
    }
}