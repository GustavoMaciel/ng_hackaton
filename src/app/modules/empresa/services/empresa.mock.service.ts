import { BaseService } from 'src/app/shared/shared-services/base.service';
import { IEmpresaService } from './IEmpresa.service';
import { Observable, throwError } from 'rxjs';
import { Empresa } from '../empresa';
import { Endereco } from '../endereco';
import { EMPRESAS, LAST_ID_EMPRESA, LAST_ID_ENDERECO } from './mock.data';
import { BaseMockService } from 'src/app/shared/shared-services/base.mock.service';

export class EmpresaMockService extends BaseMockService implements IEmpresaService {

    private lastIdEmpresa = LAST_ID_EMPRESA;
    private lastIdEndereco = LAST_ID_ENDERECO;

    constructor() {
        super();
        this.items = EMPRESAS;
        this.setPages(this.pageSize, this.items);
    }

    getSearchedItems(searchParam: any): any{
        let auxItems = []
        //if (searchParam.name) {
        for (let item of this.items) {
            if (item.fancyName.toLowerCase().indexOf(searchParam.name) !== -1 || searchParam.name === "") {
                auxItems.push(item);
            }
        }
        return auxItems;
    }

    create(empresa: Empresa): Observable<any> {
        return new Observable<any>(
            (obs) => {
                empresa.id = ++this.lastIdEmpresa;
                for (let end of empresa.enderecos) {
                    end.id = ++this.lastIdEndereco;
                }
                this.items.push(empresa);
                obs.next(empresa);
                obs.complete();
            });
    }
}