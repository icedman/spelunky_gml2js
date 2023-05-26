function oFireFrogArmed_STEP($) {
  with ($) {
    action_inherited();
  }
}

function oFireFrogArmed_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Fire Frog';
    makeActive();
    setCollisionBounds(-6, 0, 6, 8);

    heavy = true;

    yVel = 0;
    yAcc = 0.2;
  }
}

class oFireFrogArmed extends oItem {
  // variables
}
