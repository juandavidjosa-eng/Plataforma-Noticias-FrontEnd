// Esperamos a que todo el HTML cargue
document.addEventListener("DOMContentLoaded", () => {
    // Para el index.html y catalogo.html
    const contenedorNoticias = document.getElementById("contenedor-noticias");
    if (contenedorNoticias) {
        cargarNoticias(contenedorNoticias);
    }

    // Para detalle.html
    const contenedorDetalle = document.getElementById("detalle-noticia");
    if (contenedorDetalle) {
        cargarDetalleNoticia(contenedorDetalle);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // 1. Para inicio y catálogo
    const contenedorNoticias = document.getElementById("contenedor-noticias");
    if (contenedorNoticias) cargarNoticias(contenedorNoticias);

    // 2. Para detalle
    const contenedorDetalle = document.getElementById("detalle-noticia");
    if (contenedorDetalle) cargarDetalleNoticia(contenedorDetalle);

    // 3. NUEVO: Para favoritos
    const contenedorFavoritos = document.getElementById("contenedor-favoritos");
    if (contenedorFavoritos) cargarFavoritos(contenedorFavoritos);
});

// Ahora la función recibe el 'contenedor' como parámetro
async function cargarNoticias(contenedor) {
    try {
        const respuesta = await fetch("data/noticias.json");
        const noticias = await respuesta.json();

        // ESTA ES LA LÍNEA NUEVA: Limpiamos el contenedor antes de inyectar las tarjetas
        contenedor.innerHTML = "";

        // Recorremos cada noticia para crear su tarjeta en HTML
        noticias.forEach(noticia => {
            const tarjetaHTML = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm border-0">
                        <img src="${noticia.imagen}" class="card-img-top" alt="${noticia.titulo}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <span class="text-danger fw-bold" style="font-size: 0.8rem;">${noticia.categoria}</span>
                            <h5 class="card-title mt-2 fw-bold" style="font-family: serif;">${noticia.titulo}</h5>
                            <p class="card-text text-muted small">${noticia.descripcion_corta}</p>
                        </div>
                        <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center pb-3">
                            <a href="detalle.html?id=${noticia.id}" class="btn btn-outline-dark btn-sm">Ver más</a>
                            <button class="btn btn-outline-danger btn-sm" onclick="agregarAFavoritos(${noticia.id})">
                                Guardar ❤
                            </button>
                        </div>
                    </div>
                </div>
            `;
            // Inyectamos la tarjeta en el contenedor
            contenedor.innerHTML += tarjetaHTML;
        });

    } catch (error) {
        console.error("Hubo un error cargando el JSON:", error);
        contenedor.innerHTML = "<p class='text-danger'>Error al cargar las noticias. Verifica tu archivo JSON.</p>";
    }
}

// Función real para guardar en Favoritos
function agregarAFavoritos(idNoticia) {
    // 1. Obtenemos la lista de favoritos guardada en el navegador (si no hay, creamos un arreglo vacío)
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // 2. Verificamos si la ID de la noticia ya está guardada para no duplicarla
    if (!favoritos.includes(idNoticia)) {
        // 3. Si no está, la agregamos al arreglo
        favoritos.push(idNoticia);
        
        // 4. Guardamos el arreglo actualizado en el localStorage (debe guardarse en formato texto JSON)
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        
        alert("¡Noticia guardada en favoritos con éxito! ❤");
    } else {
        alert("Esta noticia ya está en tu lista de favoritos.");
    }
}
// Validaciones del Formulario de Contacto
const formulario = document.getElementById("formulario-contacto");

if (formulario) {
    formulario.addEventListener("submit", function (evento) {
        // Evitamos que la página se recargue al enviar
        evento.preventDefault();

        // Capturamos los valores de los campos
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        // Variables de control
        let formularioValido = true;
        const expresionCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validar formato de email

        // Validar Nombre
        if (nombre === "") {
            document.getElementById("error-nombre").classList.remove("d-none");
            formularioValido = false;
        } else {
            document.getElementById("error-nombre").classList.add("d-none");
        }

        // Validar Correo
        if (!expresionCorreo.test(correo)) {
            document.getElementById("error-correo").classList.remove("d-none");
            formularioValido = false;
        } else {
            document.getElementById("error-correo").classList.add("d-none");
        }

        // Validar Mensaje
        if (mensaje === "") {
            document.getElementById("error-mensaje").classList.remove("d-none");
            formularioValido = false;
        } else {
            document.getElementById("error-mensaje").classList.add("d-none");
        }

        // Si todo está correcto, mostramos el mensaje de éxito y limpiamos el formulario
        if (formularioValido) {
            document.getElementById("alerta-exito").classList.remove("d-none");
            formulario.reset();
            
            // Opcional: Ocultar el mensaje de éxito después de 5 segundos
            setTimeout(() => {
                document.getElementById("alerta-exito").classList.add("d-none");
            }, 5000);
        }
    });
}
// Función para cargar una sola noticia en detalle.html
async function cargarDetalleNoticia(contenedor) {
    // Leer el ID de la URL (ej: ?id=2)
    const parametrosURL = new URLSearchParams(window.location.search);
    const idNoticia = parseInt(parametrosURL.get("id"));

    try {
        const respuesta = await fetch("data/noticias.json");
        const noticias = await respuesta.json();

        // Buscar la noticia que coincide con el ID
        const noticia = noticias.find(n => n.id === idNoticia);

        if (noticia) {
            contenedor.innerHTML = `
                <div class="row">
                    <div class="col-md-10 mx-auto">
                        <span class="text-danger fw-bold text-uppercase">${noticia.categoria}</span>
                        <h1 class="display-4 mt-2 mb-4 fw-bold" style="font-family: serif;">${noticia.titulo}</h1>
                        <p class="text-muted mb-4">Por <strong>${noticia.autor}</strong> | Publicado el ${noticia.fecha}</p>
                        
                        <img src="${noticia.imagen}" class="img-fluid w-100 rounded mb-5" alt="${noticia.titulo}" style="max-height: 500px; object-fit: cover;">
                        
                        <div class="fs-5 lh-lg mb-5">
                            <p>${noticia.descripcion_corta}</p>
                            <p>Este es el texto extendido de la noticia generado dinámicamente. Aquí se desarrollaría el cuerpo completo del artículo periodístico, analizando los hechos, presentando datos y exponiendo las opiniones de los expertos.</p>
                        </div>
                        
                        <div class="d-flex gap-3 pb-4 border-bottom">
                            <button class="btn btn-danger px-4" onclick="agregarAFavoritos(${noticia.id})">Guardar en Favoritos ❤</button>
                            <a href="contacto.html" class="btn btn-outline-dark px-4">Contacto</a>
                        </div>
                    </div>
                </div>
            `;
        } else {
            contenedor.innerHTML = "<h2 class='text-center mt-5'>Noticia no encontrada</h2>";
        }
    } catch (error) {
        contenedor.innerHTML = "<p class='text-danger text-center'>Error al cargar el detalle de la noticia.</p>";
    }
}

// ==========================================
// LÓGICA PARA LA PÁGINA DE FAVORITOS
// ==========================================

async function cargarFavoritos(contenedor) {
    // Obtenemos los ID guardados
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    // Si no hay favoritos, mostramos un mensaje
    if (favoritos.length === 0) {
        contenedor.innerHTML = `
            <div class="col-12 text-center py-5">
                <h4 class="text-muted mb-3">Aún no tienes noticias guardadas en favoritos.</h4>
                <a href="catalogo.html" class="btn btn-danger">Explorar noticias</a>
            </div>`;
        return;
    }

    try {
        const respuesta = await fetch("data/noticias.json");
        const noticias = await respuesta.json();

        // Filtramos solo las noticias que están en el arreglo de favoritos
        const noticiasFavoritas = noticias.filter(n => favoritos.includes(n.id));

        // Limpiamos el contenedor antes de inyectar
        contenedor.innerHTML = "";

        noticiasFavoritas.forEach(noticia => {
            const tarjetaHTML = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100 shadow-sm border-0">
                        <img src="${noticia.imagen}" class="card-img-top" alt="${noticia.titulo}" style="height: 200px; object-fit: cover;">
                        <div class="card-body">
                            <span class="text-danger fw-bold" style="font-size: 0.8rem;">${noticia.categoria}</span>
                            <h5 class="card-title mt-2 fw-bold" style="font-family: serif;">${noticia.titulo}</h5>
                        </div>
                        <div class="card-footer bg-white border-0 d-flex justify-content-between align-items-center pb-3">
                            <a href="detalle.html?id=${noticia.id}" class="btn btn-outline-dark btn-sm">Leer</a>
                            <button class="btn btn-outline-danger btn-sm" onclick="removerDeFavoritos(${noticia.id})">
                                Eliminar ❌
                            </button>
                        </div>
                    </div>
                </div>
            `;
            contenedor.innerHTML += tarjetaHTML;
        });

    } catch (error) {
        contenedor.innerHTML = "<p class='text-danger'>Error al cargar tus favoritos.</p>";
    }
}

// Función para eliminar un favorito
function removerDeFavoritos(idNoticia) {
    let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];
    
    // Filtramos el arreglo para quitar el ID que queremos eliminar
    favoritos = favoritos.filter(id => id !== idNoticia);
    
    // Guardamos el nuevo arreglo actualizado
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
    
    alert("Noticia eliminada de tus favoritos.");

    // Recargar visualmente las tarjetas en la página de favoritos
    const contenedorFavoritos = document.getElementById("contenedor-favoritos");
    if (contenedorFavoritos) {
        cargarFavoritos(contenedorFavoritos);
    }
}