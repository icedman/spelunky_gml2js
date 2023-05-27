function oYellowBall_ALARM_1($) {
  with ($) {
    if (instance_number(oYellowTrail) < 12) instance_create(x, y, oYellowTrail);
    alarm[1] = 4;
  }
}

function oYellowBall_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oYellowBall_COLLISION_oSolid($) {
  with ($) {
    /*
if (not collision_rectangle(x-8, y-8, x+8, y+8, oOlmec, 0, 0))
{
    if (rand(1,2) == 1) n = rand(1,4);
    else n = rand(1,5);
    switch (n)
    {
        case 1: { instance_create(x-8, y-8, oBat); break; }
        case 2: { instance_create(x-8, y-8, oSpider); break; }
        case 3: { instance_create(x-8, y-8, oSnake); break; }
        case 4: { instance_create(x-8, y-8, oFrog); break; }
        case 5: { instance_create(x-8, y-8, oFireFrog); break; }
    }
    instance_destroy();
}
*/
  }
}

function oYellowBall_STEP($) {
  with ($) {
    x += xVel;
    y += yVel;

    if (
      collision_rectangle(x - 8, y - 8, x + 8, y + 8, oSolid, 0, 0) &&
      !collision_rectangle(x - 8, y - 8, x + 8, y + 8, oOlmec, 0, 0)
    ) {
      x -= xVel;
      y -= yVel;
      if (rand(1, 2) == 1) n = rand(1, 4);
      else n = rand(1, 5);
      switch (n) {
        case 1: {
          instance_create(x - 8, y - 8, oBat);
          break;
        }
        case 2: {
          instance_create(x - 8, y - 8, oSpider);
          break;
        }
        case 3: {
          instance_create(x - 8, y - 8, oSnake);
          break;
        }
        case 4: {
          instance_create(x - 8, y - 8, oFrog);
          break;
        }
        case 5: {
          instance_create(x - 8, y - 8, oFireFrog);
          break;
        }
      }
      instance_destroy();
    }

    if (yVel < 6) yVel += 0.15;

    /*if (collision_point(x, y, oDark, 0, 0) or
    collision_point(x, y, oDarkFall, 0, 0) or
    collision_point(x, y, oIce, 0, 0))
{
    instance_destroy();
}*/
  }
}

function oYellowBall_ALARM_0($) {
  with ($) {
    invincible = false;
  }
}

function oYellowBall_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    yVel = -1 * (random(3) + 4);
    xVel = rand(2, 5);
    if (rand(1, 2) == 1) xVel *= -1;
    //invincible = true;
    //alarm[0] = 40;
    alarm[1] = 1;
  }
}

class oYellowBall extends oDrawnSprite {
  oBat;
  oFireFrog;
}
ObjType.oYellowBall = oYellowBall;
