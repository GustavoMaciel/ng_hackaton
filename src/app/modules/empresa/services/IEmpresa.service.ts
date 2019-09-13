import { Observable } from 'rxjs';
import { Empresa } from '../empresa';

export interface IEmpresaService {
    getEmpresas(): Observable<any>;
    delete(id: number): Observable<any>;
    update(newEmpresa: Empresa): Observable<any>;
    patch(empresa: Empresa): Observable<any>;
    create(empresa: Empresa): Observable<any>;
}