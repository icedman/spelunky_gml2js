function oRuby_ALARM_0($) {
  with ($) {
    canCollect = true;
  }
}

function oRuby_CREATE($) {
  with ($) {
    try {
      oTreasure_CREATE($);
    } catch (err) {}

    type = 'Ruby';
    makeActive();
    setCollisionBounds(-2, -2, 2, 2);
    yOff = 2;
    alarm[0] = 20;
    value = 400;
  }
}

class oRuby extends oTreasure {
  sprite_index = sRuby;
  visible = true;
}
ObjType.oRuby = oRuby;
