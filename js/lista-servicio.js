serviciorealizado = document.querySelector('#service');

async function getTask() {
    try {
      const response = await fetch(`http://127.0.0.1:8000/service/`);
      const data = await response.json();
      renderTodo(data)

    } catch (error) {        
      console.log(error);
    }
}

function renderTodo(data) {
    data.results.forEach((task) => {
        serviciorealizado.innerHTML += `
        <tr>
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>
                <img style="width: 50px;display: block;margin: auto;" src="${task.logo}" alt="">
            </td>
            <td  style="width: 200px">    
                <a href="/editar.html?id=${task.id}"  class="btn btn-warning" >Editar</a>   
                <button onclick="eliminarServicio(${task.id})" class="btn btn-danger">Eliminar</button>
            </td>
        </tr>
        `;
    });

}
  
getTask();