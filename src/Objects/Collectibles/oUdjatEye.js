function oUdjatEye_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Udjat Eye';
    makeActive();
    setCollisionBounds(-6, -6, 6, 6);

    cost = 0;
    buyMessage = "I SHOULDN'T BE SELLING THIS!";
  }
}

class oUdjatEye extends oItem {}
