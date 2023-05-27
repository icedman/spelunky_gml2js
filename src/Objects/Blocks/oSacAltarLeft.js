function oSacAltarLeft_DESTROY($) {
  with ($) {
    if (!cleanDeath && !global.cleanSolids) {
      rubble = instance_create(
        x + 8 + rand(0, 8) - rand(0, 8),
        y + 8 + rand(0, 8) - rand(0, 8),
        oRubble
      );
      rubble.sprite_index = sRubbleTan;
      rubble = instance_create(
        x + 8 + rand(0, 8) - rand(0, 8),
        y + 8 + rand(0, 8) - rand(0, 8),
        oRubbleSmall
      );
      rubble.sprite_index = sRubbleTanSmall;
      rubble = instance_create(
        x + 8 + rand(0, 8) - rand(0, 8),
        y + 8 + rand(0, 8) - rand(0, 8),
        oRubbleSmall
      );
      rubble.sprite_index = sRubbleTanSmall;
    }

    if (defile) {
      global.message = 'YOU DARE DEFILE MY ALTAR?';
      global.message2 = 'I WILL PUNISH YOU!';
      global.messageTimer = 200;
      scrShake(10);
      global.avor -= 16;

      if (global.kaliPunish == 0) {
        instances_of(oKaliHead).forEach(($) => {
          with ($) {
            alarm[0] = 1;
          }
        });
      } else if (global.kaliPunish == 1) {
        instance_create(oPlayer1.x, oPlayer1.y, oBall);
        obj = instance_create(oPlayer1.x, oPlayer1.y, oChain);
        obj.linkVal = 1;
        obj = instance_create(oPlayer1.x, oPlayer1.y, oChain);
        obj.linkVal = 2;
        obj = instance_create(oPlayer1.x, oPlayer1.y, oChain);
        obj.linkVal = 3;
        obj = instance_create(oPlayer1.x, oPlayer1.y, oChain);
        obj.linkVal = 4;
      } else {
        if (global.darkLevel && global.ghostExists) {
          instances_of(oKaliHead).forEach(($) => {
            with ($) {
              alarm[0] = 1;
            }
          });
        } else {
          global.darkLevel = true;
          if (!global.ghostExists) {
            if (oPlayer1.x > room_width / 2)
              instance_create(
                float(view_xview[0] + view_wview[0] + 8),
                float(view_yview[0] + floor(view_hview[0] / 2)),
                oGhost
              );
            else
              instance_create(
                float(view_xview[0] - 32),
                float(view_yview[0] + floor(view_hview[0] / 2)),
                oGhost
              );
            global.ghostExists = true;
          }
        }
      }

      global.kaliPunish += 1;

      instances_of(oSacAltarLeft).forEach(($) => {
        with ($) {
          defile = false;
          instance_destroy();
        }
      });
    }
  }
}

function oSacAltarLeft_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 20 &&
      x < view_xview[0] + view_wview[0] + 4 &&
      y > view_yview[0] - 20 &&
      y < view_yview[0] + view_hview[0] + 4
    ) {
      if (!collision_point(x, y + 16, oSolid, 0, 0)) instance_destroy();
    }
  }
}

function oSacAltarLeft_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    defile = true;
    type = 'Altar';
  }
}

class oSacAltarLeft extends oSolid {
  darkLevel;
  defile;
  kaliPunish;
  linkVal;
  oKaliHead;
  sprite_index = sSacAltarLeft;
  visible = true;
}
ObjType.oSacAltarLeft = oSacAltarLeft;
