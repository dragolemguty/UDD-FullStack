let arrEncuestas = [];
let preguntasEncuesta = [];

class Encuesta {
    constructor(nombre,cantidad,preguntas){
        this.nombre=nombre;
        this.cantidad=cantidad;
        this.preguntas=preguntas;
        this.respuestas=[];
    }

}


let encuesta1 = new Encuesta(
    'Encuesta 1: ser o no ser',
    2,
    preguntasEncuesta
)


class Pregunta {
    constructor(enunciado,tipo){
        this.enunciado=enunciado;
        this.tipo=tipo;
        this.cantidad;
        this.opciones;
        this.correcta;
        this.tipos=['Alternativa','Binaria: Verdadero o Falso','Binaria: Si o No','Abierta'];
    }
    estructurar(){
        if(this.tipo === 'Alternativa'){
            console.log('Hacer preguntas')

        }
        else if(this.tipo === 'Binaria: Verdadero o Falso'){
            console.log('Hacer V/F')
            this.cantidad=2
            this.opciones=['Verdadero','Falso']

        }
        else if(this.tipo === 'Binaria: Si o No'){
            console.log('Hacer Si/No')
            this.cantidad=2
            this.opciones=['Si','No']

        }
        else if(this.tipo === 'Abierta'){
            console.log('Pregunta abierta')
            this.cantidad=1
            this.opciones=['N/A']
            this.correcta=['N/A']

        }

    }
    set setCant(cantidad){
        this.cantidad = cantidad;
    }
    set setOpciones(opciones){
        this.opciones = opciones;
    }
    set setRespuesta(correcta){
        this.correcta = correcta;
    }

}

let pregunta1 = new Pregunta('Cual es la capital de Chile?', 'Alternativa')
pregunta1.cantidad=5
pregunta1.opciones=['Temuco','Valdivia','Rancagua','Santiago','Coquimbo']
pregunta1.correcta='Santiago'

let pregunta2 = new Pregunta('Soy hombre?', 'Binaria: Si o No')
pregunta2.correcta='Si'

let pregunta3 = new Pregunta('Eres...?', 'Alternativa')
pregunta3.cantidad=2
pregunta3.opciones=['¿Eres el más fuerte porque eres Satoru Goyo?','¿o eres Satoru Goyo porque eres el más fuerte?']
pregunta3.correcta='---'


console.log(pregunta3.cantidad)
console.log(pregunta1.tipos)
console.log(pregunta1.tipos[0])
console.log(pregunta1.enunciado)
pregunta1.estructurar()
pregunta2.estructurar()
//console.log(pregunta1.estructurar())
console.log(pregunta1)
console.log(pregunta2)
preguntasEncuesta.push(pregunta1)
preguntasEncuesta.push(pregunta2)
//preguntasEncuesta.push(pregunta2)
preguntasEncuesta.push(pregunta3)
arrEncuestas.push(encuesta1)

encuesta1.respuestas.push(['owowowo'])
encuesta1.respuestas.push(['N/A','N/A'])
//arrEncuestas.push(encuesta)
console.log(encuesta1)
console.log(arrEncuestas)
console.log(encuesta1.respuestas)
console.log(encuesta1.respuestas.slice(-1))
console.log(encuesta1.respuestas.slice(-1).length)
console.log(encuesta1.respuestas.slice(-1)[0].length)
console.log(encuesta1.respuestas.slice(-1)[0][0])

console.log(encuesta1.preguntas.length)

function Inicio(arrEncuestas) {
    Swal.fire({
        showDenyButton: true,
        title: '¿Qué desea hacer?:',
        confirmButtonText: 'Contestar encuestas existentes',
        denyButtonText: 'Generar una encuesta',
    }).then((result) => {
        if (result.isConfirmed) {
            mostrarEncuestas(arrEncuestas);
        } else if (result.isDenied) {
            generarEncuesta(arrEncuestas);
        }
      });
}



