//import videoListGridOptions from "./template";

const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const content = document.getElementById('content');
const videoChosen = document.getElementById('video-chosen');
const chosenTitle = document.getElementById('chosen-title');
const chosenIframe = document.getElementById('chosen-iframe');
const chosenDescription = document.getElementById('chosen-description');
const chosenChannel = document.getElementById('chosen-channel');
const relatedVideos = document.getElementById('related-videos');
const searchResults = document.getElementById('search-results');
const searchResultsDiv = document.getElementById('search-results-div');
const videoList = document.getElementById('video-list');
const itemListImages = document.getElementsByClassName('item-list-image');
const itemListDiv = document.getElementsByClassName('item-list');
const prev = document.getElementById('prev');
const prevBottom = document.getElementById('prev-bottom');
const next = document.getElementById('next');
const nextBottom = document.getElementById('next-bottom');
const page = document.getElementById('page');
const pageBottom = document.getElementById('page-bottom');
const firstPage = document.getElementById('first-page');
const firstPageBottom = document.getElementById('first-page-bottom');
const order = document.getElementById('order');
const timeAfter = document.getElementById('time-after');
const timeBefore = document.getElementById('time-before');
const timeAfterValid = document.getElementById('time-after-valid');
const timeBeforeValid = document.getElementById('time-before-valid');
const videoDefinition = document.getElementById('video-definition');
const sortButton = document.getElementById('sort-button');
const sortingVisibilityArrow = document.getElementById('sorting-visibility-arrow');
const sorting = document.getElementById('sorting');

let chosenVideoId;
let requestType;
let searchResultsResponse;
let relatedVideosResponse;
let searchResultsPageToken;
let relatedVideosPageToken;
let savedPageCounter;

// setting default values
let pageToken = '';
    searchInput.value = '4k';

    content.style.minHeight = window.innerHeight - 210 + 'px';
    searchResults.style.cursor = 'default';
    searchResults.style.color = 'black';
    relatedVideos.style.color = 'grey';
    relatedVideos.style.display = 'none';

let nowDT = new Date();
let minTime = '2005-04-24T00:00';
let maxTime = formatDateTimeToInputValue(nowDT);
    timeBefore.value = maxTime;
    timeBefore.min = timeAfter.value;
    timeBefore.max = maxTime;
    timeAfter.value = minTime;
    timeAfter.min = minTime;
    timeAfter.max = timeBefore.value;

