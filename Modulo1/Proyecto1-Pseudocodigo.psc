Algoritmo Modulo1
	definir nombre como cadena;
	definir id_prod como entero;
	definir cantidad como entero;
	definir dcto como cadena;
	definir dcto_opcion como entero;
	definir direc como cadena;
	
	iva<-12;
	
	Dimension df_productos[3, 3]
	df_productos[1,1] <- "Zapatillas Deportivas"
    df_productos[1,2] <- "100"
    df_productos[1,3] <- "3"
    df_productos[2,1] <- "Zapatillas Running"
    df_productos[2,2] <- "150"
    df_productos[2,3] <- "2"
    df_productos[3,1] <- "Zapatos"
    df_productos[3,2] <- "200"
    df_productos[3,3] <- "3"
	
	escribir "Escriba nombre de usuario: "
	escribir ""
	leer nombre
	
	variableCondicion<-1
	mientras variableCondicion>0 hacer
		escribir "Escoja el id del producto deseado: "
		escribir ""
		Para i<-1 hasta 3 con paso 1 Hacer		
			escribir i," : ",df_productos[i,1]
		FinPara
		leer id_prod
		si id_prod<0 o id_prod>3 Entonces
			escribir "INGRESE ID CORRECTO"
		SiNo
			escribir "Id correcto"
			escribir ""
			variableCondicion=variableCondicion*(-1)
		FinSi
	finmientras
	
	variableCondicion<-1
	mientras variableCondicion>0 hacer
		escribir "Escoja cantidad del producto deseado: "
		escribir ""
		leer cantidad
		si cantidad<0 Entonces
			escribir "INGRESE CANTIDAD CORRECTA"
		SiNo
			escribir "Cantidad correcta"
			escribir ""
			variableCondicion=variableCondicion*(-1)
		FinSi
	finmientras
	
	variableCondicion<-1
	mientras variableCondicion>0 hacer
		escribir "Tiene descuento: "
		escribir ""
		escribir "Si o No"
		leer dcto
		si dcto='SI' o dcto='Si' o dcto='si' o dcto='NO' o dcto='No' o dcto='no' Entonces
			escribir "Dato ingresado correctamente"
			escribir ""
			si dcto='SI' o dcto='Si' o dcto='si' Entonces
				dcto_opcion=1
			SiNo
				dcto_opcion=0
			FinSi
			variableCondicion=variableCondicion*(-1)
		SiNo
			escribir "INGRESE Si o No"			
		FinSi
	finmientras
	
	escribir "Escriba direccion de envío: "
	escribir ""
	leer direc
	Calculos(df_productos, id_prod, cantidad, dcto_opcion, iva,nombre,direc)
FinAlgoritmo


Funcion Calculos(df_productos, id_prod, cantidad, dcto_opcion, iva,nombre,direc)
	Definir precio, peso, envio, porcentDescuento Como entero
	Definir precioFinal,resultado, precioFinal1, precioFinal2, precioFinal3, precioFinal4 Como Real	
	Definir prod como cadena
	Dimension preciosFinales[6];
	
	prod = df_productos[id_prod,1]
	precio = ConvertirANumero(df_productos[id_prod,2])
	peso = ConvertirANumero(df_productos[id_prod,3])
	
	Escribir precio
	Escribir peso
	
	PrecioFinal = precio	
	porcentDescuento = 10	
	si dcto_opcion == 1 entonces
		precioFinal = precioFinal - (precio * (porcentDescuento / 100))
	fin si
	
	resultado = precioFinal
	precioFinal1 = resultado
	Escribir precioFinal1
	
	precioFinal = precioFinal * (1 + (iva / 100))
	resultado = precioFinal
	precioFinal2 = resultado
	Escribir precioFinal2
	
	si cantidad >= 2 entonces
		precioFinal = precioFinal - (precioFinal * (5 / 100))
	fin si
	resultado = precioFinal
	precioFinal3 = resultado
	Escribir precioFinal3
	envio = 10 + (cantidad * peso)
	Escribir envio
	precioFinal4 = (precioFinal * cantidad) + envio
	Escribir precioFinal4
	
	preciosFinales[1] <- precio
	preciosFinales[2] <- precioFinal1
	preciosFinales[3] <- precioFinal2
	preciosFinales[4] <- precioFinal3
	preciosFinales[5] <- precioFinal4
	preciosFinales[6] <- envio
	Escribir ''
	Escribir 'RESULTADO'
	Escribir ''
	Escribir 'Precio final: ',preciosFinales[5]
	Escribir ''
	Escribir '----Producto comprado: ',prod
	Escribir '----Cantidad: ',cantidad
	Escribir '----Precio producto unitario: ',precio
	Escribir '----Precio con descuento de cliente: ',preciosFinales[1]
	Escribir '----Precio con impuestos: ',preciosFinales[2]
	Escribir '----Precio unitario con descuento por cantidad: ',preciosFinales[3]
	Escribir '----Costo de envío: ',preciosFinales[6]
	Escribir ''
	Escribir 'Usuario: ',nombre
	Escribir 'Direccion: ',direc	
FinFuncion
