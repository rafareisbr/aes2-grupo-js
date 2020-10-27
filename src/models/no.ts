import { Cor } from '../Enums/CorEnum';

export default class No {
    esquerda: No;
    direita: No;
    chave: number;
    cor: Cor;
    pai: No;

    constructor(chave: number, pai?: No, cor = Cor.Vermelho) {
        this.chave = chave;
        this.esquerda = null;
        this.direita = null;
        this.cor = cor;
        this.pai = pai;
    }
}
