




# Unidad 1

## Def
Sea $f: \mathbb{R} \to \mathbb{R}$ una función. Decimos que $f$ es periódica si $\exists \: T \in \mathbb{R}_{+}$ tal que $f(t+T) = f(t), \; \forall t \in \mathbb{R}$


#### Propiedades del sen y cos

> [!hint]
> Recordamos las propiedades 
> 1) $\sin(A\pm B) = \sin(A) \cos(B) \pm \cos(A) \sin(B)$
> 2) $\cos(A\pm B) =\cos(A)\cos(B) \pm \sin(A)\sin(B)$

### Ejemplitos
Las siguientes funciones son peridódicas:
- $f(t) = sen(t)$
Asi, tomamos $T=2\pi \: \in \mathbb{R}_{+}$, tenemos que
$$\begin{align*}
f(t+T) &= f(t+2\pi) \;\;\; &\text{por def. de }T\\
&=\sin(t+2\pi) \;\;\; &\text{por def. de }f\\
&=\sin(t)\cos(2\pi) + \cos(t)\sin(2\pi)    & \text{por pro. del } \sin \\
&=\sin(t) \cdot 1 + \cos(t)\cdot 0 
\end{align*}$$

> [!info]
> >[^1] *Las funciones pueden no tener un périodo definido. La def. de éste no habla del periodo, solo de una constante que se repetirá*

