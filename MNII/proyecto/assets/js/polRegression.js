// extrapolation.js

function drawPolynomialRegression() {
    const xValues = document.getElementById('xValues').value.split(',').map(Number);
    const yValues = document.getElementById('yValues').value.split(',').map(Number);
    const xExtrapolate = parseFloat(document.getElementById('xExtrapolate').value);

    if (xValues.length !== yValues.length) {
        alert('El número de valores de X y Y debe ser el mismo');
        return;
    }

    // Ajuste del polinomio de grado 3
    const coefficients = polyfit(xValues, yValues, 3);
    const yExtrapolate = polyval(coefficients, xExtrapolate);

    // Crear datos para la gráfica
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

    const xRange = math.range(math.min(xValues) - 1, math.max(xValues) + 2, 0.1).toArray();
    const yRange = xRange.map(x => polyval(coefficients, x));

    const tracePolynomial = {
        x: xRange,
        y: yRange,
        mode: 'lines',
        type: 'scatter',
        name: 'Regresión Polinómica (grado 3)',
        line: { color: 'green' }
    };

    const layout = {
        title: 'Extrapolación con Regresión Polinómica',
        xaxis: { title: 'Día del mes', range: [math.min(xValues) - 1, math.max(xValues) + 2] },
        yaxis: { title: 'Vistas', range: [0, 80000] }
    };

    const data = [traceOriginal, tracePolynomial, traceExtrapolate];

    Plotly.newPlot('plot', data, layout);
}

function polyfit(x, y, degree) {
    const X = [];
    for (let i = 0; i < x.length; i++) {
        const row = [];
        for (let j = degree; j >= 0; j--) {
            row.push(Math.pow(x[i], j));
        }
        X.push(row);
    }

    const Xt = math.transpose(X);
    const XtX = math.multiply(Xt, X);
    const XtX_inv = math.inv(XtX);
    const XtY = math.multiply(Xt, y);
    const coefficients = math.multiply(XtX_inv, XtY);

    return coefficients;
}

function polyval(coefficients, x) {
    let y = 0;
    for (let i = 0; i < coefficients.length; i++) {
        y += coefficients[i] * Math.pow(x, coefficients.length - 1 - i);
    }
    return y;
}
