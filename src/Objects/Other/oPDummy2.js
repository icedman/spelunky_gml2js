function oPDummy2_ALARM_1($) {
  with ($) {
    if (global.isDamsel) sprite_index = sDamselLeft;
    else if (global.isTunnelMan) sprite_index = sTunnelLeft;
    else sprite_index = sStandLeft;
  }
}

function oPDummy2_ALARM_2($) {
  with ($) {
    instances_of(oEnd3).forEach(($) => {
      with ($) {
        drawStatus = 1;
        alarm[1] = 50;
        playMusic(global.musVictory, false);
      }
    });
  }
}

function oPDummy2_DRAW($) {
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

function oPDummy2_STEP($) {
  with ($) {
    x += xVel;
    y += yVel;

    if (status == DROP) {
      if (global.isDamsel) sprite_index = sDamselFallL;
      else if (global.isTunnelMan) sprite_index = sTunnelFallL;
      else sprite_index = sDieLFall;
      yVel = 6;
      if (collision_point(x, y + 9, oDesert2, 0, 0)) {
        yVel = 0;
        status += 1;
        if (global.isDamsel) sprite_index = sDamselStunL;
        else if (global.isTunnelMan) sprite_index = sTunnelStunL;
        else sprite_index = sStunL;
        poof = instance_create(x - 4, y + 6, oPoof);
        instances_of(poof).forEach(($) => {
          with ($) {
            xVel = -0.4;
          }
        });
        poof = instance_create(x + 4, y + 6, oPoof);
        instances_of(poof).forEach(($) => {
          with ($) {
            xVel = 0.4;
          }
        });
        playSound(global.sndThud);
      }
    } else if (status == STUNNED) {
      alarm[0] = 70;
      alarm[1] = 50;
      status = GETUP;
    } else if (status == GETUP) {
      treasure = instance_nearest(x, y, oBigTreasure);
      if (treasure) {
        if (treasure.yVel == 0) {
          yVel = -4;
          status = JUMPING;
        }
      }
    } else if (status == JUMPING) {
      if (global.isDamsel) sprite_index = sDamselDieLR;
      else if (global.isTunnelMan) sprite_index = sTunnelDieLR;
      else sprite_index = sJumpLeft;
      if (yVel < 4) yVel += 0.6;
      if (collision_point(x, y + 6, oDesert2, 0, 0)) {
        yVel = 0;
        status += 1;
        alarm[2] = 50;
        if (global.isDamsel) sprite_index = sDamselLeft;
        else if (global.isTunnelMan) sprite_index = sTunnelLeft;
        else sprite_index = sStandLeft;
        facing = RIGHT;
        instances_of(oMenu).forEach(($) => {
          with ($) {
            visible = true;
          }
        });
      }
    }

    if (collision_point(x, y + 6, oDesert2, 0, 0)) {
      y -= 2;
    }
    if (collision_point(x, y + 7, oDesert2, 0, 0)) {
      y -= 1;
    }
  }
}

function oPDummy2_ALARM_0($) {
  with ($) {
    instance_create(160, -32, oBigTreasure);
    playSound(global.sndTFall);
  }
}

function oPDummy2_CREATE($) {
  with ($) {
    try {
      oDrawnSprite_CREATE($);
    } catch (err) {}

    // dummy actor for ending (falling from volcano)

    DROP = 0;
    STUNNED = 1;
    GETUP = 2;
    JUMPING = 3;
    status = 0;

    xVel = 0;
    yVel = 0;
    myGrav = 0.6;

    LEFT = 0;
    RIGHT = 1;
    facing = LEFT;

    if (global.isDamsel) sprite_index = sDamselRunL;
    else if (global.isTunnelMan) sprite_index = sTunnelRunL;
  }
}

class oPDummy2 extends oDrawnSprite {
  GETUP;
  musVictory;
  oDesert2;
  oEnd3;
  oMenu;
  poof;
  sJumpLeft;
  sndTFall;
}
ObjType.oPDummy2 = oPDummy2;
