function oCursObj_STEP($) {
  with ($) {
    if (
      mouse_x > view_xview[0] &&
      mouse_x < view_xview[0] + 320 &&
      mouse_y > view_yview[0] &&
      mouse_y < view_yview[0] + 240
    ) {
      x = mouse_x - 8;
      y = mouse_y - 8;
      move_snap(16, 16);
      if (x < 0) x = 0;
      if (x > room_width - 16) x = room_width - 16;
      if (y < 0) y = 0;
      if (y > room_height - 16) y = room_height - 16;
    }
  }
}

function oCursObj_CREATE($) {
  with ($) {
    image_speed = 0;
  }
}

class oCursObj extends oObject {
  mouse_y;
  sprite_index = sEntrance;
  visible = false;
}
ObjType.oCursObj = oCursObj;
