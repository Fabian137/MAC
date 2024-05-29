
const inputNV = document.getElementById('nv');
const inputNL = document.getElementById('nl');
const selectElement = document.querySelector('.tipoGraph');
const inputsContainer = document.getElementById('inputsContainer');
const boton = document.getElementById('btnTrigger');
// let verticesArray = [];

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

/* ------------------------------- Bucles función -------------------------------*/ 
function bucles(Sale, Llega, e) {
    let existeBucle = false; 
    for (let i = 0; i < e; i++) {
        if (Sale[i] === Llega[i]) {
            console.log(`La línea ${i + 1} es un bucle en el nodo ${Sale[i]}`);
            existeBucle = true;
        }
    }
    return existeBucle; 
}
/* ------------------------------- Matriz de Incidencia -------------------------------*/

/*
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
*/

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

/* ------------------------------- Matriz de Adyacencia-------------------------------*/

function Adyacencia(Sale, Llega, e, n, Dirigida) {
    // Crear matriz XG[n][n] e inicializar con ceros
    let XG = Array.from({ length: n }, () => Array(n).fill(0));

    // Llenar la matriz XG con las conexiones
    for (let i = 0; i < e; i++) {
        XG[Sale[i] - 1][Llega[i] - 1] = 1; // Sale[i] a Llega[i]
        if (!Dirigida) {
            XG[Llega[i] - 1][Sale[i] - 1] = 1; // Llega[i] a Sale[i] si no es dirigida
        }
    }

    // Mostrar la matriz de adyacencia
    console.log("La matriz de Adyacencia es:");
    for (let i = 0; i < n; i++) {
        let row = '';
        for (let j = 0; j < n; j++) {
            row += XG[i][j] + ' ';
        }
        console.log(row);
    }
    return XG;
}
/* ------------------------------- Matriz de Accesibilidad-------------------------------*/
function Accesibilidad(XG, n) {
    // Crear matrices MG y Potencia de tamaño n x n e inicializarlas
    let MG = Array.from({ length: n }, () => Array(n).fill(0));
    let Potencia = Array.from({ length: n }, () => Array(n).fill(0));

    // Copiar los valores de XG en MG y Potencia
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            MG[i][j] = XG[i][j];
            Potencia[i][j] = XG[i][j];
        }
    }

    // Calcular las potencias y acumular en MG
    for (let k = 2; k <= n; k++) {
        Potencia = multiplicarMatrices(Potencia, XG, n);
        MG = sumarMatrices(MG, Potencia, n);
    }

    // Mostrar la matriz de accesibilidad
    console.log("La matriz de Accesibilidad es:");
    for (let i = 0; i < n; i++) {
        let row = '';
        for (let j = 0; j < n; j++) {
            row += (MG[i][j] === 0 ? '0' : '+') + ' ';
        }
        console.log(row);
    }

    return MG;
}

/* ------------------------------- Lineas Paralelas -------------------------------*/
function LineasParalelas(Sale, Llega, e, Dirigida) {
    // Crear vector Paralelas
    let Paralelas = Array(e).fill(0);
    let GrupoParalelas = 1;
    let EncontreParalelas = false;

    // Buscar líneas paralelas
    for (let i = 0; i < e; i++) {
        if (Paralelas[i] === 0) {
            for (let j = i + 1; j < e; j++) {
                if (Paralelas[j] === 0) {
                    if (Sale[i] === Sale[j] && Llega[i] === Llega[j]) {
                        Paralelas[i] = GrupoParalelas;
                        Paralelas[j] = GrupoParalelas;
                        EncontreParalelas = true;
                    } else if (!Dirigida && Sale[i] === Llega[j] && Llega[i] === Sale[j]) {
                        Paralelas[i] = GrupoParalelas;
                        Paralelas[j] = GrupoParalelas;
                        EncontreParalelas = true;
                    }
                }
            }
            if (EncontreParalelas) {
                Paralelas[i] = GrupoParalelas;
                EncontreParalelas = false;
                GrupoParalelas++;
            }
        }
    }

    // Mostrar las líneas paralelas
    console.log("Las líneas paralelas son:");
    for (let k = 1; k < GrupoParalelas; k++) {
        let lineasParalelas = [];
        for (let i = 0; i < e; i++) {
            if (Paralelas[i] === k) {
                lineasParalelas.push(i + 1); // Ajustamos el índice para que sea 1-based
            }
        }
        if (lineasParalelas.length > 0) {
            console.log(`Las líneas ${lineasParalelas.join(', ')} son paralelas`);
        }
    }

    return { Paralelas, NumeroParalelas: GrupoParalelas - 1 };
}
/* ------------------------------- Gráfica simple o general -------------------------------*/
function GraficaSimple(Sale, Llega, NumeroParalelas, existeBucle) {
    let simGen = document.getElementById('simGen');
    let Simple = true;

    // Verificar si hay más de un grupo de paralelas
    if (NumeroParalelas > 1) {
        Simple = false;
    }

    // Verificar si hay bucles
    if (existeBucle) {
        Simple = false;
    }

    // Imprimir si la gráfica es simple o general
    if (Simple) {
        simGen.innerHTML = 'La gráfica es simple';
        console.log("La gráfica es simple");
    } else {
        console.log("La gráfica es general");
        simGen.innerHTML = 'La gráfica es general';
    }

    return Simple;
}

