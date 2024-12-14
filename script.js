
const rooms = [
  {
    type: 'Single Room',
    image: 'assets/room-3.jpg', 
    price: 100,
    description: 'A cozy single room, perfect for one person.',
    availability: 15
  },
  {
    type: 'Double Room',
    image: 'double-room.jpg', 
    price: 150,
    description: 'A spacious double room, perfect for couples.',
    availability: 15
  },
  {
    type: 'Suite Room',
    image: 'suite-room.jpg', 
    price: 250,
    description: 'A luxury suite with a king-sized bed and a view.',
    availability: 25
  },
  {
    type: 'Single Luxury Room',
    image: 'luxury-room.jpg', 
    price: 350,
    description: 'An extravagant room with top-tier amenities.',
    availability: 5
  },
  {
    type: 'Double Luxury Room',
    image: 'penthouse-room.jpg', 
    price: 500,
    description: 'A luxurious penthouse with panoramic views.',
    availability: 5
  },
  {
    type: 'Suite Luxury Room',
    image: 'presidential-room.jpg', 
    price: 1000,
    description: 'The finest suite for an unforgettable experience.',
    availability: 5
  }
];


function openModal() {
  const modal = document.getElementById('roomModal');
  const overlay = document.getElementById('modalOverlay');
  const roomList = document.getElementById('roomList');
  const arrivalDate = document.getElementById('arrivalDate').value;
  const departureDate = document.getElementById('departureDate').value;

  const today = new Date();
  today.setHours(0, 0, 0, 0); 

  if (!arrivalDate || !departureDate) {
    alert('Please enter both arrival and departure dates.');
    return;
  }

  const arrival = new Date(arrivalDate);
  const departure = new Date(departureDate);

  if (arrival < today) {
    alert('Arrival date cannot be in the past.');
    return;
  }

  if (departure < today) {
    alert('Departure date cannot be in the past.');
    return;
  }

  if (arrival >= departure) {
    alert('Invalid dates: Arrival date must be before departure date.');
    return;
  }
  
  roomList.innerHTML = '';

  rooms.forEach(room => {
    const roomElement = document.createElement('div');
    roomElement.classList.add('room-item');
    roomElement.innerHTML = `
      <img src="${room.image}" alt="${room.type}">
      <div class="room-details">
        <h3>${room.type}</h3>
        <p><strong>Price:</strong> $${room.price}</p>
        <p>${room.description}</p>
        <p><strong>Available:</strong> ${room.availability} rooms left</p>
        <button class="book-btn" onclick="bookRoom('${room.type}')" ${room.availability === 0 ? 'disabled' : ''}>Book Now</button>
      </div>
    `;
    roomList.appendChild(roomElement);
  });

  modal.style.display = 'block'; 
  overlay.style.display = 'block'; 

  document.getElementById('arrivalDate').value = '';
  document.getElementById('departureDate').value = '';
  document.getElementById('guests').value = '';

}

function closeModal() {
  const modal = document.getElementById('roomModal');
  const overlay = document.getElementById('modalOverlay');
  
  modal.style.display = 'none'; 
  overlay.style.display = 'none'; 
}

function bookRoom(roomType) {
  const room = rooms.find(r => r.type === roomType);
  
  if (room && room.availability > 0) {
    room.availability -= 1;
    alert(`${roomType} has been successfully booked!`);
    
    openModal();
  } else {
    alert(`${roomType} is currently not available.`);
  }
}
