function oChest_STEP($) {
  with ($) {
    action_inherited();
  }
}

function oChest_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Chest';
    makeActive();
    setCollisionBounds(-6, 0, 6, 8);

    heavy = true;

    yVel = 0;
    yAcc = 0.2;
  }
}

class oChest extends oItem {
  // variables
}
