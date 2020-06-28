class Marquee {
    constructor(stockResult) {
      this.stockResult = stockResult;
    }
  
    getMarqueeDataFromFetch() {
      fetch(
        `https://financialmodelingprep.com/api/v3/stock/real-time-price?apikey=ed93f3e229380c530b7a0e7663f86b99`
      )
        .then((response) => response.json())
        .then((data) => {
          let dataResultFromFetch = data.stockList;
          dataResultFromFetch.forEach((stockResult) => {
            this.placeHolderForStockInfo(stockResult);
          });
        });
    }
  
    placeHolderForStockInfo(stockResult) {
      const symbol = stockResult.symbol;
      const price = stockResult.price;
      const symbolTextLocation = document.createElement("span");
      symbolTextLocation.classList.add("symbolText");
      const priceInfoLocation = document.createElement("span");
      priceInfoLocation.classList.add("green");
      symbolTextLocation.textContent += "" + symbol + " - ";
      priceInfoLocation.textContent += "$" + price + "  || ";
      this.stockResult.appendChild(symbolTextLocation);
      this.stockResult.appendChild(priceInfoLocation);
    }
  }
  
  const myMarquee = new Marquee(document.getElementById("stockTicker"));
  myMarquee.getMarqueeDataFromFetch();
  