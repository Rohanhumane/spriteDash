# Canvas Game in React
SpriteDash

## Overview
This is a **Canvas-based game** built using **React and TypeScript**. It renders a sprite character on an HTML5 Canvas and allows movement through keyboard inputs while handling collision detection and win conditions.

## Features
- **Canvas Rendering:** Uses the HTML5 Canvas API.
- **Character Movement:** Controlled using `Arrow` keys.
- **Collision Detection:** Prevents movement through obstacles.
- **Dynamic Resizing:** Adjusts game area based on window size.
- **Win State:** Reaching the goal position ends the game.

## Installation
### Prerequisites
- Node.js and npm installed
- React project setup

### Steps
1. Clone the repository:
   ```sh
   git clone https://github.com/Rohanhumane/spriteDash.git
   cd your-repo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the project:
   ```sh
   npm start
   ```

## Usage
- Use the arrow keys to move the character.
- Avoid obstacles to reach the goal.
- The game resizes dynamically when the window is resized.

## File Structure
```
📁 src
 ┣ 📂 components
 ┃ ┗ 📜 Canvas.tsx  # Main game logic
 ┣ 📂 styles
 ┃ ┗ 📜 Canvas.module.css  # Styles for canvas
 ┣ 📂 utils
 ┃ ┗ 📜 Constant.ts  # Game constants like obstacles and directions
 ┣ 📜 App.tsx
 ┣ 📜 index.tsx
```

## Known Issues
- **Bug Fix Needed:** Incorrect event key name (`"ArowLeft"` instead of `"ArrowLeft"`).
- **Unused Code:** The `drawPeice` function is commented out but defined.

## Contributing
1. Fork the repository.
2. Create a new branch:
   ```sh
   git checkout -b feature-name
   ```
3. Commit changes:
   ```sh
   git commit -m "Added new feature"
   ```
4. Push and create a pull request.

## License
This project is licensed under the MIT License.

