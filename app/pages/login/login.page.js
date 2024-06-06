import Swal from 'sweetalert2';
import bcrypt from 'bcryptjs';
import { navigateTo } from "../../Router";
import jwt from 'jwt-simple'; // Importa jwt-simple
const secret = 'your-256-bit-secret'; // clave secreta adecuada

export function LoginPage(){
  const root = document.getElementById("root");
  root.innerHTML = `
  <div class="position-absolute top-50 start-50 translate-middle " >
    <form>
      <div class="mb-3">
         <label for="exampleInputEmail1" class="form-label">Email address</label>
         <input type="email" autocomplete="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
         <div id="emailHelp" class="form-text">Ingrese el correo electronico</div>
      </div>
      <div class="mb-3">
         <label for="exampleInputPassword1" class="form-label">Password</label>
         <input type="password" class="form-control" id="exampleInputPassword1">
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
    </form>
  </div>`;
  //logic
  const $loginForm = document.getElementsByTagName("form")[0];
  $loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const $userEmail = document.querySelector('[type="email"]').value;
    const $userPassword = document.querySelector('[type="password"]').value;

    if (!$userEmail || !$userPassword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "todos los campos son requeridos",
      });
      return;
    }
    //fetch
    const userFetched = await fetch("http://localhost:3000/users");

    if (!userFetched.ok) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "error al iniciar sesion",
      });
      return;
    }
    const usersToJson = await userFetched.json();
    const userFound = usersToJson.find((user) => user.email === $userEmail);
    
    if (userFound) {
      const match = await bcrypt.compare($userPassword, userFound.password);

      if (match) {
        localStorage.setItem("userId", userFound.id);
        localStorage.setItem("rolId", userFound.role);
        // Generar JWT
        const payload = {
          email: userFound.email,
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
        }; // Expiración de 1 hora
        const token = jwt.encode(payload, secret);
        localStorage.setItem("token", token);

        Swal.fire({
          icon: "success",
          title: "Login successful",
          text: `usuario con correo ${$userEmail} logeado correctamente`,
        });
        const rolId = localStorage.getItem("rolId")

        if (rolId ==="administrador"){
          navigateTo('/dashboard/flights/create')
          
        }else if(rolId === "usuario"){
          navigateTo('/users')
        }
      } else {
        // Muestra el mensaje de error de contraseña inválida
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid password",
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User not found",
      });
      // mensaje de error si el usuario no existe
    }
  });
}