/* ------------------------------- Grafica Conectada -------------------------------*/
function GraficaConectada(MG, n) {
    let Conectada = true;
    let conDes = document.getElementById('ConDes'); conDes.innerHTML = '';
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (MG[i][j] <= 0) {
                Conectada = false;
                break;
            }
        }
        if (!Conectada) {
            break;
        }
    }
    
    if (Conectada) {
        console.log("La gráfica es conectada");
        conDes.innerHTML = 'La gráfica es conectada';
    } else {
        console.log("La gráfica es desconectada");
        conDes.innerHTML = 'La gráfica es desconectada';
    }
    
    return Conectada;
}

/* ------------------------------- Grafica Completa -------------------------------*/
function GraficaCompleta(XG, Simple, n) {
    let Completa;
    let complete = document.getElementById('completa'); complete.innerHTML = '';

    if (!Simple) {
        Completa = false;
        console.log("La gráfica no es completa");
    } else {
        Completa = true;
        let Bucle = true;

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                if (i === j) {
                    if (XG[i][j] === 0) {
                        Bucle = false;
                    }
                } else if (XG[i][j] === 0) {
                    Completa = false;
                }
            }
            if (!Completa) {
                break;
            }
        }

        if (Completa) {
            complete.innerHTML = 'La gráfica es completa';
            console.log("La gráfica es completa");
        } else {
            complete.innerHTML = 'La gráfica no es completa';
            console.log("La gráfica no es completa");
        }
    }

    return Completa;
}

/* ------------------------------- Arbol -------------------------------*/
function Arbol(Conectada, e, n, Simple) {
    let arbol  = document.getElementById('Arbol');
    if (Conectada && Simple && e === n - 1) {
        arbol.innerHTML = 'La gráfica es un árbol'; 
        console.log("La gráfica es un árbol");
        return true;
    } else {
        console.log("La gráfica no es un árbol");
        arbol.innerHTML = 'La gráfica no es un árbol'; 
        return false;
    }
}

/* ------------------------------- Gráfica simetrica -------------------------------*/
function GraficaSimetrica(XG, n, NumeroParalelas, Dirigida) {
    let sim = document.getElementById('Simetrica');
    if (NumeroParalelas === 0 && Dirigida) {
        let Simetrica = true;
        let i = 0;

        while (Simetrica && i < n) {
            let j = 0;
            while (Simetrica && j < n) {
                if (i !== j && XG[i][j] === 0) {
                    if (XG[j][i] !== 0) {
                        Simetrica = false;
                    }
                }
                j++;
            }
            i++;
        }

        if (Simetrica) {
            console.log("La gráfica es simétrica");
            sim.innerHTML = 'La gráfica es simétrica';
        } else {
            console.log("La gráfica es asimétrica");
            sim.innerHTML = 'La gráfica es asimétrica';
        }
    } else {
        console.log("La gráfica no es Dirigida o contiene líneas paralelas, por lo que no es simetrica");
        sim.innerHTML = 'La gráfica no es Dirigida o contiene líneas paralelas, por lo que no es simetrica';        
    }
}

