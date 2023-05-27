function oChest_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}
  }
}

function oChest_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Chest';
    makeActive();
    setCollisionBounds(-6, 0, 6, 8);

    heavy = true;

    yVel = 0;
    yAcc = 0.2;
  }
}

class oChest extends oItem {}
ObjType.oChest = oChest;
