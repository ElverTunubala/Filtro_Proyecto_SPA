import { PrivateLayout } from './components/private-layout.component';
import {routes} from './routes';

export function Router(){
    const path = window.location.pathname;

    const publicRoute = routes.public.find(route => route.path === path);
    const privateRoute = routes.private.find(route => route.path === path);
   

    if(path === '/login' || path === '/register'){
        if(localStorage.getItem('token')){
            navigateTo('/dashboard')
            return
        }
    }
    
    if(publicRoute){
        publicRoute.page();
        return
    }
    if (privateRoute){
        if(!localStorage.getItem('token')){
            navigateTo('/login')
            return
        }
        const {$content,logic} = privateRoute.page();
        PrivateLayout($content, logic)
        return
    }

    navigateTo('/not-found')
   
}
export function navigateTo(path){
    window.history.pushState({},"", window.location.origin + path);
    Router()
}