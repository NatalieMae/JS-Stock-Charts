// const { Chart } = require("chart.js");

const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');
    // let stocks = await getStockData();

const fetchStocks = async () => {
    const response = await fetch("https://api.twelvedata.com/stocks");
    const data = await response.json();
    return data.data;
};

new Chart(timeChartCanvas.getContext('2d'), {
    type: 'line',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
            ],
        }]
    }
});

const runMain = async () => {
    const stocks = await fetchStocks();
    console.log("stocks =>", stocks);
};


console.log(Chart)
runMain();
