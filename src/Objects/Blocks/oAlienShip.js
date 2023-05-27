function oAlienShip_DESTROY($) {
  with ($) {
    try {
      oSolid_DESTROY($);
    } catch (err) {}

    instance_create(
      x + 8 + rand(0, 8) - rand(0 - 8),
      y + 8 + rand(0, 8) - rand(0 - 8),
      oRubbleDark
    );
    instance_create(
      x + 8 + rand(0, 8) - rand(0 - 8),
      y + 8 + rand(0, 8) - rand(0 - 8),
      oRubbleDarkSmall
    );
    instance_create(
      x + 8 + rand(0, 8) - rand(0 - 8),
      y + 8 + rand(0, 8) - rand(0 - 8),
      oRubbleDarkSmall
    );
  }
}

function oAlienShip_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}
  }
}

class oAlienShip extends oSolid {
  sprite_index = sAlienTop;
  visible = true;
}
ObjType.oAlienShip = oAlienShip;
