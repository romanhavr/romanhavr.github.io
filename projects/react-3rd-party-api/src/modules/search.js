import * as e from './elements';
import videoListGridOptions from "./modules/template";
import { formatDateTimeForSearch } from './date-time-formatting';
import sideClassAdd from './side-list-class-adding';
import { activateRelatedVideos, activateSearchResults } from './list-toggling';
// import { gapi } from 'https://apis.google.com/js/api.js';

let searchResultsPageToken;
let relatedVideosPageToken;
let savedPageCounter;
let chosenVideoId;
let requestType;
let searchResultsResponse;
let relatedVideosResponse;
let pageToken = '';

// Search for a specified request
async function search(pageCounter = 1 ) {
  
  let request, response;
  
  if (e.searchResults.style.color === 'black') {
    // searching for 'q' string request
    request = window.gapi.client.youtube.search.list({
      q: e.searchInput.value,
      part: 'snippet',
      maxResults: '9',
      pageToken: pageToken,
      order: e.order.value,
      videoDefinition: e.videoDefinition.value,
      publishedAfter: formatDateTimeForSearch(e.timeAfter.value),
      publishedBefore: formatDateTimeForSearch(e.timeBefore.value),
      type: 'video'
    });
    requestType = 'searchResults'
  } else {
    // searching for related videos to chosen one
    request = window.gapi.client.youtube.search.list({
      part: 'snippet',
      maxResults: '9',
      pageToken: pageToken,
      order: e.order.value,
      videoDefinition: e.videoDefinition.value,
      publishedAfter: formatDateTimeForSearch(e.timeAfter.value),
      publishedBefore: formatDateTimeForSearch(e.timeBefore.value),
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
      e.page.style.visibility = e.pageBottom.style.visibility = 'visible';
      e.videoList.innerHTML = '';
      
      // saving response to local variables
      if (requestType === 'searchResults') {
        searchResultsResponse = response;
      };
      if (requestType === 'relatedVideos') {
        relatedVideosResponse = response;
      };

    } else {
      e.videoList.innerHTML = `<h3>No results for: "<i>${e.searchInput.value}</i>"</h3>`;
      e.page.style.visibility = e.pageBottom.style.visibility = 'hidden';
    };

    // Page navigating
    if (requestType !== 'relatedVideos') {
      e.page.style.visibility = e.pageBottom.style.visibility = 'visible'
    } else {
      e.page.style.visibility = e.pageBottom.style.visibility = 'hidden'
    };
    e.page.innerHTML = e.pageBottom.innerHTML = 'Page ' + pageCounter;
    
    if (response.nextPageToken) {
      e.next.style.display = e.nextBottom.style.display = 'inline';
      e.next.onclick = e.nextBottom.onclick = () => {
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
      e.next.style.display = e.nextBottom.style.display = 'none'
    }

    if (response.prevPageToken) {
      e.prev.style.display = e.prevBottom.style.display = 'inline';
      e.page.style.marginLeft = e.pageBottom.style.marginLeft = '0';
      e.prev.onclick = e.prevBottom.onclick = () => {
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
      e.prev.style.display = e.prevBottom.style.display = 'none';
      e.page.style.marginLeft = e.pageBottom.style.marginLeft = '2.25em'
    };

    if (pageCounter > 1 && requestType !== 'relatedVideos') {
      e.firstPage.style.display = e.firstPageBottom.style.display = 'inline';
      e.firstPage.onclick = e.firstPageBottom.onclick = () => {
        pageToken = '';
        search()
      };
    } else {
      e.firstPage.style.display = e.firstPageBottom.style.display = 'none';
    }

    // Building results grid
    response.items.forEach( item => {
      e.videoList.innerHTML += videoListGridOptions(
        item.etag,
        item.snippet.thumbnails.medium.url,
        item.snippet.title
      );
    });
    
    if (e.videoChosen.style.display) {
      sideClassAdd()
    };
    
    // Showing chosen video
    function showChosenVideo(id) {
      response.items.forEach( item => {
        if (item.etag === '"'+id+'"') {
          e.relatedVideos.style.display = 'inline';
          chosenVideoId = item.id.videoId;
          e.chosenTitle.innerHTML = item.snippet.title;
          e.chosenIframe.src = `https://www.youtube.com/embed/${chosenVideoId}`;
          e.chosenChannel.innerHTML = `
                      <span>${item.snippet.channelTitle}</span> - Channel`;

          if (e.chosenDescription.innerHTML !== 'Description') {
            e.chosenDescription.innerHTML = item.snippet.description;
          };
          // Handling description click
          e.chosenDescription.onclick = () => {
            if (e.chosenDescription.innerHTML === 'Description') {
              e.chosenDescription.style.color = 'black';
              e.chosenDescription.innerHTML = item.snippet.description;
            } else {
              e.chosenDescription.innerHTML = 'Description';
              e.chosenDescription.style.color = 'rgb(100,100,100)';
            }
          };
          // First time video choosing checking
          if (!e.videoChosen.style.display) {
            sideClassAdd();
            e.searchResultsDiv.classList.remove('search-results-width');
            e.searchResultsDiv.classList.add('search-results-width-side');
            e.videoList.classList.remove('video-list-grid');
            e.videoList.classList.add('video-list-grid-side');
            e.searchResults.style.opacity = '0.9';
            setTimeout(() => {e.videoChosen.style.display = 'block'},200);
            setTimeout(() => {e.searchResults.style.opacity = '1'},200);
            setTimeout(() => {e.videoChosen.style.opacity = '1'},200);
            setTimeout(() => {e.videoChosen.style.filter = 'blur(0)'},300);
          };
          e.chosenIframe.style.filter = 'blur(5px)';
          setTimeout(() => {e.chosenIframe.style.filter = 'blur(0)'},300);
          
          if (requestType === 'relatedVideos') {
            search()
          }
        }
      });
    };
  };
};

export default search();

// Handling video list toggling
e.searchResults.onclick = () => {
  if (e.searchResults.style.color === 'grey') {
    pageToken = searchResultsPageToken;
    activateSearchResults();
    search(savedPageCounter)
  }
};

e.relatedVideos.onclick = () => {
  if (e.relatedVideos.style.color === 'grey') {
    pageToken = relatedVideosPageToken;
    activateRelatedVideos();
    search()
  }
};