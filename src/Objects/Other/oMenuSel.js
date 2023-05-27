function oMenuSel_MOUSE($) {
  with ($) {
    n = (y - 112) / 8;
    if (n + 1 <= oLoadLevel.numLevels - (oLoadLevel.page - 1) * 10) {
      oLoadLevel.levelName = string_upper(
        oLoadLevel.levelList[(oLoadLevel.page - 1) * 10 + n]
      );
      instances_of(oMenuSel).forEach(($) => {
        with ($) {
          sprite_index = sMenuSelOff;
        }
      });
      sprite_index = sMenuSelOn;
    }
  }
}

class oMenuSel extends oMenu {
  levelList;
  levelName;
  numLevels;
  oLoadLevel;
  oMenuSel;
  page;
  sMenuSelOff;
  sMenuSelOn;
  sprite_index = sMenuSelOff;
  visible = true;
}
ObjType.oMenuSel = oMenuSel;
