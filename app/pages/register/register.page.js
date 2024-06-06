import bcrypt from 'bcryptjs';
import Swal from 'sweetalert2';
import { navigateTo } from "../../Router";

export async function RegisterPage(){
  
    const allsTask = await fetch("http://localhost:3000/roles")
    const responseJson = await allsTask.json()
    const $admin = responseJson[0].role
    const $user = responseJson[1].role
    
    const root = document.getElementById('root');
    root.innerHTML= `
    <div class="position-absolute top-50 start-50 translate-middle ">
       <form>

         <div class="mb-3">
           <label for="exampleInputEmail1" class="form-label">Name</label>
           <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
           <div id="emailHelp" class="form-text">Ingrese el nombre</div>
         </div>

         <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input type="email" autocomplete="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
          <div id="emailHelp" class="form-text">Ingrese el correo electronico</div>
        </div>

        <div class="mb-3">
         <label for="exampleInputEmail1" class="form-label">Birthdate</label>
         <input type="text" autocomplete="username" class="form-control birthdate" id="exampleInputEmail1 " aria-describedby="emailHelp">
         <div id="emailHelp" class="form-text">Ingrese la fecha de cumpleaños</div>
        </div>

        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input type="password" class="form-control" id="exampleInputPassword1">
        </div>

        <div class="mb-3">
          <select id="disabledSelect" class="form-select" name="priority">
                  <option value="" disabled selected>Seleccione una opcion</option>
                   <option>${$admin}</option>
                   <option>${$user}</option>
          </select>
        </div>
    
        <button type="submit" class="btn btn-primary">Crear Usuario</button>
      </form>
    </div>`

  //logic
  const $createUserForm = document.getElementsByTagName('form')[0]
  $createUserForm.addEventListener("submit", async (e) =>{
    e.preventDefault()

    const $userName = document.querySelector('[type="text"]')
    const $userEmail = document.getElementsByTagName('input')[1]
    const $userPassword = document.querySelector('[type="password"]')
    const $birthdate = document.getElementsByTagName('input')[2]
    console.log("ste es:",$birthdate.value)
    const hashedPassword = await bcrypt.hash($userPassword.value, 10);
    const $select = document.querySelector('[name="priority"]').value;

    if (!$userName.value || !$userEmail.value || !$userPassword.value ||  !$select|| !$birthdate.value){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "todos los campos son requeridos",
      });
      return
    }
    //fetch
    const userCreated = await fetch('http://localhost:3000/users',{
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        // 'Authorization':`Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        name:$userName.value,
        email: $userEmail.value,
        birthdate : $birthdate.value,
        password: hashedPassword,
        role : $select
      })
    })
    if(!userCreated.ok){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "fallo la creacion de usuario",
        
      });
      return
    }
    Swal.fire({
      icon:"success",
      title:"exito",
      text:`usuario ${$userName.value} creado correctamente`
    });
    navigateTo('/login')
  })
  
}