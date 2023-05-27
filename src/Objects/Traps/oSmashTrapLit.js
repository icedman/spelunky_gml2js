function oSmashTrapLit_DESTROY($) {
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
  }
}

function oSmashTrapLit_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 16 &&
      x < view_xview[0] + view_wview[0] + 16 &&
      y > view_yview[0] - 16 &&
      y < view_yview[0] + view_hview[0] + 16
    ) {
      if (status == IDLE) {
        dist = point_distance(x, y, oCharacter.x, oCharacter.y);
        if (counter > 0) counter -= 1;

        if (dist < 90 && counter < 1) {
          if (
            abs(oCharacter.y - (y + 8)) < 8 &&
            oCharacter.x > x + 8 &&
            !isCollisionRight(2)
          ) {
            status = ATTACK;
            dir = RIGHT;
            xa = 0.5;
          } else if (
            abs(oCharacter.x - (x + 8)) < 8 &&
            oCharacter.y > y + 8 &&
            !isCollisionBottom(2)
          ) {
            status = ATTACK;
            dir = DOWN;
            ya = 0.5;
          } else if (
            abs(oCharacter.y - (y + 8)) < 8 &&
            oCharacter.x < x + 8 &&
            !isCollisionLeft(2)
          ) {
            status = ATTACK;
            dir = LEFT;
            xa = -0.5;
          } else if (
            abs(oCharacter.x - (x + 8)) < 8 &&
            oCharacter.y < y + 8 &&
            !isCollisionTop(2)
          ) {
            status = ATTACK;
            dir = UP;
            ya = -0.5;
          }
        }
      } else if (status == ATTACK) {
        colLeft = false;
        colRight = false;
        colTop = false;
        colBot = false;
        if (isCollisionLeft(1)) colLeft = true;
        if (isCollisionRight(1)) colRight = true;
        if (isCollisionTop(1)) colTop = true;
        if (isCollisionBottom(1)) colBot = true;

        if (abs(xv) < 4) xv += xa;
        if (abs(yv) < 4) yv += ya;
        x += xv;
        y += yv;
        if (dir == RIGHT) {
          if (isCollisionRight(2) && colRight) {
            x -= 2;
            hit = true;
          }
          if (colRight) {
            x -= 1;
            hit = true;
          }
        } else if (dir == DOWN) {
          if (isCollisionBottom(2) && colBot) {
            y -= 2;
            hit = true;
          }
          if (colBot) {
            y -= 1;
            hit = true;
          }
        } else if (dir == LEFT) {
          if (isCollisionLeft(2) && colLeft) {
            x += 2;
            hit = true;
          }
          if (colLeft) {
            x += 1;
            hit = true;
          }
        } else if (dir == UP) {
          if (isCollisionTop(2) && colTop) {
            y += 2;
            hit = true;
          }
          if (colTop) {
            y += 1;
            hit = true;
          }
        }

        if (collision_rectangle(x - 1, y - 1, x + 17, y + 17, oTombLord, 0, 0))
          hit = true;

        if (hit) {
          xv = 0;
          yv = 0;
          xa = 0;
          ya = 0;
        }
        if (hit && !colRight && !colLeft && !colTop && !colBot) {
          status = IDLE;
          hit = false;
          counter = 50;
        }
      } else if ((status = 99)) {
        xv = 0;
        yv = 0;
        xa = 0;
        ya = 0;
        y += 0.05;
        if (collision_point(x, y - 1, oLava, 0, 0)) instance_destroy();
      }

      if (collision_rectangle(x + 1, y + 1, x + 15, y + 15, oLava, 0, 0)) {
        status = 99;
      }
    }
  }
}

function oSmashTrapLit_CREATE($) {
  with ($) {
    try {
      oMovingSolid_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(1, 1, 15, 15);
    invincible = false;
    viscidTop = 1;

    xv = 0;
    yv = 0;
    xa = 0;
    ya = 0;

    xVel = 0;
    yVel = 0;
    xAcc = 0;
    yAcc = 0;

    IDLE = 0;
    ATTACK = 1;
    status = 0;

    hit = false;
    counter = 0;

    dir = rand(0, 3);
    RIGHT = 0;
    DOWN = 1;
    LEFT = 2;
    UP = 3;
  }
}

class oSmashTrapLit extends oMovingSolid {
  ATTACK;
  DOWN;
  UP;
  cleanDeath;
  cleanSolids;
  colBot;
  colLeft;
  colRight;
  colTop;
  dir;
  hit;
  oCharacter;
  oRubble;
  oRubbleSmall;
  oTombLord;
  rubble;
  sRubbleTan;
  sRubbleTanSmall;
  view_hview;
  view_wview;
  xAcc;
  xa;
  xv;
  yAcc;
  ya;
  yv;
  sprite_index = sSmashTrapLit;
  visible = true;
}
ObjType.oSmashTrapLit = oSmashTrapLit;
