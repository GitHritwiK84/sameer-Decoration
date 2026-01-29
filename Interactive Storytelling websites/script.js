// --- DOM Elements ---
const textElement = document.getElementById('text-node');
const optionButtonsElement = document.getElementById('option-buttons');
const imageContainer = document.getElementById('story-image');

// --- State Management ---
// Stores items collected (e.g., { blueKey: true })
let state = {};

// --- Game Logic ---

function startGame() {
    state = {}; // Reset state
    showTextNode(1); // Start at the first node
}

function showTextNode(textNodeIndex) {
    // Find the node in the data array
    const textNode = textNodes.find(node => node.id === textNodeIndex);
    
    // 1. Update Text
    textElement.innerText = textNode.text;
    
    // 2. Update Image (with animation reset)
    // In a real app, these would be paths to actual image files. 
    // Using placeholders for this demonstration.
    imageContainer.innerHTML = `<img src="${textNode.img}" alt="Scene visualization" class="fade-in">`;

    // 3. Clear old buttons
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild);
    }

    // 4. Create new buttons
    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button');
            button.innerText = option.text;
            button.classList.add('btn');
            button.addEventListener('click', () => selectOption(option));
            optionButtonsElement.appendChild(button);
        }
    });

    // Add fade animation class to text to indicate update
    textElement.classList.remove('fade-in');
    void textElement.offsetWidth; // Trigger reflow
    textElement.classList.add('fade-in');
}

// Check if an option should be visible based on required state
function showOption(option) {
    return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;

    if (nextTextNodeId <= 0) {
        return startGame(); // Restart game
    }

    // Update state if the option sets a state (e.g., picking up an item)
    state = Object.assign(state, option.setState);
    showTextNode(nextTextNodeId);
}

// --- Story Content Data ---
// Images are using Placehold.co for demonstration purposes.
// In production, replace src with local paths like 'assets/gate.jpg'

const textNodes = [
    {
        id: 1,
        text: "You stand before the massive iron gates of the Clockwork City. Steam hisses from pipes in the walls, and the ground vibrates with the rhythm of giant gears. The gate is locked, but you see a small vent near the ground.",
        img: "https://placehold.co/800x400/222/c5a059?text=The+Iron+Gates",
        options: [
            {
                text: "Knock on the main gate",
                nextText: 2
            },
            {
                text: "Crawl through the vent",
                nextText: 3
            }
        ]
    },
    {
        id: 2,
        text: "A mechanical eye extends from the door. 'IDENTIFICATION REQUIRED,' a robotic voice booms. You don't have an ID.",
        img: "https://placehold.co/800x400/222/c5a059?text=Mechanical+Eye",
        options: [
            {
                text: "Try to lie to the robot",
                nextText: 4
            },
            {
                text: "Look for another way inside",
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: "You squeeze through the vent and find yourself in a maintenance tunnel. It's dark, but you see a shiny Golden Wrench left on a workbench.",
        img: "https://placehold.co/800x400/222/c5a059?text=Maintenance+Tunnel",
        options: [
            {
                text: "Take the Golden Wrench",
                setState: { hasWrench: true },
                nextText: 5
            },
            {
                text: "Leave it and keep moving",
                nextText: 5
            }
        ]
    },
    {
        id: 4,
        text: "The robot detects your lie immediately. Steam blasts from the gate, forcing you to retreat. The city remains a mystery to you.",
        img: "https://placehold.co/800x400/442222/c5a059?text=Access+Denied",
        options: [
            {
                text: "Restart Adventure",
                nextText: -1
            }
        ]
    },
    {
        id: 5,
        text: "You emerge into the city square. In the center stands the Grand Clock Tower, but its gears are jammed! Sparks are flying everywhere.",
        img: "https://placehold.co/800x400/222/c5a059?text=The+Broken+Clock",
        options: [
            {
                text: "Attempt to fix the gears manually",
                requiredState: (currentState) => currentState.hasWrench,
                nextText: 6
            },
            {
                text: "Look for help",
                nextText: 7
            },
            {
                text: "Run away before it explodes",
                nextText: 8
            }
        ]
    },
    {
        id: 6,
        text: "Using the Golden Wrench, you loosen the jammed cog. With a loud CLANK, the gears begin to turn smoothly. The city lights up in celebration! You are a hero.",
        img: "https://placehold.co/800x400/224422/c5a059?text=City+Saved!",
        options: [
            {
                text: "Play Again",
                nextText: -1
            }
        ]
    },
    {
        id: 7,
        text: "You try to find help, but the citizens are too panicked. By the time you return, the clock has seized up completely. The city goes dark.",
        img: "https://placehold.co/800x400/222/c5a059?text=Darkness+Falls",
        options: [
            {
                text: "Try Again",
                nextText: -1
            }
        ]
    },
    {
        id: 8,
        text: "You run back to the vents. You survive, but you will always wonder what would have happened if you had stayed.",
        img: "https://placehold.co/800x400/222/c5a059?text=Escape",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    }
];

// Initialize Game
startGame();