const URL = "https://fakestoreapi.com/products";
// let titulo = document.getElementById("titulo")
// let precio = document.getElementById("precio")
let productos = document.getElementById("productos")

let tabla = "<div class='card'>";
function getData(){
    fetch(URL)
    .then( response => response.json() )
    .then( data => {
        console.log("Datos de la api: ", data)
        for(let i = 0; i < data.length; i++ ){
             //crear tag etiquetas html con js
             let bloqueHtml =

             `
             <div class='card-item'>
             <div class='cabecera'></div>
             <div> </div>
             <img width = "100px" src =  "${data[i].image}" />
             <p>Titulo: ${data[i].title}</p>
             <p>Precio: ${data[i].price}</p>
             <p>Categoria:  ${data[i].category}</p>
             </div>

             `
             

             
             tabla += bloqueHtml;
        }
        tabla +="</div>";
        productos.innerHTML = tabla;
    })
    
}

getData();