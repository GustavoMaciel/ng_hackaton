import { IProdutoService } from './iproduto.service';
import { Observable, throwError } from 'rxjs';
import { Produto, Categoria, CATEGORIES } from '../produto';
import { PRODUTOS } from './mock.data';
import { BaseMockService } from 'src/app/shared/shared-services/base.mock.service';

export class ProdutoMockService extends BaseMockService implements IProdutoService {

    private lastId: number = 2
    private mock: Produto[] = PRODUTOS;

    constructor () {
        super();
        this.items = PRODUTOS;
        this.setPages(this.defaultPageSize, this.items);
    }

    getSearchedItems(searchParam: any): any{
        let auxItems = []
        //if (searchParam.name) {
        for (let item of this.items) {
            if (item.name.toLowerCase().indexOf(searchParam.name) !== -1 || searchParam.name === "") {
                auxItems.push(item);
            }
        }
        return auxItems;
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