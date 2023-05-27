function oCrystalSkull_CREATE($) {
  with ($) {
    try {
      oGoldIdol_CREATE($);
    } catch (err) {}

    type = 'Gold Idol';
    value = 15000;
  }
}

class oCrystalSkull extends oGoldIdol {}
