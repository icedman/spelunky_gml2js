function oLampItem_CREATE($) {
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

class oLampItem extends oItem {
  // variables
}