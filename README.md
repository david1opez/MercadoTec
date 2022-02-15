# MercadoTec
### *El problema:*
Los estudiantes muchas veces se ven en la necesidad de vender producto para poder pagar los costos de la universidad (Transporte, Comida, Colegiaturas, Material). Todos ellos utilizan la página de Facebook de la universidad para promocionar lo que venden, pero muchas veces se pierden entre memes, preguntas, videos, imagenes, etc.

Buscamos resolver este problema dandoles una plataorma dónde sus productos tengan más visibilidad y lleguen a una audiencia más específica

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
   7. Escribir `npm install -g typescript` y dar enter
   8. Escribir `cd Desktop` y dar enter para navegar al escritorio
   9. Escribir `git clone https://github.com/david1opez/MercadoTec.git` para clonar el repositorio y poder editarlo
   10. Escribir `cd MercadoTec` para navegar al folder del proyecto
   11. Una vez descargado el código, escribir en la terminal `npm install` para descargar todos los paquetes necesarios


---

## Antecedentes
Antes de empezar a trabajar en esta aplicación necesitan conocer algunos de lo conceptos básicos de **JavaScript**, **Node.js**, **TypeScript**, **ReactNative** y **Git**, y aquí explicaré algunas cosas y les dejaré links para que puedan ver más información, NO NECESITAS APRENDERTE TODO DE MEMORIA, para eso siempre está Google.

### JavaScript
JavaScript NO tiene nada que ver con el lenguaje Java. Según entiendo, JavaScript comenzó como Mocha, luego se convirtió en LiveScript y luego se convirtió en JavaScript cuando Netscape y Sun se juntaron (Información que no importa la verdad).

En este proyecto se utilizan los siguientes conceptos de JavaScript:
- Variables: (Las variables en JavaScript se definen de forma diferente que en lenguajes de tipado fuerte como Java) https://www.w3schools.com/js/js_variables.asp
- Constantes: (Esta no tiene mucha ciencia, solo es saber como declararlas) https://www.w3schools.com/js/js_const.asp
- Console.log: (Es lo mismo que `System.out.print()` o `print()`)
- Operadores ++, +=, --, -=: https://www.w3schools.com/js/js_operators.asp
- Arreglos: https://www.w3schools.com/js/js_arrays.asp
- Métodos de los arreglos: (Esto sirve para hacer más rápido y sencillo trabajar con arrays, para por ejemplo filtrar u ordenarlos) https://www.w3schools.com/js/js_array_methods.asp
- Método .map(): (Este está en los métodos de arreglos, pero este es el que más utilizamos en la aplicación)https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/map
- Objetos: https://developer.mozilla.org/es/docs/Web/JavaScript/Guide/Working_with_Objects
- If statements:
    ```JavaScript
      if() {}
      else if() {}
      else {}
    ```
- Funciones con parametros: https://www.w3schools.com/js/js_function_parameters.asp
- Diferentes formas de declarar funciones:
    ```JavaScript
      function x() {}
      const x = function() {}
      const x = () => {}
    ```
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

### TypeScript
TypeScript es un lenguaje de programación porque podemos definir los tipos de variables, constantes, funciones, etc. que usamos para evitar posibles errores de syntaxis. Es EXACTAMENTE IGUAL QUE JAVASCRIPT, solo que aquí por ejemplo al definir una variable podemos definir que su tipo, como en lenguajes de tipado fuerte `let nombre: string = Juan`.
En proyectos solo de JavaScript para definir un archivo de TypeScript se utiliza la extensión `.ts`, pero en proyectos de React o React Native se usa `.tsx`.

- Types: https://www.typescriptlang.org/docs/handbook/basic-types.html
- Types personalizados: https://www.typescriptlang.org/docs/handbook/basic-types.html
- Parametros opcionales: (Solo es agregarle un signo de interrogación después del nombre del parámetro `function x(a: number, b?: number, c: number)`) https://www.typescripttutorial.net/typescript-tutorial/typescript-optional-parameters/
- tsconfig.json: (Este archivo contiene la configuración de TypeScript en el proyecto actual) https://www.typescriptlang.org/docs/handbook/tsconfig-json.html

### Git
(ESTO ES LO MÁS IMPORTANTE) Primero que nada, Git y GitHub no son lo mismo. Git lo usamos para manejar el historial de cambios en el código y archivos del proyecto y GitHub es un servicio en la nuve que nos permite guardar los repositorios de Git.
Cómo somos varias personas trabajando en este proyecto, no podemos estar siempre en el mismo lugar y estas herramientas nos permiten trabajar de forma remota.

