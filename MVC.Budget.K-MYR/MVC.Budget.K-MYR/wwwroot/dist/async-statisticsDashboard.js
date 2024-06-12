"use strict";
(self["webpackChunkthebudgeteer"] = self["webpackChunkthebudgeteer"] || []).push([["async-statisticsDashboard"],{

/***/ "../../../../../../C\u0000#/GithubRepositories/CodeReviews.MVC.Budget/MVC.Budget.K-MYR/MVC.Budget.K-MYR/ClientApp/src/js/statisticsDashboard.js":
/*!*************************************************************************************************************************************************!*\
  !*** ../../../../../../C #/GithubRepositories/CodeReviews.MVC.Budget/MVC.Budget.K-MYR/MVC.Budget.K-MYR/ClientApp/src/js/statisticsDashboard.js ***!
  \*************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StatisticsDashboard)
/* harmony export */ });
/* harmony import */ var chart_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! chart.js */ "../../../../../../C\u0000#/GithubRepositories/CodeReviews.MVC.Budget/MVC.Budget.K-MYR/MVC.Budget.K-MYR/ClientApp/node_modules/chart.js/dist/chart.js");
/* harmony import */ var _utilities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utilities */ "../../../../../../C\u0000#/GithubRepositories/CodeReviews.MVC.Budget/MVC.Budget.K-MYR/MVC.Budget.K-MYR/ClientApp/src/js/utilities.js");
/* harmony import */ var _asyncComponents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./asyncComponents */ "../../../../../../C\u0000#/GithubRepositories/CodeReviews.MVC.Budget/MVC.Budget.K-MYR/MVC.Budget.K-MYR/ClientApp/src/js/asyncComponents.js");
﻿
chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart.register(chart_js__WEBPACK_IMPORTED_MODULE_0__.BarController, chart_js__WEBPACK_IMPORTED_MODULE_0__.BarElement, chart_js__WEBPACK_IMPORTED_MODULE_0__.CategoryScale, chart_js__WEBPACK_IMPORTED_MODULE_0__.LinearScale, chart_js__WEBPACK_IMPORTED_MODULE_0__.LineController, chart_js__WEBPACK_IMPORTED_MODULE_0__.LineElement, chart_js__WEBPACK_IMPORTED_MODULE_0__.PointElement, chart_js__WEBPACK_IMPORTED_MODULE_0__.DoughnutController, chart_js__WEBPACK_IMPORTED_MODULE_0__.ArcElement);



class StatisticsDashboard {
    #data;
    #initPromise;
    #isLoading;
    #yearPicker
    #sentimentChartYearly;
    #necessityChartYearly;
    #sentimentBarChart;
    #necessityBarChart;
    #overspendingChart;
    #totalSpentChart;
    #overspendingHeading; 

    constructor(id, year) {
        this.#data = null;
        this.#initPromise = this.#init(id, year);
    }

