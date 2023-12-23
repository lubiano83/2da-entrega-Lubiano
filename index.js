class Producto {
    constructor(codigo, imagen, tipo, marca, modelo, medida, descripcion, precio,) {
        this.codigo = codigo;
        this.imagen = imagen;
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.medida = medida;
        this.descripcion = descripcion;
        this.precio = precio;
    }
}

// Neumaticos
const PROD1 = new Producto("50170-0", "./img/hankook K715.jpeg","NEUMATICOS", "HANKOOK", "K715", "155/65R13", "R13", 59890);
const PROD2 = new Producto("50174-3", "./img/hankook H724.jpeg","NEUMATICOS", "HANKOOK", "H724", "185/65R14", "R14", 59890);
const PROD3 = new Producto("50595-1", "./img/hankook H308.jpeg","NEUMATICOS", "HANKOOK", "H308", "175/60R15", "R15", 49890);
// Baterias
const PROD4 = new Producto("09076-K", "./img/hankook MF54321.jpeg","BATERIAS", "HANKOOK", "MF", "54321", "45AH", 69890);
const PROD5 = new Producto("09030-1", "./img/hankook MF55457.jpeg","BATERIAS", "HANKOOK", "MF", "55457", "55AH", 79890);
const PROD6 = new Producto("09095-6", "./img/hankook MF47600.jpeg","BATERIAS", "HANKOOK", "MF", "47600", "60AH", 98980);
// Aceites
const PROD7 = new Producto("22212-7", "./img/shell 5w30 hx8.webp","ACEITES", "SHELL", "HX8", "5W-30", "4L", 47290);
const PROD8 = new Producto("22135-K", "./img/shell 15w40 hx5.webp","ACEITES", "SHELL", "HX5", "15W-40", "4L", 29690);
const PROD9 = new Producto("22013-2", "./img/10w-40 petroleo shell.jpeg","ACEITES", "SHELL", "R5", "10W-40", "4L", 35990);
// Filtros
const PROD10 = new Producto("25508-4", "./img/man c30171.jpeg","FILTROS", "MANN", "C", "30171", "AIRE", 9900);
const PROD11 = new Producto("25479-7", "./img/mann hu 718:5X.jpeg","FILTROS", "MANN", "HU", "718/5X", "ELEMENTO", 9700);
const PROD12 = new Producto("26007-K", "./img/mann w610:6.jpeg","FILTROS", "MANN", "W", "610/6", "ACEITE", 6280);
// Aromatizantes
const PROD13 = new Producto("42088-3", "./img/paloma parfum.png","AROMATIZANTES", "PALOMA", "PARFUM", "", "VAINILLA", 1800);
const PROD14 = new Producto("42055-7", "./img/paloma aqua balls.png","AROMATIZANTES", "PALOMA", "WOODY", "", "FLORAL", 2400);
const PROD15 = new Producto("42120-0", "./img/paloma happy bag.png","AROMATIZANTES", "PALOMA", "HAPPY BAG", "", "SPORT", 1890);

// Contenedor Productos
const PRODUCTOS_CONTENEDOR = document.getElementById("productosContenedor");
const ARRAY_PRODUCTOS = [PROD1, PROD2, PROD3, PROD4, PROD5, PROD6, PROD7, PROD8, PROD9, PROD10, PROD11, PROD12, PROD13, PROD14, PROD15];
// Filtros
const BOTON_NAV = document.querySelectorAll(".nav-link");
const TITULO_PRINCIPAL = document.getElementById("tituloPrincipal");
// Botones
const BTN = document.getElementById("btn"); // document. es un objeto y getElementById es un metodo.
// Carrito
const TOGGLE_CARRITO = document.getElementById('toggleCarrito');
const CARRITO = document.querySelector('.carrito');
// Barra Busqueda
const BOTON_BUSQUEDA = document.getElementById("botonBusqueda");

// Para que el precio se vea con un punto
function formatearPrecio(precio) {
    const precioString = precio.toString(); // Convertir el precio a string
    const longitud = precioString.length;

    if (longitud <= 3) {
        return precioString; // Si el precio tiene 3 o menos dígitos, devuelve el precio sin modificar
    } else {
        const parteEntera = precioString.slice(0, longitud - 3); // Obtener la parte entera del precio
        const parteDecimal = precioString.slice(longitud - 3); // Obtener los últimos 3 dígitos como parte decimal
        return `${parteEntera}.${parteDecimal}`; // Devolver el precio formateado con un punto después de los primeros 3 dígitos
    }
}

