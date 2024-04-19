const inputNV = document.getElementById('nv');
let verticesArray = []
// Añadir un evento 'change' al input para detectar cuando cambia su valor
inputNV.addEventListener('change', function() {
    // Obtener el valor del input
    const valorNV = inputNV.value;
    
    // Mostrar el valor en la consola
    console.log('Número de vértices:', valorNV);

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
});



const graphNode_example =[
    {id:1, value:4},
    {id:2, value:2}
]

