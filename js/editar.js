

form_editar_servicio = document.querySelector("#form-editar-servicio");
const id = new URLSearchParams(window.location.search).get("id");

async function getTask() {
    try {
        const response = await fetch(`http://127.0.0.1:8000/service/${id}`);
        const data = await response.json();
        traerServicio(data);
    } catch (error) {
        console.log(error);
    }
}


function traerServicio(data) {
    form_editar_servicio.innerHTML = "";
    form_editar_servicio.innerHTML += ` 
        <div class="mb-3">
            <label for="form-servicio" class="form-label">Nombre del Servicio</label>
            <input type="text" class="form-control" id="form-servicio" value="${data.name}">
        </div>
        <div class="mb-3">
            <label for="form-descripcion" class="form-label">Descripcion</label>
            <textarea class="form-control" name="" id="form-descripcion" cols="30" rows="10">${data.description}</textarea>
        </div>
        <div class="mb-3">
            <label for="form-url" class="form-label">Url</label>
            <input type="text" class="form-control" id="form-url" value="${data.logo}">
        </div>
        <button type="submit" class="btn btn-primary" style="background: #f01d91;border: none;">Actulizar Servicio</button>

    `;
    
}

form_editar_servicio.addEventListener('submit', (event) => {
    event.preventDefault();
    editarSericio();
});
async function editarSericio(){
    form_servicio = document.querySelector("#form-servicio")
    form_descripcion = document.querySelector("#form-descripcion")
    form_url = document.querySelector("#form-url")

    const data = {
        name: form_servicio.value,
        description: form_descripcion.value,
        logo: form_url.value,
    }
    await fetch(`http://127.0.0.1:8000/service/${id}/`, {
        method: "PUT",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    }).then((response)=>{
        if (response.ok){
            Swal.fire(  
                '¡Actualizado!',
                'Los datos se actualizaron correctamente',
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
}




getTask();