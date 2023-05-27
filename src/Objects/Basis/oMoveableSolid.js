function oMoveableSolid_CREATE($) {
  with ($) {
    try {
      oSolid_CREATE($);
    } catch (err) {}

    xVel = 0;
    yVel = 0;
    myGrav = 0.6;
  }
}

class oMoveableSolid extends oSolid {
  visible = true;
}
ObjType.oMoveableSolid = oMoveableSolid;
