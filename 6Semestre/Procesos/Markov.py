"""
Dashboard Streamlit (OOP) para una cadena de Markov de 2 estados V/C
con visualizaciones interactivas en Altair (SIN Plotly).

Ejecución:
    pip install streamlit numpy pandas altair
    streamlit run app_markov_vc_altair.py
"""

from __future__ import annotations

import numpy as np
import pandas as pd
import streamlit as st
import altair as alt

CSS = """
<style>
html, body, [class*="css"]  {
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, "Noto Sans", "Liberation Sans", sans-serif;
}
h1, h2, h3 { letter-spacing: -0.02em; }
.card {
  border: 1px solid rgba(49, 51, 63, 0.12);
  border-radius: 16px;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.70);
  box-shadow: 0 1px 10px rgba(0,0,0,0.04);
}
.small { font-size: 0.95rem; color: rgba(49, 51, 63, 0.85); }
.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
.hr { height: 1px; background: rgba(49, 51, 63, 0.12); margin: 12px 0 16px 0; }
.colgap { height: 18px; }
.kpi-note { font-size: 0.90rem; color: rgba(49, 51, 63, 0.78); }
</style>
"""


class TwoStateMarkovChain:
    r"""
    Estados: 0 = V, 1 = C.

    Matriz de transición:
        P = [[a, 1-a],
             [b, 1-b]]
    """
    def __init__(self, a: float, b: float, labels=("V", "C")):
        self.a = float(a)
        self.b = float(b)
        self.labels = tuple(labels)
        self._validate()

    def _validate(self) -> None:
        if not (0.0 < self.a < 1.0):
            raise ValueError("a debe estar en (0,1).")
        if not (0.0 < self.b < 1.0):
            raise ValueError("b debe estar en (0,1).")
        if len(self.labels) != 2:
            raise ValueError("labels debe tener longitud 2.")

    @property
    def P(self) -> np.ndarray:
        return np.array([[self.a, 1.0 - self.a],
                         [self.b, 1.0 - self.b]], dtype=float)

    @property
    def stationary(self) -> np.ndarray:
        r"""
        Distribución estacionaria:
            π_V = b / (b + 1 - a),
            π_C = (1 - a) / (b + 1 - a).
        """
        denom = self.b + 1.0 - self.a
        pi_v = self.b / denom
        pi_c = (1.0 - self.a) / denom
        return np.array([pi_v, pi_c], dtype=float)

    def marginal_path(self, n_steps: int, p0: float) -> np.ndarray:
        r"""
        Forma cerrada:
            p_n = π_V + (p0 - π_V) (a - b)^n
        Devuelve p_0, ..., p_{n_steps}.
        """
        xs = np.arange(n_steps + 1)
        pi_v = float(self.stationary[0])
        return pi_v + (p0 - pi_v) * ((self.a - self.b) ** xs)

    def simulate(self, n_steps: int, x0: int, seed: int | None = None) -> "MarkovSimulationResult":
        rng = np.random.default_rng(seed)
        P = self.P
        x = np.empty(n_steps + 1, dtype=int)
        x[0] = int(x0)
        for t in range(n_steps):
            i = x[t]
            x[t + 1] = rng.choice([0, 1], p=P[i])
        return MarkovSimulationResult(chain=self, states=x)


