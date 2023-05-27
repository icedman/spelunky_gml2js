function oDrawnSprite_CREATE($) {
  with ($) {
    type = '';
    blinkToggle = 0;
  }
}

class oDrawnSprite extends oObject {
  visible = true;
}
ObjType.oDrawnSprite = oDrawnSprite;
