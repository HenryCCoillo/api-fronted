
form_email = document.querySelector("#form_email");
form_password = document.querySelector("#form_password");
form = document.querySelector("#form");
const body = document.querySelector("body");

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
        email: form_email.value,
        password: form_password.value,
    }

    await fetch("http://127.0.0.1:8000/users/login/", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
            Swal.fire(
                '¡Creado!',
                'Los datos se guardaron correctamente',
                'success'
            ).then((result) => {
                console.log(data);
                console.log(response);
                if (result.isConfirmed) {
                    window.location.replace("./show-service.html");
                }
            })
        }
        else {
            Swal.fire({
                icon: "error",
                title: 'Oops...',
                text: "¡Ocurrió un error!"
            })
        }
    })
});



// 2do Metodo
url = 'http://127.0.0.1:8000/users/login/'

function tokenGuardar(tokens) {
    localStorage.tokens = JSON.stringify(tokens);
}

function tokenLeer() {
    var result;
    try { result = JSON.parse(localStorage.tokens); }
    catch { }

    if (result != null && typeof (result) != 'object') {
        result = null;
    }

    return result;
}

function tokenBorrar() {
    localStorage.tokens = null;

}

async function apiTokenConseguir(usr, pass) {
    const res = await fetch(url + 'token/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: usr, password: pass })
    });
    const resData = await res.json();
    Tokens = resData;
    return resData;
}

async function apiTokenNoSirve(tokenAccess) {
    const res = await fetch(url + 'jwt/verify/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: tokenAccess })
    });
    const resData = await res.json();
    const sirveP = ( //A: devuelvo true si cumple todas las condiciones
        resData != null
        && typeof (resData) == 'object'
        && Object.keys(resData).length == 0
    );
    return (sirveP ? null : resData); //A: null si sirve, sino la razon
}

async function apiTokenRenovar(tokenRefresh) { //U: null o por que no sirve
    const res = await fetch(url + 'jwt/refresh/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ refresh: tokenRefresh })
    });
    const resData = await res.json();
    return resData; //A: null si sirve, sino la razon
}



async function apiLogin(usr, pass) {
    const tok = await apiTokenConseguir(usr, pass);
    tokenGuardar(tok);
    return tok;
}

async function apiNecesitoLoginP() {
    var result = true; //DFLT, necesito login
    const tokX = tokenLeer();
    if (tokX != null && tokX.refresh) { //A: tengo datos guardados y un token para refrescar
        const tokFresco = await apiTokenRenovar(tokX.refresh);
        if (tokFresco.access) { //A: bien, consegui un token fresco}
            tokX.access = tokFresco.access;
            tokenGuardar(tokX);
            result = false; //A: no necesito login
        }
    }
    return result;
}

async function fetchConToken(url, opciones) { //U: agrega el token a un fetch
    const tok = tokenLeer();
    if (!tok || !tok.access) { throw 'token, no tengo'; }

    opciones = opciones || {};
    opciones.headers = opciones.headers || {};
    opciones.headers.Authorization = 'Bearer ' + tok.access;
    return fetch(url, opciones);
}
