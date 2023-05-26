function oGiantTikiHead_ALARM($) {
  with ($) {
    sprite_index = sGTHHole;
    instance_create(x, y, oBoulder);
    playSound(global.sndThump);
  }
}

class oGiantTikiHead extends oDrawnSprite {
  // variables
}
