function drawSpline() {
    const xtrapolation = document.getElementById('expect');
    const xValues = document.getElementById('xValues').value.split(',').map(Number);
    const yValues = document.getElementById('yValues').value.split(',').map(Number);
    const xExtrapolate = parseFloat(document.getElementById('xExtrapolate').value);

    if (xValues.length !== yValues.length) {
        alert('El número de valores de X y Y debe ser el mismo');
        return;
    }

    const cs = new CubicSpline(xValues, yValues);
    const yExtrapolate = cs.interpolate(xExtrapolate);

    const traceOriginal = {
        x: xValues,
        y: yValues,
        mode: 'markers',
        type: 'scatter',
        name: 'Vistas',
        marker: { color: 'red' }
    };

    const traceExtrapolate = {
        x: [xExtrapolate],
        y: [yExtrapolate],
        mode: 'markers',
        type: 'scatter',
        name: `Predicción en el día ${xExtrapolate}`,
        marker: { color: 'blue' }
    };

    const layout = {
        title: 'Interpolación de Splines Cúbicos',
        xaxis: { title: 'Día del mes', range: [Math.min(...xValues) - 1, Math.max(...xValues) + 1] },
        yaxis: { title: 'Vistas', range: [10000, 60000] }
    };

    const data = [traceOriginal, traceExtrapolate];

    Plotly.newPlot('plot', data, layout);

    xtrapolation.innerHTML = `
    <h2 style=" margin: 4rem 0 2rem 0;">La aproximación al número de vistas dicho día: </h2><h3 style="font-weight: 800; color:purple;">${yExtrapolate}</h3>`;


}

class CubicSpline {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.a = [];
        this.b = [];
        this.c = [];
        this.d = [];
        this.calcCoefficients();
    }

    calcCoefficients() {
        const n = this.x.length;
        const a = this.y.slice();
        const b = Array(n).fill(0);
        const d = Array(n).fill(0);
        const h = Array(n - 1).fill(0);
        const alpha = Array(n - 1).fill(0);

        for (let i = 0; i < n-1 ; i++) {
            h[i] = this.x[i + 1] - this.x[i];
            alpha[i] = (3 / h[i]) * (a[i + 1] - a[i]) - (3 / h[i - 1]) * (a[i] - a[i - 1]);
        }

        const c = Array(n).fill(0);
        const l = Array(n).fill(0);
        const mu = Array(n).fill(0);
        const z = Array(n).fill(0);

        l[0] = 1;
        mu[0] = 0;
        z[0] = 0;

        for (let i = 1; i < n - 1; i++) {
            l[i] = 2 * (this.x[i + 1] - this.x[i - 1]) - h[i - 1] * mu[i - 1];
            mu[i] = h[i] / l[i];
            z[i] = (alpha[i] - h[i - 1] * z[i - 1]) / l[i];
        }

        l[n - 1] = 1;
        z[n - 1] = 0;
        c[n - 1] = 0;

        for (let j = n - 2; j >= 0; j--) {
            c[j] = z[j] - mu[j] * c[j + 1];
            b[j] = (a[j + 1] - a[j]) / h[j] - h[j] * (c[j + 1] + 2 * c[j]) / 3;
            d[j] = (c[j + 1] - c[j]) / (3 * h[j]);
            this.a[j] = a[j];
            this.b[j] = b[j];
            this.c[j] = c[j];
            this.d[j] = d[j];
        }
    }

    interpolate(x) {
        const n = this.x.length;
        let i = n - 2;
        while (i >= 0 && x < this.x[i]) {
            i--;
        }
        const dx = x - this.x[i];
        return this.a[i] + this.b[i] * dx + this.c[i] * Math.pow(dx, 2) + this.d[i] * Math.pow(dx, 3);

    }
}
