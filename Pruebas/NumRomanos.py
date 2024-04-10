67romanos = {'I': 1, 'V': 5, 'X': 10,
               'L': 50, 'C': 100, 'D': 500, 'M': 1000}




def to_entero(test):
    entero=0
    valor_prev=0
    for letra in test:
        valor_actual=romanos[letra]
        entero+=valor_actual
        if valor_actual>valor_prev:
            entero-=2*valor_prev
        valor_prev=valor_actual
    return entero


test='LM'

a=to_entero(test)
print(test)
print(a)






