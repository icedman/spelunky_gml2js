function canPushMoveableSolids() {
  /*
Returns whether the current object can push moveable solids.
Currently, it returns whether the current object is a player.
If you want certain enemies to be able to push moveable solids, edit this script.
*/
  return (
    object_index == oCharacter || object_get_parent(object_index) == oCharacter
  );
}
