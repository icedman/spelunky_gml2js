function oWebBall_ALARM_1($) {
  with ($) {
    if (instance_number(oYellowTrail) < 12) instance_create(x, y, oYellowTrail);
    alarm[1] = 4;
  }
}

function oWebBall_COLLISION_oWeb($) {
  with ($) {
    sprite_index = sWebCreate;
    xVel = 0;
    yVel = 0;
  }
}

function oWebBall_OTHER($) {
  with ($) {
    action_kill_object();

    if (sprite_index == sWebCreate) {
      obj = instance_create(x - 8, y - 8, oWeb);
      obj.dying = true;
      instance_destroy();
    }
  }
}

function oWebBall_COLLISION_oSolid($) {
  with ($) {
    sprite_index = sWebCreate;
    xVel = 0;
    yVel = 0;
  }
}

function oWebBall_COLLISION_oItem($) {
  with ($) {
    sprite_index = sWebCreate;
    xVel = 0;
    yVel = 0;
  }
}

function oWebBall_STEP($) {
  with ($) {
    x += xVel;
    y += yVel;

    if (yVel < 6) yVel += 0.2;
    // if (yVel > 0) yVel = 0;

    if (life > 0) life -= 1;
    else {
      sprite_index = sWebCreate;
    }

    /*if (collision_point(x, y, oDark, 0, 0) or
    collision_point(x, y, oDarkFall, 0, 0) or
    collision_point(x, y, oIce, 0, 0))
{
    instance_destroy();
}*/
  }
}

function oWebBall_ALARM_0($) {
  with ($) {
    invincible = false;
  }
}

function oWebBall_COLLISION_oEnemy($) {
  with ($) {
    if (other.type != 'Giant Spider') {
      sprite_index = sWebCreate;
      xVel = 0;
      yVel = 0;
    }
  }
}

function oWebBall_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    yVel = -1 * (random(3) + 1);
    xVel = rand(1, 3);
    if (rand(1, 2) == 1) xVel *= -1;
    life = rand(20, 100);
    invincible = true;
    //alarm[0] = 40;
    //alarm[1] = 1;
  }
}

function oWebBall_COLLISION_oWater($) {
  with ($) {
    sprite_index = sWebCreate;
    xVel = 0;
    yVel = 0;
  }
}

class oWebBall extends oDrawnSprite {}
