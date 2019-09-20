import { Empresa } from '../empresa';
import { Endereco } from '../endereco';

export const EMPRESAS: Empresa[] = [
    new Empresa(
        '11.130.933/0001-10',
        'Kahoot',
        'Make learning awesome and unlock the deepest potential of each and every learner by making learning fun and engaging through games.',
        'Improve education all over the world and help everyone – of any age, aptitude or circumstance – unleash the magic of learning.'
    ).setId(1).setEnderecos([
        new Endereco(1, 'Rio Tinto', 'PB', 'Rua Aristides Lobo', 'S/N', 'Centro').setId(1),
        new Endereco(1, 'João Pessoa', 'PB', 'Rua da Aurora', 'S/N', 'Bancários').setId(2)
    ]),
    new Empresa(
        '16.146.125/0001-64',
        'Virtus',
        'Criamos novas opções de futuro por meio da pesquisa e do desenvolvimento envolvendo diferentes tecnologias.',
        'Se tornar referência internacional em desenvolvimento e inovação tecnológica.'
    ).setId(2).setEnderecos([
        new Endereco(2, 'Campina Grande', 'PB', 'Rua Aprígio Veloso', '1500', 'Bodocongó').setId(3),
    ]),
    new Empresa(
        '56.591.051/0001-90',
        'Accenture',
        'Ofertar serviços inigualáveis de estratégia empresarial, consultoria, digital, tecnologia e operações.',
        'Provendo inovação para aprimorar a maneira como o mundo vive e trabalha.'
    ).setId(3).setEnderecos([
        new Endereco(1, 'Rio Tinto', 'PB', 'S/N', 'Rua Aristides Lobo', 'Centro').setId(4),
        new Endereco(1, 'João Pessoa', 'PB', 'S/N', 'Rua da Aurora', 'Bancários').setId(5)
    ]),


    new Empresa(
        '11.130.933/0001-10',
        'Kahoot',
        'Make learning awesome and unlock the deepest potential of each and every learner by making learning fun and engaging through games.',
        'Improve education all over the world and help everyone – of any age, aptitude or circumstance – unleash the magic of learning.'
    ).setId(4).setEnderecos([
        new Endereco(4, 'Rio Tinto', 'PB', 'Rua Aristides Lobo', 'S/N', 'Centro').setId(6),
        new Endereco(4, 'João Pessoa', 'PB', 'Rua da Aurora', 'S/N', 'Bancários').setId(7)
    ]),
    new Empresa(
        '16.146.125/0001-64',
        'Virtus',
        'Criamos novas opções de futuro por meio da pesquisa e do desenvolvimento envolvendo diferentes tecnologias.',
        'Se tornar referência internacional em desenvolvimento e inovação tecnológica.'
    ).setId(5).setEnderecos([
        new Endereco(5, 'Campina Grande', 'PB', 'Rua Aprígio Veloso', '1500', 'Bodocongó').setId(8),
    ]),
    
    new Empresa(
        '16.146.125/0001-64',
        'Virtus',
        'Criamos novas opções de futuro por meio da pesquisa e do desenvolvimento envolvendo diferentes tecnologias.',
        'Se tornar referência internacional em desenvolvimento e inovação tecnológica.'
    ).setId(6),
    new Empresa(
        '16.146.125/0001-64',
        'Virtus',
        'Criamos novas opções de futuro por meio da pesquisa e do desenvolvimento envolvendo diferentes tecnologias.',
        'Se tornar referência internacional em desenvolvimento e inovação tecnológica.'
    ).setId(7),
    new Empresa(
        '16.146.125/0001-64',
        'Virtus',
        'Criamos novas opções de futuro por meio da pesquisa e do desenvolvimento envolvendo diferentes tecnologias.',
        'Se tornar referência internacional em desenvolvimento e inovação tecnológica.'
    ).setId(8),
    new Empresa(
        '16.146.125/0001-64',
        'Virtus',
        'Criamos novas opções de futuro por meio da pesquisa e do desenvolvimento envolvendo diferentes tecnologias.',
        'Se tornar referência internacional em desenvolvimento e inovação tecnológica.'
    ).setId(9),
    new Empresa(
        '16.146.125/0001-64',
        'Virtus',
        'Criamos novas opções de futuro por meio da pesquisa e do desenvolvimento envolvendo diferentes tecnologias.',
        'Se tornar referência internacional em desenvolvimento e inovação tecnológica.'
    ).setId(10),
    new Empresa(
        '16.146.125/0001-64',
        'Virtus',
        'Criamos novas opções de futuro por meio da pesquisa e do desenvolvimento envolvendo diferentes tecnologias.',
        'Se tornar referência internacional em desenvolvimento e inovação tecnológica.'
    ).setId(11),
    new Empresa(
        '16.146.125/0001-64',
        'Virtus',
        'Criamos novas opções de futuro por meio da pesquisa e do desenvolvimento envolvendo diferentes tecnologias.',
        'Se tornar referência internacional em desenvolvimento e inovação tecnológica.'
    ).setId(12),
    new Empresa(
        '16.146.125/0001-64',
        'Virtus',
        'Criamos novas opções de futuro por meio da pesquisa e do desenvolvimento envolvendo diferentes tecnologias.',
        'Se tornar referência internacional em desenvolvimento e inovação tecnológica.'
    ).setId(13),
    new Empresa(
        '16.146.125/0001-64',
        'Virtus',
        'Criamos novas opções de futuro por meio da pesquisa e do desenvolvimento envolvendo diferentes tecnologias.',
        'Se tornar referência internacional em desenvolvimento e inovação tecnológica.'
    ).setId(14),
    new Empresa(
        '16.146.125/0001-64',
        'Virtus',
        'Criamos novas opções de futuro por meio da pesquisa e do desenvolvimento envolvendo diferentes tecnologias.',
        'Se tornar referência internacional em desenvolvimento e inovação tecnológica.'
    ).setId(15),
    
]

export const LAST_ID_EMPRESA: number = 15
export const LAST_ID_ENDERECO: number = 8 