function oKeyConfigButton_MOUSE($) {
  with ($) {
    if (sprite_index == sKeyConfigButtonPressed) room_goto(rKeyConfig);
    sprite_index = sKeyConfigButton;

    sprite_index = sKeyConfigButtonPressed;

    sprite_index = sKeyConfigButton;
  }
}

class oKeyConfigButton extends oObject {
  rKeyConfig;
  sKeyConfigButton;
  sKeyConfigButtonPressed;
  sprite_index = sKeyConfigButton;
  visible = true;
}
ObjType.oKeyConfigButton = oKeyConfigButton;
