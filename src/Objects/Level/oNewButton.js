function oNewButton_MOUSE($) {
  with ($) {
    if (sprite_index == sNewButtonPressed) {
      oLevelEditor.status = 10;
      [instances_of(oEditButton)]
        .orEach(($) => {
          with ($) {
            instance_destroy();
          }
        })
        [instances_of(oTestButton)].orEach(($) => {
          with ($) {
            instance_destroy();
          }
        });
      instance_destroy();
    }
    sprite_index = sNewButton;

    sprite_index = sNewButtonPressed;

    sprite_index = sNewButton;
  }
}

function oNewButton_STEP($) {
  with ($) {
    x = view_xview[0] + view_wview[0] - 88;
    if (view_yview[0] == 0) y = view_yview[0] + view_hview[0] - 32;
    else y = view_yview[0] + 16;
  }
}

class oNewButton extends oObject {}
