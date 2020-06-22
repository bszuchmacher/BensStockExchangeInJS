function loaderOn() {
  document.getElementById("loader").classList.add("show");
}

function loaderOff() {
  document.getElementById("loader").classList.add("hide");
}

function clearResult() {
  document.getElementById("resultsList").innerHTML = " ";
}

async function getInitialSearchResults() {
  clearResult();
  loaderOn();
  const searchInput = document.getElementById("searchInput").value;
  let response = await fetch(
    `https://financialmodelingprep.com/api/v3/search?query=${searchInput}&limit=10&exchange=NASDAQ&apikey=ed93f3e229380c530b7a0e7663f86b99`
  );
  let data = await response.json();
  createResults(data);
  loaderOff();
}

function createResults(data) {
  const resultsList = document.getElementById("resultsList");
  const companyList = data;
  for (let i = 0; i < companyList.length; i++) {
    const symbol = companyList[i].symbol;
    let li = document.createElement("li");
    let companyName = document.createElement("a");
    companyName.setAttribute("href", `./company.html?symbol=${symbol}`);
    companyName.innerText = companyList[i].name;
    let companySymbol = document.createElement("a");
    companyName.setAttribute("href", `./company.html?symbol=${symbol}`);
    companySymbol.innerText = " (" + companyList[i].symbol + ")";
    li.append(companyName, companySymbol);
    resultsList.appendChild(li);
  }
}
document
  .getElementById("searchButton")
  .addEventListener("click", getInitialSearchResults);
