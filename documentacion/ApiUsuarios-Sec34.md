# Creando Modelos Rounting y Controllers para Usuarios

Para crear el api de usuarios y autenticarlos lo primero es:

## 1. Crear el Modelo de Usuarios

Se crea una carpeta de modelos y se agrega un archivo llamdo `Usuarios.js`, se importa mongoose y creas un esquema con `mongoose.Schema()` y le pasas el objeto que va a recibir con todas las propiedades.

> **NOTA:** Para mas info de los esquemas https://mongoosejs.com/docs/guide.html#definition.

Despues de definir el objeto pones una `,` y agregas un objeto como el siguiente:

```javascript
{
  timestamps: true;
}
```

Esto habilita 2 columnas mas que son la de "creado y actualizado" y defines el modelo de la siguiente manera:

```javascript
const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;
```

## 2. Crear el Routing de Usuarios

Para crear un routing todo se consentra en la constante app por lo que se usa de la siguiente manera:

```javascript
app.get("/ruta", (req, res) => {
  res.send("Hola mundo");
});
```

De esta namera podemos establecer una ruta y devolviendo algo con res.

- El `request (req)` es la peticion con todos los datos que se envia al servidor.

- El `response (res)` es la respuesta que se genera del servidor hacia el cliente.

Tambien existe el metodo `use()` que soporta todos los metodos http y se usa de la siguiente manera:

```javascript
app.use("/ruta", (req, res) => {
  res.send("Hola mundo");
});
```

### 2.1 Agrupamiento

Lo que sualmente se recomienda es agrupar las rutas y los controladores por eso el metodo `use()` va a ser a donde lleguen todas las rutas, por ejemplo ruta principal seria de la siguiente manera.

```javascript
app.use("/api/Usuarios", usuarioRoutes);
```

- El primer argumento es la ruta principal la cual es: `/api/usuarios`.
- El segundo argumento hace referencia al archivo donde se agrupan las rutas en este caso `usuarioRoutes.js` que se debe importar en el archivo `index.js`.

---

Para seguir esta convencion se hace una serie de pasos:

1. Se define una carpeta llamada `routes` y se crea un archivo llamado `usuarioRoutes.js` para agrupar todas las rutas correspondientes a `Usuarios`.

2. Dentro se importa `express` y se define una constante como se muestra acontinuacion:

   ```javascript
   const router = express.Router();
   ```

   - Con el metodo `Router()` podemos especificar que tipo de ruta es get, put, etc...

3. Con la variable `router` podemos especificar las diferentes rutas despues de haber definido la ruta principal en el archivo `index.js` junto a sus metodos y se exporta por defecto el router como se muestra a continuación.

   ```javascript
   router.get("/ruta", (req, res) => {
     res.send("Hola mundo");
   });

   router.put("/ruta", (req, res) => {
     res.send("Hola mundo");
   });

   export default router;
   ```

   - En este momento ya podemos hacer muchas rutas pero el callback que se define dentro lo podemos separa aun mas para tener codigo mas limpio.

4. Separamos mas la funcionalidad moviendo los callback de cada ruta a otro archivo, entonces creamos una carpeta llamada `controllers` y se crea un archivo llamado `usuarioController.js`.

5. Dentro del archivo `usuarioController.js` definimos las funciones que daran soporte a la aplicación y la exportamos nombrada por ejemplo:

   ```javascript
   const registrar = async (req, res) => {
     // Codigo para registrar...
   };

   export { registrar };
   ```

   la funcion puede ser o no asyncrona todo depende si se consulta algo a la base de datos y despues podemos importarla y usarla en el archivo de rutas que definimos en este caso `usuarioRoutes.js` en cualquiera de las rutas por ejemplo:

   ```javascript
   router.get("/ruta", registar);
   ```

   con esto ya separamos ruta principal, las agrupaciones de las rutas y la funcionalidad de esas rutas.

Hasta este momento se debe tener esto:

