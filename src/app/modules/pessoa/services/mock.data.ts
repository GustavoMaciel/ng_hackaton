import { Pessoa } from '../pessoa';
import { Telefone } from '../telefone';

export const PESSOAS: Pessoa[] = [
    new Pessoa(1, "Gustavo", "Maciel Nunes", "gm.nunes92@gmail.com", "027.613.692-62").addTelefones(
      [new Telefone(1,"+55","83","998523239")]
      ),
    new Pessoa(2, "John", "Doe", "john.doe@gmail.com", "123.456.789-10").addTelefones([
      new Telefone(2,"+55","83","998523239")
    ]),
    new Pessoa(3, "Maria", "Doe", "maria.doe@gmail.com", "321.123.321-12").addTelefones([
      new Telefone(3,"+55","83","998523239"),
      new Telefone(3,"+55","83","998523239")
    ])
  ];