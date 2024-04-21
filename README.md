# Practica_Ubicuos

# Integrantes
    - Marina Pérez Barbero - 100472115
    - Irene Subías Serrano - 100472108 
    - Paula Subías Serrano - 100472119


# Ejecución 
    1º - En en terrminal escribir :  node .\index.js
    2º - En eun navegador de un ordenador poner la url: http://localhost:3000
    3º - Escaner con el movil el QR que vienen viene en el ordenar para que se carge la aplicación. 
        Esta se abrira en la paguina del armario inicial mente estará vacia

# Funciones implentadas

    ## Funiones basicas 
        - Navegación: para nevegar por la app se puede haver por voz u pulsando los btos que hay en el footer. 
                    Los comandos son los siguientes:
                        - Favoritos: para ver la lista de productos favoritos
                        - Maniqui: para ver un maniqui en 3d
                        - Probador: abrirá un probador diguital donde se podrá ver como queda la ropa.
                        - Armario: para ver la ropa que tienes selecionada.
                        - Escaner: para añadir los produtos al armario.
                        - Perfil: con la información del usuario.
                        - Pago:
                        
        - Añadir: se ira a la pestaña de escner y aparecerá la camara frontal donde el usuario esceneara los codigos de barras correspondente a los productos 
                - 1 es una camiseta negra 
                - 2 pantalones
                - 3 blusa
        - Borrar: para borrar un producto habrá que ir a la pestaña del amrio y slecionar un producto para borrarlo se pondrá el movil voca abajo y se esperará 3s
                cuenso termine el dispositivo vibrará. Cuando termine la vibración el usuario podrá dar la vuelta al dispositivo.
        - Favorito:  se tendrá que ir tambien al armario y selecionar un producto, depues se agitara el movil y el produto cambiará de color. Además para verlo de 
                    una manera más visual se ñadiria a la pestala de favoritos.
        - Ordenar: se relizará por voz y habra que ir a la pestaña del armario y decir "ordenar" y los produtos se ordenar poniendose primero los favoritos. 
        - Pago: para pagar se tendrá que ir a la paguina de escaner y escanear el cogigo QR después en la pantalla se hará un resumen de los produtos selcionados. 
                A su vez en el movil aparcerá un dado que se agiatara y se aplicaraá un descuento el precio. No se  ha podido haver NFC debido a que no hemos encontardo
                API que pemitan desarrolllo y hemos decidido haclo escaneando un QR.
    

    ## Funiones extras
        - Probador: aqui hay dos funionalidades para verlas hay que ir a la pestalla de maniquí. Primero nos encontraremos con un prototipo de maniqui 3D que si se pone el 
                    movil vertil y se mueve el movil hacia la derecha y la izq el maniqui guirara con el movimiento. Depués si decimos u palsamos la cmara se ira al probador 
                    diguital donde aparecen una serie de prendas que el usuario se podrá probar. Para su uso hay que tner en cuenta que en el disño de la tienda habra unos 
                    soportes para dejar el movil.
        - Sugerencias: En la pestalla de armario si se pulsa un produto aparecera una sere de prendas que son sugerencias de produtos parecidos. Si se pulsan se añaden a la
                       cesta.
        - Perfil: en esta pestala el usuario podra introducir la talla que quiere que se le añada por defecto en la ropa si no lo hace la talla por defecto será la s.
        - Descuentos: COmo se ha emncionado después de escanear el Qr aparecera un dado en el movil que se agitar y se produciraun descuento.



# Funciones no implementadas
    - Localizar un prododucto en la tienda.
    - Ordenar por tipo de ropa
    - En el maniqui 3d poder cambiarle la ropa



# poner que se han quitado las funciones por defecto y los posibles errores