function mostrarEncuestas(arrEncuestas) {
    let id;
    Swal.fire({
        title: 'Escoja ID de encuesta deseada:',
        html: arrEncuestas.map((encuesta, index) => `<p align='left'><strong>${index}</strong>: ${encuesta.nombre}`).join('<br />'),
        input: 'number',
        confirmButtonText: 'Aceptar',
        preConfirm: (inputValue) => {
            let l = arrEncuestas.length;
            if (inputValue >= 0 && inputValue < l && inputValue!=='') {
                id=inputValue;
                //console.log(id)
                return 'correcto';
            } else {
                return 'error';
            }
        }
    }).then((result) => {
        if (result.value === 'correcto') {
            Swal.fire({
                title: 'ID Correcta',
                text: 'ID de encuesta deseada ingresada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                ResponderEncuesta(arrEncuestas[id]);
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'El valor ingresado no corresponde a los ID de encuestas.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                mostrarEncuestas(arrEncuestas);
            });
        }
    });
}


function ResponderEncuesta(encuesta) {
    let index = 0;
    let respuestas = [];

    function responderSiguientePregunta() {
        if (index < encuesta.preguntas.length) {
            let pregunta = encuesta.preguntas[index];
            let promesaRespuesta;

            if (pregunta.tipo === 'Alternativa') {
                promesaRespuesta = ResponderPreguntaA(pregunta);
            } else if (pregunta.tipo === 'Binaria: Verdadero o Falso') {
                promesaRespuesta = ResponderPreguntaB(pregunta);
            } else if (pregunta.tipo === 'Binaria: Si o No') {
                promesaRespuesta = ResponderPreguntaC(pregunta);
            } else if (pregunta.tipo === 'Abierta') {
                promesaRespuesta = ResponderPreguntaD(pregunta);
            }

            promesaRespuesta.then((respuesta) => {
                respuestas.push(respuesta);
                index++;
                responderSiguientePregunta();
            }).catch((error) => {
                console.error(error);
            });
        } else {
            encuesta.respuestas.push(respuestas);
            mostrarResultados(encuesta);
        }
    }

    responderSiguientePregunta();
}

function ResponderPreguntaA(pregunta) {
    let resp;
    return new Promise((resolve, reject) => {
        function mostrarPregunta() {
            Swal.fire({
                title: pregunta.enunciado,
                html: pregunta.opciones.map((ops, index) => `<p align='left'><strong>${index}</strong>: ${ops}`).join('<br />'),
                input: 'number',
                confirmButtonText: 'Aceptar',
                preConfirm: (inputValue) => {
                    let l = pregunta.opciones.length;
                    if (inputValue >= 0 && inputValue < l && inputValue!=='') {
                        resp=pregunta.opciones[inputValue];
                        return inputValue;
                    } else {
                        throw new Error('Respuesta inválida');
                    }
                }
            }).then((result) => {
                Swal.fire({
                            title: 'ID Correcta',
                            text: 'ID de respuesta ingresada correctamente',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(() => {
                            resolve(resp);
                        })
            }).catch((error) => {
                Swal.fire({
                    title: 'Error',
                    text: 'El valor ingresado no corresponde a los ID de respuestas.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    mostrarPregunta(); 
                });
            });
        }

        mostrarPregunta(); 
    });
}



function ResponderPreguntaB(pregunta) {
    return new Promise((resolve, reject) => {
        Swal.fire({
            showDenyButton: true,
            title: pregunta.enunciado,
            confirmButtonText: 'Verdadero',
            denyButtonText: 'Falso',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Respuesta registrada',
                    text: 'Respuesta ingresada correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    resolve('Verdadero');
                })
                
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Respuesta registrada',
                    text: 'Respuesta ingresada correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    resolve('Falso');
                })                
            } else {
                reject('Respuesta inválida');
            }
        });
    });
}


function ResponderPreguntaC(pregunta) {
    return new Promise((resolve, reject) => {
        Swal.fire({
            showDenyButton: true,
            title: pregunta.enunciado,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Respuesta registrada',
                    text: 'Respuesta ingresada correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    resolve('Si');
                })
                
            } else if (result.isDenied) {
                Swal.fire({
                    title: 'Respuesta registrada',
                    text: 'Respuesta ingresada correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    resolve('No');
                })
                
            } else {
                reject('Respuesta inválida');
            }
        });
    });
}

