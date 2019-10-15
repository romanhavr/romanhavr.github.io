import React from 'react';
import ReactDOM from 'react-dom';
import { gapi } from 'gapi-script';
import '../styles/you-viewer-styles/you-viewer.css';

class YouViewer extends React.Component {
  constructor() {
    super()
    this.searchInputRef = React.createRef();
    this.searchButtonRef = React.createRef();
    this.contentRef = React.createRef();
    this.videoChosenRef = React.createRef();
    this.chosenTitleRef = React.createRef();
    this.chosenIframeRef = React.createRef();
    this.chosedIframeRef = React.createRef();
    this.chosenChannelRef = React.createRef();
    this.chosenDescriptionRef = React.createRef();
    this.relatedVideosRef = React.createRef();
    this.searchResultsRef = React.createRef();
    this.searchResultsDivRef = React.createRef();
    this.videoListRef = React.createRef();
    this.firstPageRef = React.createRef();
    this.pageRef = React.createRef();
    this.prevRef = React.createRef();
    this.nextRef = React.createRef();
    this.firstPageBottomRef = React.createRef();
    this.pageBottomRef = React.createRef();
    this.prevBottomRef = React.createRef();
    this.nextBottomRef = React.createRef();
    this.sortingVisibilityArrowRef = React.createRef();
    this.orderRef = React.createRef();
    this.timeAfterRef = React.createRef();
    this.timeAfterValidRef = React.createRef();
    this.timeBeforeRef = React.createRef();
    this.timeBeforeValidRef = React.createRef();
    this.videoDefinitionRef = React.createRef();
    this.sortButtonRef = React.createRef();
    this.sortingRef = React.createRef();

    this.sortingVisibilityArrowClick = this.sortingVisibilityArrowClick.bind(this);
    this.start = this.start.bind(this);
    this.loadAPIClientInterfaces = this.loadAPIClientInterfaces.bind(this);
    this.setDefaults = this.setDefaults.bind(this);
    this.search = this.search.bind(this);
    this.searchKeyUp = this.searchKeyUp.bind(this);
    this.searchSortClick = this.searchSortClick.bind(this);
    this.searchSort = this.searchSort.bind(this);
    this.activateSearchResults = this.activateSearchResults.bind(this);
    this.workingWithResponse = this.workingWithResponse.bind(this);
    this.searchResultsClick = this.searchResultsClick.bind(this);
    this.relatedVideosClick = this.relatedVideosClick.bind(this);
    this.showChosenVideo = this.showChosenVideo.bind(this);


    this.nowDT = new Date();
    this.state = {
      minTime: '2005-04-24T00:00',
      maxTime: this.formatDateTimeToInputValue(this.nowDT)
    }
  }

  searchInput;
  content;
  videoChosen;
  chosenTitle;
  chosenIframe;
  chosenDescription;
  chosenChannel;
  relatedVideos;
  searchResults;
  searchResultsDiv;
  videoList;
  prev;
  prevBottom;
  next;
  nextBottom;
  page;
  pageBottom;
  firstPage;
  firstPageBottom;
  order;
  timeAfter;
  timeBefore;
  timeAfterValid;
  timeBeforeValid;
  videoDefinition;
  sortingVisibilityArrow;
  sorting;

  node;
  itemListImages;
  itemListDiv;

  chosenVideoId;
  requestType;
  searchResultsResponse;
  relatedVideosResponse;
  searchResultsPageToken;
  relatedVideosPageToken;
  pageCounter;
  savedPageCounter;
  response;

  // Preparing connection to Youtube API
  componentDidMount() {
    gapi.load('client', this.start);
  };

  start() {
    gapi.client.init({
      'apiKey': 'AIzaSyDH3L_ivrAD6uX39L1CetMeg4FtktSDZd8',
      'Access-Control-Allow-Origin': '*'
    }).then(() => {
      this.loadAPIClientInterfaces()
    })
  };

  loadAPIClientInterfaces() {
    gapi.client.load('youtube', 'v3', () => {
      this.setDefaults();
      this.search();
    });
  }

