class Producto {
    constructor(codigo, imagen, tipo, marca, modelo, medida, precio) {
        this.codigo = codigo;
        this.imagen = imagen;
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.medida = medida;
        this.precio = precio;
    }
}

// Neumaticos
const PROD1 = new Producto("50170-0", "./img/hankook K715.jpeg","NEUMATICOS", "HANKOOK", "K715", "155/65R13", 59890);
const PROD2 = new Producto("50174-3", "./img/hankook H724.jpeg","NEUMATICOS", "HANKOOK", "H724", "185/65R14", 59890);
const PROD3 = new Producto("50595-1", "./img/hankook H308.jpeg","NEUMATICOS", "HANKOOK", "H308", "175/60R15", 49890);
// Baterias
const PROD4 = new Producto("09076-K", "./img/hankook MF54321.jpeg","BATERIAS", "HANKOOK", "MF54321", "45AH", 69890);
const PROD5 = new Producto("09030-1", "./img/hankook MF55457.jpeg","BATERIAS", "HANKOOK", "MF55457", "55AH", 79890);
const PROD6 = new Producto("09095-6", "./img/hankook MF47600.jpeg","BATERIAS", "HANKOOK", "MF47600", "60AH", 98980);
// Aceites
const PROD7 = new Producto("22212-7", "./img/shell 5w30 hx8.webp","ACEITES", "SHELL", "5W-30", "HX8", 47290);
const PROD8 = new Producto("22135-K", "./img/shell 15w40 hx5.webp","ACEITES", "SHELL", "15W-40", "HX5", 29690);
const PROD9 = new Producto("22013-2", "./img/10w-40 petroleo shell.jpeg","ACEITES", "SHELL", "10W-40", "R5", 35990);
// Filtros
const PROD10 = new Producto("25508-4", "./img/man c30171.jpeg","FILTROS", "MANN", "C30171", "AIRE", 9900);
const PROD11 = new Producto("25479-7", "./img/mann hu 718:5X.jpeg","FILTROS", "MANN", "HU718/5X", "ELEMENTO", 9700);
const PROD12 = new Producto("26007-K", "./img/mann w610:6.jpeg","FILTROS", "MANN", "W610/6", "ACEITE", 6280);

// Contenedor Productos
const PRODUCTOS_CONTENEDOR = document.getElementById("productosContenedor");
const ARRAY_PRODUCTOS = [PROD1, PROD2, PROD3, PROD4, PROD5, PROD6, PROD7, PROD8, PROD9, PROD10, PROD11, PROD12];
// Filtros
const BOTON_NAV = document.querySelectorAll(".nav-link");
const TITULO_PRINCIPAL = document.getElementById("tituloPrincipal");
// Botones
const BTN = document.getElementById("btn"); // document. es un objeto y getElementById es un metodo.
// Carrito
const TOGGLE_CARRITO = document.getElementById('toggleCarrito');
const CARRITO = document.querySelector('.carrito');

// Cargar Productos
function cargarProductos (productosElegidos){

    PRODUCTOS_CONTENEDOR.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos productos

    productosElegidos.forEach(contenedor__box => {
        const ARTICLE = document.createElement("article");
        ARTICLE.className = "contenedor__box";
        ARTICLE.innerHTML = `
            <div class="box__foto">
                <img src="${contenedor__box.imagen}" alt="${contenedor__box.tipo},${contenedor__box.marca},${contenedor__box.modelo},${contenedor__box.medida}" class="foto">
            </div>
            <div class="box__texto">
                <h4>Marca: ${contenedor__box.marca}</h4>
                <h4>Modelo: ${contenedor__box.modelo}</h4>
                <h4>Medida: ${contenedor__box.medida}</h4>
                <h4>Precio: $${contenedor__box.precio}</h4>
                <button class="agregar" id="${contenedor__box.codigo}">Agregar</button>
            </div>
        `;
        PRODUCTOS_CONTENEDOR.append(ARTICLE);
    })
    
} cargarProductos(ARRAY_PRODUCTOS);

