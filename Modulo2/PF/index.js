let datosProductos = {
    'Producto': ['Zapatillas Deportivas', 'Zapatillas Running', 'Zapatos'],
    'Precio': [100, 150, 200],
    'Peso Paquete': [3, 2, 3]
};

let iva = 12;
datosProductos['Producto'].push('Sandalias');
datosProductos['Precio'].push(60);
datosProductos['Peso Paquete'].push(1);

function mostrarResultados(a,b,c,d,f,g,h,i,j) {
    Swal.fire({
        title: 'Resultado',
        html: 
        "<strong>Precio final: </strong>" + a.toString() + '<br />' +
        "<p align='left'><strong>----Producto comprado: </strong>" + b.toString() + '<br />' +
        "<strong align='left'>----Cantidad: </strong>" + c.toString() + '<br />' +
        "<strong align='left'>----Precio producto unitario: </strong>" + d.toString() + '<br />' +
        "<strong align='left'>----Precio con descuento de cliente: </strong>" + f.toString() + '<br />' +
        "<strong align='left'>----Precio con impuestos: </strong>" + g.toString() + '<br />' +
        "<strong align='left'>----Precio unitario con descuento por cantidad: </strong>" + h.toString() + '<br />' +
        "<strong align='left'>----Costo de envío: </strong>" + i.toString() + '<br />' +
        "<strong align='left'>Usuario: </strong>" + j.toString(),
        icon: 'info'
    })
}


function mostrarNombre(j) {
    Swal.fire({
        title: 'Resultado',
        html:
        "<strong>Usuario: </strong>" + j.toString(),
        icon: 'info'
    })
}

let nombre;
let nProd;
let cant;
let descuento;
let destino;

let prod;
let precio;
let peso;
let envio;
let precioFinal;
let porcentDescuento;
let precioFinal1;
let precioFinal2;
let precioFinal3;
let precioFinal4;

function calculos(){
    nProd = parseInt(nProd);
    prod = datosProductos['Producto'][nProd];
    precio = datosProductos['Precio'][nProd];
    peso = datosProductos['Peso Paquete'][nProd];
    cant = parseInt(cant);
    envio = 10 + (cant * peso);
    precioFinal = precio;
    porcentDescuento = 10;

    if (descuento === 'SI') {
        precioFinal -= precio * (porcentDescuento / 100);
    } else {
        precioFinal = precio;
    }
    precioFinal1=precioFinal.toFixed(2);
    precioFinal *= (1 + (iva / 100));
    precioFinal2 = precioFinal.toFixed(2);
    if (cant >= 2) {
        precioFinal -= precioFinal * (5 / 100);
    } else {
        precioFinal = precioFinal;
    }
    precioFinal3= precioFinal.toFixed(2)
    precioFinal4 = Math.round(((precioFinal * cant) + envio) * 100) / 100;
}

function pedirDirec(df) {
    Swal.fire({
        title: 'Ingrese destino del envío:',
        input: 'text',
        confirmButtonText: 'Aceptar',
        preConfirm: (inputValue) => {
            if (inputValue.length > 2) {
                destino=inputValue
                return 'bienvenida';
            } else {
                return 'error';
            }
        }
    }).then((result) => {
        if (result.value === 'bienvenida') {
            Swal.fire({
                title: 'Dato Ingresado',
                text: 'Direccion de destino ingresada correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                calculos();
                mostrarResultados(precioFinal4,prod,cant,precio,precioFinal1,precioFinal2,precioFinal3,envio,nombre);
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'El valor ingresado es menor a 2 carácteres.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                pedirDirec(df);
            });
        }
    });
}

function pedirDcto(df) {
    Swal.fire({
        showDenyButton: true,
        title: '¿Posee descuento?',
        confirmButtonText: 'Si',
        denyButtonText: 'No',
    }).then((result) => {
        if (result.isConfirmed) {
            descuento='SI'
            pedirDirec(df);
        } else if (result.isDenied) {
            descuento='NO'
            pedirDirec(df);
        }
      });
}


function pedirCant(df) {
    Swal.fire({
        title: 'Ingrese la cantidad del producto deseado:',
        html: 'Cantidad:',
        input: 'number',
        confirmButtonText: 'Aceptar',
        preConfirm: (inputValue) => {
            if (inputValue > 0 ) {
                cant = inputValue;
                return 'bienvenida';
            } else {
                return 'error';
            }
        }
    }).then((result) => {
        if (result.value === 'bienvenida') {
            Swal.fire({
                title: 'Dato Ingresado',
                text: 'Producto deseado ingresado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                pedirDcto(df);
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'Cantidad debe ser mayor a 0.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                pedirCant(df);
            });
        }
    });
}

function pedirNProd(df) {
    Swal.fire({
        title: 'Codigo de producto deseado:',
        html: df['Producto'].map((prod, index) => `<p align='left'><strong>${index}</strong>: ${prod}`).join('<br />'),
        input: 'number',
        confirmButtonText: 'Aceptar',
        preConfirm: (inputValue) => {
            let l = df['Producto'].length;
            if (inputValue >= 0 && inputValue < l) {
                nProd = inputValue;
                return 'bienvenida';
            } else {
                return 'error';
            }
        }
    }).then((result) => {
        if (result.value === 'bienvenida') {
            Swal.fire({
                title: 'Dato Ingresado',
                text: 'Producto deseado ingresado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                pedirCant(df);
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'El valor ingresado no corresponde a los ID de productos.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                pedirNProd(df);
            });
        }
    });
}


function pedirUsuario(df) {
    Swal.fire({
        title: 'Ingrese nombre de cliente:',
        input: 'text',
        confirmButtonText: 'Aceptar',
        preConfirm: (inputValue) => {
            if (inputValue.length > 2) {
                nombre=inputValue
                return 'bienvenida';
            } else {
                return 'error';
            }
        }
    }).then((result) => {
        if (result.value === 'bienvenida') {
            Swal.fire({
                title: 'Dato Ingresado',
                text: 'Nombre de usuario ingresado correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                pedirNProd(df);
            });
        } else {
            Swal.fire({
                title: 'Error',
                text: 'El valor ingresado es menor a 2 carácteres.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
            }).then(() => {
                pedirUsuario(df);
            });
        }
    });
}



pedirUsuario(datosProductos);

