import Arvore from "./models/arvore";
import No from "./models/no";

function start() {
    let arvore = new Arvore();
    console.log("Teste: Devem ser executadas duas rotações aqui, uma para direita e outra para esquerda");
    //verifique: https://www.inf.ufsc.br/~aldo.vw/estruturas/simulador/RB.html
    arvore.inserir(40);
    arvore.inserir(20);
    arvore.inserir(34);
    arvore.inserir(39);
    arvore.inserir(35);
    arvore.inserir(19);
    arvore.inserir(10);
    arvore.inserir(11);
    arvore.inserir(14);
    arvore.inserir(60);
    arvore.inserir(70);
    arvore.inserir(45);
    //erro undefined
    arvore.remover(39);
    arvore.inserir(72);
    arvore.inserir(74);
    //erro não remove
    arvore.remover(45);
    arvore.remover(40);
    arvore.remover(35);
    //erro transforma toda a arvore esqueda em null
    arvore.remover(34);
    //usei esse para validar a arvore https://www.cs.usfca.edu/~galles/visualization/RedBlack.html
    
    arvore.exibir();
    //exibe o valor e cor da raiz, para verificar se as rotações fora feitas certo
    console.log(`Raiz: ${arvore.raiz.chave} Cor: ${arvore.raiz.cor}`);
}

start();
