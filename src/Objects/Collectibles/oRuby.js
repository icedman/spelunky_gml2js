function oRuby_ALARM($) {
  with ($) {
    canCollect = true;
  }
}

function oRuby_CREATE($) {
  with ($) {
    action_inherited();

    type = 'Ruby';
    makeActive();
    setCollisionBounds(-2, -2, 2, 2);
    yOff = 2;
    alarm[0] = 20;
    value = 400;
  }
}

class oRuby extends oTreasure {
  // variables
}
