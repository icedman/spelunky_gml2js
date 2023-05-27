function getIdCollisionCharacterTop() {
  /*
0: Number of pixels above the collision rectangle to check for a collision
with the character.
*/
  //the solid must be hitting the character's bottom side, so...
  oCharacter.tempId = id;
  instances_of(oCharacter).forEach(($) => {
    with ($) {
      calculateCollisionBounds();
      //if there is a collision with tempId on the character's bottom side
      return collision_line(
        round(lb),
        round(bb + arguments[0] - 1),
        round(rb - 1),
        round(bb + arguments[0] - 1),
        tempId,
        1,
        1
      );
    }
  });

  return 0;
}
