object_instances = [];

instance_activate_all = () => {};
instance_activate_object = () => {};
instance_activate_region = () => {};
instance_create = () => {
  console.log(arguments);
};
instance_deactivate_all = () => {};
instance_deactivate_object = () => {};
instance_deactivate_region = () => {};
instance_destroy = () => {};
instance_exists = () => {};
instance_nearest = () => {};
instance_number = () => {};
instance_place = () => {};
instance_position = () => {};

instances_of = (o) => {
  if (typeof o == 'function') {
    return object_instances.filter((i) => i instanceof o);
  }
  return [o];
};
