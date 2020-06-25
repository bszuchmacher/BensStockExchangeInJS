const urlParams = new URLSearchParams(window.location.search);
const symbol = urlParams.get("symbol");

 function displayCompanyData(data) {
  fetch(
    `https://financialmodelingprep.com/api/v3/company/profile/${symbol}?&apikey=ed93f3e229380c530b7a0e7663f86b99`
  )
    .then((response) => response.json())
    .then(function (data) {
      const {
        companyName,
        industry,
        price,
        description,
        image,
        changesPercentage,
        website,
        sector,
      } = data.profile;
      document.getElementById("companyImage").src = image;
      document.getElementById("companyName").textContent = companyName;
      document.getElementById("companyName").setAttribute("href", `${website}`);
      document.getElementById("industry").textContent = industry;
      document.getElementById("sector").textContent = sector;
      document.getElementById("companyPrice").textContent = `$ ${price}`;
      document.getElementById("companyDescription").textContent = description;
      document.getElementById("percentChange").textContent = changesPercentage;
      if (changesPercentage.includes("+")) {
        document.getElementById("percentChange").classList.add("green");
      }
      if (changesPercentage.includes("-")) {
        document.getElementById("percentChange").classList.add("red");
      }
    });
  //const name = data.profile.companyName;
  // const imageUrl = data.profile.image;
  // const description = data.profile.description;
  // const companyUrl = data.profile.website;
  // const price = data.profile.price;
  // const stockChangePercent = data.profile.changesPercentage;
  // const industry = data.profile.industry;
}
function fetchDataGraph() {
  fetch(
    `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?from=2020-06-12&to=2020-06-24&apikey=ed93f3e229380c530b7a0e7663f86b99`
  ).then((response) =>
    response.json().then((data) => {
      //the array historical contains 2 items... date and closes
      let historical = data.historical;
      let dates = historical.map((companyfetched) => companyfetched.date);
      xDates = dates.slice(Math.max(dates.length - 10, 0));
      let closes = historical.map((companyfetched) => companyfetched.close);
      yPrices = closes.slice(Math.max(closes.length - 10, 0));
      createTheChart(xDates, yPrices);
    })
  );
}
function createTheChart(xDates, yPrices) {
  var ctx = document.getElementById("myChart").getContext("2d");
  var chart = new Chart(ctx, {
    type: "line",
    data: {
      labels: xDates,
      datasets: [
        {
          label: `Price History of ${symbol}`,
          backgroundColor: "rgba(155, 109, 132, 0.2)",
          borderColor: "rgb(0 ,0, 0)",
          data: yPrices,
        },
      ],
    },
  });
}

displayCompanyData(symbol);
fetchDataGraph();