```text
/
├── config/
│   └── db.js
├── controllers/
│   └── usuarioController.js
├── models/
│   └── Usuario.js
├── node_modules/
├── routes/
│   └── usuarioRoutes.js
├── index.js
└── package.json
```

> **NOTA:** Si se quiere probar el api con algunas rutas que ya se definieron es recomendable usar POSTMAN o THUNDER CLIENT.

## 3. POSTMAN

Para probar las APIs que crearemos abrimos `postamn` o `thunder client` y procedemos a generar nuestra propia coleccion de end points para hecerlo seguimos los siguientes pasos.

1. Vamos a crear una nueva coleccion presionando en el boton `new` > `collection` y asignamos el nombre a esa coleccion en este caso de llamara `UpTask_MERN`, de este modo ya creamos la coleccion.

2. Despues de crear la coleccion ya podemos poner los `request` precionando en el boton de `+` y agregando la `ruta` y el tipo de `request` y presionando en el boton `send` y veremos la respuesta abajo.

3. Podemos guardar ese `EndPoint` dando clic en el boton `save` y asignandole un nombre que identifique que hace ese `EndPoint` ejemplo `Registro de Usuarios`.

4. Tambien podemos ver que algunas veces escribimos una ruta casi identica a otra solo cambia el final podemos agrupar en una varible siguiendo los siguientes pasos:

   - Seleccionas la parte que se repite ejemplo `localhost:4000/api/usuarios` y al ya seleccionarla aparece arriba un cuadro que dice `Set as variable` > `Set as new variable` y asignamos un nombre y lo agregamos al `Active Envairontmen` en la que estamos trabajando.

5. Cuando se requiere enviar datos de tipo `POST` por ejemplo puedes habilitarlo en postman dirigendote a la pestaña `body` que se encuantra abajo de la url y seleccionar el campo `raw` y cambiarlo por `json` y te permite escribir un json con los datos que se envia desde el cliente.

## Pasos para Autenticar, Registrar y Confirmar Usuarios

Para estos pasos voy a poner como tal el algoritmo que se usa y si es necesario pondre codigo.

