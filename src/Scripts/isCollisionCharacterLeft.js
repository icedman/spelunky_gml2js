/*
0: Number of pixels left of the collision rectangle to check for a collision
with the character.
1: Id to use instead of the characters. Optional. Used e.g. when we need to check for a particular character.
*/
//the solid must be hitting the character's right side, so...
oGame.collisionTempId = id;
w = arguments[1];
if (arguments[1] == 0 || arguments[1] == noone)
  w = oCharacter[instances_of(w)].forEach(($) => {
    with ($) {
      calculateCollisionBounds();
      //if there is a collision with tempId on the character's right side
      if (
        collision_line(
          round(rb + arguments[0] - 1),
          round(tb),
          round(rb + arguments[0] - 1),
          round(bb - 1),
          oGame.collisionTempId,
          1,
          1
        ) > 0
      )
        return 1;
    }
  });

return 0;
