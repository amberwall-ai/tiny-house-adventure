let currentRoom = "hall";

let inventory = [];
const inventoryDisplay = document.getElementById("inventory");

let quests = {
  helpLuna: false,
  findFairyDust: false,
  collectSparkles: false
};

let energy = 100
const maxEnergy = 100;

function addItem(item) {
     if (!inventory.includes(item)) {
        inventory.push(item);
        inventoryDisplay.textContent = inventory.join(",")
        alert(`You received: ${item}`);
     }
}

function changeEnergy(amount) {
  energy += amount;
  if (energy > maxEnergy) {
    energy = maxEnergy;
  }

  if (energy < 0) {
    energy = 0;
  }
   updateEnergyDisplay();

   if (energy === 0) { 
    alert("💤 You ran out of energy and woke up safely at home in the loft room!");
    energy = maxEnergy;
    updateEnergyDisplay();
    showRoom("livingRoom");
   } else if (energy <= 20) {
    alert("⚠️ Your energy is running low. You should return home and rest.");
   }
}

function updateEnergyDisplay() {
  const energyDisplay = document.getElementById("energy-display");

  if (energyDisplay) {
    energyDisplay.textContent =`⚡️ Energy: ${energy}/{${maxEnergy}`;
  }
}

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
        text:"🪜 Go Upstairs",
        next: "bedroom"
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
        text: "😋 Take One Cookie",
        action: () => {
          addItem("🍪 Cookie");
        },
        next: "kitchen"
      },
      {
        text: "🍪🍪 Take Two Cookies",
        action: () => {
          addItem("🍪 Cookie");
          addItem("🍪 Cookie");
        },
        next: "kitchen"
      },
      {
        text: "Return to Living Room",
        next: "livingRoom"
      }
    ]
  },

  bedroom: {
    description: "🛌 You can climb the stairs to the bedroom. When you open the door a cozy bed and reading 📖 nook greets you. The bed has fluffy pillows, inviting you to lay on them. You can restore energy while resting.",
    options: [
      {
      text: "😴 Sleep",
      action: () => {
        energy = maxEnergy;
        updateEnergyDisplay();
        alert("You wake up refreshed and ready for another adventure!");
       },
      next: "bedroom"
    },
    {text: "🪜 Go Downstairs",
      next: "livingRoom"
    },
  ]
},
  
  forest: {
    description: "Tall trees surround you. Birds are singing. ✨ Tiny lights drift through the trees. A glowing mushroom rests beneath an ancient oak while distant fairy laughter echoes through the forest.",
    options: [
      {
        text: "Pick a Mushroom",
        energyCost: -5,
        next: "mushroom"
      },
      {
        text: "Walk to River",
        energyCost: -10,
        next: "river"
      },
      {
         text: "Go to Campfire",
         energyCost: -5,
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
     next: "fairyQuest",
     action: () => {
        addItem("✨ Fairy Dust ✨");
        quests.findFairyDust = true;
     }
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
      text: "Collect Sparkle One",
      next: "sparkleTwo",
      action: () => {
        addItem("✨ Sparkle One");
      }
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
      text: "Collect Sparkle Two",
      next: "sparkleThree",
      action: () => {
        addItem("✨ Sparkle Two");
      }
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
      text: "Collect Sparkle Three",
      next: "fairyComplete",
      action: () => {
        addItem("✨ Sparkle THree");
      }
    },
    {
      text: "Return to Luna",
      next: "fairyComplete"
    }
  ]
},

fairyComplete: {
  description: "Luna smiles as the sparkles surround her. Her wings glow brighter than ever! 'You saved the forest!' she says. 'Please accept this Fairy Cryatal as a token of my gratitude!' 💖🧚🏼‍♀️. It will light your path for adventures to come. Also, it shows magical creatures 🧌 that will help you on future quests!!'",
  options: [
    {
      text: "Recieve Fairy Crystal",
      next: "forest",
      action: () => {
        addItem("💎 Fairy Crystal");
        alert("🏆 Quest Complete! You have restored Luna's magic!!");
      }
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

const description = document.getElementById("description");
const buttons = document.getElementById("buttons");

function showRoom() {
  description.textContent = rooms[currentRoom].description;

  buttons.innerHTML = "";

  rooms[currentRoom].options.forEach(option => {
    const button = document.createElement("button");

    button.textContent = option.text;

    button.onclick = () => {
        console.log(option);
        
        if (option.action){
          console.log("Running action...");
          option.action();
        }
        if (option.energyCost) {
          changeEnergy(option.energyCost);
        }

        currentRoom = option.next;
        showRoom();
      };

    buttons.appendChild(button);
  });
}

showRoom();
