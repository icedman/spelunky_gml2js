function oJoyConfigButton_MOUSE($) {
  with ($) {
    if (sprite_index == sJoyConfigButtonPressed) room_goto(rJoyConfig);
    sprite_index = sJoyConfigButton;

    sprite_index = sJoyConfigButtonPressed;

    sprite_index = sJoyConfigButton;
  }
}

class oJoyConfigButton extends oObject {
  rJoyConfig;
  sJoyConfigButton;
  sJoyConfigButtonPressed;
}
ObjType.oJoyConfigButton = oJoyConfigButton;
