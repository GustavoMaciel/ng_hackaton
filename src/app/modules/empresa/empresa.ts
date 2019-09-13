import { Endereco } from './endereco';

export class Empresa {
    public id: number;
    public cnpj: string;
    public fancyName: string;
    public mission: string;
    public vision: string;
    public enderecos: Endereco[]

    constructor(cnpj: string, fancyName: string, mission: string, vision: string){
        this.cnpj = cnpj;
        this.fancyName = fancyName;
        this.mission = mission;
        this.vision = vision;        
    }

    setId(id: number): Empresa {
        this.id = id;
        return this;
    }

    setEnderecos(enderecos: Endereco[]): Empresa {
        this.enderecos = enderecos;
        return this;
    }

}