function ResponderPreguntaD(pregunta) {
    return new Promise((resolve, reject) => {
        function mostrarPregunta2() {
            Swal.fire({
                title: pregunta.enunciado,
                input: 'text',
                confirmButtonText: 'Aceptar',
                preConfirm: (inputValue) => {
                    if (inputValue.length > 0 && inputValue!=='') {
                        return inputValue;
                    } else {
                        throw new Error('Respuesta inválida');
                    }
                }
            }).then((result) => {
                Swal.fire({
                            title: 'Respuesta Ingresada',
                            text: 'Respuesta ingresada correctamente',
                            icon: 'success',
                            confirmButtonText: 'Aceptar'
                        }).then(() => {
                            resolve(result.value);
                        })
            }).catch((error) => {
                Swal.fire({
                    title: 'Error',
                    text: 'El valor ingresado es menor a 1 carácter.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    mostrarPregunta2(); 
                });
            });
        }

        mostrarPregunta2(); 
    });
}


function mostrarResultados(encuesta){
    Swal.fire({
        title: `Resultados Encuesta: <br />` + encuesta.nombre,
        html: encuesta.preguntas.map((preg, index) => 
        `<p align='left'><strong>Pregunta ${index}</strong>: ${preg.enunciado}<br />
         <strong>----Respondido</strong>: ${encuesta.respuestas.slice(-1)[0][index]}<br />
         <strong>----Respuesta Correcta</strong>: ${preg.correcta}`).join('<br />'),
        icon: 'info',
        confirmButtonText: 'Aceptar'
    }).then(() => {
        Inicio(arrEncuestas); 
    });

}

function generarEncuesta(arrEncuestas){
    let nombre;
    let cant;
    let preguntasEncuesta=[]
    pedirTitulo(arrEncuestas,nombre,cant,preguntasEncuesta)
}


function pedirTitulo(arrEncuestas,nombre,cantidad,preguntasEncuesta) {
    Swal.fire({
        title: 'Ingrese título de encuesta nueva:',
        input: 'text',
        confirmButtonText: 'Aceptar',
        preConfirm: (inputValue) => {
            if (inputValue.length > 2) {
                nombre=inputValue
                return 'correcto';
            } else {
                return 'error';
            }
        }
    }).then((result) => {
        if (result.value === 'correcto') {
            Swal.fire({
                title: 'Dato Ingresado',
                text: 'Título ingresado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                pedirCant(arrEncuestas,nombre,cantidad,preguntasEncuesta);
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'El valor ingresado es menor a 2 carácteres.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                pedirTitulo(arrEncuestas,nombre,cantidad,preguntasEncuesta);
            });
        }
    });
}

function pedirCant(arrEncuestas,nombre,cantidad,preguntasEncuesta) {
    Swal.fire({
        title: 'Ingrese la cantidad de preguntas que tendrá la encuesta:',
        //html: 'Cantidad:',
        input: 'number',
        confirmButtonText: 'Aceptar',
        preConfirm: (inputValue) => {
            if (inputValue > 0 ) {
                cantidad = inputValue;
                return 'correcto';
            } else {
                return 'error';
            }
        }
    }).then((result) => {
        if (result.value === 'correcto') {
            Swal.fire({
                title: 'Dato Ingresado',
                text: 'Cantidad de preguntas deseadas ingresada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {                
                let encuestaN = new Encuesta(
                    nombre,
                    cantidad,
                    preguntasEncuesta
                );
                pedirPreguntas(arrEncuestas,encuestaN);
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Cantidad debe ser mayor a 0.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                pedirCant(arrEncuestas,nombre,cantidad,preguntasEncuesta);
            });
        }
    });
}

function pedirPreguntas(arrEncuestas,encuestaN){
    let index = 0;
    function generarSiguientePregunta(){
        let enunciado;
        let tipo;
        if (index < encuestaN.cantidad) {

            pedirEnunciado().then((resp) => {
            console.log('ABER')
            console.log(resp)
            console.log(resp[0])
            console.log(resp[1])
            console.log('ABER2')
            enunciado=resp[0]
            tipo=resp[1]

            let preguntaN = new Pregunta(enunciado, tipo)
            preguntaN.estructurar()

            if (preguntaN.tipo === 'Alternativa') {
                generarPreguntaA(preguntaN).then((preg) => {
                    encuestaN.preguntas.push(preg)
                    index++;
                    generarSiguientePregunta();
                }).catch((error) => {
                    console.error(error);
                });
            } else if (preguntaN.tipo === 'Binaria: Verdadero o Falso' || preguntaN.tipo === 'Binaria: Si o No') {
                generarPreguntaBC(preguntaN).then((preg) => {
                    encuestaN.preguntas.push(preg)
                    index++;
                    generarSiguientePregunta();
                }).catch((error) => {
                    console.error(error);
                });
            } else if (preguntaN.tipo === 'Abierta') {
                encuestaN.preguntas.push(preguntaN)
                index++;
                generarSiguientePregunta();                
            }

            }).catch((error) => {
                console.error(error);
            });
        } else {
            arrEncuestas.push(encuestaN);
            Inicio(arrEncuestas);
        }
    }
    generarSiguientePregunta()
}

