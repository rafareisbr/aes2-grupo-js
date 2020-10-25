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

   

    private rotacaoEsquerda(node: No){
        console.log(`Rotação esquerda`);
        let auxiliar = node.direita;
        node.direita = auxiliar.esquerda;
        if(auxiliar.esquerda !== null)
            auxiliar.esquerda.pai = node;
        auxiliar.pai = node.pai;
        if(node.pai === null)
            this.raiz = auxiliar;
        else if (node === node.pai.esquerda)
            node.pai.esquerda = auxiliar;
        else
            node.pai.direita = auxiliar;
        
        auxiliar.esquerda = node;
        node.pai = auxiliar;
    }

    private rotacaoDireita(node: No){
        console.log('Rotação direita');
        let auxiliar = node.esquerda;
        node.esquerda = auxiliar.direita;
        if(auxiliar.direita !== null)
            auxiliar.direita.pai = node;
        auxiliar.pai = node.pai;
        if(node.pai === null)
            this.raiz = auxiliar;
        else if (node === node.pai.direita)
            node.pai.direita = auxiliar;
        else
            node.pai.esquerda = auxiliar;
        
        auxiliar.direita = node;
        node.pai = auxiliar;
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
