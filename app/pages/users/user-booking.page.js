
export function UserBookingPage(){
    
    const $content = ` <div id="allTasks"  class="d-flex justify-content-between mx-auto p-3"></div>`
    const logic =  async () => {
        const  $tasksContainer = document.getElementById('allTasks');

        const allsTask = await fetch("http://localhost:3000/booking");
        const responseJson = await allsTask.json()

        responseJson.forEach(element => {
            if(element.flightId){
                $tasksContainer.innerHTML += `
                <div class="card text-center">
                   <div class="card-header">${element.flightId}</div>
                   <div class="card-body">
                      <h5 class="card-title">${element.userId}</h5>
                      <p class="card-text">vienvenidos </p>
                     
                   </div>
                  <div class="card-footer text-body-secondary">${element.bookinDate}</div>
                </div>
                `
            }
        })
        
    };
    return{
        $content,
        logic
    }

}