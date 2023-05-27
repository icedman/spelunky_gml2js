function oPageDown_MOUSE($) {
  with ($) {
    oLoadLevel.page += 1;
    instances_of(oMenuSel).forEach(($) => {
      with ($) {
        sprite_index = sMenuSelOff;
      }
    });
    instance_activate_object(oPageUp);
    if (oLoadLevel.page >= oLoadLevel.numPages)
      instance_deactivate_object(oPageDown);

    //sprite_index = sOKButtonPressed;

    //sprite_index = sOKButton;
  }
}

function oPageDown_KEYPRESS($) {
  with ($) {
    oLoadLevel.page += 1;
    instances_of(oMenuSel).forEach(($) => {
      with ($) {
        sprite_index = sMenuSelOff;
      }
    });
    instance_activate_object(oPageUp);
    if (oLoadLevel.page >= oLoadLevel.numPages)
      instance_deactivate_object(oPageDown);
  }
}

class oPageDown extends oObject {
  numPages;
}
ObjType.oPageDown = oPageDown;
