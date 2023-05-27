function isInShop() {
  //
  // isInShop(x, y)
  //
  // Is this point (x, y) in a shop?
  //

  tx = arguments[0];
  ty = arguments[1];

  if (
    global.roomPath[_arrayIndex(scrGetRoomX(tx), scrGetRoomY(ty))] == 4 ||
    global.roomPath[_arrayIndex(scrGetRoomX(tx), scrGetRoomY(ty))] == 5
  )
    return true;

  return false;
}