class MarkovSimulationResult:
    def __init__(self, chain: TwoStateMarkovChain, states: np.ndarray):
        self.chain = chain
        self.states = states.astype(int)

    def empirical_frequency_V(self) -> np.ndarray:
        r"""
        Frecuencia empírica acumulada de V (estado 0):
            f_n = (1/(n+1)) * #{0<=k<=n : X_k = V}.
        """
        is_v = (self.states == 0).astype(int)
        return np.cumsum(is_v) / np.arange(1, len(is_v) + 1)

    def transition_counts(self) -> np.ndarray:
        """Cuenta N_ij transiciones observadas."""
        counts = np.zeros((2, 2), dtype=int)
        for t in range(len(self.states) - 1):
            counts[self.states[t], self.states[t + 1]] += 1
        return counts

    def estimate_a_b(self) -> dict:
        r"""
        Estimadores por conteos:
            â = N_VV / N_V,
            b̂ = N_CV / N_C,
        donde N_V = N_VV + N_VC y N_C = N_CV + N_CC.
        """
        c = self.transition_counts()
        N_VV, N_VC = c[0, 0], c[0, 1]
        N_CV, N_CC = c[1, 0], c[1, 1]
        N_V = N_VV + N_VC
        N_C = N_CV + N_CC
        a_hat = (N_VV / N_V) if N_V > 0 else np.nan
        b_hat = (N_CV / N_C) if N_C > 0 else np.nan
        return {"a_hat": float(a_hat), "b_hat": float(b_hat)}


def df_heatmap_P(chain: TwoStateMarkovChain) -> pd.DataFrame:
    P = chain.P
    labs = chain.labels
    df = pd.DataFrame(P, index=labs, columns=labs).reset_index().melt(id_vars="index")
    df.columns = ["estado_actual", "estado_siguiente", "p"]
    return df


def df_marginal(chain: TwoStateMarkovChain, n_steps: int, x0: int) -> pd.DataFrame:
    p0 = 1.0 if x0 == 0 else 0.0
    ps = chain.marginal_path(n_steps=n_steps, p0=p0)
    return pd.DataFrame({
        "n": np.arange(len(ps)),
        "p": ps,
        "pi_v": float(chain.stationary[0]),
    })


def df_sample_path(sim: MarkovSimulationResult) -> pd.DataFrame:
    # Visualización como en tus notas: V=1, C=0
    y = (sim.states == 0).astype(int)
    return pd.DataFrame({"n": np.arange(len(y)), "y": y})


def df_empirical_freq(sim: MarkovSimulationResult) -> pd.DataFrame:
    freq = sim.empirical_frequency_V()
    return pd.DataFrame({
        "n": np.arange(len(freq)),
        "freq": freq,
        "pi_v": float(sim.chain.stationary[0]),
    })


def df_transition_counts(sim: MarkovSimulationResult) -> pd.DataFrame:
    c = sim.transition_counts()
    labs = sim.chain.labels
    return pd.DataFrame(
        {
            "desde": [labs[0], labs[0], labs[1], labs[1]],
            "a":     [labs[0], labs[1], labs[0], labs[1]],
            "N":     [int(c[0, 0]), int(c[0, 1]), int(c[1, 0]), int(c[1, 1])],
        }
    )


def _curve_points(x0, y0, x1, y1, bump=0.18, n=55):
    """Curva cuadrática discretizada para aristas (x0,y0)->(x1,y1)."""
    t = np.linspace(0, 1, n)
    mx, my = (x0 + x1) / 2, (y0 + y1) / 2
    dx, dy = x1 - x0, y1 - y0
    px, py = -dy, dx
    norm = np.hypot(px, py) + 1e-12
    px, py = px / norm, py / norm
    cx, cy = mx + bump * px, my + bump * py
    xs = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * cx + t ** 2 * x1
    ys = (1 - t) ** 2 * y0 + 2 * (1 - t) * t * cy + t ** 2 * y1
    return xs, ys


def _angle_deg(x_prev, y_prev, x_last, y_last) -> float:
    """Ángulo (grados) del vector tangente final."""
    ang = np.degrees(np.arctan2(y_last - y_prev, x_last - x_prev))
    return float(ang)