/* ------------------------------- Calcular Grado Nodos -------------------------------*/ 
function calcularGradoNodos(AG, n, e, dirigida) {
    let grado = new Array(n).fill(0);
    let gradoInterno = new Array(n).fill(0);
    let gradoExterno = new Array(n).fill(0);

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < e; j++) {
            if (dirigida) {
                if (AG[i][j] === 1) {
                    gradoExterno[i] += 1;
                } else if (AG[i][j] === -1) {
                    gradoInterno[i] += 1;
                }
            } else {
                if (AG[i][j] === 1) {
                    grado[i] += 1;
                } else if (AG[i][j] === 2) {  // Para bucles en grafos no dirigidos
                    grado[i] += 2;
                }
            }
        }
    }

    console.log("El grado de los nodos es:");

    for (let i = 0; i < n; i++) {
        if (dirigida) {
            console.log(`El grado interno del nodo ${i + 1} es ${gradoInterno[i]}`);
            console.log(`El grado externo del nodo ${i + 1} es ${gradoExterno[i]}`);
        } else {
            console.log(`El grado del nodo ${i + 1} es ${grado[i]}`);
        }
    }
    
    return { grado, gradoInterno, gradoExterno };
}


/* ------------------------------- Clasificar Nodos -------------------------------*/ 
function clasificarNodos(grado, gradoInterno, gradoExterno, Sale, Llega, n, dirigida) {
    let vAislados = document.getElementById('Aislados'); vAislados.innerHTML = ``;
    let colgantes = document.getElementById('Colgantes'); colgantes.innerHTML = ``;
    let Inicial = document.getElementById('Inicial'); Inicial.innerHTML = ``;
    let Final = document.getElementById('Final'); Final.innerHTML = ``;

    console.log(` ${grado}, ${gradoInterno}, ${gradoExterno}, ${Sale}, ${Llega}, ${n}, ${dirigida}`);
    
    for (let i = 0; i < n; i++) {
        if (dirigida) {
            if (gradoInterno[i] === 0 && gradoExterno[i] === 0) {
                console.log(`El nodo ${i+1} es aislado`);
                vAislados.innerHTML += `El nodo ${i+1} es aislado <br>`;
            } else {
                if (gradoInterno[i] != 0 && gradoExterno[i] === 0) {
                    console.log(`El nodo ${i+1} es final`);
                    Final.innerHTML += `El nodo ${i+1} es final <br>`;
                } else {
                    if (gradoInterno[i] === 0 && gradoExterno[i] != 0){                        
                        console.log(`El nodo ${i+1} es inicial`);
                        Inicial.innerHTML += `El nodo ${i+1} es inicial <br>`;
                    }else{
                        console.log(`El nodo ${i+1} no es aislado, final, ni inicial`);
                        
                    }
                }
            }
        } else {
            if (grado[i] === 0) {
                console.log(`El nodo ${i+1} es aislado`);
                vAislados.innerHTML += `El nodo ${i+1} es aislado<br>`;
            } else {
                if (grado[i] === 1 && Sale[i] !== Llega[i]) {
                    console.log(`El nodo ${i+1} es colgante`);
                    colgantes.innerHTML += `El nodo ${i+1} es colgante<br>`;
                }
                else{
                    console.log("no es nada");
                }
            }
        }
    }
}

/* ------------------------------- Gráfica regular -------------------------------*/
function GraficaRegular(grado, gradoInterno, gradoExterno, dirigida, n) {
    let Regular = true;
    let AuxGrado;

    if (!dirigida) {
        AuxGrado = grado[0]; // Inicializamos con el primer nodo (índice 0 en JS)
        for (let i = 1; i < n; i++) {
            if (grado[i] !== AuxGrado) {
                Regular = false;
                break;
            }
        }
    } else {
        AuxGrado = gradoInterno[0]; // Inicializamos con el primer nodo (índice 0 en JS)
        for (let i = 1; i < n; i++) {
            if (gradoInterno[i] !== AuxGrado || gradoExterno[i] !== AuxGrado) {
                Regular = false;
                break;
            }
        }
    }

    if (Regular) {
        console.log("La gráfica es regular");
    } else {
        console.log("La gráfica no es regular");
    }

    return Regular;
}

/* ------------------------------- Grafica Balanceada -------------------------------*/
function GraficaBalanceada(gradoInterno, gradoExterno, n, dirigida) {
    if (dirigida) {
        let Balanceada = true;
        for (let i = 0; i < n; i++) {
            if (gradoInterno[i] !== gradoExterno[i]) {
                Balanceada = false;
                break;
            }
        }

        if (Balanceada) {
            console.log("La gráfica dirigida es balanceada");
        } else {
            console.log("La gráfica dirigida no es balanceada");
        }

        return Balanceada;
    } else {
        console.log("La gráfica no es dirigida");
        return false;
    }
}

