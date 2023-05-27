function oCrown_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Crown';
    makeActive();
    setCollisionBounds(-6, -6, 6, 8);

    cost = 999999;
    buyMessage = "I SHOULDN'T BE SELLING THIS!";
  }
}

class oCrown extends oItem {
  sprite_index = sCrown;
  visible = true;
}
ObjType.oCrown = oCrown;
