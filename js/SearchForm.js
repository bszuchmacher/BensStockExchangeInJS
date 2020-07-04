const searchInput = document.createElement("input");
const searchButton = document.createElement("button");

class SearchForm {
  constructor(main, companies) {
    this.main = main;
    this.companies = companies;
    this.createSearchForm();
  }

  createSearchForm() {
    searchInput.setAttribute("type", "text");
    searchInput.setAttribute("placeholder", "Search");
    searchInput.setAttribute("aria-label", "Search");
    searchInput.classList.add("form-control");
    searchInput.id = "input-search";
    searchButton.classList.add("btn", "btn-danger");
    searchButton.id = "searchButton";
    searchButton.textContent = "Search";
    searchInput.appendChild(searchButton);

    const loader = document.createElement("loader");
    loader.classList.add("spinner-border", "hide");
    loader.setAttribute("role", "status");
    loader.id = "loader";
    this.main.append(searchInput, searchButton, loader);
  }

  onSearch() {
    searchButton.addEventListener("click", () => {
      loader.classList.remove("hide");
      document.getElementById("resultsList").innerText = "";
      fetch(
        `https://financialmodelingprep.com/api/v3/search?query=${searchInput.value}&limit=10&exchange=NASDAQ&apikey=ed93f3e229380c530b7a0e7663f86b99`
      )
        .then((response) => response.json())
        .then((companyData) => {
          this.companies = companyData;
          this.getNewSearchResults(companyData);
          loader.classList.add("hide");
        });
    });
  }

  getNewSearchResults(companies) {
    const result = new SearchResults(document.getElementById("resultsList"));
    result.displayResults(companies);
  }
}
