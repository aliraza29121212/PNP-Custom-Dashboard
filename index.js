var spinnerLoader = document.querySelector(".svgloader");

function loader() {
  spinnerLoader.style.display = "block";
}

function hideLoader() {
  spinnerLoader.style.display = "none";
}

function sliceText(text, maxLength) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + '...';
    }
    return text;
}


function playVideo(element) {
    var video = element.querySelector(".bookVideo");
    video.play();
}

function pauseVideo(element) {
    var video = element.querySelector(".bookVideo");
var videoClone = video.cloneNode(true);

    // Replace the existing video with the cloned video
    video.parentNode.replaceChild(videoClone, video);
   
}
function sortByVideoAndImage(entries) {
    // Separate entries with both videoUrl and posterImage
    const entriesWithBoth = entries.filter(entry => entry.videoUrl && entry.posterImage);
    
    // Separate entries without both videoUrl and posterImage
    const entriesWithoutBoth = entries.filter(entry => !entry.videoUrl || !entry.posterImage);
    
    // Combine the two arrays, placing entries with both first
    const sortedArray = entriesWithBoth.concat(entriesWithoutBoth);
    return sortedArray;
}
// // Add event listeners to trigger play and pause functions
// var bookElement = document.querySelector(".books");
// bookElement.addEventListener("mouseover", function() {
//     playVideo(this);
// });

// bookElement.addEventListener("mouseout", function() {
//     pauseVideo(this);
// });


var makeChunks = (data, size) => {
    var chunkedArray = [];
    for (let i = 0; i < data.length; i++) {
        var last = chunkedArray[chunkedArray.length - 1];
        if (!last || last.length === size) {
            chunkedArray.push([data[i]]);
        } else {
            last.push(data[i]);
        }
    }
    return chunkedArray;
};

// Book Summaries 
// Function to filter data based on search term
function filterDataBySearchTermBookSummaries(data, searchTerm) {
    return data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Function to render book summaries
function renderBookSummaries(data) {
    var html = "";
    var chunkSize = 4; // Adjust the chunk size as needed

    if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i += chunkSize) {
            var chunk = data.slice(i, i + chunkSize);

            html += `<div class="carousel-item ${i == 0 ? 'active' : ''}" data-bs-interval="5000"> <div class="row">`;

            chunk.forEach((item, i2) => {
                var videoUrl = item.videoUrl;
                var customPosterUrl = item.posterImage;
                                console.log(customPosterUrl, "videoUrl");

                var title = item.title;
                var des = item.description;
                var url = item.slug;

                html += ` 
                   <div class="books col-lg-3 col-md-6 card-container"  onmouseover="playVideo(this)" onmouseout="pauseVideo(this)">
                                   <a target="_blank" href="https://profitsandpizza.com/book_summaries/${url}">
    <video  poster="${customPosterUrl}" src="${videoUrl}" class="card-img-top bookVideo custom-poster-height" style="height: 160px;
    object-fit: cover;"></video>
    <section class="content-section py-4 px-2">
        <div class="d-flex" style="justify-content: space-between; gap: 1px;">
            <div>
                <h2 class="text-left headingcard">${title}</h2>
                <p class="descriptioncard">${des}</p>
            </div>
            <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 42 43" fill="none">
                        <circle cx="21.0078" cy="21.9062" r="20.5" stroke="white" stroke-opacity="0.07"/>
                        <path d="M27.7737 22.8052C27.9236 22.6552 28.0078 22.4518 28.0078 22.2398C28.0078 22.0277 27.9236 21.8244 27.7737 21.6744L23.2497 17.1504C23.1759 17.074 23.0877 17.0131 22.9901 16.9712C22.8925 16.9293 22.7876 16.9072 22.6814 16.9063C22.5752 16.9054 22.4699 16.9256 22.3716 16.9658C22.2733 17.006 22.1841 17.0654 22.109 17.1405C22.0339 17.2156 21.9745 17.3049 21.9343 17.4031C21.8941 17.5014 21.8738 17.6067 21.8748 17.7129C21.8757 17.8191 21.8977 17.924 21.9397 18.0216C21.9816 18.1192 22.0425 18.2074 22.1189 18.2812L25.2778 21.4401L14.6871 21.4401C14.475 21.4401 14.2716 21.5243 14.1216 21.6743C13.9717 21.8243 13.8874 22.0277 13.8874 22.2398C13.8874 22.4519 13.9717 22.6553 14.1216 22.8053C14.2716 22.9552 14.475 23.0395 14.6871 23.0395L25.2778 23.0395L22.1189 26.1984C21.9732 26.3492 21.8926 26.5512 21.8944 26.7609C21.8962 26.9706 21.9803 27.1712 22.1286 27.3194C22.2769 27.4677 22.4775 27.5518 22.6872 27.5536C22.8968 27.5555 23.0988 27.4749 23.2497 27.3292L27.7737 22.8052Z" fill="white"/>
                    </svg>
              
            </div>
        </div>
    </section>
      </a>
</div>`;
            });

            html += '</div></div>';
        }
    } else {
       html = `<div class="row"><div class="col-4 offset-4"><section class=" py-4 px-2 mt-5" style="border-radius: 14px;background: white;color: black !important;">
      <div class="d-flex" style="
         justify-content: space-between;
         gap: 1px;
         border-radius: 10px;
         ">
         <div style="
            display: flex;
            margin: auto;
            ">
            <h2 class="text-center headingcard" style="font-size: 22px;color: black !important;">NO Result Found</h2>
         </div>
      </div>
   </section></div></div>` ;
    }

    document.querySelector('.carousel_Root').innerHTML = html;
}

