function oRubbleDarkSmall_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

class oRubbleDarkSmall extends oRubblePiece {
  sprite_index = sRubbleDarkSmall;
  visible = true;
}
ObjType.oRubbleDarkSmall = oRubbleDarkSmall;
