import Arvore from "./models/arvore";
import No from "./models/no";

function start() {
    let arvore = new Arvore();
    arvore.criaArvore(100);
    arvore.testaArvore();
    console.log(`Raiz: ${arvore.raiz.chave} Cor: ${arvore.raiz.cor}`);
}

start();