// Update your fetch request to include the search functionality

// fetch('https://owlapplicationbuilder.com/api/entities/profits_and_pizza_website_1580295343903_98/book_summaries/get_all_en?page=1&page_size=15&fld=_id&srt=-1&to_search={"videoUrl":{"$ne": ""}}&t=true')

fetch('https://owlapplicationbuilder.com/api/entities/profits_and_pizza_website_1580295343903_98/book_summaries/get_all_en?page=1&page_size=500&fld=_id&srt=-1&to_search={}&t=true')
    .then(response => response.json())
    .then((data) => {
        hideLoader();
        var responseData = data.data;
        var filteredData = responseData;
        filteredData = sortByVideoAndImage(filteredData);
        // Handle search input changes in real-time
        document.getElementById('bookSearchInput').addEventListener('input', function () {
            var searchTerm = this.value.trim();
            filteredData = filterDataBySearchTermBookSummaries(responseData, searchTerm);
            renderBookSummaries(filteredData);
        });

        // Initial rendering
        console.log(filteredData);
        renderBookSummaries(filteredData);
    })
    .catch(error => console.error(error));



// Free Trials

// Function to filter data based on search term
function filterDataBySearchTermFreeTrails(data, searchTerm) {
    return data.filter(item => item.headline && typeof item.headline === 'string' && item.headline.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Function to render free trials
function renderFreeTrials(data) {
    var html = "";
    var chunkSize = 4; // Adjust the chunk size as needed

    if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i += chunkSize) {
            var chunk = data.slice(i, i + chunkSize);

            html += `<div class="carousel-item ${i == 0 ? 'active' : ''}" data-bs-interval="5000"> <div class="row">`;

            chunk.forEach((item, i2) => {
                var video = item.videoUrl;
                var title = item.headline;
                var post = item.posterImage;
                var des = sliceText(item.description, 40);
                var url = item.url;

                html += `
                    <div class="books col-lg-3 col-md-6" onmouseover="playVideo(this)" onmouseout="pauseVideo(this)">
                                                        <a target="_blank" href="${url}">
                        <video  poster="${post}"  src="${video}" class="card-img-top bookVideo" style="height: 160px;
    object-fit: cover;"></video>
                        <section class="content-section py-4 px-2">
                            <div class="d-flex" style="justify-content: space-between; gap: 1px;">
                                <div>
                                    <h2 class="text-left headingcard">${title}</h2>
                                    <p class="descriptioncard">${des}</p>
                                </div>
                                <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 42 43" fill="none">
                                            <circle cx="21.0078" cy="21.9062" r="20.5" stroke="white" stroke-opacity="0.07"/>
                                            <path d="M27.7737 22.8052C27.9236 22.6552 28.0078 22.4518 28.0078 22.2398C28.0078 22.0277 27.9236 21.8244 27.7737 21.6744L23.2497 17.1504C23.1759 17.074 23.0877 17.0131 22.9901 16.9712C22.8925 16.9293 22.7876 16.9072 22.6814 16.9063C22.5752 16.9054 22.4699 16.9256 22.3716 16.9658C22.2733 17.006 22.1841 17.0654 22.109 17.1405C22.0339 17.2156 21.9745 17.3049 21.9343 17.4031C21.8941 17.5014 21.8738 17.6067 21.8748 17.7129C21.8757 17.8191 21.8977 17.924 21.9397 18.0216C21.9816 18.1192 22.0425 18.2074 22.1189 18.2812L25.2778 21.4401L14.6871 21.4401C14.475 21.4401 14.2716 21.5243 14.1216 21.6743C13.9717 21.8243 13.8874 22.0277 13.8874 22.2398C13.8874 22.4519 13.9717 22.6553 14.1216 22.8053C14.2716 22.9552 14.475 23.0395 14.6871 23.0395L25.2778 23.0395L22.1189 26.1984C21.9732 26.3492 21.8926 26.5512 21.8944 26.7609C21.8962 26.9706 21.9803 27.1712 22.1286 27.3194C22.2769 27.4677 22.4775 27.5518 22.6872 27.5536C22.8968 27.5555 23.0988 27.4749 23.2497 27.3292L27.7737 22.8052Z" fill="white"/>
                                        </svg>
                                </div>
                            </div>
                        </section>
                                                            </a>
                    </div>`;
            });

            html += '</div></div>';
        }
    } else {
        html = `<div class="row"><div class="col-4 offset-4"><section class=" py-4 px-2 mt-5" style="border-radius: 14px;background: white;color: black !important;">
      <div class="d-flex" style="
         justify-content: space-between;
         gap: 1px;
         border-radius: 10px;
         ">
         <div style="
            display: flex;
            margin: auto;
            ">
            <h2 class="text-center headingcard" style="font-size: 22px;color: black !important;">NO Result Found</h2>
         </div>
      </div>
   </section></div></div>`;
    }

    document.querySelector('.free_trials').innerHTML = html;
}

