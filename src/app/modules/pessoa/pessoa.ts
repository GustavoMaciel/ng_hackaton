export class Pessoa {
    public id: number
    public nome: string
    public sobrenome: string
    public email: string
    public cpf: string
    constructor(id:number, nome:string, sobrenome: string, email: string, cpf: string){
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.cpf = cpf
    }
}