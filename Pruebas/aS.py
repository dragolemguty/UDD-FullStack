import pandas as pd
import numpy as np

datos_productos = {'Producto': ['Zapatillas Deportivas','Zapatillas Running','Zapatos'], 'Precio': [100,150,200],'Peso Paquete':[3,2,3]}
df = pd.DataFrame(data=datos_productos)

df['OWO'] = str(df['Precio'][:][:][0])
print(df)