  setDefaults() {

    this.searchInput = this.searchInputRef.current;
    this.content = this.contentRef.current;
    this.videoChosen = this.videoChosenRef.current;
    this.chosenTitle = this.chosenTitleRef.current;
    this.chosenIframe = this.chosenIframeRef.current;
    this.chosenDescription = this.chosenDescriptionRef.current;
    this.chosenChannel = this.chosenChannelRef.current;
    this.relatedVideos = this.relatedVideosRef.current;
    this.searchResults = this.searchResultsRef.current;
    this.searchResultsDiv = this.searchResultsDivRef.current;
    this.videoList = this.videoListRef.current;
    this.prev = this.prevRef.current;
    this.prevBottom = this.prevBottomRef.current;
    this.next = this.nextRef.current;
    this.nextBottom = this.nextBottomRef.current;
    this.page = this.pageRef.current;
    this.pageBottom = this.pageBottomRef.current;
    this.firstPage = this.firstPageRef.current;
    this.firstPageBottom = this.firstPageBottomRef.current;
    this.order = this.orderRef.current;
    this.timeAfter = this.timeAfterRef.current;
    this.timeBefore = this.timeBeforeRef.current;
    this.timeAfterValid = this.timeAfterValidRef.current;
    this.timeBeforeValid = this.timeBeforeValidRef.current;
    this.videoDefinition = this.videoDefinitionRef.current;
    this.sortingVisibilityArrow = this.sortingVisibilityArrowRef.current;
    this.sorting = this.sortingRef.current;

    this.node = ReactDOM.findDOMNode(this);
    this.itemListImages = this.node.getElementsByClassName('item-list-image');
    this.itemListDiv = this.node.getElementsByClassName('item-list');

    this.pageToken = '';
    this.searchInput.value = '4k';

    this.content.style.minHeight = window.innerHeight - 210 + 'px';
    this.searchResults.style.cursor = 'default';
    this.searchResults.style.color = 'black';
    this.relatedVideos.style.color = 'grey';
    this.relatedVideos.style.display = 'none';

    this.timeBefore.value = this.state.maxTime;
    this.timeBefore.min = this.timeAfter.value;
    this.timeBefore.max = this.state.maxTime;
    this.timeAfter.value = this.state.minTime;
    this.timeAfter.min = this.state.minTime;
    this.timeAfter.max = this.timeBefore.value;
  }

  // Search for a specified request
  async search(pageCounter = 1) {

    this.pageCounter = pageCounter;
    let request;

    if (this.searchResults.style.color === 'black') {
      // searching for 'q' string request
      request = gapi.client.youtube.search.list({
        q: this.searchInput.value,
        part: 'snippet',
        maxResults: '9',
        pageToken: this.pageToken,
        order: this.order.value,
        videoDefinition: this.videoDefinition.value,
        publishedAfter: this.formatDateTimeForSearch(this.timeAfter.value),
        publishedBefore: this.formatDateTimeForSearch(this.timeBefore.value),
        type: 'video'
      });
      this.requestType = 'searchResults'
    } else {
      // searching for related videos to chosen one
      request = window.gapi.client.youtube.search.list({
        part: 'snippet',
        maxResults: '9',
        pageToken: this.pageToken,
        order: this.order.value,
        videoDefinition: this.videoDefinition.value,
        publishedAfter: this.formatDateTimeForSearch(this.timeAfter.value),
        publishedBefore: this.formatDateTimeForSearch(this.timeBefore.value),
        relatedToVideoId: this.chosenVideoId,
        type: 'video'
      });
      this.requestType = 'relatedVideos'
    };

    // Saved response checking

    if (this.requestType === 'searchResults' && this.searchResultsResponse) {
      this.response = this.searchResultsResponse;
      this.workingWithResponse(this.response)
    } else {
      await request.execute(response => this.workingWithResponse(response))
    };

    if (this.requestType === 'relatedVideos' && this.relatedVideosResponse) {
      this.response = this.relatedVideosResponse;
      this.workingWithResponse(this.response)
    } else {
      await request.execute(response => this.workingWithResponse(response))
    };
  };

