function oGold_DESTROY($) {
  with ($) {
    for (i = 0; i < 3; i += 1) {
      gold = instance_create(
        x + rand(0, 2) - rand(0, 2),
        y + rand(0, 2) - rand(0, 2),
        oGoldChunk
      );
      gold.xVel = rand(0, 3) - rand(0, 3);
      gold.yVel = rand(3, 6);
    }
  }
}

class oGold extends oDrawnSprite {
  sprite_index = sGold;
  visible = true;
}
ObjType.oGold = oGold;
