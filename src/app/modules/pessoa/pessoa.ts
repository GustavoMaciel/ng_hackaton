import { Telefone } from './telefone'

export class Pessoa {
    public id: number
    public nome: string
    public sobrenome: string
    public email: string
    public cpf: string
    public telefones: Telefone[];

    constructor(id:number, nome:string, sobrenome: string, email: string, cpf: string){
        this.id = id;
        this.nome = nome;
        this.sobrenome = sobrenome;
        this.email = email;
        this.cpf = cpf
    }

    addTelefones(telefones: Telefone[]): Pessoa{
        this.telefones = telefones;
        return this;
    }
}

export class PessoaDTO {
    public id: number
    public nome: string
    public sobrenome: string
    public email: string
    public cpf: string
    public telefones: any[] = [];
    constructor(pessoa: Pessoa){
        this.id = pessoa.id;
        this.nome = pessoa.nome;
        this.sobrenome = pessoa.sobrenome;
        this.email = pessoa.email;
        this.cpf = pessoa.cpf;
        for(let tel of pessoa.telefones){
            this.telefones.push(tel.getJSONRepr());
        }
    }
}