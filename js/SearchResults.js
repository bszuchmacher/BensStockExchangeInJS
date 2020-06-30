class SearchResults {
  constructor(company, data, input, parent) {
    this.company = company;
    this.data = data;
    this.input = input;
    this.parent = parent;
    this.appendCompany();
  }
  appendCompany() {
    let stockImage = this.data.profile.image;
    let containerDiv = document.createElement("div");
    containerDiv.classList.add("mainDivStyle");
    let innerDiv = document.createElement("div");
    innerDiv.classList.add("listStyle");
    let logo = document.createElement("img");
    logo.src = stockImage;
    logo.classList.add("logoSize");
    let price = document.createElement("span");
    price.classList.add("black");
    price.textContent = `   $${this.data.profile.price}   `;
    let line = document.createElement("a");
    line.href = "company.html?symbol=" + this.company.symbol;
    line.target = "_blank";
    line.textContent += this.company.name;
    let symbol = document.createElement("span");
    symbol.textContent = " (" + this.company.symbol + ")";
    line.appendChild(price);
    let changesPercentage = document.createElement("span");
    let percentChange = this.data.profile.changesPercentage;
    changesPercentage.textContent = "(" + percentChange + ")";
    if (percentChange.includes("+")) {
      changesPercentage.classList.add("green");
    } else if (percentChange.includes("-")) {
      changesPercentage.classList.add("red");
    } else {
      changesPercentage.classList.add("black");
    }
    let compareDiv = document.createElement("span");
    let compareButton = document.createElement("button");
    compareButton.classList.add("btn");
    compareButton.classList.add("btn-info");
    compareButton.innerText = "Compare";
    compareButton.addEventListener("click", (ev) => this.Compare(ev));

    innerDiv.appendChild(logo);
    line.appendChild(symbol);
    line.innerHTML = this.highlight(this.input, line.innerHTML);
    line.appendChild(changesPercentage);
    innerDiv.appendChild(line);
    compareDiv.appendChild(compareButton);
    containerDiv.appendChild(innerDiv);
    containerDiv.appendChild(compareDiv);
    this.parent.appendChild(containerDiv);
  }

  highlight(input, text) {
    const newText = text.replace(
      new RegExp(input, "gi"),
      (matchedText) => `<mark>${matchedText}</mark>`
    );
    return newText;
  }

  Compare() {
    console.log(this.Compare());
  }
}