// Update your fetch request to include the search functionality for Free Trials
fetch('https://owlapplicationbuilder.com/appsbuilder/profits_and_pizza_website_1580295343903_98/objectsbuilder/api/entities/free_trials/get_all_en?page=1&page_size=1766&fld=_id&srt=-1&to_search={}&t=true')
    .then(response => response.json())
    .then((data) => {
        var responseData = data.data;
        var filteredData = responseData;
                      console.log("book filteredData", filteredData);


        // Handle search input changes in real-time
        document.getElementById('freeTrialsSearchInput').addEventListener('input', function () {
            var searchTerm = this.value.trim();
            filteredData = filterDataBySearchTermFreeTrails(responseData, searchTerm);
            renderFreeTrials(filteredData);
        });

        // Initial rendering
        console.log(filteredData);
        renderFreeTrials(filteredData);
    })
    .catch(error => console.error(error));







// Free Productivity Tools start


// Function to filter data based on search term
function filterDataBySearchTermFreeProductivityTools(data, searchTerm) {
    return data.filter(item => item.title && typeof item.title === 'string' && item.title.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Function to render free trials
function renderFreeProductivityTools(data) {
    var html = "";
    var chunkSize = 4; // Adjust the chunk size as needed

    if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i += chunkSize) {
            var chunk = data.slice(i, i + chunkSize);

            html += `<div class="carousel-item ${i == 0 ? 'active' : ''}" data-bs-interval="5000"> <div class="row">`;

            chunk.forEach((item, i2) => {
                var video = item.videoUrl;
                var title = item.title;
                var post = item.posterImage;
                var des = sliceText(item.toolsDescription, 40);
                var url = item.pageUrl;

                html += `
                    <div class="books col-lg-3 col-md-6" onmouseover="playVideo(this)" onmouseout="pauseVideo(this)">
                                                        <a target="_blank" href="${url}">
                        <video  poster="${post}"  src="${video}" class="card-img-top bookVideo"></video>
                        <section class="content-section py-4 px-2">
                            <div class="d-flex" style="justify-content: space-between; gap: 1px;">
                                <div>
                                    <h2 class="text-left headingcard">${title}</h2>
                                    <p class="descriptioncard">${des}</p>
                                </div>
                                <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 42 43" fill="none">
                                            <circle cx="21.0078" cy="21.9062" r="20.5" stroke="white" stroke-opacity="0.07"/>
                                            <path d="M27.7737 22.8052C27.9236 22.6552 28.0078 22.4518 28.0078 22.2398C28.0078 22.0277 27.9236 21.8244 27.7737 21.6744L23.2497 17.1504C23.1759 17.074 23.0877 17.0131 22.9901 16.9712C22.8925 16.9293 22.7876 16.9072 22.6814 16.9063C22.5752 16.9054 22.4699 16.9256 22.3716 16.9658C22.2733 17.006 22.1841 17.0654 22.109 17.1405C22.0339 17.2156 21.9745 17.3049 21.9343 17.4031C21.8941 17.5014 21.8738 17.6067 21.8748 17.7129C21.8757 17.8191 21.8977 17.924 21.9397 18.0216C21.9816 18.1192 22.0425 18.2074 22.1189 18.2812L25.2778 21.4401L14.6871 21.4401C14.475 21.4401 14.2716 21.5243 14.1216 21.6743C13.9717 21.8243 13.8874 22.0277 13.8874 22.2398C13.8874 22.4519 13.9717 22.6553 14.1216 22.8053C14.2716 22.9552 14.475 23.0395 14.6871 23.0395L25.2778 23.0395L22.1189 26.1984C21.9732 26.3492 21.8926 26.5512 21.8944 26.7609C21.8962 26.9706 21.9803 27.1712 22.1286 27.3194C22.2769 27.4677 22.4775 27.5518 22.6872 27.5536C22.8968 27.5555 23.0988 27.4749 23.2497 27.3292L27.7737 22.8052Z" fill="white"/>
                                        </svg>
                                </div>
                            </div>
                        </section>
                                                            </a>
                    </div>`;
            });

            html += '</div></div>';
        }
    } else {
        html = `<div class="row"><div class="col-4 offset-4"><section class=" py-4 px-2 mt-5" style="border-radius: 14px;background: white;color: black !important;">
      <div class="d-flex" style="
         justify-content: space-between;
         gap: 1px;
         border-radius: 10px;
         ">
         <div style="
            display: flex;
            margin: auto;
            ">
            <h2 class="text-center headingcard" style="font-size: 22px;color: black !important;">NO Result Found</h2>
         </div>
      </div>
   </section></div></div>`;
    }

    document.querySelector('.free_Productivity_Tools').innerHTML = html;
}

