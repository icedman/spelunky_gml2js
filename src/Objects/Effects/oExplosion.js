function oExplosion_COLLISION_oBarrierEmitter($) {
  with ($) {
    [instances_of(other)].orEach(($) => {
      with ($) {
        instance_destroy();
      }
    });
  }
}

function oExplosion_COLLISION_oBoulder($) {
  with ($) {
    for (i = 0; i < 3; i += 1) {
      rubble = instance_create(
        other.x + rand(0, 15) - rand(0, 15),
        other.y + rand(0, 15) - rand(0, 15),
        oRubble
      );
      rubble.sprite_index = sRubbleTan;
      if (rand(1, 3) == 1)
        instance_create(
          other.x + rand(0, 15) - rand(0, 15),
          other.y + rand(0, 15) - rand(0, 15),
          oRock
        );
    }
    for (i = 0; i < 6; i += 1) {
      rubble = instance_create(
        other.x + rand(0, 15) - rand(0, 15),
        other.y + rand(0, 15) - rand(0, 15),
        oRubbleSmall
      );
      rubble.sprite_index = sRubbleTanSmall;
    }

    [instances_of(other)].orEach(($) => {
      with ($) {
        instance_destroy();
      }
    });
  }
}

function oExplosion_COLLISION_oWeb($) {
  with ($) {
    [instances_of(other)].orEach(($) => {
      with ($) {
        instance_destroy();
      }
    });
  }
}

function oExplosion_COLLISION_oSolid($) {
  with ($) {
    if (
      isLevel('rTutorial') ||
      (x > view_xview[0] - 16 &&
        x < view_xview[0] + view_wview[0] + 16 &&
        y > view_yview[0] - 16 &&
        y < view_yview[0] + view_hview[0] + 16)
    ) {
      [instances_of(other)]
        .forEach(($) => {
          with ($) {
            repeat(2);
            {
              tile = tile_layer_find(3, x + 1, y - 1);
              if (tile) tile_delete(tile);
            }
            tile = tile_layer_find(3, x + 1, y + 16);
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

      //global.checkWater = true;
    }
  }
}

function oExplosion_COLLISION_oItem($) {
  with ($) {
    if (
      other.type == 'Arrow' ||
      other.type == 'Fish Bone' ||
      other.type == 'Jar' ||
      other.type == 'Skull'
    ) {
      [instances_of(other)].orEach(($) => {
        with ($) {
          instance_destroy();
        }
      });
    } else if (other.type == 'Bomb') {
      [instances_of(other)].forEach(($) => {
        with ($) {
          sprite_index = sBombArmed;
          image_speed = 1;
          alarm[1] = rand(4, 8);
          enemyID = 0;
        }
      });

      if (other.y < y) other.yVel = -rand(2, 4);
      if (other.x < x) other.xVel = -rand(2, 4);
      else other.xVel = rand(2, 4);
    } else if (other.type == 'Rope') {
      if (!other.alling) {
        if (other.y < y) other.yVel -= 6;
        else other.yVel += 6;
        if (x > other.x) other.xVel -= rand(4, 6);
        else other.xVel += rand(4, 6);
      }
    } else {
      if (other.y < y) other.yVel -= 6;
      else other.yVel += 6;
      if (x > other.x) other.xVel -= rand(4, 6);
      else other.xVel += rand(4, 6);
    }

    if (other.held) {
      [instances_of(oPlayer1)].forEach(($) => {
        with ($) {
          holdItem = 0;
          pickupItemType = '';
        }
      });

      other.held = false;
    }
  }
}

function oExplosion_OTHER($) {
  with ($) {
    action_kill_object();
  }
}

function oExplosion_COLLISION_oEnemy($) {
  with ($) {
    if (other.type == 'Magma Man') {
      [instances_of(other)].forEach(($) => {
        with ($) {
          flame = instance_create(x + 8, y - 4, oMagma);
          flame.yVel = -rand(1, 3);
          flame = instance_create(x + 8, y - 4, oMagma);
          flame.yVel = -rand(1, 3);
          instance_destroy();
        }
      });
    } else if (!other.invincible) {
      other.hp -= 30;
      if (x < other.x) other.xVel = rand(4, 6);
      else other.xVel = -rand(4, 6);
      other.yVel = -6;
      other.burning = 50;
    }
  }
}

function oExplosion_CREATE($) {
  with ($) {
    action_inherited();

    image_speed = 0.8;

    playSound(global.sndExplosion);
    scrShake(5);
  }
}

function oExplosion_COLLISION_oDamsel($) {
  with ($) {
    if (!other.invincible) {
      other.hp -= 100;
      if (x < other.x) other.xVel = rand(4, 6);
      else other.xVel = -rand(4, 6);
      other.yVel = -6;
      other.burning = 50;
      other.status = 2;
    }
  }
}

class oExplosion extends oDrawnSprite {
  // variables
}
