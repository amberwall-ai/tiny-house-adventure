const rooms = {
  hall: {
    description: "You are standing on the front porch of your tiny house.",
    options: [
      {
        text: "Go Inside",
        next: "livingRoom"
      }
    ]
  },

  livingRoom: {
    description: "The living room is warm and cozy.",
    options: [
      {
        text: "Go to Kitchen",
        next: "kitchen"
      },
      {
        text: "Go Outside",
        next: "hall"
      }
    ]
  },

  kitchen: {
    description: "The smell of fresh cookies fills the room.",
    options: [
      {
        text: "Return to Living Room",
        next: "livingRoom"
      }
    ]
  }
};

let currentRoom = "hall";

const description = document.getElementById("description");
const buttons = document.getElementById("buttons");

function showRoom() {
  description.textContent = rooms[currentRoom].description;

  buttons.innerHTML = "";

  rooms[currentRoom].options.forEach(option => {
    const button = document.createElement("button");

    button.textContent = option.text;

    button.onclick = () => {
      currentRoom = option.next;
      showRoom();
    };

    buttons.appendChild(button);
  });
}

showRoom();
