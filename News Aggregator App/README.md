<h2>News Aggregator App</h2>
        <h3>Mô tả</h3>
        <p><i>Lưu ý chọn danh mục hoặc có thể nhập vào input để tìm kiếm tin tức liên quan </i></p>
        <img src= "https://github.com/user-attachments/assets/f33c13e0-c7ad-40d6-9501-30bba1301be1"/> 
        <br>
        <br>    
        <p>Kết quả trả về </p>
        <img src="https://github.com/user-attachments/assets/13948e7a-b384-49b9-a9f5-69c7d9669402"/>
        <br>
        <br>
        

 <p>Thay APIKey cá nhân</p>

         cconst APIKey = "";
        
<p>Tùy chỉnh đường dẫn khi tìm kiếm hay lấy tin tức theo thể loại</p>

      if (isSearching) {
        const keyword = document.getElementById("searchKeyword").value;
        url = `https://newsapi.org/v2/everything?q=${keyword}&apiKey=${APIKey}&page=${currentPage}`;
      } else {
        const category =
          currentCategory || document.getElementById("category").value;
        url = `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${APIKey}&page=${currentPage}`;
      }


<p>Fetch dữ liệu từ url bên trên isSearching</p>


        fetch(url)
            .then((response) => response.json())
            .then((data) => {
              const newsContainer = document.getElementById("newsContainer");
        ...

