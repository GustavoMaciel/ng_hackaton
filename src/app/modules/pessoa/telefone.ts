export class Telefone {
    public id: number;
    public codigoPais: string;
    public ddd: string;
    public numero: string
    public pessoaId: number

    constructor(pessoaId: number, countryCode: string, ddd: string, number: string){
        this.pessoaId = pessoaId;
        this.codigoPais = countryCode;
        this.ddd = ddd;
        this.numero = number;
    }

    getJSONRepr(){
        return {
            "id": this.id,
            "codigoPais": this.codigoPais,
            "ddd": this.ddd,
            "numero": this.numero,
        }
    }
}