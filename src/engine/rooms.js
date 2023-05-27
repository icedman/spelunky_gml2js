room_get_name = () => {
  if (!room) return '?';
  return room['name'];
};

room_goto = (r) => {
  room = r;
  room['instances'].forEach((i) => {
    instance_create(i.x, i.y, i.obj);
  });
};

room_goto_next = () => {};

room_restart = () => {};

room_set_view = () => {};
