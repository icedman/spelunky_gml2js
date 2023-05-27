function oKaliHead_ALARM_0($) {
  with ($) {
    sprite_index = sGTHHole;
    for (r = 0; r < c; r++) {
      obj = instance_create(x, y, oSpider);
      obj.xVel = rand(0, 3) - rand(0, 3);
      obj.yVel = -rand(1, 3);
    }
    playSound(global.sndThump);
  }
}

function oKaliHead_CREATE($) {
  with ($) {
    switch (rand(1, 3)) {
      case 1: {
        sprite_index = sKaliHead1;
        break;
      }
      case 2: {
        sprite_index = sKaliHead2;
        break;
      }
      case 3: {
        sprite_index = sKaliHead3;
        break;
      }
    }
  }
}

class oKaliHead extends oDrawnSprite {
  sKaliHead1;
  sKaliHead2;
  sKaliHead3;
}
ObjType.oKaliHead = oKaliHead;
