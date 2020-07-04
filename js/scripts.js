const searchButton = document.getElementById("searchButton");

function loaderOn() {
  document.getElementById("loader").classList.add("show");
}

function loaderOff() {
  document.getElementById("loader").classList.add("hide");
}

function createResultsData(data) {
  fetch(
    `https://financialmodelingprep.com/api/v3/company/profile/${data.symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`
  ).then((response) =>
    response.json().then((data) => {
      let a = document.createElement("a");
      document.getElementById("resultsList").appendChild(a);
      a.classList.add("list-group-item");
      a.setAttribute("href", `./company.html?symbol=${data.symbol}`);

      const image = document.createElement("img");
      image.classList.add("companyLogo");
      companyImage = data.profile.image;
      image.src = companyImage;
      a.appendChild(image);

      const companyName = document.createElement("span");
      companyName.classList.add("wordSpacing");
      companyName.textContent = data.profile.companyName;
      a.appendChild(companyName);

      const symbol = document.createElement("span");
      symbol.classList.add("wordSpacing");
      symbol.innerText = "(" + data.symbol + ")";
      a.appendChild(symbol);

      const price = document.createElement("span");
      price.classList.add("wordSpacing");
      price.classList.add("black");
      price.textContent = `   $${data.profile.price}   `;
      a.appendChild(price);

      const changesPercentage = document.createElement("span");
      const percentChange = data.profile.changesPercentage;
      changesPercentage.textContent = "(" + percentChange + ")";
      if (percentChange.includes("+")) {
        changesPercentage.classList.add("green");
      } else if (percentChange.includes("-")) {
        changesPercentage.classList.add("red");
      } else {
        changesPercentage.classList.add("black");
      }
      a.appendChild(changesPercentage);
    })
  );

  loaderOff();
}

function getInitialSearchResults(searchInput) {
  let searchInput = document.getElementById("searchInput").value;
  let url = `https://financialmodelingprep.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ&apikey=ed93f3e229380c530b7a0e7663f86b99`;
  loaderOn();
  fetch(url)
    .then((response) => response.json())
    .then((initialCompanyInfo) => {
      initialCompanyInfo.map((item) => {
        createResultsData(item);
      });
    });
}
searchButton.addEventListener("click", getInitialSearchResults);
