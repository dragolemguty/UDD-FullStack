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
    }
}


let encuesta1 = new Encuesta(
    'Encuesta 1',
    2,
    preguntasEncuesta
)


class Pregunta {
    constructor(enunciado,tipo,cantidad,opciones,correcta){
        this.enunciado=enunciado;
        this.tipo=tipo;
        this.cantidad=cantidad;
        this.opciones=opciones;
        this.correcta=correcta;
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

}

let pregunta1 = new Pregunta(
    'Cual es la capital de Chile?',
    'Abierta',
    5,
    ['Temuco','Valdivia','Rancagua','Santiago','Coquimbo'],
    'Santiago'
)

let pregunta2 = new Pregunta(
    'Soy hombre?',
    'Binaria: Si o No',
    5,
    ['Temuco','Valdivia','Rancagua','Santiago','Coquimbo'],
    'Santiago'
)

console.log(pregunta1.enunciado)
pregunta1.estructurar()
pregunta2.estructurar()
//console.log(pregunta1.estructurar())
console.log(pregunta1)
console.log(pregunta2)
preguntasEncuesta.push(pregunta1)
preguntasEncuesta.push(pregunta2)
arrEncuestas.push(encuesta1)
arrEncuestas.push(encuesta1)
//arrEncuestas.push(encuesta)
console.log(encuesta1)
console.log(arrEncuestas)