def df_graph(chain: TwoStateMarkovChain):
    """
    Construye:
      - nodes: posiciones de nodos
      - edges_df: puntos de curvas (líneas)
      - labels_df: etiquetas de pesos
      - arrows_df: triángulos orientados como flechas
    """
    labs = chain.labels
    P = chain.P

    nodes = pd.DataFrame({
        "id": [0, 1],
        "label": [labs[0], labs[1]],
        "x": [0.0, 1.45],
        "y": [0.0, 0.0],
    })

    curves = []
    labels_df = []
    arrows_df = []

    def add_directed_curve(src, dst, bump, weight):
        x0 = float(nodes.loc[nodes["id"] == src, "x"].iloc[0])
        y0 = float(nodes.loc[nodes["id"] == src, "y"].iloc[0])
        x1 = float(nodes.loc[nodes["id"] == dst, "x"].iloc[0])
        y1 = float(nodes.loc[nodes["id"] == dst, "y"].iloc[0])

        xs, ys = _curve_points(x0, y0, x1, y1, bump=bump, n=65)
        eid = f"{src}->{dst}"

        for k in range(len(xs)):
            curves.append({"edge": eid, "x": xs[k], "y": ys[k], "t": k, "type": "edge"})

        mid = int(0.55 * (len(xs) - 1))
        labels_df.append({
            "edge": eid,
            "x": xs[mid],
            "y": ys[mid] + (0.04 if bump > 0 else -0.04),
            "text": f"{labs[src]}→{labs[dst]}: {weight:.3f}",
        })

        end = int(0.97 * (len(xs) - 1))
        prev = max(0, end - 2)
        ang = _angle_deg(xs[prev], ys[prev], xs[end], ys[end])
        arrows_df.append({
            "edge": eid,
            "x": xs[end],
            "y": ys[end],
            "angle": ang,
            "type": "arrow",
        })

    add_directed_curve(0, 1, bump=+0.24, weight=float(P[0, 1]))
    add_directed_curve(1, 0, bump=-0.24, weight=float(P[1, 0]))

    def add_loop(node_id, weight, radius=0.22, ylift=0.30, xshift=0.0):
        x0 = float(nodes.loc[nodes["id"] == node_id, "x"].iloc[0]) + xshift
        y0 = float(nodes.loc[nodes["id"] == node_id, "y"].iloc[0])

        theta = np.linspace(0, 2*np.pi, 120)
        xs = x0 + radius * np.cos(theta)
        ys = y0 + radius * np.sin(theta) + ylift
        eid = f"{node_id}->{node_id}"

        for k in range(len(xs)):
            curves.append({"edge": eid, "x": xs[k], "y": ys[k], "t": k, "type": "loop"})

        labels_df.append({
            "edge": eid,
            "x": x0,
            "y": y0 + ylift + radius + 0.16,
            "text": f"{labs[node_id]}→{labs[node_id]}: {weight:.3f}",
        })

        k = int(0.10 * (len(xs) - 1))
        kprev = max(0, k - 2)
        ang = _angle_deg(xs[kprev], ys[kprev], xs[k], ys[k])
        arrows_df.append({
            "edge": eid,
            "x": xs[k],
            "y": ys[k],
            "angle": ang,
            "type": "arrow",
        })

    add_loop(0, weight=float(P[0, 0]), xshift=-0.05)
    add_loop(1, weight=float(P[1, 1]), xshift=+0.05)

    edges_df = pd.DataFrame(curves)
    labels_df = pd.DataFrame(labels_df)
    arrows_df = pd.DataFrame(arrows_df)

    return nodes, edges_df, labels_df, arrows_df


