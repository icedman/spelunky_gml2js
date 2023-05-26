function oFishBone_ALARM($) {
  with ($) {
    safe = false;
  }
}

function oFishBone_STEP($) {
  with ($) {
    action_inherited();

    if (xVel > 0 && yVel < 0) {
      direction = radtodeg(arctan(-yVel / xVel));
      // direction = 45;
    } else if (xVel < 0 && yVel < 0) {
      direction = 180 - radtodeg(arctan(-yVel / -xVel));
    } else if (xVel > 0 && yVel > 0) {
      direction = radtodeg(arctan(yVel / xVel));
    } else if (xVel < 0 && yVel > 0) {
      direction = 180 + radtodeg(arctan(yVel / -xVel));
    } else if (xVel < 0) direction = 180;
    else direction = 0;

    image_angle = direction;
  }
}

function oFishBone_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Fish Bone';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    myGrav = 0.2;
    safe = false;
  }
}

class oFishBone extends oItem {
  // variables
}
