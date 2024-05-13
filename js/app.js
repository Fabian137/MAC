const inputNV = document.getElementById('nv');
const inputNL = document.getElementById('nl');
const selectElement = document.querySelector('.form-select');
// const FALTA PARA LA RELACIÓN ENTRE VERTICES
const boton = document.getElementById('btnTrigger');
let verticesArray = []









boton.addEventListener('click', function() {

    
    // Obtener el valor del input
    // const valorNV = inputNV.value;
    const valorNV = parseInt(inputNV.value);
    const valorNL = parseInt(inputNL.value);
    const valorSeleccionado = selectElement.value;
    
    if(isNaN(valorNV) || isNaN(valorNL)){
        alert('Por favor ingresa valores válidos en los campos de número de vértices y número de líneas.');        
    }
    else{
        console.log('Número de vértices:', valorNV);
        console.log('Número de líneas:', valorNL);
        console.log('El valor seleccionado es:', valorSeleccionado);
    }
/* 

for (let i = 0; i < valorNV; i++) {
    verticesArray.push(i);
}

d3.select('.nodes')
.selectAll('.circle')
// .data(graphNode_example)
.data(verticesArray)
.enter()
.append('div')
.classed('circle', true);
// .text(dta => dta);
*/
});



const graphNode_example =[
    {id:1, value:4},
    {id:2, value:2}
]


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