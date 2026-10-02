/* =========================================
   USUARIOS DE DEMOSTRACIÓN
   ========================================= */

let usuarios = [

    {
        nombre: "Administrador",
        email: "admin@copaci.com",
        password: "123456",
        rol: "administrador"
    },

    {
        nombre: "Empleado",
        email: "empleado@copaci.com",
        password: "123456",
        rol: "empleado"
    },

    {
        nombre: "Usuario",
        email: "usuario@copaci.com",
        password: "123456",
        rol: "usuario"
    }

];


/* =========================================
   CAMBIAR ENTRE LOGIN Y REGISTRO
   ========================================= */

function mostrarRegistro() {

    document
        .getElementById("loginForm")
        .classList.add("hidden");

    document
        .getElementById("registerForm")
        .classList.remove("hidden");
}


function mostrarLogin() {

    document
        .getElementById("registerForm")
        .classList.add("hidden");

    document
        .getElementById("loginForm")
        .classList.remove("hidden");
}


/* =========================================
   INICIO DE SESIÓN
   ========================================= */

function iniciarSesion(event) {

    event.preventDefault();

    const email =
        document.getElementById("loginEmail").value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("loginPassword").value;

    const usuario =
        usuarios.find(
            user =>
                user.email === email &&
                user.password === password
        );


    if (!usuario) {

        alert(
            "Correo o contraseña incorrectos."
        );

        return;
    }


    mostrarDashboard(usuario);
}


/* =========================================
   REGISTRO
   ========================================= */

function registrarUsuario(event) {

    event.preventDefault();

    const nombre =
        document.getElementById("registerName").value.trim();

    const email =
        document.getElementById("registerEmail").value
        .trim()
        .toLowerCase();

    const password =
        document.getElementById("registerPassword").value;

    const rol =
        document.getElementById("registerRole").value;


    /* Verificar si el correo ya existe */

    const existe =
        usuarios.some(
            user => user.email === email
        );


    if (existe) {

        alert(
            "Este correo ya está registrado."
        );

        return;
    }


    /* Crear nuevo usuario */

    const nuevoUsuario = {

        nombre: nombre,

        email: email,

        password: password,

        rol: rol

    };


    usuarios.push(nuevoUsuario);


    alert(
        "¡Registro exitoso! Ahora puedes iniciar sesión."
    );


    /* Limpiar formulario */

    document
        .getElementById("registerName")
        .value = "";

    document
        .getElementById("registerEmail")
        .value = "";

    document
        .getElementById("registerPassword")
        .value = "";

    document
        .getElementById("registerRole")
        .value = "";


    mostrarLogin();
}


/* =========================================
   MOSTRAR DASHBOARD
   ========================================= */

function mostrarDashboard(usuario) {

    document
        .getElementById("authPage")
        .classList.add("hidden");

    document
        .getElementById("dashboardPage")
        .classList.remove("hidden");


    /* Nombre */

    document
        .getElementById("welcomeMessage")
        .textContent =
        "¡Bienvenido, " + usuario.nombre + "!";


    document
        .getElementById("userName")
        .textContent =
        usuario.nombre;


    /* Rol */

    const nombreRol =
        obtenerNombreRol(usuario.rol);

    document
        .getElementById("userRole")
        .textContent =
        nombreRol;


    /* Crear opciones según rol */

    cargarOpciones(usuario.rol);
}


/* =========================================
   NOMBRE DEL ROL
   ========================================= */

function obtenerNombreRol(rol) {

    switch (rol) {

        case "administrador":
            return "Administrador";

        case "empleado":
            return "Empleado";

        default:
            return "Usuario";

    }
}


/* =========================================
   OPCIONES SEGÚN EL ROL
   ========================================= */

function cargarOpciones(rol) {

    const contenedor =
        document.getElementById("roleCards");


    let tarjetas = [];


    /* ADMINISTRADOR */

    if (rol === "administrador") {

        tarjetas = [

            {
                icono: "⚙️",
                titulo: "Administrar usuarios",
                texto: "Consulta y administra las cuentas registradas en el sistema."
            },

            {
                icono: "📊",
                titulo: "Panel de estadísticas",
                texto: "Consulta información general y estadísticas del sistema."
            },

            {
                icono: "📢",
                titulo: "Gestionar avisos",
                texto: "Crea, modifica y administra los avisos de la comunidad."
            },

            {
                icono: "🛠️",
                titulo: "Configuración",
                texto: "Administra las configuraciones generales de la plataforma."
            }

        ];

    }


    /* EMPLEADO */

    else if (rol === "empleado") {

        tarjetas = [

            {
                icono: "📋",
                titulo: "Gestionar trámites",
                texto: "Consulta y da seguimiento a los trámites ciudadanos."
            },

            {
                icono: "📢",
                titulo: "Avisos",
                texto: "Consulta los avisos y actividades de la comunidad."
            },

            {
                icono: "📝",
                titulo: "Reportes",
                texto: "Consulta y da seguimiento a reportes ciudadanos."
            }

        ];

    }


    /* USUARIO */

    else {

        tarjetas = [

            {
                icono: "📄",
                titulo: "Mis trámites",
                texto: "Consulta el estado de tus solicitudes y trámites."
            },

            {
                icono: "📝",
                titulo: "Crear reporte",
                texto: "Registra una situación para solicitar atención."
            },

            {
                icono: "📅",
                titulo: "Actividades",
                texto: "Consulta las próximas actividades de la comunidad."
            }

        ];

    }


    /* Crear las tarjetas HTML */

    contenedor.innerHTML = "";


    tarjetas.forEach(
        tarjeta => {

            const article =
                document.createElement("article");

            article.className = "card";


            article.innerHTML = `

                <div class="card-icon">
                    ${tarjeta.icono}
                </div>

                <h3>
                    ${tarjeta.titulo}
                </h3>

                <p>
                    ${tarjeta.texto}
                </p>

                <button onclick="accionTarjeta('${tarjeta.titulo}')">
                    Acceder →
                </button>

            `;


            contenedor.appendChild(article);

        }
    );
}


/* =========================================
   ACCIONES DE LAS TARJETAS
   ========================================= */

function accionTarjeta(nombre) {

    alert(
        "Has seleccionado: " + nombre
    );
}


/* =========================================
   CERRAR SESIÓN
   ========================================= */

function cerrarSesion() {

    document
        .getElementById("dashboardPage")
        .classList.add("hidden");

    document
        .getElementById("authPage")
        .classList.remove("hidden");


    /* Limpiar campos */

    document
        .getElementById("loginEmail")
        .value = "";

    document
        .getElementById("loginPassword")
        .value = "";


    mostrarLogin();
}