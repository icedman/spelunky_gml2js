function oSpiderHang_STEP($) {
  with ($) {
    if (
      x > view_xview[0] - 20 &&
      x < view_xview[0] + view_wview[0] + 4 &&
      y > view_yview[0] - 20 &&
      y < view_yview[0] + view_hview[0] + 4
    ) {
      dist = distance_to_object(oCharacter);
      if (collision_point(x + 8, y + 4, oSolid, 0, 0)) {
        hp = 0;
      }
      if (hp < 1) {
        scrCreateBlood(x + 8, y + 8, 3);
        if (isRealLevel()) global.enemyKills[2] += 1;
        global.spiders += 1;
        global.kills += 1;
        instance_destroy();
      } else if (
        !collision_point(x, y - 16, oSolid, 0, 0) ||
        (dist < 90 && oCharacter.y > y && abs(oCharacter.x - (x + 8)) < 8)
      ) {
        spider = instance_create(x, y, oSpider);
        spider.hp = hp;
        instance_destroy();
      }
    }
  }
}

function oSpiderHang_CREATE($) {
  with ($) {
    action_inherited();

    makeActive();
    setCollisionBounds(4, 0, 12, 12);
    xVel = 0;
    yVel = 0;
    yDelta = -0.4;
    image_speed = 0.4;

    // stats
    hp = 1;
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
  }
}

class oSpiderHang extends oEnemy {
  // variables
}
