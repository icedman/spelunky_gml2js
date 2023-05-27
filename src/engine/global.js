global = {
  roomPath: [],
  levelDeaths: [],
};

scrClearGlobals();

_arrayIndex = (r, c) => r * 1000 + c;
_with = (o, fn) => {
  instances_of(o).forEach((i) => fn(i));
};
