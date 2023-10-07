const fs = require('fs');

function analizadorLexico(expresion) {
  const tokens = {};
  let index = 0;

//esta funcion se llama de manera recursiva para agregar tokens validos
  function obtenerToken() {
    const cadena = /\s*('(?:\\'|[^'])*'|\w+|[(),]|.)\s*/g;
    cadena.lastIndex = index;
    const match = cadena.exec(expresion);

    if (match) {
      const token = match[1];
      index = cadena.lastIndex;
      return token;
    }

    return null;
  }
//en esta funcion se asegura de recorrer toda la expresion
  function analizar() {
    let token;
    let i=0;
    while ((token = obtenerToken())) {
      switch(token){//identifica cada palabra y si esta reservado lo asignamos en el objeto
      case "SELECT": tokens.Palabra_Reservada = token; break;
      case '*': tokens.identificador = token; break;
      case 'FROM' : tokens.PalabraReservada = token; break;
      case 'WHERE' : tokens.Palabra_reservada = token; break;
      case 'users': tokens.Identificador = token; break;
      case 'nombre' : tokens.identificador1 = token; break;
      case '=' : tokens.Operador = token; break;
      case ';' : tokens.PuntoyComa = token; break;
      case ' ' : break;
      default : tokens.String = token;
      }
    }
  }

  analizar();

  return tokens;
}

fs.readFile('texto.text','utf8', (err,dato) =>{
	if (err) { 
    console.error(err);
    return;
  }
	const expresion = dato;
	const resultado = analizadorLexico(expresion);
	console.log(resultado);
});