function pedirEnunciado(){
    return new Promise((resolve, reject) => {
        let resp=[]
        Swal.fire({
            title: 'Ingrese enunciado de pregunta nueva:',
            input: 'text',
            confirmButtonText: 'Aceptar',
            preConfirm: (inputValue) => {
                if (inputValue.length > 2) {
                    resp.push(inputValue)
                    console.log(resp)
                    //resolve(resp);
                    return 'correcto';
                    
                } else {
                    //reject('error');
                    return 'error';
                }
            }
        }).then((result) => {
            if (result.value === 'correcto') {
                Swal.fire({
                    title: 'Dato Ingresado',
                    text: 'Enunciado ingresado correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    pedirTipo(resp).then((updatedResp) => {
                        resolve(updatedResp);
                    }).catch((error) => {
                        reject(error);
                    });
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'El valor ingresado es menor a 2 carácteres.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    pedirEnunciado().then((updatedResp) => {
                        resolve(updatedResp);
                    }).catch((error) => {
                        reject(error);
                    });
                });
            }
        });

    })
}

function pedirTipo(resp){
    return new Promise((resolve, reject) => {
        console.log(resp)
        let preguntaEj = new Pregunta('asdasdas', 'Alternativa')        
        Swal.fire({
            title: 'Ingrese el ID de tipo de pregunta nueva:',
            html: preguntaEj.tipos.map((tip, index) => `<p align='left'><strong>${index}</strong>: ${tip}`).join('<br />'),
            input: 'number',
            confirmButtonText: 'Aceptar',
            preConfirm: (inputValue) => {
                let l = preguntaEj.tipos.length;
                if (inputValue >= 0 && inputValue < l && inputValue!=='') {
                    resp.push(preguntaEj.tipos[inputValue]);
                    console.log(resp)
                    //console.log(id)
                    //resolve(resp);
                    return 'correcto';
                } else {
                    //reject('error');
                    return 'error';
                }
            }
        }).then((result) => {
            if (result.value === 'correcto') {
                Swal.fire({
                    title: 'ID Correcta',
                    text: 'ID de encuesta deseada ingresada correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    resolve(resp);
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'El valor ingresado no corresponde a los ID de encuestas.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    pedirTipo(resp).then((updatedResp) => {
                        resolve(updatedResp);
                    }).catch((error) => {
                        reject(error);
                    });
                });
            }
        });
    })
}
function generarPreguntaA(pregunta){
    return new Promise((resolve, reject) => {
        let cantidad;
        Swal.fire({
            title: 'Cantidad de alternativas',
            html: 'Ingrese la cantidad de alternativas que tendrá la pregunta:',
            input: 'number',
            confirmButtonText: 'Aceptar',
            preConfirm: (inputValue) => {
                if (inputValue > 0 ) {
                    cantidad = inputValue;
                    return 'correcto';
                } else {
                    return 'error';
                }
            }
        }).then((result) => {
            if (result.value === 'correcto') {
                Swal.fire({
                    title: 'Dato Ingresado',
                    text: 'Cantidad de alternativas deseadas ingresada correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    pregunta.cantidad = cantidad;
                    return pedirAlternativas(pregunta);
                }).then((alt) => {
                    pregunta.opciones = alt;
                    console.log(alt);
                    console.log(pregunta.opciones);
                    return pedirCorrecta(pregunta);
                }).then((respuestaCorrecta) => {
                    pregunta.correcta = respuestaCorrecta;
                    console.log(pregunta.correcta);
                    resolve(pregunta);
                }).catch((error) => {
                    console.error(error);
                    reject(error)
                });               
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Cantidad debe ser mayor a 0.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    generarPreguntaA(pregunta);
                });
            } 

        });
    })
}

