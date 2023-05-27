function oIceBlock_DESTROY($) {
  with ($) {
    if (!cleanDeath && !global.cleanSolids) {
      for (r = 0; r < c; r++) {
        instance_create(x + rand(0, 16), y + rand(0, 16), oDrip);
      }
    }
  }
}

function oIceBlock_STEP($) {
  with ($) {
    try {
      oMoveableSolid_STEP($);
    } catch (err) {}

    if (
      collision_point(x + 8, y + 16, oLava, 0, 0) &&
      !collision_point(x + 8, y + 17, oSolid, 0, 0)
    ) {
      yVel = 0;
      myGrav = 0;
      y += 0.05;
    }
    if (y > 576) instance_destroy();
  }
}

function oIceBlock_CREATE($) {
  with ($) {
    try {
      oMoveableSolid_CREATE($);
    } catch (err) {}

    invincible = false;
    setCollisionBounds(0, 0, 16, 16);
    if (global.cityOfGold) sprite_index = sGoldBlock;
    cleanDeath = false;
  }
}

class oIceBlock extends oMoveableSolid {}
