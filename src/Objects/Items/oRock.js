function oRock_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Rock';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
  }
}

class oRock extends oItem {}
ObjType.oRock = oRock;
