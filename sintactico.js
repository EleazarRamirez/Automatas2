const fs = require('fs');

function revisarExpresion(expresion,palabras) {
    const componentes = []; //arreglo donde almacenara los componentes encontrados
    const clavesEncontradas = [];
    var palabrasReservadas = palabras.split(/\s+/g);
    const Sintaxis = [];
    let index = 0;

    const arreglosDeID = {
          21: [23,41,43,44,7,45,47],    //SELECT
          22: [23,2],   //FROM
          23: [22,8,30,4,98,99,9,10,37,2,3,57,21,8,26,32,33,34,31,36,1,5,6,48,40,106,107],  //PALABRA
          7: [22,23,24],    //*
          5: [23],  // . PUNTO
          24:[27,1],    //NUMERO
          26: [23,187], //WHERE
          8: [19,23,24,2],     //= IGUAL
          19: [25,19,4,1,3],    // ' COMILLA SIMPLE
          25: [19], //TEXTO
          4: [3,1,23,43],   // , COMA
          3:[30,9,10,8],    // )         
          41:[23,186],  //DISTINCT
          37:[38],  //ORDER
          38:[23,187,188],  //BY
          42:[24],  //LIMIT
          39:[38],  //GROUP
          40:[23,43],   //HAVING
          31:[23,2],    //JOIN
          32:[31],  //INNER
          33:[31],  //LEFT
          34:[31],  //RIGHT
          43:[2],   //COUNT
          44:[2],   //AVG
          45:[2],   //SUM
          46:[2],   //MAX
          47:[2],   //MIN
          30:[23],  //AS
          51:[19],  //LIKE
          52:[2,19],    //IN
          50:[24],  //BETWEEN
          48:[49,29],   //IS
          29:[49],  //NOT
          49:[1,27],    //NULL
          106:[1],  //DESC
          107:[1],  //ASC
          1: [1]    // ; punto y coma
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
    // Esta función recorre el array 'palabrasReservadas' y compara cada elemento con 'comp'.
    // Si encuentra una coincidencia, agrega el índice + 1 al array 'clavesEncontradas' y devuelve true.
    // Si no encuentra coincidencias, agrega 23 al array 'clavesEncontradas' y devuelve false.
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
    // Esta función recorre el array 'clavesEncontradas' y extrae cada token en el arreglo 'arreglosDeID' en la posición 'clavesEncontradas[j]'.
    // Luego, recorre cada token buscando el siguiente elemento en 'clavesEncontradas'. Si encuentra una coincidencia, significa que la sintaxis es correcta.
    // Si no encuentra coincidencias, indica que hay un error de sintaxis.
    for(let j=0; j<clavesEncontradas.length; j++){
            const token = arreglosDeID[clavesEncontradas[j]];
           if(token != null){
            let k=0;
                while(token[k] != clavesEncontradas[j+1]){
                    if(k < token.length){
                        k++;
                    }else{
                        console.log("Error de Sintaxis");
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
                if(isNaN(componente) === false){
                    //solo agrega el token al arreglo
                    clavesEncontradas.push(24);
                }else{
                    if(parseFloat(componente).toString()=== componente){
                        clavesEncontradas.push(24);
                    }else{
                        compararPalabra(componente);
                    }
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