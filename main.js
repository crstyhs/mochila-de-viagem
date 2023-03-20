const form = document.getElementById("novoItem");
const lista = document.getElementById("lista");
const itens = JSON.parse( localStorage.getItem("itens")) || [];

itens.forEach((elemento) =>{
    cria_elemento(elemento);
   
})

form.addEventListener("submit", (evento) =>{
    evento.preventDefault();
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];
    const existe = itens.find(elemento => elemento.nome === nome.value);
   
    const item_atual ={
        "nome": nome.value,
        "quantidade": quantidade.value
    }
    if (existe){
        item_atual.id = existe.id
        atualiza_elemento(item_atual);
        itens[itens.findIndex(elemento => elemento.id === existe.id )]= item_atual ;
    } else{
        item_atual.id = itens[itens.length -1] ? (itens[itens.length-1]).id +1 : 0;
        cria_elemento(item_atual);
        itens.push(item_atual);
    }

    localStorage.setItem("itens", JSON.stringify(itens));

    nome.value = "";
    quantidade.value = "";

})

function cria_elemento(item){
   
    const novo_item = document.createElement('li');
    novo_item.classList.add("item");
    const novo_numero = document.createElement('strong');
    novo_numero.innerHTML = item.quantidade ;
    novo_numero.dataset.id = item.id ;
    novo_item.appendChild(novo_numero);
    novo_item.innerHTML += item.nome ;
   
   novo_item.appendChild(botao_deleta(item.id)) ;

    lista.appendChild(novo_item);

    
}   
function atualiza_elemento(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML =item.quantidade
}
function botao_deleta(id){
    const elemento_botao = document.createElement("button");
    elemento_botao.innerText = "X";
    elemento_botao.addEventListener("click", function(){
        deleta_elemento(this.parentNode , id);
    })

    return elemento_botao ;
}
function deleta_elemento(tag , id){
    tag.remove();
    
    itens.splice(itens.findIndex(elemento => elemento.id === id),1);
    localStorage.setItem("itens", JSON.stringify(itens));
}