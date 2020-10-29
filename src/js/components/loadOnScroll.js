import refs from '../refs';
import imagesService from '../moviesAPI-service';
import updateMoviesMarkup from '../updateMoviesMarkup';
import lazyLoad from './lazyLoad';
import globalVars from '../globalVars/vars';
import updateMoviesLocalStorage from '../updateMoviesLocalStorage';

const loadOnScroll = () => {
  const options = { rootMargin: '500px' };
  const onEntry = (entries) => {
    entries.forEach((entry) => {
      if (imagesService.totalPages === imagesService.page) {
        intersectionObserver.disconnect();
        console.log('observer disconnected');
      }
      if (entry.isIntersecting) {
        if (globalVars.activeTab === 'homePage') {
          if (globalVars.searchQuery) {
            console.log('running user search fetch');
            imagesService.fetchMovies().then((movies) => {
              globalVars.moviesArr = [...globalVars.moviesArr, ...movies];
              console.log(globalVars.moviesArr);
              updateMoviesMarkup.show(movies);
              lazyLoad();
              // loadOnScroll();
            });
          } else {
            console.log('running populars fetch');
            imagesService.fetchPopularMovies().then((movies) => {
              updateMoviesMarkup.show(movies);
              globalVars.moviesArr = [...globalVars.moviesArr, ...movies];
              console.log(globalVars.moviesArr);
              lazyLoad();
            });
          }
        } else if (globalVars.activeTab === 'watched') {
          //updateMoviesMarkup.show(updateMoviesLocalStorage.getWatchedMovies());
        } else if (globalVars.activeTab === 'queue') {
          //updateMoviesMarkup.show(updateMoviesLocalStorage.getQueueMovies());
        }
      }
    });
  };
  const intersectionObserver = new IntersectionObserver(onEntry, options);
  intersectionObserver.observe(refs.bottom);
};

export default loadOnScroll;
