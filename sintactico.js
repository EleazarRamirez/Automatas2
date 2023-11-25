const fs = require('fs');

function revisarExpresion(expresion,palabras) {
    const componentes = []; //arreglo donde almacenara los componentes encontrados
    const clavesEncontradas = [];
    var palabrasReservadas = palabras.split(/\s+/g);
    const Sintaxis = [];
    let index = 0;

    const arreglosDeID = {
          21: [23,41,43,44,7],
          22: [23],
          23: [22,7,30,4,98,99,9,10,37,2,3,57,21,8,26],
          7: [22,23,24],
          26: [23],
          8: [19,23,24,2],
          19: [25,19,4,1,3],
          25: [19],
          4: [3,1,23],
          1: [1]
        };

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

function compararPalabra(comp){
    for(let i=0; i<palabrasReservadas.length;i++){
        if(palabrasReservadas[i] == comp){
            clavesEncontradas.push(i+1);
            return true;
        }
    }
    clavesEncontradas.push(23);
    return false;
}

function validarSintaxis(){
    for(let j=0; j<clavesEncontradas.length; j++){
            const token = arreglosDeID[clavesEncontradas[j]];
           if(token != null){
                for(let k=0; k<token.length;k++){
                    if(token[k] === clavesEncontradas[j+1]){
                        //si entro aqui la sintaxis va bien
                        break;
                    }else{
                        if(clavesEncontradas.length-1 === j){
                            console.log("Sintaxis Correcto!!");
                        }
                        if(k === token.length-1 && clavesEncontradas[j] != 1){
                            console.log("Error en Sintaxis en la clave: "+j);
                        }
                        break;
                    }
                }
            }
        }
        return null;
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
                    compararPalabra(comilla[i]);
                    if(i % 2){
                        componentes.push(comilla[i]);
                    }else{
                        componentes.push(comilla[i]);
                        componentes.push(palabraSinComillas);
                        clavesEncontradas.push(25);
                    }
                }
              }else{
                componentes.push(componente);
                if(compararPalabra(componente)){
                    //solo agrega el token al arreglo
                }
              }
            
        }
    }
    analizar();
    console.log(clavesEncontradas);
    validarSintaxis();

        
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