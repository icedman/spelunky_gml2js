function oMoaiInside_COLLISION_oCharacter($) {
  with ($) {
    instance_destroy();
  }
}

function oMoaiInside_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    invincible = true;
  }
}

class oMoaiInside extends oSolid {
  sprite_index = sMoaiInside;
  visible = true;
}
ObjType.oMoaiInside = oMoaiInside;
