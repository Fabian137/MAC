# About Git
## .gitignore y rastreo de archivos
Si un archivo o carpeta ya ha sido rastreado y confirmado en commits anteriores el archivo **.gitignore** no cumplirá su función y no ignorara el archivo señalado, asi que usando 

```bash
git rm -r --cached carpeta_a_ignorar
```

Dejamos de rastrear estos archivos sin borrarlos del sistema local
Una vez hecho esto **.gitignore** debería volver a ignorar los archivos que nos daban "problemas"

## git stash
 `git stash` para guardar temporalmente los cambios en tu rama actual y luego cambiar a otra rama. Aunque el problema pueda ser no haber indicado como queremos hacer el pull (que fue mi caso) [[About GitHub#"Sincronización" completa con una rama]]

1. Guarda los cambios locales en un stash:

   ```bash
   git stash save "Mis cambios pendientes"
   ```

   Esto guardará tus cambios locales en un stash con un mensaje descriptivo.

2. Cambia a la rama `nombre_rama`:

   ```bash
   git checkout nombre_rama
   ```

3. Cuando hayas terminado de trabajar en la rama `nombre_rama` y desees volver a tus cambios locales, puedes aplicar el stash:

   ```bash
   git stash apply
   ```

   Si tienes múltiples stashes, puedes aplicar un stash específico utilizando 
   `git stash apply stash@{n}`, donde `n` es el número de stash que deseas aplicar.

   Si deseas eliminar el stash después de aplicarlo, puedes usar:

   ```bash
   git stash drop
   ```

   O eliminarlo directamente al aplicarlo:

   ```bash
   git stash pop
   ```

Estos comandos te permiten cambiar entre ramas y administrar tus cambios locales de manera efectiva. Sin embargo, ten en cuenta que si hay conflictos entre tus cambios locales y los cambios en la rama `nombre_rama`, deberás resolverlos después de aplicar el stash.
`git stash list` : muestra una lista de stashes

## "Sincronización" completa con una rama

Si deseas recibir todos los cambios del repositorio remoto sin importar lo que tengas localmente, puedes hacerlo utilizando el comando `git fetch` seguido de `git reset`. Esto descargará todos los cambios del repositorio remoto y moverá tu rama local para que coincida con la rama remota. Aquí tienes los pasos:

1. Asegúrate de estar en la rama en la que deseas recibir los cambios. Si deseas recibir los cambios en la rama `nombre_rama`, puedes cambiar a ella utilizando:

   ```bash
   git checkout nombre_rama
   ```

2. Luego, ejecuta el siguiente comando para obtener todos los cambios del repositorio remoto:

   ```bash
   git fetch origin nombre_rama
   ```

   Esto descargará todos los cambios de la rama `nombre_rama` en el repositorio remoto, pero no aplicará ningún cambio a tu rama local todavía.

3. Finalmente, ejecuta `git reset` para mover tu rama local para que coincida con la rama remota:

   ```bash
   git reset --hard origin/nombre_rama
   ```

   El modificador `--hard` significa que tu rama local se restablecerá completamente para que coincida con la rama remota, y cualquier cambio no confirmado se perderá.

Con estos pasos, tu rama local estará en sincronía completa con la rama `nombre_rama` del repositorio remoto, y todos los cambios se aplicarán. Ten en cuenta que este proceso eliminará cualquier cambio no confirmado en tu rama local, así que asegúrate de haber guardado y respaldado tus cambios importantes antes de hacerlo.

*-- Gracias chatGPT >_<*
