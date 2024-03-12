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
             
             let r =Math.floor(Math.random()*256)
             let g =Math.floor(Math.random()*256)
             let b =Math.floor(Math.random()*256)
             
             let bloqueHtml =

             `
             <div class='card-item'>
             <div class='cabecera' style="background:rgb(${r} ${g} ${b} );" ></div>
             <div class='cont-img'> 
             <img src = "${data[i].image}" />
             </div >
            
             <p class= 'titulo'> ${data[i].title}</p>
             <p>$${data[i].price}</p>
             <label class='categoria'>${data[i].category}</label>
             </div>

             `;
             

             
             tabla += bloqueHtml;
        }
        tabla +="</div>";
        productos.innerHTML = tabla;
    })
    
}

getData();