def chart_graph(chain: TwoStateMarkovChain) -> alt.Chart:
    nodes, edges_df, labels_df, arrows_df = df_graph(chain)

    edges = alt.Chart(edges_df).mark_line(strokeWidth=2.2).encode(
        x=alt.X("x:Q", axis=None),
        y=alt.Y("y:Q", axis=None),
        detail="edge:N",
        tooltip=[alt.Tooltip("edge:N", title="Arista")]
    )

    arrows = alt.Chart(arrows_df).mark_point(
        shape="triangle",
        filled=True,
        size=180
    ).encode(
        x="x:Q",
        y="y:Q",
        angle=alt.Angle("angle:Q"),
        tooltip=[alt.Tooltip("edge:N", title="Arista")]
    )

    nodes_layer = alt.Chart(nodes).mark_circle(size=1300).encode(
        x="x:Q",
        y="y:Q",
        tooltip=[alt.Tooltip("label:N", title="Estado")]
    )

    node_text = alt.Chart(nodes).mark_text(dy=26, fontSize=15).encode(
        x="x:Q",
        y="y:Q",
        text="label:N"
    )

    edge_labels = alt.Chart(labels_df).mark_text(fontSize=12).encode(
        x="x:Q",
        y="y:Q",
        text="text:N"
    )

    chart = (edges + arrows + nodes_layer + node_text + edge_labels).properties(
        title="Grafo dirigido ponderado (con flechas)",
        height=420
    ).configure_view(strokeWidth=0).configure_title(fontSize=16)

    return chart


def chart_heatmap_P(chain: TwoStateMarkovChain) -> alt.Chart:
    df = df_heatmap_P(chain)

    base = alt.Chart(df).mark_rect().encode(
        x=alt.X("estado_siguiente:N", title="Estado siguiente"),
        y=alt.Y("estado_actual:N", title="Estado actual"),
        color=alt.Color("p:Q", title="Probabilidad"),
        tooltip=[
            alt.Tooltip("estado_actual:N", title="De"),
            alt.Tooltip("estado_siguiente:N", title="A"),
            alt.Tooltip("p:Q", format=".4f", title="p")
        ],
    )

    text = alt.Chart(df).mark_text(fontSize=14).encode(
        x="estado_siguiente:N",
        y="estado_actual:N",
        text=alt.Text("p:Q", format=".3f")
    )

    return (base + text).properties(
        title="Matriz de transición P (mapa de calor)",
        height=360
    ).configure_view(strokeWidth=0).configure_title(fontSize=16)


def chart_marginal(chain: TwoStateMarkovChain, n_steps: int, x0: int) -> alt.Chart:
    df = df_marginal(chain, n_steps=n_steps, x0=x0)
    label0 = "Inicio en V" if x0 == 0 else "Inicio en C"

    line = alt.Chart(df).mark_line(strokeWidth=2.2).encode(
        x=alt.X("n:Q", title="n"),
        y=alt.Y("p:Q", title="p_n = P(X_n = V)"),
        tooltip=[alt.Tooltip("n:Q"), alt.Tooltip("p:Q", format=".5f")]
    )

    rule = alt.Chart(df).mark_rule(strokeDash=[6, 4]).encode(
        y=alt.Y("pi_v:Q"),
        tooltip=[alt.Tooltip("pi_v:Q", title="pi_V", format=".5f")]
    )

    return (line + rule).properties(
        title=f"Convergencia de p_n ({label0})",
        height=360
    ).configure_view(strokeWidth=0).configure_title(fontSize=16)


def chart_sample_path(sim: MarkovSimulationResult, max_points: int = 1500) -> alt.Chart:
    df = df_sample_path(sim)
    if len(df) > max_points:
        df = df.iloc[:max_points].copy()

    return alt.Chart(df).mark_line(strokeWidth=2.2).encode(
        x=alt.X("n:Q", title="Tiempo n"),
        y=alt.Y("y:Q", title="Estado (V=1, C=0)"),
        tooltip=[alt.Tooltip("n:Q"), alt.Tooltip("y:Q")]
    ).properties(
        title="Trayectoria simulada",
        height=360
    ).configure_view(strokeWidth=0).configure_title(fontSize=16)