Para el proyecto TODOS debemos conocer lo siguiente porque es lo más escencial:
- Commits: (Para hacer un commit primero debemos de correr `git add` para agregar solo los archivos que cambiamos)https://www.atlassian.com/git/tutorials/saving-changes/git-commit#:~:text=Commits%20are%20the%20core%20building,at%20that%20point%20in%20time.
- Branches: https://www.varonis.com/blog/git-branching
- Comando `git clone`: (Esto generalmente solo se utiliza cuando iniciamos el proyecto por primera vez. Descarga el código desde la nube) https://www.atlassian.com/git/tutorials/setting-up-a-repository/git-clone
- Comando `git pull`: (Esto sirve para actualizar el código del repositorio actual cuando otras personas han hecho cambios) https://www.atlassian.com/git/tutorials/syncing/git-pull
- Comando `git add`: (Nos permite seleccionar que archivos queremos poner en nuestro commit, este comando se debe ejecutar antes de `git commit`) https://www.atlassian.com/git/tutorials/saving-changes#:~:text=The%20git%20add%20command%20adds,until%20you%20run%20git%20commit%20.
- Comando `git push`: (Una vez que terminamos, agregamos los archivos y los pusimos dentro de un commit podemos publicar ese commit en la rama en la que trabajas) https://www.atlassian.com/git/tutorials/syncing/git-push
- Comando `git merge`: (Cada uno trabajaremos en cosas diferentes en diferentes ramas, pero hay una rama principal "Main", así que cuando acabamos y estamos seguros que el código funciona debemos fusionar la rama en la que trabajas y la rama principal) https://www.atlassian.com/git/tutorials/using-branches/git-merge

### React Native
React Native es un Framework de JavaScript utilizado para crear aplicaciones de Android, IOS, Windows, MacOS y para SmartTVs. Al principio parece como un lenguaje completamente diferente a JavaScript, pero se ve más dificil de lo que en realidad es. React Native tiene dos bloques fundamentales: Los componentes y los hooks.

Hay dos formas en las que podemos escribir el código, con clases o con funciones, nosotros usaremos exclusivamente los componentes funcionales (Por si están investigando algo y aparece algo de `class extends` o `render()` no hagan caso a eso :))

Los componentes son lo que le dará la estructura a la aplicación, por ejemplo la pantalla principal de una aplicación se podría dividir así:
```JavaScript
  <Navbar>
    <Logo />
    <BarraDeBusqueda />
  </Navbar>
  
  <Contenido>
    <Texto> Bla Bla Bla </Texto>
  </Contenido>
  
  <PieDePagina />
```
Tenemos 6 componentes en este ejemplo, `Navbar` que envuelve a otros dos componentes `Logo` y `BarraDeBusqueda`, entonces el logo y la barra de busqueda están adentro de la navbar, luego esta el `Contenido` que envuelve a un `Texto` que tiene a su vez adentro "Bla Bla Bla", entonces la aplicacion mostrara ese texto despues de la navbar, y al final tenemos el `PieDePágina`.

NOTA: Los nombres de los componentes siempre se escriben primero con Mayúscula y en formato Camel Case (Lo de que cada que empieces una nueva palabra en un nombre de algo en vez de poner un espacio o un guión, escribes la primera letra de cada palabra en mayúscula).

Los Hooks son funciónes de javascript que permite crear/acceder al estado y a los ciclos de vida de React.

```JavaScript
  export default function App() {
    const [value, setValue] = useState(); //Este es un Hook (El que más utilizaremos "useState")
  }
```

NOTA: Los Hooks solo pueden ser llamados dentro de las funciónes que exporta la aplicación.

Aquí están otros conceptos que debemos conocer:
- Los componentes escenciales de React Native: (View, Text, ScrollView, TextInput, TouchableOpacity, Image) https://habiletechnologies.com/blog/understanding-the-basic-components-of-react-native/
- Componentes personalizados: (En React Native podemos crear nuestros propios componentes para que el código sea más limpio y fácil de escribir)

    *Ejemplo con componente personalizado*
    ```JavaScript
    import { Text, View } from 'react-native'; // Importamos los componentes que utilizaremos
    import React from 'react'; // Esto siempre se pone al principio de todo archivo de React Native
    
    const Emoji = () => {
      return( //Estas funciones solo deben regresar un solo componente, por lo general anidamos todo dentro de una <View> u otro componente
        <View>
          <Text>😋</Text>
          <Text---</Text>
        </View>
      )
    }
    
    export default function App() {
      <View>
        <Text>Emoji 1</Text>
        <Emoji />
        <Text>Emoji 2</Text>
        <Emoji />
        <Text>Emoji 3</Text>
        <Emoji />
      </View>
    }
   ```
   
   *Ejemplo SIN componente personalizado*
    ```JavaScript
    import { Text, View } from 'react-native'; // Importamos los componentes que utilizaremos
    import React from 'react'; // Esto siempre se pone al principio de todo archivo de React Native
    
    export default function App() {
      <View>
        <Text>Emoji 1</Text>
        <View>
          <Text>😋</Text>
          <Text---</Text>
        </View>
        <Text>Emoji 2</Text>
        <View>
          <Text>😋</Text>
          <Text---</Text>
        </View>
        <Text>Emoji 3</Text>
        <View>
          <Text>😋</Text>
          <Text---</Text>
        </View>
      </View>
    }
   ```
- Props: https://reactnative.dev/docs/props
- StyleSheet: (Sirve para darle el estilo a los componentes) https://reactnative.dev/docs/stylesheet
- Hook `useEffect()`
- Hook `useState()`
- Comando `expo start`: Este comando se utiliza para probar la aplicación, necesitas instalar la aplicación Expo Go en tu telefono, luego con ella escaneas el código QR que aparece despues de ejecutar el comando y puedes ver como va quedando la app.
- Archivo app.config.ts
