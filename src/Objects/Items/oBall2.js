function oBall2_STEP($) {
  with ($) {
    try {
      oItem_STEP($);
    } catch (err) {}

    if (instance_exists(oPDummy)) {
      if (distance_to_object(oPDummy) >= 24) {
        x = oPDummy.x - 24;
      }
    }
  }
}

function oBall2_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Ball';
    makeActive();
    setCollisionBounds(-5, -5, 5, 5);
    heavy = true;
    myGrav = 1;
  }
}

class oBall2 extends oItem {
  oPDummy;
}
ObjType.oBall2 = oBall2;