// Update your fetch request to include the search functionality for Free Trials
fetch('https://owlapplicationbuilder.com/appsbuilder/profits_and_pizza_website_1580295343903_98/objectsbuilder/api/entities/free_productivity_tools/get_all_en?page=1&page_size=1766&fld=_id&srt=-1&to_search={"status":"published"}&t=true')
    .then(response => response.json())
    .then((data) => {
        var responseDataFilter = data.data;
        var filteredDatatols = responseDataFilter;
                      console.log("book filteredData", filteredDatatols);


        // Handle search input changes in real-time
        document.getElementById('FreeProductivityTools').addEventListener('input', function () {
            var searchTerm = this.value.trim();
            filteredDatatols = filterDataBySearchTermFreeProductivityTools(responseDataFilter, searchTerm);
            renderFreeProductivityTools(filteredDatatols);
        });

        // Initial rendering
        console.log(filteredDatatols);
        renderFreeProductivityTools(filteredDatatols);
    })
    .catch(error => console.error(error));
    
    
  // Free Productivity Tools End
  
    
    
    
    
    
    
    
    
    // Free Leads and Advertising start


// Function to filter data based on search term
function filterDataBySearchTermfreeLeadAandAdvertising(data, searchTerm) {
    return data.filter(item => item.title && typeof item.title === 'string' && item.title.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Function to render free trials
function renderfreeLeadAandAdvertising(data) {
    var html = "";
    var chunkSize = 4; // Adjust the chunk size as needed

    if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i += chunkSize) {
            var chunk = data.slice(i, i + chunkSize);

            html += `<div class="carousel-item ${i == 0 ? 'active' : ''}" data-bs-interval="5000"> <div class="row">`;

            chunk.forEach((item, i2) => {
                var video = item.videoUrl;
                var title = item.title;
                var post = item.posterImage;
                var des = sliceText(item.description, 40);
                var url = item.pageUrl;

                html += `
                    <div class="books col-lg-3 col-md-6" onmouseover="playVideo(this)" onmouseout="pauseVideo(this)">
                                                        <a target="_blank" href="${url}">
                        <video  poster="${post}"  src="${video}" class="card-img-top bookVideo"></video>
                        <section class="content-section py-4 px-2">
                            <div class="d-flex" style="justify-content: space-between; gap: 1px;">
                                <div>
                                    <h2 class="text-left headingcard">${title}</h2>
                                    <p class="descriptioncard">${des}</p>
                                </div>
                                <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 42 43" fill="none">
                                            <circle cx="21.0078" cy="21.9062" r="20.5" stroke="white" stroke-opacity="0.07"/>
                                            <path d="M27.7737 22.8052C27.9236 22.6552 28.0078 22.4518 28.0078 22.2398C28.0078 22.0277 27.9236 21.8244 27.7737 21.6744L23.2497 17.1504C23.1759 17.074 23.0877 17.0131 22.9901 16.9712C22.8925 16.9293 22.7876 16.9072 22.6814 16.9063C22.5752 16.9054 22.4699 16.9256 22.3716 16.9658C22.2733 17.006 22.1841 17.0654 22.109 17.1405C22.0339 17.2156 21.9745 17.3049 21.9343 17.4031C21.8941 17.5014 21.8738 17.6067 21.8748 17.7129C21.8757 17.8191 21.8977 17.924 21.9397 18.0216C21.9816 18.1192 22.0425 18.2074 22.1189 18.2812L25.2778 21.4401L14.6871 21.4401C14.475 21.4401 14.2716 21.5243 14.1216 21.6743C13.9717 21.8243 13.8874 22.0277 13.8874 22.2398C13.8874 22.4519 13.9717 22.6553 14.1216 22.8053C14.2716 22.9552 14.475 23.0395 14.6871 23.0395L25.2778 23.0395L22.1189 26.1984C21.9732 26.3492 21.8926 26.5512 21.8944 26.7609C21.8962 26.9706 21.9803 27.1712 22.1286 27.3194C22.2769 27.4677 22.4775 27.5518 22.6872 27.5536C22.8968 27.5555 23.0988 27.4749 23.2497 27.3292L27.7737 22.8052Z" fill="white"/>
                                        </svg>
                                </div>
                            </div>
                        </section>
                                                            </a>
                    </div>`;
            });

            html += '</div></div>';
        }
    } else {
        html = `<div class="row"><div class="col-4 offset-4"><section class=" py-4 px-2 mt-5" style="border-radius: 14px;background: white;color: black !important;">
      <div class="d-flex" style="
         justify-content: space-between;
         gap: 1px;
         border-radius: 10px;
         ">
         <div style="
            display: flex;
            margin: auto;
            ">
            <h2 class="text-center headingcard" style="font-size: 22px;color: black !important;">NO Result Found</h2>
         </div>
      </div>
   </section></div></div>`;
    }

    document.querySelector('.Free_Leads_And_Advertising').innerHTML = html;
}

