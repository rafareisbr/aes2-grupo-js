import No from "./no";
import { Cor } from '../Enums/CorEnum';
import Arvore from "./arvore";


export default class Suporte {



    constructor() {

    }

    inversaoDeCor(node: No) {
        let noTemporario = node
        noTemporario.cor = (node.cor === Cor.Vermelho) ? Cor.Preto : Cor.Vermelho
    }

    trocaDeCor(node1: No, node2: No) {
        let temporario = node1.cor
        node1.cor = node2.cor
        node2.cor = temporario
    }

    trocaDeChave(node1: No, node2: No) {
        let valorTemporario = node1.chave
        node1.chave = node2.chave
        node2.chave = valorTemporario

    }

    getSucessor(node: No) {
        let sucessor = node.esquerda
        while (sucessor.direita !== null) {
            sucessor = sucessor.direita
        }

        return sucessor
    }

    getIrmao(node: No) {
        let irmao = null
        irmao = (node === node.pai.esquerda) ? node.pai.direita : node.pai.esquerda
        return irmao
    }

    ehFilhoEsquerda(node: No) {
        return ((node === node.pai.esquerda) ? true : false)
    }

    FilhoEhVermelhor(node: No) {
        return ((node.esquerda && node.esquerda.cor === Cor.Vermelho) || (node.direita && node.direita.cor === Cor.Vermelho))
    }

    remove(raiz: No, chave: number){
        let node = new No(chave)


        if(node === null){
            return
        }

        this.removeBS(raiz, node)
    }

    removeBS(raiz: No, node: No) {
        if (raiz === null || node === null) {
            return null
        }

        if (node.chave === raiz.chave) {
            if ((raiz.esquerda === null) && (raiz.direita === null)) {
                if (raiz === node) {
                    return null
                } else if (raiz.cor === Cor.Vermelho) {
                    return null
                } else {
                    this.fixDoubleBlack(node, raiz)
                }
            } else if (raiz.esquerda === null && raiz.direita !== null) {
                this.trocaDeChave(raiz, raiz.direita)
                raiz.direita = this.removeBS(raiz.direita, raiz.direita)

            } else if (raiz.esquerda !== null && raiz.direita === null) {
                this.trocaDeChave(raiz, raiz.esquerda)
                raiz.direita = this.removeBS(raiz.esquerda, raiz.esquerda)

            } else {
                let sucessor = this.getSucessor(raiz)
                this.trocaDeChave(raiz, sucessor)
                raiz.esquerda = this.removeBS(raiz.esquerda, sucessor)
            }
        } else if (node.chave < raiz.chave) {
            this.removeBS(raiz.esquerda, node)
        } else if (node.chave > raiz.chave) {
            this.removeBS(raiz.direita, node)
        }
    }

    fixDoubleBlack(node: No, raiz: No) {
        if (node === raiz) {
            return
        }
        let irmao = this.getIrmao(node)
        let pai = node.pai

        if (!irmao) {
            this.fixDoubleBlack(pai, raiz)
        } else {
            let arvore = new Arvore()

            if (irmao.cor === Cor.Vermelho) {
                this.trocaDeCor(pai, irmao)
                if (this.ehFilhoEsquerda(irmao)) {
                    arvore.rotacaoDireita(pai)
                } else {
                    arvore.rotacaoEsquerda(pai)
                }
                this.fixDoubleBlack(node, raiz)
            } else {
                if (this.FilhoEhVermelhor(irmao)) {
                    if (this.ehFilhoEsquerda(irmao)) {
                        if (irmao.esquerda && irmao.esquerda.cor === Cor.Vermelho) {
                            this.trocaDeCor(pai, irmao)
                            this.inversaoDeCor(irmao.esquerda)
                            arvore.rotacaoDireita(pai)
                            pai.direita = null

                        } else {
                            this.trocaDeCor(irmao, irmao.direita)
                            arvore.rotacaoEsquerda(irmao)
                            this.fixDoubleBlack(node, raiz)
                        }
                    }
                    else {
                        if (irmao.direita && irmao.direita.cor === Cor.Vermelho) {
                            this.trocaDeCor(pai, irmao)
                            this.inversaoDeCor(irmao.direita)
                            arvore.rotacaoEsquerda(pai)

                        } else {
                            this.trocaDeCor(irmao, irmao.esquerda)
                            arvore.rotacaoDireita(irmao)
                            this.fixDoubleBlack(node, raiz)
                        }
                    }
                } else {
                    this.inversaoDeCor(irmao)
                    if (pai.cor === Cor.Preto) {
                        this.fixDoubleBlack(pai, raiz)
                    } else {
                        pai.cor = Cor.Preto
                    }
                }

            }
        }
    }
}