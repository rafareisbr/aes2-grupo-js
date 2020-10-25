import No from "./no";
import { Cor } from '../Enums/CorEnum';

export default class Arvore {
    raiz: No;

    constructor() {
        this.raiz = null;
    }

    inserir(chave: number) {
        const node = new No(chave, null)
        let raiz = this.raiz;
        let aux: No = null;

        while(raiz != null) {
            aux = raiz;
            if(node.chave < raiz.chave)
                raiz = raiz.esquerda;
            else
                raiz = raiz.direita;
        }
        node.pai = aux;
        if(aux === null)
            this.raiz = node;
        else if(node.chave < aux.chave)
            aux.esquerda = node;
        else
            aux.direita = node;

        if(node.pai === null){
            node.cor = Cor.Preto;
            return;
        }
        if(node.pai.pai === null)
            return;

        //this.fix(node);
    }

   

    private rotacaoEsquerda(raiz: No): No {
        console.log('Rotação esquerda');
        let aux = raiz.direita;
        raiz.direita = aux.esquerda;
        aux.esquerda = raiz;
        aux.cor = raiz.cor;
        raiz.cor = Cor.Vermelho;
        return aux;
    }

    private rotacaoDireita(raiz: No): No {
        console.log('Rotação direita');
        let aux = raiz.esquerda;
        raiz.esquerda = aux.direita;
        aux.direita = raiz;
        aux.cor = raiz.cor;
        raiz.cor  = Cor.Vermelho;
        return aux;
    }

    remover() { }

    exibir() {
        this.exibirOrdemAtual(this.raiz);
    }
    exibirInOrdem(no: No) {
        if (no !== null) {
            this.exibirInOrdem(no.esquerda);
            console.log(`Valor: ${no.chave} Cor: ${no.cor}`);
            this.exibirInOrdem(no.direita)
        }
    }
    //exibe na ordem da árvore, usei para testar
    exibirOrdemAtual(no: No) {
        if (no !== null) {
            console.log(`Valor: ${no.chave} Cor: ${no.cor.toString()} Pai: ${no.pai?no.pai.chave: 'Sem pai'}`);
            this.exibirOrdemAtual(no.esquerda);
            this.exibirOrdemAtual(no.direita)
        }
    }
}
