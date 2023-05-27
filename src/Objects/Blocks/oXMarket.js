function oXMarket_CREATE($) {
  with ($) {
    try {
      oExit_CREATE($);
    } catch (err) {}

    type = 'Market Exit';
  }
}

class oXMarket extends oExit {}
ObjType.oXMarket = oXMarket;
