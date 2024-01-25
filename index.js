// Variables
const PRODUCTOS = [];
let botonesAgregar = document.querySelectorAll(`.agregar`);
let numerito = document.getElementById(`numerito`);
let botonesEliminar = document.querySelectorAll(`.eliminar`);
let  productoEnCarrito = JSON.parse(localStorage.getItem(`productoEnCarrito`)) || []; // Cargar productos del carrito desde localStorage al inicio
const TITULO_PRINCIPAL = document.getElementById(`tituloPrincipal`);

// cargar productos en array desde productos.json
async function cargarProductoEnArray() {
    const archivoJson = './productos.json';
    try {
        const response = await fetch(archivoJson);
        if (!response.ok) {
            throw new Error(`Error de red: ${response.status}`);
        }
        const datos = await response.json();
        PRODUCTOS.length = 0;
        PRODUCTOS.push(...datos);
        cargarProductos(PRODUCTOS); // Llama a cargarProductos después de cargar los productos
    } catch (error) {
        console.error('Error al cargar productos desde el archivo JSON:', error);
    }
}

// verificar que cargarProductosEnArray se llame antes cualquier otra operacion
document.addEventListener('DOMContentLoaded', function () { 
    cargarProductoEnArray(); // Otras operaciones que dependen de la carga de productos
});

// Cargar Productos en Pagina
function cargarProductos(productoSeleccionado) {
    const PRODUCTOS_CONTENEDOR = document.getElementById(`productosContenedor`);
    PRODUCTOS_CONTENEDOR.innerHTML = ``; // limpiar el contenedor antes de agregar productos
    productoSeleccionado.forEach(producto => {
        const ARTICLE = document.createElement(`article`);
        ARTICLE.className = `producto`;
        ARTICLE.innerHTML = `
            <div class="producto__foto">
                <img src="${producto.foto}" alt="autoshop,${producto.tipo},${producto.marca},${producto.modelo},${producto.otro1},${producto.otro2}" class="foto">
            </div>
            <div class="producto__texto">
                <h4>Descripción: ${producto.marca}, ${producto.modelo}, ${producto.otro1}, ${producto.otro2}</h4>
                <h4>Precio: $${formatearPrecio(producto.precio)}</h4>
                <h4>Cantidad: ${producto.cantidad}</h4>
                <button class="agregar elemento boton" id="${producto.codigo}">Agregar</button>
            </div>
        `;
        PRODUCTOS_CONTENEDOR.appendChild(ARTICLE);
    }); actualizarBotonesAgregar();
}; cargarProductos(PRODUCTOS); // Suponiendo que PRODUCTOS es un array de objetos con los datos de los productos

// Precio Speradado con un Punto
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

