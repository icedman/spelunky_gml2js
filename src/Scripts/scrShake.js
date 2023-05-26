//
// scrShake(duration)
//
// Shake the screen.
//

if (global.shake < arguments[0]) global.shake = arguments[0];
if (global.shake < 0) global.shake = 0;
global.xview = view_xview;
global.yview = view_yview;
