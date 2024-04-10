function safeCast(val, toType, df, defaultValue) {
    let l = df.length;
    try {
        let result = toType(val);
        if (result > l || result < 0) {
            throw new Error('Favor ingresar valor numérico relacionado al index del producto');
        }
        return result;
    } catch (error) {
        console.error(error.message);
        return defaultValue;
    }
}

function safeCast2(val, toType, defaultValue) {
    try {
        let result = toType(val);
        if (result < 0) {
            throw new Error('Favor ingresar cantidad numerica correcta');
        }
        return result;
    } catch (error) {
        console.error(error.message);
        return defaultValue;
    }
}

function safeString(val, defaultValue) {
    let lista = ['Si', 'SI', 'si', 'NO', 'no', 'No'];
    if (!lista.includes(val)) {
        console.error('Favor ingresar Si o No');
        return defaultValue;
    }
    return val;
}

let datosProductos = {
    'Producto': ['Zapatillas Deportivas', 'Zapatillas Running', 'Zapatos'],
    'Precio': [100, 150, 200],
    'Peso Paquete': [3, 2, 3]
};

let iva = 12;
datosProductos['Producto'].push('Sandalias');
datosProductos['Precio'].push(60);
datosProductos['Peso Paquete'].push(1);

let nombre = prompt('Ingrese nombre de cliente:');
let nProd = prompt('Codigo de producto deseado:\n' + datosProductos['Producto'].map((prod, index) => `${index}: ${prod}`).join('\n'));

while (safeCast(nProd, parseInt, datosProductos) === null) {
    console.log(datosProductos['Producto'].map((prod, index) => `${index}: ${prod}`).join('\n'));
    nProd = safeCast(prompt('Numero index de producto:'), parseInt, datosProductos);
}

nProd = parseInt(nProd);
let prod = datosProductos['Producto'][nProd];
let precio = datosProductos['Precio'][nProd];
let peso = datosProductos['Peso Paquete'][nProd];

let cant = prompt('Ingrese la cantidad del producto deseado:');
while (safeCast2(cant, parseInt) === null) {
    cant = safeCast2(prompt('Cantidad:'), parseInt);
}
cant = parseInt(cant);

let dcto = prompt('¿Posee descuento? (Si/No):');
while (safeString(dcto) === null) {
    dcto = safeString(prompt('Si/No:'));
}

let destino = prompt('Ingrese destino del envío:');

let envio = 10 + (cant * peso);
let precioFinal = 0;
let descuento = dcto.toUpperCase();
let porcentDescuento = 10;

if (descuento === 'SI') {
    precioFinal = Math.round(precio - (precio * (porcentDescuento / 100)) * 100) / 100;
} else {
    precioFinal = precio;
}

let precioFinal2 = Math.round((precioFinal * ((iva / 100) + 1)) * 100) / 100;
let precioFinal3 = 0;

if (cant >= 2) {
    precioFinal3 = Math.round((precioFinal2 - (precioFinal2 * (5 / 100))) * 100) / 100;
} else {
    precioFinal3 = precioFinal2;
}

let precioFinal4 = Math.round(((precioFinal3 * cant) + envio) * 100) / 100;

console.log('Precio final:', precioFinal4);
console.log('----Producto comprado:', prod);
console.log('----Cantidad:', cant);
console.log('----Precio producto unitario:', precio);
console.log('----Precio con descuento de cliente:', precioFinal);
console.log('----Precio con impuestos:', precioFinal2);
console.log('----Precio unitario con descuento por cantidad:', precioFinal3);
console.log('----Costo de envío:', envio);