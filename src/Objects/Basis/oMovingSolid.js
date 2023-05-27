function oMovingSolid_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    invincible = false;
  }
}

class oMovingSolid extends oSolid {}
