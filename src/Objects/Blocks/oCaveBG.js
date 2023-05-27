function oCaveBG_CREATE($) {
  with ($) {
    if (true) {
      switch (rand(1, 2)) {
        case 1: {
          sprite_index = sCaveBG1;
          break;
        }
        case 2: {
          sprite_index = sCaveBG2;
          break;
        }
      }
    }
  }
}

class oCaveBG extends oObject {
  sCaveBG1;
  sCaveBG2;
}
ObjType.oCaveBG = oCaveBG;
