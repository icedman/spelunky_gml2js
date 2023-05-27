function oPaste_CREATE($) {
  with ($) {
    try {
      oItem_CREATE($);
    } catch (err) {}

    type = 'Paste';
    makeActive();
    setCollisionBounds(-6, -2, 6, 6);

    cost = 3000;
    shopDesc = 'BOMB PASTE';
    buyMessage = 'BOMB PASTE FOR $' + string(cost) + '.';
  }
}

class oPaste extends oItem {
  sprite_index = sPaste;
  visible = true;
}
ObjType.oPaste = oPaste;
