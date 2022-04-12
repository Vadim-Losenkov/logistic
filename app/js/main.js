$(function () {
  // $('.calc__item-select').niceSelect();
  $('.header-mobile__burger').on('click', function () {
    $(this).toggleClass('open');
    $('.header-mobile__wrapper').toggleClass('open');
  });
  $('.calc__item-select__item.disabled, [data-select="input"]').on('click', function () {
    $(this).parent('[data-select="wrapper"]').children('.calc__item-select__list').slideToggle(400);
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log(entry);
    }
  })
}, {
  threshold: 0.7
})

document.querySelectorAll('.section').forEach($s => observer.observe($s))

class Select {
  constructor(wrapper, settings = {}) {
    this.$wrapper = document.querySelectorAll(wrapper || '[data-select="wrapper"]');
    this.settings = settings;
    this.selectors = {
      input: '[data-select="input"]',
      item: '[data-select="item"]',
      wrapper: wrapper || '[data-select="wrapper"]',
    };

    this.init();
  }

  init() {
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
      this.$wrapper.forEach(($w) => {
        $w.addEventListener('click', listener);
      });
    } else {
      this.$wrapper.forEach(($w) => {
        $w.removeEventListener('click', listener);
      });
    }
  }

  openMenu() {}
  setItem($el) {
    console.log($el);
    this.$input = $el.closest(this.selectors.wrapper).querySelector(this.selectors.input);
    if (this.$input) {
      this.$input.innerHTML = '';
      this.$input.insertAdjacentHTML('beforeend', $el.outerHTML);

      this.$input.querySelector('[data-select="item"]').classList.add('active');
      this.$input.querySelector('[data-select="item"]').classList.remove('disabled');

      console.log($(this.$input).siblings('.calc__item-select__list').slideToggle(250));
    }
  }
}

new Select('.calc__item-select', {});
