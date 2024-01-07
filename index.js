// Definiendo las Propiedades
class Producto {
    constructor(codigo, imagen, tipo, marca, modelo, otro1, otro2, cantidad, precio,) {
        this.codigo = codigo;
        this.imagen = imagen;
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.otro1 = otro1;
        this.otro2 = otro2;
        this.cantidad = cantidad;
        this.precio = precio;
    }
}

// Neumaticos
const PROD1 = new Producto("50170-0", "./img/hankook K715.jpeg", "NEUMATICOS", "HANKOOK", "K715", "155/65R13", "OPTIMO", "4", 59890);
const PROD2 = new Producto("50174-3", "./img/hankook H724.jpeg", "NEUMATICOS", "HANKOOK", "H724", "185/65R14", "OPTIMO", "4", 59890);
const PROD3 = new Producto("50595-1", "./img/hankook H308.jpeg", "NEUMATICOS", "HANKOOK", "H308", "175/60R15", "KINERGY", "4", 49890);
// Baterias
const PROD4 = new Producto("09076-K", "./img/hankook MF54321.jpeg", "BATERIAS", "HANKOOK", "MF54321", "45AH", "450CCA", "4", 69890);
const PROD5 = new Producto("09030-1", "./img/hankook MF55457.jpeg", "BATERIAS", "HANKOOK", "MF55457", "55AH", "480CCA", "7", 79890);
const PROD6 = new Producto("09095-6", "./img/hankook MF47600.jpeg", "BATERIAS", "HANKOOK", "MF47600", "60AH", "600CCA", "3", 98980);
// Aceites
const PROD7 = new Producto("22212-7", "./img/shell 5w30 hx8.webp", "ACEITES", "SHELL", "HX8", "5W-30", "BENCINERO", "6", 47290);
const PROD8 = new Producto("22135-K", "./img/shell 15w40 hx5.webp", "ACEITES", "SHELL", "HX5", "15W-40", "BENCINERO", "6", 29690);
const PROD9 = new Producto("22013-2", "./img/10w-40 petroleo shell.jpeg", "ACEITES", "SHELL", "R5", "10W-40", "PETROLERO", "3", 35990);
// Filtros
const PROD10 = new Producto("25508-4", "./img/man c30171.jpeg", "FILTROS", "MANN", "C30171", "AIRE", "", "2", 9900);
const PROD11 = new Producto("25479-7", "./img/mann hu 718:5X.jpeg", "FILTROS", "MANN", "HU718/5X", "ELEMENTO", "", "2", 9700);
const PROD12 = new Producto("26007-K", "./img/mann w610:6.jpeg", "FILTROS", "MANN", "W610/6", "ACEITE", "", "2", 6280);
// Aromatizantes
const PROD13 = new Producto("42088-3", "./img/paloma parfum.png", "AROMATIZANTES", "PALOMA", "PARFUM", "VAINILLA", "", "20", 1800);
const PROD14 = new Producto("42055-7", "./img/paloma aqua balls.png", "AROMATIZANTES", "PALOMA", "WOODY", "FLORAL", "", "2", 2400);
const PROD15 = new Producto("42120-0", "./img/paloma happy bag.png", "AROMATIZANTES", "PALOMA", "HAPPY BAG", "SPORT", "", "10", 1890);

// Contenedor Productos
const PRODUCTOS_CONTENEDOR = document.getElementById("productosContenedor");
const PRODUCTOS = [PROD1, PROD2, PROD3, PROD4, PROD5, PROD6, PROD7, PROD8, PROD9, PROD10, PROD11, PROD12, PROD13, PROD14, PROD15];
// Filtros Nav
const BOTON_NAV = document.querySelectorAll(".dropdown-item");
const TITULO_PRINCIPAL = document.getElementById("tituloPrincipal");
// Botones
let botonesAgregar = document.querySelectorAll(".agregar");
// Carrito
const TOGGLE_CARRITO = document.getElementById('toggleCarrito');
const CARRITO = document.querySelector('.carrito');
const NUMERITO = document.querySelector("#numerito");
// Carrito de Compras
const PRODUCTOS_EN_CARRITO = [];
const CARRITO_TOTAL = document.getElementById("carritoTotal");

// Cargar Productos
function cargarProductos(productosElegidos) {
    PRODUCTOS_CONTENEDOR.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos productos
    productosElegidos.forEach(contenedor__box => {
        const ARTICLE = document.createElement("article");
        ARTICLE.className = "contenedor__box";
        ARTICLE.innerHTML = `
            <div class="box__foto">
                <img src="${contenedor__box.imagen}" alt= "autoshop,${contenedor__box.tipo},${contenedor__box.marca},${contenedor__box.modelo},${contenedor__box.otro1},${contenedor__box.otro2}" class="foto">
            </div>
            <div class="box__texto">
                <h4>Descripción: ${contenedor__box.marca}, ${contenedor__box.modelo}, ${contenedor__box.otro1}, ${contenedor__box.otro2}</h4>
                <h4>Precio: $${formatearPrecio(contenedor__box.precio)}</h4>
                <h4>Cantidad: ${contenedor__box.cantidad}</h4>
                <button class="agregar" id="${contenedor__box.codigo}">Agregar</button>
            </div>
        `;
        PRODUCTOS_CONTENEDOR.append(ARTICLE);
    }); actualizarBotonesAgregar()
} cargarProductos(PRODUCTOS);

