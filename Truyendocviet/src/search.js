function execute(key, page) {

    if (!page) page = "1";

    var url = page == "1"
        ? "https://truyendocviet1.xyz/tim-kiem.html?q=" + key
        : "https://truyendocviet1.xyz/tim-kiem/page-" + page + ".html?q=" + key;
    console.log(url);
    var browser = Engine.newBrowser();

    browser.launch(url, 20000);

    var html = browser.html();

    browser.close();

    var doc = Html.parse(html);

    var data = [];

    var items = doc.select(".sg-product");

    for (var i = 0; i < items.size(); i++) {

        var a = items.get(i).select(".product-info h3 a");

        data.push({
            name: a.text(),
            url: "https://truyendocviet1.xyz" + a.attr("href")
        });
    }

    var next = (parseInt(page) + 1).toString();

    if (data == null) return Response(data);
    return Response.success(data, next);
}