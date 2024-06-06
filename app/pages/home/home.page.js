export function HomePage (){
    
    const root = document.getElementById('root')
    const $myDiv = document.createElement('DIV')
    $myDiv.textContent = "hola desde home page"
    root.appendChild($myDiv)
}