// Para que el precio se vea con un punto
function formatearPrecio(precio) {
    const PRECIO_STRING = precio.toString(); // Convertir el precio a string
    const LONGITUD = PRECIO_STRING.length;
    if (LONGITUD <= 3) {
        return PRECIO_STRING; // Si el precio tiene 3 o menos dígitos, devuelve el precio sin modificar
    } else {
        const PARTE_ENTERA = PRECIO_STRING.slice(0, LONGITUD - 3); // Obtener la parte entera del precio
        const PARTE_DECIMAL = PRECIO_STRING.slice(LONGITUD - 3); // Obtener los últimos 3 dígitos como parte decimal
        return `${PARTE_ENTERA}.${PARTE_DECIMAL}`; // Devolver el precio formateado con un punto después de los primeros 3 dígitos
    }
}

// Nav filtrar
function capitalizarPrimeraLetra(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}
BOTON_NAV.forEach(boton => {
    boton.addEventListener("click", (e) => {
        if (e.currentTarget.id !== "TODOS") {
            const PRODUCTO_CATEGORIA = PRODUCTOS.find(contenedor__box => contenedor__box.tipo === e.currentTarget.id);
            TITULO_PRINCIPAL.innerText = capitalizarPrimeraLetra(PRODUCTO_CATEGORIA.tipo);

            const PRODUCTOS_FILTRADOS = PRODUCTOS.filter(contenedor__box => contenedor__box.tipo === e.currentTarget.id);
            cargarProductos(PRODUCTOS_FILTRADOS);
        } else {
            TITULO_PRINCIPAL.innerText = "Todos los Productos";
            cargarProductos(PRODUCTOS);
        }
    })
})

// barra de busqueda, no toma en cuenta acentos ni espacios en blanco
function removerAcentos(texto) { // Función para remover acentos y caracteres especiales
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
const BARRA_BUSQUEDA = document.getElementById("barraBusqueda");
BARRA_BUSQUEDA.addEventListener('input', function () {
    const TEXTO_BUSQUEDA = removerAcentos(BARRA_BUSQUEDA.value.trim()).toLowerCase();

    const PRODUCTOS_FILTRADOS = PRODUCTOS.filter(contenedor__box => {
        const TIPO_NORMALIZED = removerAcentos(contenedor__box.tipo);
        const MARCA_NORMALIZED = removerAcentos(contenedor__box.marca);
        const MODELO_NORMALIZED = removerAcentos(contenedor__box.modelo);
        const MEDIDA_NORMALIZED = removerAcentos(contenedor__box.otro1);
        const OTRO_NORMALIZED = removerAcentos(contenedor__box.otro2);

        return (TIPO_NORMALIZED.includes(TEXTO_BUSQUEDA) || MARCA_NORMALIZED.includes(TEXTO_BUSQUEDA) || MODELO_NORMALIZED.includes(TEXTO_BUSQUEDA) || MEDIDA_NORMALIZED.includes(TEXTO_BUSQUEDA) || OTRO_NORMALIZED.includes(TEXTO_BUSQUEDA));
    });

    if (PRODUCTOS_FILTRADOS.length > 0) {
        cargarProductos(PRODUCTOS_FILTRADOS);
        TITULO_PRINCIPAL.innerText = capitalizarPrimeraLetra(TEXTO_BUSQUEDA);
    } else {
        alert("No se encontraron resultados para esa búsqueda.");
        TITULO_PRINCIPAL.innerText = "Todos los Productos";
        cargarProductos(PRODUCTOS);
    }
});

// Carrito de compras para que aparezca y desaparezca
toggleCarrito.addEventListener('click', () => {
    CARRITO.classList.toggle('mostrar-carrito'); // Usa toggle para alternar la clase
});

// Botones Agregar
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
}