- $f(t) = \cos(5t)$
Consideramos $T=2\pi \: \in \mathbb{R}_{+}$. Asi
$$\begin{align*}
f(t+T) &= \cos (5(t+T)) & \text{por def. de } f\\
&= \cos(5(t+2\pi)) & \text{por def. de }T\\
&=\cos (5t + 10\pi) &\text{distribucion, algebra}\\
&= \cos(5t)\cos(10\pi) - \sin(5t)\sin(10\pi)\\
&(\cos(10\pi) = 1)\\
&=\cos(5t) &\text{ pues } \cos(10\pi) = 1 \; y \; \sin(10\pi) = 0\\
&= f(t) &\text{ por def de } f\\
& \therefore f(t+T) = f(t),  &\text{con } T=2\pi \text{, i.e., } f \text{ es peri\'odica} 
\end{align*}$$

*T debe ser positiva*
#### ¿qué es un ángulo?

> [!todo]
> *Longitud de un arco en un círculo de radio 1. Lo demás es una reescalacion o la congruencia.*
> (aqui va/hay un dibujito)

- $f(t) = 2$
Consideramos $T = \sqrt{ 2 } \in \mathbb{R}_{+}$. Así
$$\begin{align*}
f(t+T) &= f(t + \sqrt{ 2 }) & \text{por def. de }T\\
&= 2 & \text{def. de } f \text{  REVISAR si es 2 o -2 }\\
&=f(t) & \text{def de } f\\
&\therefore f(t +T ) = f(t) & \text{ con } T=\sqrt{ 2 } \text{ i.e., }f \text{ es peri\'odica} 
\end{align*}$$

## Teorema 1
Sean $f:\mathbb{R} \to \mathbb{R}$ y $T \in \mathbb{R}_{+}$, con $f(t+T) = f(t), \; \forall \: t\in \mathbb{R}$ se cumple que
$$\forall \: n \in \mathbb{Z} : \: f(t+nT) = f(t)$$
##### **DEM**
*Como $\mathbb{Z}$ tiene cardinalidad $\aleph_{0}$, o la de los naturales, podemos hacer inducción partiendo a $\mathbb{Z}$ en tres. O bien podríamos hacer solo un caso y después justificar unicidad de los sitemas de peano*

Como $\mathbb{Z} = \mathbb{N} U \{0\} U \mathbb{N}_{-}$, con $\mathbb{N}_{-} = \{-n \; : \; n \in \mathbb{N}\}$ y la unión es disjunta.
1. Caso: $n \in \mathbb{N}$
En este caso haremos inducción matemática sobre $n$, i.e., 
P.D: $\forall \; n\in \mathbb{N} : \; f(t+nT) =f(t), \; \forall t \in \mathbb{R}$

> [!question]
>[^2] Inducción débil es equivalente a inducción fuerte y a un buen orden, ¿cómo equivalente?

[^1]:

[^2]: 
###### Caso base $n=1$



Sea f:R→Rf:R→R una función periódica. Definimos el **periodo fundamental** (o simplemente el periodo) de ff como el mínimo periodo positivo, es decir:

$P=min⁡{T∈R+:f(t+T)=f(t),∀t∈R}.P=min{T∈R+:f(t+T)=f(t),∀t∈R}$

El conjunto de periodos positivos es un subconjunto de RR acotado inferiormente (por 0). El mínimo podría no existir. Si no existe, decimos que ff no tiene periodo fundamental.

### Ejemplos

----

## Tarea 1

> [!todo]
> 5. ***Argumentar mejor***
> Hallar el periodo de la función $f(x) = \sin\left( \frac{\pi x}{5} \right) + \cos\left( \frac{\pi x}{7} \right)$
> 
> Sabemos que la función $\sin$ y $\cos$ son periódicas, y la suma de funciones periódicas es otra función periódica (?)
> Ent. sabemos que $\exists \; T \in \mathbb{R}_{+}$ tal que
> $$
> \begin{align*}
> \sin \left(  \frac{\pi x}{5}+\frac{T}{5}  \right) + \cos\left( \frac{\pi x}{7} +\frac{T}{7} \right) &= \sin\left( \frac{\pi x}{5} \right) + \cos\left( \frac{\pi x}{7} \right) & \text{ por def. de funcion periodica}\\
> \exists \; m,n \in \mathbb{Z} \text{ t.q. } \; \frac{T}{5} = 2\pi m \;\wedge\; &\frac{T}{7} = 2\pi n & \text{Teo. 1(?) o bien por def. de periodo} \\
> &T = 10\pi m \; \wedge \; T = 14\pi n & \text{cuentas}\\
> \end{align*}
> $$
> Asi tomamos $m=7$ y $n=5$, i.e., $P=70$

12.
Demuestre que si $f(t)$ es una función periódica, con periodo $P$, entonces la funcion $g(t) = f(at)$ con $a \neq 0$, tiene periodo $\frac{P}{a}$
Podríamos plantear casos para cuando $a<0$ y $a>0$ (?).
Hipótesis tenemos que $f(t)$ es periódica, es decir $f(t + T) = f(t)$ (o también es $P$ en lugar de $T$ (?))

para $f(at+T)$, ya es periodica por hip, asi $f\left( t+\frac{T}{a} \right)$

$$
f(at + T) = f\left( a \left( t+ \frac{T}{a} \right) \right)
$$


15. Demuestre que si $f: \mathbb{R} \to \mathbb{R}$ es una función tal que $f(t+T) = f(t), \: T\in \mathbb{R}_{+}$, ent. $\forall \: m\in \mathbb{N} : f(t-mT) = f(t),\; \forall t\in \mathbb{R}$. *¿está bien redactado este problema, en la hip.?*

Tomamos $m \in \mathbb{Z}_{-}$, y por el teorema tenemos que de tal manera que
$$
f(t-mT) = f(t+mt) \;\; \text{multiplicacion de signos en } \mathbb{Z} 
$$
asi pues
$$
\forall \: n \in \mathbb{Z} : \: f(t+nT) = f(t) \;\; \text{Teo.1}
$$
en particular para $\mathbb{Z}_{-}$

Otra idea sin el teorema 1, ya que este ejercicio se utiliza para demostrar el Teo. 1:
Por inducción matemática, I.M.:
Caso base $n=1$:
$$
\begin{align*}
f(t-nT) &= f(t- T) & \text{neutro en } \mathbb{R}\\
&= f((t-T) + T) &\text{}
\end{align*} 
$$

$$
e^{-in2\pi} = 1  \text{ para todo  } n \in \mathbb{Z}
$$


---
# 24 - 02 - 26


### Ejemplito
Determina la serie de Fourier para la función cuya forma de onda es
La expresión analítica de la función es:
$$
f(x)=\begin{cases}
x+1, \; \text{ si } \; x \in [-2 ,0]  \\
-x+1, \; \text{ si } \; x \in [0,2]
\end{cases}
$$

$$
f(x+4) = f(x), \; \forall \:x \in \mathbb{R}
$$
Asi, calculamos los coeficientes, con $w_{0}=\frac{2\pi}{P}=\frac{2\pi}{4}=\frac{\pi}{2}$
$$
\begin{align*}
a_{0} &= \frac{2}{P}\int_{-\frac{p}{2}}^{p/2} f(t) dt \;\; \text{ por def. de } a_{0}\\
&=\frac{2}{4} \int_{-2}^{2}f(t)dt \;\; \text{ por def. P } \\
&= \frac{1}{2} \left[ \int_{-2}^{0} f(t)dt + \int_{0}^{2}f(t)dt  \right] \;\; \text{ por prop. de la integral} \\
&= \frac{1}{2}\left[  \int_{-2}^{0}(t+1)dt + \int_{0}^{2} (-t +1)dt  \right] \;\; \text{ por def. de } f\\
&= \frac{1}{2} \left[ \frac{t²}{2} + t \right] |_{-2}^{0} + \\

\therefore a_{0} = 0
\end{align*}
$$

Además $\frac{p}{2}$
$$
\begin{align*}
a_{n} &= \frac{2}{P} \int_{-\frac{p}{2}}^{p/2} \\
&= \\
&= \frac{1}{2} \left[ \int_{-2}^{0} (t+1) \cos\left( \frac{\pi}{2}nt\right) dt + \int_{0}^{2} (-t +1) \cos\left( \frac{\pi}{2}nt \right) dt\right] \;\; \text{ por def. de }t\\
\end{align*}
$$
Notemos que
$$
\begin{align*}
 \int t \cos\left( \frac{\pi}{2} nt  \right) dt &= \frac{2}{\pi n} t \sin\left( \frac{\pi}{2} nt \right) - \int \frac{2}{\pi n} \sin\left( \frac{\pi}{2}nt \right)dt \;& \text{ por Teo. de integraci\'on por partes} \\
& u= t & dv = \cos\left( \frac{\pi}{2}nt \right)\\
&du= dt & v = \frac{2n}{\pi} \sin\left( \frac{\pi}{2}nt \right)
\end{align*}
$$

> [!NOTE]
> No involucra cocientes - no es por fracciones parciales
> No involucra raíces - no es trigonométrica

De aquí, obtenemos
$$
\begin{align*}
a_{n} &= \frac{1}{2} \left[ \frac{2}{\pi n} + \sin \left( \frac{\pi}{2}nt  \right) +\frac{4}{\pi² n²}\cos\left( \frac{\pi}{2}nt \right) + \frac{2}{\pi n}\sin\left( n \frac{\pi}{2} \right) \right] \big|_{-2}^{0} \\
& + \frac{1}{2} \left[ -\frac{2}{\pi n} + \sin \left( \frac{\pi}{2}nt  \right) - \frac{4}{\pi² n²} \cos\left( \frac{\pi}{2}nt \right) + \frac{2}{\pi n}\sin\left( n \frac{\pi}{2} \right) \right] \big|_{-2}^{0} \\
&= \frac{1}{2} \left[\frac{4}{\pi² n²} - \frac{4}{\pi² n²} \cos(\pi n) \right] + \frac{1}{2}\left[ - \frac{4}{\pi² n²} \cos (\pi n) + \frac{4}{} \right]
\end{align*}
$$
También,
$$
\begin{align*}
b_{n} &= \frac{2}{P} \int_{-\frac{p}{2}}^{p/2} f(t) \sin\left( \frac{\pi}{2} nt \right) dt \\
&= \frac{1}{2} []
\end{align*}
$$

---
---

# 26-02-26

#### Observación

Si $f(t)$ es una función par, entonces
$$
\begin{align*}
a_{0} &= \frac{2}{p} \int_{-\frac{p}{2}}^{\frac{p}{2}} \underbrace{f(t)}_{\text{par}} dt = \frac{4}{p}\int_{0}^{\frac{p}{2}} f(t) dt \\
a_{n} &= \frac{2}{p} \int_{-\frac{p}{2}}^{\frac{p}{2}}  \underbrace{ f(t) }_{ \text{par} } dt  \cdot \underbrace{ \cos(nw_{0}t) }_{ \text{par} } dt = \frac{4}{p}\int_{0}^{\frac{p}{2}}  f(t) \cdot \cos(nw_{0}t) dt\\
b_{n} &= \frac{2}{P} \int_{-\frac{P}{2}}^{\frac{P}{2}} \underbrace{ \underbrace{ f(t) }_{ par } \underbrace{ \sin(nw_{0}t) }_{ \text{impar} } }_{ \text{impar} } dt= 0
\end{align*}
$$
$$
\therefore \; f(t) = \frac{4}{P} \sum_{n=0}^{\infty} \underbrace{ \left( \int_{0}^{\frac{P}{2}} f(t) \cdot \cos (nw_{0}t) dt \right) }_{ a_{n} } \cdot \cos (nw_{0}t)
$$

Si la función $f$ es impar, entonces 
$$
\begin{align*}
a_{0} &= \frac{2}{p} \int_{-\frac{p}{2}}^{\frac{p}{2}} \underbrace{f(t)}_{\text{impar}} dt = 0 \\
a_{n} &= \frac{2}{p} \int_{-\frac{p}{2}}^{\frac{p}{2}}  \underbrace{ \underbrace{ f(t) }_{ \text{impar} } dt  \cdot \underbrace{ \cos(nw_{0}t) }_{ \text{par} } }_{ \text{impar} } dt =0 \\
b_{n} &= \frac{2}{P} \int_{-\frac{P}{2}}^{\frac{P}{2}} f(t) \sin(nw_{0}t ) dt= \frac{4}{P}\int_{0}^{\frac{P}{2}} f(t)\sin(nw_{0}t) dt
\end{align*}
$$
$$
\therefore \; f(t) = \frac{4}{P} \sum_{n=0}^{\infty} \left( \int_{0}^{\frac{P}{2}} f(t) \cdot \sin (nw_{0}t) dt \right) \cdot \sin(nw_{0}t)
$$



> [!quote]
> *Ortogonalidad implica independencia lineal*

Recordemos que si $v_{1}, v_{2} \in \mathbb{V} -\{ 0 \}$ donde $\mathbb{V}$ es un prehilbert, son ortogonales, entonces son l.i. pues
$$
\begin{equation}
\alpha_{1}v_{1} + \alpha_{2}v_{2} = 0, \;\; \alpha_{1}, \alpha_{2} \in \mathbb{K} \;\; \dots 1)
\end{equation}
$$



$$
\begin{align*}
\implies& <\alpha_{1}v_{1} + \alpha_{2}+v_{2} , v_{1}> = <0, v_{1}> \; &\text{por 1) (lo de arriba)} \\
\implies & < \alpha_{1} v_{1} , v_{1}> + <\alpha_{2}v_{2}, v_{1}> = 0\; &\text{por linealidad del producto interior} \\
\implies& \alpha_{1}<v_{1},v_{1}> + \alpha_{2}<v_{2},v_{1}> = \; & \text{por linealidad} \\
\implies& \alpha_{1} \cdot \| v_{1}\|^{2} + \alpha_{2}\cdot_{0} = 0\\
\implies& \alpha_{1}\cdot \| v_{1} \|^{2} = 0 \implies \alpha_{1}=0
\end{align*}
$$

De manera análoga, tenemos que $\alpha_{2} =0$
$$
\therefore \{v_{1},v_{2}\} \; \text{ es l.i.}
$$

Podemos generalizar a $n$ vectores, i.e., si
$$
\{ v_{1},v_{2},\dots,v_{n} \} \subset \mathbb{V} -\{0\}  
$$
es un conjunto ortogonal, $(v_{i} \neq v_{j} \implies v_{i} \; \perp \; v_{j})$, entonces el conjunto es l.i.

Primero recordemos que un conjunto
$$
\{ v_{1},v_{2},\dots,v_{n} \} \subset \mathbb{V} -\{0\}  
$$
es l.i. sii cualquier subconjunto finito de él, es l.i.
Si además este conjunto es ortogonal, entonces es l.i.

De esto se deduce que si (un pol. trigonometrico)
$$
\frac{1}{2}a_{0} \sum_{n=1}^{\infty}\underbrace{ \left[ a_{n} \cos(nw_{0}t) +n_{n} \sin(nw_{0}t) \right] }_{ \text{ los coef. son l.i. (los que están dentro de la suma)} } = 0
$$

$$
\begin{align*}
\implies & a_{0} = 0 \\
& a_{n} = 0, \; \forall n \in \mathbb{N}\\
& b_{n} = 0, \; \forall n \in \mathbb{N}
\end{align*}
$$
### Corolario
Si $f(t)$ es una función y $S(t)$ es la serie de Fourier asociada a $f(t)$, entonces $S(t)$ es único.
*Para mostrar unicidad suponemos otro. Asi que suponemos otra serie y las igualamos, despejamos, y restamos sus términos (?) apoyándonos del resultado de que los coef. dentro de la suma/serie son l.i., y... acabamos*

**HAY UNA CORRECCIÓN**

> [!NOTE]
> Una función es integrable sii la integral inferior coincide con la integral superior (integrabilidad de Darboux), basta que esté en un intervalo cerrado y acotado

Los coef. de Fourier siempre existen, cuando $f$ es integrable (en particular porque la función es continua, es condición suficiente), asi la serie de Fourier siempre se puede definir y los coeficientes suelen denotarse como:
$$
\begin{align*}
a_{n}(f) &= \frac{2}{P} \int_{-\frac{p}{2}}^{p/2} f(t)\cdot \cos(nw_{0}t)dt, \;\; \forall n\in \mathbb{N} \cup \{0\} \\
b_{n}(f) &=  \frac{2}{P} \int_{-\frac{p}{2}}^{p/2} f(t)\cdot \sin(nw_{0}t)dt, \;\; \forall n\in \mathbb{N} \cup \{0\}
\end{align*}
$$
Veremos algunos resultados que nos garanticen la convergencia de la serie
*Analogía: que definamos una serie, no significa que converja a un número real*

Sabemos que una serie de Fourier, es el límite de "sumas de Fourier", las cuales son finitas

$$
S_{k}(t) = \frac{1}{2}a_{0} +\sum_{n=1}^{k}[a_{n} \cos(nw_{0}t) + b_{n}\sin(nw_{0}t)] 
$$
Estas sumas tienen $(2k+1)$-términos y estamos considerando que está definida en $\left( -\frac{P}{2}, \frac{P}{2} \right)$
Si $f(t)$ se aproxima a través de $S_{k}(t)$, tenemos
$$
\begin{align*}
f(t) &= S_{k}(t) + \epsilon_{k}(t), \;\; \forall t\in \left( -\frac{P}{2}, \frac{P}{2} \right) \\
\implies \epsilon_{k}(t) &= f(t)-S_{k}(t),
\end{align*}
$$
Es el error de aproximación

Esto nos permite dar la siguiente def.

### Definición: (error cuadrático medio)
Si $f: \mathbb{R} \to \mathbb{R}$ es una función periódica en periodo $P$, se define el error cuadrático medio, denotado por $E_{k}$, como
$$
E_{k} = \frac{1}{P} \int_{-\frac{P}{2}}^{P/2} [\epsilon_{k}(t)]^2 dt = \frac{1}{P} \int_{-\frac{P}{2}}^{P/2} [f(t)- S_{k}(t)]^2 dt
$$


## Teorema 8
Si $f: \mathbb{R} \to \mathbb{R}$ es una función con periodo $P$, y $S_{k}(t)$ es la suma de Fourier asociada, entonces
$$
E_{k} \;\; \text{es el m\'in error cuadrático medio }
$$

> [!important]
> *Si tienes una aproximacion a la funcion a traves de funciones trigonometricos, los coef. de Fourier son los que minimizan el error* 

### Dem
Sabemos que $\frac{P}{2}$ 
$$
E_{k} = \frac{1}{P}\int_{-\frac{P}{2}}^{P/2} [f(t) - S_{k}(t)]^{2}dt \; \text{ por def.}
$$
Para considerar a $E_{k} = E_{k}(a_{0}, a_{1}, \dots, a_{k}, b_{1},b_{2}, \dots, b_{k})$

para que la función sea la que da el error mínimo ¿qué se debe cumplir?
Para que el error sea mínimo, debemos tener que $\nabla E_{k} = \vec{0}$
Luego
$$
\begin{align*}
\frac{ \partial E_{k}}{\partial a_{0}} &= \frac{\partial}{\partial a_{0}} \left[ \frac{1}{P} \int_{-\frac{P}{2}}^{P/2} [f(t)- S_{k}(t)]^2  dt  \right] & \text{por def. de } E_{k}\\
&= \frac{\partial}{\partial a_{0}}\left[ \frac{1}{P} \int_{-\frac{P}{2}}^{\frac{P}{2}} \left[ f(t) - \frac{1}{2} a_{0} - \sum_{n=1}^{k}(a_{n} \cos(nw_{0}t)+b_{n} \sin(nw_{0}t))  \right]^2 \right] dt & \text{por def. de } S_{k} \\
&= \frac{1}{P} \int_{-\frac{P}{2}}^{\frac{P}{2}} 2  \left[ f(t) - \frac{1}{2} a_{0} - \sum_{n=1}^{k}(a_{n} \cos(nw_{0}t)+b_{n} \sin(nw_{0}t))  \right] \left( -\frac{1}{2} a_{0}  \right) dt & \text{ por regla de Leibniz y de la cadena }
\end{align*}
$$

---

03/02/2026

Sea $S_{k}(t)$ un polinomio trigonométrico de la forma
$$
S_{k}(t) = \frac{1}{2} a_{0} + \sum_{n=1}^{k}[a_{n} \cos(nw_{0}t) + b_{n}\sin(nw_{0}t)], \;\; \text{con } w_{0}=\frac{2\pi}{P}
$$
Asi, el error cuadrático medio es:
$$
\begin{align*}
E_{k} &= \frac{1}{P} \int_{-\frac{P}{2}}^{P/2} [f(t)- S_{k}(t)]^2 dt \\
&= \frac{1}{P} \int_{-\frac{P}{2}}^{P/2} \left\{  f(t) - \frac{1}{2}a_{0}- \sum_{n=1}^{k}[a_{n} \cos(nw_{0}t) + b_{n} \sin(nw_{0}t)]  \right\}^2 dt
\end{align*}
$$


i.e., podemos considerar a $E_{k}$ como una función de los parámetros $a_{0},a_{1}, a_{2},\dots, a_{k},b_{1},b_{2},\dots, b_{k}$
Para determinar los coef. que minimizan el error, tenemos que
$$
\frac{\partial E_{k}}{\partial a_{0}} = \frac{\partial E_{k}}{\partial a_{i}} = \frac{\partial E_{k}}{\partial b_{i}} = 0, \;\; \forall i =i,k
$$

Pero
$$
\frac{\partial E_{k}}{\partial a_{0}} = \frac{1}{P} \int_{-\frac{P}{2}}^{P/2} \frac{\partial}{\partial a_{0}} \left\{  f(t)-\frac{1}{2}a_{0} - \sum_{n=1}^{k}[a_{n}\cos(nw_{0}t) + b_{n} \sin(nw_{0}t)]  \right\}^2 dt
$$
por Teo. de Leibniz
$$
= \frac{1}{p} \int
$$

$$
\dots
$$


$$
\begin{align*}
&= -\frac{1}{P} \int_{-\frac{P}{2}}^{P/2} f(t)dt + \frac{1}{2} a_{0} + 0 & \text{ por Teo 5.}\\
&\therefore \frac{\partial E_{k}}{\partial a_{0}} = 0 \Leftrightarrow \frac{1}{2}a_{0}=\frac{1}{P}\int_{-\frac{P}{2}}^{P/2} f(t) dt
\end{align*}
$$
Además,
$$
\frac{\partial E_{k}}{\partial a_{i}} = \frac{1}{P} \int_{-\frac{P}{2}}^{P/2} 2\left\{  f(t) \frac{1}{2} a_{0} - \sum_{n=1}^{k} [a_{n}\cos(nw_{0}t) + b_{n}\sin(nw_{0}t)] \right\} [-\cos(nw_{0}t)]dt \;\; \text{ por regla de la cadena}
$$

$$
\begin{align*}
&-\frac{2}{P} \int_{-\frac{P}{2}}^{P/2} f(t) \cos(i w_{0} t) dt + \frac{1}{P}a_{0}\int_{-\frac{P}{2}}^{P/2} \cos(i w_{0}t) dt \\
&+ \frac{2}{P} \int_{-\frac{P}{2}}^{P/2} \sum_{n=1}^{k}[a_{n} \cos(nw_{0}t) \cos(iw_{0}t) + b_{n} \sin(nw_{0} t) \cos(iw_{0}t)]dt & \text{por linealidad de la integral y distribuyendo} \\
&= -\frac{2}{P} \int_{-\frac{P}{2}}^{P/2} f(t) \cos(iw_{0}t)dt +0+\frac{2}{P}a_{i} \int_{-\frac{P}{2}}^{P/2}\underbrace{ \cos(i w_{0}t) \cos(iw_{0}t) dt }_{ \frac{P}{2} } + 0 & \text{por Teo 5.}\\
&= -\frac{2}{P} \int
\end{align*}
$$

Luego, $\frac{\partial E_{k}}{\partial a_{i}} = 0 \Leftrightarrow a_{i}= \frac{2}{P} \int_{-\frac{P}{2}}^{P/2} f(t)\cos(iw_{0}t) dt$
De manera análoga, tenemos que
$$
\frac{\partial E_{k}}{\partial b_{i}} = 0 \Leftrightarrow b_{i} = \frac{2}{P} \int_{-\frac{P}{2}}^{P/2} f(t) \sin(i w_{0}t) dt
$$
Por lo tanto, los coef. de Fourier minimizan el error cuadrático medio. QED


## Teorema 9
Si $f(t)$ es una función con periodo $P$ y $S_{k}(t)$ es una aproximación por serie trigonométrica de Fourier, entonces.
$$
E_{k} = \frac{1}{P} \int_{-\frac{P}{2}}^{P/2} [f(t)]^2 dt - \frac{a_{0}^2}{4}-\frac{1}{2} \sum_{n=1}^{k}(a_{n}^2 + b_{n}^2)
$$

### Dem 
Sea $f(t)$ una función periódica con periodo $P$ y
$$
S_{k}(t) = \frac{1}{2}a_{0}+\sum_{n=1}^{k}[a_{n} \cos(nw_{0}t) + b_{n}\sin(nw_{0}t)], \;\; \text{ con } w_{0}=\frac{2\pi}{P}
$$
Entonces,
$$
\begin{align*}
E_{k} &= \frac{1}{P} \int_{-\frac{P}{2}}^{P/2} [f(t) - S_{k}(t)]^2 dt, & \text{por def. de error cuadr\'atico}\\
&= \frac{1}{P} \int_{-\frac{P}{2}}^{P/2} \{ [f(t)]^2 - 2f(t) S_{k}(t) + [S_{k}]^2 \} dt & \text{ algebra}\\
&= \frac{1}{P} \int_{-\frac{P}{2}}^{P/2} [f(t)]^2 dt - \frac{2}{P} \int_{-\frac{P}{2}}^{P/2} f(t) S_{k}(t) dt + \frac{1}{P} \int_{-\frac{P}{2}}^{P/2} [S_{k}(t)]^2 & \text{ linealidad de la integral}\\
&
\end{align*}
$$
Notemos que
$$
\begin{align*}
f(t)S_{k}(t) &= \frac{1}{2} a_{0} f(t) + \sum_{n=1}^{k}[a_{n}f(t) \cos(nw_{0}t) + b_{n}f(t)\sin(nw_{0}t)]\\
\implies \int_{-\frac{P}{2}}^{P/2}f(t) S_{k}(t) dt &= \frac{1}{2}a_{0}\int_{-\frac{P}{2}}^{P/2}f(t)dt + \sum_{n=1}^{k}\left[ a_{n} \int_{-\frac{P}{2}}^{P/2} f(t) \cos(nw_{0}t) dt +\underbrace{  b_{n} \int_{-\frac{P}{2}}^{P/2}f(t) \sin(nw_{0}t) dt  }_{ Pa_{n} }\right]
\end{align*}
$$
por linealidad de la integral

*Pedimos que la serie tenga convergencia uniforme para poder hacer intercambio entre la integral y la suma(serie)*
$$
\begin{align*}
= \frac{1}{2} a_{0} \cdot \frac{1}{2}a_{0}P + \sum_{n=1}^{k}\left( a_{n} \frac{1}{2}Pa_{n}+ b_{n} \frac{1}{2}Pb_{n} \right) & \text{ por def. de coef. Fourier } \heartsuit
\end{align*}
$$

nota:
$$
\left( \sum_{n=1}^{k} x_{n} \right)^2 = \sum_{n=1}^{k}x_{n}^{2} + 2\sum_{n=1}^{k} \sum_{m=1}^{k}x_{n}x_{m} +\dots = \sum_{n=1}^{k}x_{n}^{2} + 2\sum_{n,m=1,n\neq m}^{k}x_{n}x_{m}
$$
También,
$$
\begin{align*}
[S_{k}(t)]^{2} = \{  \}
\end{align*}
$$

## Teo. 10
Sea $f: \mathbb{R}\to \mathbb{R}$ una función periódica con periodo $P$. Si $S_{k}(t)$ es una suma de Fourier, entonces
$$
\frac{2}{P} \int_{-\frac{P}{2}}^{P/2}[f(t)]^{2} dt \geq  \frac{a_{0}^2}{2} + \sum_{n=1}^{k}(a_{n}^2 + b_{n}^2)
$$
### Dem
Por el Teo. 9, sabemos que
$$
\begin{align*}
E_{k} &= \frac{1}{P} \int_{-\frac{P}{2}}^{P/2}[f(t)]^{2}dt - \frac{1}{4} a_{0}^{2}-\frac{1}{2} \sum_{n=1}^{k}(a_{n}^{2} + b_{n}^{2})\\
\text{Pero }\; E_{k} &= \frac{1}{P} \int
\end{align*}
$$


## Teo. 11
Sea $f:\mathbb{R} \to \mathbb{R}$ una función con periodo $P$. Si $S_{k}(t)$

---
240326


## Sucesiones

Paseo por la convergencia de sucesiones de funciones
## Def
Una sucesión es una función 
$$
f: \mathbb{N} \to \mathbb{R},
$$
donde se suele denotar $f(n)=a_{n}$. Asi, la sucesión $f$ se representa como 
$$
\{a_{n}\}_{n=1}^{\infty}
$$
Esta es una sucesión real
$$
\begin{align*}
f(1) &= a_{1} \\
f(2) &= a_{2} \\
\vdots\\
f(n) &= a_{n}
\end{align*}
$$

(fotoo)

Nos enfocaremos en sucesiones de funciones reales, las cuales se suelen denotar por $\{f_{n}\}_{n \in \mathbb{N}}$, i.e.,
$$
\begin{align*}
f: &\mathbb{N} \to \mathrsc{F}\\
f(1) &= f_{1}\\
f(2) &= f_{2}\\
&\vdots\\
f(n) &= f_{n}
\end{align*}
$$

#### Ejemplo
La función $f:\mathbb{N} \to F([0,1], \mathbb{R})$ dada por 
$$
\begin{align*}
f(n) & : [0,1] \to \mathbb{R} \\
&f_{n}(x) = x^n
\end{align*}
$$
es una sucesión.

La cual suele denotarse por $\{f_{n}\}_{n \in \mathbb{N}}$ donde $f_{n}: [0,1] \to \mathbb{R}$ está dada por $f_{n}(x) = x^n$

(*graficaaaa*)

Si fijamos a $n \in \mathbb{N}$, digamos $n_{0} \in \mathbb{N}$, ent.
$$
f_{n_{0}} : [0,1] \to \mathbb{R}, \;\; \text{  es una funci\'on}
$$
Si fijamos a $x\in [0,1]$, digamos $x_{0}\in [0,1]$
$$
\{ f_{n}(x_{0}) \}_{n=1}^{\infty} \;\; \text{ es una sucesi\'on real}
$$

*(aqui hay una grafica, como un planoo cartesiano, parece una cuadrícula)*


Consideraremos 2 tipos de convergencia: puntual y uniforme

> [!NOTE]
> 
> $$
> \begin{align*}
> \lim_{ x \to x_{0} } f(x) &= L \iff \forall \; \epsilon > 0, \; \exists \;\delta = \underbrace{\delta(\epsilon, x_{0}) }_{[^3]}  \\
> & t.q. \; 0< |x - x_{0}| < \delta, \; x \in \text{ Dom}f\\
> & \implies |f(x) - f(x_{0})| < \epsilon
> &\\
> & x_{0} \text{ fijo}
> \end{align*}
>  $$
> Decimos que $f$ converge puntualmente
> 
> Convergencia **uniforme**. Decimos que $f$ converge uniformemente en $A$:
> $$
> \begin{align*}
> \forall \; \epsilon > 0, & \; \exists \; \delta:\delta(\epsilon) >0 \;\; t.q. \;\; 0 < |x-y| < \delta \; \text{ con } \;x,y \in A \\
> &\implies |f(x)- f(y)| < \epsilon
> \end{align*}
> $$

[^4]



[^3]: $\text{Aqui vemos porque es "puntual", ya que} \; \delta \; \text{depende de } \epsilon  \text{ y del punto } x_{0}$
[^4]: "La convergencia uniforme depende completamente del Dominio"

[^5]: 

---
#### Ejemplitoss
Desmuestra que $f(x) = 3x$, converge uniformemente en $[0,1]$
SOL:
Debemos probar que
$$
\begin{align*}
\forall \; \epsilon >0
\end{align*}
$$