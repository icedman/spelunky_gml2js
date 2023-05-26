function oTestButton_MOUSE($) {
  with ($) {
    if (sprite_index == sTestButtonPressed) {
      [instances_of(oLevelEditor)].forEach(($) => {
        with ($) {
          scrTestLevel();
        }
      });

      room_goto(rLoadLevel);
    }
    sprite_index = sTestButton;

    sprite_index = sTestButtonPressed;

    sprite_index = sTestButton;
  }
}

function oTestButton_STEP($) {
  with ($) {
    x = view_xview[0] + view_wview[0] - 48;
    if (view_yview[0] == 0) y = view_yview[0] + view_hview[0] - 32;
    else y = view_yview[0] + 16;
  }
}

class oTestButton extends oObject {
  // variables
}
