$(function () {
  $('.open-popup').magnificPopup({
    type: 'inline',
    removalDelay: 500, //delay removal by X to allow out-animation
    callbacks: {
      beforeOpen: function () {
        this.st.mainClass = this.st.el.attr('data-effect');
      },
    },
    midClick: true, // allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source.
  });
  $('[data-popup="close"]').on('click', (e) => {
    $('.open-popup').magnificPopup('close');
    e.preventDefault();
  });
  $('.user-popup__info-input').focusin(function () {
    $(this).siblings('svg').children('path').css({
      fill: '#000',
      transition: '.3s',
    });
  });
  $('.user-popup__info-input').focusout(function () {
    $(this).siblings('svg').children('path').css({
      fill: '#ccc',
      transition: '.3s',
    });
  });
  if ($('[data-popup="form-up"]').length && $('[data-popup="form-in"]')) {
    $('[data-popup="form-up"]').validate({
      errorClass: 'invalid-field',
      rules: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 5,
        },
        name: {
          required: true,
          minlength: 2,
        },
        sname: {
          required: true,
          minlength: 2,
        },
      },
      messages: {
        password: {
          required: `<p class="input-error">Введите пароль</p>`,
          minlength: jQuery.validator.format(`<p class="input-error">Минимум {0} символов</p>`),
        },
        name: {
          required: `<p class="input-error">Введите имя</p>`,
          minlength: jQuery.validator.format(`<p class="input-error">Минимум {0} символов</p>`),
        },
        sname: {
          required: `<p class="input-error">Введите фамилию</p>`,
          minlength: jQuery.validator.format(`<p class="input-error">Минимум {0} символов</p>`),
        },
        email: {
          required: `<p class="input-error">Введите E-mail</p>`,
          email: `<p class="input-error">Введите корректный E-mail</p>`,
        },
      },
      // the errorPlacement has to take the table layout into account
      errorPlacement: function (error, element) {
        error.appendTo(element.parent().next());
      },
      // specifying a submitHandler prevents the default submit, good for the demo
      submitHandler: function (e) {
        $('.open-popup').magnificPopup('close');
      },
      // set this class to error-labels to indicate valid fields
      success: function (element) {
        element.html(`
          <svg class="input-error-icon" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 1.15481L4.8 11L0 6.36697L1.19642 5.21216L4.8 8.6822L13.8036 0L15 1.15481Z" fill="#22BC5F"/>
          </svg>
        `);
      },
    });
    $('[data-popup="form-in"]').validate({
      errorClass: 'invalid-field',
      rules: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
          minlength: 5,
        },
      },
      messages: {
        password: {
          required: `<p class="input-error">Введите пароль</p>`,
          minlength: jQuery.validator.format(`<p class="input-error">Минимум {0} символов</p>`),
        },
        email: {
          required: `<p class="input-error">Введите E-mail</p>`,
          email: `<p class="input-error">Введите корректный E-mail</p>`,
        },
      },
      // the errorPlacement has to take the table layout into account
      errorPlacement: function (error, element) {
        error.appendTo(element.parent().next());
      },
      // specifying a submitHandler prevents the default submit, good for the demo
      submitHandler: function (e) {
        $('.open-popup').magnificPopup('close');
      },
      // set this class to error-labels to indicate valid fields
      success: function (element) {
        element.html(`
          <svg class="input-error-icon" width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 1.15481L4.8 11L0 6.36697L1.19642 5.21216L4.8 8.6822L13.8036 0L15 1.15481Z" fill="#22BC5F"/>
          </svg>
        `);
      },
    });
  }
  $('[data-button="toSecton"]').on('click', function (e) {
    e.preventDefault();
    const sectionID = $(this).attr('href');

    $('html, body').animate(
      {
        scrollTop: $(sectionID).offset().top - 100,
      },
      {
        duration: 500,
      },
    );
  });
  $('.header-mobile__burger').on('click', function () {
    $(this).toggleClass('open');
    $('.header-mobile__wrapper').toggleClass('open');
  });
  $('.calc__item-select__item.disabled, [data-select="input"]').on('click', function () {
    $(this).parent('[data-select="wrapper"]').children('.calc__item-select__list').slideToggle(400);
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll('[data-button="toSecton"]').forEach(($link) => {
          $link.classList.toggle(
            'active',
            $link.getAttribute('href').replace('#', '') === entry.target.id,
          );
        });
      }
    });
  },
  {
    threshold: 0.25,
  },
);

document.querySelectorAll('.section').forEach(($s) => observer.observe($s));

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
