
async function runMain() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    let stocks = await getStockData();

    stocks.forEach( stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
            label: stock.meta.symbol,
            data: stock.values.map(value => parseFloat(value.high)),
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
            }))     
        }
    });

    new Chart(highestPriceChartCanvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels: stocks.map(stock => stock.meta.symbol),
            datasets: [{
            label: 'Highest',
            data: stocks.map(stock => getHighestPrice(stock.values)),
            backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
            borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
            }]    
        }
    });

    new Chart(averagePriceChartCanvas.getContext('2d'), {
        type: 'line',
        data: {
            labels: stocks[0].values.map(value => value.datetime),
            datasets: stocks.map( stock => ({
            label: stock.meta.symbol,
            data: stock.values.map(value => parseFloat(value.high)),
            backgroundColor: getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
            }))     
        }
    });
    function getColor(stock){
        if(stock === "GME"){
            return 'rgba(61, 161, 61, 0.7)'
        }
        if(stock === "MSFT"){
            return 'rgba(209, 4, 25, 0.7)'
        }
        if(stock === "DIS"){
            return 'rgba(18, 4, 209, 0.7)'
        }
        if(stock === "BNTX"){
            return 'rgba(166, 43, 158, 0.7)'
        }
    }
    function getHighestPrice(values) {
        let highest = 0;
    for (let i=0; i<values.length; i++){
        if (values[i].high > highest) highest = values[i].high;
    }
    return highest;
}
    } 

    async function getStockData(){
        let authID = '################################';
        let symbols = 'GME,MSFT,DIS,BNTX';
        let api = `https://api.twelvedata.com/time_series?symbol=${symbols}&interval=1day&apikey=${authID}&source=docs`;
        const { GME, MSFT, DIS, BNTX } = mockData;
        return [GME, MSFT, DIS, BNTX];
    }

const fetchStocks = async () => {
    const response = await fetch("https://api.twelvedata.com/stocks");
    const data = await response.json();
    return data.data;
};



// const runMain = async () => {
//     const stocks = await fetchStocks();
//     console.log("stocks =>", stocks);
// };


runMain();
