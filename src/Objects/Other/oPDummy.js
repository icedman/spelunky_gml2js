function oPDummy_ALARM_3($) {
  with ($) {
    instance_create(oEndPlat.x, oEndPlat.y + 30, oLavaSpray);
    global.shake = 9999;
    alarm[4] = 10;
  }
}

function oPDummy_ALARM_1($) {
  with ($) {
    oBigChest.sprite_index = sBigChestOpen;
    treasure = instance_create(oBigChest.x, oBigChest.y, oBigTreasure);
    treasure.yVel = -4;
    treasure.xVel = -3;
    playSound(global.sndClick);
    alarm[2] = 20;
  }
}

function oPDummy_ALARM_5($) {
  with ($) {
    status = TRANSITION;
    if (global.isDamsel) sprite_index = sDamselRunL;
    else if (global.isTunnelMan) sprite_index = sTunnelRunL;
    else sprite_index = sRunLeft;
  }
}

function oPDummy_ALARM_4($) {
  with ($) {
    if (oLavaSpray) oLavaSpray.yAcc = -0.1;
  }
}

function oPDummy_ALARM_2($) {
  with ($) {
    status = LAVA;
  }
}

function oPDummy_DRAW($) {
  with ($) {
    if (facing == RIGHT) image_xscale = -1;
    else image_xscale = 1;

    if (
      (sprite_index == sPExit ||
        sprite_index == sDamselExit ||
        sprite_index == sTunnelExit) &&
      global.hasJetpack
    ) {
      draw_sprite_ext(
        sprite_index,
        -1,
        x,
        y,
        image_xscale,
        image_yscale,
        image_angle,
        image_blend,
        image_alpha
      );
      draw_sprite(sJetpackBack, -1, x, y);
    } else if (
      sprite_index == sPExit ||
      sprite_index == sDamselExit ||
      sprite_index == sTunnelExit
    ) {
      draw_sprite_ext(
        sprite_index,
        -1,
        x,
        y,
        image_xscale,
        image_yscale,
        image_angle,
        image_blend,
        image_alpha
      );
    } else if (global.hasJetpack) {
      draw_sprite(sJetpackRight, -1, x - 4, y - 1);
    }

    if (
      sprite_index != sPExit &&
      sprite_index != sDamselExit &&
      sprite_index != sTunnelExit
    ) {
      draw_sprite_ext(
        sprite_index,
        -1,
        x,
        y,
        image_xscale,
        image_yscale,
        image_angle,
        image_blend,
        image_alpha
      );
      if (global.pickupItem == 'Rock')
        holdItem = draw_sprite(sRock, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Jar')
        holdItem = draw_sprite(sJar, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Skull')
        holdItem = draw_sprite(sSkull, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Fish Bone')
        holdItem = draw_sprite(sFishBone, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Arrow')
        holdItem = draw_sprite(sArrowRight, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Rock')
        holdItem = draw_sprite(sRock, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Machete')
        holdItem = draw_sprite(sMacheteRight, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Mattock')
        holdItem = draw_sprite(sMattockRight, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Mattock Head')
        holdItem = draw_sprite(sMattockHead, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Pistol')
        holdItem = draw_sprite(sPistolRight, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Web Cannon')
        holdItem = draw_sprite(sWebCannonR, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Teleporter')
        holdItem = draw_sprite(sTeleporter, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Shotgun')
        holdItem = draw_sprite(sShotgunRight, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Bow')
        holdItem = draw_sprite(sBowRight, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Flare')
        holdItem = draw_sprite(sFlare, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Sceptre')
        holdItem = draw_sprite(sSceptreRight, -1, x + 4, y + 2);
      else if (global.pickupItem == 'Key')
        holdItem = draw_sprite(sKeyRight, -1, x + 4, y + 2);
    }
  }
}

function oPDummy_OTHER($) {
  with ($) {
    if (
      sprite_index == sPExit ||
      sprite_index == sDamselExit ||
      sprite_index == sTunnelExit
    ) {
      instance_destroy();
    }
    /*
if (false and sprite_index == sPExit)
{
    global.gameStart = true;
    if (global.levelType == 2) room_goto(rLevel2);
    else if (global.currLevel == 2) room_goto(rOlmec);
    else room_goto(rLevel);
}
*/
  }
}

function oPDummy_STEP($) {
  with ($) {
    y += yVel;

    if (status != STOPPED && collision_point(x + 8, y, oDamselKiss, 0, 0)) {
      person = instance_nearest(x + 8, y, oDamselKiss);
      if (!person.kissed) {
        status = STOPPED;
        xVel = 0;
        yVel = 0;
        if (global.isDamsel) sprite_index = sDamselLeft;
        else if (global.isTunnelMan) sprite_index = sTunnelLeft;
        else sprite_index = sStandLeft;

        instances_of(person).forEach(($) => {
          with ($) {
            if (global.isDamsel) sprite_index = sPKissL;
            else sprite_index = sDamselKissL;
          }
        });

        alarm[5] = 30;
      }
    }

    if (instance_exists(oTunnelMan)) {
      person = instance_nearest(x + 8, y, oTunnelMan);
      if (
        status != STOPPED &&
        collision_point(x + 8, y, oTunnelMan, 0, 0) &&
        person.talk == 0
      ) {
        status = STOPPED;
        xVel = 0;
        yVel = 0;
        if (global.isDamsel) sprite_index = sDamselLeft;
        else if (global.isTunnelMan) sprite_index = sTunnelLeft;
        else sprite_index = sStandLeft;

        instances_of(person).forEach(($) => {
          with ($) {
            talk = 1;
          }
        });
      }
    }

    if (status == TRANSITION) {
      if (x >= 280) {
        if (
          sprite_index != sPExit &&
          sprite_index != sDamselExit &&
          sprite_index != sTunnelExit
        ) {
          playSound(global.sndSteps);
          if (global.isDamsel) sprite_index = sDamselExit;
          else if (global.isTunnelMan) sprite_index = sTunnelExit;
          else sprite_index = sPExit;
        }
      } else x += 2;
    } else if (
      status == END &&
      sprite_index != sStandLeft &&
      sprite_index != sDamselLeft &&
      sprite_index != sTunnelLeft
    ) {
      if (x >= 448 + 8) {
        // stop
        if (global.isDamsel) sprite_index = sDamselLeft;
        else if (global.isTunnelMan) sprite_index = sTunnelLeft;
        else sprite_index = sStandLeft;
        alarm[0] = 20;
      } else x += 2;
    } else if (status == LAVA) {
      alarm[3] = 50;
      status += 1;
    } else if (status == LAVA + 1) {
      instance_create(oEndPlat.x + rand(0, 80), 192 + 32, oBurn);
    }
  }
}

function oPDummy_ALARM_0($) {
  with ($) {
    alarm[1] = 100;
  }
}

function oPDummy_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    // dummy actor for transitions && ending

    TRANSITION = 0;
    START = 1;
    END = 2;
    LAVA = 3;
    STOPPED = 99;
    status = 0;

    yVel = 0;

    if (global.isDamsel) sprite_index = sDamselRunL;
    else if (global.isTunnelMan) sprite_index = sTunnelRunL;
    else sprite_index = sRunLeft;

    LEFT = 0;
    RIGHT = 1;
    facing = RIGHT;
  }
}

class oPDummy extends oDrawnSprite {
  END;
  LAVA;
  START;
  STOPPED;
  oBigChest;
  oBigTreasure;
  oDamselKiss;
  oEndPlat;
  oLavaSpray;
  oTunnelMan;
  person;
  sArrowRight;
  sBigChestOpen;
  sFishBone;
  sFlare;
  sJar;
  sJetpackBack;
  sJetpackRight;
  sMattockHead;
  sRock;
  sSkull;
  sTeleporter;
  sndClick;
  talk;
}
ObjType.oPDummy = oPDummy;
