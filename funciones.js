let arregloTareas = new Array();
let elementosGuardados = 0;

let done = new Audio('terminado.mp3');
let undone = new Audio('error.mp3');

function init(){
	if('serviceWorket' in navigator){
		navigator.serviceWorket.registrer('sw.js').then(function(registration){
		//si es exitoso
		console.log('SW registrado correctamente');
	}, function(err){
		//si falla
		console.log('SW fallo', err);
	});
	} else{
		console.log("ERROR")
	}


	let fecha = new Date();
	let mesNumero = fecha.getMonth();
	let mes = "";


	//si ya existe tareas guardas en el local storage , las vamos a obtener en la interfaz
	if(localStorage.getItem('tareas')){
		tareas = JSON.parse(localStorage.getItem('tareas'));
		for(i=0; i<tareas.length; i++){
			arregloTareas.push(tareas[i]);

		}
		//mandar llamar una funcion que cargue las tareas en la interfaz
		loadTareas();

	}else{
		//si no hay tareas crear el espacio de memoria en local storage 
		//creamos el objeto vacio
		jsonTares = {};
		localStorage.setItem('tareas',JSON.stringify(jsonTares));
	}

	switch(mesNumero){
	case 0: 
		mes = "Enero";
		break;
	case 1: 
		mes = "Febrero";
		break;
	case 2: 
		mes = "Marzo";
		break;
	case 3: 
		mes = "Abril";
		break;
	case 4: 
		mes = "Mayo";
		break;
	case 5: 
		mes = "Junio";
		break;
	case 6: 
		mes = "Julio";
		break;

	case 7: 
		mes = "Agosto";
		break;

	case 8: 
		mes = "Septiembre";
		break;
	case 9: 
		mes = "Octubre";
		break;

	case 10: 
		mes = "Noviembvre";
		break;
	case 11: 
		mes = "Diciembre";
		break;

	}
	document.getElementById('fecha').innerHTML = fecha.getDate() + " de "+mes;
	
}

function loadTareas(){
	//antes de cargar las tareas limpiamos la interfaz
	document.querySelector('.porhacer').innerHTML="";
	document.querySelector('.terminado').innerHTML="";
	//cargar las tareas de local storage
	for(i=0; i<tareas.length; i++){
		//crear los elementos en HTML
		elemento = "<div class='container' id='"+i+"' onclick='cambiarEstado(this.id)'>"+
		        "<input type='checkbox' class='style-check'>"+
		        "<p>"+tareas[i].valor+"</p>"+
				"</div>";
		//vamos a dividir las tareas por su estado para poderlas plasmar en el espacxio html correspondiente
		if (tareas[i].estatus == "pendiente") {
			document.querySelector('.porhacer').innerHTML += elemento;
		}else if(tareas[i].estatus == "terminado"){
			document.querySelector('.terminado').innerHTML += elemento;

		}


	}//for
	elementosGuardados = tareas.length;
}

function agregar() {
	//capturar el elemeto de la entrada de texto
	tareaTexto = document.getElementById('nuevaTarea');


	//Nuevo objeto JS
	jsonTarea = {
		'valor':tareaTexto.value,
		'estatus':'pendiente'
	};

	//crear nuevo elemento en la interfaz de usuarios
	elemento = "<div class='container' id='"+elementosGuardados+"' onclick='cambiarEstado(this.id)'>"+
		        "<input type='checkbox' class='style-check'>"+
		        "<p>"+jsonTarea.valor+"</p>"+
			"</div>"; 
			
	//lo agrego a la interfaz
	document.querySelector('.porhacer').innerHTML += elemento;

	//agregar al arreglo de JSON la nueva tarea
	arregloTareas.push(jsonTarea);

	// agregar al local storage el arreglo de JSON en formato texto
	localStorage.setItem('tareas', JSON.stringify(arregloTareas));

	//limpiar cuadro de texto (input)
	tareaTexto.value = '';

	//incrementamos los elementos guardados
	elementosGuardados++; 

}

function cambiarEstado(id) {
	tareas = JSON.parse(localStorage.getItem('tareas'));
	if(tareas[id].estatus == 'terminado'){
		tareas[id].estatus = 'pendiente';
		//ejecutar sonido
		undone.play();
	}else{
		//ejecutar sonido
		done.play();
		tareas[id].estatus = 'terminado';
	}
	//guardarlo nuevamente en Local Storage
	localStorage.setItem('tareas', JSON.stringify(tareas));

	//recargar
	loadTareas();
	
}