- ### **Algortimo para Registar Usuarios**

  1. Lo primero es hacer una ruta que soporte `Registrar Usuarios` y declarar esa funcion en el archivo `usuarioController.js`.

  2. Para registrar un usuario se requieren los datos que definimos en el modelo `Usuario.js` solo `nombre`, `password` y `email` se los podemos pasar por el body en postman mediante json y lo enviamos, el json puede ser por ejemplo.

     ```json
     {
       "nombre": "Abraham",
       "password": "password",
       "email": "correo@correo.com"
     }
     ```

  3. Para obtener los datos que enviamos del body tenemos que habilitar en el `index.js` abajo de app el envio de informacion hacia el api con la siguiente intruccion:

     ```js
     app.use(express.json());
     ```

     y con esto ya podemos ir a la funcion de la ruta `registar` y obtener los valores con `req.body` puedes hacer un console log para que puedas revisar que sale.

  4. El siguiente paso es registar esos valores en la base de datos de mongo con el `modelo` que definimos en `Usuario.js` hacemos los siguente en `usuarioController.js`:

     - Importamos el modelo.
     - En un try catch captamos el error por si hay errores.
     - Creamos una instancia del modelo de usuario y le pasamos los datos como se muestra a continuación:

       ```js
       const usuario = new Usuario(req.body);
       ```

       si enviamos una peticion con postman se agregan esos valores a una intancia de tipo usuario ya con la informacion del modelo y la que enviamos por `req.body` puedes mostrarlo en consola, los demas valores que definimos en el modelo se agregan siempre y cuando los hallamos definido por defecto, en caso de que no se hallan agregado los tenemos que agregar siguiendo la logica de programacion (los que faltan).

     - En el paso anterior ya creamos el objeto con algunos datos que enviamos pero si checamos en `compass` solo se creo la base de datos y la carpeta llamada usuarios pero tenemos que almacenarlo en la base de datos con la siguiente instruccion:

       ```js
       const usuarioAlmacenado = await usuario.save();
       ```

       > **NOTA:** Como esto interactua con la base de datos la funcion se vuelve asincrona hasta que finalice la incersion de datos.

       y por ultimo se retorna el usuario almacenado con la siguiente instruccion.

       ```js
       res.json(usuarioAlmacenado);
       ```

       al hacer la peticion en postman esto retorna al front un objeto con la informacion del usuario de la base de datos y lo puedes comparar con el de compass.

       > **NOTA:** en este punto si se vuelve a enviar la peticion en postman con los mismos datos se generan errores como duplicacion ya que pusismos en el modelo que algunos parametros son **UNICOS**.

  5. **_Evitar registros duplicados_**

     - Extraemos al inicio el `email` con `req.body`
     - Consultamos la base de datos con la siguiente funcion

       ```js
       const existeUsuario = await Usuario.findOne({ email });
       ```

       si esta registrado mostrara un `objeto` con los datos del usuario si no mostrara `null`

     - Con in `if` preguntamos si `existeUsuario`, si existe mandamos un mensaje de error como json, si no se sigue a registrarlo.

  6. **_Hashear los passwords_**

     - Lo primero es instalar una dependecia llamada `bcrypt`

       ```bash
       npm i bcrypt
       ```

     - En el modelo de Usuarios el archivo `Usuario.js` se va a implementar el haseo de contraseñas despues de declarar el modelo y antes de definirlo en una constante.

     - Con la variable del esquema indicamos con el metodo `usuarioSchema.pre("save", asynnc function(next))` que se va a ejecutar antes de que guarde en la base de datos la `funcion` va a tener toda la logica para hashear los passwords se utiliza asi por que se va a hacer referencia al `this` en arrow function tiene un contexto diferente.

     - Lo primero es que vamos a comparar si el password a sido modificado con `!this.isModified('password')` si si lo niega y hashea ese password si no lo niega y se pasa al siguiente middleware con `next()`.

     - La funcion recibe como parametro next y despues generamos `salt` con la libreria de `bcrypt` como se muestra a continuacion:

       ```js
       const salt = await bcrypt.genSalt(10);
       ```

     - Despues con `this.password` que hace referencia al objeto actual y se declara asincronamente con `bcrypt.hash()` y se pasan como parametros la string que queremos hashear y el salt de tal manera que el codigo queda asi:

       ```js
       this.password = await bcrypt.hash(this.password, salt);
       ```

       esto va a generar un hash y lo va a almacenar en password y se va a guardar en la base de datos ya hasheado.

     - Si vamos a postman y enviamos otra vez la peticion ya regresara el pasword hasheado y la demas informacion.

  7. **_Generar un token unico_**

     Para esto creamos una carpeta llamada `helpers` en la raiz del proyecto y creamos un archivo llamado `generarId.js` y dentro vamos a crear una funcion con el mismo nombre del archivo y exportamos por defecto se va retornar una cadena de string aleatoria.

     Despues lo importamos en el controlador de `usuarioController.js` y asignamos el token antes de guardar en la base de datos.

