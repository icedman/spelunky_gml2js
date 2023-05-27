function oBasket_OTHER($) {
  with ($) {
    if ((sprite_index = sBasketSwoosh)) sprite_index = sBasket;
  }
}

class oBasket extends oObject {
  sBasket;
  sprite_index = sBasket;
  visible = true;
}
ObjType.oBasket = oBasket;
