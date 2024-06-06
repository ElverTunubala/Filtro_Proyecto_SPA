import {HomePage} from './pages/home'; //la extencion js no se pone por webpack
import {NotFoundPage} from './pages/not-found';
import {RegisterPage} from './pages/register';
import {LoginPage} from './pages/login';
import {AdminPage, TaskEditPage } from './pages/flights-create';
import {UserPage, UserBookingPage} from './pages/users';


export const routes ={
    public:[
        {path:'/dashboard', page: HomePage},
        {path:'/not-found', page: NotFoundPage},
        {path:'/register', page: RegisterPage},
        {path:'/login', page: LoginPage}
        
    ],
    private:[
        {path:'/dashboard/flights/create', page: AdminPage},
        {path:'/users', page: UserPage},
        {path:'/dashboard/flights/edit', page: TaskEditPage},
        {path:'/users/flights/booking', page: UserBookingPage},
    ]
}