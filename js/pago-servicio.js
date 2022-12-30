form_pago_servicio = document.querySelector("#form-pago-servicio");
servicio_pago = document.querySelector("#form-servicio-pago");
fecha_pago = document.querySelector("#form-fecha-pago");
monto_servicio = document.querySelector("#form-monto-pago");
const body = document.querySelector("body");
const marcelo = "marcelo"
async function servicio() {
    try {
        const response = await fetch(`http://127.0.0.1:8000/service/`);
        const data = await response.json();
        listarServicio(data)

    } catch (error) {
        console.log(error);
    }
}

function listarServicio(data1) {
    data1.results.forEach((service) => {
        servicio_pago.innerHTML += ` 
            <option value="${service.id}">${service.name}</option>
        `;
    })
}

form_pago_servicio.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
        amount: monto_servicio.value,
        expiration_date: fecha_pago.value,
        user: 1,
        servide: servicio_pago.value,
    }
    await fetch("http://127.0.0.1:8000/pago-user/", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then((response) => {
        if (response.ok) {
            Swal.fire(
                '¡Creado!',
                'Los datos se guardaron correctamente',
                'success'
            ).then((result) => {
                if (result.isConfirmed) {
                    window.location.replace("./lista-servicio.html");
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
        console.log(response)
    })
});

servicio();