// Search for a specified request
async function search(pageCounter = 1 ) {
  
  let request;
  
  if (searchResults.style.color === 'black') {
    // searching for 'q' string request
    request = gapi.client.youtube.search.list({
      q: searchInput.value,
      part: 'snippet',
      maxResults: '9',
      pageToken: pageToken,
      order: order.value,
      videoDefinition: videoDefinition.value,
      publishedAfter: formatDateTimeForSearch(timeAfter.value),
      publishedBefore: formatDateTimeForSearch(timeBefore.value),
      type: 'video'
    });
    requestType = 'searchResults'
  } else {
    // searching for related videos to chosen one
    request = gapi.client.youtube.search.list({
      part: 'snippet',
      maxResults: '9',
      pageToken: pageToken,
      order: order.value,
      videoDefinition: videoDefinition.value,
      publishedAfter: formatDateTimeForSearch(timeAfter.value),
      publishedBefore: formatDateTimeForSearch(timeBefore.value),
      relatedToVideoId: chosenVideoId,
      type: 'video'
    });
    requestType = 'relatedVideos'
};

// Saved response checking

  if (requestType === 'searchResults' && searchResultsResponse) {
    response = searchResultsResponse;
    workingWithResponse(response)
  } else {
    await request.execute( response => workingWithResponse(response))
  };
   
  if (requestType === 'relatedVideos' && relatedVideosResponse) {
    response = relatedVideosResponse;
    workingWithResponse(response)
  } else {
    await request.execute( response => workingWithResponse(response))
  };
  
  function workingWithResponse(response) {
   
    // request results checking
    if (response.items.length !== 0) {
      page.style.visibility = pageBottom.style.visibility = 'visible';
      videoList.innerHTML = '';
      
      // saving response to local variables
      if (requestType === 'searchResults') {
        searchResultsResponse = response;
      };
      if (requestType === 'relatedVideos') {
        relatedVideosResponse = response;
      };

    } else {
      videoList.innerHTML = `<h3>No results for: "<i>${searchInput.value}</i>"</h3>`;
      page.style.visibility = pageBottom.style.visibility = 'hidden';
    };

    // Page navigating
    if (requestType !== 'relatedVideos') {
      page.style.visibility = pageBottom.style.visibility = 'visible'
    } else {
      page.style.visibility = pageBottom.style.visibility = 'hidden'
    };
    page.innerHTML = pageBottom.innerHTML = 'Page ' + pageCounter;
    
    if (response.nextPageToken) {
      next.style.display = nextBottom.style.display = 'inline';
      next.onclick = nextBottom.onclick = () => {
        if (requestType === 'searchResults') {
          pageCounter++;
          savedPageCounter = pageCounter;
          searchResultsPageToken = response.nextPageToken;
        };
        if (requestType === 'relatedVideos') {
          relatedVideosPageToken = response.nextPageToken;
        };
        pageToken = response.nextPageToken;
        search(pageCounter)
      }
    } else {
      next.style.display = nextBottom.style.display = 'none'
    }

    if (response.prevPageToken) {
      prev.style.display = prevBottom.style.display = 'inline';
      page.style.marginLeft = pageBottom.style.marginLeft = '0';
      prev.onclick = prevBottom.onclick = () => {
        if (requestType === 'searchResults') {
          pageCounter--;
          savedPageCounter = pageCounter;
          searchResultsPageToken = response.prevPageToken;
        };
        if (requestType === 'relatedVideos') {
          relatedVideosPageToken = response.prevPageToken;
        };
        pageToken = response.prevPageToken;
        search(pageCounter)
      }
    } else {
      prev.style.display = prevBottom.style.display = 'none';
      page.style.marginLeft = pageBottom.style.marginLeft = '2.25em'
    };

    if (pageCounter > 1 && requestType !== 'relatedVideos') {
      firstPage.style.display = firstPageBottom.style.display = 'inline';
      firstPage.onclick = firstPageBottom.onclick = () => {
        pageToken = '';
        search()
      };
    } else {
      firstPage.style.display = firstPageBottom.style.display = 'none';
    }

    // Building results grid
    response.items.forEach( item => {
      videoList.innerHTML += videoListGridOptions(
        item.etag,
        item.snippet.thumbnails.medium.url,
        item.snippet.title
      );
    });
    
    if (videoChosen.style.display) {
      sideClassAdd()
    };
    
    // Showing chosen video
    showChosenVideo = (id) => {
      response.items.forEach( item => {
        if (item.etag === '"'+id+'"') {
          relatedVideos.style.display = 'inline';
          chosenVideoId = item.id.videoId;
          chosenTitle.innerHTML = item.snippet.title;
          chosenIframe.src = `https://www.youtube.com/embed/${chosenVideoId}`;
          chosenChannel.innerHTML = `
                      <span>${item.snippet.channelTitle}</span> - Channel`;

          if (chosenDescription.innerHTML !== 'Description') {
            chosenDescription.innerHTML = item.snippet.description;
          };
          // Handling description click
          chosenDescription.onclick = () => {
            if (chosenDescription.innerHTML === 'Description') {
              chosenDescription.style.color = 'black';
              chosenDescription.innerHTML = item.snippet.description;
            } else {
            chosenDescription.innerHTML = 'Description';
            chosenDescription.style.color = 'rgb(100,100,100)';
            }
          };
          // First time video choosing checking
          if (!videoChosen.style.display) {
            sideClassAdd();
            searchResultsDiv.classList.remove('search-results-width');
            searchResultsDiv.classList.add('search-results-width-side');
            videoList.classList.remove('video-list-grid');
            videoList.classList.add('video-list-grid-side');
            searchResults.style.opacity = '0.9';
            setTimeout(() => {videoChosen.style.display = 'block'},200);
            setTimeout(() => {searchResults.style.opacity = '1'},200);
            setTimeout(() => {videoChosen.style.opacity = '1'},200);
            setTimeout(() => {videoChosen.style.filter = 'blur(0)'},300);
          };
          chosenIframe.style.filter = 'blur(5px)';
          setTimeout(() => {chosenIframe.style.filter = 'blur(0)'},300);
          
          if (requestType === 'relatedVideos') {
            search()
          }
        }
      });
    };
  };
};
//-----------------------------------------------

// Preparing connection to Youtube API
function loadClient() {
  gapi.load('client', start);
};

