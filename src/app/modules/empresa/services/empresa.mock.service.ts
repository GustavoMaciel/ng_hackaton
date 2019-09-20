import { BaseService } from 'src/app/shared/shared-services/base.service';
import { IEmpresaService } from './IEmpresa.service';
import { Observable, throwError } from 'rxjs';
import { Empresa } from '../empresa';
import { Endereco } from '../endereco';
import { EMPRESAS, LAST_ID_EMPRESA, LAST_ID_ENDERECO } from './mock.data';

export class EmpresaMockService extends BaseService implements IEmpresaService {

    private lastIdEmpresa = LAST_ID_EMPRESA;
    private lastIdEndereco = LAST_ID_ENDERECO;

    private mock: Empresa[] = EMPRESAS;
    private pages: any[];

    constructor() {
        super();
        this.setPages(10);
    }

    get totalPages () : number{
        return this.pages.length;
    }

    setPages(pageSize: number) {
        let _pages = [];
        let aux = []
        let counter = 1;
        for (let i = 0; i < this.mock.length; i++) {
            if(counter <= pageSize){
                aux.push(this.mock[i]);
                counter++;
            } else {
                _pages.push([aux]);
                aux = [];

                aux.push(this.mock[i]);
                counter = 1;
            }
        }
        if(aux.length > 0){
            _pages.push(aux);
        }
        this.pages = _pages;
    }

    getPageItems(pageNumber: number, pageSize: number) {
        pageNumber--;
        this.setPages(pageSize);
        return this.pages[pageNumber];
    }

    search(searchParam: any): Observable<any> {
        let items = []
        //if (searchParam.name) {
        for (let empr of this.mock) {
            if (empr.fancyName.toLowerCase().indexOf(searchParam.name) !== -1 || searchParam.name === "") {
                items.push(empr);
            }
        }
        return new Observable<any>((obs) => {
            const result = {
                "totalPages": 2,
                "pageSize": 10,
                "currentPage": 1,
                "items": items
            }
            obs.next(result);
            obs.complete();
        });
    }

    getAll(): Observable<any> {
        return new Observable<any>((obs) => {
            
            obs.next({
                "totalPages": this.totalPages,
                "pageSize": 10,
                "currentPage": 1,
                "items": this.pages[0].filter(item => item),
                "totalItems": 15
            });
            obs.complete();
        });
    }


    update(newEmpresa: Empresa): Observable<any> {
        return new Observable<any>((obs) => {
            const oldEmpresa = this.getById(newEmpresa.id);
            if (!oldEmpresa) {
                throwError({ "message": "Empresa não encontrada", "status": 404 })
            }
            Object.assign(oldEmpresa, newEmpresa);
            obs.next(oldEmpresa);
            obs.complete();
        });
    }


    create(empresa: Empresa): Observable<any> {
        return new Observable<any>(
            (obs) => {
                empresa.id = ++this.lastIdEmpresa;
                for (let end of empresa.enderecos) {
                    end.id = ++this.lastIdEndereco;
                }
                this.mock.push(empresa);
                obs.next(empresa);
                obs.complete();
            });
    }


    delete(id: number): Observable<any> {
        return new Observable<any>(
            (obs) => {
                this.mock = this.mock.filter(empresa => empresa.id !== id);
                obs.next({ "message": "Empresa deletada com sucesso!", "status": 200 });
                obs.complete();
            });
    }


    getById(id: number): Observable<any> {
        return new Observable<any>(
            (obs) => {
                const empresa: Empresa = this.mock.filter(emp => emp.id === id).pop();
                obs.next(empresa);
                obs.complete();
            });
    }
}