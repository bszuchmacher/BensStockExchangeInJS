class SearchForm {
  constructor(element) {
    this.element = element;
    this.event();
    this.debounce();
  }

  debounce = (starterFunction, bensdelay) => {
    let stillRunning;
    return function (searchInput) {
      if (stillRunning) {
        clearTimeout(stillRunning);
      }
      stillRunning = setTimeout(() => {
        starterFunction(searchInput);
      }, bensdelay);
    };
  };

  dataResultList() {
    let myDiv = document.getElementById("resultsList");
    return myDiv;
  }

  clearResults() {
    document.getElementById("resultsList").innerHTML = " ";
  }

  event() {
    this.element.addEventListener(
      "keyup",
      this.debounce(() => {
        this.loaderOn();
        this.companyInfoFetches(searchInput);
      }, 1000)
    );
  }

  async companyInfoFetches(input) {
    const searchInput = document.getElementById("searchInput").value;
    let getInitialCompanyInfo = `https://financialmodelingprep.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ&apikey=ed93f3e229380c530b7a0e7663f86b99`;
    const initialCompanyInfo = await this.initialCompanyInfo(
      getInitialCompanyInfo
    );
    initialCompanyInfo.map((company) => {
      let fullCompanyInfo = `https://financialmodelingprep.com/api/v3/company/profile/${company.symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`;
      fetch(fullCompanyInfo)
        .then((response) => response.json())
        .then((completeCompanyData) => {
          console.log(completeCompanyData);
          new SearchResults(
            company,
            completeCompanyData,
            this.element.value,
            this.dataResultList()
          );
        });
      this.loaderOff();
    });
  }

  async initialCompanyInfo(url) {
    let company = [];
    this.clearResults();
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        company = data;
        return company;
      });
    return company;
  }

  loaderOff() {
    document.getElementById("loader").classList.add("hide");
  }

  loaderOn() {
    document.getElementById("loader").classList.add("show");
  }
}

function loadHTML() {
  const form = document.getElementById(`form`);
  form.insertAdjacentHTML(
    `beforeend`,
    `<div class="container col-12">
    </div>
      <div class="row mt-5">
        <div class="col-12 mt-5 d-flex justify-content-center">
          <h1 class="display-2">Ben's Nasdaq Stock Search!</h1>
        </div>
      </div>
      <div class="row mt-5">
        <div class="offset-2 col-8">
          <div class="input-group mb-3" id="form">
            <input
              type="text"
              id="searchInput"
              class="form-control"
              placeholder="Please input a stock symbol"
              aria-label="Stock Symbol"
            />
            <img src="https://img.icons8.com/color/48/000000/baby-yoda.png"/>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="offset-2 col-8 d-flex justify-content-center">
          <div id="loader" class="loader loader-position"></div>
        </div>
      </div>
      <div class="row">
        <div class="offset-2 col-8">
          <ul id="resultsList" class="list-group list-group-flush"></ul>
        </div>
      </div>
    </div>
    `
  );
}
loadHTML();
new SearchForm(document.getElementById("searchInput"));
