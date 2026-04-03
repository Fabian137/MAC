
/* --------------- Grafica --------------- */
function graphCreation(Sale, Llega, n,e, dirigida) {
    const nodes = [];
    const links = [];

    for (let i = 1; i <= n; i++) {
        nodes.push({ id: i, name: `V${i}` });
    }
    for (let i = 0; i < e; i++) {
        links.push({ source: Sale[i], target: Llega[i], name: `e${i+1}` });
    }
    
    console.log(nodes)
    console.log(links)

    const svg = d3.select("svg");
    
    console.log(dirigida)

    if (dirigida) {
        svg.append("defs").append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "-0 -5 10 10")
            .attr("refX", 13)
            .attr("refY", 0)
            .attr("orient", "auto")
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("xoverflow", "visible")
            .append("svg:path")
            .attr("d", "M 0,-5 L 10 ,0 L 0,5")
            .attr("fill", "#999")
            .style("stroke", "none");
    }

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(150))
        .force("charge", d3.forceManyBody().strength(-500))
        .force("center", d3.forceCenter(300, 300))
        .force("collide", d3.forceCollide(50));

    const link = svg.selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("marker-end", dirigida ? "url(#arrowhead)" : null);

    const node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("circle")
        .attr("r", 20);  // Aumentar el tamaño del círculo

    node.append("text")
        .attr("class", "label")
        .attr("dx", -10)
        .attr("dy", ".35em")
        .text(d => d.name);

    const linkLabel = svg.selectAll(".link-label")
        .data(links)
        .enter().append("text")
        .attr("class", "label")
        .attr("dy", -5)
        .text(d => d.name);

    simulation.on("tick", () => {
        link.attr("d", d => {
            if (d.source.id === d.target.id) {
                // Dibujar un bucle
                const x1 = d.source.x;
                const y1 = d.source.y;
                const r = 70; // Radio del bucle
                return `M ${x1} ${y1} C ${x1 - r} ${y1 - r}, ${x1 + r} ${y1 - r}, ${x1} ${y1}`;
            } else {
                const dx = d.target.x - d.source.x;
                const dy = d.target.y - d.source.y;
                const dr = Math.sqrt(dx * dx + dy * dy);
                // Check for parallel edges and curve one of them
                const parallel = links.some(l => (l.source.id === d.source.id && l.target.id === d.target.id) ||
                                                  (l.source.id === d.target.id && l.target.id === d.source.id));
                return parallel ? `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}` : `M${d.source.x},${d.source.y} L${d.target.x},${d.target.y}`;
            }
        });

        node.attr("transform", d => `translate(${d.x},${d.y})`);

        linkLabel.attr("x", d => (d.source.x + d.target.x) / 2)
            .attr("y", d => (d.source.y + d.target.y) / 2);
    });

    function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
    }

    function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
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


//--------------------- Ejecuta multipleFunctions
boton.addEventListener('click', () => {
    d3.select("svg").selectAll("*").remove();
    let Dirigida = selectElement.value === "0";
    const numLineas = parseInt(inputNL.value);
    const numVertices = parseInt(inputNV.value); // Obtener el valor actualizado de numVertices
    // dataParams_Validation(numLineas, numVertices);
    const { Sale, Llega } = obtenerDatosInputs();
    graphCreation(Sale, Llega, numVertices, numLineas, Dirigida);
});

// inputNV.addEventListener('input', graphCreation)