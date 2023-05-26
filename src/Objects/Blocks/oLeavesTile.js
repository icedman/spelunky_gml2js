function oLeavesTile_STEP($) {
  with ($) {
    /*
if (x &gt; view_xview[0]-16 and x &lt; view_xview[0] + view_wview[0]+16 and
        y &gt; view_yview[0]-16 and y &lt; view_yview[0] + view_hview[0]+16)
{
if (not collision_point(x-16, y, oTreeTile, 0, 0) and not collision_point(x+16, y, oTreeTile, 0, 0))
{
    instance_destroy();
}
}
*/
  }
}

function oLeavesTile_CREATE($) {
  with ($) {
    type = 'Tree Leaves';
    if (collision_point(x - 16, y, oTree, 0, 0)) {
      sprite_index = sLeavesRight;
    }
  }
}

class oLeavesTile extends oPlatform {
  // variables
}
