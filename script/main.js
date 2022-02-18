const toggle_btn = document.getElementById('toggle'),
      overlay = document.querySelector('.overlay'),
      features_items = document.querySelectorAll('.features .item'),
      heading = document.querySelectorAll('.frequently .heading'),
      main_overlay = document.querySelector('.main-overlay'),
      top_btn = document.getElementById('up');

function show_menu() {
  const main = document.querySelector('main'),
        nav = document.querySelector('nav'),
        img = nav.querySelector('.brand img'),
        ul = nav.querySelector('ul'),
        btn = nav.querySelector('.toggle-button img');
  if (nav.classList.contains('nav-active')) {
    toggle_btn.ariaExpanded = false;
    main.style.paddingTop = '';
    nav.classList.remove('nav-active');
    img.src = 'images/logo-bookmark.svg';
    btn.src = 'images/icon-hamburger.svg';
    [ul,overlay].forEach(el => el.classList.remove('show'));
  } else {
    toggle_btn.ariaExpanded = true;
    main.style.paddingTop = `${nav.clientHeight}px`;
    nav.classList.add('nav-active');
    img.src = 'images/logo-bookmark-white.svg';
    btn.src = 'images/icon-close.svg';
    [ul,overlay].forEach(el => el.classList.add('show'));
  }
}

toggle_btn.addEventListener('click',show_menu);

overlay.addEventListener('click',show_menu);

function link_run(e) {
  e.preventDefault();
  let value;
  if (this.dataset.id === 'feature') {
    const id = this.getAttribute('href').slice(1),
          element = document.getElementById(id);
    value = element.offsetTop;
  } else value = document.body.scrollHeight;
  if (window.innerWidth <= 576 && this.dataset.place === 'up') show_menu();
  window.scrollTo(0,value);
}

document.querySelectorAll('.link').forEach(el => el.addEventListener('click',link_run));

function features_run(e) {
  const that = e.firstElementChild.textContent,
        features_img = Array.from(document.querySelectorAll('.features img')),
        features_content = Array.from(document.querySelectorAll('.features .content'));
  features_img.find(img => {
    if (that === img.dataset.id) {
      features_img.forEach(img => img.classList.remove('image-active'));
      img.classList.add('image-active');
    }
  });
  features_content.find(el => {
    if (that === el.dataset.id) {
      features_content.forEach(el => el.classList.remove('content-active'));
      el.classList.add('content-active');
    }
  });
};

function features_active(e) {
  features_items.forEach(el => el.classList.remove('active'));
  e.classList.add('active');
}

features_items.forEach(el => el.addEventListener('click',() => {
  features_run(el);
  features_active(el);
}));

heading.forEach(el => el.addEventListener('click',function() {
  const text = this.nextElementSibling,
         i = this.children[1];
  if (text.style.maxHeight) {
    this.ariaExpanded = false;
    main_overlay.classList.remove('show');
    text.style.maxHeight = null;
    i.className = 'fas fa-angle-down';
  } else {
    this.ariaExpanded = true;
    main_overlay.classList.add('show');
    text.style.maxHeight = `${text.scrollHeight}px`;
    i.className = 'fas fa-angle-up';
  }
}));

main_overlay.addEventListener('click',function() {
  const text = document.querySelectorAll('.frequently .item div:last-of-type'),
        i = document.querySelectorAll('.frequently i');
  heading.forEach(el => el.ariaExpanded = false);
  text.forEach(el => el.style.maxHeight = null);
  i.forEach(el => el.className = 'fas fa-angle-down');
  this.classList.remove('show');
});

window.addEventListener('scroll',() => this.scrollY > 1000 ? top_btn.classList.add('up-active') : top_btn.classList.remove('up-active'));

top_btn.addEventListener('click',() => window.scrollTo(0,0));

window.addEventListener('load',() => {
  const loading = document.querySelector('.loading');
  loading.classList.add('loading-active');
  setTimeout(() => loading.classList.add('hidden'),1000);
});