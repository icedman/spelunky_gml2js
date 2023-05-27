function oGiantTikiHead_ALARM_0($) {
  with ($) {
    sprite_index = sGTHHole;
    instance_create(x, y, oBoulder);
    playSound(global.sndThump);
  }
}

class oGiantTikiHead extends oDrawnSprite {
  sGTHHole;
  sprite_index = sGiantTikiHead;
  visible = true;
}
ObjType.oGiantTikiHead = oGiantTikiHead;
