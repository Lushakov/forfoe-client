# forfoe-client

This project about detection of collision some geometric objects. 
Now it's working with DOM elements for rendering and with circles only. But in future I'm going to use it and Pixi.js together and I will add more kind of geometric shape (polygons in plans).

Main ideas are:
1) Create sheme of colision (who with whom)
2) The scheme divides all objects into masters and slaves
3) The master handle collision and can calls slaves methods
4) The class of each geometric object can be moved into a separate module
5) life cycle: chek collision of all objects =>
               save result to game._collisionCheckResult =>
               call the "action" method on all objects
               and if a collision is detected hand over to the masters their slaves


You can use it for creating simple game or other tasks with geometric shapes

Demo: https://devreed.ru/forfoe/