- ### **Algortimo para Autenticar Usuarios**

  1.  Definimos una nueva ruta en el archivo `usuarioRoutes.js` llamada `/login` y definimos una funcion en los controladores llamada `autenticar` y lo imortamos en la ruta.

  2.  En la funcion tenemos que extraer el `email` y el `password` que vienen del `req.body` y realizamos las siguientes comprobaciones.

      - Comprobar que el usuario existe
      - Comprobar si el usuario esta confirmado
      - Comprobar su password

  3.  **_Comprobado que existe el usuario_**

      - Consultamos el modelo con `findOne` y le pasamos el `email` si existe regresara una instancia del usuario si no regresara null.

      - Comprobamos y si no existe con un `if` mandamos hacia el frontend una respuesta de tipo `404` que no se encontro ese usuario si si se sigue al siguiente punto para ver si esta confirmado.

  4.  **_Comprobando si el usuario esta confirmado_**

      - Al tener una instancia de usuario podemos consumir sus datos por lo tanto podemos acceder a la propiedad `confirmado` que declaramos al principio y comprobamos si esta confirmado con un `if` si no esta confirmado mandamos un mensaje de tipo `403` hacia el frontend y si si procedemos con la siguiente comprobacion.

  5.  **_Comprobando password_**

      - Procedemos a ir al modelo de Usuarios que en este caso es el archivo `Usuarios.js` y procedemos a crear una funcion despues de la funcion `pre()`.

      - La funcion se va a llamar `comprobarPassword` y se le va asignar una funcion donde el parametro va a ser el password del formulario, la tenemos que delarar con el esquema y con la propiedad `methods` de la siguiente manera:

        ```js
        usuarioSchema.methods.comprobarPassword = async function (
          passwordFormulario
        ) {};
        ```

      - La funcion va a retornar `true` o `false`, va hacer una comparacion de una string que en este caso es el `password` que no esta hasheado contra una string que esta hasheada en este caso la de la base de datos y para compararla se hace uso de la libreria `bcrypt` y el metodo `compare` de tal manera que la funcion completa es:

        ```js
        usuarioSchema.methods.comprobarPassword = async function (
          passwordFormulario
        ) {
          return await bcript.compare(passwordFormulario, this.password);
        };
        ```

      - Una vez echa la funcion vamos al controllador en el metodo autenticar y comprobamos al usuario preguntando mediante un `if` y la instancia de usuario y luego invocamos la funcion `comprobarPassword()` y pasamos el password que se tiene del formulario y podemos testearlo con postman poniendo un `console.log()`.

      - Si el password es incorrecto mandamos un mensaje de error al frontend de codigo `403`.

      - Si el pasword es correcto podemos retornar al frontend con `res.json()` un objeto con los datos del usuario que esta en la base de datos.

        > **NOTA:** **No** tienen que ser todos los **_datos_** solo algunos.

      - Como dijimos en la nota se va a contruir un objeto para no retornar todo el objeto del usuario que vien de la base de datos el objeto va a ser de esta manera:

        ```js
        {
         _id: usuario._id,
         nombre: usuario.nombre,
         email: usuario.email
        }
        ```

        > **Nota:** Tambien tenemos que retornar un jsonwebtoken

      - Como se dijo en la nota tenemos que regresar un token tambien y lo tenemos que crear de la siguiente manera:

        1.  Intalamos la dependencia con:

            ```bash
            npm i jsonwebtoken
            ```

        2.  Generamos en la carpeta `helpers` un archivo llamado `generarJWT.js` e importamos jwt y hacemos una funcion con el mismo nombre que el archivo tomara como parametro el `id` del usuario y la exportamos por defecto.

        3.  Vamos a retornar un jwt con el metodo `sign()` de jwt y dentro le pasamos los 3 parametros como aparece abajo

            ```js
              { id }, // los datos que se van a tokenizar
              process.env.JWT_SECRET, // llave secreta que se declara en las variables de entorno puede ser cualquiera pero segura
              {expiresIn: "30d"} // la caducidad de ese jwt
            ```

            y terminamos de agregar el token en el objeto de arriba quedando de la siguiente manera

            ```js
            {
              \_id: usuario.\_id,
              nombre: usuario.nombre,
              email: usuario.email
              token: generarJWT(usuario._id)
            }
            ```

- ### **Algoritmo para Confirmar Usuarios**

  1. Definimos una nueva ruta llamada `/confirmar/:token` notece que el tiene `:token` con esto asigmanos un valor a la ruta por lo tanto es dinamica esa ruta.

  2. Declaramos una funcion llamada `confirmar` en el archivo `UsuarioController.js`y lo hacemos disponible en el router.

  3. Vamos a postman y declaramos una nueva ruta para a la que ya delaramos para probar ese endpoint y le pasamos cualquier parametro y checamos que funcione con `req.params.elNombreAsignado` en este caso `token`.

  4. Buscamos que el token que extraigamos de la url del paso anterior sea igual al que esta en la base de datos buscando con el metodo `findOne` y le pasamos el objeto `token` que extragimos de la url.

  5. Preguntamos si existe una intancia de un Usuario con un if `usuarioConfirmar` no existe regresamos al front un mensaje de `token invalido`

  6. En un `try catch` si si existe la intancia la propiedad `confirmado` pasa a ser `true` y reseteamos el token vacio por que es de un solo uso.

  7. Guardamos en la base de datos con la siguiente intruccion:

     ```js
     await usuarioConfirmar.save();
     ```

  y retornamos un mensaje al front de usuario confirmado.

