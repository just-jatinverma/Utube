let videoData = []; // Store API data globally

// Function to fetch data from API
async function fetchVideos() {
  try {
    const response = await fetch(
      "https://api.freeapi.app/api/v1/public/youtube/videos"
    );
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const data = await response.json(); // Convert response to JSON
    videoData = data.data.data; // Store data globally
    displayVideos(videoData); // Call function to display videos
  } catch (error) {
    console.error("Error fetching videos:", error);
  }
}

// Function to display videos
function displayVideos(videos) {
  const container = document.getElementById("video-container");
  container.innerHTML = ""; // Clear previous videos

  videos.forEach((video) => {
    const { id, snippet, statistics } = video.items;
    const { title, thumbnails, channelTitle } = snippet;
    const { viewCount, likeCount, commentCount } = statistics;
    const videoUrl = `https://www.youtube.com/watch?v=${id}`;

    // Create Bootstrap Card
    const card = `
                    <div class="col-md-4 video-card">
                        <div class="card">
                            <img src="${
                              thumbnails.high.url
                            }" class="card-img-top" alt="${title}">
                            <div class="card-body">
                                <h5 class="card-title">${title}</h5>
                                <p><strong>Channel:</strong> ${channelTitle}</p>
                                <p><strong>Views:</strong> ${Number(
                                  viewCount
                                ).toLocaleString()}</p>
                                <p><strong>Likes:</strong> ${Number(
                                  likeCount
                                ).toLocaleString()}</p>
                                <p><strong>Comments:</strong> ${Number(
                                  commentCount
                                ).toLocaleString()}</p>
                                <a href="${videoUrl}" target="_blank" class="btn btn-primary">Play Video</a>
                            </div>
                        </div>
                    </div>
                `;

    // Append to container
    container.innerHTML += card;
  });
}

// Function to filter videos based on search input
function filterVideos() {
  const searchQuery = document.getElementById("search").value.toLowerCase();
  const filteredVideos = videoData.filter((video) =>
    video.items.snippet.title.toLowerCase().includes(searchQuery)
  );

  displayVideos(filteredVideos); // Show filtered results
}

// Load videos on page load
fetchVideos();
