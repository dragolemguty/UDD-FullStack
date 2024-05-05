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
preguntasEncuesta.push(pregunta3)
arrEncuestas.push(encuesta1)

encuesta1.respuestas.push(['owowowo'])
encuesta1.respuestas.push(['N/A','N/A'])
//arrEncuestas.push(encuesta)
console.log(encuesta1)
console.log(arrEncuestas)

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
            if (inputValue >= 0 && inputValue < l) {
                id=inputValue;
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
    let respuestas=[];
    encuesta.preguntas.forEach(pregunta =>{
        let resp;
        if(pregunta.tipo==='Alternativa'){
            resp=ResponderPreguntaA(pregunta)
        }
        else if(pregunta.tipo==='Binaria: Verdadero o Falso'){
            resp=ResponderPreguntaB(pregunta)

        }
        else if(pregunta.tipo==='Binaria: Si o No'){
            resp=ResponderPreguntaC(pregunta)

        }
        else if(pregunta.tipo==='Abierta'){
            resp=ResponderPreguntaD(pregunta)

        }
        respuestas.push(resp)
})   
    encuesta.respuestas.push(respuestas)
    mostrarResultados(encuesta)
}


function ResponderPreguntaA(pregunta) {
    let resp;
        Swal.fire({
            title: pregunta.enunciado,
            html: pregunta.opciones.map((ops, index) => `<p align='left'><strong>${index}</strong>: ${ops}`).join('<br />'),
            input: 'number',
            confirmButtonText: 'Aceptar',
            preConfirm: (inputValue) => {
                let l = pregunta.opciones.length;
                if (inputValue >= 0 && inputValue < l) {
                    resp=inputValue
                    return 'correcto';
                } else {
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
                    return resp;
                });
            } else if (result.value === 'error') {
                Swal.fire({
                    title: 'Error',
                    text: 'El valor ingresado no corresponde a los ID de respuestas asdasdas.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                }).then(() => {
                    ResponderPreguntaA(pregunta);
                });
            }
        });
    }

function ResponderPreguntaB(pregunta) {
    let resp=0
    Swal.fire({
        showDenyButton: true,
        title: pregunta.enunciado,
        confirmButtonText: 'Verdadero',
        denyButtonText: 'Falso',
    }).then((result) => {
        if (result.isConfirmed) {
            resp='Verdadero';
        } else if (result.isDenied) {
            resp='Falso';
        }
      });
    return resp;
}

function ResponderPreguntaC(pregunta) {
    let resp=0
    Swal.fire({
        showDenyButton: true,
        title: pregunta.enunciado,
        confirmButtonText: 'Si',
        denyButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            resp='Si';
        } else if (result.isDenied) {
            resp='No';
        }
      });
    return resp;
}

function ResponderPreguntaD(pregunta) {
    let resp=0
    Swal.fire({
        title: pregunta.enunciado,
        input: 'text',
        confirmButtonText: 'Aceptar',
        preConfirm: (inputValue) => {
            if (inputValue.length > 0) {
                resp=inputValue
                return 'correcto';
            } else {
                return 'error';
            }
        }
    }).then((result) => {
        if (result.value === 'correcto') {
            Swal.fire({
                title: 'Respuesta Ingresada',
                text: 'Respuesta ingresada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                return resp;
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'El valor ingresado es menor a 1 carácter.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                ResponderPreguntaD(pregunta);
            });
        }
    });
}




Inicio(arrEncuestas);

