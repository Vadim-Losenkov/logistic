$(function () {
  // $('.calc__item-select').niceSelect();
});

class Select {
  constructor(wrapper, settings = {}) {
    this.$wrapper = document.querySelector(wrapper || '[data-select="wrapper"]');
    this.settings = settings;
    this.selectors = {
      input: '[data-select="input"]',
      item: '[data-select="item"]',
      wrapper: wrapper || '[data-select="wrapper"]',
    };

    this.init();
  }

  init() {
    this.$input = this.$wrapper.querySelector(this.selectors.input);
    this.addListeners();
  }

  addListeners(removeListeners = false) {
    const listener = (e) => {
      const $item = e.target.closest(this.selectors.item);

      if (e.target.closest(this.selectors.input)) {
        this.openMenu();
      } else if ($item) {
        this.setItem($item);
      }
    };

    if (!removeListeners) {
      this.$wrapper.addEventListener('click', listener);
    } else {
      this.$wrapper.removeEventListener('click', listener);
    }
  }

  openMenu() {}
  setItem($el) {
    $el.childNodes.forEach(($i) => {
      // this.$input.insertAdjacentElement('beforeend', $i);
    });

    for (let i = 0; i < $el.children.length; i++) {
      this.$input.insertAdjacentElement('beforeend', $el.children[i]);
    }

    console.log(this.$input);
    // console.log($el.children.length);
  }
}

new Select('.calc__item-select', {});
