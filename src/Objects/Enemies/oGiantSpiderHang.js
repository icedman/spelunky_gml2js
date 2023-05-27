function oGiantSpiderHang_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 32 &&
      x < view_xview[0] + view_wview[0] &&
      y > view_yview[0] - 32 &&
      y < view_yview[0] + view_hview[0]
    ) {
      dist = distance_to_object(oCharacter);
      if (collision_point(x + 16, y + 8, oSolid, 0, 0)) {
        hp = 0;
      }
      if (hp < 1) {
        //repeat(rand(1,3))
        r1 = Math.floor(rand(1, 3));
        for (r = 0; r < r1; r++) {
          n = rand(1, 3);
          switch (n) {
            case 1: {
              gem = instance_create(x + 16, y + 24, oEmeraldBig);
              break;
            }
            case 2: {
              gem = instance_create(x + 16, y + 24, oSapphireBig);
              break;
            }
            case 3: {
              gem = instance_create(x + 16, y + 24, oRubyBig);
              break;
            }
          }
          gem.xVel = rand(0, 3) - rand(0, 3);
          gem.yVel = -2;
        }
        obj = instance_create(x + 16, y + 24, oPaste);
        obj.cost = 0;
        obj.orSale = false;
        scrCreateBlood(x + 16, y + 24, 4);
        if (countsAsKill) {
          if (isRealLevel()) global.enemyKills[3] += 1;
          global.giantspiders += 1;
          global.kills += 1;
        }
        instance_destroy();
      } else if (
        hp < 10 ||
        !collision_point(x, y - 16, oSolid, 0, 0) ||
        (dist < 90 && oCharacter.y > y && abs(oCharacter.x - (x + 16)) < 8)
      ) {
        spider = instance_create(x, y, oGiantSpider);
        spider.hp = hp;
        instance_destroy();
      }
    }
  }
}

function oGiantSpiderHang_CREATE($) {
  with ($) {
    try {
      oEnemy_CREATE($);
    } catch (err) {}

    makeActive();
    setCollisionBounds(0, 0, 32, 16);
    xVel = 0;
    yVel = 0;
    yDelta = -0.4;
    image_speed = 0.4;

    // stats
    hp = 10;
    invincible = 0;

    // status
    IDLE = 0;
    BOUNCE = 1;
    RECOVER = 2;
    WALK = 3;

    status = 0;
    bounceCounter = 0;

    shakeCounter = 0;
    shakeToggle = 1;

    instance_create(x, y + 16, oWeb);
    instance_create(x + 16, y + 16, oWeb);
  }
}

class oGiantSpiderHang extends oEnemy {
  giantspiders;
  oGiantSpider;
  oPaste;
  oWeb;
  r1;
}
ObjType.oGiantSpiderHang = oGiantSpiderHang;
