function oCrate_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}
  }
}

function oCrate_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Crate';
    makeActive();
    setCollisionBounds(-6, 0, 6, 8);

    heavy = true;

    yVel = 0;
    yAcc = 0.2;
  }
}

class oCrate extends oItem {
  sprite_index = sCrate;
  visible = true;
}
ObjType.oCrate = oCrate;
