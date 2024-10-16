document.addEventListener("DOMContentLoaded", () => {
  const APIKey = "";

  let currentPage = 1;
  let currentCategory = null;
  let currentKeyword = null;
  let isLoading = false;
  let lastArticleCount = 0;

  function fetchNews(isSearching) {
    if (isLoading) return;
    isLoading = true;
    let url;

    // Tùy chỉnh đường dẫn khi tìm kiếm hay lấy tin tức theo thể loại
    if (isSearching) {
      const keyword = document.getElementById("searchKeyword").value;
      url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${APIKey}&page=${currentPage}`;
    } else {
      const category =
        currentCategory || document.getElementById("category").value;
      url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${APIKey}&page=${currentPage}`;
    }

    // fetch dữ liệu từ url bên trên isSearching
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const newsContainer = document.getElementById("newsContainer");

        // Kiểm tra nếu có tin tức mới
        if (currentPage === 1) {
          newsContainer.innerHTML = "";
        }

        const articlesWithImage = data.articles.filter(
          (article) => article.urlToImage
        );
        if (
          articlesWithImage.length === 0 ||
          articlesWithImage.length === lastArticleCount
        ) {
          displayNoMoreNews();
          return;
        }

        lastArticleCount = articlesWithImage.length;

        // Thêm các tin tức vào container
        articlesWithImage.forEach((article) => {
          const newsItem = `
                <div class="newsItem">
                    <div class="newsImage">
                        <img src="${article.urlToImage}" alt="${article.title}">
                    </div>
                    <div class="newsContent">
                        <div class="info">
                            <h5>${article.source.name}</h5>
                            <span>|</span>
                            <h5>${article.publishedAt}</h5>
                        </div>
                        <h2>${article.title}</h2>
                        <p>${article.description}</p>
                        <a href="${article.url}" target="_blank">Xem thêm</a>
                    </div>
                </div>
                `;
          newsContainer.innerHTML += newsItem;
        });

        currentPage ++
        isLoading = false;
      })
      .catch(error =>{
        console.error("Error fetching news data:", error);
        isLoading = false;
      })
  }

  function displayNoMoreNews() {
    const newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML +=
      '<p class="text-center">Không còn tin tức nào trong ngày này.</p>';
  }

  // Xử lý khi người dùng onscroll
  window.onscroll = function () {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 10
    ) {
      if (currentKeyword) {
        fetchNews(true);
      } else {
        fetchNews(false);
      }
    }
  };

  window.fetchNews = fetchNews;

  document.getElementById("searchKeyword").addEventListener("input", function() {
    currentPage = 1;
    currentCategory = null;
    currentKeyword = this.value;
  });

  document.getElementById("fetchCategory").addEventListener("click",function (){
    currentPage = 1;
    currentKeyword = null;
    fetchNews(false);
  });
});