function generarPreguntaBC(pregunta){
    return new Promise((resolve, reject) => {
        pedirCorrecta(pregunta).then((respuestaCorrecta) => {
            pregunta.correcta = respuestaCorrecta;
            console.log(pregunta.correcta);
            resolve(pregunta);
            }).catch((error) => {
                console.error(error);
                reject(error)
            });
        })
}




function pedirAlternativas(pregunta) {
    return new Promise((resolve, reject) => {
    let arrOps = [];
    let index = 0;

    function siguienteAlternativa() {
        return new Promise((resolve, reject) => {
            let resp
            Swal.fire({
                title: 'Ingrese alternativa de pregunta:',
                input: 'text',
                confirmButtonText: 'Aceptar',
                preConfirm: (inputValue) => {
                    if (inputValue.length > 0) {
                        resp=inputValue;
                        return 'correcto';                        
                    } else {
                        //reject('error');
                        return 'error';
                    }
                }
            }).then((result) => {
                if (result.value === 'correcto') {
                    Swal.fire({
                        title: 'Dato Ingresado',
                        text: 'Alternativa ingresada correctamente',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        
                        console.log(resp)
                        resolve(resp);
                        
                    }).catch((error) => {
                        reject(error);
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'El valor ingresado es menor a 1 carácteres.',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    }).then(() => {
                        siguienteAlternativa().then((updatedResp) => {
                            resolve(updatedResp);
                        })
                    }).catch((error) => {
                        reject(error);})
                }
            }).catch((error) => {
                reject(error);
            });
        });
    }

    function iterarAlternativas() {
        if (index < pregunta.cantidad) {
            siguienteAlternativa().then((alternativa) => {
                arrOps.push(alternativa);
                index++;
                iterarAlternativas();
            }).catch((error) => {
                console.error(error);
                reject(error);
            });
        } else {
            console.log(arrOps)
            resolve(arrOps)
        }
    }

    return iterarAlternativas();
    })
}

function pedirCorrecta(pregunta){
    let corr;
    return new Promise((resolve, reject) => {
        console.log(pregunta)       
        Swal.fire({
            title: 'Ingrese el ID de la respuesta correcta:',
            html: pregunta.opciones.map((opp, index) => `<p align='left'><strong>${index}</strong>: ${opp}`).join('<br />'),
            input: 'number',
            confirmButtonText: 'Aceptar',
            preConfirm: (inputValue) => {
                let l = pregunta.opciones.length;
                if (inputValue >= 0 && inputValue < l && inputValue!=='') {
                    corr=pregunta.opciones[inputValue];
                    //console.log(corr)
                    //console.log(id)
                    //resolve(resp);
                    return 'correcto';
                } else {
                    //reject('error');
                    return 'error';
                }
            }
        }).then((result) => {
            if (result.value === 'correcto') {
                Swal.fire({
                    title: 'ID Correcta',
                    text: 'ID de respuesta ingresada correctamente',
                    icon: 'success',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    resolve(corr);
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'El valor ingresado no corresponde a los ID de respuestas.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    pedirCorrecta(pregunta).then((updatedResp) => {
                        resolve(updatedResp);
                    }).catch((error) => {
                        reject(error);
                    });
                });
            }
        });
    })
}

Inicio(arrEncuestas);

// let pregunta5 = new Pregunta('Cual es la capital de Chile?', 'Alternativa')
// pregunta1.cantidad=5
// pregunta1.opciones=['Temuco','Valdivia','Rancagua','Santiago','Coquimbo']
// pregunta1.correcta='Santiago'

// let pregunta6 = new Pregunta('Soy hombre?', 'Binaria: Si o No')
// pregunta6.correcta='Si'
// pregunta6.estructurar()

// let pregunta7 = new Pregunta('Soy hombre?', 'Abierta')
// pregunta7.correcta='Si'
// pregunta7.estructurar()

// console.log(pregunta7.correcta)
// generarPreguntaBC(pregunta7)
// console.log(pregunta7.correcta)