  workingWithResponse(response) {

    // request results checking
    if (response.items.length !== 0) {
      this.page.style.visibility = this.pageBottom.style.visibility = 'visible';
      this.videoList.innerHTML = '';

      // saving response to local variables
      if (this.requestType === 'searchResults') {
        this.searchResultsResponse = response;
      };
      if (this.requestType === 'relatedVideos') {
        this.relatedVideosResponse = response;
      };

    } else {
      this.videoList.innerHTML = `<h3>No results for: "<i>${this.searchInput.value}</i>"</h3>`;
      this.page.style.visibility = this.pageBottom.style.visibility = 'hidden';
    };

    // Page navigating
    if (this.requestType !== 'relatedVideos') {
      this.page.style.visibility = this.pageBottom.style.visibility = 'visible'
    } else {
      this.page.style.visibility = this.pageBottom.style.visibility = 'hidden'
    };
    this.page.innerHTML = this.pageBottom.innerHTML = 'Page ' + this.pageCounter;

    if (response.nextPageToken) {
      this.next.style.display = this.nextBottom.style.display = 'inline';
      this.next.onclick = this.nextBottom.onclick = () => {
        if (this.requestType === 'searchResults') {
          this.pageCounter++;
          this.savedPageCounter = this.pageCounter;
          this.searchResultsPageToken = response.nextPageToken;
        };
        if (this.requestType === 'relatedVideos') {
          this.relatedVideosPageToken = response.nextPageToken;
        };
        this.pageToken = response.nextPageToken;
        this.search(this.pageCounter)
      }
    } else {
      this.next.style.display = this.nextBottom.style.display = 'none'
    }

    if (response.prevPageToken) {
      this.prev.style.display = this.prevBottom.style.display = 'inline';
      this.page.style.marginLeft = this.pageBottom.style.marginLeft = '0';
      this.prev.onclick = this.prevBottom.onclick = () => {
        if (this.requestType === 'searchResults') {
          this.pageCounter--;
          this.savedPageCounter = this.pageCounter;
          this.searchResultsPageToken = response.prevPageToken;
        };
        if (this.requestType === 'relatedVideos') {
          this.relatedVideosPageToken = response.prevPageToken;
        };
        this.pageToken = response.prevPageToken;
        this.search(this.pageCounter)
      }
    } else {
      this.prev.style.display = this.prevBottom.style.display = 'none';
      this.page.style.marginLeft = this.pageBottom.style.marginLeft = '2.25em'
    };

    if (this.pageCounter > 1 && this.requestType !== 'relatedVideos') {
      this.firstPage.style.display = this.firstPageBottom.style.display = 'inline';
      this.firstPage.onclick = this.firstPageBottom.onclick = () => {
        this.pageToken = '';
        this.search()
      };
    } else {
      this.firstPage.style.display = this.firstPageBottom.style.display = 'none';
    }

    // Building results grid
    response.items.forEach(item => {
      const img = document.createElement('img');
      img.className = "item-list-image";
      img.src = item.snippet.thumbnails.medium.url;
      img.alt = item.snippet.title;
      const h5 = document.createElement('h5');
      h5.className = "item-title";
      h5.innerHTML = item.snippet.title;
      const div = document.createElement('div');
      div.className = "item-list";
      div.key = item.etag;
      div.onclick = () => { this.showChosenVideo(item.etag) };
      div.appendChild(img);
      div.appendChild(h5);
      this.videoList.appendChild(div);
    });

    if (this.videoChosen.style.display) {
      this.sideClassAdd()
    };

    this.response = response
  };

  showChosenVideo(id) {
    this.response.items.forEach(item => {
      if (item.etag === id) {
        this.relatedVideos.style.display = 'inline';
        this.chosenVideoId = item.id.videoId;
        this.chosenTitle.innerHTML = item.snippet.title;
        this.chosenIframe.src = `https://www.youtube.com/embed/${this.chosenVideoId}`;
        this.chosenChannel.innerHTML = `
                      <span>${item.snippet.channelTitle}</span> - Channel`;

        if (this.chosenDescription.innerHTML !== 'Description') {
          this.chosenDescription.innerHTML = item.snippet.description;
        };
        // Handling description click
        this.chosenDescription.onclick = () => {
          if (this.chosenDescription.innerHTML === 'Description') {
            this.chosenDescription.style.color = 'black';
            this.chosenDescription.innerHTML = item.snippet.description;
          } else {
            this.chosenDescription.innerHTML = 'Description';
            this.chosenDescription.style.color = 'rgb(100,100,100)';
          }
        };
        // First time video choosing checking
        if (!this.videoChosen.style.display) {
          this.sideClassAdd();
          this.searchResultsDiv.classList.remove('search-results-width');
          this.searchResultsDiv.classList.add('search-results-width-side');
          this.videoList.classList.remove('video-list-grid');
          this.videoList.classList.add('video-list-grid-side');
          this.searchResults.style.opacity = '0.9';
          setTimeout(() => { this.videoChosen.style.display = 'block' }, 200);
          setTimeout(() => { this.searchResults.style.opacity = '1' }, 200);
          setTimeout(() => { this.videoChosen.style.opacity = '1' }, 200);
          setTimeout(() => { this.videoChosen.style.filter = 'blur(0)' }, 300);
        };
        this.chosenIframe.style.filter = 'blur(5px)';
        setTimeout(() => { this.chosenIframe.style.filter = 'blur(0)' }, 300);

        if (this.requestType === 'relatedVideos') {
          this.search()
        }
      }
    });
  };

