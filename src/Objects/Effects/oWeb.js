function oWeb_COLLISION_oRubblePiece($) {
  with ($) {
    other.xVel = 0;
    other.yVel = 0;
    other.image_speed = 0;
  }
}

function oWeb_COLLISION_oLaser($) {
  with ($) {
    instance_destroy();
  }
}

function oWeb_COLLISION_oSlash($) {
  with ($) {
    action_kill_object();
  }
}

function oWeb_COLLISION_oItem($) {
  with ($) {
    if (!other.held && other.type != 'Rope') {
      other.xVel = 0;
      other.yVel = 0;
    }
  }
}

function oWeb_STEP($) {
  with ($) {
    image_alpha = life / 12;
    if (dying) life -= 0.02;
    if (life <= 1) instance_destroy();
  }
}

function oWeb_COLLISION_oEnemy($) {
  with ($) {
    if (other.type != 'Spider' && other.type != 'Giant Spider') {
      other.xVel = 0;
      other.yVel = 0;
    }

    if (other.type == 'Magma Man') {
      instance_destroy();
    }

    if (other.type == 'Shopkeeper' && other.hp > 0) {
      other.status = 2;
    }

    if (other.status == other.STUNNED) {
      other.inWeb = true;
    }
  }
}

function oWeb_CREATE($) {
  with ($) {
    life = 12;
    dying = false;
  }
}

function oWeb_COLLISION_oWater($) {
  with ($) {
    instance_destroy();
  }
}

function oWeb_COLLISION_oTreasure($) {
  with ($) {
    other.xVel = 0;
    other.yVel = 0;
  }
}

class oWeb extends oObject {}
ObjType.oWeb = oWeb;