// Nav filtrar
BOTON_NAV.forEach(boton => {

    boton.addEventListener("click", (e) => {

        if(e.currentTarget.id != "TODOS") {
            const PRODUCTO_CATEGORIA = ARRAY_PRODUCTOS.find(contenedor__box => contenedor__box.tipo === e.currentTarget.id);
            TITULO_PRINCIPAL.innerText = PRODUCTO_CATEGORIA.tipo;

            const PRODUCTOS_FILTRADOS = ARRAY_PRODUCTOS.filter(contenedor__box => contenedor__box.tipo === e.currentTarget.id);
            cargarProductos(PRODUCTOS_FILTRADOS);
        } else {
            TITULO_PRINCIPAL.innerText = "Todos los Productos";
            cargarProductos(ARRAY_PRODUCTOS);
        }
    })
})

// Carrito de compras para que aparezca y desaparezca
toggleCarrito.addEventListener('click', () => {
    CARRITO.classList.toggle('mostrar-carrito'); // Usa toggle para alternar la clase
});

// Boton filtrar
BTN.addEventListener("click", function() {
    const FILTRO_TIPO = prompt("Ingresa el tipo de producto (Baterias, Neumaticos, Aceites o Filtros):").toUpperCase();

    if (FILTRO_TIPO && (FILTRO_TIPO === "BATERIAS" || FILTRO_TIPO === "NEUMATICOS" || FILTRO_TIPO === "ACEITES" || FILTRO_TIPO === "FILTROS")) {

        const PRODUCTOS_FILTRADOS = ARRAY_PRODUCTOS.filter(contenedor__box => contenedor__box.tipo === FILTRO_TIPO);
        cargarProductos(PRODUCTOS_FILTRADOS);
        TITULO_PRINCIPAL.innerText = FILTRO_TIPO;
        
    } else if (FILTRO_TIPO && (FILTRO_TIPO === "HANKOOK" || FILTRO_TIPO === "MANN" || FILTRO_TIPO === "SHELL")) {
        
        const PRODUCTOS_FILTRADOS = ARRAY_PRODUCTOS.filter(contenedor__box => contenedor__box.marca === FILTRO_TIPO);
        cargarProductos(PRODUCTOS_FILTRADOS);
        TITULO_PRINCIPAL.innerText = FILTRO_TIPO;

    } else if (FILTRO_TIPO && (FILTRO_TIPO === "K715" || FILTRO_TIPO === "H724" || FILTRO_TIPO === "H308" || FILTRO_TIPO === "MF54321" || FILTRO_TIPO === "MF55457" || FILTRO_TIPO === "MF47600" || FILTRO_TIPO === "5W-30" || FILTRO_TIPO === "15W-40" || FILTRO_TIPO === "10W-40" || FILTRO_TIPO === "C30171" || FILTRO_TIPO === "HU718/5X" || FILTRO_TIPO === "W610/6")) {
        
        const PRODUCTOS_FILTRADOS = ARRAY_PRODUCTOS.filter(contenedor__box => contenedor__box.modelo === FILTRO_TIPO);
        cargarProductos(PRODUCTOS_FILTRADOS);
        TITULO_PRINCIPAL.innerText = FILTRO_TIPO;
    
    } else if (FILTRO_TIPO && (FILTRO_TIPO === "155/65R13" || FILTRO_TIPO === "185/65R14" || FILTRO_TIPO === "175/60R15" || FILTRO_TIPO === "45AH" || FILTRO_TIPO === "55AH" || FILTRO_TIPO === "60AH" || FILTRO_TIPO === "HX8" || FILTRO_TIPO === "HX5" || FILTRO_TIPO === "R5" || FILTRO_TIPO === "AIRE" || FILTRO_TIPO === "ELEMENTO" || FILTRO_TIPO === "ACEITE")) {
        
        const PRODUCTOS_FILTRADOS = ARRAY_PRODUCTOS.filter(contenedor__box => contenedor__box.medida === FILTRO_TIPO);
        cargarProductos(PRODUCTOS_FILTRADOS);
        TITULO_PRINCIPAL.innerText = FILTRO_TIPO;
    
    } else {

        alert("Por favor, ingresa un tipo válido (Baterias o Neumaticos).");
        TITULO_PRINCIPAL.innerText = "Todos los Productos";
        cargarProductos(ARRAY_PRODUCTOS);
    }
})