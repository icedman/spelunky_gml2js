function oBoulder_COLLISION_oSolid($) {
  with ($) {
    if (true) {
      if (other.invincible || abs(xVel) < 1) {
        xVel = -xVel * 0.5;
      } else {
        if (abs(xVel) < 1 || other.y > y + 13) {
          y -= 1;
          // nothing
        } else {
          [instances_of(other)].forEach(($) => {
            with ($) {
              tile = tile_layer_find(3, x, y - 16);
              if (tile) tile_delete(tile);
              tile = instance_position(x + 8, y - 1, oSpikes);
              if (tile) {
                [instances_of(tile)].orEach(($) => {
                  with ($) {
                    instance_destroy();
                  }
                });
              }
              instance_destroy();
            }
          });

          playSound(global.sndCrunch);
        }
        if (xVel > 0) xVel -= 0.1;
        else if (xVel < 0) xVel += 0.1;
        if (abs(xVel) < 1) xVel = 0;
      }
    }
  }
}

function oBoulder_STEP($) {
  with ($) {
    try {
      oMovingSolid_STEP($);
    } catch (err) {}

    if (true) {
      colLeft = false;
      colRight = false;
      moveTo(xVel, yVel);
      //x += xVel;
      //y += yVel;

      if (yVel < 8) {
        yVel += myGrav;
      }

      if (x - 17 <= 16 && xVel < 0) {
        x += 1;
        xVel = -xVel;
      }

      if (x + 17 >= 656 && xVel > 0) {
        x -= 1;
        xVel = -xVel;
      }

      if (isCollisionTop(1) && yVel < 0) {
        yVel = -yVel * 0.8;
      }

      if (isCollisionBottom(1)) {
        // bounce
        if (yVel > 3) yVel = -yVel * 0.3;
        else yVel = 0;

        // friction
        if (abs(xVel) != 0) xVel *= 0.99;

        if (!bounced && xVel == 0) {
          if (oPlayer1.x < x) {
            xVel = -4.5;
          } else {
            xVel = 4.5;
          }
          bounced = true;
        }

        if (abs(xVel) < 0.5) xVel = 0;
      }

      if (!collision_point(x, y + 16, oSolid, 0, 0)) {
        colLeft = collision_rectangle(
          x - 16,
          y - 16,
          x - 8,
          y + 16,
          oSolid,
          false,
          true
        );
        colRight = collision_rectangle(
          x + 8,
          y - 16,
          x + 16,
          y + 16,
          oSolid,
          false,
          true
        );
        if (colLeft && !colRight) x += 1;
        else if (colRight && !colLeft) x -= 1;
      }

      image_speed = abs(xVel) / 5;

      if (xVel < 0) {
        sprite_index = sBoulderRotateL;
      } else if (xVel > 0) {
        sprite_index = sBoulderRotateR;
      } else {
        sprite_index = sBoulder;
      }

      /*
    if (xVel == 0 and yVel == 0)
    {
        instance_create(x, y, oBoulderStatic);
        instance_destroy();
    }
    */
    }
  }
}

function oBoulder_CREATE($) {
  with ($) {
    try {
      oMovingSolid_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(-14, -16, 14, 16);
    myGrav = 0.6;
    dir = 0;
    LEFT = 100;
    RIGHT = 101;
    invincible = true;
    bounced = false;
    viscidTop = 1;
  }
}

class oBoulder extends oMovingSolid {}
