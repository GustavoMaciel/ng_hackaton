export class Telefone {
    public id: number;
    public countryCode: string;
    public ddd: string;
    public number: string
    public pessoaId: number

    constructor(pessoaId: number, countryCode: string, ddd: string, number: string){
        this.pessoaId = pessoaId;
        this.countryCode = countryCode;
        this.ddd = ddd;
        this.number = number;
    }
}