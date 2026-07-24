const rooms = {
  hall: {
    description: "You are standing on the front porch of your tiny house.",
    options: [
      {
        text: "Go Inside",
        next: "livingRoom"
      },
      {
        text: "Walk into the Forest",
        next: "forest"
      },
      {
        text: "Visit the Campfire",
        next: "campfire"
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
  },
  
  forest: {
    description: "Tall trees surround you. Birds are singing. ✨ Tiny lights drift through the trees. A glowing mushroom rests beneath an ancient oak while distant fairy laughter echoes through the forest.",
    options: [
      {
        text: "Pick a Mushroom",
        next: "mushroom"
      },
      {
        text: "Walk to River",
        next: "river"
      },
      {
         text: "Go to Campfire",
         next: "campfire"
      },
      {
        text: "Go Home",
        next: "hall"
      }
   ]  
},
  
mushroom: {
  description: "You found a glowing mushroom! It might be magical.",
  options: [
    {
      text: "Talk to the Fairy",
      next: "fairy"
    },
    {
      text: "Return to Forest",
      next: "forest"
    }
]
},

fairy: {
  description: "A tiny fairy with glowing wings lands on your shoulder. She smiles and says `Thank you waking me! Take this magical fairy dust.`",
  options: [
    {
    text: "Take Fairy Dust",
    next: "fairyQuest"
  },
  {
    text: "Return to Forest",
    next: "forest"
  }
]
},

fairyQuest:{
  description: "Luna the fairy looks worried. `My magic is weak! I need 3 sparkle drops from the forest to restore my fairy dust. Will you help me?`",
  options: [
    {
    text: "Help Luna",
    next: "collectSparkles"
  },
  {
    text: "Maybe Later",
    next: "forest"
  }
  ]
},

fairyDust: {
  description: "The fairy sprinkles the sparkling dust around you. You feel lighter, and the forest seems brighter than before.",
  options: [
    {
      text: "Continue Exploring",
      next: "forest"
    }
  ]
},

collectSparkles: {
  description: "You venture deeper into the glowing forest and find a tiny sparkle floatin near a flower. You collect it! ✨",
  options: [
    {
      text: "Search for more sparkles",
      next: "sparkleTwo"
    },
    {
      text: "Return to Luna",
      next: "fairy"
    }
  ]
},

sparkleTwo: {
  description: "You follow a trail of glowing dust deeper into the forest. Behind a mushroom, you discover another magical sparkle!✨",
  options: [
    {
      text: "Collect the sparkle",
      next: "sparkleThree"
    },
    {
      text: "Return to Luna",
      next: "fairy"
    }
  ]
},

sparkleThree: {
  description: "You go further into the forest and discover near the river the 3rd and final sparkle! 💖!!",
  options: [
    {
      text: "Collect final sparkle",
      next: "fairyDust"
    },
    {
      text: "Return to Luna",
      next: "fairy"
    }
  ]
},

campfire: {
  description: "A warm campfire crackles under the moon.",
  options: [
      {
        text: "Make Coffee",
        next: "coffee"
      },
      {
        text: "Go home",
        next: "hall"
      }
   ]
},
  
coffee: {
  description: "The coffee smells enticing. You feel refreshed!",
  options: [
      {
        text: "Sit by the Fire",
        next: "campfire"
      }
  ]
},

river: {
    description: "A crystal-clear river flows gently. Fish swim beneath the surface.",
    options: [
        {
            text: "Go Fishing",
            next: "fish"
        },
        {
            text: "Return to Forest",
            next: "forest"
        }
    ]
},

fish: {
    description: "You caught a fish! Dinner is saved.",
    options: [
        {
            text: "Return to River",
            next: "river"
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
