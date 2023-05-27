sqr = (n) => Math.sqr(n);
sqrt = (n) => Math.sqrt(n);
ord = (n) => Math.ord(n);
cos = (n) => Math.cos(n);
sin = (n) => Math.sin(n);
tan = (n) => Math.tan(n);
arctan = (n) => Math.arctan(n);
floor = (n) => Math.floor(n);
ceil = (n) => Math.floor(n);
abs = (n) => Math.abs(n);
round = (n) => Math.round(n);
frac = (n) => n - Math.floor(n);
random = (r) => Math.random() * r;
degtorad = (d) => d * 0.017453;
radtodeg = (r) => r * 57.29578;

ord = ()=>{};
real = ()=>{};
float = ()=>{};

// action?
action_color = ()=>{};
action_execute_script = ()=>{};
action_fullscreen = ()=>{};
action_if = ()=>{};
action_kill_object = ()=>{};

// string
string = ()=>{};
string_char_at = ()=>{};
string_delete = ()=>{};
string_length = ()=>{};
string_lower = ()=>{};
string_upper = ()=>{};

// SS
SS_IsSoundPlaying = ()=>{};
SS_LoadSound = ()=>{};
SS_SetSoundPan = ()=>{};
SS_SetSoundVol = ()=>{};
SS_StopSound = ()=>{};
SS_Unload = ()=>{};

// collision
collision_line = ()=>{};
collision_point = ()=>{};
collision_rectangle = ()=>{};
collision_rectangle_obj = ()=>{};

// display
display_get_height = ()=>{};
display_get_width = ()=>{};
distance_to_object = ()=>{};
distance_to_point = ()=>{};

// drawing
draw_circle = ()=>{};
draw_clear = ()=>{};
draw_rectangle = ()=>{};
draw_set_alpha = ()=>{};
draw_set_blend_mode = ()=>{};
draw_set_blend_mode_ext = ()=>{};
draw_set_color = ()=>{};
draw_set_font = ()=>{};
draw_sprite = ()=>{};
draw_sprite_ext = ()=>{};
draw_surface = ()=>{};
draw_surface_stretched = ()=>{};
draw_text = ()=>{};

exec = ()=>{};

file_delete = ()=>{};
file_exists = ()=>{};
file_find_first = ()=>{};
file_find_next = ()=>{};
file_text_close = ()=>{};
file_text_eof = ()=>{};
file_text_open_read = ()=>{};
file_text_open_write = ()=>{};
file_text_read_string = ()=>{};
file_text_readln = ()=>{};
file_text_write_string = ()=>{};
file_text_writeln = ()=>{};

game_end = ()=>{};
highscore_value = ()=>{};

object_instances = [];

instance_activate_all = ()=>{};
instance_activate_object = ()=>{};
instance_activate_region = ()=>{};
instance_create = ()=>{};
instance_deactivate_all = ()=>{};
instance_deactivate_object = ()=>{};
instance_deactivate_region = ()=>{};
instance_destroy = ()=>{};
instance_exists = ()=>{};
instance_nearest = ()=>{};
instance_number = ()=>{};
instance_place = ()=>{};
instance_position = ()=>{};

instances_of = (o)=>{
    if (typeof(o) == 'function') {
        return object_instances.filter((i) =>(i instanceof o))
    }
    return [o]
};

joystick_check_button = ()=>{};
joystick_direction = ()=>{};
joystick_exists = ()=>{};
joystick_has_pov = ()=>{};
joystick_pov = ()=>{};
joystick_zpos = ()=>{};
keyboard_check_pressed = ()=>{};

make_color_rgb = ()=>{};
mouse_check_button = ()=>{};
move_snap = ()=>{};

point_direction = ()=>{};
point_distance = ()=>{};
screen_redraw = ()=>{};
screen_refresh = ()=>{};
sound_play = ()=>{};
split = ()=>{};

surface_create = ()=>{};
surface_exists = ()=>{};
surface_free = ()=>{};
surface_reset_target = ()=>{};
surface_set_target = ()=>{};

tile_delete = ()=>{};
tile_layer_find = ()=>{};
window_set_cursor = ()=>{};
window_set_position = ()=>{};
window_set_showborder = ()=>{};
window_set_size = ()=>{};
