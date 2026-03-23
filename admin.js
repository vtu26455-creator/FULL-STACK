let events = [];

const form = document.getElementById("eventForm");
const table = document.getElementById("eventTable");
const totalEvents = document.getElementById("totalEvents");

// ✅ ADD HERE ↓↓↓

let bookings = JSON.parse(localStorage.getItem("bookings")) || [];
const bookingTable = document.getElementById("bookingTable");

function renderBookings() {
    bookingTable.innerHTML = "";

    bookings.forEach((b) => {
        bookingTable.innerHTML += `
            <tr>
                <td>${b.user}</td>
                <td>${b.event}</td>
                <td>${b.tickets}</td>
                <td>₹${b.amount}</td>
                <td>${b.date}</td>
                <td>${b.time}</td>
                <td>${b.day}</td>
            </tr>
        `;
    });
}
form.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("eventName").value;
    const date = document.getElementById("eventDate").value;
    const price = document.getElementById("ticketPrice").value;
    const qty = document.getElementById("ticketQty").value;

    const event = { name, date, price, qty };
    events.push(event);

    renderEvents();
    form.reset();
});

function renderEvents() {
    table.innerHTML = "";
    events.forEach((event, index) => {
        table.innerHTML += `
            <tr>
                <td>${event.name}</td>
                <td>${event.date}</td>
                <td>${event.price}</td>
                <td>${event.qty}</td>
                <td><button onclick="deleteEvent(${index})">Delete</button></td>
            </tr>
        `;
    });

    totalEvents.innerText = events.length;
}

function deleteEvent(index) {
    events.splice(index, 1);
    renderEvents();
    
}
renderBookings();