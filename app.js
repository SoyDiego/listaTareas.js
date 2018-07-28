let btnAgregar = document.getElementById('btn-agregar');
let btnBorrar = document.getElementsByClassName('btn-borrar');
let listaTareas = document.getElementById('lista');

btnAgregar.addEventListener('click', agregarTarea);
document.addEventListener('DOMContentLoaded', localStorageListo);
//Se hace al principio ya que la lista tiene 3 elementos.
//Si no tuviese ninguna tarea, no se pondría.

actualizarTarea();
// ###############  FUNCION PARA LA FECHA  #########################
function hoyFecha(){
    var hoy = new Date();
        var dd = hoy.getDate();
        var mm = hoy.getMonth()+1;
        var yyyy = hoy.getFullYear();
        
        dd = addZero(dd);
        mm = addZero(mm);

        return dd+'/'+mm+'/'+yyyy;
}

function addZero(i) {
    if (i < 10) {
        i = '0' + i;
    }
    return i;
}

// ##################################################################

function agregarTarea(){

    let fecha = document.createTextNode(hoyFecha());
    //Creas un nuevo span para tarea, asi podras deliminar el texto y usar la fecha unix para identificar cada elemento
    let fechaUnix = Date.now();
    let nombreTarea = document.getElementById('tareaInput').value;
    let nuevoElemento = document.createElement('li');
    let spanTarea = document.createElement('span');
    let parrafoFecha = document.createElement('p');
    let botonEditar = document.createElement('button');
    let botonBorrar = document.createElement('button');
    let iconoEditar = document.createElement('i');
    let iconoBorrar = document.createElement('i');
    let nuevaTarea = document.createTextNode(nombreTarea);
    //Validación si está vacio, agrega la clase is-Valid + mensajeError.
    if (nombreTarea === '') {
        document.getElementById('tareaInput').className = 'form-control mb-2 is-invalid';
        let mensajeError = document.getElementById('mensajeError');
        mensajeError.className = 'form-text text-danger mb-2';
    }
    else{
        // Sino, quita la clase is-invalid y mensajeError  y agrega la nueva tarea.
        document.getElementById('tareaInput').className = 'form-control mb-2';
        mensajeError.className = 'form-text text-danger mb-2 d-none';
    
        //A partir de aqui empieza a CREAR todo el HTML de la TAREA que se agregará.
        nuevoElemento.className = 'list-group-item';

        nuevoElemento.appendChild(parrafoFecha);
    
        parrafoFecha.className = 'badge badge-secondary mr-2';
    
        parrafoFecha.appendChild(fecha);

        //Agregas el Span, y le agregas un atributo ID que corresponda con la fecha unix, para que no haya Ids repetivos.
        spanTarea.appendChild(nuevaTarea);

        spanTarea.setAttribute('id', fechaUnix);

        spanTarea.setAttribute('onclick', 'tacharTarea(this);');
    
        //Agrego el enlace al LI
        nuevoElemento.appendChild(spanTarea);
    
        // ############ SE CREA EL BOTON BORRAR ##########
    
        nuevoElemento.appendChild(botonBorrar);
    
        botonBorrar.className = 'btn btn-sm btn-danger btn-borrar float-right'
    
        botonBorrar.appendChild(iconoBorrar);
    
        iconoBorrar.className = 'fas fa-trash-alt';

        //Agrego la nueva tarea a la lista
        lista.appendChild(nuevoElemento);
        //Al ingresar la tarea, deja el contenido del input vacio.
        document.getElementById('tareaInput').value = '';

        // ##### ALMACENAR DATOS #####

        if (typeof(Storage) !== 'undefined') {

            guardarDatos(hoyFecha(), nombreTarea);
        }
        else{
            alert('El navegador no soporta WebStorage');
        }

    }
    
    actualizarTarea();
}

//Agrega el evento click a TODOS los elementos de la lista para TACHAR Y ELIMINAR la tarea.
//Se hace al principio y despues de agregar una tarea. Si no se haría, entonces los nuevos
//elementos agregados no tendrían los eventos.
function actualizarTarea(){
    for (let i = 0; i < listaTareas.children.length; i++) {
        //Le asigna la funcion tacharTarea a cada elemento de la lista.
        listaTareas.children[i].addEventListener('click', tacharTarea);
        //Le asigna la funcion eliminarTarea a cada elemento de la lista.
        btnBorrar[i].addEventListener('click', eliminarTarea);
    }
}

//Elimina la tarea clickeada.
function eliminarTarea(){
    //Toma el texto interno: fecha + nombre de la tarea
    borrarDatosLS(this.parentElement.innerText);
    //Elimina el elemento padre, en este caso el LI clickeado.
    this.parentElement.remove();
}

function tacharTarea(elem) {
    elem.classList.toggle('done');
}

