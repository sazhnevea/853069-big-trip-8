import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 55;

export default class Stats {
  constructor(ctx, data, title) {
    this._ctx = ctx;
    this._ctx.height = null;
    this._title = title;
    this._statLabels = [];
    this._statData = [];
    this._data = data;
    this._element = null;
    // this._numPoints = data.events.length;

  }


  render() {
    this.setFilteredData(this._title);
    this._ctx.height = BAR_HEIGHT * this._statData.length;
    this._element = new Chart(this._ctx, this.configChart);
    return this._element;
  }

  unrender() {
    this._element = null;
  }

  setFilteredData(title) {
    switch (title) {
      case `transport`:
        return this.getTransportData();

      case `money`:
        return this.getMoneyData();

      case `time spent`:
        return this.getTimeSpentData();
    }
  }

  getTransportData() {
    this._data.forEach((it) => {
      this._statLabels.push(it.title.split(` `)[0]);
      this._statData.push(it.price);
    });
  }

  get configChart() {
    return {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: this._statLabels,
        datasets: [{
          data: this._statData,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter: (val) => `${val}x`
          }
        },
        title: {
          display: true,
          text: this._title.toUpperCase(),
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    };
  }
}
