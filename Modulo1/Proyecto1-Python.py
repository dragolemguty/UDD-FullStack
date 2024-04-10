import pandas as pd
import numpy as np

def safe_cast(val, to_type,df, default=None):
    l=len(df)
    try:
        result=to_type(val)
    except (ValueError, TypeError):
        print('Favor ingresar valor numérico relacionado al index del producto')
        return default
    else:
        if result>l or result<0:
            print('Favor ingresar valor numérico relacionado al index del producto')
            return default
        return result

def safe_cast2(val, to_type, default=None):
    try:
        result=to_type(val)
    except (ValueError, TypeError):
        print('Favor ingresar cantidad numerica correcta')
        return default
    else:
        if result<0:
            print('Favor ingresar cantidad numerica correcta')
            return default
        return result
    
def safe_string(val, default=None):
    lista=['Si','SI','si','NO','no','No']
    if val not in lista:
        print('Favor ingresar Si o No')
        return default
    return val
    
datos_productos = {'Producto': ['Zapatillas Deportivas','Zapatillas Running','Zapatos'], 'Precio': [100,150,200],'Peso Paquete':[3,2,3]}
df_productos = pd.DataFrame(data=datos_productos)

iva=12
df_productos.loc[len(df_productos)] = np.array(['Sandalias', 60, 1])
datos_clientes = {'Nombre': [], 'Producto':[],'Cantidad':[], 'Descuento': [],'Porcentaje_Descuento':[], 'Destino':[]}
df_clientes = pd.DataFrame(data=datos_clientes)

print(df_productos.loc[0][0])


#shift +alt +a

print('Ingrese nombre de cliente')
nombre = input('Nombre:')

print('Codigo de producto deseado')
print(df_productos[['Producto', 'Precio']])

Nprod=input('Numero index de producto:')

while safe_cast(Nprod,int,datos_productos) ==None:
    print(df_productos[['Producto', 'Precio']])
    Nprod=safe_cast(input('Numero index de producto:'),int,datos_productos)

Nprod=int(Nprod)

prod = df_productos.loc[Nprod][0]
precio = df_productos.loc[Nprod][1]
peso = df_productos.loc[Nprod][2]

print('Ingrese la cantidad del producto deseado')
cant = input('Cantidad:')

while safe_cast2(cant,int) ==None:
    cant=safe_cast2(input('Cantidad:'),int)

print('¿Posee descuento?')
dcto = input('Si/No:')

while safe_string(dcto) ==None:
    dcto=safe_string(input('Si/No:'))

print('Ingrese destino del envío')
destino = input('Destino:')

df_clientes.loc[len(df_productos)] = np.array([nombre,prod,cant,dcto,10,destino])

#df_clientes.loc[len(df_productos)] = np.array(['asd','Zapatillas Deportivas',2,'si',10,'OWO'])

#index = df_productos.loc[(df_productos == 'Zapatillas Deportivas').any(axis=1)].index[0]
#precio = df_productos.loc[index][1]
#peso = df_productos.loc[index][2]

cantidad=int(df_clientes.iloc[0].Cantidad)
descuento=df_clientes.iloc[0].Descuento
porcent_descuento=int(df_clientes.iloc[0].Porcentaje_Descuento)
precio_final=0

if descuento in ['Si','SI','si']:
    precio_final=round(precio-(precio*(porcent_descuento/100)),2)
else:
    precio_final=precio

precio_final2=round(precio_final*(((iva)/100)+1),2)
precio_final3=0
if cantidad >=2:
    precio_final3=round(precio_final2-(precio_final2*(5/100)),2)
else:
    precio_final3=precio_final2

envio=10+(cantidad*peso)

precio_final4=round((precio_final3*cantidad) + envio,2)

print('')
print('')
print('Precio final:',precio_final4)
print('')
print('----Producto comprado:',prod)
print('----Cantidad:',cantidad)
print('----Precio producto unitario:',precio)
print('----Precio con descuento de cliente:',precio_final)
print('----Precio con impuestos:',precio_final2)
print('----Precio unitario con descuento por cantidad:',precio_final3)
print('----Costo de envío:',envio)