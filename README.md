# MercadoTec
### *El problema:*
Los estudiantes muchas veces se ven en la necesidad de vender producto para poder pagar los costos de la universidad (Transporte, Comida, Colegiaturas, Material). Todos ellos utilizan la página de Facebook de la universidad para promocionar lo que venden, pero muchas veces se pierden entre memes, preguntas, videos, imagenes, etc.

Buscamos resolver este problema dandoles una plataorma dónde sus productos tengan más visibilidad y lleguen a una audiencia más específica

&nbsp;
### *Descripción:*
Mercado tec es una aplicación para promocionar productos que venden en el campus, donde los estudiantes puedan publicar lo que venden, en qué parte del campus están para ir a comprarles y un modo para contactarlos.

&nbsp;
### *Público objetivo:*
Estudiantes del ITS de entre 17 y 28 años de clase media o media-baja


---


## **¿Cómo iniciar este proyecto en tu propio ambiente de desarrollo?**
  1. Descargar VS.Code: https://code.visualstudio.com/Download
  2. Descargar Node.js en Windows: https://nodejs.org/en/download/
  3. Descargar Git: https://git-scm.com/downloads
  4. Entrar a VS.Code y presionar `Ctrl`+`Shift`+`x` en Windows, o `Cmd`+`Shift`+`x` en MacOS
  5. Una vez en la pestaña de extensiones, buscar e instalar las siguientes:
        - Tabnine by tabnine
        - ES7 + React/Redux/React-Native by dsznajder
        - ESLint by Microsoft
        - npm by Microsoft
        - npm intellisense by Christian Kohler
        - React Native Tools by Microsoft
        - Simple Functional React Snippets by Sediment
        - Visual Studio IntelliCode by Microsoft

   4. Presionar `Ctrl`+`Shift`+`p` en Windows o `Cmd`+`Shift`+`p`
   5. Escribir "Debug: Javascript Debug Terminal" y presionar enter para abrir la terminal (Se puede hacer más fácil pero no me deja escribir la combinación de comandos :))
   6. Escribir `npm install -g expo-cli` y dar enter
   7. Escribir `cd Desktop` y dar enter para navegar al escritorio
   8. Escribir `git clone https://github.com/david1opez/MercadoTec.git` para clonar el repositorio y poder editarlo
   9. Una vez descargado el código, escribir en la terminal `npm install` para descargar todos los paquetes necesarios
   10. Investigar qué es y cómo usar Git, porque ya son muchos pasos aquí :)


---

## Antecedentes
Antes de empezar a trabajar en esta aplicación necesitan conocer algunos de lo conceptos básicos de **JavaScript**, **Node.js**, **ReactNative** y **Typescript**, y aquí explicaré algunas cosas y les dejaré links para que puedan ver más información, NO NECESITAS APRENDERTE TODO DE MEMORIA, para eso está Google.

### JavaScript
JavaScript NO tiene nada que ver con el lenguaje Java. Según entiendo, JavaScript comenzó como Mocha, luego se convirtió en LiveScript y luego se convirtió en JavaScript cuando Netscape y Sun se juntaron (Información que no importa la verdad).

En este proyecto se utilizan los siguientes conceptos de JavaScript:
- Variables: (Las variables en JavaScript se definen de forma diferente que en lenguajes de tipado fuerte como Java) https://www.w3schools.com/js/js_variables.asp
- Constantes:(Esta no tiene mucha ciencia, solo es saber como declararlas) https://www.w3schools.com/js/js_const.asp
- Operadores ++, +=, --, -=: https://www.w3schools.com/js/js_operators.asp
- Arreglos: https://www.w3schools.com/js/js_arrays.asp
- Métodos de los arreglos: (Esto sirve para hacer más rápido y sencillo trabajar con arrays, para por ejemplo filtrar u ordenarlos) ttps://www.w3schools.com/js/js_array_methods.asp
- Método .map(): (Este está en los métodos de arreglos, pero este es el que más utilizamos en la aplicación)https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- Objetos: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_Objects
- If statements: (Se declaran igual que en Java "if(){}else if(){}else{}") https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/if...else
- Funciones con parametros: https://www.w3schools.com/js/js_function_parameters.asp
- Return: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/return
- For loops: (Se declaran igual que en Java, excepto por el tipado fuerte) https://www.w3schools.com/js/js_loop_for.asp
- SetInterval: (Esto repite un bloque de código o función cada cierto tiempo) https://developer.mozilla.org/es/docs/Web/API/setInterval
- SetTimeOut: (Esto ejecuta un bloque de código o función despues de cierto tiempo, pero solo una vez) https://developer.mozilla.org/es/docs/Web/API/setTimeout
- Import: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/import
- Export: https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Statements/export
- Promesas: (Solo poner atención a como funcionan los métodos .then() y .catch()) https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

### Node.js
Node es un entrono de tiempo de ejecución de JavaScript, no importa mucho eso, de lo que más usamos es el Node Package Manager (npm) que es una herramienta para instalar paquetes y dependencias.

En el proyecto se utilizara:
- El comando `npm install` que sirve para instalar paquetes, cómo lo hicimos en el setup del proyecto, también ver las opciones de instalación `-g`, `--save-dev`
- El comando `npm uninstall` es lógico lo que hace :)

Para esta aplicación utilizaremos en vez del comando `npm` utilizaremos `expo` para que se descarguen las versiones compatibles con expo-cli, que es lo que utilizamos para hacer la aplicación, entonces usamos `expo install` o `expo uninstall` normalmente, pero en ocasiones usaremos npm y es importante saberlo :).

- Package.json: Este archivo contiene la información de la aplicación para Node, lo más importante de este archivo son las dependencies, aquí podemos ver los paquetes que hemos instalado y sus versiones en caso de que algo no funcione o salga mal. https://docs.npmjs.com/cli/v7/configuring-npm/package-json
