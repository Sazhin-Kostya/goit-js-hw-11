
import Notiflix from 'notiflix';
import axios from "axios";
//const axios = require('axios').default;

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '38435463-416309d9576d04c5aa9055e45';
let qqq = 1;


const refs = {
    form: document.querySelector('.search-form'),
    input: document.querySelector('input'),
    button: document.querySelector('button'),
    gallery: document.querySelector('.gallery'),
    buttonLoad: document.querySelector('.load-more')
}
 refs.buttonLoad.hidden = true;

refs.button.addEventListener('click', handleSearch);

function handleSearch() {
   
   const data = refs.input.value;
    console.log(data)
    // getSearch(data);
    //  console.log(getSearch())
    getSearch(data)
        .then(response => {
            refs.gallery.insertAdjacentHTML('beforeend', createMarkup(response.data.hits))
            if (data === '' || response.data.hits.length === 0) {
        refs.gallery.innerHTML = '';
        refs.buttonLoad.hidden = true;

        Notiflix.Report.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
        }
        
    );
    refs.buttonLoad.hidden = false;
}


refs.form.addEventListener('submit', handlerform);

function handlerform(evt) {
    evt.preventDefault()
    console.dir(evt.currentTarget)
    refs.gallery.innerHTML = '';
    qqq = 1;
}



async function getSearch(data) {
   const  response =  await axios.get('https://pixabay.com/api/',{
        params: {
            key: '38435463-416309d9576d04c5aa9055e45',
            q: `${data}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            page: 1 ,
       },
    })
    return response;
};




    


function createMarkup(arr) {
    return arr.map(({ previewURL, tags, likes, views, comments, downloads }) => `<div class="photo-card">
  <img src="${previewURL}" alt="${tags}" width="250" loading="lazy " />
  <div class="info">
    <p class="info-item">
    <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views:${views}</b>
    </p>
    <p class="info-item">
      <b>Comments:${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads:${downloads}</b>
    </p>
  </div>
</div>`).join('');
}



refs.buttonLoad.addEventListener('click', loadMoreCards);

function loadMoreCards() {
    qqq += 1;
    async function getSearch(data) {
   const  response =  await axios.get('https://pixabay.com/api/',{
        params: {
            key: '38435463-416309d9576d04c5aa9055e45',
            q: `${data}`,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: true,
            per_page: 50,
            page: `${qqq}` ,
       },
    })
        return response;
        
    };
    
    const data = refs.input.value;
    // console.log(data)
    // getSearch(data);
    //  console.log(getSearch())
    getSearch(data)
        .then(response => {
            console.log(response)
            refs.gallery.insertAdjacentHTML('beforeend', createMarkup(response.data.hits))
            if (response.data.hits.length < response.config.params.per_page) {
               console.log(response.data.hits.length)
               console.log(response.config.params.per_page)
        refs.buttonLoad.hidden = true;
         Notiflix.Report.failure(
          "We're sorry, but you've reached the end of search results."
        );
      }
        });
};