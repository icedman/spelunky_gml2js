function oAlienBossTile_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    type = 'Alien Boss';
  }
}

class oAlienBossTile extends oDrawnSprite {
  sprite_index = sAlienBossTile;
  visible = true;
}
ObjType.oAlienBossTile = oAlienBossTile;