// Cargar Productos
function cargarProductos (productosElegidos){

    PRODUCTOS_CONTENEDOR.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevos productos

    productosElegidos.forEach(contenedor__box => {
        const ARTICLE = document.createElement("article");
        ARTICLE.className = "contenedor__box";
        ARTICLE.innerHTML = `
            <div class="box__foto">
                <img src="${contenedor__box.imagen}" alt="${contenedor__box.tipo},${contenedor__box.marca},${contenedor__box.modelo},${contenedor__box.medida},${contenedor__box.descripcion}" class="foto">
            </div>
            <div class="box__texto">
                <h4>Marca: ${contenedor__box.marca}</h4>
                <h4>Modelo: ${contenedor__box.modelo}</h4>
                <h4>Medida: ${contenedor__box.medida}</h4>
                <h4>Descripción: ${contenedor__box.descripcion}</h4>
                <h4>Precio: $${formatearPrecio(contenedor__box.precio)}</h4>
                <button class="agregar" id="${contenedor__box.codigo}">Agregar</button>
            </div>
        `;
        PRODUCTOS_CONTENEDOR.append(ARTICLE);
    })
    
} cargarProductos(ARRAY_PRODUCTOS);

// Nav filtrar
function capitalizarPrimeraLetra(texto) {
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

BOTON_NAV.forEach(boton => {

    boton.addEventListener("click", (e) => {
        if (e.currentTarget.id !== "TODOS") {
            const PRODUCTO_CATEGORIA = ARRAY_PRODUCTOS.find(contenedor__box => contenedor__box.tipo === e.currentTarget.id);
            TITULO_PRINCIPAL.innerText = capitalizarPrimeraLetra(PRODUCTO_CATEGORIA.tipo);
    
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

// para que el navbar se cierre al apretar alguna opcion
function cerrarNavbar() {
    const navbar = document.querySelector('.navbar-collapse');
    if (navbar.classList.contains('show')) {
      navbar.classList.remove('show');
    }
}
function toggleNavbar() {
    const navbar = document.querySelector('.navbar-collapse');
    navbar.classList.toggle('show');
}

// Boton filtrar
BTN.addEventListener("click", function() {
    const FILTRO_TIPO = prompt("Ingresa la categoria (Baterias, Neumaticos, Aceites, Filtros u otra existente):").toUpperCase();
     
    if (FILTRO_TIPO && (FILTRO_TIPO === "NEUMATICOS" || FILTRO_TIPO === "BATERIAS" || FILTRO_TIPO === "ACEITES" || FILTRO_TIPO === "FILTROS" || FILTRO_TIPO === "AROMATIZANTES")) {
        
        const PRODUCTOS_FILTRADOS = ARRAY_PRODUCTOS.filter(contenedor__box => contenedor__box.tipo === FILTRO_TIPO);
        cargarProductos(PRODUCTOS_FILTRADOS);
        TITULO_PRINCIPAL.innerText = capitalizarPrimeraLetra(FILTRO_TIPO);

    } else if (FILTRO_TIPO && (FILTRO_TIPO === "HANKOOK" || FILTRO_TIPO === "MANN" || FILTRO_TIPO === "SHELL" || FILTRO_TIPO === "PALOMA")) {
        
        const PRODUCTOS_FILTRADOS = ARRAY_PRODUCTOS.filter(contenedor__box => contenedor__box.marca === FILTRO_TIPO);
        cargarProductos(PRODUCTOS_FILTRADOS);
        TITULO_PRINCIPAL.innerText = capitalizarPrimeraLetra(FILTRO_TIPO);

    } else if (FILTRO_TIPO && (FILTRO_TIPO === "K715" || FILTRO_TIPO === "H724" || FILTRO_TIPO === "H308" || FILTRO_TIPO === "MF" || FILTRO_TIPO === "MF" || FILTRO_TIPO === "MF" || FILTRO_TIPO === "HX8" || FILTRO_TIPO === "HX5" || FILTRO_TIPO === "R5" || FILTRO_TIPO === "C" || FILTRO_TIPO === "HU" || FILTRO_TIPO === "W" || FILTRO_TIPO === "PARFUM" || FILTRO_TIPO === "HAPPY BAG" || FILTRO_TIPO === "WOODY")) {
        
        const PRODUCTOS_FILTRADOS = ARRAY_PRODUCTOS.filter(contenedor__box => contenedor__box.modelo === FILTRO_TIPO);
        cargarProductos(PRODUCTOS_FILTRADOS);
        TITULO_PRINCIPAL.innerText = capitalizarPrimeraLetra(FILTRO_TIPO);
    
    } else if (FILTRO_TIPO && (FILTRO_TIPO === "155/65R13" || FILTRO_TIPO === "185/65R14" || FILTRO_TIPO === "175/60R15" || FILTRO_TIPO === "54321" || FILTRO_TIPO === "55457" || FILTRO_TIPO === "47600" || FILTRO_TIPO === "5W-30" || FILTRO_TIPO === "15W-40" || FILTRO_TIPO === "10W-40" || FILTRO_TIPO === "30171" || FILTRO_TIPO === "718/5X" || FILTRO_TIPO === "610/6" || FILTRO_TIPO === "" || FILTRO_TIPO === "" || FILTRO_TIPO === "")) {
        
        const PRODUCTOS_FILTRADOS = ARRAY_PRODUCTOS.filter(contenedor__box => contenedor__box.medida === FILTRO_TIPO);
        cargarProductos(PRODUCTOS_FILTRADOS);
        TITULO_PRINCIPAL.innerText = capitalizarPrimeraLetra(FILTRO_TIPO);
    
    } else if (FILTRO_TIPO && (FILTRO_TIPO === "R13" || FILTRO_TIPO === "R14" || FILTRO_TIPO === "R15" || FILTRO_TIPO === "45AH" || FILTRO_TIPO === "55AH" || FILTRO_TIPO === "60AH" || FILTRO_TIPO === "4L" || FILTRO_TIPO === "4L" || FILTRO_TIPO === "4L" || FILTRO_TIPO === "AIRE" || FILTRO_TIPO === "ELEMENTO" || FILTRO_TIPO === "ACEITE" || FILTRO_TIPO === "VAINILLA" || FILTRO_TIPO === "FLORAL" || FILTRO_TIPO === "SPORT")) {
        
        const PRODUCTOS_FILTRADOS = ARRAY_PRODUCTOS.filter(contenedor__box => contenedor__box.descripcion === FILTRO_TIPO);
        cargarProductos(PRODUCTOS_FILTRADOS);
        TITULO_PRINCIPAL.innerText = capitalizarPrimeraLetra(FILTRO_TIPO);
    
    } else {

        alert("Por favor, ingresa una categoria válida (Baterias, Neumaticos, Filtros, Aceites u otra existente).");
        TITULO_PRINCIPAL.innerText = "Todos los Productos";
        cargarProductos(ARRAY_PRODUCTOS);
    }
})

// barra de busqueda, no toma en cuenta acentos ni espacios en blanco
// Función para remover acentos y caracteres especiales
function removerAcentos(texto) {
    return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

BOTON_BUSQUEDA.addEventListener('click', function(e) {

    const BARRA_BUSQUEDA = document.getElementById("barraBusqueda");
    const TEXTO_BUSQUEDA = removerAcentos(BARRA_BUSQUEDA.value.trim()); // Normalizar y limpiar la entrada del usuario
    e.preventDefault();

    // Normalizar y limpiar cada propiedad relevante en ARRAY_PRODUCTOS para comparar
    const PRODUCTOS_FILTRADOS = ARRAY_PRODUCTOS.filter(contenedor__box => {
        const TIPO_NORMALIZED = removerAcentos(contenedor__box.tipo);
        const MARCA_NORMALIZED = removerAcentos(contenedor__box.marca);
        const MODELO_NORMALIZED = removerAcentos(contenedor__box.modelo);
        const MEDIDA_NORMALIZED = removerAcentos(contenedor__box.medida);
        const DESCRIPCION_NORMALIZED = removerAcentos(contenedor__box.descripcion);

        return (TIPO_NORMALIZED.includes(TEXTO_BUSQUEDA) || MARCA_NORMALIZED.includes(TEXTO_BUSQUEDA) || MODELO_NORMALIZED.includes(TEXTO_BUSQUEDA) || MEDIDA_NORMALIZED.includes(TEXTO_BUSQUEDA) || DESCRIPCION_NORMALIZED.includes(TEXTO_BUSQUEDA));
    });

    if (PRODUCTOS_FILTRADOS.length > 0) {
        cargarProductos(PRODUCTOS_FILTRADOS);
        TITULO_PRINCIPAL.innerText = capitalizarPrimeraLetra(TEXTO_BUSQUEDA);
    } else {
        alert("No se encontraron resultados para esa búsqueda.");
        TITULO_PRINCIPAL.innerText = "Todos los Productos";
        cargarProductos(ARRAY_PRODUCTOS);
    }

    BARRA_BUSQUEDA.value = ""; // Esto borrará el texto de la barra de búsqueda
});
