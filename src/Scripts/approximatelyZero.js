function approximatelyZero() {
  /*
Returns whether the argument is between -0.1 and 0.1
*/
  if (arguments[0] > -0.1 && arguments[0] < 0.1) return true;
  else return false;
}
