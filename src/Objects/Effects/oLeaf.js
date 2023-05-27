function oLeaf_CREATE($) {
  with ($) {
    try {
      oRubblePiece_CREATE($);
    } catch (err) {}

    type = 'Leaf';
    yVel = 0.4;
    yAcc = 0.01;
    image_speed = 0.2;
  }
}

class oLeaf extends oRubblePiece {}
ObjType.oLeaf = oLeaf;