  // Template for video list grid
  // videoListGridOptions(
  //   itemEtag,
  //   itemThumbUrl,
  //   itemTitle
  // ) {
  //   return (
  //     `<div
  //           class="item-list"
  //           id=${itemEtag}
  //           onclick="this.showChosenVideo"
  //         >
  //           <img
  //             className="item-list-image"   
  //             src=${itemThumbUrl}
  //             alt=${itemTitle}
  //           >
  //           <h5
  //             className="item-title"
  //             id="item-title"
  //           >
  //             ${itemTitle}
  //           </h5>
  //         </div>
  //         `)
  // };

  // Formatting date and time
  formatDateTimeToInputValue(dateTime) {
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

  formatDateTimeForSearch(inputDateTime) {
    return '' + inputDateTime + ':00Z'
  }

  // Handling search actions
  // And validation
  searchSort() {
    if (!this.timeAfter.value) {
      this.timeAfterValid.style.display = 'none';
      this.timeBeforeValid.style.display = 'none';
      this.timeAfter.value = this.minTime;
    } else {
      if (this.timeAfter.value > this.timeBefore.value) {
        this.timeAfter.value = this.minTime;
        this.timeBeforeValid.style.display = 'inline';
        this.timeAfterValid.style.display = 'inline';
      } else {
        this.timeBeforeValid.style.display = 'none';
        this.timeAfterValid.style.display = 'none';
      }
    };
    if (!this.timeBefore.value) {
      this.searchResults.timeBefore.value = this.maxTime;
    };

    this.search()
  }

  searchKeyUp(e) {
    if (e.key === 'Enter') {
      this.activateSearchResults();
      this.searchSort()
    }
  }

  searchSortClick() {
    this.activateSearchResults();
    this.searchSort();
  }

  // Handling video list toggling
  searchResultsClick() {
    if (this.searchResults.style.color === 'grey') {
      this.pageToken = this.searchResultsPageToken;
      this.activateSearchResults();
      this.search(this.savedPageCounter)
    }
  };

  relatedVideosClick() {
    if (this.relatedVideos.style.color === 'grey') {
      this.pageToken = this.relatedVideosPageToken;
      this.activateRelatedVideos();
      this.search()
    }
  };

  activateSearchResults() {
    this.searchResults.style.color = 'black';
    this.searchResults.style.cursor = 'default';
    this.relatedVideos.style.color = 'grey';
    this.relatedVideos.style.cursor = 'pointer';
  };

  activateRelatedVideos() {
    this.searchResults.style.color = 'grey';
    this.searchResults.style.cursor = 'pointer';
    this.relatedVideos.style.color = 'black';
    this.relatedVideos.style.cursor = 'default';
  }

  // Handling sorting visibility
  sortingVisibilityArrowClick() {
    if (this.sorting.style.display !== 'block') {
      this.sortingVisibilityArrow.innerHTML = 'Sorting: &#9660;';
      this.sorting.style.display = 'block';
    } else {
      this.sortingVisibilityArrow.innerHTML = 'Sorting: &#9668;';
      this.sorting.style.display = 'none';
    }
  }

  // Adding classes for side list displaing
  sideClassAdd() {
    for (let itemImg of this.itemListImages) {
      itemImg.classList.add('item-list-image-side')
    };
    for (let itemDiv of this.itemListDiv) {
      itemDiv.classList.add('item-list-side')
    };
  }

  render() {
    return (
      <React.Fragment>
        <div className="header">
          <h1>
            <img
              className="title-image"
              src="you-viewer.png"
              alt="youviewer"
              height="80px"
            />
            <span className="subtitle">watching YouTube videos...</span>
          </h1>
          <span>
            <input
              className="search-input"
              ref={this.searchInputRef}
              type="text"
              placeholder="Search..."
              onKeyUp={this.searchKeyUp}
            />
            <button
              ref={this.searchButtonRef}
              onClick={this.searchSortClick}
            >
              Search
        </button>
          </span>
        </div>
        <div className="content content-display" ref={this.contentRef}>
          <div>
            <div
              className="video-chosen margin-auto"
              ref={this.videoChosenRef}
            >
              <iframe
                title="chosen-iframe"
                ref={this.chosenIframeRef}
                width="640"
                height="360"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              >
              </iframe>
              <h3
                ref={this.chosenTitleRef}
                className="chosen-title"
              >
              </h3>
              <div
                ref={this.chosenChannelRef}
                className="chosen-channel"
              >
              </div>
              <div
                ref={this.chosenDescriptionRef}
                className="chosen-description">Description</div>
            </div>
          </div>
          <div
            className="search-results search-results-width margin-auto"
            ref={this.searchResultsDivRef}
          >
            <h4>
              <span
                ref={this.searchResultsRef}
                onClick={this.searchResultsClick}
                className="search-results-title"
              >
                Search results:
          </span>
              <span
                ref={this.relatedVideosRef}
                onClick={this.relatedVideosClick}
                className="search-results-title"
              >
                Related videos:
            </span>
            </h4>
            <div>
              <span ref={this.firstPageRef} className="pages first"> &laquo;&laquo;</span>
              <span ref={this.prevRef} className="pages">&laquo; &nbsp;</span>
              <span ref={this.pageRef} className="page-counter"></span>
              <span ref={this.nextRef} className="pages">&nbsp; &raquo;</span>
            </div>
            <div className="video-list-grid" ref={this.videoListRef}></div>
            <div>
              <span ref={this.firstPageBottomRef} className="pages first"> &laquo;&laquo;</span>
              <span ref={this.prevBottomRef} className="pages"> &laquo; &nbsp;</span>
              <span ref={this.pageBottomRef} className="page-counter"></span>
              <span ref={this.nextBottomRef} className="pages">&nbsp; &raquo;</span>
            </div>

            <h5
              ref={this.sortingVisibilityArrowRef}
              onClick={this.sortingVisibilityArrowClick}
              className="sorting-visibility-arrow"
            >
              Sorting: &#9660;
        </h5>
            <ul
              className="sorting"
              ref={this.sortingRef}
            >
              <li>
                <span className="sorting-inputs">order by</span>
                <select ref={this.orderRef} defaultValue="relevance">
                  <option value="date">date</option>
                  <option value="rating">rating</option>
                  <option value="relevance">relevance (default)</option>
                  <option value="title">title</option>
                  <option value="viewCount">view count</option>
                </select>
              </li>
              <li>
                <span className="sorting-inputs">published after</span>
                <input
                  ref={this.timeAfterRef}
                  type="datetime-local"
                />
                <span
                  className="time-valid"
                  ref={this.timeAfterValidRef}
                >
                  Enter valid dates and times!
            </span>
              </li>
              <li>
                <span className="sorting-inputs">published before</span>
                <input
                  ref={this.timeBeforeRef}
                  type="datetime-local"
                />
                <span
                  className="time-valid"
                  ref={this.timeBeforeValidRef}
                >
                  * <b>Published after</b> can not be later than <b>Publish before</b>.
            </span>
              </li>
              <li>
                <span className="sorting-inputs">video definition</span>
                <select ref={this.videoDefinitionRef} defaultValue="any">
                  <option value="high">high</option>
                  <option value="standard">standard</option>
                  <option value="any">any (default)</option>
                </select>
              </li>
              <button
                className="sort-button sort-button-margin-top"
                ref={this.sortBbuttonRef}
                onClick={this.searchSortClick}
              >
                Sort
          </button>
            </ul>

          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default YouViewer;
