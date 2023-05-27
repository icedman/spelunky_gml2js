function oLava_DESTROY($) {
  with ($) {
    for (i = 0; i < 3; i += 1) {
      instance_create(x + rand(0, 16), y + rand(0, 16), oLavaDrip);
    }
    if (rand(1, 6) == 1) {
      flame = instance_create(x + 8, y + 8, oFlame);
      flame.yVel = 4;
    }
  }
}

function oLava_STEP($) {
  with ($) {
    dist = 0;
    if (isLevel()) {
      dist = point_distance(x, y, oPlayer1.x, oPlayer1.y);
    }
    if (spurt && dist < 240) {
      if (spurtCounter > 0) spurtCounter -= 1;
      else {
        spurtCounter = spurtTime;
        if (rand(1, 8) == 1) flame = instance_create(x + 8, y - 4, oMagma);
        else flame = instance_create(x + 8, y - 4, oFlame);
        flame.yVel = -rand(1, 4);
      }
    }
  }
}

function oLava_CREATE($) {
  with ($) {
    type = 'Lava';
    spurt = false;
    spurtTime = rand(100, 300);
    spurtCounter = spurtTime;

    image_speed = 0.4;
  }
}

class oLava extends oWater {
  spurt;
  spurtCounter;
  spurtTime;
}
