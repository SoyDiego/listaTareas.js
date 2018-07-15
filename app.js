let btnAgregar = document.getElementById('btn-agregar');
let btnBorrar = document.getElementsByClassName('btn-borrar');
let listaTareas = document.getElementById('lista');

btnAgregar.addEventListener('click', agregarTarea);
//Se hace al principio ya que la lista tiene 3 elementos.
//Si no tuviese ninguna tarea, no se pondría.
actualizarTarea();


function agregarTarea(){
    let nombreTarea = document.getElementById('tareaInput').value;
    let nuevoElemento = document.createElement('li');
    let enlace = document.createElement('a');
    let boton = document.createElement('button');
    let icono = document.createElement('i');
    let nuevaTarea = document.createTextNode(nombreTarea);
    let textoBorrar = document.createTextNode(' Borrar');

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
        //Le indico los atributos al enlace
        enlace.setAttribute('href', '#');
        //Le indico la clase al enlace
        enlace.className = 'float-left';

        //Agrego el texto/nombre de la tarea al enlace
        enlace.appendChild(nuevaTarea);

        //Agrego el enlace al LI
        nuevoElemento.appendChild(enlace);

        nuevoElemento.appendChild(boton);

        boton.className = 'btn btn-sm btn-danger btn-borrar float-right'

        boton.appendChild(icono);

        icono.className = 'fas fa-trash-alt';

        icono.appendChild(textoBorrar);

        //Agrego la nueva tarea a la lista
        lista.appendChild(nuevoElemento);
        //Al ingresar la tarea, deja el contenido del input vacio.
        document.getElementById('tareaInput').value = '';
    }

    actualizarTarea();
}

//Agrega el evento click a TODOS los elementos de la lista para TACHAR Y ELIMINAR la tarea.
//Se hace al principio y despues de agregar una tarea.
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
    this.parentElement.remove();
}

function tacharTarea(){
    if (this.children[0].style.textDecoration == 'line-through') {
        this.children[0].style.textDecoration = 'none';
    }
    else{
        this.children[0].style.textDecoration = 'line-through';
    }
    
}



