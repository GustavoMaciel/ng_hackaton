export class Endereco {
    public id: number;
    public idEmpresa: number;
    public city: string;
    public state: string;
    public street: string;
    public number: string;
    public neighborhood: string;

    constructor(idEmpresa: number, city: string, state: string, street: string, number: string, neighborhood: string) {
        this.idEmpresa = idEmpresa
        this.city = city;
        this.state = state;
        this.street = street;
        this.number = number;
        this.neighborhood = neighborhood;
    }

    setId(id: number): Endereco {
        this.id = id;
        return this;
    }

    equals(other: any): boolean{
        if(this.city !== other.city && this.state !== other.state 
            && this.street !== other.street && this.number !== other.number && this.neighborhood !== other.neighborhood){
                return false;
            } else {
                return true;
            }
    }

}

export const ESTADOS: string[] = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 
    'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
]