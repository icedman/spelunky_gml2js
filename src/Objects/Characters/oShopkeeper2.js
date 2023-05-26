function oShopkeeper2_STEP($) {
  with ($) {
    action_inherited();

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
    action_inherited();

    status = ATTACK;
    hasGun = false;
    deathTimer = 200;
  }
}

class oShopkeeper2 extends oShopkeeper {
  // variables
}
