function oEditButton_MOUSE($) {
  with ($) {
    if (sprite_index == sEditButtonPressed) {
      oLevelEditor.status = 2;
      instances_of(oNewButton).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
      instances_of(oTestButton).forEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
      instance_destroy();
    }
    sprite_index = sEditButton;

    sprite_index = sEditButtonPressed;

    sprite_index = sEditButton;
  }
}

function oEditButton_STEP($) {
  with ($) {
    x = view_xview[0] + 16;
    if (view_yview[0] == 0) y = view_yview[0] + view_hview[0] - 32;
    else y = view_yview[0] + 16;
  }
}

class oEditButton extends oObject {
  oNewButton;
  sEditButton;
  sEditButtonPressed;
  sprite_index = sEditButton;
  visible = true;
}
ObjType.oEditButton = oEditButton;
