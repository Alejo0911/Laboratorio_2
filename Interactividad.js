// Captura los elementos del DOM
const eventForm = document.getElementById('event-form');
const eventTitle = document.getElementById('event-title');
const eventDate = document.getElementById('event-date');
const eventsList = document.getElementById('events-list');

// Carga los eventos desde el almacenamiento local
let events = JSON.parse(localStorage.getItem('events')) || [];

// Muestra los eventos en la lista
function displayEvents() {
    eventsList.innerHTML = ''; // Limpia la lista existente
    events.forEach((event, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${event.title} - ${event.date}</span>
            <button onclick="deleteEvent(${index})">Eliminar</button>
        `;
        eventsList.appendChild(li);
    });
}

// Agrega un nuevo evento
function addEvent(event) {
    event.preventDefault(); // Previene la recarga de la página
    const title = eventTitle.value.trim();
    const date = eventDate.value;

    // Verifica que los campos no estén vacíos
    if (title === '' || date === '') {
        alert('Por favor, completa todos los campos');
        return;
    }

    // Agrega el evento a la lista
    events.push({ title, date });

    // Guarda los eventos en el almacenamiento local
    localStorage.setItem('events', JSON.stringify(events));

    eventForm.reset(); // Resetea el formulario
    displayEvents(); // Muestra la lista actualizada de eventos
}

// Elimina un evento
function deleteEvent(index) {
    events.splice(index, 1); // Elimina el evento del array
    localStorage.setItem('events', JSON.stringify(events)); // Actualiza el almacenamiento local
    displayEvents(); // Muestra la lista actualizada
}

// Escucha el envío del formulario para agregar eventos
eventForm.addEventListener('submit', addEvent);

// Muestra los eventos al cargar la página
window.addEventListener('load', displayEvents);
