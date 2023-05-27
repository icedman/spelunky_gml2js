function oLampItem_CREATE($) {
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

class oLampItem extends oItem {
  trigger;
  sprite_index = sLampItem;
  visible = true;
}
ObjType.oLampItem = oLampItem;
