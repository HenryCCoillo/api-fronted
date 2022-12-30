
form = document.querySelector("#form-nuevo_servicio")
form_servicio = document.querySelector('#form-servicio');
form_descripcion = document.querySelector('#form-descripcion');
form_url = document.querySelector('#form-url');
body = document.querySelector("body");


form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = {
        name: form_servicio.value,
        description: form_descripcion.value,
        logo: form_url.value,
    }
    await fetch("http://127.0.0.1:8000/service/", {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
        
    }).then((response)=>{
        if (response.ok){
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
        else{
            Swal.fire({
                icon:"error",
                title: 'Oops...',
                text: "¡Ocurrió un error!"
            })           
        }
    })
});