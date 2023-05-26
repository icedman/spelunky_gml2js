function oMoaiInside_COLLISION_oCharacter($) {
  with ($) {
    instance_destroy();
  }
}

function oMoaiInside_CREATE($) {
  with ($) {
    action_inherited();

    invincible = true;
  }
}

class oMoaiInside extends oSolid {
  // variables
}
