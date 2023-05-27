function oRopeBag_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Bomb Bag';
    makeActive();
    setCollisionBounds(-4, -6, 4, 6);
  }
}

class oRopeBag extends oItem {
  sprite_index = sRopeEnd;
  visible = true;
}
ObjType.oRopeBag = oRopeBag;
