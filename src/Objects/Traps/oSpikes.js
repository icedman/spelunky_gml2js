function oSpikes_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    invincible = false;
  }
}

class oSpikes extends oDrawnSprite {
  sprite_index = sSpikes;
  visible = true;
}
ObjType.oSpikes = oSpikes;
