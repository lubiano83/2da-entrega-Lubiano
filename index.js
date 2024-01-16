// Agregar Productos al Array Directamente
function cargarProductoEnArray(producto) {
    class Producto { // Definiendo Producto
        constructor(codigo, foto,  tipo, marca, modelo, otro1, otro2, cantidad, precio) {
            this.codigo = codigo;
            this.foto = foto;
            this.tipo = tipo;
            this.marca = marca;
            this.modelo = modelo;
            this.otro1 = otro1;
            this.otro2 = otro2;
            this.cantidad = cantidad;
            this.precio = precio;
        }
    }
    const PRODUCTO = [ // Distintos Productos
        // Neumaticos
        new Producto(`50170-0`, `./img/hankook K715.jpeg`, `NEUMATICOS`, `HANKOOK`, `K715`, `155/65R13`, `OPTIMO`, `4`, 59890),
        new Producto(`50174-3`, `./img/hankook H724.jpeg`, `NEUMATICOS`, `HANKOOK`, `H724`, `185/65R14`, `OPTIMO`, `4`, 59890),
        new Producto(`50595-1`, `./img/hankook H308.jpeg`, `NEUMATICOS`, `HANKOOK`, `H308`, `175/60R15`, `KINERGY`, `4`, 49890),
        // Baterias
        new Producto(`09076-K`, `./img/hankook MF54321.jpeg`, `BATERIAS`, `HANKOOK`, `MF54321`, `45AH`, `450CCA`, `4`, 69890),
        new Producto(`09030-1`, `./img/hankook MF55457.jpeg`, `BATERIAS`, `HANKOOK`, `MF55457`, `55AH`, `480CCA`, `5`, 79890),
        new Producto(`09095-6`, `./img/hankook MF47600.jpeg`, `BATERIAS`, `HANKOOK`, `MF47600`, `60AH`, `600CCA`, `3`, 98980),
        // Aceites
        new Producto(`22212-7`, `./img/shell 5w30 hx8.webp`, `ACEITES`, `SHELL`, `HX8`, `5W-30`, `BENCINERO`, `6`, 47290),
        new Producto(`22135-K`, `./img/shell 15w40 hx5.webp`, `ACEITES`, `SHELL`, `HX5`, `15W-40`, `BENCINERO`, `6`, 29690),
        new Producto(`22013-2`, `./img/10w-40 petroleo shell.jpeg`, `ACEITES`, `SHELL`, `R5`, `10W-40`, `PETROLERO`, `3`, 35990),
        // Filtros
        new Producto(`25508-4`, `./img/man c30171.jpeg`, `FILTROS`, `MANN`, `C30171`, `AIRE`, ``, `3`, 9900),
        new Producto(`25479-7`, `./img/mann hu 718:5X.jpeg`, `FILTROS`, `MANN`, `HU718/5X`, `ELEMENTO`, ``, `3`, 9700),
        new Producto(`26007-K`, `./img/mann w610:6.jpeg`, `FILTROS`, `MANN`, `W610/6`, `ACEITE`, ``, `3`, 6280),
        // Aromatizantes
        new Producto(`42088-3`, `./img/paloma parfum.png`, `AROMATIZANTES`, `PALOMA`, `PARFUM`, `VAINILLA`, ``, `10`, 1800),
        new Producto(`42055-7`, `./img/paloma aqua balls.png`, `AROMATIZANTES`, `PALOMA`, `WOODY`, `FLORAL`, ``, `3`, 2400),
        new Producto(`42120-0`, `./img/paloma happy bag.png`, `AROMATIZANTES`, `PALOMA`, `HAPPY BAG`, `SPORT`, ``, `5`, 1890)
    ]; return PRODUCTO;   
}; const PRODUCTOS = cargarProductoEnArray(); // Array de Productos

// Variables
let botonesAgregar = document.querySelectorAll(`.agregar`);
let numerito = document.getElementById(`numerito`);
let botonesEliminar = document.querySelectorAll(`.eliminar`);
let  productoEnCarrito = JSON.parse(localStorage.getItem(`productoEnCarrito`)) || []; // Cargar productos del carrito desde localStorage al inicio
const TITULO_PRINCIPAL = document.getElementById(`tituloPrincipal`);

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
    console.log(botonesAgregar);
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
        Swal.fire({
            title: "¡Atención!",
            text: "No se encontraron resultados para esa búsqueda.",
            icon: "error"
        });
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
            Swal.fire({
                title: "¡Atención!",
                text: "No hay suficiente stock disponible.",
                icon: "warning"
            });
        }
    } else {
        if (PRODUCTO_AGREGADO.cantidad > 0) {
            const NUEVO_PRODUCTO = { ...PRODUCTO_AGREGADO, cantidad: 1 };
            productoEnCarrito.push(NUEVO_PRODUCTO);
        } else {
            Swal.fire({
                title: "¡Atención!",
                text: "No hay suficiente stock disponible",
                icon: "warning"
            });
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
    console.log(`Código del botón:`, CODIGO_BOTON); // Verifica que esté obteniendo el código correcto
    const INDEX = productoEnCarrito.findIndex(producto => producto.codigo === CODIGO_BOTON);
    if (INDEX !== -1) {
        if (productoEnCarrito[INDEX].cantidad > 1) {
            productoEnCarrito[INDEX].cantidad--;
        } else {
            productoEnCarrito.splice(INDEX, 1);
            Swal.fire({
                title: "¡Atención!",
                text: "Producto eliminado del carrito.",
                icon: "warning"
            });
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
        Swal.fire({
            title: "¡Compra Realizada!",
            text: "Muchas gracias por confiar en nosotros...",
            icon: "success"
        });
        productoEnCarrito.splice(0, productoEnCarrito.length); // Vaciar el carrito al confirmar la compra
    }
    cargarCarrito(productoEnCarrito);
    actualizarNumerito();
    agregarLocalStorage(`productoEnCarrito`, productoEnCarrito);
    mostrarPrecioTotalEnCarrito();
}
const PAGAR_CARRITO = document.getElementById(`pagarCarrito`);
PAGAR_CARRITO.onclick = verificarProductosEnCarrito;
