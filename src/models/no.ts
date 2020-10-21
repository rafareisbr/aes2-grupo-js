import { Cor } from '../Enums/CorEnum';

export default class No {
    esquerda: No;
    direita: No;
    chave: number;
    cor: Cor;

    constructor(chave: number) {
        this.chave = chave;
        this.esquerda = null;
        this.direita = null;
        this.cor = Cor.Vermelho;
    }
}
