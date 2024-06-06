import Swal from 'sweetalert2';

export  function UserPage(){
    
    const $content = ` <div id="allTasks"  class="d-flex justify-content-between mx-auto p-3"></div>`
    const logic =  async () => {
        const $userId = localStorage.getItem("userId")
        
        const  $tasksContainer = document.getElementById('allTasks');

        const allsTask = await fetch("http://localhost:3000/flights");
        const responseJson = await allsTask.json()

        responseJson.forEach(element => {
            const $flightId = element.id

            if(element.status){
                $tasksContainer.innerHTML += `
               
                <div class="card text-center">
                   <div class="card-header">${element.number}</div>
                   <div class="card-body">
                      <h5 class="card-title">${element.origin}</h5>
                      <p class="card-text">${element.destination}</p>
                     
                      <button type="button" class="btn btn-primary reserv-class" data-id="${element.id} ">RESERVAR</button>
                  </div>
                  <div class="card-footer text-body-secondary">${element.capacity} pasajeros</div>
                </div>
                `
                const $reservaBtns = document.getElementsByClassName('reserv-class');
                for (let $reservBtn of $reservaBtns){
                    $reservBtn.addEventListener('click', async (e)=> {
                        e.preventDefault();
                        
                        const bookingCreate = await fetch("http://localhost:3000/booking", {
                            method: "POST",
                            headers: {
                                "content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                flightId: $flightId,
                                userId:$userId,
                                bookinDate: new Date(),
                                status: true,
                            }),
                        });
                        if(bookingCreate){
                            Swal.fire({
                                icon:"success",
                                title:"exito",
                                text:`reserva ${$flightId} creada correctamente`
                            });
                        }
                        //hasta aca va la funcion click
                    })
                }
            }
        })
        
    };
    return{
        $content,
        logic
    }

}