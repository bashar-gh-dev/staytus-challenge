export class State {
  constructor() {}

  actions = {};
  subscriptions = [];

  subscribe(action, cb) {
    this.subscriptions[action] = [
      ...(this.subscriptions[action] ?? []),
      function (data) {
        cb(data);
      },
    ];
  }

  dispatch(action, data) {
    if (typeof this[action] === "function") {
      this[action](data);
      this.subscriptions[action].forEach((subscription) => {
        subscription(data);
      });
    }
  }
}
