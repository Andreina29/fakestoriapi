// Definición de la URL de la API de la tienda
const URL = "https://fakestoreapi.com/products";

// Variables globales para almacenar elementos del DOM y datos del carrito
let productos = document.getElementById("productos");
let listaCarrito = document.getElementById("lista-carrito");
let carrito = [];
let botonCarrito = document.getElementById("boton-carrito");
let subtotalElemento = document.getElementById("subtotal");
let impuestosElemento = document.getElementById("impuestos");
let totalElemento = document.getElementById("total");

// Función para obtener datos de la API
function getData(){
    fetch(URL)
    .then( response => response.json() ) // Convertir respuesta a JSON
    .then( data => {
        mapearDatos(data); // Llamar a la función para mapear los datos recibidos
    })
}

// Función para mapear los datos recibidos y generar elementos HTML
function mapearDatos(data){
    let tabla = "<div class='card'>"; // Iniciar una cadena de texto con la estructura HTML
    data.forEach(item => { // Iterar sobre cada elemento de la lista de productos
        let r = Math.floor( Math.random()*256 ) // Generar un valor de color aleatorio
        let g = Math.floor( Math.random()*256 ) 
        let b = Math.floor( Math.random()*256 ) 
        let precio = item.price // Obtener el precio del producto
         let bloqueHtml = // Generar el HTML para cada producto
         `
         <div class='card-item'>
            <div class='cabecera' style="background: rgb(${r} ${g} ${b} );" ></div>
            <div class='cont-img'>
                <img src="${item.image}" />
            </div>
            <p class='titulo'>${item.title}</p>
            <p>$${precio} <span class='precio-sd'> $${ ((precio * 0.1) + precio).toFixed(2)  }</span> </p>
            <label class='categoria'>${item.category}</label>
            <button class='btn-agregar' data-id="${item.id}" data-title="${item.title}" data-price="${item.price}" data-image="${item.image}">Agregar al Carrito</button>
         </div>
         `;
         tabla += bloqueHtml; // Agregar el bloque HTML generado a la cadena de texto
    });
    tabla +="</div>"; // Cerrar la estructura HTML
    productos.innerHTML = tabla; // Insertar la estructura HTML en el elemento productos del DOM
    // Agregar evento de clic a todos los botones de agregar al carrito
    document.querySelectorAll('.btn-agregar').forEach(btn => {
        btn.addEventListener('click', agregarAlCarrito);
    });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(event) {
    const id = event.target.getAttribute('data-id'); // Obtener el ID del producto
    const title = event.target.getAttribute('data-title'); // Obtener el título del producto
    const price = parseFloat(event.target.getAttribute('data-price')); // Obtener el precio del producto y convertirlo a número
    const image = event.target.getAttribute('data-image'); // Obtener la URL de la imagen del producto
    const item = { id, title, price, image }; // Crear un objeto con la información del producto
    carrito.push(item); // Agregar el producto al carrito
    mostrarCarrito(); // Actualizar la visualización del carrito
}

// Función para mostrar el contenido del carrito
function mostrarCarrito() {
    listaCarrito.innerHTML = ""; // Vaciar la lista de productos del carrito
    let subtotal = 0; // Inicializar el subtotal en cero
    carrito.forEach(item => { // Iterar sobre cada elemento del carrito
        const li = document.createElement('li'); // Crear un elemento de lista
        const img = document.createElement('img'); // Crear un elemento de imagen
        img.src = item.image; // Establecer la URL de la imagen
        li.appendChild(img); // Agregar la imagen al elemento de lista
        li.innerHTML += `<span>${item.title} - $${item.price}</span>`; // Agregar título y precio al elemento de lista
        listaCarrito.appendChild(li); // Agregar el elemento de lista al carrito
        subtotal += item.price; // Sumar el precio del producto al subtotal
    });
    const impuestos = subtotal * 0.12; // Calcular impuestos (IVA)
    const total = subtotal + impuestos; // Calcular total
    subtotalElemento.textContent = `Subtotal $${subtotal.toFixed(2)}`; // Actualizar elemento HTML con el subtotal
    impuestosElemento.textContent = `IVA 12% $${impuestos.toFixed(2)}`; // Actualizar elemento HTML con los impuestos
    totalElemento.textContent = `Total a Pagar: $${total.toFixed(2)}`; // Actualizar elemento HTML con el total
}

// Agregar un evento de clic al botón de carrito para mostrar/ocultar el carrito
botonCarrito.addEventListener('click', function() {
    console.log("Botón de carrito clicado");
    listaCarrito.classList.toggle('abierto'); // Alternar la clase 'abierto' en el elemento de lista del carrito
});

// Llamar a la función para obtener datos de la API al cargar la página
getData();
