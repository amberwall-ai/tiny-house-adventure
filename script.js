let currentRoom = "porch";

let inventory = [];
const inventoryDisplay = document.getElementById("inventory");

let quests = {
  helpLuna: false,
  findFairyDust: false,
  collectSparkles: 0
};

let energy = 100
const maxEnergy = 100;

let coffeeMade = false;

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
    currentRoom = "bedroom";
    showRoom(); 
    return true;
   } else if (energy <= 20) {
    alert("⚠️ Your energy is running low. You should return home and rest.");
   }


    return false;
}

function updateEnergyDisplay() {
  const energyDisplay = document.getElementById("energy-display");

  if (energyDisplay) {
    energyDisplay.textContent = `⚡️ Energy: ${energy}/${maxEnergy}`;
  }
}

const rooms = {
  porch: {
    description: "You are standing on the porch of your tiny house. It is small but has a small cozy chair and table in the corner to sit in the morning and drink coffee. The sun is beautiful in the mornings and peaceful. You can see the forest and occasional wildlife from the porch.",
    options: [
      {
        text: "Go Inside",
        next: "hall"
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

  livingroom: {
    description: "The living room is warm and cozy. With a comfy reading chair by the window with a blanket draped over the back. A small bookshelf is filled with books and a few family photos. A small couch sits in front of a small fireplace. A small coffee table sits in front of the couch with a cup left from the morning coffee. A soft rug is on the floor and a small side table with a lamp sits next to the couch.",
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

  hall: {
    description: "You step inside the door to a small hallway. The hallway has a small set of coat hooks and a small bench to sit on. A small rug is on the floor. The hallway leads to the living room, kitchen, and stairs to the bedroom.",
    options: [
      {
      text: "Go to Living Room",
      next: "livingroom"
      },
      {
      text: "Go to Kitchen",
      next: "kitchen"
      },
      {
        text: "Exit the House",
        next: "porch"
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
          addItem("🍪 Two Cookies");
        },
        next: "kitchen"
      },
      {
        text: "Return to Living Room",
        next: "livingroom"
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
      {
      text: "🪜 Go Downstairs",
      next: "hall"
      },
      {
      text: "Pet Etta 🐕",
       action: () => {
        const character = document.querySelector("#game-content img");
        const animalDialogue = document.querySelector("#animal-dialogue");

        character.src = "pictures/petEtta.png";
        character.alt = "Etta being petted in the cozy bedroom";
        character.style.display = "block";

        animalDialogue.textContent =
            "YES. THIS IS THE CORRECT SPOT. DO NOT STOP.";
      }
      },
      {
      text: "Play Etta 🐕",
       action: () => {
          const character = document.querySelector("#game-content img");
          const animalDialogue = document.querySelector("#animal-dialogue");

          character.src = "pictures/playEtta.png";
          character.alt = "Etta playing happily";
          character.style.display = "block";

          animalDialogue.textContent =
              "Do you wanna play? I already decided yes!";
        }
      },
     {
     text: "Pet Purrcilla 🐈",
      action: () => {
        const character = document.querySelector("#game-content img");
        const animalDialogue = document.querySelector("#animal-dialogue");

        character.src = "pictures/petPurrcilla.png";
        character.alt = "Purrcilla being petted on the bed";
        character.style.display = "block";

        animalDialogue.textContent = "Petting me is a privelge. You may consider yourself fortunate.";
      }
     },
    {
    text: "Talk to Purrcilla 🐈",
     action: () => {
      const character = document.querySelector("#game-content img");
      const animalDialogue = document.querySelector("#animal-dialogue");

      character.src = "pictures/talkPurrcilla.png";
      character.alt = "Purrcilla sitting proudly in the bedroom";
      character.style.display = "block";

      animalDialogue.textContent =
    "Oh, hello. You're here to admire my impeccable taste, I presume? Make yourself useful.";
     }
    }
  ]
},
  
  forest: {
    description: "Tall trees surround you. Birds are singing. ✨ Tiny lights drift through the trees. A glowing mushroom rests beneath an ancient oak while distant fairy laughter echoes through the forest.",
    options: [
      {
        text: "🐇 Follow the Glowing Rabbit",
        next: "moonbeam"
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
     next: "fairyDust",
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
      text: "Begin Luna's Quest",
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
      next: "fairyQuest"
    }
  ]
},

collectSparkles: {
  description: "You venture deeper into the glowing forest and find a tiny sparkle floating near a flower. You collect it! ✨",
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
        addItem("✨ Sparkle Three");
      }
    },
    {
      text: "Return to Luna",
      next: "fairy"
    }
  ]
},

fairyComplete: {
  description: "Luna smiles as the sparkles surround her. Her wings glow brighter than ever! 'You saved the forest!' she says. 'Please accept this Fairy Cryatal as a token of my gratitude!' 💖🧚🏼‍♀️. It will light your path for adventures to come. Also, it shows magical creatures 🧌 that will help you on future quests!!'",
  options: [
    {
      text: "Receive Fairy Crystal",
      next: "forest",
      action: () => {
        addItem("💎 Fairy Crystal");
        alert("🏆 Quest Complete! You have restored Luna's magic!!");
      }
    }
  ]
},

campfire: {
  description: "A warm campfire crackles under the moon. A coffee pot rests nearby, waiting to be used.",
  options: [
    {
      text: "Make Coffee",
      action: () => {
        coffeeMade = true;
      },
      next: "coffee"
    },
    {
      text: "Drink Coffee ☕️",
      action: () => {
        changeEnergy(20);
        coffeeMade = false;
        alert("You drink the wonderfully warming coffee. +20 Energy!");
      },
      next: "campfire"
    },
    {
      text: "Return to Forest🌳",
      next: "forest"
    }
  ]
},

coffee: {
  description: "The coffee smells enticing. You feel refreshed!",
  options: [
    {
      text: "Drink Coffee ☕️",
      action: () => {
        changeEnergy(20);
        coffeeMade = false;
        alert("You drink the wonderfully warming coffee. +20 Energy!");
      },
      next: "campfire"
    },
    {
      text: "Sit by the Fire 🔥",
      next: "campfire"
    }
  ]
},

river: {
    description: "A crystal-clear river flows gently. Fish swim beneath the surface.",
    options: [
        {
            text: "🎣 Fish at the River",
            next: "fishing"
        },
        {
            text: "Return to Forest",
            next: "forest"
        }
    ]
},

fishing: {
    description: "You sit beside the gently flowing river and cast your line into the glowing water.",
    options: [
       {
        text: "🎏 Cast the Line",
        next: "caughtFish",
        action:() => {
          addItem("Fish");
        }
      }
  ]
},

caughtFish: {
  description: "You feel a tug on the line and pull a shimmering fish from the river!",
  options: [
    {
      text: "🎣 Fish Again",
      next: "fishing"
    },
    {
      text: "Return to River",
      next: "river"
    }
  ]
},

moonbeam: {
  description:
  "A tiny silver rabbit with blue-tipped ears hops into the path glowing in the moonlight. Blue sparkles appear beneath her paws. She pauses, looks back at you, as if to say 'Come, follow me.'",
  options: [
    {
      text: "🐇 Follow Moonbeam Deeper into the Forest",
      energyCost: -5,
      next:  "lunaClearing"
    },
    {
      text: "🌲 Return to the Forest",
      next: "forest"
    }
  ]
},

lunaClearing: {
  description:
  "Moonbeam leads you into a hidden clearing filled with glowing, magical mushrooms. Beneath an ancient weeping willow stands Luna, a fairy with shimmering blue-black hair and crystal-blue wings.",
  options: [
    {
      text: "🧚🏼‍♀️ Talk to Luna",
      next: "lunaIntroduction"
    },
    {
      text: "🐇 Pet Moonbeam",
      next: "moonbeamHappy"
    },
    {
      text: "🌲 Return to the Forest",
      next: "forest"
    }
  ]
},

lunaIntroduction: {
  description: 
  "\"Welcome, traveler,\" Luna says gently. \"Moonbeam has been waiting for someone brave and kind hearted. Our forest is losing its magic. Will you help us restore it?\"",
  options: [
    {
      text: "✨ Agree to Help Luna",
      next: "mushroom"
    },
    {
      text: "🌒 Ask Luna About the Forest",
      next: "lunaStory"
    }
  ]
},

lunaStory: {
  description:
  "Luna explains that the river, mushrooms, and woodland creatures are all connected by the magic that keeps the forest beautiful. Each act of kindness gives the forest a little more magic.",
  options: [
    {
      text: "✨ Agree to Help",
      next: "mushroom"
    },
    {
      text: "🐇 Visit Moonbeam",
      next: "moonbeamHappy"
    }
  ]
},

moonbeamHappy: {
  description: "Moonbeam happily wiggles her fluffy blue-black shimmering tail and twitches her nose. Sparkles float around her like they came from her fur!",
  options: [
    {
      text: "Talk to Luna",
      next: "lunaIntroduction"
    },
    {
      text: "🌲 Return to Forest",
      next: "forest"
    }
  ]
},
};

const description = document.getElementById("description");
const buttons = document.getElementById("buttons");

function updateCharacterImage() {
  const character = document.querySelector("#game-content img");

  if (!character) return;

  if (
    currentRoom === "moonbeam" ||
    currentRoom === "moonbeamHappy"
     ) {
    character.src = "pictures/moonbeam.png";
    character.alt = "Moonbeam";
    character.style.display = "block";

  } else if (
  currentRoom === "lunaIntroduction" ||
  currentRoom === "lunaStory" ||
  currentRoom === "fairyQuest" 
  ) {
  character.src = "pictures/luna.png";
  character.alt = "Luna";
  character.style.display = "block";

  } else if (
    currentRoom === "lunaClearing" ||
    currentRoom === "fairyComplete"
  ) {
    character.src = "pictures/luna&moonbeam.png";
    character.alt = "Luna and Moonbeam";
    character.style.display = "block";
  
  } else if (
    currentRoom === "campfire" 
  ) {
    character.src = "pictures/campfireCoffee.png";
    character.alt = "Someone enjoying a cup of coffee by the campfire";
    character.style.display = "block";
  
  } else if (
    currentRoom === "river"
  ) {
    character.src = "pictures/river.png";
    character.alt = "Moonlit River";
    character.style.display = "block";

  } else if (
    currentRoom === "fishing"
  ) {
    character.src = "pictures/fishing.png";
    character.alt = "Fishing at the River";
    character.style.display = "block";

  } else if (
    currentRoom === "caughtFish"
  ) {
    character.src = "pictures/caughtfish.png";
    character.alt = "A fish is caught at the river";
    character.style.display = "block";
  
  } else if (
    currentRoom === "porch"
  ) {
    character.src = "pictures/porch.png";
    character.alt = "A cozy porch with a chair and table and a roof to enjoy a rainy day";
    character.style.display = "block";

   } else if (
    currentRoom === "livingroom"
  ) {
     character.src = "pictures/livingroom.png"
     character.alt = "A cozy livingroom with a reading chair by the window awaits the adventurer. A small bookshelf is filled with books and a few family photos. A small couch sits in front of a small fireplace inviting to guests on cold nights."
     character.style.display = "block";

  } else if (
    currentRoom === "kitchen"
  ) {
    character.src = "pictures/kitchen.png"
    character.alt = "A cozy kitchen with a small table and chairs. A small kitchen island with a plate of cookies and steaming cup of coffee."
    character.style.display = "block";

  } else if (
    currentRoom === "hall"
  ) {
    character.src = "pictures/hall.png"
    character.alt = "A cozy hallway with a small set of coat hooks and a small bench to sit on. A small rug is on the floor. The hallway leads to the living room, kitchen, and stairs to the bedroom."
    character.style.display = "block";
    character.classList.add("room-image");

  } else if (
    currentRoom === "coffee"
  ) {
    character.src = "pictures/makecoffee.png"
    character.alt = "A cozy campfire with a pot of coffee percolating on the fire and the smell of robust coffee hits your nose."
    character.style.display = "block";

  } else if (
    currentRoom === "bedroom"
  ) {
    character.src = "pictures/bedroom.png"
    character.alt = "A cozy bedroom with a reading nook and a bed with fluffy pillows and a blanket draped over the back. A small side table with a lamp sits next to the bed."
    character.style.display = "block";
} else {
  character.style.display = "none";
}
}

function showRoom() {
  const animalDialogue = document.querySelector("#animal-dialogue");
  animalDialogue.textContent = "";
  console.log("Current Room:", currentRoom);
  description.textContent = rooms[currentRoom].description;

  updateCharacterImage();

  buttons.innerHTML = "";

  rooms[currentRoom].options.forEach(option => {

  if (currentRoom === "campfire") {
    if (option.text === "Make Coffee" && coffeeMade) return;
    if (option.text === "Drink Coffee ☕️" && !coffeeMade) return;
  }

  const button = document.createElement("button");

    button.textContent = option.text;

    button.onclick = () => {
        console.log(option);
        
        if (option.action){
          console.log("Running action...");
          option.action();
        }
        if (option.energyCost) {
        const ranOutOfEnergy = changeEnergy(option.energyCost);

         if (ranOutOfEnergy) {
          return;
  }
}

        if (option.next) {
          currentRoom = option.next;
          showRoom();
        }
      };

    buttons.appendChild(button);
});
};

showRoom();

const backgroundMusic = document.querySelector("#background-music");
const musicButton = document.querySelector("#music-button");

musicButton.addEventListener("click", () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
        musicButton.textContent = "🔇 Pause Music";
    } else {
        backgroundMusic.pause();
        musicButton.textContent = "🎵 Play Music";
    }
});