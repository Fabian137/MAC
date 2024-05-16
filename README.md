
# Extrapolación y Youtube
La aplicación final se encuentra en la página [Web App](https://audi-mac-e.netlify.app/)

## Guía de uso

![[README-20240516120237367.webp]]

Veremos tres inputs los cuales ya tienen datos (que fueron usado en el proyecto) pero también podemos ingresar los que nosotros querramos, tomando en cuenta que los valores se ingresan separador por comas
1. El primer input hace referencia a los días de abril: $x$
2. El segundo hace referencia al número de vistas en su respectivo día: $f(x)$
3. El último input es donde ingresaremos el día del que queremos aproximar el número de vistas
4. Presionamos el botón de *Generar Gráfico* que nos desplegará la cantidad de vistas aproximada y una gráfica donde podemos ver los datos ingresados como puntos rojos y en un punto azul la cantidad de vistas aproximada
	1. Hay opciones que ofrece la propia gráfica para hacer zoom, etc.


De esta manera podremos generar información o tener una idea sobre si los siguientes días habrá un incremento de las vistas en el canal para saber que sería lo más adecuado como subir un vídeo o varios o solo uno de gran calidad, segun se considere.



---

## Recursos
- Para la gráfica se utilizó la librería de [Plotly](https://plotly.com/). Para eso agregamos el *cdn* en donde vayamos a usar la librería.
```html
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
```

- Para operaciones usamos [math.js](https://mathjs.org/)
```html
<script src="https://cdn.jsdelivr.net/npm/mathjs/lib/browser/math.js"></script>
```

  - Y por último se uso [Netlify](https://app.netlify.com) para el hosteo de la web app