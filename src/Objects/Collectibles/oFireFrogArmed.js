function oFireFrogArmed_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}
  }
}

function oFireFrogArmed_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Fire Frog';
    makeActive();
    setCollisionBounds(-6, 0, 6, 8);

    heavy = true;

    yVel = 0;
    yAcc = 0.2;
  }
}

class oFireFrogArmed extends oItem {}
ObjType.oFireFrogArmed = oFireFrogArmed;
