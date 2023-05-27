function oLampRedItem_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Lamp';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    trigger = true;
    heavy = true;
    value = 1000;
  }
}

class oLampRedItem extends oItem {}
ObjType.oLampRedItem = oLampRedItem;