// Update your fetch request to include the search functionality for Free Trials
fetch('https://owlapplicationbuilder.com/appsbuilder/profits_and_pizza_website_1580295343903_98/objectsbuilder/api/entities/free_leads_and_advertising/get_all_en?page=1&page_size=1766&fld=_id&srt=-1&to_search={}&t=true')
    .then(response => response.json())
    .then((data) => {
        var responseDataFilterLeads = data.data;
        var filteredDataLeads = responseDataFilterLeads;
                      console.log("book filteredData", filteredDataLeads);


        // Handle search input changes in real-time
        document.getElementById('FreeLeadsAndAdvertising').addEventListener('input', function () {
            var searchTerm = this.value.trim();
            filteredDataLeads = filterDataBySearchTermfreeLeadAandAdvertising(responseDataFilterLeads, searchTerm);
            renderfreeLeadAandAdvertising(filteredDataLeads);
        });

        // Initial rendering
        console.log(filteredDataLeads);
        renderfreeLeadAandAdvertising(filteredDataLeads);
    })
    .catch(error => console.error(error));
    
    
  // Free Leads and Advertising End
    
    
    
    
    
    
    
    
// Partnerships start


// Function to filter data based on search term
function filterDataBySearchTermPartnerships(data, searchTerm) {
    return data.filter(item => item.title && typeof item.title === 'string' && item.title.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Function to render free trials
function renderPartnerships(data) {
    var html = "";
    var chunkSize = 4; // Adjust the chunk size as needed

    if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i += chunkSize) {
            var chunk = data.slice(i, i + chunkSize);

            html += `<div class="carousel-item ${i == 0 ? 'active' : ''}" data-bs-interval="5000"> <div class="row">`;

            chunk.forEach((item, i2) => {
                var video = item.videoUrl;
                var title = item.title;
                var post = item.posterImage;
                var des = sliceText(item.description, 40);
                var url = item.pageUrl;

                html += `
                    <div class="books col-lg-3 col-md-6" onmouseover="playVideo(this)" onmouseout="pauseVideo(this)">
                                                        <a target="_blank" href="${url}">
                        <video  poster="${post}"  src="${video}" class="card-img-top bookVideo"></video>
                        <section class="content-section py-4 px-2">
                            <div class="d-flex" style="justify-content: space-between; gap: 1px;">
                                <div>
                                    <h2 class="text-left headingcard">${title}</h2>
                                    <p class="descriptioncard">${des}</p>
                                </div>
                                <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 42 43" fill="none">
                                            <circle cx="21.0078" cy="21.9062" r="20.5" stroke="white" stroke-opacity="0.07"/>
                                            <path d="M27.7737 22.8052C27.9236 22.6552 28.0078 22.4518 28.0078 22.2398C28.0078 22.0277 27.9236 21.8244 27.7737 21.6744L23.2497 17.1504C23.1759 17.074 23.0877 17.0131 22.9901 16.9712C22.8925 16.9293 22.7876 16.9072 22.6814 16.9063C22.5752 16.9054 22.4699 16.9256 22.3716 16.9658C22.2733 17.006 22.1841 17.0654 22.109 17.1405C22.0339 17.2156 21.9745 17.3049 21.9343 17.4031C21.8941 17.5014 21.8738 17.6067 21.8748 17.7129C21.8757 17.8191 21.8977 17.924 21.9397 18.0216C21.9816 18.1192 22.0425 18.2074 22.1189 18.2812L25.2778 21.4401L14.6871 21.4401C14.475 21.4401 14.2716 21.5243 14.1216 21.6743C13.9717 21.8243 13.8874 22.0277 13.8874 22.2398C13.8874 22.4519 13.9717 22.6553 14.1216 22.8053C14.2716 22.9552 14.475 23.0395 14.6871 23.0395L25.2778 23.0395L22.1189 26.1984C21.9732 26.3492 21.8926 26.5512 21.8944 26.7609C21.8962 26.9706 21.9803 27.1712 22.1286 27.3194C22.2769 27.4677 22.4775 27.5518 22.6872 27.5536C22.8968 27.5555 23.0988 27.4749 23.2497 27.3292L27.7737 22.8052Z" fill="white"/>
                                        </svg>
                                </div>
                            </div>
                        </section>
                                                            </a>
                    </div>`;
            });

            html += '</div></div>';
        }
    } else {
        html = `<div class="row"><div class="col-4 offset-4"><section class=" py-4 px-2 mt-5" style="border-radius: 14px;background: white;color: black !important;">
      <div class="d-flex" style="
         justify-content: space-between;
         gap: 1px;
         border-radius: 10px;
         ">
         <div style="
            display: flex;
            margin: auto;
            ">
            <h2 class="text-center headingcard" style="font-size: 22px;color: black !important;">NO Result Found</h2>
         </div>
      </div>
   </section></div></div>`;
    }

    document.querySelector('.Partnerships_inner').innerHTML = html;
}

// Update your fetch request to include the search functionality for Free Trials
fetch('https://owlapplicationbuilder.com/appsbuilder/profits_and_pizza_website_1580295343903_98/objectsbuilder/api/entities/partnerships/get_all_en?page=1&page_size=1766&fld=_id&srt=-1&to_search={}&t=true')
    .then(response => response.json())
    .then((data) => {
        var responseDataFilterpartnerships = data.data;
        var filteredDatapartnerships = responseDataFilterpartnerships;
                      console.log("book filteredData", filteredDatapartnerships);


        // Handle search input changes in real-time
        document.getElementById('Partnerships').addEventListener('input', function () {
            var searchTerm = this.value.trim();
            filteredDatapartnerships = filterDataBySearchTermPartnerships(responseDataFilterpartnerships, searchTerm);
            renderPartnerships(filteredDatapartnerships);
        });

        // Initial rendering
        console.log(filteredDatapartnerships);
        renderPartnerships(filteredDatapartnerships);
    })
    .catch(error => console.error(error));
    
    
  // PARTNERSHIPS End