function start() {
  gapi.client.init({
      'apiKey': 'AIzaSyAhnjJNA4H1jwyyNBJUqnwNMJauUSb-cxQ', // 'AIzaSyBWpeOYpvTB5vQAbaQYhY4BG5hGYS_dctk',
      'Access-Control-Allow-Origin': '*'
    }, 
    loadAPIClientInterfaces()
    );
};

function loadAPIClientInterfaces() {
  gapi.client.load('youtube', 'v3', function() {
    search();
  });
}

// Template for video list grid
 videoListGridOptions = (
  itemEtag,
  itemThumbUrl,
  itemTitle
) => {
  return ( 
        `<div
          class="item-list"
          id=${itemEtag}
          onclick="showChosenVideo(this.id)"
        >
          <img
            class="item-list-image"   
            src=${itemThumbUrl}
            alt=${itemTitle}
          >
          <h5
            class="item-title"
            id="item-title"
          >
            ${itemTitle}
          </h5>
        </div>
        `)
};

// Formatting date and time
function formatDateTimeToInputValue (dateTime) {
  let yyyy = dateTime.getFullYear();
  let mm;
  if (dateTime.getMonth() + 1 > 9) {
    mm = dateTime.getMonth() + 1
  } else {
    let mmCount = dateTime.getMonth() + 1;
    mm = '0' + mmCount;
  } 
  let dd = (dateTime.getDate() > 9) ? 
            dateTime.getDate() :
            ('0' + dateTime.getDate());
  let hh = (dateTime.getHours() > 9) ? 
            dateTime.getHours() : 
            ('0' + dateTime.getHours());
  let min = (dateTime.getMinutes() > 9) ? 
            dateTime.getMinutes() : 
            ('0' + dateTime.getMinutes());

  return yyyy + '-' + mm + '-' + dd + 'T' + hh + ':' + min
};

formatDateTimeForSearch = (inputDateTime) => {
  return '' + inputDateTime + ':00Z'
}

// Handling search actions
// And validation
searchSort = () => {
  if (!timeAfter.value) {
      timeAfterValid.style.display = 'none';
      timeBeforeValid.style.display = 'none';
      timeAfter.value = minTime;
  } else {
    if (timeAfter.value > timeBefore.value) {
      timeAfter.value = minTime;
      timeBeforeValid.style.display = 'inline';
      timeAfterValid.style.display = 'inline';
    } else {
      timeBeforeValid.style.display = 'none';
      timeAfterValid.style.display = 'none';
    }
  };
  if (!timeBefore.value) {
      timeBefore.value = maxTime;
  };

  search()
}

searchInput.onkeyup = (e) => {
  if (e.key === 'Enter') {
    activateSearchResults();
    searchSort()
  }
}

searchButton.onclick = 
  sortButton.onclick = () => {
    activateSearchResults();
    searchSort();
}

// Handling video list toggling
searchResults.onclick = () => {
  if (searchResults.style.color === 'grey') {
    pageToken = searchResultsPageToken;
    activateSearchResults();
    search(savedPageCounter)
  }
};

relatedVideos.onclick = () => {
  if (relatedVideos.style.color === 'grey') {
    pageToken = relatedVideosPageToken;
    activateRelatedVideos();
    search()
  }
};

activateSearchResults = () => {
  searchResults.style.color = 'black';
  searchResults.style.cursor = 'default';
  relatedVideos.style.color = 'grey';
  relatedVideos.style.cursor = 'pointer';
};

activateRelatedVideos = () => {
  searchResults.style.color = 'grey';
  searchResults.style.cursor = 'pointer';
  relatedVideos.style.color = 'black';
  relatedVideos.style.cursor = 'default';
}

// Handling sorting visibility
sortingVisibilityArrow.onclick = () => {
  if (sorting.style.display !== 'block') {
    sortingVisibilityArrow.innerHTML = 'Sorting: &#9660;';
    sorting.style.display = 'block';
  } else {
    sortingVisibilityArrow.innerHTML = 'Sorting: &#9668;';
    sorting.style.display = 'none';
  }
}

// Adding classes for side list displaing
function sideClassAdd() {
  for (let itemImg of itemListImages) {
    itemImg.classList.add('item-list-image-side')
  };
  for (let itemDiv of itemListDiv) {
    itemDiv.classList.add('item-list-side')
  };
}