// Primera Letra en Mayusculas
function capitalizarPrimeraLetra(texto) { 
    return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// Dropdown Selector
const DROPDOWN = document.querySelectorAll(`.dropdown-item`);
DROPDOWN.forEach(boton => {
    boton.addEventListener(`click`, (e) => {
        if (e.currentTarget.id !== `TODOS`) {
            const PRODUCTO_CATEGORIA = PRODUCTOS.find(producto => producto.tipo === e.currentTarget.id);
            TITULO_PRINCIPAL.innerText = capitalizarPrimeraLetra(PRODUCTO_CATEGORIA.tipo);
            const PRODUCTOS_FILTRADOS = PRODUCTOS.filter(producto => producto.tipo === e.currentTarget.id);
            cargarProductos(PRODUCTOS_FILTRADOS);
        } else {
            TITULO_PRINCIPAL.innerText = `Todos los Productos`;
            cargarProductos(PRODUCTOS);
        }
    })
})

// No Toma Acentos ni Espacios en Blanco
function removerAcentos(texto) {
    return texto.normalize(`NFD`).replace(/[\u0300-\u036f]/g, ``).toLowerCase();
}

// Barra de Busqueda
const BARRA_BUSQUEDA = document.getElementById(`barraBusqueda`);
BARRA_BUSQUEDA.addEventListener(`input`, function () {
    const TEXTO_BUSQUEDA = removerAcentos(BARRA_BUSQUEDA.value.trim()).toLowerCase();

    const PRODUCTOS_FILTRADOS = PRODUCTOS.filter(producto => {
        const TIPO_NORMALIZED = removerAcentos(producto.tipo);
        const MARCA_NORMALIZED = removerAcentos(producto.marca);
        const MODELO_NORMALIZED = removerAcentos(producto.modelo);
        const OTRO1_NORMALIZED = removerAcentos(producto.otro1);
        const OTRO2_NORMALIZED = removerAcentos(producto.otro2);

        return (TIPO_NORMALIZED.includes(TEXTO_BUSQUEDA) || MARCA_NORMALIZED.includes(TEXTO_BUSQUEDA) || MODELO_NORMALIZED.includes(TEXTO_BUSQUEDA) || OTRO1_NORMALIZED.includes(TEXTO_BUSQUEDA) || OTRO2_NORMALIZED.includes(TEXTO_BUSQUEDA));
    });

    if (PRODUCTOS_FILTRADOS.length > 0) {
        cargarProductos(PRODUCTOS_FILTRADOS);
        TITULO_PRINCIPAL.innerText = capitalizarPrimeraLetra(TEXTO_BUSQUEDA);
    } else {
        setTimeout(() => {
            Swal.fire({
                title: "¡Error!",
                text: "No se encontraron resultados para esa búsqueda.",
                icon: "error",
                confirmButtonColor: "red"
            });
        },300);
        TITULO_PRINCIPAL.innerText = `Todos los Productos`;
        cargarProductos(PRODUCTOS);
    }
});

// Carrito Aparece y Desaparece
const CARRITO = document.querySelector(`.carrito`);
toggleCarrito.addEventListener(`click`, () => {
    CARRITO.classList.toggle(`mostrar-carrito`); // Usa toggle para alternar la clase
});

// Funcion para Agregar al LocalStorage
function agregarLocalStorage(nombre, valor) {
    localStorage.setItem(nombre, JSON.stringify(valor));
}

// Botones Agregar en Productos
function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(`.agregar`);
    botonesAgregar.forEach(boton => {
        boton.addEventListener(`click`, agregarAlCarrito);
    })
}

// Agregar al Carrito
function agregarAlCarrito(e) {
    const CODIGO_BOTON = e.currentTarget.id;
    const PRODUCTO_AGREGADO = PRODUCTOS.find(producto => producto.codigo === CODIGO_BOTON);
    const EN_CARRITO = productoEnCarrito.find(producto => producto.codigo === CODIGO_BOTON);
    if (EN_CARRITO) {
        if (EN_CARRITO.cantidad < PRODUCTO_AGREGADO.cantidad) {
            EN_CARRITO.cantidad++;
        } else {
            setTimeout(() => {
                Swal.fire({
                    title: "¡Atención!",
                    text: "No hay suficiente stock disponible",
                    icon: "warning",
                    confirmButtonColor: `darkgoldenrod`
                });
            }, 300);
        }
    } else {
        if (PRODUCTO_AGREGADO.cantidad > 0) {
            const NUEVO_PRODUCTO = { ...PRODUCTO_AGREGADO, cantidad: 1 };
            productoEnCarrito.push(NUEVO_PRODUCTO);
        } else {
            setTimeout(() => {
                Swal.fire({
                    title: "¡Atención!",
                    text: "No hay suficiente stock disponible",
                    icon: "warning",
                    confirmButtonColor: `darkgoldenrod`
                });
            }, 300);
        }
    }
    actualizarNumerito();
    agregarLocalStorage(`productoEnCarrito`, productoEnCarrito);
    cargarCarrito(productoEnCarrito);
    mostrarPrecioTotalEnCarrito();
}

// Actualizar Numerito Carrito
function actualizarNumerito() {
    let nuevoNumerito = productoEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
    agregarLocalStorage(`nuevoNumerito`, nuevoNumerito);
}
window.addEventListener(`load`, () => { // Para que no se borre el numerito al refrescar la pagina
    const numeritoGuardado = localStorage.getItem(`nuevoNumerito`);
    if (numeritoGuardado) {
        numerito.innerText = numeritoGuardado;
    }
});

