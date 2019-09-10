export class Telefone {
    public id: number;
    public countryCode: string;
    public ddd: string;
    public number: string
    public pessoaId: number

    constructor(id: number, pessoaId: number, countryCode: string, ddd: string, number: string){
        this.id = id;
        this.pessoaId = pessoaId;
        this.countryCode = countryCode;
        this.ddd = ddd;
        this.number = number;
    }
}