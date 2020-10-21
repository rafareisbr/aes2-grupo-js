export default class No {
    esquerda: No;
    direita: No;
    chave: number;

    constructor(chave: number) {
        this.chave = chave;
        this.esquerda = null;
        this.direita = null;
    }
}
