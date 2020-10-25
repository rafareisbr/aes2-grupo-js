import Arvore from "./models/arvore";
import No from "./models/no";

function start() {
    let arvore = new Arvore();
    console.log("Teste: Devem ser executadas duas rotações aqui, uma para direita e outra para esquerda");
    //verifique: https://www.inf.ufsc.br/~aldo.vw/estruturas/simulador/RB.html
    console.log("========inserindo 20========");
    arvore.inserir(20);
    console.log("========inserindo 12========");
    arvore.inserir(12);
    console.log("========inserindo 10 ========");
    arvore.inserir(10);
    console.log("========inserindo 22 ========");
    arvore.inserir(22);
    console.log("========inserindo 30 ========");
    arvore.inserir(30);
    console.log("================");
    
    arvore.exibir();
    //exibe o valor e cor da raiz, para verificar se as rotações fora feitas certo
    console.log(`Raiz: ${arvore.raiz.chave} Cor: ${arvore.raiz.cor}`);
}

start();
