const searchInput = document.getElementById('search-input');
const searchResults = document.getElementById('search-results');
const defaultText = document.getElementById('default-one');
const allTitlesAndParagraphs = document.querySelectorAll('.banner-title, .title');


searchInput.addEventListener('input', function() {
  const searchTerm = this.value.toLowerCase();
  const matchingElements = [];

  allTitlesAndParagraphs.forEach(function(element) {
    const text = element.textContent.toLowerCase();

    if (text.includes(searchTerm)) {
      matchingElements.push(element);
    }
  });

  displaySearchResults(matchingElements);
});


const linkForSearch = banner.querySelector('a');

function displaySearchResults(elements) {
  if (elements.length > 0) {
    searchResults.innerHTML = '';

    elements.forEach(function(element) {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.textContent = element.textContent;
      const articleUrl = window.articleUrl;
      link.href = articleUrl;
      link.target = "_blank"; // Open link in a new tab
      link.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent the click event from bubbling up
      });
      li.appendChild(link);
      searchResults.appendChild(li);
    });

    searchResults.style.display = 'block';
  } else {
    searchResults.style.display = 'none';
  }
}


function getElementPath(element) {
  let path = '';
  const classList = Array.from(element.classList);

  classList.forEach(function(className) {
    path += '.' + className;
  });

  return path;
}

document.addEventListener('click', function(event) {
  const target = event.target;

  if (target !== searchInput) {
    searchResults.style.display = 'none';
  }
});
