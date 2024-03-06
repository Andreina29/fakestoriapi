console.log("Hola mundo");
const URL = "https://fakestoreapi.com/products";
function getData(){
fetch(URL)
.then( Response => Response.json())
.then(data => console.log("DATOS DE LA API: ", data) )
}

getData();