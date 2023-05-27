className = (obj) => {
  if (!obj.className) {
    var cc = obj.constructor.toString().split('\n')[0];
    obj.className = /(class|function) ([a-zA-Z0-9]*)/.exec(cc)[2];
  }
  return obj.className;
};

function null_function() {}

class oObject {
  constructor() {
    className(this);
  }

  onCreate() {
    eval(`try { ${this.className}_CREATE } catch(err) { null_function } `)(
      this
    );
  }

  onStep() {
    eval(`try { ${this.className}_STEP } catch(err) { null_function } `)(this);
  }

  onDestroy() {
    eval(`try { ${this.className}_DESTROY } catch(err) { null_function } `)(
      this
    );
  }
}