    async #init(id, year) {
        try {
            this.#isLoading = true;
            this.#initializeDatePicker(id, year);
            this.#sentimentChartYearly = new chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart(document.getElementById('sentimentChartYear'), {
                type: 'doughnut',
                data: {
                    labels: [
                        'Happy',
                        'Unhappy'
                    ],
                    datasets: [{
                        label: 'Total Amount',
                        data: [0, 0],
                        backgroundColor: [
                            'rgb(25,135,84)',
                            'rgb(220,53,69)'
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += window.userNumberFormat.format(context.parsed);
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });

            this.#necessityChartYearly = new chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart(document.getElementById('necessityChartYear'), {
                type: 'doughnut',
                data: {
                    labels: [
                        'Necessary',
                        'Unnecessary'
                    ],
                    datasets: [{
                        label: 'Total Amount',
                        data: [0, 0],
                        backgroundColor: [
                            'rgb(25,135,84)',
                            'rgb(220,53,69)'
                        ],
                        hoverOffset: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += window.userNumberFormat.format(context.parsed);
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });

            this.#sentimentBarChart = new chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart(document.getElementById('sentimentLineChartYear'), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez",],
                    datasets: [{
                        label: 'Happy',
                        stack: 'Unevaluated',
                        borderWidth: 2,
                        borderColor: '#d3d3d3',
                        backgroundColor: '#20c997',
                    },
                    {
                        label: 'Unhappy',
                        stack: 'Unevaluated',
                        borderWidth: 2,
                        borderColor: '#d3d3d3',
                        backgroundColor: 'rgb(220,53,69)'
                    },
                    {
                        label: 'Happy (Eval.)',
                        stack: 'Evaluated',
                        borderWidth: 2,
                        borderColor: '#d3d3d3',
                        backgroundColor: '#0f7c5c',
                    },
                    {
                        label: 'Unhappy (Eval.)',
                        stack: 'Evaluated',
                        borderWidth: 2,
                        borderColor: '#d3d3d3',
                        backgroundColor: '#881d27',
                    },
                    {
                        label: 'Unevaluated',
                        stack: 'Evaluated',
                        borderWidth: 2,
                        borderColor: '#d3d3d3',
                        backgroundColor: '#1c1c1c',
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            border: {
                                color: '#d3d3d3',
                            },
                            grid: {
                                color: '#d3d3d3',
                                lineWidth: 0.2,
                            },
                            ticks: {
                                color: '#d3d3d3',
                                callback: function (value, index, ticks) {
                                    return window.userNumberFormat.format(value);
                                }
                            }
                        },
                        x: {
                            border: {
                                color: '#d3d3d3',
                            },
                            grid: {
                                display: false,
                                tickColor: '#d3d3d3',
                            },
                            ticks: {
                                color: '#d3d3d3',
                            }
                        },
                    },
                    plugins: {
                        emptypiechart: false,
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += window.userNumberFormat.format(context.parsed.y);
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });

            this.#necessityBarChart = new chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart(document.getElementById('necessityLineChartYear'), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez",],
                    datasets: [{
                        label: 'Necessary',
                        stack: 'Unevaluated',
                        backgroundColor: '#20c997',
                        borderWidth: 2,
                        borderColor: '#d3d3d3',

                    },
                    {
                        label: 'Unnecessary',
                        stack: 'Unevaluated',
                        backgroundColor: 'rgb(220,53,69)',
                        borderWidth: 2,
                        borderColor: '#d3d3d3',

                    },
                    {
                        label: 'Necessary (Eval.)',
                        stack: 'Evaluated',
                        backgroundColor: '#0f7c5c',
                        borderWidth: 2,
                        borderColor: '#d3d3d3',

                    },
                    {
                        label: 'Unnecessary (Eval.)',
                        stack: 'Evaluated',
                        backgroundColor: '#881d27',
                        borderWidth: 2,
                        borderColor: '#d3d3d3',
                    },
                    {
                        label: 'Unevaluated',
                        stack: 'Evaluated',
                        borderWidth: 2,
                        borderColor: '#d3d3d3',
                        backgroundColor: '#1c1c1c'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            border: {
                                color: '#d3d3d3',
                            },
                            grid: {
                                color: '#d3d3d3',
                                lineWidth: 0.2,
                            },
                            ticks: {
                                color: '#d3d3d3',
                                callback: function (value, index, ticks) {
                                    return window.userNumberFormat.format(value);
                                }
                            }
                        },
                        x: {
                            border: {
                                color: '#d3d3d3',
                            },
                            grid: {
                                display: false,
                                tickColor: '#d3d3d3',
                            },
                            ticks: {
                                color: '#d3d3d3',
                            }
                        },
                    },
                    plugins: {
                        emptypiechart: false,
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += window.userNumberFormat.format(context.parsed.y);
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });

            this.#overspendingChart = new chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart(document.getElementById('overspendingChart'), {
                type: 'bar',
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez",],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Monthly Overspending Per Category'
                        }
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    indexAxis: 'y',
                    scales: {
                        x: {
                            stacked: true,
                            border: {
                                color: '#d3d3d3',
                            },
                            grid: {
                                color: '#d3d3d3',
                                lineWidth: 0.2,
                            },
                            ticks: {
                                color: '#d3d3d3',
                                callback: function (value, index, ticks) {
                                    return window.userNumberFormat.format(value);
                                }
                            }
                        },
                        y: {
                            stacked: true,
                            border: {
                                color: '#d3d3d3',
                            },
                            grid: {
                                display: false,
                                tickColor: '#d3d3d3',

                            },
                            ticks: {
                                color: '#d3d3d3',
                            }
                        }
                    },
                    plugins: {
                        emptypiechart: false,
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    let label = context.dataset.label || '';

                                    if (label) {
                                        label += ': ';
                                    }
                                    if (context.parsed.y !== null) {
                                        label += window.userNumberFormat.format(context.parsed.x);
                                    }
                                    return label;
                                }
                            }
                        }
                    }
                }
            });

            this.#overspendingHeading = document.getElementById('statistics-overspending');
            this.#overspendingHeading.textContent = `Overspending: ${window.userNumberFormat.format(0)}`;

            this.#totalSpentChart = new chart_js__WEBPACK_IMPORTED_MODULE_0__.Chart(document.getElementById('totalSpentChart'), {
                type: 'line',
                data: {
                    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dez",],
                    datasets: [{
                        label: 'Total Spent Per Month',
                        borderWidth: 2,
                        borderColor: '#d3d3d3',
                        backgroundColor: '#20c997'

                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            border: {
                                color: '#d3d3d3',
                            },
                            grid: {
                                color: '#d3d3d3',
                                lineWidth: 0.2,
                            },
                            ticks: {
                                color: '#d3d3d3',
                                callback: function (value, index, ticks) {
                                    return window.userNumberFormat.format(value);
                                }
                            }
                        },
                        x: {
                            border: {
                                color: '#d3d3d3',
                            },
                            grid: {
                                display: false,
                                tickColor: '#d3d3d3',
                            },
                            ticks: {
                                color: '#d3d3d3',
                            }
                        },
                    },
                    plugins: {
                        emptypiechart: false,
                    }
                }
            });            

            let data = await this.#getData(id, year);
            this.#updateCharts(data);

        } finally {
            this.#isLoading = false;
        }
    }

    async refresh(id, year) {
        try {
            if (this.#isLoading) {
                console.log("Dashboard is loading...")
                return false;
            }

            this.#isLoading = true;
            let data = await this.#getData(id, year);
            this.#updateCharts(data);
        } finally {
            this.#isLoading = false;
        }
    }

    async #getData(id, year) {
        try {
            let response = await fetch(`https://localhost:7246/api/FiscalPlan/${id}/${year.getFullYear()}`, {
                method: "GET"
            });

            if (response.ok) {
                return await response.json();
            } else {
                console.error(`HTTP GET Error: ${response.status}`);
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    #updateCharts(data) {
        let dataObj = data ?? this.#data;

        if (dataObj == null) {
            return false;
        }

        this.#sentimentChartYearly.data.datasets[0].data = [data.happyEvaluatedTotal, data.unhappyEvaluatedTotal, Number.MIN_VALUE];
        this.#sentimentChartYearly.update();

        this.#necessityChartYearly.data.datasets[0].data = [data.necessaryEvaluatedTotal, data.unnecessaryEvaluatedTotal, Number.MIN_VALUE]
        this.#necessityChartYearly.update();

        this.#sentimentBarChart.data.datasets[0].data = data.happyPerMonth;
        this.#sentimentBarChart.data.datasets[1].data = data.unhappyPerMonth;
        this.#sentimentBarChart.data.datasets[2].data = data.happyEvaluatedPerMonth;
        this.#sentimentBarChart.data.datasets[3].data = data.unhappyEvaluatedPerMonth;
        this.#sentimentBarChart.data.datasets[4].data = data.unevaluatedPerMonth;
        this.#sentimentBarChart.update();

        this.#necessityBarChart.data.datasets[0].data = data.necessaryPerMonth;
        this.#necessityBarChart.data.datasets[1].data = data.unnecessaryPerMonth;
        this.#necessityBarChart.data.datasets[2].data = data.necessaryEvaluatedPerMonth;
        this.#necessityBarChart.data.datasets[3].data = data.unnecessaryEvaluatedPerMonth;
        this.#necessityBarChart.data.datasets[4].data = data.unevaluatedPerMonth;
        this.#necessityBarChart.update();

        let datasets = [];

        for (let i = 0; i < data.monthlyOverspendingPerCategory.length; i++) {
            let categoryData = data.monthlyOverspendingPerCategory[i];
            datasets.push({
                label: categoryData.category,
                data: categoryData.overspendingPerMonth,
                borderWidth: 2,
                borderColor: '#d3d3d3',
                backgroundColor: (0,_utilities__WEBPACK_IMPORTED_MODULE_1__.getRandomColor)()
            });
        }

        this.#overspendingChart.data.datasets = datasets;
        this.#overspendingChart.update();

        this.#overspendingHeading.textContent = `Overspending: ${window.userNumberFormat.format(data.overspendingTotal)}`;

        this.#totalSpentChart.data.datasets[0].data = data.totalPerMonth;
        this.#totalSpentChart.update();
        
        this.#data = data;
    }

    async #initializeDatePicker(id, year) {
        let self = this;
        this.#yearPicker = await (0,_asyncComponents__WEBPACK_IMPORTED_MODULE_2__.getDatePicker)("#statistics-yearSelector");
        this.#yearPicker.datepicker('setDate', year.toISOString());

        this.#yearPicker.on('changeDate', async function () {
            self.refresh(id, self.#yearPicker.datepicker('getUTCDate'))
        });
    }
}


/***/ })

}]);
//# sourceMappingURL=async-statisticsDashboard.js.map