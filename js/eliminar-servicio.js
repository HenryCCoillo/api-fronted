
async function eliminarServicio(id) {
    // const id = new URLSearchParams(window.location.search).get("id");
    const ideliminar = id;
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esta acción!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar",
        cancelButtonText: "Cancelar",
    }).then(async (result) => {
        if (result.isConfirmed) {
            await fetch(`http://127.0.0.1:8000/service/${ideliminar}/`, {
                method: "DELETE",
                mode: "cors",
            }).then((response) => {
                if (response.ok) {
                    if (response.ok) {
                        Swal.fire(
                            "¡Eliminado!",
                            "La tarea se eliminó correctamente",
                            "success"
                        ).then((result) => {
                            /* Read more about isConfirmed, isDenied below */
                            if (result.isConfirmed) {
                                window.location.replace("./lista-servicio.html");
                            }
                        });
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Oops...",
                            text: "¡Ocurrió un error!",
                        });
                    }
                }
            });
        }
    });
}