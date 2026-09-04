
Day 4: free coding (I already posted day 5 about gihub integration for backups, but lets do some creation practice first.) 

 Tip (for full brainless mode): you can use AI chatbot like deepseek or chat gpt to generate ideas, then develop them, then generate Cline prompt, jsut describe your situation. Example: "I want to create a site with simple car racing game. I am using VSCode with Cline. Give me  a shortsequence of Cline prompts to make this happen.", You can save the prompts in prompts.md file for later refernce.




Example output from deepseek: 

Prompt 1

Create an index.html file with a <canvas> element, and link a style.css and a script.js (both in the same folder). The page should have a dark background and the canvas centered horizontally. No other content yet.

Prompt 2

In style.css, style the canvas with a border, a fixed width of 400px and height of 600px, and center it vertically on the page. Add a simple retro font for any future text.

Prompt 3

In script.js, write the basic game loop:

Get the canvas and 2D context.

Define the player car as a rectangle (30×60) that starts at the bottom center.

Handle keydown and keyup for left/right arrow keys to move the car (speed 5px per frame).

Draw the road with two gray lanes and dashed white center lines that scroll downward to simulate forward motion.

Use requestAnimationFrame for the loop.

Prompt 4

Now add enemy cars (obstacles):

Spawn a new enemy (random x position, same size as player) every 60 frames, moving downward at a speed of 3px.

When an enemy goes off the bottom, remove it and increase the score by 1.

Display the current score at the top left of the canvas.

Implement collision detection (simple AABB) between the player and each enemy – if a collision occurs, set a gameOver flag to true.

Prompt 5

Finally, add game‑over handling:

When gameOver is true, stop the game loop and show a “Game Over” message on the canvas with your final score.

Restart the game when the player presses the Spacebar (reset all variables, clear enemies, and restart the loop).

Also, prevent the page from scrolling with arrow keys (use preventDefault).

