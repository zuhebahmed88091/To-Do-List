/* eslint max-classes-per-file: "off" */
/* eslint class-methods-use-this: "off" */
class MockElement {
  addEventListener() {}

  removeEventListener() {}
  // Add other methods and properties as needed
}

class MockDocument {
  createElement(tagName) {
    return new MockElement();
  }

  getElementById(id) {
    const element = new MockElement();
    if (id === 'todo-list') {
      element.id = id;
    }
    return element;
  }
  // Add other methods and properties as needed
}

class MockWindow {
  document = new MockDocument();
  // Add other methods and properties as needed
}

const mockWindow = new MockWindow();

module.exports = mockWindow;