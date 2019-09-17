import { Produto, CATEGORIES } from '../produto';

export const PRODUTOS: Produto[] = [
    new Produto(
        'Samsung Galaxy Watch Active', 
        "Smartwatch premium da Samsung que vem com uma resistência extra contra impactos (MIL-STD-810G), além de ser à prova d'água (IP68), além de trazer a tela AMOLED da própria empresa.", 
        990.90
    ).setId(1).setCategories([CATEGORIES[0], CATEGORIES[3]]),
    new Produto(
        'Samsung Galaxy Watch', 
        "Smartwatch premium da Samsung com tela Super AMOLED, chip de fabricação própria e suporte ao Samsung Pay.", 
        1087.68
    ).setId(2).setCategories([CATEGORIES[0], CATEGORIES[3]]),
]