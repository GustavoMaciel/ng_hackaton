import { BaseService } from 'src/app/shared/shared-services/base.service';
import { IEmpresaService } from './IEmpresa.service';
import { Observable } from 'rxjs';
import { Empresa } from '../empresa';

export class EmpresaService extends BaseService implements IEmpresaService {
    search(searchParam: any): Observable<any> {
        throw new Error("Method not implemented.");
    }
    getAll(): Observable<any> {
        throw new Error("Method not implemented.");
    }
    update(newEmpresa: Empresa): Observable<any> {
        throw new Error("Method not implemented.");
    }
    create(empresa: Empresa): Observable<any> {
        throw new Error("Method not implemented.");
    }
    delete(id: number): Observable<any>{
        throw new Error("Method not implemented.");
    }
    getById(id: number): Observable<any> {
        throw new Error("Method not implemented.");
    }


}