// Recommended platforms start


// Function to filter data based on search term
function filterDataBySearchTermRecommendedPlatforms(data, searchTerm) {
    return data.filter(item => item.title && typeof item.title === 'string' && item.title.toLowerCase().includes(searchTerm.toLowerCase()));
}

// Function to render free trials
function renderRecommendedPlatforms(data) {
    var html = "";
    var chunkSize = 4; // Adjust the chunk size as needed

    if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i += chunkSize) {
            var chunk = data.slice(i, i + chunkSize);

            html += `<div class="carousel-item ${i == 0 ? 'active' : ''}" data-bs-interval="5000"> <div class="row">`;

            chunk.forEach((item, i2) => {
                var video = item.videoUrl;
                var title = item.title;
                var post = item.posterImage;
                var des = sliceText(item.description, 40);
                var url = item.pageUrl;

                html += `
                    <div class="books col-lg-3 col-md-6" onmouseover="playVideo(this)" onmouseout="pauseVideo(this)">
                                                        <a target="_blank" href="${url}">
                        <video  poster="${post}"  src="${video}" class="card-img-top bookVideo"></video>
                        <section class="content-section py-4 px-2">
                            <div class="d-flex" style="justify-content: space-between; gap: 1px;">
                                <div>
                                    <h2 class="text-left headingcard">${title}</h2>
                                    <p class="descriptioncard">${des}</p>
                                </div>
                                <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 42 43" fill="none">
                                            <circle cx="21.0078" cy="21.9062" r="20.5" stroke="white" stroke-opacity="0.07"/>
                                            <path d="M27.7737 22.8052C27.9236 22.6552 28.0078 22.4518 28.0078 22.2398C28.0078 22.0277 27.9236 21.8244 27.7737 21.6744L23.2497 17.1504C23.1759 17.074 23.0877 17.0131 22.9901 16.9712C22.8925 16.9293 22.7876 16.9072 22.6814 16.9063C22.5752 16.9054 22.4699 16.9256 22.3716 16.9658C22.2733 17.006 22.1841 17.0654 22.109 17.1405C22.0339 17.2156 21.9745 17.3049 21.9343 17.4031C21.8941 17.5014 21.8738 17.6067 21.8748 17.7129C21.8757 17.8191 21.8977 17.924 21.9397 18.0216C21.9816 18.1192 22.0425 18.2074 22.1189 18.2812L25.2778 21.4401L14.6871 21.4401C14.475 21.4401 14.2716 21.5243 14.1216 21.6743C13.9717 21.8243 13.8874 22.0277 13.8874 22.2398C13.8874 22.4519 13.9717 22.6553 14.1216 22.8053C14.2716 22.9552 14.475 23.0395 14.6871 23.0395L25.2778 23.0395L22.1189 26.1984C21.9732 26.3492 21.8926 26.5512 21.8944 26.7609C21.8962 26.9706 21.9803 27.1712 22.1286 27.3194C22.2769 27.4677 22.4775 27.5518 22.6872 27.5536C22.8968 27.5555 23.0988 27.4749 23.2497 27.3292L27.7737 22.8052Z" fill="white"/>
                                        </svg>
                                </div>
                            </div>
                        </section>
                                                            </a>
                    </div>`;
            });

            html += '</div></div>';
        }
    } else {
        html = `<div class="row"><div class="col-4 offset-4"><section class=" py-4 px-2 mt-5" style="border-radius: 14px;background: white;color: black !important;">
      <div class="d-flex" style="
         justify-content: space-between;
         gap: 1px;
         border-radius: 10px;
         ">
         <div style="
            display: flex;
            margin: auto;
            ">
            <h2 class="text-center headingcard" style="font-size: 22px;color: black !important;">NO Result Found</h2>
         </div>
      </div>
   </section></div></div>`;
    }

    document.querySelector('.recommended_inner').innerHTML = html;
}

// Update your fetch request to include the search functionality for Free Trials
fetch('https://owlapplicationbuilder.com/appsbuilder/profits_and_pizza_website_1580295343903_98/objectsbuilder/api/entities/recommended_platforms/get_all_en?page=1&page_size=1766&fld=_id&srt=-1&to_search={}&t=true')
    .then(response => response.json())
    .then((data) => {
        var responseDataFilterRecommend = data.data;
        var filteredDataRecommended = responseDataFilterRecommend;
                      console.log("book filteredData", filteredDataRecommended);


        // Handle search input changes in real-time
        document.getElementById('Platforms').addEventListener('input', function () {
            var searchTerm = this.value.trim();
            filteredDataRecommended = filterDataBySearchTermRecommendedPlatforms(responseDataFilterRecommend, searchTerm);
            renderRecommendedPlatforms(filteredDataRecommended);
        });

        // Initial rendering
        console.log(filteredDataRecommended);
        renderRecommendedPlatforms(filteredDataRecommended);
    })
    .catch(error => console.error(error));
    
    
  // Recommended Platoforms End




