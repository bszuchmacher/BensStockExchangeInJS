class SearchResults {
  constructor(main) {
    this.main = main;
  }

  async createResultsData(symbol, callback) {
    fetch(
      `https://financialmodelingprep.com/api/v3/profile/${symbol}?apikey=ed93f3e229380c530b7a0e7663f86b99`
    )
      .then((response) => response.json())
      .then((data) => {
        this.companyData = data;
        callback(data[0]);
      });
  }

  displayResults(companies) {
    companies.map((company) => {
      this.createResultsData(company.symbol, (companyInfo) => {
        const { image, companyName, changes } = companyInfo;
        const companyLogo = this.displayCompanyLogo(image);
        const companyWebLink = this.displayCompanyWebLink(
          companyInfo.symbol,
          companyName
        );
        const companySymbol = this.displayCompanySymbol(companyInfo.symbol);
        const changeInDollars = this.displayChangeInDollars(changes);
        const companyPrice = this.displayCompanyPrice(companyInfo.price);

        const listCompanies = document.createElement("li");
        listCompanies.className = "listStyle";
        listCompanies.append(companyLogo);
        listCompanies.append(companyWebLink);
        listCompanies.append(companySymbol);
        listCompanies.append(companyPrice);
        listCompanies.append(changeInDollars);
        this.main.append(listCompanies);
      });
      loader.classList.add("hide");
    });
  }
  displayCompanyLogo(image) {
    const companyLogo = document.createElement("img");
    companyLogo.setAttribute("src", image);
    companyLogo.classList = "companylogo";
    companyLogo.classList = "wordSpacing";
    return companyLogo;
  }

  displayCompanyWebLink(symbol, companyName) {
    const companyWebLink = document.createElement("a");
    companyWebLink.href = `./company.html?symbol=${symbol}`;
    companyWebLink.classList = "mainDivStyle";
    companyWebLink.innerHTML = companyName;
    companyWebLink.innerHTML = this.highlight(
      this.userInput,
      companyWebLink.innerHTML
    );
    companyWebLink.target = "_blank";
    return companyWebLink;
  }

  displayCompanyPrice(symbol) {
    const companyPrice = document.createElement("span");
    companyPrice.innerHTML = `($${symbol})`;
    companyPrice.classList = "a";
    companyPrice.classList = "wordSpacing";
    return companyPrice;
  }

  displayCompanySymbol(symbol) {
    const symbolCompany = document.createElement("span");
    symbolCompany.innerHTML = `(${symbol})`;
    symbolCompany.classList = "companySymbol";
    symbolCompany.classList = "wordSpacing";
    return symbolCompany;
  }

  displayChangeInDollars(changes) {
    const dollars = document.createElement("span");
    dollars.innerHTML = `"How much you made or lost in Dollars:" +($${changes})`;
    dollars.classList = "percentChange";
    dollars.classList = "wordSpacing";
    this.setChangeInDollars(changes, dollars);
    return dollars;
  }

  setChangeInDollars(changes, dollars) {
    if (changes !== null && changes < 0) {
      dollars.classList = "red";
    } else {
      dollars.classList = "green";
    }
  }
  highlight(input, text) {
    const newText = text.replace(
      new RegExp(input, "gi"),
      (matchedText) => `<mark>${matchedText}</mark>`
    );
    return newText;
  }
}
