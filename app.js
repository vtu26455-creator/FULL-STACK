let events = [];
let bookings = JSON.parse(localStorage.getItem("bookings")) || [];

const form = document.getElementById("eventForm");
const eventList = document.getElementById("eventList");
const bookingTable = document.getElementById("bookingTable");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const event = {
        id: Date.now(),
        name: document.getElementById("eventName").value,
        date: document.getElementById("eventDate").value,
        time: document.getElementById("eventTime").value,
        location: document.getElementById("location").value,
        price: parseInt(document.getElementById("price").value),
        quantity: parseInt(document.getElementById("quantity").value)
    };

    events.push(event);
    form.reset();
    renderEvents();
});

function renderEvents() {
    eventList.innerHTML = "";

    events.forEach(event => {

        // 🔴 If quantity is 0 → remove event automatically
        if (event.quantity <= 0) {
            return;
        }

        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
            <h3>${event.name}</h3>
            <p>${event.date} | ${event.time}</p>
            <p>${event.location}</p>
            <p>Price: ₹${event.price}</p>
            <p>Tickets Left: ${event.quantity}</p>
            <input type="text" id="user_${event.id}" placeholder="Your Name">
            <input type="number" id="ticket_${event.id}" placeholder="Tickets">
            <button onclick="bookTicket(${event.id})">Book</button>
            <button onclick="deleteEvent(${event.id})" style="background:red;margin-left:5px;">Delete</button>
        `;

        eventList.appendChild(card);
    });
}

function bookTicket(id) {
    const event = events.find(e => e.id === id);

    const user = document.getElementById(`user_${id}`).value;
    const tickets = parseInt(document.getElementById(`ticket_${id}`).value);

    if (!user || !tickets) {
        alert("Fill booking details");
        return;
    }

    if (tickets > event.quantity) {
        alert("Not enough tickets");
        return;
    }

    event.quantity -= tickets;

    const dayName = new Date(event.date)
        .toLocaleDateString('en-IN', { weekday: 'long' });
        // Convert 24hr to 12hr format
let [hours, minutes] = event.time.split(":");
hours = parseInt(hours);

let ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12;
hours = hours ? hours : 12;

let formattedTime = hours + ":" + minutes + " " + ampm;

    bookings.push({
        user: user,
        event: event.name,
        tickets: tickets,
        amount: tickets * event.price,
        date: event.date,
        time:formattedTime,
        day: dayName
    });
    localStorage.setItem("bookings", JSON.stringify(bookings));

    // 🔴 If tickets become 0 → remove event from array
    if (event.quantity <= 0) {
        events = events.filter(e => e.id !== id);
    }

    renderEvents();
    renderBookings();
}

// 🔴 Manual Delete Button
function deleteEvent(id) {
    events = events.filter(e => e.id !== id);
    renderEvents();
}

function renderBookings() {
    bookingTable.innerHTML = "";

    bookings.forEach(b => {
        const row = `
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
        bookingTable.innerHTML += row;
    });
}