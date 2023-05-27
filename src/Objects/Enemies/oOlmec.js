function oOlmec_ALARM_3($) {
  with ($) {
    sprite_index = sOlmec;
    for (i = 0; i < 12; i += 1) {
      debris = instance_create(
        x + rand(0, 64),
        y + 32 + rand(0, 32),
        oOlmecDebris
      );
      debris.xVel = rand(1, 4) - rand(1, 4);
      debris.yVel = -rand(1, 3);
    }
    playSound(global.sndThump);
    alarm[4] = 50;
  }
}

function oOlmec_ALARM_1($) {
  with ($) {
    sprite_index = sOlmecStart2;
    for (i = 0; i < 6; i += 1) {
      debris = instance_create(
        x + 32 + rand(0, 32),
        y + rand(0, 32),
        oOlmecDebris
      );
      debris.xVel = rand(1, 4);
      debris.yVel = -rand(1, 3);
    }
    playSound(global.sndThump);
    [instances_of(oHawkmanWorship)]
      .forEach(($) => {
        with ($) {
          obj = instance_create(x, y, oHawkman);
          [instances_of(obj)].forEach(($) => {
            with ($) {
              status = 98;
              hp = 1;
              xVel = -3;
              yVel = -5;
              counter = 300;
            }
          });

          instance_destroy();
        }
      })

      [instances_of(oCavemanWorship)].forEach(($) => {
        with ($) {
          image_index = 0;
          image_speed = 0;
        }
      });

    alarm[2] = 50;
  }
}

function oOlmec_ALARM_5($) {
  with ($) {
    view_hborder[0] = 128;
    view_vborder[0] = 64;
    view_xview[0] = 0;
    view_object[0] = oPlayer1;
    oPlayer1.active = true;
    status = 0;
    counter = 100;
    playMusic(global.musBoss, true);
    //playSound(global.sndBoss);
  }
}

function oOlmec_ALARM_4($) {
  with ($) {
    toggle = true;
    status = BOUNCE;
    playSound(global.sndBigJump);
    playSound(global.sndAlert);
    alarm[6] = 20;
  }
}

function oOlmec_ALARM_2($) {
  with ($) {
    sprite_index = sOlmecStart3;
    alarm[3] = 50;
    for (i = 0; i < 6; i += 1) {
      debris = instance_create(x + rand(0, 32), y + rand(0, 32), oOlmecDebris);
      debris.xVel = -rand(1, 4);
      debris.yVel = -rand(1, 3);
    }
    playSound(global.sndThump);
  }
}

