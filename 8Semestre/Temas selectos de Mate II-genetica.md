
*El Machine Learning es Estadística multivariada iterada alv.*
***Mucha de esta discución viene en Izenman. Modern Multivariate Statistical Techniques***

**¿Qué son las desiciones Bayesianas, mixtas?**


## El machine learning (Algoritmos)
Desde la perspectiva de algoritmos se dan otras perspectivas y paradigmas para entender el machine learning

-
#### Aprendizaje Supervisado
#### Aprendizaje no Supervisado
#### Aprendizaje por refuerzo
#### etc


Tarea: Rescatar cosas de ArquitecturaIA_CesarGalindo. Hacer notas, filtrar, limpiar para subirlas a github, ej. Ruta prosiva · coherente · acumulativa.

---

### Martingalas
*Tiene un vídeo en youtube. Mucho que ver con Harmonic Analysis*
Viene de la esperanza condicional

[[https://youtu.be/XgTEkEp-Fv8]]

> [!question]
> ¿Cuál es el punto de las martingalas?, 

Dar un estrategia de tal manera que, si $\{B_{i}\}$ son las estrategias, se define

> [!question]
> ¿Cómo se definen y qué son las estretegias?


$$
\{B_{i}X_{i}\}
$$
Sea $Z_{n} = B_{n}X_{n} \in L^{1}(P)$
$$
[^1]\mathbb{E}[ Z_{n} | \mathscr{F}_{m} ] = Z_{m}\;\; m\leq n
$$
Martingalaa

---

Recordar cosas de [[Esperanza Condicional]]

[^1]: $\mathscr{F}$ es la información hasta un momento dado
---

> [!question]
> ¿Qué es un vector gaussiano?

$$
(B_{t_{1}}, B_{t_{2}}, \dots, B_{t_{n}})
$$

---
250326

$$
\begin{equation}
(\Omega, \mathsrc{F}, \mathbb{R}) \dots 1)
\end{equation}
$$
son espacios completos (es un proceso que se logra añadiendo nulos)

Bajo la medida real $\mathbb{P}$, el procceso $S_{n} = \sum_{n=1}^{n}X_{i}$ tiene deriva (*derivada?*):
$$
\mathbb{E}_{\mathbb{P}}[S_{n+1} | \mathcal{F}_{n}]
$$

Si 1) no tiene martingalas, se hace un *cambio de medida (?)* $(\widetilde{\Omega}, \mathcal{F}_{\widetilde{\Omega}}, \mathbb{Q})$. O bien es una transgreción

> [!NOTE]
> "Filtración"
> $$
> \mathcal{F}_{n} \subseteq \mathcal{F}_{n+1} \subseteq \dots \mathcal{F}_{N} \subseteq \dots \mathcal{F}
> $$
> "Estamos filtrando la sigma algebra"
> 



> [!important]
> La probabilidad condicional es un cambio de medida *alv*
> $$
> (\Omega, \mathcal{F}, \mathbb{P}) \to (B, \mathcal{F}_{B}, \mathbb{P}(° | B))
 $$


> [!success]
> 
> $$
> \mathbb{E}_{\mathbb{Q}}[Y | \mathcal{F}_{n}] = \frac{1}{Z_{n}}\mathbb{E}_{\mathbb{P}}[Z_{n}Y \:|\:  \mathcal{F}_{n}]
> $$

Markov quita, o mejor dicho, debilita ...

La función de densidad es la derivada de Radon-Nikodim