function guardarDatos(fechaTarea, nombreTarea){
    //Cargo los array con los valores almacenados.
    let fechaTareaGuardada = cargarDatosFechaTarea();
    let nombreTareaGuardada = cargarDatosNombreTarea();

    //Agrego la nueva fecha y la nueva tarea a cada array.
    fechaTareaGuardada.push(fechaTarea);
    nombreTareaGuardada.push(nombreTarea);

    //Lo guardamos en el localStorage.
    localStorage.setItem("datosFechaGuardada", JSON.stringify(fechaTareaGuardada));
    localStorage.setItem("datosNombreTareaGuardada", JSON.stringify(nombreTareaGuardada));
}

// Comprobar que haya elementos en localstorage, retorna un arreglo
function cargarDatosFechaTarea() {
    let fechaGuardada;
    // Si no hay datos de fechas,
    if(localStorage.getItem('datosFechaGuardada') === null) {
        // se crea el vector.
        fechaGuardada = []; 
    } else {
        //sino, se carga lo que contiene en la variable.
        fechaGuardada = JSON.parse(localStorage.getItem('datosFechaGuardada') );
    }
    return fechaGuardada;
}

function cargarDatosNombreTarea() {
    let nombreTareaGuardada;
    // Si NO HAY TAREAS,
    if(localStorage.getItem('datosNombreTareaGuardada') === null) {
        // se crea el vector.
        nombreTareaGuardada = []; 
    } else {
        //sino, se carga lo que contiene en la variable.
        nombreTareaGuardada = JSON.parse(localStorage.getItem('datosNombreTareaGuardada') );
    }
    return nombreTareaGuardada;
}

// CARGAR datos de LocalStorage en la lista
function localStorageListo() {

    let fecha = document.createTextNode(hoyFecha());
    
    let fechaUnix = Date.now();
    fechaGuardada = cargarDatosFechaTarea();
    nombreTareaGuardada = cargarDatosNombreTarea();
    
    //
    //Crea el HTML y carga las tareas almacenadas en LS de acuerdo al nº de tareas que contenga el array.
    for (let i = 0; i < fechaGuardada.length; i++) {
            
        let nuevoElemento = document.createElement('li');
        let spanTarea = document.createElement('span');
        let parrafoFecha = document.createElement('p');
        let botonEditar = document.createElement('button');
        let botonBorrar = document.createElement('button');
        let iconoEditar = document.createElement('i');
        let iconoBorrar = document.createElement('i');
            nuevoElemento.className = 'list-group-item';

            nuevoElemento.appendChild(parrafoFecha);
    
            parrafoFecha.className = 'badge badge-secondary mr-2';
    
            parrafoFecha.innerText = fechaGuardada[i];
            
            //*******************Agregas el Span, y le agregas un atributo ID que corresponda con la fecha unix, para que no haya Ids repetivos
    
            spanTarea.innerText = nombreTareaGuardada[i];
    
            spanTarea.setAttribute('id', fechaUnix);
    
            spanTarea.setAttribute('onclick', 'tacharTarea(this);');
        
            //Agrego el enlace al LI
            nuevoElemento.appendChild(spanTarea);
        
            // ############ SE CREA EL BOTON BORRAR ##########
        
            nuevoElemento.appendChild(botonBorrar);
        
            botonBorrar.className = 'btn btn-sm btn-danger btn-borrar float-right'
        
            botonBorrar.appendChild(iconoBorrar);
        
            iconoBorrar.className = 'fas fa-trash-alt';
    
            //Agrego la nueva tarea a la lista
            listaTareas.appendChild(nuevoElemento);

            actualizarTarea();
        }
    }

    function borrarDatosLS(tareas){
        fechaGuardada = cargarDatosFechaTarea();
        nombreTareaGuardada = cargarDatosNombreTarea();

        //En tareas viene: fecha + nombre de la tarea. Entonces extraemos solo la fecha.
        let borrarFecha = tareas.substr(0,10).trim();
        //En tareas viene: fecha + nombre de la tarea. Entonces extraemos solo el nombre de la tarea.
        let borrarTarea = tareas.substr(10,tareas.length).trim();

        //Recorremos el array.
        nombreTareaGuardada.forEach(function(tarea, index) {
            //Si es igual el nombre de la tarea extraída con la tarea q esta recorriendo,
            if(borrarTarea === tarea) {
                //Se borra el nombre de la tarea. Index indica la posición del bucle
                nombreTareaGuardada.splice(index, 1);
                //Tambien se borra la fecha. Siempre se encontrara en la misma posición que el otro array
                //ya que cuando agregamos una tarea, tambien una fecha, siguen el mismo orden.
                fechaGuardada.splice(index, 1);
                
            }
        });

        //Una vez borrado, volvemos a guardarlo en el LS.
        localStorage.setItem("datosNombreTareaGuardada", JSON.stringify(nombreTareaGuardada));
        localStorage.setItem("datosFechaGuardada", JSON.stringify(fechaGuardada));
    }