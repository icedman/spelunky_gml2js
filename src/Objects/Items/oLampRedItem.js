function oLampRedItem_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Lamp';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    trigger = true;
    heavy = true;
    value = 1000;
  }
}

class oLampRedItem extends oItem {
  // variables
}