def chart_empirical_frequency(sim: MarkovSimulationResult, max_points: int = 6000) -> alt.Chart:
    df = df_empirical_freq(sim)
    if len(df) > max_points:
        df = df.iloc[:max_points].copy()

    line = alt.Chart(df).mark_line(strokeWidth=2.2).encode(
        x=alt.X("n:Q", title="n"),
        y=alt.Y("freq:Q", title="Frecuencia empírica de V"),
        tooltip=[alt.Tooltip("n:Q"), alt.Tooltip("freq:Q", format=".5f")]
    )
    rule = alt.Chart(df).mark_rule(strokeDash=[6, 4]).encode(y="pi_v:Q")

    return (line + rule).properties(
        title="Ley de grandes números (frecuencia empírica → pi_V)",
        height=360
    ).configure_view(strokeWidth=0).configure_title(fontSize=16)


def chart_transition_bars(sim: MarkovSimulationResult) -> alt.Chart:
    df = df_transition_counts(sim)
    df["arista"] = df["desde"] + "→" + df["a"]

    return alt.Chart(df).mark_bar().encode(
        x=alt.X("arista:N", title="Transición"),
        y=alt.Y("N:Q", title="Conteo"),
        tooltip=[alt.Tooltip("arista:N"), alt.Tooltip("N:Q")]
    ).properties(
        title="Conteos de transiciones observadas",
        height=360
    ).configure_view(strokeWidth=0).configure_title(fontSize=16)


st.set_page_config(page_title="Markov V/C", layout="wide")
st.markdown(CSS, unsafe_allow_html=True)

st.title("Modelo de Markov de dos estados: Vocal/Consonante (V/C)")

st.markdown(
    """
<div class="card">
  <div class="small">
    <b>Objetivo.</b> Explorar una cadena de Markov binaria con estados <span class="mono">V</span> (vocal) y <span class="mono">C</span> (consonante).
    <br><br>
    Este dashboard te permite:
    <ul>
      <li>visualizar la matriz de transición <span class="mono">P</span> y su grafo,</li>
      <li>calcular la distribución estacionaria <span class="mono">π</span>,</li>
      <li>ver la convergencia de <span class="mono">p_n = P(X_n=V)</span>,</li>
      <li>simular trayectorias y frecuencias empíricas,</li>
      <li>estimar parámetros por conteos de transiciones.</li>
    </ul>
  </div>
</div>
""",
    unsafe_allow_html=True
)

st.markdown('<div class="hr"></div>', unsafe_allow_html=True)



st.markdown(
    """
> **Мой дядя самых честных правил,**  
> **Когда не в шутку занемог,**  
> **Он уважать себя заставил**  
> **И лучше выдумать не мог.**
"""
)

st.markdown('<div class="hr"></div>', unsafe_allow_html=True)

with st.sidebar:
    st.header("Parámetros del modelo")
    a = st.slider("a = P(V→V)", 0.01, 0.99, 0.25, 0.01)
    b = st.slider("b = P(C→V)", 0.01, 0.99, 0.55, 0.01)

    st.divider()
    st.header("Simulación")
    n_steps = st.slider("Número de pasos n", 50, 12000, 1200, 50)
    x0_label = st.radio("Estado inicial", options=["V", "C"], index=0, horizontal=True)
    x0 = 0 if x0_label == "V" else 1
    seed = st.number_input("Semilla (seed)", value=123, step=1)
    seed_use = int(seed)

chain = TwoStateMarkovChain(a=a, b=b, labels=("V", "C"))
sim = chain.simulate(n_steps=n_steps, x0=x0, seed=seed_use)
pi_v, pi_c = chain.stationary
est = sim.estimate_a_b()

st.subheader("Fórmulas clave ")

c1, c2 = st.columns(2, gap="large")
with c1:
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.latex(r"P=\begin{pmatrix} a & 1-a \\ b & 1-b \end{pmatrix},\qquad a,b\in(0,1).")
    st.latex(r"\pi=\pi P,\qquad \pi_V=\frac{b}{b+1-a},\quad \pi_C=\frac{1-a}{b+1-a}.")
    st.markdown('</div>', unsafe_allow_html=True)