- ### **Algoritmo para Recuperar Password**

  1. Declaramos una nueva ruta de tipo `post` y se llamara `olvide-password` y declaramos una funcion en el controller con el mismo nombre.

  2. Extraemos el `email` de `req.body` y en postman hacemos un request a la ruta que acabamos de hacer y le pasmos en el body el `email` con el email

  3. Como ya tenemos extraido el email lo buscamos en la base de datos con con `findOne` y le pasamos el email

  4. Comparamos si el usuario existe, si no existe retornamos al front un mensaje de error.

  5. Si existe en un `trycach` generamos un token con la funcion en `helpers` llamada `generarId` y retornamos un mensaje que diga `hemos enviado un email con las intrucciones`

  6. Hacemos otra ruta de tipo `get` que va a ser dinamica y apunta a `olvide-password/:token` y creamos su respectiva funcion.

  7. En la funcion extraemos el token y vamos a buscar en la base de datos y buscamos el token.

  8. Si el token es NO es valido retornamos un mensaje de error si el toquen es valido retornamos un mensaje de que `Token es valido y el usuario existe`.

  9. Declaramos una nueva ruta para que se cree su nuevo password.

  10. Extraemos el `token` de la `url` y el `password` del `body` y repetimos el paso 7 comparamos el usuario y cambiamos la pasword por la que extraemos del `body`.

  11. Reseteamos el token y guardamos en la base de datos y retornamos un mensaje al front y lo probamos en postman.

- ### **Rutas Privadas**

  Todo lo anterior es del area publica por eso a continuacion se creara rutas privadas.

  1. Declaramos una carpeta llamada `middleware` y adentro un auchivo llamado `checkAuth.js` y una funcion con el mismo nombre y la exportamos y la importamos en `usuarioRoutes.js`.

  2. Delcaramos una nueva ruta llamada `/perfil` y va a tener 2 finciones la que creamos `checkAuth` y segido la de `perfil` y declaramos una nueva funcion llamada `perfil` en controllers.

  3. La funcion de `checkAuth` es la funcion que va a proteger la ruta en este caso va a comprobar que el usuario esta logueado con el jwt y de mas y despues accedera a la otra funcion llamada `perfil`.

  4. Podemos hacer las devidas pruebas en postamn para que chequemos que no manda a la funcion perfil.

  5. La funcion de `checkAuth` recive tres parametros el `req` y el `res` y `next` que hace referencia a al siguiente middleware.

  6. Para checar que el usuario esta autenticado `req.headers.authorization` y podemos probarlo en postman en la pestañana `Authorization` y luego el `type` sera `Bearer Token` y despues creamos un token ese token es el `jwt` que creamos anteriormente.

  7. Hacemos la siguieente comprobacion:

     ```js
     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
     ```

     si esta la autorizacion y empieza con `bearer` obtenemos el token

  8. Despues decodificamos el jwt con el metodo `verify()` y pasamos el `token` y el le pasamos con segundo parametro la variable de entorno que declaramos `JWT_SECRET`

  9. Consultamos y lo guardamos en la variable `req.usuario` para eso tambien tenemos que importar el modelo checar el archivo `checkAuth.js`

  10. Si no hay un token o no lo envia el usuario vamos a mostar un mensaje de error.

  11. Leemos desde el archivo controllers en la funcion `perfil` el `req` que creamos en el archivo `checkAuth` y mandamos como respuesta al front end el usuario.

Hasta esta parte ya quedo la autenticacion.
