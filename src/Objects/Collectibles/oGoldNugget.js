function oGoldNugget_ALARM_0($) {
  with ($) {
    canCollect = true;
  }
}

function oGoldNugget_CREATE($) {
  with ($) {
    try {
      oTreasure_CREATE($);
    } catch (err) {}

    type = 'Gold Nugget';
    makeActive();
    setCollisionBounds(-4, -4, 4, 4);
    value = 500;
    canCollect = true;
  }
}

class oGoldNugget extends oTreasure {
  sprite_index = sGoldNugget;
  visible = true;
}
ObjType.oGoldNugget = oGoldNugget;