// Cargar Productos al Carrito
function cargarCarrito(productoSeleccionado) {
    const CARRITO_CONTENEDOR = document.getElementById(`carritoContenedor`);
    CARRITO_CONTENEDOR.innerHTML = ``; // Limpiar el contenedor antes de agregar nuevos productos
    productoSeleccionado.forEach(producto => {
        const ARTICLE = document.createElement(`article`);
        ARTICLE.className = `producto`;
        ARTICLE.innerHTML = `
            <div class="producto__foto">
                <img src="${producto.foto}" alt="autoshop, ${producto.tipo}, ${producto.marca}, ${producto.modelo}, ${producto.otro1}, ${producto.otro2}" class="foto">
            </div>
            <div class="producto__texto">
                <h4>Descripción: ${producto.marca} ${producto.modelo} ${producto.otro1} ${producto.otro2}</h4>
                <h4>Precio: $${formatearPrecio(producto.precio)}</h4>
                <h4>Cantidad: ${producto.cantidad}</h4>
                <button class="eliminar elemento boton" id="${producto.codigo}">Eliminar</button>
            </div>
        `;
        CARRITO_CONTENEDOR.appendChild(ARTICLE); // Agregar el elemento ARTICLE al contenedor
    }); actualizarBotonesEliminar(); // Actualizar eventos de los botones eliminar
}
const PRODUCTOS_GUARDADOS = JSON.parse(localStorage.getItem(`productoEnCarrito`)) || []; // Llamar a cargarCarrito con los productos guardados en localStorage al iniciar
cargarCarrito(PRODUCTOS_GUARDADOS);

// Botones Eliminar
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(`.eliminar`);
    botonesEliminar.forEach(boton => {
        boton.addEventListener(`click`, eliminarDelCarrito);
    })
}

// Eliminar Productos del Carrito
function eliminarDelCarrito(e) {
    const CODIGO_BOTON = e.currentTarget.id;
    const INDEX = productoEnCarrito.findIndex(producto => producto.codigo === CODIGO_BOTON);
    if (INDEX !== -1) {
        if (productoEnCarrito[INDEX].cantidad > 1) {
            productoEnCarrito[INDEX].cantidad--;
        } else {
            productoEnCarrito.splice(INDEX, 1);
            setTimeout(() => {
                Swal.fire({
                    title: "¡Atención!",
                    text: "Producto eliminado del carrito.",
                    icon: "warning",
                    confirmButtonColor: `darkgoldenrod`
                });
            },300);
        }
    }
    cargarCarrito(productoEnCarrito);
    actualizarNumerito();
    agregarLocalStorage(`productoEnCarrito`, productoEnCarrito);
    mostrarPrecioTotalEnCarrito();
}

// Sacar Precio Total del Carrito
function sacarPrecioTotalCarrito() {
    let precioTotal = 0;
    for (const PRODUCTO of productoEnCarrito) { // Itera sobre los productos en el carrito y suma el precio total
        precioTotal += PRODUCTO.precio * PRODUCTO.cantidad;
    }; return precioTotal;
}

// Mostrar el Precio Total en Carrito
function mostrarPrecioTotalEnCarrito() {
    const PRECIO_TOTAL = sacarPrecioTotalCarrito();
    let precioTotalElement = document.getElementById(`carritoTotal`); // Reemplaza 'carritoTotal' con el ID del elemento donde deseas mostrar el precio
    if (precioTotalElement) {
        precioTotalElement.innerText = `$${formatearPrecio(PRECIO_TOTAL)}`; // Muestra el precio total formateado como texto en el elemento
    }
}; mostrarPrecioTotalEnCarrito(); // Llama a esta función para mostrar el precio total del carrito en el DOM

// Boton Pagar en Carrito
function verificarProductosEnCarrito() {
    if (productoEnCarrito.length > 0) {
        setTimeout(() => {
            Swal.fire({
                title: "¡Compra Realizada!",
                text: "Muchas gracias por confiar en nosotros...",
                icon: "success",
                confirmButtonColor: `green`
            });
        }, 300);
        productoEnCarrito.splice(0, productoEnCarrito.length); // Vaciar el carrito al confirmar la compra
    }
    cargarCarrito(productoEnCarrito);
    actualizarNumerito();
    agregarLocalStorage(`productoEnCarrito`, productoEnCarrito);
    mostrarPrecioTotalEnCarrito();
}
const PAGAR_CARRITO = document.getElementById(`pagarCarrito`);
PAGAR_CARRITO.onclick = verificarProductosEnCarrito;
