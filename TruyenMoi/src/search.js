function execute(key, page) {
    if (!page) page = '1';

    let searchUrl = "https://truyenmoikk.com/tim-kiem/?tukhoa=" + key;
    if (page !== '1') {
        searchUrl = "https://truyenmoikk.com/tim-kiem/trang-" + page + "/?tukhoa=" + key;
    }

    let response = fetch(searchUrl);
    
    if (response.ok) {
        let doc = response.html();
        let data = [];
        
        let items = doc.select(".list-truyen .row");
        items.forEach(e => {
            data.push({
                name: e.select(".truyen-title a").text(),
                link: e.select(".truyen-title a").attr("href"),
                cover: e.select("img").attr("src"),
                description: e.select(".author").text(),
                host: "https://truyenmoiyy.com"
            });
        });
        
        let next = doc.select(".pagination .active + li a").text();
        return Response.success(data, next);
    }
    return null;
}