
const URL = "https://fakestoreapi.com/products";
let titulo = document.getElementById("titulo")
let precio = document.getElementById("precio")
let productos = Document,getElementById("productos")

  let tabla = ""
console.log()

function getData(){
fetch(URL)
.then( Response => Response.json())
.then(data => {
    console.log("Datos de la api: ",data) 
    for(let i = 0; i < data.length; i++){
    
        let bloqueHtml = "<p>${data¨[i].title}</p>"
        console.log(bloqueHtml)
        tabla += bloqueHtml;
        
    }       
    titulo.innerHTML = data[2].title;
    precio.innerHTML = data[2].price;
})

titulo.innerHTML = "nuevo texto";
//precio.innerHTMl = data[2].title;
tabla += "</div>";
productos.innerHTML = tabla;
}

getData();