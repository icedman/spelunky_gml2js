function oOKButton_MOUSE($) {
  with ($) {
    if (sprite_index == sOKButtonPressed) {
      oInit.startGame = true;
      room_goto_next();
    }
    sprite_index = sOKButton;

    sprite_index = sOKButtonPressed;

    sprite_index = sOKButton;
  }
}

class oOKButton extends oObject {
  oInit;
  sOKButton;
  sOKButtonPressed;
  startGame;
  sprite_index = sOKButton;
  visible = true;
}
ObjType.oOKButton = oOKButton;
