export class Produto {
    public id: number;
    public name: string;
    public description: string;
    public value: number;
    public categories = [];

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

export const CATEGORIES = [
    "Eletrônicos", "Livros", "Smartphones", "Computadores e Informática", "Games", "Escritório", "Beleza e Cuidados Pessoais",
    "Cozinha", "Esportes" 
]