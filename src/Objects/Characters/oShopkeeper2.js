function oShopkeeper2_STEP($) {
  with ($) {
    try {
      oShopkeeper_STEP($);
    } catch (err) {}

    if (status == DEAD) {
      if (deathTimer > 0) deathTimer -= 1;
      else {
        scrCreateBlood(x + 8, y + 8, 3);
        instance_destroy();
      }
    }
  }
}

function oShopkeeper2_CREATE($) {
  with ($) {
    try {
      oShopkeeper_CREATE($);
    } catch (err) {}

    status = ATTACK;
    hasGun = false;
    deathTimer = 200;
  }
}

class oShopkeeper2 extends oShopkeeper {
  deathTimer;
  hasGun;
  sprite_index = sShopLeft;
  visible = true;
}
ObjType.oShopkeeper2 = oShopkeeper2;
