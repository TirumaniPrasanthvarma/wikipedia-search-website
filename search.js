let si = document.getElementById('searchInput');
let myres = document.getElementById('searchResults');
let but = document.getElementById('bt');
let spinner = document.getElementById('spinner');

function create(content) {
    myres.innerHTML = content;
}

function fetchWiki(title) {
    let url = "https://en.wikipedia.org/api/rest_v1/page/html/" + encodeURIComponent(title);
    spinner.classList.remove("d-none");

    fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (data) {
            spinner.classList.add("d-none");
            create(data);
        });
}

function searchWiki(result) {
    let searchApi = "https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srsearch=" + encodeURIComponent(result);
    spinner.classList.remove("d-none");

    fetch(searchApi)
        .then(function (res) {
            return res.json();
        })
        .then(function (searchData) {
            let title = searchData.query?.search?.[0]?.title;

            if (!title) {
                spinner.classList.add("d-none");
                myres.innerHTML = "<p class='text-danger'>No matching article found.</p>";
                return;
            }

            fetchWiki(title);
        });
}

function searchres(event) {
    if (event.key === "Enter" || event.type === "click") {
        let result = si.value.trim();

        if (result === "") {
            myres.innerHTML = "<p class='text-warning'>Please enter something to search.</p>";
            return;
        }

        searchWiki(result);
    }
}

si.addEventListener("keydown", searchres);
but.addEventListener("click", searchres);
