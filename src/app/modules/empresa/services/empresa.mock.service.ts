import { BaseService } from 'src/app/shared/shared-services/base.service';
import { IEmpresaService } from './IEmpresa.service';
import { Observable, throwError } from 'rxjs';
import { Empresa } from '../empresa';
import { Endereco } from '../endereco';
import { EMPRESAS } from './mock.data';

export class EmpresaMockService extends BaseService implements IEmpresaService {

    private lastIdEmpresa = 3;
    private lastIdEndereco = 4;

    private mock: Empresa[] = EMPRESAS;

    constructor(){
        super();
    }

    getEmpresas(): Observable<any> {
        return new Observable<any>((obs) => {
            obs.next({
            "totalPages": 1,
            "items": this.mock
            });
            obs.complete();
        });
    }


    update(newEmpresa: Empresa): Observable<any> {
        return new Observable<any>((obs) => {
          const oldEmpresa = this.getById(newEmpresa.id);
          if(!oldEmpresa) {
            throwError({"message":"Empresa não encontrada", "status": 404})
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
            for(let end of empresa.enderecos){
              end.id = ++this.lastIdEndereco;
            }
            this.mock.push(empresa);
            obs.next(empresa);
            obs.complete();
          });
      }


    delete(id: number): Observable<any>{
        return new Observable<any>(
          (obs) => {
            this.mock = this.mock.filter(empresa => empresa.id !== id);
            obs.next({"message": "Empresa deletada com sucesso!", "status": 200});
            obs.complete();
          });
    }


    getById(id: number): Observable<any>{
        return new Observable<any>(
          (obs) => {
            const empresa: Empresa = this.mock.filter(emp => emp.id === id).pop();
            obs.next(empresa);
            obs.complete();
          });
    }
}