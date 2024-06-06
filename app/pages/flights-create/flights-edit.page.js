import Swal from 'sweetalert2';
import { navigateTo } from '../../Router';

export function TaskEditPage(){
    const $content = `<div class="position-absolute top-50 start-50 translate-middle ">
    <form id="formFlight">

          <legend>Vuelos Comerciales AVIANCA</legend>

          <div class="mb-3">
            <label for="disabledTextInput" class="form-label">Flight number</label>
            <input type="number" disabled class="form-control" id="number" >
          </div>

          <div class="mb-3">
           <select id="disabledSelect" disabled class="form-select" name="priorityOne">
              <option value="" disabled selected>Seleccione el origen</option>
              <option>JFK</option>
              <option>LAX</option>
              <option>MIA</option>
              <option>CDG</option>
            </select>
          </div>

          <div class="mb-3">
           <select id="disabledSelect" disabled class="form-select" name="priorityTwo">
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
      </div>
     
    `
    const logic = async () => {
        const searchparams = window.location.search;
        const paramsTrasnsformed = new URLSearchParams(searchparams)
        const taskId = paramsTrasnsformed.get('taskId')
        const fetchedTaskId = await fetch(`http://localhost:3000/flights/${taskId}`)
        const responseJson = await fetchedTaskId.json()

        const $number = document.getElementById("number")
        const $origin = document.querySelector('[name="priorityOne"]')
        const $destination = document.querySelector('[name="priorityTwo"]')
        const $departure = document.getElementById("departure")
        const $arrival= document.getElementById("arrival")
        const $capacity = document.getElementById("capacity")

        $number.value = responseJson.number
        $origin.value = responseJson.origin
        $destination.value= responseJson.destination
        $departure.value = responseJson.departure
        $arrival.value= responseJson.arrival
        $capacity.value= responseJson.capacity
       
        // Add submit event listener to the form
        const form = document.getElementById('formFlight');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get updated values from the form
            const updatedFlights = {
                number: $number.value,
                origin: $origin.value,
                destination: $destination.value,
                departure: $departure.value,
                arrival: $arrival.value,
                capacity: $capacity.value,
                status:true
            };

            // Send PUT request to update the task
            const response = await fetch(`http://localhost:3000/flights/${taskId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedFlights)
            });

            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Flights updated successfully",
                });
                navigateTo('/dashboard/flights/create')
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Failed to update task",
                });
            }
        });
    }
    return{
        $content,
        logic
    }
}