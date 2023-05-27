function oMattockHead_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Mattock Head';
    makeActive();
    setCollisionBounds(-6, -4, 6, 4);
  }
}

class oMattockHead extends oItem {}
