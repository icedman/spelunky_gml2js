function oDrip_CREATE($) {
  with ($) {
    try {
      oRubblePiece_CREATE($);
    } catch (err) {}

    type = 'Drip';
  }
}

class oDrip extends oRubblePiece {
  sprite_index = sDrip;
  visible = true;
}
ObjType.oDrip = oDrip;
