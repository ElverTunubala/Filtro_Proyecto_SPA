import { navigateTo } from "../Router";

export function PrivateLayout($content, logic){
  const $nav = `
  <nav class="navbar navbar-expand-lg bg-body-tertiary class="navbar bg-dark border-bottom border-body" data-bs-theme="dark"">
    <div class="container-fluid">
      <a class="navbar-brand" href="/dashboard">Home</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page"  id="adminClick" href="">CrearVuelos</a>
          </li>

          <li class="nav-item">
            <a class="nav-link" href="/users" id="userClick">Users</a>
          </li>
          

          <li class="nav-item">
            <a class="nav-link disabled" aria-disabled="true">${new Date()}</a>
          </li>

          
        </ul>
        
        <form class="d-flex" role="search" id="gettasks">
          <button class="btn btn-outline-success reserva" type="submit" id="getFlights">Obtener Vuelos</button>
        </form>

        <div class="navbar-brand"></div>
        <form class="d-flex" role="search">
          <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
          <button class="btn btn-outline-success" type="submit" id="logout">Logout</button>
        </form>
      </div>
    </div>
  </nav>
  `
  document.getElementById('root').innerHTML = `
  ${$nav}
  ${$content}
  `
  logic()
  Logout()
  getTasks()
  getClicUser()
  getClicAdmin()
  // getReserUser()
}

const rol = localStorage.getItem("rolId")

export function Logout(){
  const $logoutButton = document.getElementById('logout')
  $logoutButton.addEventListener('click', e => {
    e.preventDefault()
    localStorage.removeItem('token')
    localStorage.removeItem('rolId')
    navigateTo('/login') 
  })
}
export function getTasks(){
  const $taskButton = document.getElementById('getFlights')
  $taskButton.addEventListener('submit', e => {
    e.preventDefault()
    navigateTo('/dashboard/flights/create')
  })
}
export function getClicUser(){
  if(rol === "usuario"){
    const $userrButton = document.getElementById('adminClick')
     $userrButton.addEventListener('submit', e => {
     e.preventDefault()
     navigateTo('/user')
     
    })
  }
}
//funcion para obtener todas las reservas
// export function getReserUser(){
//   if(rol === "usuario"){
//     const $usersButton = document.getElementsByClassName('reserva')
//     $usersButton.addEventListener('submit', e => {
//       e.preventDefault()
//      navigateTo('/users/flights/booking')
//     })
    
//   }
  
// }

export function getClicAdmin(){
  if(rol === "administrador"){
    const $userButton = document.getElementById('adminClick')
     $userButton.addEventListener('submit', e => {
     e.preventDefault()
     navigateTo('/dashboard/flights/create')
    })
  }else if(rol === "administrador"){
    const $usereButton = document.getElementById('userClick')
     $usereButton.addEventListener('submit', e => {
     e.preventDefault()
     navigateTo('/user')
    })
  }
  
}