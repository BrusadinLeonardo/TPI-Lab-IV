//crear inscripcion usuario

async function handleCreateInscription(event) {
    event.preventDefault();
    
    const userId = localStorage.getItem('userId');
    const eventoId = document.getElementById('evento_id').value;
    const fechaInscripcion = document.getElementById('fecha_inscripcion').value;
    
    const formData = new FormData();
    formData.append('evento_id', eventoId);
    formData.append('usuario_id', userId);
    formData.append('fecha_inscripcion', fechaInscripcion);
    
    try {
        const response = await fetch('http://127.0.0.1:8000/inscripciones', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
              },
            body: formData
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        document.getElementById('create-inscription-response').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        document.getElementById('create-inscription-response').textContent = `Error: ${error.message}`;
    }
}

// historial del usuario

document.getElementById('buscar-inscripciones-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const usuarioId = localStorage.getItem('userId');

    try {

        debugger;

        const response = await fetch(`http://127.0.0.1:8000/inscripciones/history/${usuarioId}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        });

        if (!response.ok) {
            if (response.status === 204) {
                throw new Error("Inscripciones no encontradas");
            } else {
                throw new Error("Error en la solicitud");
            }
        }

        if (response.status === 204){
            throw new Error("Inscripciones no encontradas");
        }

        const data = await response.json();
        const tbody = document.getElementById('inscripciones-table-body');
        tbody.innerHTML = '';
        data.forEach((inscripcion) => {
            const evento = inscripcion.evento;
            const categoria = evento.categoria;
            const row = `
                <tr>
                    <td>${evento.id}</td>
                    <td>${evento.nombre}</td>
                    <td>${evento.descripcion}</td>
                    <td>${evento.fecha_inicio}</td>
                    <td>${evento.fecha_fin}</td>
                    <td>${evento.lugar}</td>
                    <td>${evento.cupos}</td>
                    <td>${categoria.nombre}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
});

// Función para obtener y mostrar eventos disponibles EN EL INDEX
async function fetchAndDisplayEventos(fecha) {
    const url = `http://127.0.0.1:8000/Eventos/disponibles/${fecha}`;

    debugger;

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Reemplaza con tu método para obtener el token
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const eventosTableBody = document.querySelector('#eventos-table tbody');

        // Limpiar tabla antes de actualizar
        eventosTableBody.innerHTML = '';

        data.forEach(evento => {
            const row = `
                <tr>
                    <td>${evento.id}</td>
                    <td>${evento.nombre}</td>
                    <td>${evento.descripcion}</td>
                    <td>${evento.fecha_inicio}</td>
                    <td>${evento.fecha_fin}</td>
                    <td>${evento.lugar}</td>
                    <td>${evento.cupos}</td>
                    <td>${evento.categoria_id}</td>
                </tr>`;
            eventosTableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error fetching eventos:', error);
    }
}

//ESTO ES PARA INSCRIPCIONES ACTIVAS POR USUARIO
document.getElementById('buscar-inscripciones-activas-form').addEventListener('submit', async function (event) {
    event.preventDefault();

    debugger;

    const userId = localStorage.getItem('userId');
    const fecha = document.getElementById('fecha').value;

    try {
        const response = await fetch(`http://127.0.0.1:8000/inscripciones/active/?fecha=${fecha}&usuario_id=${userId}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        });

        if (!response.ok) {
            if (response.status === 204) {
                throw new Error("Inscripciones no encontradas");
            } else {
                throw new Error("Error en la solicitud");
            }
        }

        if (response.status === 204){
            throw new Error("Inscripciones no encontradas");
        }

        const data = await response.json();
        const tbody = document.getElementById('inscripciones-activas-table-body');
        tbody.innerHTML = '';
        data.forEach((inscripcion) => {
            const evento = inscripcion.evento;
            const categoria = evento.categoria;
            const row = `
                <tr>
                    <td>${evento.id}</td>
                    <td>${evento.nombre}</td>
                    <td>${evento.descripcion}</td>
                    <td>${evento.fecha_inicio}</td>
                    <td>${evento.fecha_fin}</td>
                    <td>${evento.lugar}</td>
                    <td>${evento.cupos}</td>
                    <td>${categoria.nombre}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });

    } catch (error) {
        console.error('Error:', error);
        alert(error.message);
    }
});