function oOlmec_STEP($) {
  with ($) {
    try {
      oMovingSolid_STEP($);
    } catch (err) {}

    if (
      carryPlayer ||
      collision_rectangle(x - 1, y, x + 66, y + 62, oPlayer1, 0, 0)
    ) {
      oPlayer1.x += xVel;
      oPlayer1.y += yVel;
    }
    moveTo(xVel, yVel);

    if (yVel < 6) {
      yVel += myGrav;
    }

    if (isCollisionTop(1)) {
      instance_create(x, y - 16, oOlmecSlam);
      y += 1;
      if (yVel < 0) yVel = -yVel * 0.8;
    }

    if (isCollisionLeft(1)) {
      x += 1;
      xVel = 0;
      //if (xVel < 0) xVel = -xVel * 0.8;
    }
    if (isCollisionRight(1)) {
      x -= 1;
      xVel = 0;
      //if (xVel > 0) xVel = -xVel * 0.8;
    }

    if (collision_point(x, y + 64, oLava, 0, 0)) status = DROWNING;

    if (collision_point(x, y - 2, oLava, 0, 0)) {
      global.enemyKills[21] += 1;
      oFinalBoss.olmecDead = true;
      global.kills += 1;
      instance_destroy();
    }

    dist = distance_to_object(oPlayer1) + 32;

    if (collision_rectangle(x, y - 2, x + 64, y + 64, oPlayer1, 0, 0))
      carryPlayer = true;
    else carryPlayer = false;

    if (status == START1) {
      if (view_xview[0] < 176) view_xview[0] += 2;
      else {
        alarm[1] = 100;
        status = START2;
      }

      if (isCollisionBottom(1)) yVel = 0;
    } else if (status == START2) {
      if (isCollisionBottom(1)) yVel = 0;
    } else if (status == IDLE) {
      if (counter > 0) counter -= 1;
      if (counter == 0) status = BOUNCE;

      if (isCollisionBottom(1)) {
        yVel = 0;
      }

      toggle = true;
    } else if (status == CREATE) {
      for (r = 0; r < c; r++) {
        instance_create(
          x + 32 + rand(0, 32) - rand(0, 32),
          y + 14 + rand(0, 32) - rand(0, 32),
          oPsychicCreate2
        );
      }
      instance_create(x + 32, y + 16, oYellowBall);
      instance_create(x + 32, y + 16, oYellowBall);
      instance_create(x + 32, y + 16, oYellowBall);
      playSound(global.sndPsychic);
      status = IDLE;
    } else if (status == RECOVER) {
      if (isCollisionBottom(1)) {
        playSound(global.sndThump);
        status = IDLE;
        xVel = 0;
        yVel = 0;
        counter = rand(40, 100);
      } else {
        if (counter > 1) counter -= 1;
        else if (counter == 1) {
          if (oPlayer1.x < x) xVel = -0.25;
          else if (oPlayer1.x > x + 64) xVel = 0.25;
          else xVel = 0;
          counter -= 1;
        } else {
          if (xVel < 0 && toggle) xVel -= 0.25;
          else if (xVel < 0 && !toggle) xVel += 0.25;
          if (xVel > 0 && toggle) xVel += 0.25;
          else if (xVel > 0 && !toggle) xVel -= 0.25;
          if (xVel <= -2 || xVel >= 2) toggle = !toggle;
        }

        if (
          (!oPlayer1.active && yVel >= 0) ||
          (oPlayer1.y > y && abs(oPlayer1.x - (x + 32)) < 32 && xVel > -1)
        ) {
          status = PREPARE;
          yVel = 0;
          xVel = 0;
          myGrav = 0;
          counter = 20;
        }
      }
    } else if (status == BOUNCE) {
      if (isCollisionBottom(1)) {
        yVel = -4;
      } else {
        counter = 10;
        status = RECOVER;
        playSound(global.sndBigJump);
      }
    } else if (status == PREPARE) {
      if (counter > 0) counter -= 1;
      else {
        yVel = 5;
        myGrav = 0.2;
        status = SLAM;
        slammed = false;
      }
    } else if (status == SLAM) {
      carryPlayer = false;
      if (isCollisionBottom(1)) {
        if (!slammed) {
          instance_create(x, y + 64, oOlmecSlam);
          slammed = true;
          scrShake(5);
        } else {
          if (rand(1, 2) == 1 || !oPlayer1.active) status = IDLE;
          else status = CREATE;
          xVel = 0;
          yVel = 0;
          counter = 60;
          if (!oPlayer1.active) alarm[5] = 50;
        }
      }
    } else if (status == DROWNING) {
      xVel = 0;
      yVel = 0.1;
      myGrav = 0;
      scrShake(10);
      if (!SS_IsSoundPlaying(global.sndFlame)) playSound(global.sndFlame);
    }

    if (isCollisionTop(1)) yVel = 1;
    if (isCollisionLeft(1) || isCollisionRight(1)) {
      xVel = -xVel;
    }

    if (isCollisionSolid()) y -= 2;
  }
}

function oOlmec_CREATE($) {
  with ($) {
    shopWall = false;
    makeActive();
    setCollisionBounds(2, 0, 62, 64);
    xVel = 0;
    yVel = 0;
    yDelta = -0.4;
    myGrav = 0.2;
    invincible = true;
    viscidTop = 1;
    carryPlayer = false;
    image_speed = 0.4;

    LEFT = 0;
    RIGHT = 1;
    facing = rand(0, 1);

    // status
    START2 = -2;
    START1 = -1;
    IDLE = 0;
    BOUNCE = 1;
    RECOVER = 2;
    WALK = 3;
    DROWNING = 4;
    PREPARE = 5;
    SLAM = 6;
    CREATE = 7;
    DEAD = 99;
    status = -1;

    counter = 0;
    bounceCounter = 0;
    slammed = false;

    view_hborder[0] = 0;
    view_vborder[0] = 0;
    view_yview[0] = 400;
    view_object[0] = oOlmec;
  }
}

function oOlmec_ALARM_6($) {
  with ($) {
    [instances_of(oCavemanWorship)].forEach(($) => {
      with ($) {
        obj = instance_create(x, y, oCaveman);
        obj.acing = 1;
        obj.status = 2;
        instance_destroy();
      }
    });
  }
}

class oOlmec extends oMovingSolid {
  CREATE;
  DROWNING;
  PREPARE;
  SLAM;
  START1;
  START2;
  carryPlayer;
  debris;
  slammed;
  toggle;
  view_hborder = [];
  view_object = [];
}
