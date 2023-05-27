function oMattockHit_OTHER($) {
  with ($) {
    hit = false;
    if (collision_point(x, y, oSolid, 0, 0)) {
      obj = instance_place(x, y, oSolid);
      if (!obj.invincible) hit = true;
    } else if (collision_point(x, y + 9, oSolid, 0, 0)) {
      obj = instance_place(x, y + 9, oSolid);
      if (!obj.invincible) hit = true;
    }

    if (hit && !isRoom('rTitle') && !isRoom('rHighscores')) {
      [instances_of(obj)]
        .forEach(($) => {
          with ($) {
            tile = tile_layer_find(3, x, y - 16);
            if (tile) tile_delete(tile);
            tile = tile_layer_find(3, x, y + 16);
            if (tile) tile_delete(tile);

            if (!invincible) instance_destroy();
          }
        })

        [instances_of(oTreasure)].forEach(($) => {
          with ($) {
            state = 1;
          }
        })

        [instances_of(oSpikes)].forEach(($) => {
          with ($) {
            if (!collision_point(x, y + 16, oSolid, 0, 0)) {
              instance_destroy();
            }
          }
        });

      // break mattock
      if (rand(1, 20) == 1 && !global.isTunnelMan) {
        [instances_of(oPlayer1)].forEach(($) => {
          with ($) {
            holdItem = 0;
            pickupItemType = '';
            global.pickupItem = '';
          }
        });

        obj = instance_create(x, y, oMattockHead);
        obj.yVel = -2;
        playSound(global.sndMattockBreak);
        [instances_of(oMattock)].forEach(($) => {
          with ($) {
            if (!visible) instance_destroy();
          }
        });
      } else playSound(global.sndCrunch);
    }

    instance_destroy();
  }
}

function oMattockHit_STEP($) {
  with ($) {
    if (instance_number(oCharacter) == 0) {
      instance_destroy();
    }
    if (sprite_index == sMattockHitR) {
      x = oCharacter.x + 16;
      y = oCharacter.y;
    } else if ((sprite_index = sMattockHitL)) {
      x = oCharacter.x - 16;
      y = oCharacter.y;
    }
  }
}

function oMattockHit_CREATE($) {
  with ($) {
    try {
      oWhip_CREATE($);
    } catch (err) {}

    type = 'Mattock';
    image_speed = 0.5;
    damage = 2;
    puncture = true;
  }
}

class oMattockHit extends oWhip {}
