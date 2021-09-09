function ajax(caminho,funcao) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=funcao;
    xhttp.open("GET",caminho,true);
    xhttp.send();
}
let doc;
var botaoFiltro = document.getElementById("btfiltro");

function iniciarConteudo()
{
    if(this.readyState==4&&this.status==200)
    {
        doc=this.responseXML;
        
        mostrar("");
    }
}

botaoFiltro.onclick = function(){
    let selecionado = document.getElementById("selectfiltro");
    let textoSelecionado = selecionado.options[selecionado.selectedIndex].value;
   
    removerListaItens();
    mostrar(textoSelecionado);   
}

function mostrar(parametroPesquisa)
{
   let listas=doc.getElementsByTagName("lista");
   for(let lista of listas)
   {
        let pesquisa = document.getElementById("cxtexto");
        let titulo = pegaTitulo(lista);
        if(parametroPesquisa=="titulo" && titulo.toLowerCase().includes(pesquisa.value)){
            gerarCorpoHTML(parametroPesquisa, lista, titulo);
           
        }else if(parametroPesquisa!="titulo"){
            gerarCorpoHTML(parametroPesquisa, lista, titulo);
        }
    }
}

function gerarCorpoHTML(parametroPesquisa, lista, titulo){
    let body = document.getElementById("body");
    let artigo = document.createElement("article");
    let cabecalho = document.createElement("header");

    let h1 = document.createElement("h1");
    h1.setAttribute("id","titulo");

    let noTexto = document.createTextNode(titulo);
    h1.appendChild(noTexto);
    cabecalho.appendChild(h1);
    artigo.appendChild(cabecalho);
    body.appendChild(artigo);

    let ulNaoFeito = document.createElement("ul");
    ulNaoFeito.setAttribute("id","listanaofeito");
    let ulFeito = document.createElement("ul");
    ulFeito.setAttribute("id","listafeito");

    artigo.appendChild(ulNaoFeito);
    artigo.appendChild(ulFeito);
    
    criaListaItens(lista, ulNaoFeito, ulFeito, parametroPesquisa);
}

function pegaTitulo(lista)
{
    return lista.getElementsByTagName("titulo")[0].firstChild.nodeValue;
}

function removerListaItens(){
    let body = document.getElementById("body");
    body.innerHTML='';
}

function criaListaItens(lista,listaNaoFeito,listaFeito, parametroPesquisa)
{
    let itens=lista.getElementsByTagName("item");
    let textoNaoFeito="",textoFeito="";
    for(let item of itens)
    {
        let texto=item.firstChild.nodeValue;
        if(item.getAttribute("prioridade")=="sim")
            texto=`<b>${texto}</b>`;
        if(item.getAttribute("feito")=="sim")
            textoFeito+=`<li><del>${texto}</del></li>`;
        else
            textoNaoFeito+=`<li>${texto}</li>`;
    }
    if(parametroPesquisa==""){
        listaFeito.innerHTML=textoFeito;
        listaNaoFeito.innerHTML=textoNaoFeito;
    }else if(parametroPesquisa=="feito"){
        listaNaoFeito.innerHTML=textoNaoFeito;
    }else if(parametroPesquisa=="naofeito"){
        listaFeito.innerHTML=textoFeito;
    }else{
        listaFeito.innerHTML=textoFeito;
        listaNaoFeito.innerHTML=textoNaoFeito;
    }
    
}
ajax("listas.xml",iniciarConteudo);