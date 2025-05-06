// Debugging: Log when dark mode is toggled
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');

    // Apply dark mode to the trending section
    const trendingSection = document.getElementById('trending');
    if (trendingSection) {
        trendingSection.classList.toggle('dark-mode');
        console.log('Dark mode toggled for #trending:', trendingSection.classList.contains('dark-mode'));
    }

    // Apply dark mode to the latest posts section
    const latestPostsSection = document.getElementById('latest-posts');
    if (latestPostsSection) {
        latestPostsSection.classList.toggle('dark-mode');
        console.log('Dark mode toggled for #latest-posts:', latestPostsSection.classList.contains('dark-mode'));
    }

    // Toggle dark mode for other elements
    document.querySelectorAll('#search-input, #search-button, header').forEach(element => {
        element.classList.toggle('dark-mode');
    });
}

// Add real-time search functionality
document.getElementById('search-input').addEventListener('input', function () {
    const query = this.value.toLowerCase();
    document.querySelectorAll('.post').forEach(post => {
        const postContent = post.textContent.toLowerCase();
        if (postContent.includes(query)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
});

const postsPerPage = 3;
let currentPage = 1;

function showPage(page) {
  const posts = document.querySelectorAll('.post');
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Hide all posts
  posts.forEach((post, index) => {
    post.style.display = 'none';
    if (index >= (page - 1) * postsPerPage && index < page * postsPerPage) {
      post.style.display = 'block';
    }
  });

  // Update page info
  document.getElementById('page-info').textContent = `Page ${page} of ${totalPages}`;

  // Disable buttons if on first or last page
  document.querySelector('.prev-btn').disabled = page === 1;
  document.querySelector('.next-btn').disabled = page === totalPages;
}

function changePage(direction) {
  const posts = document.querySelectorAll('.post');
  const totalPages = Math.ceil(posts.length / postsPerPage);

  currentPage += direction;
  if (currentPage < 1) currentPage = 1;
  if (currentPage > totalPages) currentPage = totalPages;

  showPage(currentPage);
}

// Initialize pagination
document.addEventListener('DOMContentLoaded', () => {
  showPage(currentPage);
});