// Agregar al Carrito
function agregarAlCarrito(e) {
    const CODIGO_BOTON = e.currentTarget.id;
    const PRODUCTO_AGREGADO = PRODUCTOS.find(contenedor__box => contenedor__box.codigo === CODIGO_BOTON);

    if (PRODUCTOS_EN_CARRITO.some(contenedor__box => contenedor__box.codigo === CODIGO_BOTON)) {
        const INDEX = PRODUCTOS_EN_CARRITO.findIndex(contenedor__box => contenedor__box.codigo === CODIGO_BOTON);
        PRODUCTOS_EN_CARRITO[INDEX].cantidad++
    } else {
        PRODUCTO_AGREGADO.cantidad = 1;
        PRODUCTOS_EN_CARRITO.push(PRODUCTO_AGREGADO);
    }
    cargarCarrito(PRODUCTOS_EN_CARRITO);
    actualizarNumerito();
    localStorage.setItem("PRODUCTOS_EN_CARRITO", JSON.stringify(PRODUCTOS_EN_CARRITO)); // almacenar el carrito en local storage
}; 
document.addEventListener('DOMContentLoaded', () => { // para que no se vacie el carro cuando se refresca y se agrega un nuevo producto
    let productosGuardados = JSON.parse(localStorage.getItem("PRODUCTOS_EN_CARRITO")) || [];
    PRODUCTOS_EN_CARRITO.push(...productosGuardados);
    cargarCarrito(productosGuardados);
});

// Actualizar Numerito de Carrito
function actualizarNumerito() {
    let nuevoNumerito = PRODUCTOS_EN_CARRITO.reduce((acc, contenedor__box) => acc + contenedor__box.cantidad, 0);
    NUMERITO.innerText = nuevoNumerito;
    localStorage.setItem("nuevoNumerito", nuevoNumerito); // Guardar en localStorage
}
document.addEventListener('DOMContentLoaded', () => { // para que no se vacie el numerito cuando se refresca y se agrega un nuevo producto
    let nuevoNumeritoGuardado = localStorage.getItem("nuevoNumerito");
    if (nuevoNumeritoGuardado !== null) {
        NUMERITO.innerText = nuevoNumeritoGuardado;
    }
});
// cargar productos al carrito
function cargarCarrito(productosElegidos) {
    const CARRITO_CONTENEDOR = document.getElementById("carritoContenedor");

    CARRITO_CONTENEDOR.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos productos

    productosElegidos.forEach(contenedor__box => {
        const ARTICLE = document.createElement("article");
        ARTICLE.className = "contenedor__box";
        ARTICLE.innerHTML = `
            <div class="box__foto">
                <img src="${contenedor__box.imagen}" alt="autoshop, ${contenedor__box.tipo}, ${contenedor__box.marca}, ${contenedor__box.modelo}, ${contenedor__box.medida}, ${contenedor__box.otro}" class="foto">
            </div>
            <div class="box__texto">
                <h4>Descripción: ${contenedor__box.marca} ${contenedor__box.modelo} ${contenedor__box.medida} ${contenedor__box.otro}</h4>
                <h4>Precio: $${formatearPrecio(contenedor__box.precio)}</h4>
                <h4>Cantidad: ${contenedor__box.cantidad}</h4>
            </div>
            <div class="box__eliminar">
                <button class="eliminar" id="${contenedor__box.codigo}">Eliminar</button>
            </div>
        `;
        CARRITO_CONTENEDOR.appendChild(ARTICLE); // Agregar el elemento ARTICLE al contenedor
    });
}
const PRODUCTOS_GUARDADOS = JSON.parse(localStorage.getItem("PRODUCTOS_EN_CARRITO")) || []; // Llamar a cargarCarrito con los productos guardados en localStorage al iniciar
cargarCarrito(PRODUCTOS_GUARDADOS);

// Boton Eliminar del Carrito
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('eliminar')) {
        const CODIGO_BOTON = e.target.id;
        console.log("Código del botón:", CODIGO_BOTON);

        const INDEX = PRODUCTOS_EN_CARRITO.findIndex(contenedor__box => contenedor__box.codigo === CODIGO_BOTON);
        console.log("Índice del producto en el carrito:", INDEX);

        if (INDEX !== -1) {
            if (PRODUCTOS_EN_CARRITO[INDEX].cantidad > 1) {
                PRODUCTOS_EN_CARRITO[INDEX].cantidad--;
            } else {
                PRODUCTOS_EN_CARRITO.splice(INDEX, 1);
            }
        }

        cargarCarrito(PRODUCTOS_EN_CARRITO);
        actualizarNumerito();
        localStorage.setItem("PRODUCTOS_EN_CARRITO", JSON.stringify(PRODUCTOS_EN_CARRITO));
    }
});

// Suponiendo que PRODUCTOS_EN_CARRITO es un array de objetos con propiedades precio y cantidad
function calcularTotalCarrito() {
    let total = 0;

    // Recorre cada producto en el carrito
    for (let i = 0; i < PRODUCTOS_EN_CARRITO.length; i++) {
        const producto = PRODUCTOS_EN_CARRITO[i];
        total += producto.precio * producto.cantidad; // Multiplica precio por cantidad y suma al total
    }

    return total;
}

function mostrarTotalCarritoEnHTML() {
    const totalCarrito = calcularTotalCarrito();
    const elementoCarritoTotal = document.getElementById('carritoTotal');
    elementoCarritoTotal.innerText = `Total del carrito: $${totalCarrito.toFixed(2)}`; // Muestra el total en el elemento HTML
}

// Llamar a la función para mostrar el total del carrito
mostrarTotalCarritoEnHTML();




