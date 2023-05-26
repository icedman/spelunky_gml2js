/*
Is the solid, enemy, etc. colliding with the character?
*/
oCharacter.tempId = id[instances_of(oCharacter)] //this should be the id of the solid, enemy, etc.
  .forEach(($) => {
    with ($) {
      calculateCollisionBounds();
      //if there is a collision with tempId on the character's right side
      return collision_rectangle(lb, tb, rb - 1, bb - 1, tempId, 1, 1);
    }
  });

return 0;