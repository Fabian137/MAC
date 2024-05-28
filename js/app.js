const inputNV = document.getElementById('nv');
const inputNL = document.getElementById('nl');
const selectElement = document.querySelector('.tipoGraph');
const inputsContainer = document.getElementById('inputsContainer');
const boton = document.getElementById('btnTrigger');
let verticesArray = [];

// Event listener para actualizar la cantidad de líneas y selects
inputNV.addEventListener('input', optionsCreateUpdate)
inputNL.addEventListener('input', optionsCreateUpdate)

function optionsCreateUpdate() {
        
    const numLineas = parseInt(inputNL.value);
    const numVertices = parseInt(inputNV.value); // Obtener el valor actualizado de numVertices
    
    // Limpiar el contenedor de inputs antes de agregar nuevos
    inputsContainer.innerHTML = '';
    
    for (let i = 1; i <= numLineas; i++) {
        // Crear contenedor de la fila
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row justify-content-around';
        rowDiv.style.marginTop = '1rem';
        
        // Crear columna para la etiqueta
        const colDiv = document.createElement('div');
        colDiv.className = 'col-3';
        
        // Crear etiqueta
        const label = document.createElement('div');
        label.className = 'form-label';
        label.textContent = `e${i}`;
        colDiv.appendChild(label);
        
        // Crear el primer elemento select
        const select1 = document.createElement('select');
        select1.className = 'col-3 form-select nodoNl salida';
        select1.style.width = '25%';
        select1.setAttribute('aria-label', 'Default select example');
        
        // Crear el segundo elemento select
        const select2 = document.createElement('select');
        select2.className = 'col-3 form-select nodoNl entrada';
        select2.style.width = '25%';
        select2.setAttribute('aria-label', 'Default select example');
        
        
        
        // Crear y añadir las opciones a ambos selects
        for (let j = 1; j <= numVertices; j++) {
            const option1 = document.createElement('option');
            option1.value = j;
            option1.textContent = j;
            select1.appendChild(option1);
            
            const option2 = document.createElement('option');
            option2.value = j;
            option2.textContent = j;
            select2.appendChild(option2);
        }
        
        // Añadir la columna y los selects al contenedor de la fila
        rowDiv.appendChild(colDiv);
        rowDiv.appendChild(select1);
        rowDiv.appendChild(select2);
        
        // Añadir la fila al contenedor principal
        inputsContainer.appendChild(rowDiv);
    }
}
/* ------------------------------- LECTURA DE DATOS -------------------------------*/
function obtenerDatosInputs() {
    const inputs = document.getElementsByClassName('salida');   //--------------------- Sale 
    const inpute = document.getElementsByClassName('entrada');  //--------------------- Llega 
    const Sale = [];
    const Llega = [];
    for (let in1 of inputs) {
        Sale.push(parseInt(in1.value));
    }
    for (let in2 of inpute) {
        Llega.push(parseInt(in2.value));
    }

    console.log("entrada:", Llega);
    console.log("salida:", Sale);

    return { Sale, Llega };
}





function Incidencia(Sale, Llega) {
    const numLineas = parseInt(inputNL.value);
    const numVertices = parseInt(inputNV.value);
    let Dirigida = selectElement.value === "0"; // Asegurarse de que sea un booleano

    // Inicializar AG como una matriz bidimensional
    const AG = Array.from({ length: numVertices }, () => Array(numLineas).fill(0));

    // Corregir los bucles para que empiecen en 0
    for (let i = 0; i < numLineas; i++) {
        AG[Sale[i] - 1][i] = 1; // Restar 1 para ajustar el índice del vértice
        if (Dirigida) {
            AG[Llega[i] - 1][i] = -1; // Restar 1 para ajustar el índice del vértice
        } else {
            AG[Llega[i] - 1][i] = 1; // Restar 1 para ajustar el índice del vértice
        }
    }

    console.log("La matriz de incidencia es:");
    for (let i = 0; i < numVertices; i++) {
        console.log(AG[i].join(" "));
    }

    return AG;
}

/* ------------------------------- VALIDACION -------------------------------*/
function dataParams_Validation() {
    let Dirigida = selectElement.value;
    const numLineas = parseInt(inputNL.value);
    const numVertices = parseInt(inputNV.value); // Obtener el valor actualizado de numVertices
    if (isNaN(numLineas) || isNaN(numVertices)) {
        alert('Por favor ingresa valores válidos en los campos de número de vértices y número de líneas.');
    } else {
        console.log('Número de vértices:', numVertices);
        console.log('Número de líneas:', numLineas);
        console.log('El valor seleccionado es:', Dirigida);
    }
}


function multipleFunctions() {
    let Dirigida = selectElement.value;
    const numLineas = parseInt(inputNL.value);
    const numVertices = parseInt(inputNV.value); // Obtener el valor actualizado de numVertices
    dataParams_Validation(numLineas, numVertices);
    const { Sale, Llega } = obtenerDatosInputs();
    Incidencia(Sale, Llega, numVertices, numLineas, Dirigida);

    // graphCreation(Sale, Llega)
}



//--------------------- Ejecuta multipleFunctions
boton.addEventListener('click', multipleFunctions );








const graphNode_example =[
    {id:1, value:4},
    {id:2, value:2}
]




/* ------------------------------- MATRIZ DE ACCESIBILIDAD -------------------------------*/
function accesibilidad(XG, n) {
    let MG = new Array(n)
    let potencia = new Array(n)

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            MG[i][j] = XG[i][j]; // Copiar el valor de XG en la posición correspondiente de MG
            potencia[i][j] = XG[i][j];
        }
    }

    for (let k = 2; k < n-2; k++) {
        potencia = potencia * XG
        MG = MG + potencia
    }

    console.log("La matriz de Accesibilidad es")
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if (MG[i][j] == 0) {
                console.log("0")
            }else{
                console.log("+")
            }
        }        
    }

}



