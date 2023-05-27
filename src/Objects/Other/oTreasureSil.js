function oTreasureSil_STEP($) {
  with ($) {
    if (true) {
      x += xVel;
      y += yVel;

      if (xVel < 0) xVel += 0.1;

      if (yVel < 6) {
        yVel += myGrav;
      }

      if (y > 240) room_goto(rEnd3);
    }
  }
}

function oTreasureSil_CREATE($) {
  with ($) {
    xVel = -6;
    yVel = -8;
    myGrav = 0.6;
  }
}

class oTreasureSil extends oDrawnSprite {
  rEnd3;
  sprite_index = sTreasureSil;
  visible = true;
}
ObjType.oTreasureSil = oTreasureSil;
