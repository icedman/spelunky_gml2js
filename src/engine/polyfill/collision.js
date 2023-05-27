collision_line = () => {};

// xpos, ypos, oSolid, 0, 0
collision_point = (x, y, obj, precise, notme) => {
  let res;
  _with(obj, ($) => {
    if ($.x > x && x < $.x + 16 && $.y > y && y < $.y + 16) {
      res = $;
    }
  });
  return res;
};

collision_rectangle = () => {};
collision_rectangle_obj = () => {};
