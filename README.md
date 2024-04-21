# Practica_Ubicuos Grupo 5 P2

# Integrantes
    - Marina Pérez Barbero - 100472115
    - Irene Subías Serrano - 100472108 
    - Paula Subías Serrano - 100472119


# Ejecución 
    1º - En en terrminal escribir :  node .\index.js
    2º - En un navegador de un ordenador escribir la url: http://localhost:3000
    3º - Escaner con el movil el QR que aparecerá en la pantalla del ordenar para que se carge la aplicación. 
        Esta se abrirá con una guía inicial y posteriormente en la página del armario o carrito. 

# Funciones implentadas
    ## Funiones basicas 
        - Navegación: para nevegar por la app se pueden usar comandos de voz o pulsar los botones que hay en el footer. 
                    Los comandos de voz son los siguientes:
                        - Favoritos: para ver la lista de productos favoritos
                        - Maniqui: para ver un maniqui en 3d
                        - Probador: abrirá un probador digital donde se podrá ver como queda la ropa.
                        - Armario: para ver la ropa que tienes selecionada.
                        - Escaner: para añadir los produtos al armario.
                        - Perfil: seccion con la información del usuario.
                        - Pago: una vez lanzado el dado desde el dispositivo confirma el pago y termina la transacción
                        
        - Añadir: en la pestaña de escaner se pedirá acceso a la cámara trasera, con la que el usuario esceneará los codigos de barras correspondente a los productos que se encontrarán en las etiquetas. Estos códigos contienen un número que corresponde a:
                - 1: camiseta negra 
                - 2: pantalones
                - 3: blusa
            Para facilitar la comprobación de esto se ha creado una imagen con todos los códigos en la carpeta codigo_barras, denominada resumen productos. 

        - Borrar: para borrar un producto habrá que ir a la pestaña del armario y slecionar un producto, se pondrá el movil boca abajo y se esperarán 3s. Cuando detecta que está boca abajo el dispositivo realiziará una vibración corta y cuando se mantenga el tiempo suficiente en la posicion, vibrará más tiempo, borrará el producto y el usuario podrá dar la vuelta al dispositivo.

        - Favorito:  se tendrá que ir tambien al armario y selecionar un producto, depues se agitara el movil y el produto cambiará de color. Además para verlo de una manera más visual se añadiria a la pestala de favoritos.

        - Ordenar: en la pestaña del armario al utilizar el comando de voz "ordenar" los produtos se ordenarán colocando primero aquellos marcados como favoritos, visualizandolos rápidamente. 

        - Pago: para pagar se tendrá que ir a la pagina de escáner y escanear el cogigo QR que habrá aparecido en la pantalla del ordenador tras la conexión del dispositivo móvil. Tras escanear aparecerá en la pantalla del ordenador un resumen de los produtos selccionados. A su vez en el movil aparecerá un dado que el usuario podrá lanzar agitando el móvil así se le aplicará un descuento al precio. No se ha podido utilizar el NFC planteado en el diseño debido a que no hemos encontardo API que pemitan su uso por problemas de permisos de los dispositivos, y así se ha sustituido por el escaneo de un QR.
    

    ## Funiones extras
        - Probador: Cuenta de dos funionalidades que pueden verse en la pestaña maniquí encontrando al abrila un prototipo de maniqui 3D. Si el usuario coloca su movil en vertical y lo mueve hacia los lados el modelo girará con el movimiento. En esta pantalla con el comando de voz "probador" o al pulsar el icono de cámara en la esquina superior derecha se abrirá una nueva pantalla en la que aparece una cámara y una serie de prendas. Este prototipo de probador permitirá al usuario poder cambiar entre prendas que aparezcan en la pantalla, y colocar el dispositivo en un soporte presente en la tienda para poder utilizar la camara como espejo en el que probarse esta ropa. 

        - Sugerencias: En la pestaña de armario si se pulsa un produto este se abrirá y aparecerá una sere de recomendaciones de productos parecidos, elegidas por las etiquetas de estilo añadidas a todos los productos. Si se pulsan cualquiera de estas recomendaciones el producto será añadido a la cesta. 

        - Perfil: en esta pestala el usuario podrá introducir la talla que quiere que se le añada por defecto en la ropa. Se puede cambiar esta en cualquier momento, y en caso de no ser añadida por defecto se utilizará una S. En un futuro se puede añadir un inicio de sesión para complejizar la personalización del perfil.
        
        - Descuentos: Después de iniciar el proceso de pago en el dispositivo móvil aparece un dado que se puede lanzar para conseguir descuentos en la compra. 



# Funciones no implementadas planteadas en el diseño
    - Localizar un prododucto en la tienda, por problemas con la exactitud de los sensores de geolocalización. 
    - Ordenar por el listado por tipo de ropa, y el estilo de la lista como armario.
    - Poder cambiar la ropa del maniquí 3d, por la falta de librerías que permitiesen esta funcionalidad con el conociemiento actual y tiempo disponible del grupo. 
    - En el pago se sustituyó el nfc por un código qr por los problemas descritos anteriormente, y para evistar colisiones con los códigos QR de los productos estos se han cambiado a códigos de barras



# Posibles errores y como se ha realizado el control para evitar en la medida de lo posible
Aunque se ha añadido control de errores para evitar todos los casos planteados en esta sección, por el funcionamiento de las distintas APIS sigue siendo posible que ocurra alguno de ellos. Estos errores tratan de:
    - Mediciones smultaneas de los sensores que no pueden ser detectadas y que pueden provocar que se añada o marque como favorito un producto más de una vez. Se han añadido comprobaciones antes de estas acciones para evitar que se pueda añadir o marcar un producto más de una vez si se consigue llegar a esa parte del código, ocurrencia imposible con funcionamiento normal. 
    - Errores en el uso de las cámaras de manera ocasional, debido al funcionamiento interno de estas. Se han usado APIs distintas para cada funcionalidad para evitar el mayor número de colisiones y se controla que las cámaras empiecen y paren en los momentos adecuados, pero existen ocasiones en las que existe un tiempo de respuesta superior a lo habitual.
    - El modelo 3d puede provocar ralentización de la aplicación en ciertas ocasiones por el peso que este supone. 

Si ocurrieran cualquiera de estos problemas, recargar la pagina.
Para evitar errores accidentales por interacción del usuario con la pantalla se han desactivado las funciones por defecto del navegador, lo que ocasiona problemas como no poder recargar la página con un deslice hacia abajo. 