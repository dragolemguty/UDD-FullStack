let arrEncuestas = [];

let pregunta0 = {
    'enunciado':'Cual es la capital de Chile?',
    'tipo':'Alternativas',
    'cantidad':5,
    'opciones':['Temuco','Valdivia','Rancagua','Santiago','Coquimbo'],
    'respuesta':'Santiago'
};


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
                        resp=inputValue;
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
                            resolve(result.value);
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
Inicio(arrEncuestas);