//Blogs 

// Function to filter data based on search term
function filterDataBySearchTerm(data, searchTerm) {
    return data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
}


// Function to render blogs
function renderBlogs(data) {
    var html = "";
    var chunkSize = 4; // Adjust the chunk size as needed

    if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i += chunkSize) {
            var chunk = data.slice(i, i + chunkSize);

            html += `<div class="carousel-item ${i == 0 ? 'active' : ''}" data-bs-interval="5000"> <div class="row">`;

            chunk.forEach((item, i2) => {
                var video = item.videoUrl;
                var title = item.title;
                var ImagePost = item.categoryImage;
                var des = sliceText(item.description, 40);
                var url = item.slug;

                html += `
                    <div class="books col-lg-3 col-md-6" onmouseover="playVideo(this)" onmouseout="pauseVideo(this)">
                                                        <a target="_blank" href="https://profitsandpizza.com/blog_category/${url}" target="_blank">
                        <img src="${ImagePost}" class="card-img-top" style="height:20vh;">
                        <section class="content-section py-4 px-2">
                            <div class="d-flex" style="justify-content: space-between; gap: 1px;">
                                <div>
                                    <h2 class="text-left headingcard">${title}</h2>
                                    <p class="descriptioncard">${des}</p>
                                </div>
                                <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 42 43" fill="none">
                                            <circle cx="21.0078" cy="21.9062" r="20.5" stroke="white" stroke-opacity="0.07"/>
                                            <path d="M27.7737 22.8052C27.9236 22.6552 28.0078 22.4518 28.0078 22.2398C28.0078 22.0277 27.9236 21.8244 27.7737 21.6744L23.2497 17.1504C23.1759 17.074 23.0877 17.0131 22.9901 16.9712C22.8925 16.9293 22.7876 16.9072 22.6814 16.9063C22.5752 16.9054 22.4699 16.9256 22.3716 16.9658C22.2733 17.006 22.1841 17.0654 22.109 17.1405C22.0339 17.2156 21.9745 17.3049 21.9343 17.4031C21.8941 17.5014 21.8738 17.6067 21.8748 17.7129C21.8757 17.8191 21.8977 17.924 21.9397 18.0216C21.9816 18.1192 22.0425 18.2074 22.1189 18.2812L25.2778 21.4401L14.6871 21.4401C14.475 21.4401 14.2716 21.5243 14.1216 21.6743C13.9717 21.8243 13.8874 22.0277 13.8874 22.2398C13.8874 22.4519 13.9717 22.6553 14.1216 22.8053C14.2716 22.9552 14.475 23.0395 14.6871 23.0395L25.2778 23.0395L22.1189 26.1984C21.9732 26.3492 21.8926 26.5512 21.8944 26.7609C21.8962 26.9706 21.9803 27.1712 22.1286 27.3194C22.2769 27.4677 22.4775 27.5518 22.6872 27.5536C22.8968 27.5555 23.0988 27.4749 23.2497 27.3292L27.7737 22.8052Z" fill="white"/>
                                        </svg>
                                </div>
                            </div>
                        </section>
                                                            </a>
                    </div>`;
            });

            html += '</div></div>';
        }
    } else {
        html = `<div class="row"><div class="col-4 offset-4"><section class=" py-4 px-2 mt-5" style="border-radius: 14px;background: white;color: black !important;">
      <div class="d-flex" style="
         justify-content: space-between;
         gap: 1px;
         border-radius: 10px;
         ">
         <div style="
            display: flex;
            margin: auto;
            ">
            <h2 class="text-center headingcard" style="font-size: 22px;color: black !important;">NO Result Found</h2>
         </div>
      </div>
   </section></div></div>` ;
    }

    document.querySelector('.blogs').innerHTML = html;
}

// Update your fetch request to include the search functionality
fetch('https://owlapplicationbuilder.com/appsbuilder/profits_and_pizza_website_1580295343903_98/objectsbuilder/api/entities/blog_category/get_all_en?page=1&page_size=1766&fld=_id&srt=-1&to_search={}&t=true')
    .then(response => response.json())
    .then((data) => {
        var responseData = data.data;
        var filteredData = responseData;

        // Handle search input changes in real-time
        document.getElementById('blogSearchInput').addEventListener('input', function () {
            var searchTerm = this.value.trim();
            filteredData = filterDataBySearchTerm(responseData, searchTerm);
            renderBlogs(filteredData);
        });

        // Initial rendering
        console.log(filteredData);
        renderBlogs(filteredData);
    })
    .catch(error => console.error(error));


