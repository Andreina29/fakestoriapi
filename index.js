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

    // Verificar si el producto ya está en el carrito
    const index = carrito.findIndex(item => item.id === id);
    if (index !== -1) {
        alert("Este producto ya está añadido al carrito."); // Mostrar mensaje de producto ya añadido
    } else {
        const cantidadSeleccionada = parseInt(prompt(`¿Cuántos ${title} quieres agregar?`, "1")); // Solicitar la cantidad al usuario
        if (!isNaN(cantidadSeleccionada) && cantidadSeleccionada > 0) {
            const item = { id, title, price, image, quantity: cantidadSeleccionada }; // Crear un objeto con la información del producto y su cantidad
            carrito.push(item); // Agregar el producto al carrito
            mostrarCarrito(); // Actualizar la visualización del carrito
            alert(`Se han agregado ${cantidadSeleccionada} ${title}(s) al carrito.`);
        } else {
            alert("Por favor, ingresa una cantidad válida.");
        }
    }
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
        const cantidad = item.quantity; // Obtener la cantidad del producto
        const precioTotalProducto = item.price * cantidad; // Calcular el precio total del producto (precio x cantidad)
        li.innerHTML += `<span>${item.title} - $${precioTotalProducto.toFixed(2)}</span>`; // Agregar título y precio al elemento de lista
        
        // Generar HTML para las opciones de cantidad
        let optionsHTML = "";
        for (let i = 1; i <= 10; i++) {
            optionsHTML += `<option value="${i}" ${i === cantidad ? 'selected' : ''}>${i}</option>`;
        }
        
        li.innerHTML += `<span>Cantidad:
                            <select class="cantidad-seleccionada" data-id="${item.id}">
                                ${optionsHTML}
                            </select>
                        </span>`; // Agregar la lista desplegable de cantidad al elemento de lista
        const eliminarBtn = document.createElement('button'); // Crear un botón de eliminar
        eliminarBtn.classList.add('eliminar-producto'); // Agregar clase al botón de eliminar
        eliminarBtn.setAttribute('data-id', item.id); // Establecer el ID del producto como atributo de datos
        eliminarBtn.textContent = 'Eliminar'; // Establecer texto del botón
        li.appendChild(eliminarBtn); // Agregar el botón de eliminar al elemento de lista
        listaCarrito.appendChild(li); // Agregar el elemento de lista al carrito
        subtotal += precioTotalProducto; // Sumar el precio total del producto al subtotal
        
        // Agregar evento de clic para eliminar el producto del carrito
        eliminarBtn.addEventListener('click', function() {
            const id = this.getAttribute('data-id'); // Obtener el ID del producto a eliminar
            carrito = carrito.filter(item => item.id !== id); // Filtrar el carrito para eliminar el producto con el ID correspondiente
            mostrarCarrito(); // Volver a mostrar el carrito actualizado
        });

        // Agregar evento de cambio para actualizar la cantidad cuando se cambia la lista desplegable
        const selectCantidad = li.querySelector('.cantidad-seleccionada');
        selectCantidad.addEventListener('change', function() {
            const id = this.getAttribute('data-id'); // Obtener el ID del producto
            const newQuantity = parseInt(this.value); // Obtener la nueva cantidad seleccionada
            const index = carrito.findIndex(item => item.id === id); // Encontrar el índice del producto en el carrito
            carrito[index].quantity = newQuantity; // Actualizar la cantidad del producto en el carrito
            mostrarCarrito(); // Volver a mostrar el carrito actualizado
        });
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
    document.getElementById('carrito').classList.toggle('abierto'); // Alternar la clase 'abierto' en el carrito
    document.body.classList.toggle('bloquear-scroll');
});

// Llamar a la función para obtener datos de la API al cargar la página
getData();
