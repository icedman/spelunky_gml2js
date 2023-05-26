function oAlienShipFloor_DESTROY($) {
  with ($) {
    action_inherited();

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

function oAlienShipFloor_CREATE($) {
  with ($) {
    action_inherited();
  }
}

class oAlienShipFloor extends oSolid {
  // variables
}
