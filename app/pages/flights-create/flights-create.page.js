import { navigateTo } from "../../Router";
import Swal from 'sweetalert2';

export function AdminPage(){
    const $content = `
    <div class="d-flex justify-content-evenly">

      <form id="formFlight">

          <legend>Vuelos Comerciales AVIANCA</legend>

          <div class="mb-3">
            <label for="disabledTextInput" class="form-label">Flight number</label>
            <input type="number"  class="form-control" id="number" >
          </div>

          <div class="mb-3">
           <select id="disabledSelect" class="form-select" name="priorityOne">
              <option value="" disabled selected>Seleccione el origen</option>
              <option>JFK</option>
              <option>LAX</option>
              <option>MIA</option>
              <option>CDG</option>
            </select>
          </div>

          <div class="mb-3">
           <select id="disabledSelect" class="form-select" name="priorityTwo">
              <option value="" disabled selected>Seleccione el destino</option>
              <option>EEUU</option>
              <option>INDIA</option>
              <option>ALEMANIA</option>
            </select>
          </div>


          <div class="mb-3">
            <label for="disabledTextInput" class="form-label">departure</label>
            <input type="date"  class="form-control" id="departure" >
          </div>

          <div class="mb-3">
            <label for="disabledTextInput" class="form-label" >arrival</label>
            <input type="date"  class="form-control" id="arrival" >
          </div>

          <div class="mb-3">
            <label for="disabledTextInput" class="form-label">capacity</label>
            <input type="number"  class="form-control" id="capacity" >
          </div>
          
          <button type="submit" class="btn btn-primary">Submit</button>
      </form>

      <div id="allFlight"  class="d-flex justify-content-between mx-auto p-3"></div>
    </div>
    `
    const logic = async () => {
      const $form = document.getElementById('formFlight')
      const  $tasksContainer = document.getElementById('allFlight');

      const allsTask = await fetch("http://localhost:3000/flights")
      const responseJson = await allsTask.json()
      
      responseJson.forEach(element => {
        if(element.status){
          $tasksContainer.innerHTML += `
          <div class="card text-center">
            <div class="card-header">${element.number}</div>
            <div class="card-body">
              <h5 class="card-title">${element.origin}</h5>
              <p class="card-text">${element.destination}</p>
              <button type="button" class="btn btn-primary edit-class" data-id="${element.id}">Editar</button>
              <button type="button" class="btn btn-danger deleteId" id="deleteId" data-id="${element.id}">Eliminar</button>
              <button type="button" class="btn btn-primary inabilitar" data-id="${element.id} ">Inabilitar</button>
            </div>
            <div class="card-footer text-body-secondary">${element.capacity} pasajeros</div>
          </div>
          `
        }
      });
      //funcion para editar
      const $editBtns = document.getElementsByClassName('edit-class');
      for (let $editBtn of $editBtns){
        $editBtn.addEventListener('click', ()=> {
          navigateTo(`/dashboard/flights/edit?taskId=${$editBtn.getAttribute('data-id')}`)
        })
      }
      //funcion para eliminar
      const $delete = document.getElementsByClassName('deleteId');//con getElementById no me dio
      for (let $deletB of $delete ){
        
        $deletB.addEventListener('click',  async () => {
          
          const id = $deletB.getAttribute('data-id')
          const taskDelete =  await fetch(`http://localhost:3000/flights/${id}`, {
            method: "DELETE",
            headers: {
              "content-Type": "application/json",
            }
          });
          if (taskDelete.ok) {
            Swal.fire({
              icon:"success",
              title:"exito",
              text:`vuelo borrado correctamente`
            });
          }
        })
      }
      //funcion para cambiar estado de reservas si se elimina un vuelo
      
      //funcion para inabilitar
      const $inab = document.getElementsByClassName('inabilitar');
      for (let $deletB of $inab ){
        try{
        $deletB.addEventListener('click',  async () => {
          const id = $deletB.getAttribute('data-id')
          const taskDelete =  await fetch(`http://localhost:3000/flights/${id}`, {
            method: "PATCH",
            headers: {
              "content-Type": "application/json",
            },
            body: JSON.stringify({
              status:false,
            }),
          });
          if (taskDelete.ok) {
            Swal.fire({
              icon:"success",
              title:"exito",
              text:`vuelo inhabilitado correctamente`
            });
          }
        })
        }catch(error){
          console.log("error", error)
        }
      }
      //funcion para crear
      $form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const $number = document.getElementById("number").value;
        const $origin = document.querySelector('[name="priorityOne"]').value;
        const $destination = document.querySelector('[name="priorityTwo"]').value;
        const $departure = document.getElementById("departure").value;
        const $arrival= document.getElementById("arrival").value;
        const $capacity = document.getElementById("capacity").value;
        
        
        const taskCreate = await fetch("http://localhost:3000/flights", {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({
            number: $number,
            origin: $origin,
            destination: $destination,
            departure: $departure,
            arrival: $arrival,
            capacity:$capacity,
            status:true,
          }),
        });
        if (!taskCreate.ok) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "fallo en la creacion de vuelos",
          });
          return;
        }
        Swal.fire({
            icon:"success",
            title:"exito",
            text:`vuelo ${$number} creado correctamente`
        });
      });
    };
    return{
        $content,
        logic
    }
}