// Update your fetch request to include the search functionality
fetch('https://owlapplicationbuilder.com/appsbuilder/profits_and_pizza_website_1580295343903_98/objectsbuilder/api/entities/blog_category/get_all_en?page=1&page_size=1766&fld=_id&srt=-1&to_search={}&t=true')
    .then(response => response.json())
    .then((data) => {
        var responseData = data.data;
        var filteredData = responseData;

        // Handle search input changes in real-time
        document.getElementById('blogSearchInput').addEventListener('input', function () {
            var searchTerm = this.value.trim();
            filteredData = filterDataBySearchTerm(responseData, searchTerm);
            renderBlogs(filteredData);
        });

        // Initial rendering
        renderBlogs(filteredData);
    })
    .catch(error => console.error(error));
    
    
    
    
    
    //Free resources

// Function to filter data based on search term
function filterDataBySearchTermFreeResources(data, searchTerm) {
    return data.filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
}


// Function to render blogs
function renderResources(data) {
    var html = "";
    var chunkSize = 4; // Adjust the chunk size as needed

    if (Array.isArray(data) && data.length > 0) {
        for (let i = 0; i < data.length; i += chunkSize) {
            var chunk = data.slice(i, i + chunkSize);

            html += `<div class="carousel-item ${i == 0 ? 'active' : ''}" data-bs-interval="5000"> <div class="row">`;

            chunk.forEach((item, i2) => {
                var video = item.videoUrl;
                var title = item.title;
                var ImagePost = item.poster;
                var des = sliceText(item.description, 50);
                var url = item.pageUrl;

                html += `
                    <div class="books col-lg-3 col-md-6" onmouseover="playVideo(this)" onmouseout="pauseVideo(this)">
                                                        <a target="_blank" href="${url}" target="_blank">
                        <img src="${ImagePost}" class="card-img-top" style="height:20vh;">
                        <section class="content-section py-4 px-2">
                            <div class="d-flex" style="justify-content: space-between; gap: 1px;">
                                <div>
                                    <h2 class="text-left headingcard">${title}</h2>
                                    <p class="descriptioncard">${des}</p>
                                </div>
                                <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 42 43" fill="none">
                                            <circle cx="21.0078" cy="21.9062" r="20.5" stroke="white" stroke-opacity="0.07"/>
                                            <path d="M27.7737 22.8052C27.9236 22.6552 28.0078 22.4518 28.0078 22.2398C28.0078 22.0277 27.9236 21.8244 27.7737 21.6744L23.2497 17.1504C23.1759 17.074 23.0877 17.0131 22.9901 16.9712C22.8925 16.9293 22.7876 16.9072 22.6814 16.9063C22.5752 16.9054 22.4699 16.9256 22.3716 16.9658C22.2733 17.006 22.1841 17.0654 22.109 17.1405C22.0339 17.2156 21.9745 17.3049 21.9343 17.4031C21.8941 17.5014 21.8738 17.6067 21.8748 17.7129C21.8757 17.8191 21.8977 17.924 21.9397 18.0216C21.9816 18.1192 22.0425 18.2074 22.1189 18.2812L25.2778 21.4401L14.6871 21.4401C14.475 21.4401 14.2716 21.5243 14.1216 21.6743C13.9717 21.8243 13.8874 22.0277 13.8874 22.2398C13.8874 22.4519 13.9717 22.6553 14.1216 22.8053C14.2716 22.9552 14.475 23.0395 14.6871 23.0395L25.2778 23.0395L22.1189 26.1984C21.9732 26.3492 21.8926 26.5512 21.8944 26.7609C21.8962 26.9706 21.9803 27.1712 22.1286 27.3194C22.2769 27.4677 22.4775 27.5518 22.6872 27.5536C22.8968 27.5555 23.0988 27.4749 23.2497 27.3292L27.7737 22.8052Z" fill="white"/>
                                        </svg>
                                </div>
                            </div>
                        </section>
                                                            </a>
                    </div>`;
            });

            html += '</div></div>';
        }
    } else {
        html = `<div class="row"><div class="col-4 offset-4"><section class=" py-4 px-2 mt-5" style="border-radius: 14px;background: white;color: black !important;">
      <div class="d-flex" style="
         justify-content: space-between;
         gap: 1px;
         border-radius: 10px;
         ">
         <div style="
            display: flex;
            margin: auto;
            ">
            <h2 class="text-center headingcard" style="font-size: 22px;color: black !important;">NO Result Found</h2>
         </div>
      </div>
   </section></div></div>` ;
    }

    document.querySelector('.free_resources').innerHTML = html;
}

// Update your fetch request to include the search functionality
fetch('https://owlapplicationbuilder.com/appsbuilder/profits_and_pizza_website_1580295343903_98/objectsbuilder/api/entities/free_resousces/get_all_en?page=1&page_size=1766&fld=_id&srt=-1&to_search={}&t=true')
    .then(response => response.json())
    .then((data) => {
        var responseData = data.data;
        var filteredData = responseData;

        // Handle search input changes in real-time
        document.getElementById('freeResourcesSearchInput').addEventListener('input', function () {
            var searchTerm = this.value.trim();
            filteredData = filterDataBySearchTermFreeResources(responseData, searchTerm);
            renderResources(filteredData);
        });

        // Initial rendering
        console.log(filteredData);
        renderResources(filteredData);
    })
    .catch(error => console.error(error));