/* ------------------------------- Lineas en Serie -------------------------------*/
function LineasSerie(grado, Sale, Llega, Paralelas, valorNV, valorNL, Dirigida) {
    for (let i = 1; i <= valorNV; i++) {
        if (grado[i - 1] === 2) { // Utilizar índice i-1 para acceder a grado correctamente
            let Linea1 = -1, Linea2 = -1; // Inicializar con -1 para evitar índices válidos
            let Encontro1 = false, Encontro2 = false;
            let j = 0; // Iniciar con 0 ya que los índices de Sale y Llega son 0-based

            // Buscar la primera línea conectada al vértice i
            while (j < valorNL && !Encontro1) {
                if (Sale[j] === i || Llega[j] === i) {
                    Linea1 = j;
                    Encontro1 = true;
                }
                j++;
            }

            // Continuar buscando desde donde se quedó para la segunda línea
            while (j < valorNL && !Encontro2) {
                if ((Sale[j] === i || Llega[j] === i) && j !== Linea1) {
                    Linea2 = j;
                    Encontro2 = true;
                }
                j++;
            }

            // Verificación de paralelas
            if (Linea1 !== -1 && Linea2 !== -1 && Paralelas[Linea1] === 0 && Paralelas[Linea2] === 0) {
                // Verificar si las dos líneas comparten el vértice i
                if ((Sale[Linea1] === i || Llega[Linea1] === i) && 
                    (Sale[Linea2] === i || Llega[Linea2] === i)) {
                    console.log(`La línea ${Linea1 + 1} y la línea ${Linea2 + 1} están en serie`);
                }
            }
        }
    }
}

/* ------------------------------- Gráfica regular -------------------------------*/
function GraficaRegular(grado, gradoInterno, gradoExterno, dirigida, n) {
    let Regular = true;
    let AuxGrado;
    let reg = document.getElementById('regular');

    if (!dirigida) {
        AuxGrado = grado[0]; // Inicializamos con el primer nodo (índice 0 en JS)
        for (let i = 1; i < n; i++) {
            if (grado[i] !== AuxGrado) {
                Regular = false;
                break;
            }
        }
    } else {
        AuxGrado = gradoInterno[0]; // Inicializamos con el primer nodo (índice 0 en JS)
        for (let i = 1; i < n; i++) {
            if (gradoInterno[i] !== AuxGrado || gradoExterno[i] !== AuxGrado) {
                Regular = false;
                break;
            }
        }
    }

    if (Regular) {
        console.log("La gráfica es regular");
        reg.innerHTML = 'La gráfica es regular';
    } else {
        console.log("La gráfica no es regular");
        reg.innerHTML = 'La gráfica no es regular';
    }

    return Regular;
}

/* ------------------------------- Grafica Balanceada -------------------------------*/
function GraficaBalanceada(gradoInterno, gradoExterno, n, dirigida) {
    let balanceada = document.getElementById('Balanceada');
    if (dirigida) {
        let Balanceada = true;
        for (let i = 0; i < n; i++) {
            if (gradoInterno[i] !== gradoExterno[i]) {
                Balanceada = false;
                break;
            }
        }

        if (Balanceada) {
            console.log("La gráfica dirigida es balanceada");
            balanceada.innerHTML = 'La gráfica dirigida es balanceada'
        } else {
            console.log("La gráfica dirigida no es balanceada");
            balanceada.innerHTML = 'La gráfica dirigida no es balanceada'
        }
        
        return Balanceada;
    } else {
        console.log("La gráfica no es dirigida");
        balanceada.innerHTML = 'La gráfica no esdirigida'
        return false;
    }
}


function mostrarMatriz(matriz, elemento) {
    let html = '<table>';
    matriz.forEach(fila => {
        html += '<tr>';
        fila.forEach(valor => {
            html += `<td>${valor}</td>`;
        });
        html += '</tr>';
    });
    html += '</table>';
    elemento.innerHTML = html;
}

// Función para multiplicar dos matrices
function multiplicarMatrices(A, B, n) {
    let resultado = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            for (let k = 0; k < n; k++) {
                resultado[i][j] += A[i][k] * B[k][j];
            }
        }
    }
    return resultado;
}

// Función para sumar dos matrices
function sumarMatrices(A, B, n) {
    let resultado = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            resultado[i][j] = A[i][j] + B[i][j];
        }
    }
    return resultado;
}


