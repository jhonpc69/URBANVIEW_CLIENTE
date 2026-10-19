# UrbanView cliente

Cliente Angular 15. Usa la rama `dev` con estos cambios y Node 18 con npm.

## Ejecutar localmente

Primero inicia PostgreSQL, Mailpit y la API siguiendo el [README de la API](https://github.com/jhonpc69/URBANVIEW_API/tree/dev). Desde este repositorio:

```sh
cd ide/ChapaTuPointFrontend
npm ci
npm start
```

Abre `http://localhost:4200` en la computadora donde ejecutaste los comandos. Los servicios iniciados en cloud no aparecen automáticamente en tu computadora.

Pulsa **Login** e ingresa con:

- Correo: `demo@urbanview.test`
- Contraseña: `UrbanViewDemo2026!`

La cuenta se crea únicamente cuando la API arranca con el perfil `dev`. Después de pulsar **Enviar código**, abre el buzón Mailpit en `http://localhost:8025`, copia el código y completa **Verificar e ingresar**. Debe aparecer **Usuario** en la cabecera. Las cuentas demo son clientes, no administradores. No se envía correo real.

El cliente llama a `/api`; `proxy.conf.json` redirige esas peticiones a `http://127.0.0.1:8081`. Si cambias el puerto de la API, ajusta el destino del proxy y reinicia `npm start`. No hace falta editar URLs en los servicios.

## Verificar cambios

Desde `ide/ChapaTuPointFrontend`:

```sh
npm run build -- --configuration development
npm test -- --watch=false
```

Las pruebas usan ChromeHeadless. Configura `CHROME_BIN` si tu ejecutable de Chrome/Chromium no se detecta. En el entorno cloud aislado se usa `CHROME_BIN=/usr/bin/chromium npm test -- --watch=false --browsers=CloudChromium`.

Para detener el cliente usa Ctrl+C. No ejecutes `npm ci` mientras `npm start` está activo: reemplaza las dependencias que usa el servidor.
