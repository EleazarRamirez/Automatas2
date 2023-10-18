const fs = require('fs');

function revisarExpresion(expresion,palabras) {
	const componentes = []; //arreglo donde almacenara los componentes encontrados
	const clavesEncontradas = []; ///aqui se almacenara las palabras encontradas 
	var palabrasReservadas = palabras.split(/\s+/);// aqui guarda cada palabra reservada en un arreglo, use una expresion regular para separar cada palabra
	let index = 0;

	//funcion para validar los componentes validos
	function obtenercomponente() {
		// esta expresion regular esta diseñada para analizar y dividir en diferentes partes un texto
		//las / indican el inicio y fin de lo que se quiere analizar
		// \s identifica los espacios en blanco o los ceros
		//esta expresion ('(?:\\'|[^'])*') identifica una cadena entre comillas y que puede incluir cualquier otra cadena que no sea comillas
		// |\w+ esta expresion identifica palabras que pueden tener letras y numeros
		// |[(),] esta identifica parentesis y comas
		// |. esta expresion identifica cualquier caracter que no se indentifique a las anteriores
		// \s* identifica los ceros y cualquier espacion en blanco que este despues de cada componente encontrado
		//y la g indica que la expresion deber realizarse a todo el texto.
		const cadena = /\s*('(?:\\'|[^'])*'|\w+|[(),]|.)\s*/g;
		cadena.lastIndex = index;
		const conexion = cadena.exec(expresion);

		if(conexion){
			const componente = conexion[1];
			index = cadena.lastIndex;
			return componente;
		}
		return null;
	}

// funcion que compara cada palabra del texto que se desea analizar y compara con las palabras reservadas en nuestra lista y devuelve true si la encuentra y false si no
function compararPalabra(comp){
	for(let i=0; i<palabrasReservadas.length;i++){
		if(palabrasReservadas[i] == comp){
			return true;
		}
	}
	return false;
}

 //en esta funcion se asegura de recorrer toda la expresion
	function analizar(){
		let componente;
		let i = 0;
		var comillas = /['"]/g;
		while((componente = obtenercomponente())){
			//esta expresion encuentra las comillas que tenga el componente encontrado y regresa cada comilla en un arreglo
			var comilla = componente.match(comillas);
			//esta expresion elimina las comillas simples y dobles que tenga la palabra encotrada y solo regresa la palabra sin comillas
			var palabraSinComillas = componente.replace(/['"]/g, '');
			if (comilla) {
				//mapea el arreglo de las comillas y la pasa una por una al arreglo principal(componentes), esto solo si encontro comillas y agrega la palabra por separado
				for (let i = 0; i < comilla.length; i++) {
				  componentes.push(comilla[i]);
				  compararPalabra(comilla[i]);
				}
   				 componentes.push(palabraSinComillas);
   				 clavesEncontradas.push(palabraSinComillas+ ' Es texto');
			  }else{
			  	componentes.push(componente);
			  	if(compararPalabra(componente)){
			  		clavesEncontradas.push(componente+' es una palabra reservada');
			  	}
			  }
			
		}
		console.log(clavesEncontradas);
	}
	analizar();

	return componentes;
	
}

fs.readFile('texto.text','utf8', (err,dato) =>{
	if (err) { 
    console.error(err);
    return;
  }
  fs.readFile('palabrasR.text','utf8', (error, palabrasReservadas)=>{
  	if(error){
  		console.log(error);
  		return;
  	}

  	const expresion = dato;
  	const palabrasR = palabrasReservadas;
	const resultado = revisarExpresion(expresion,palabrasR);
	console.log(resultado);
  });
});