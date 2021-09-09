function ajax(caminho,funcao) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange=funcao;
    xhttp.open("GET",caminho,true);
    xhttp.send();
}
let doc;

function iniciarConteudo()
{
    alert("readState: "+ this.readyState+", status: "+this.status);
    if(this.readyState==4&&this.status==200)
    {
        doc=this.responseXML;
        
        mostrar();
    }
}

function mostrar()
{
   let listas=doc.getElementsByTagName("lista");
   for(let lista of listas)
   {
      
            
    var body = document.getElementById("body");
    var artigo = document.createElement("article");
    var cabecalho = document.createElement("header");

    var h1 = document.createElement("h1");
    h1.setAttribute("id","titulo");

    var noTexto = document.createTextNode(pegaTitulo(lista));
    h1.appendChild(noTexto);
    cabecalho.appendChild(h1);
    artigo.appendChild(cabecalho);
    body.appendChild(artigo);

    var ulNaoFeito = document.createElement("ul");
    ulNaoFeito.setAttribute("id","listanaofeito");
    var ulFeito = document.createElement("ul");
    ulFeito.setAttribute("id","listafeito");
   
    artigo.appendChild(ulNaoFeito);
    artigo.appendChild(ulFeito);
    
           criaListaItens(lista,
               //document.getElementById("listanaofeito"),
               //document.getElementById("listafeito"),
               ulNaoFeito, ulFeito
           );
       
   }
}

function pegaTitulo(lista)
{
    return lista.getElementsByTagName("titulo")[0].firstChild.nodeValue;
}

function criaListaItens(lista,listaNaoFeito,listaFeito)
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
    listaFeito.innerHTML=textoFeito;
    listaNaoFeito.innerHTML=textoNaoFeito;
}
ajax("listas.xml",iniciarConteudo);