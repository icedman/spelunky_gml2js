function oCrate_STEP($) {
  with ($) {
    action_inherited();
  }
}

function oCrate_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Crate';
    makeActive();
    setCollisionBounds(-6, 0, 6, 8);

    heavy = true;

    yVel = 0;
    yAcc = 0.2;
  }
}

class oCrate extends oItem {
  // variables
}
