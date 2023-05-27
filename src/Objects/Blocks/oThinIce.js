function oThinIce_STEP($) {
  with ($) {
    if (collision_rectangle(x, y - 1, x + 16, y + 1, ObjType.oPlayer1, 0, 0)) {
      thickness -= 2;
      if (rand(1, 100) == 1) instance_create(x + rand(0, 16), y + 9, oDrip);
    }

    if (thickness > 50) sprite_index = sThinIce1;
    else if (thickness > 40) sprite_index = sThinIce2;
    else if (thickness > 30) sprite_index = sThinIce3;
    else if (thickness > 20) sprite_index = sThinIce4;
    else if (thickness > 10) sprite_index = sThinIce5;
    else if (thickness > 0) sprite_index = sThinIce6;
    else instance_destroy();
  }
}

function oThinIce_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    thickness = 60;
  }
}

class oThinIce extends oSolid {}
