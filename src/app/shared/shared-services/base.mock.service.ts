import { BaseService } from 'src/app/shared/shared-services/base.service';
import { Observable, throwError } from 'rxjs';

export class BaseMockService extends BaseService {

    protected pages: any[];
    protected items: any[];

    constructor() {
        super();
    }

    get totalPages(): number {
        return this.pages.length;
    }

    get totalItems(): number {
        let total = 0;
        for (let i of this.pages) {
            total += i.length;
        }

        return total;
    }

    setPages(pageSize: number, arrayToPage: any[]) {
        let _pages = [];
        let aux = []
        let counter = 1;
        for (let i = 0; i < arrayToPage.length; i++) {
            if (counter <= pageSize) {
                aux.push(arrayToPage[i]);
                counter++;
            } else {
                _pages.push(aux);
                aux = [];

                aux.push(arrayToPage[i]);
                counter = 2;
            }
        }
        if (aux.length > 0) {
            _pages.push(aux);
        }
        this.pages = _pages;
    }

    getPageItems(pageNumber: number, array: any[], pageSize: number) {
        pageNumber--;
        this.setPages(pageSize, array);
        return this.pages[pageNumber];
    }

    getSearchedItems(searchParam: any): any{
        throw new Error("Metodo deve ser implementado na subclasse");
    }

    search(searchParam: any, page?: number): Observable<any> {
        let auxItems = this.getSearchedItems(searchParam);

        this.setPages(this.defaultPageSize, auxItems);

        return new Observable<any>((obs) => {
            const result = {
                "totalPages": this.totalPages,
                "pageSize": this.defaultPageSize,
                "currentPage": page ? page : 1,
                "items": this.getPageItems(page ? page : 1, auxItems, this.defaultPageSize),
                "totalItems": this.totalItems
            }
            obs.next(result);
            obs.complete();
        });
    }

    getAll(page?: number): Observable<any> {
        return new Observable<any>((obs) => {

            obs.next({
                "totalPages": this.totalPages,
                "pageSize": 10,
                "currentPage": page ? page : 1,
                "items": this.getPageItems(page ? page : 1, this.items, 10),
                "totalItems": this.totalItems
            });
            obs.complete();
        });
    }


    update(newItem: any, model?: string): Observable<any> {
        return new Observable<any>((obs) => {
            const oldItem = this.getById(newItem.id);
            if (!oldItem) {
                throwError({ "message": `${model ? model : "Item"} não encontrado(a)`, "status": 404 })
            }
            Object.assign(oldItem, newItem);
            obs.next(oldItem);
            obs.complete();
        });
    }


    create(empresa: any): Observable<any> {
        throw new Error("Método deve ser implementado na subclasse");
    }


    delete(id: any, model?: string): Observable<any> {
        return new Observable<any>(
            (obs) => {
                this.items = this.items.filter(item => item.id !== id);
                obs.next({ "message": `${model ? model : "Item"} deletado(a) com sucesso!`, "status": 200 });
                obs.complete();
            });
    }


    getById(id: any): Observable<any> {
        return new Observable<any>(
            (obs) => {
                const item: any = this.items.filter(item => item.id === id).pop();
                obs.next(item);
                obs.complete();
            });
    }

    patch(item: any): Observable<any> {
        throw new Error("Method not implemented.");
    }
}