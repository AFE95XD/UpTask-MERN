## Para configurar la base de datos en mongo con express es de la siguiente manera:

> **NOTA:** Ya debe de estar configurada la base de datos en atlas y conectado a compass.

#### Intalar la depencia de mongoose

```bash
npm i mongoose
```

Despues de instalarla tenemos que crear una carpeta llamada `config` y dentro db.js esta dependencia si se ocupa en produccion, y creas una funcion asincrona para conectar a la db. Checar la string de coneccion las opciones ya no se configuran el ejemplo esta en el archivo `db.js`, despues de crear la funcion hay que mandarla a llamar en el archivo `index.js`.

#### Intalar y configurar las variables de entorno

```bash
npm i dotenv
```

Despues de instalarla la vamos a configurar en el archivo `index.js` y despues de declarar la constante de express agregamos la config de la dependencia solo con la siguiente linea.

```javascript
dotenv.config();
```

Agrega el archivo `.env` a la raiz del proyecto y especificas las variables en mayuscula y sin comillas, y se llaman en los archivos de js con la siguente instruccion

```
process.env.NOMBRE_DE_LA_VARIABLE
```

> **NOTA:** Asegurate de declarar una constante para el puerto con 2 valores ya que en produccion es una y en desarrollo es otra ese la declaras en el `index.js`.
