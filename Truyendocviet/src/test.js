function execute(url) {

    var base = url.replace(".html", "") + "/read/chapters.html";

    var browser = Engine.newBrowser();

    // mở trang danh sách chương
    var html = browser.launch(base, 10000).html();
    var doc = Html.parse(html);

    var a = doc.select("tbody tr td:nth-child(2) a").first();

    if (!a) {
        browser.close();
        return null;
    }

    var link = "https://truyendocviet1.xyz" + a.attr("href");

    // mở trang chương
    var chapterHtml = browser.launch(link, 10000).html();

    let allChapters = [];

        // Chọn tất cả các thẻ option bên trong select có id là select_chuong
        let options = Html.parse(chapterHtml).select("select#select_chuong option");

        options.forEach(option => {
            let title = option.text();
            let link = option.attr("value");

            // Kiểm tra và xử lý link nếu là link tương đối (không có domain)
            if (link.startsWith("/")) {
                link = "https://truyendocviet1.xyz" + link;
            }

            // Loại bỏ ký tự khóa 🔒 nếu bạn muốn tên chương sạch hơn
            title = title.replace("🔒", "").trim();

            allChapters.push({
                name: title,
                url: link,
                host: "https://truyendocviet1.xyz"
            });
        });

    browser.close();

    return Response.success(allChapters);
}