function multipleFunctions() {
    let matrizAG = document.getElementById('matriz-In')
    let matrizXG = document.getElementById('matriz-Ad')
    let matrizMG = document.getElementById('matriz-Ac')

    let gradoInfo = document.getElementById('gradoV')
    

    const valorNV = parseInt(inputNV.value);
    const valorNL = parseInt(inputNL.value);
    // const valorSeleccionado = selectElement.value;
    
    if(isNaN(valorNV) || isNaN(valorNL)){
        alert('Por favor ingresa valores válidos en los campos de número de vértices y número de líneas.');        
    }
    else{
        // console.log('Número de vértices:', valorNV);
        // console.log('Número de líneas:', valorNL);
        // console.log('El valor seleccionado es:', valorSeleccionado);
        const datos = obtenerDatosInputs();
        const Sale = datos.Sale;
        const Llega = datos.Llega;
        
        const existeBucle = bucles(Sale, Llega, valorNL);
        console.log("Existe al menos un bucle:", existeBucle);
        
        // Determinar si el grafo es dirigido
        let Dirigida = selectElement.value === "0"; // Asegurarse de que sea un booleano 
        
        const AG  = Incidencia(Sale, Llega); 
        // Llamar a la función Adyacencia
        const XG = Adyacencia(Sale, Llega, valorNL, valorNV, Dirigida);
        // Puedes hacer más cosas con la matriz XG aquí si es necesario
        const MG = Accesibilidad(XG, valorNV); 

        //INSERCIÓN A HTML
        matrizAG.innerHTML = '';matrizXG.innerHTML = '';matrizMG.innerHTML = '';
        mostrarMatriz(AG, matrizAG);mostrarMatriz(XG, matrizXG);mostrarMatriz(MG, matrizMG);
        
        gradoInfo.innerHTML = ``;

        const {grado, gradoInterno, gradoExterno} = calcularGradoNodos(AG, valorNV, valorNL, Dirigida);                        //v. CalcularGradoNodos
        // console.log(result);

        for (let i = 0; i < valorNV; i++) {
            if (Dirigida) {
                gradoInfo.innerHTML += `
                grado interno del nodo ${i+1} : ${gradoInterno[i]} <br>
                grado externo del nodo ${i+1} : ${gradoExterno[i]} <br>
                `;
                // console.log(`El grado interno del nodo ${i+1} es ${gradoInterno[i]}`);
                // console.log(`El grado externo del nodo ${i+1} es ${gradoExterno[i]}`);
            } else {
                gradoInfo.innerHTML += `
                grado del nodo ${i+1} : ${grado[i]} <br>
                `
                // console.log(`El grado del nodo ${i+1} es ${grado[i]}`);
            }
        }
        clasificarNodos(grado, gradoInterno, gradoExterno, Sale, Llega, valorNV, Dirigida);       //V.Clasificar Nodos


        const resultadoParalelas = LineasParalelas(Sale, Llega, valorNL, Dirigida);
        console.log("Resultado de LineasParalelas:", resultadoParalelas);

        // En esSimple se guarda el valor booleano sobre si es simple o no.
        const esSimple = GraficaSimple(Sale, Llega, resultadoParalelas.NumeroParalelas, existeBucle);
        
        const { grado, gradoInterno, gradoExterno } = calcularGradoNodos(AG, valorNV, valorNL, Dirigida);


        // Verificar si la gráfica es regular
        const esRegular = GraficaRegular(grado, gradoInterno, gradoExterno, Dirigida, valorNV);


        // Llamar a la función GraficaConectada
        const esConectada = GraficaConectada(MG, valorNV);

        // Llamar a la función GraficaCompleta
        const esCompleta = GraficaCompleta(XG, esSimple, valorNV);
        
        // Llamar a la función Arbol
        const esArbol = Arbol(esConectada, valorNL, valorNV, esSimple);

        // Llamar a la función GraficaSimetrica
        const esSimetrica = GraficaSimetrica(XG, valorNV, resultadoParalelas.NumeroParalelas, Dirigida);

        clasificarNodos(grado, gradoInterno, gradoExterno, Sale, Llega, valorNV, Dirigida);       //V.Clasificar Nodos

        // Verificar si la gráfica es balanceada
        const esBalanceada = GraficaBalanceada(gradoInterno, gradoExterno, valorNV, Dirigida);

        LineasSerie(grado, Sale, Llega, resultadoParalelas.Paralelas, valorNV, valorNL, Dirigida);


    }

    // graphCreation(Sale, Llega)
}


//--------------------- Ejecuta multipleFunctions
boton.addEventListener('click', multipleFunctions );