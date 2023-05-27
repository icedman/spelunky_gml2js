function scrMoveableSolidRecurseDrop() {
  var obj;
  obj = instance_place(x, y - 1, oMoveableSolid);
  if (obj) {
    instances_of(obj).forEach(($) => {
      with ($) {
        scrMoveableSolidRecurseDrop();
        y += 0.05;
      }
    });
  }
}
