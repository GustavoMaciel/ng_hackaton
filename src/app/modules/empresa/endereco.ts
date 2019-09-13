export class Endereco {
    public id: number;
    public idEmpresa: number;
    public city: string;
    public state: string;
    public number: string;
    public neighborhood: string;

    constructor(idEmpresa: number, city: string, state: string, number: string, neighborhood: string) {
        this.idEmpresa = idEmpresa
        this.city = city;
        this.state = state;
        this.number = number;
        this.neighborhood = neighborhood;
    }

    setId(id: number): Endereco {
        this.id = id;
        return this;
    }

}