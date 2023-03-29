{
  'use strict';
  
  const select = {
    bookTemplate: '#template-book',
    booksList: '.books-list',
    bookImage: '.book__image',
    form: '.filters',
  };
  const classNames = {
    favorite: 'favorite',
    hidden: 'hidden',
  };
  const templates = {
    books: Handlebars.compile(document.querySelector(select.bookTemplate).innerHTML),
  };
  
  const filters = [];
  function render() {
    for (let book of dataSource.books) {
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = 10 * ratingBgc;
      book.ratingBgc = ratingBgc;
      book.ratingWidth = ratingWidth;
      const generatedHTML = templates.books(book);
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      const booksContainer = document.querySelector(select.booksList);
      booksContainer.appendChild(generatedDOM);
    } 
  }
  render();
  
  const favoriteBooks = [];
  const filters = [];
  
  function initActions() {
    const booksContainer = document.querySelector(select.booksList);
    const booksForm = document.querySelector(select.form);

    booksContainer.addEventListener('dblclick', function(event){
      event.preventDefault();
      const bookId = event.target.offsetParent.getAttribute('data-id');
      if (!favoriteBooks.includes(bookId)) {
        event.target.offsetParent.classList.add(classNames.favorite);
        favoriteBooks.push(bookId);
      } else {
        event.target.offsetParent.classList.remove(classNames.favorite);
        favoriteBooks.pop(bookId);
      } 
    });

    booksForm.addEventListener('click', function(event){
      //event.preventDefault();
      const filter = event.target;
      const checked = filter.checked;  //checked to właściwośc pola typu radio i checkbox
      if (filter.tagName == 'INPUT' && filter.type == 'checkbox' && filter.name == 'filter') {
        if (checked) {
          filters.push(filter.value);
        } else if (!checked) {
          filters.pop(filter.value);
        }
      }
      filterBooks();
    });
  }
  
  
  initActions();
  function filterBooks() {
    for (let book of dataSource.books) {
      let hidden = false;
      const selected = document.querySelector('.book__image[data-id="' + book.id + '"]');

      for (const filter of filters) {
        if (!book.details[filter]) {
          hidden = true;
          break;
        }
      }
      if (hidden == true) {
        selected.classList.add(classNames.hidden);
      } else {
        selected.classList.remove(classNames.hidden);
      }
    }
  }

  function determineRatingBgc(rating) {
    let ratingBgc = '';

    if (rating < 6) ratingBgc = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
    else if (rating > 6 && rating <= 8) ratingBgc = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    else if (rating > 8 && rating <= 9) ratingBgc = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    else if (rating > 9) ratingBgc = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';

    return ratingBgc;
  }
}
  
  