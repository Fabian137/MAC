document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const questionsContainer = document.getElementById('questionsContainer');
    const newQuestionForm = document.getElementById('newQuestionForm');
    const searchForm = document.getElementById('searchForm');
    const datePicker = document.getElementById('datePicker');
    const todayBtn = document.getElementById('todayBtn');
    const sessionList = document.getElementById('sessionList');

    // Cargar preguntas al iniciar
    loadQuestions();

    // Enviar nueva pregunta
    newQuestionForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        const texto = this.elements.texto.value;
        const esAnonima = this.elements.anonima.checked ? 1 : 0;

        try {
            const response = await fetch('/api/preguntas.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ texto, anonima: esAnonima })
            });

            if (!response.ok) throw new Error('Error en la respuesta');

            const result = await response.json();
            
            if (result.success) {
                this.reset();
                addQuestionToDOM({
                    id: result.id,
                    texto: texto,
                    fecha_creacion: new Date().toISOString(),
                    es_anonima: esAnonima
                });
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al enviar la pregunta');
        }
    });

    // Buscar preguntas
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const keyword = this.elements.keyword.value;
        searchQuestions(keyword);
    });

    // Filtrar por fecha
    datePicker.addEventListener('change', function() {
        loadQuestions(this.value);
    });

    todayBtn.addEventListener('click', function() {
        datePicker.valueAsDate = new Date();
        loadQuestions();
    });

    // Funciones principales
    async function loadQuestions(date = null) {
        try {
            const url = date ? `../api/preguntas.php?date=${date}` : '../api/preguntas.php';
            const response = await fetch(url);
            
            if (!response.ok) throw new Error('Error al cargar preguntas');
            
            const preguntas = await response.json();
            renderQuestions(preguntas);
            updateDateDisplay(date);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function renderQuestions(preguntas) {
        questionsContainer.innerHTML = '';
        
        if (preguntas.length === 0) {
            questionsContainer.innerHTML = '<div class="alert alert-info">No hay preguntas</div>';
            return;
        }

        preguntas.forEach(pregunta => {
            addQuestionToDOM(pregunta);
        });
    }

    function addQuestionToDOM(pregunta) {
        const accordionItem = document.createElement('div');
        accordionItem.className = 'accordion-item mb-3';
        accordionItem.innerHTML = `
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" 
                        data-bs-toggle="collapse" 
                        data-bs-target="#pregunta-${pregunta.id}">
                    ${pregunta.texto}
                    <span class="badge bg-secondary ms-2">
                        ${new Date(pregunta.fecha_creacion).toLocaleDateString()}
                    </span>
                </button>
            </h2>
            <div id="pregunta-${pregunta.id}" class="accordion-collapse collapse">
                <div class="accordion-body">
                    <p class="text-muted">
                        ${pregunta.es_anonima ? 'Pregunta anónima' : 'Pregunta de usuario'} • 
                        ${new Date(pregunta.fecha_creacion).toLocaleString()}
                    </p>
                </div>
            </div>
        `;
        
        questionsContainer.querySelector('.accordion').prepend(accordionItem);
    }

    async function searchQuestions(keyword) {
        try {
            const response = await fetch(`/api/preguntas.php?search=${encodeURIComponent(keyword)}`);
            
            if (!response.ok) throw new Error('Error en la búsqueda');
            
            const results = await response.json();
            renderQuestions(results);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function updateDateDisplay(date) {
        const dateDisplay = document.getElementById('currentDateDisplay');
        dateDisplay.textContent = date 
            ? `Preguntas del ${new Date(date).toLocaleDateString()}` 
            : 'Preguntas recientes';
    }

    // Cargar fechas disponibles para el filtro
    async function loadAvailableDates() {
        try {
            const response = await fetch('/api/fechas.php');
            
            if (!response.ok) throw new Error('Error al cargar fechas');
            
            const fechas = await response.json();
            renderDateList(fechas);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    function renderDateList(fechas) {
        sessionList.innerHTML = '';
        fechas.forEach(fecha => {
            const dateItem = document.createElement('a');
            dateItem.href = '#';
            dateItem.className = 'list-group-item list-group-item-action';
            dateItem.textContent = new Date(fecha).toLocaleDateString();
            dateItem.addEventListener('click', () => {
                datePicker.value = fecha;
                loadQuestions(fecha);
            });
            sessionList.appendChild(dateItem);
        });
    }

    // Inicialización
    datePicker.valueAsDate = new Date();
    loadAvailableDates();
});