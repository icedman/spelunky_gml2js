function oLoadButton_MOUSE($) {
  with ($) {
    if (sprite_index == sLoadButtonPressed && active) {
      [instances_of(oLoadLevel)].forEach(($) => {
        with ($) {
          global.irstCustomLevel = levelName;
          scrLoadLevel();
        }
      });
    }
    sprite_index = sLoadButton;

    sprite_index = sLoadButtonPressed;

    sprite_index = sLoadButton;
  }
}

function oLoadButton_STEP($) {
  with ($) {
    if (checkStartPressed() || gamepad.attackPressed) {
      [instances_of(oLoadLevel)].forEach(($) => {
        with ($) {
          global.irstCustomLevel = levelName;
          scrLoadLevel();
        }
      });
    }
  }
}

function oLoadButton_CREATE($) {
  with ($) {
    active = true;
  }
}

class oLoadButton extends oObject {
  // variables
}
