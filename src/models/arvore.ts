import No from "./no";
import { Cor } from '../Enums/CorEnum';

export default class Arvore {
    raiz: No;
    valoresArvore: Array<number>;
    alturaBenchmark: number;

    constructor() {
        this.raiz = null;
    }

    inserir(chave: number) {
        const node = new No(chave, null)
        let raiz = this.raiz;
        let aux: No = null;

        while(raiz != null) {
            this.alturaBenchmark++;
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

        this.fix(node);
    }

    fix(node: No) {
        let u: No;
        while(node.pai.cor === Cor.Vermelho){
            if(node.pai === node.pai.pai.direita){
                u = node.pai.pai.esquerda;
                if(u === null)
                    u = new No(null, null, Cor.Preto)
                if(u.cor === Cor.Vermelho){
                    u.cor = Cor.Preto;
                    node.pai.cor = Cor.Preto;
                    node.pai.pai.cor = Cor.Vermelho
                    node = node.pai.pai;
                } else {
                    if( node === node.pai.esquerda) {
                        node = node.pai;
                        this.rotacaoDireita(node);
                    }
                    node.pai.cor = Cor.Preto;
                    node.pai.pai.cor = Cor.Vermelho;
                    this.rotacaoEsquerda(node.pai.pai);
                }
            } else {
                u = node.pai.pai.direita;
                if(u === null)
                    u = new No(null, null, Cor.Preto)
                if(u.cor === Cor.Vermelho) {
                    u.cor = Cor.Preto;
                    node.pai.cor = Cor.Preto;
                    node.pai.pai.cor = Cor.Vermelho;
                    node = node.pai.pai;
                } else {
                    if(node === node.pai.direita) {
                        node = node.pai;
                        this.rotacaoEsquerda(node);
                    }
                    node.pai.cor = Cor.Preto;
                    node.pai.pai.cor = Cor.Vermelho;
                    this.rotacaoDireita(node.pai.pai);
                }
            }
            if(node === this.raiz){
                break;
            }
        }
        this.raiz.cor = Cor.Preto;
    }

    private rotacaoEsquerda(node: No){
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
    remover(chave: number) {
        this.delete(this.raiz, chave);
    }

    exibir() {
        this.exibirOrdemAtual(this.raiz);
    }
    private search(node: No, chave: number): No {
        if(node === null || chave === node.chave) {
            return node;
        }
        this.alturaBenchmark++;
        if(chave < node.chave) {
            return this.search(node.esquerda, chave);
        }
        return this.search(node.direita, chave);
    }
    private fixDelete(x: No) {
        let s: No;
        while(x !== this.raiz && x.cor === Cor.Preto) {
            if(x === x.pai.esquerda) {
                s = x.pai.direita;
                if(s.cor === Cor.Vermelho){
                    //case 3.1
                    s.cor = Cor.Preto;
                    x.pai.cor = Cor.Vermelho;
                    this.rotacaoEsquerda(x.pai);
                    s = x.pai.direita;
                }
                if(s.esquerda.cor === Cor.Preto && s.direita.cor === Cor.Preto){
                    //case 3.2
                    s.cor = Cor.Vermelho;
                    x = x.pai;
                } else {
                    if(s.direita.cor === Cor.Preto) {
                        //case 3.3
                        s.esquerda.cor = Cor.Preto;
                        s.cor = Cor.Vermelho;
                        this.rotacaoDireita(s);
                        s = x.pai.direita;
                    }
                    //case 3.4
                    s.cor = x.pai.cor;
                    x.pai.cor = Cor.Preto;
                    s.direita.cor = Cor.Preto;
                    this.rotacaoEsquerda(x.pai);
                    x = this.raiz;
                }
            } else {
                s = x.pai.esquerda;
                if(s.cor === Cor.Vermelho){
                    //case 3.1
                    s.cor = Cor.Preto;
                    x.pai.cor = Cor.Vermelho;
                    this.rotacaoDireita(x.pai);
                    s = x.pai.esquerda;
                }
                if(s.direita.cor === Cor.Preto && s.esquerda.cor === Cor.Preto){
                    //case 3.2
                    s.cor = Cor.Vermelho;
                    x = x.pai;
                } else {
                    if(s.esquerda.cor === Cor.Preto){
                        //case 3.3
                        s.direita.cor = Cor.Preto;
                        s.cor = Cor.Vermelho;
                        this.rotacaoEsquerda(s);
                        s = x.pai.esquerda;
                    }
                    //case 3.4
                    s.cor = x.pai.cor;
                    x.pai.cor = Cor.Preto;
                    s.esquerda.cor = Cor.Preto;
                    this.rotacaoDireita(x.pai);
                    x = this.raiz;
                }
            }
        }
        x.cor = Cor.Preto;
    }
        private rbTransplant(u, v) {
            if(u.pai === null)
                this.raiz = v;
            else if(u === u.pai.esquerda)
                u.pai.esquerda = v;
            else
                u.pai.direita = v;
            if(v === null)
                v = new No(null, null, Cor.Preto);
            v.pai = u.pai;
        }
        delete(node: No, chave: number) {
            let z:No = null;
            let x: No, y: No;
            while(node !== null){
                if(node.chave === chave)
                    z = node;
                if(node.chave <= chave)
                    node = node.direita;
                else
                    node = node.esquerda
            }
            if(z === null)
                return;
            y = z;
            let yCor = y.cor;
            if(z.esquerda === null) {
                x = z.direita;
                this.rbTransplant(z, z.direita);
            }else if(z.direita === null){
                x = z.esquerda;
                this.rbTransplant(z, z.esquerda);
            } else {
                y = this.minimun(z.direita);
                yCor = y.cor;
                x = y.direita;
                if(y.pai === z){
                    if(x === null)
                        x = new No(null, null, Cor.Preto);
                    x.pai = y;
                }else {
                    this.rbTransplant(y, y.direita);
                    y.direita = z.direita;
                    y.direita.pai = y;
                }
                this.rbTransplant(z, y);
                y.esquerda = z.esquerda;
                y.esquerda.pai = y;
                y.cor = z.cor;
            }
            if(yCor === Cor.Preto && x !== null){
                this.fixDelete(x);
            }
        }
        minimun(node: No) {
            while(node.esquerda !== null)
                node = node.esquerda;
            return node;
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

    criaArvore(quantidadeNo: number) {
        let valorNos = new Array<number>(quantidadeNo);
        let novoValor = 0;
        let valorExistente = true;
        for(let cont = 0; cont < quantidadeNo; cont++) {
            valorExistente = true;
            while (valorExistente) {
                valorExistente = false;
                novoValor = Math.floor(Math.random()*10000000);
                if (cont === 0) {
                    valorNos[cont] = novoValor;
                } else {
                    for(let cont2 = 0; cont2 < cont; cont2++) {
                        if (valorNos[cont2] === novoValor) {
                            valorExistente = true;
                        }
                    }
                    if (valorExistente === false) {
                        valorNos[cont] = novoValor;
                    }
                }
            }
        }
        for(let cont = 0; cont < quantidadeNo; cont++) {
            this.inserir(valorNos[cont]);
        }
        this.valoresArvore = valorNos;
    }
    testaArvore() {
        let valor = 0;
        for(let cont = 0; cont < 30; cont ++) {
            this.alturaBenchmark = 0;
            this.search(this.raiz, this.valoresArvore[cont]);
            console.log(`procura ${cont+1}: ${this.alturaBenchmark}`)
        }
        for(let cont = 0; cont < 30; cont ++) {
            this.alturaBenchmark = 0;
            valor = Math.floor(Math.random()*10000000);
            this.inserir(valor);
            console.log(`inserção ${cont+1}: ${this.alturaBenchmark}`)
        }
        for(let cont = 0; cont < 30; cont ++) {
            this.remover(this.valoresArvore[cont+30]);
        }
    }
}
