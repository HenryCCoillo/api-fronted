serviciorealizado = document.querySelector('#service');

async function getTask() {
  
    try {
      const response = await fetch(`http://127.0.0.1:8000/pago-user/`);
      const data = await response.json();
      renderTodo(data)
    } catch (error) {
      console.log(error);
    }
}
function renderTodo(data) {
    data.results.slice(0,3).forEach((task) => {
        serviciorealizado.innerHTML += `
        <tr>
            <td>${task.servide}</td>
            <td>${task.expiration_date}</td>
            <td>${task.amount}</td>
        </tr>
        `;
        console.log(task)
    });
    

}
  
getTask();