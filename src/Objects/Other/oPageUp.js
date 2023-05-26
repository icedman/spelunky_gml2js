function oPageUp_MOUSE($) {
  with ($) {
    oLoadLevel.page -= 1;
    [instances_of(oMenuSel)].orEach(($) => {
      with ($) {
        sprite_index = sMenuSelOff;
      }
    });
    instance_activate_object(oPageDown);
    if (oLoadLevel.page <= 1) instance_deactivate_object(oPageUp);

    //sprite_index = sOKButtonPressed;

    //sprite_index = sOKButton;
  }
}

function oPageUp_KEYPRESS($) {
  with ($) {
    oLoadLevel.page -= 1;
    [instances_of(oMenuSel)].orEach(($) => {
      with ($) {
        sprite_index = sMenuSelOff;
      }
    });
    instance_activate_object(oPageDown);
    if (oLoadLevel.page <= 1) instance_deactivate_object(oPageUp);
  }
}

class oPageUp extends oObject {
  // variables
}
