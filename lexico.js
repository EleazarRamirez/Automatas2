const fs = require('fs');

function revisarExpresion(expresion) {
	const componentes = []; //arreglo donde almacenara los componentes encontrados
	let index = 0;

	//funcion para validar los componentes validos
	function obtenercomponente() {
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
 //en esta funcion se asegura de recorrer toda la expresion
	function analizar(){
		let componente;
		let i = 0;
		while((componente = obtenercomponente())){
			componentes.push(componente);
		}
	}
	analizar();

	return componentes;
}

fs.readFile('texto.text','utf8', (err,dato) =>{
	if (err) { 
    console.error(err);
    return;
  }
	const expresion = dato;
	const resultado = revisarExpresion(expresion);
	console.log(resultado);
});