with c2:
    st.markdown('<div class="card">', unsafe_allow_html=True)
    st.latex(r"p_{n+1}=a\,p_n+b(1-p_n)=b+(a-b)p_n.")
    st.latex(r"p_n=\pi_V+(p_0-\pi_V)(a-b)^n,\qquad p_0=\mathbb{P}(X_0=V).")
    st.markdown('</div>', unsafe_allow_html=True)

st.subheader("Resumen numérico")
k1, k2, k3, k4 = st.columns(4, gap="large")
k1.metric("π_V", f"{pi_v:.4f}")
k2.metric("π_C", f"{pi_c:.4f}")
k3.metric("|a-b|", f"{abs(a-b):.4f}")
k4.metric("b̂ (simulación)", f"{est['b_hat']:.4f}" if not np.isnan(est["b_hat"]) else "NA")
st.markdown('<div class="kpi-note">Tip: si |a-b| es pequeño, la convergencia a π es más rápida.</div>', unsafe_allow_html=True)

st.markdown('<div class="hr"></div>', unsafe_allow_html=True)

tab1, tab2, tab3, tab4 = st.tabs(["Modelo", "Convergencia", "Simulación", "Estimación"])

with tab1:
    st.markdown("### Matriz y grafo ")

    st.markdown('<div class="colgap"></div>', unsafe_allow_html=True)

    st.altair_chart(chart_heatmap_P(chain), width=True)
    st.markdown('<div class="colgap"></div>', unsafe_allow_html=True)
    st.altair_chart(chart_graph(chain), width=True)

with tab2:
    st.markdown("### Convergencia de la marginal")

    st.markdown('<div class="colgap"></div>', unsafe_allow_html=True)
    st.altair_chart(chart_marginal(chain, n_steps=min(2500, n_steps), x0=x0), width=True)

with tab3:
    st.markdown("### Trayectoria y ley de grandes números (ergódico)")

    st.markdown('<div class="colgap"></div>', unsafe_allow_html=True)

    left, right = st.columns(2, gap="large")
    with left:
        st.altair_chart(chart_sample_path(sim, max_points=1500), width=True)
    with right:
        st.altair_chart(chart_empirical_frequency(sim, max_points=6000), width=True)

    st.markdown("**Interpretación ergódica:**")
    st.latex(r"\frac{1}{n}\sum_{k=0}^{n-1} f(X_k)\xrightarrow{\text{c.s.}} \mathbb{E}_{\pi}[f]=\pi_V,\qquad f(V)=1,\ f(C)=0.")

with tab4:
    st.markdown("### Estimación por conteos de transiciones")
    st.markdown(
        """
<div class="card small">
Contamos transiciones observadas y estimamos <span class="mono">a</span> y <span class="mono">b</span>.
</div>
""",
        unsafe_allow_html=True
    )
    st.markdown('<div class="colgap"></div>', unsafe_allow_html=True)

    st.latex(r"\hat a=\frac{N_{VV}}{N_V},\qquad \hat b=\frac{N_{CV}}{N_C},\qquad N_V=N_{VV}+N_{VC},\quad N_C=N_{CV}+N_{CC}.")

    left, right = st.columns(2, gap="large")
    with left:
        st.altair_chart(chart_transition_bars(sim), width=True)
    with right:
        c = sim.transition_counts()
        labs = chain.labels
        df_counts = pd.DataFrame(
            c,
            index=[f"desde {labs[0]}", f"desde {labs[1]}"],
            columns=[f"a {labs[0]}", f"a {labs[1]}"]
        )
        st.dataframe(df_counts, width=True)

    st.markdown("**Estimadores en la simulación actual:**")
    st.write({"a real": a, "b real": b, "â": est["a_hat"], "b̂": est["b_hat"]})

