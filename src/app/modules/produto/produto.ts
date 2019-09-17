export class Produto {
    public id: number;
    public name: string;
    public description: string;
    public value: number;
    public categories: Categoria [] = [];

    constructor(name: string, description: string, value: number){
        this.name = name,
        this.description = description,
        this.value = value
    }

    setId(id: number): Produto {
        this.id = id;
        return this;
    }

    setCategories(categories): Produto {
        this.categories = categories;
        return this;
    }

}

export const CATEGORIES: Categoria[] = [
     {id:1, code:"C001", name: "Eletrônicos"},
     {id:2, code:"C002", name: "Livros"},
     {id:3, code:"C003", name: "Smartphones"},
     {id:4, code:"C004", name: "Computadores e Informática"},
     {id:5, code:"C005", name: "Games"},
     {id:6, code:"C006", name: "Beleza e Cuidados Pessoais"},
     {id:7, code:"C007", name: "Cozinha"},
     {id:8, code:"C008", name: "Esportes"},
]

export class Categoria {
    public id: number;
    public code: string;
    public name: string;
}