import No from "./no";
import { Cor } from '../Enums/CorEnum';

export default class Arvore {
    raiz: No;

    constructor() {
        this.raiz = null;
    }

    inserir() {}

    private rotacaoEsquerda(raiz: No): No {
        let aux = raiz.direita;
        raiz.direita = aux.esquerda;
        aux.esquerda = raiz;
        aux.cor = raiz.cor;
        aux.esquerda.cor = Cor.Vermelho;
        return aux;
    }

    private rotacaoDireita(raiz: No): No {
        let aux = raiz.esquerda;
        raiz.esquerda = aux.direita;
        aux.direita = raiz;
        aux.cor = raiz.cor;
        aux.direita.cor = Cor.Vermelho;
        return aux;
    }

    remover() {}

    exibir() {}
}
