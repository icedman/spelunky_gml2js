object_instances = [];

instance_activate_all = () => {};
instance_activate_object = () => {};
instance_activate_region = () => {};

instance_create = (x, y, obj) => {
  var instance = new obj();
  instance.x = x;
  instance.y = y;
  object_instances.push(instance);
  instance.onCreate();
  return instance;
};

instance_deactivate_all = () => {};
instance_deactivate_object = () => {};
instance_deactivate_region = () => {};
instance_destroy = () => {};

instance_exists = (o) => {
  return instance_number(o) > 0;
};

instance_nearest = () => {};

instance_number = (o) => {
  return instances_of(o).length;
};

instance_place = () => {};
instance_position = () => {};

instances_of = (o) => {
  if (typeof o == 'function') {
    return object_instances.filter((i) => i instanceof o);
  }
  return [o];
};
