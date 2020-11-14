//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito =[];


cargarEventListeners();
function cargarEventListeners(){
    //cuando agregas un curso al clikear "agregar curso"
    listaCursos.addEventListener('click', agregarCurso);

    //elimina cursos de carrito
    carrito.addEventListener('click',eliminaCurso);

    // vaciar carrito
    vaciarCarritoBtn.addEventListener('click',()=>{
        articulosCarrito=[]; //resetear carrito
        limpiarHtml(); //elimina todo el html del carrito
    })

}

//funciones
function agregarCurso(e) {
    e.preventDefault();


    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado)
    }
}

//elimina un curso del carrito
 function eliminaCurso(e) {
    //  console.log(e.target.classList);
     if (e.target.classList.contains("borrar-curso")) {
         const cursoId=e.target.getAttribute('data-id');

         // Eliminar del arreglo articulosCarrito por el data-id
         articulosCarrito= articulosCarrito.filter(curso=> curso.id!== cursoId);
        //  console.log(articulosCarrito);
        carritoHTML(); //iterar sobre el carrito y mostrar su html
     }
 }

// lee el contenido del html que se clikeo y extrae la info del curso
function leerDatosCurso(curso) {
    // console.log(curso);

    // objeto con los datos que se necesitan
    const infoCurso ={
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad:1

    }
    //revisa si un elemento ya existe
    const existe= articulosCarrito.some(curso=>curso.id===infoCurso.id); 
    // console.log(existe);
    if (existe) {
        //Actualizamos la cantidad
        const cursos= articulosCarrito.map(curso=>{
            if (curso.id===infoCurso.id) {
                curso.cantidad++
                return curso; //retorna el objeto actualizado
            } else {
                return curso;// retorna los objetos que no son duplicados
            }
        });
        articulosCarrito=[...cursos]
    } else {
        //agrega articulos al carrito
        articulosCarrito=[...articulosCarrito,infoCurso];
    }
    
   
   
    console.log(articulosCarrito);

    carritoHTML();
}


//muestra carrito de compras en html
function carritoHTML() {

    //limpiar html
    limpiarHtml();

    //recorre el carrito y genera el html
    articulosCarrito.forEach((curso)=>{
        const {imagen ,titulo ,precio ,cantidad ,id }=curso;
        const row= document.createElement('tr')
        row.innerHTML=`
            <td>
               <img src=${imagen} width="100">
            </td>
            <td> ${titulo} </td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>

         
        `;
   

        //agrega el html del carrito en el tbody
        contenedorCarrito.appendChild(row)    
    });


}

//elimina html anterior del tbody
function limpiarHtml(){
    //forma lenta
    // contenedorCarrito.innerHTML='';


    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}