function platformCharacterIs() {
  /*
Returns whether a GENERAL trait about a character is true.
Only the platform character should run this script. 

argument0 can be one of the following:
ON_GROUND
IN_AIR
ON_LADDER

Example of usage:
Event: oCharacter collides with oGoomba
Action: if platformCharacterIs(ON_GROUND) instance_destroy()
*/

  if (
    arguments[0] == ON_GROUND &&
    (state == RUNNING ||
      state == STANDING ||
      state == DUCKING ||
      state == LOOKING_UP)
  )
    return 1;
  if (arguments[0] == IN_AIR && (state == JUMPING || state == FALLING))
    return 1;
  if (arguments[0] == ON_LADDER && state == CLIMBING) return 1;
  return 0;
}
