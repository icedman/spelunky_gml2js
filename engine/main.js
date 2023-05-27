bgTiki = 0;
bgTikiArms = 0;
bgDiceSign = 0;
bgWanted = 0;

// generate a level
room_goto(rLevel);
instance_create(0, 0, oGame);
instance_create(0, 0, oLevel);

imgIdx = 0;
window.update = () => {
    // update
    _with(oObject, ($) => {
        // $.sprite_index = sSnakeWalkL;
    })
    
    // render
    _with(oObject, ($) => {
        if (!$.sprite_index || !$.visible) return;
        var frame = $.sprite_index.frames[0]
        if (!frame.image) {
            frame.image = ++imgIdx;
            app.loadImage(frame.image, frame.path);
        }
        if (frame.image) {
            app.drawImage(frame.image, 0, 0, $.x, $.y, false, 0, 0, 16, 16);
        }
    })
}