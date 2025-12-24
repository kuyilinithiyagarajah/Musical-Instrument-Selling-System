// Financial Charts JavaScript
class FinancialCharts {
    constructor() {
        this.charts = {};
        this.financialData = [];
        this.init();
    }

    async init() {
        await this.loadFinancialData();
        this.setupEventListeners();
        this.initializeCharts();
        this.updateSummaryCards();
        this.populateRecentRecords();
    }

    // Load financial data from API
    async loadFinancialData() {
        try {
            this.showLoading();
            const response = await fetch('/financial-records');
            if (!response.ok) throw new Error('Failed to fetch financial data');

            this.financialData = await response.json();
            this.hideLoading();
        } catch (error) {
            console.error('Error loading financial data:', error);
            this.showError('Failed to load financial data');
            this.hideLoading();
        }
    }

    // Setup event listeners
    setupEventListeners() {
        document.getElementById('backBtn').addEventListener('click', () => {
            window.history.back();
        });

        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.refreshData();
        });

        document.getElementById('exportPdfBtn').addEventListener('click', () => {
            this.exportToPDF();
        });

        // Period change listeners
        document.getElementById('incomeExpensesPeriod').addEventListener('change', () => {
            this.updateIncomeExpensesChart();
        });

        document.getElementById('incomeTrendPeriod').addEventListener('change', () => {
            this.updateIncomeTrendChart();
        });

        document.getElementById('expenseCategoriesPeriod').addEventListener('change', () => {
            this.updateExpenseCategoriesChart();
        });

        document.getElementById('performancePeriod').addEventListener('change', () => {
            this.updatePerformanceChart();
        });
    }

    // Initialize all charts
    initializeCharts() {
        this.initIncomeExpensesChart();
        this.initIncomeTrendChart();
        this.initExpenseCategoriesChart();
        this.initPerformanceChart();
    }

    // Income vs Expenses Chart
    initIncomeExpensesChart() {
        const ctx = document.getElementById('incomeExpensesChart').getContext('2d');
        const data = this.getIncomeExpensesData('monthly');

        this.charts.incomeExpenses = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Income',
                        data: data.income,
                        backgroundColor: 'rgba(34, 197, 94, 0.8)',
                        borderColor: 'rgba(34, 197, 94, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Expenses',
                        data: data.expenses,
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        borderColor: 'rgba(239, 68, 68, 1)',
                        borderWidth: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Income vs Expenses Comparison'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Income Trend Chart
    initIncomeTrendChart() {
        const ctx = document.getElementById('incomeTrendChart').getContext('2d');
        const data = this.getIncomeTrendData('last6months');

        this.charts.incomeTrend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Income Trend',
                    data: data.values,
                    borderColor: 'rgba(59, 130, 246, 1)',
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Income Trend Over Time'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Expense Categories Chart
    initExpenseCategoriesChart() {
        const ctx = document.getElementById('expenseCategoriesChart').getContext('2d');
        const data = this.getExpenseCategoriesData('thisMonth');

        this.charts.expenseCategories = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: data.labels,
                datasets: [{
                    data: data.values,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.8)',
                        'rgba(54, 162, 235, 0.8)',
                        'rgba(255, 205, 86, 0.8)',
                        'rgba(75, 192, 192, 0.8)',
                        'rgba(153, 102, 255, 0.8)',
                        'rgba(255, 159, 64, 0.8)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 205, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    title: {
                        display: true,
                        text: 'Expense Distribution by Category'
                    }
                }
            }
        });
    }

    // Performance Chart
    initPerformanceChart() {
        const ctx = document.getElementById('performanceChart').getContext('2d');
        const data = this.getPerformanceData('monthly');

        this.charts.performance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [
                    {
                        label: 'Net Income',
                        data: data.netIncome,
                        borderColor: 'rgba(34, 197, 94, 1)',
                        backgroundColor: 'rgba(34, 197, 94, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Cumulative Balance',
                        data: data.cumulative,
                        borderColor: 'rgba(147, 51, 234, 1)',
                        backgroundColor: 'rgba(147, 51, 234, 0.1)',
                        fill: false,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Financial Performance Over Time'
                    }
                },
                scales: {
                    y: {
                        ticks: {
                            callback: function(value) {
                                return '$' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    // Get Income vs Expenses data
    getIncomeExpensesData(period) {
        const now = new Date();
        const months = [];
        const income = [];
        const expenses = [];

        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            months.push(monthName);

            const monthIncome = this.financialData
                .filter(record =>
                    record.type === 'INCOME' &&
                    !record.deleted &&
                    new Date(record.createdAt || now).getMonth() === date.getMonth() &&
                    new Date(record.createdAt || now).getFullYear() === date.getFullYear()
                )
                .reduce((sum, record) => sum + (record.amount || 0), 0);

            const monthExpenses = this.financialData
                .filter(record =>
                    record.type === 'EXPENSE' &&
                    !record.deleted &&
                    new Date(record.createdAt || now).getMonth() === date.getMonth() &&
                    new Date(record.createdAt || now).getFullYear() === date.getFullYear()
                )
                .reduce((sum, record) => sum + (record.amount || 0), 0);

            income.push(monthIncome);
            expenses.push(monthExpenses);
        }

        return { labels: months, income, expenses };
    }

    // Get Income Trend data
    getIncomeTrendData(period) {
        const months = [];
        const values = [];
        const now = new Date();
        const periodMonths = period === 'last6months' ? 6 : period === 'last12months' ? 12 : 24;

        for (let i = periodMonths - 1; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            months.push(monthName);

            const monthIncome = this.financialData
                .filter(record =>
                    record.type === 'INCOME' &&
                    !record.deleted &&
                    new Date(record.createdAt || now).getMonth() === date.getMonth() &&
                    new Date(record.createdAt || now).getFullYear() === date.getFullYear()
                )
                .reduce((sum, record) => sum + (record.amount || 0), 0);

            values.push(monthIncome);
        }

        return { labels: months, values };
    }

    // Get Expense Categories data
    getExpenseCategoriesData(period) {
        const categories = {};
        const now = new Date();

        this.financialData
            .filter(record => record.type === 'EXPENSE' && !record.deleted)
            .forEach(record => {
                const category = this.getCategoryFromTitle(record.title);
                categories[category] = (categories[category] || 0) + (record.amount || 0);
            });

        return {
            labels: Object.keys(categories),
            values: Object.values(categories)
        };
    }

    // Get Performance data
    getPerformanceData(period) {
        const labels = [];
        const netIncome = [];
        const cumulative = [];
        let cumulativeSum = 0;
        const now = new Date();

        for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const monthName = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
            labels.push(monthName);

            const monthIncome = this.financialData
                .filter(record =>
                    record.type === 'INCOME' &&
                    !record.deleted &&
                    new Date(record.createdAt || now).getMonth() === date.getMonth() &&
                    new Date(record.createdAt || now).getFullYear() === date.getFullYear()
                )
                .reduce((sum, record) => sum + (record.amount || 0), 0);

            const monthExpenses = this.financialData
                .filter(record =>
                    record.type === 'EXPENSE' &&
                    !record.deleted &&
                    new Date(record.createdAt || now).getMonth() === date.getMonth() &&
                    new Date(record.createdAt || now).getFullYear() === date.getFullYear()
                )
                .reduce((sum, record) => sum + (record.amount || 0), 0);

            const monthNet = monthIncome - monthExpenses;
            netIncome.push(monthNet);

            cumulativeSum += monthNet;
            cumulative.push(cumulativeSum);
        }

        return { labels, netIncome, cumulative };
    }

    // Get category from title (simple categorization)
    getCategoryFromTitle(title) {
        const titleLower = title.toLowerCase();
        if (titleLower.includes('food') || titleLower.includes('restaurant') || titleLower.includes('grocery')) return 'Food & Dining';
        if (titleLower.includes('transport') || titleLower.includes('fuel') || titleLower.includes('car')) return 'Transportation';
        if (titleLower.includes('utility') || titleLower.includes('electric') || titleLower.includes('water')) return 'Utilities';
        if (titleLower.includes('rent') || titleLower.includes('mortgage') || titleLower.includes('housing')) return 'Housing';
        if (titleLower.includes('health') || titleLower.includes('medical') || titleLower.includes('hospital')) return 'Healthcare';
        if (titleLower.includes('entertainment') || titleLower.includes('movie') || titleLower.includes('game')) return 'Entertainment';
        return 'Other';
    }

    // Update summary cards
    updateSummaryCards() {
        const totalIncome = this.financialData
            .filter(record => record.type === 'INCOME' && !record.deleted)
            .reduce((sum, record) => sum + (record.amount || 0), 0);

        const totalExpenses = this.financialData
            .filter(record => record.type === 'EXPENSE' && !record.deleted)
            .reduce((sum, record) => sum + (record.amount || 0), 0);

        const netBalance = totalIncome - totalExpenses;
        const totalRecords = this.financialData.filter(record => !record.deleted).length;

        document.getElementById('totalIncome').textContent = '$' + totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 });
        document.getElementById('totalExpenses').textContent = '$' + totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 });
        document.getElementById('netBalance').textContent = '$' + netBalance.toLocaleString('en-US', { minimumFractionDigits: 2 });
        document.getElementById('netBalance').className = `text-2xl font-bold ${netBalance >= 0 ? 'text-green-600' : 'text-red-600'}`;
        document.getElementById('totalRecords').textContent = totalRecords;
    }

    // Populate recent records table
    populateRecentRecords() {
        const recentRecords = this.financialData
            .filter(record => !record.deleted)
            .slice(-10)
            .reverse();

        const tbody = document.getElementById('recentRecordsTable');
        tbody.innerHTML = '';

        recentRecords.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${record.title}</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <span class="inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                record.type === 'INCOME' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }">
                        ${record.type}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    $${(record.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">${record.description || 'No description'}</td>
            `;
            tbody.appendChild(row);
        });
    }

    // Update chart methods
    updateIncomeExpensesChart() {
        const period = document.getElementById('incomeExpensesPeriod').value;
        const data = this.getIncomeExpensesData(period);
        this.charts.incomeExpenses.data.labels = data.labels;
        this.charts.incomeExpenses.data.datasets[0].data = data.income;
        this.charts.incomeExpenses.data.datasets[1].data = data.expenses;
        this.charts.incomeExpenses.update();
    }

    updateIncomeTrendChart() {
        const period = document.getElementById('incomeTrendPeriod').value;
        const data = this.getIncomeTrendData(period);
        this.charts.incomeTrend.data.labels = data.labels;
        this.charts.incomeTrend.data.datasets[0].data = data.values;
        this.charts.incomeTrend.update();
    }

    updateExpenseCategoriesChart() {
        const period = document.getElementById('expenseCategoriesPeriod').value;
        const data = this.getExpenseCategoriesData(period);
        this.charts.expenseCategories.data.labels = data.labels;
        this.charts.expenseCategories.data.datasets[0].data = data.values;
        this.charts.expenseCategories.update();
    }

    updatePerformanceChart() {
        const period = document.getElementById('performancePeriod').value;
        const data = this.getPerformanceData(period);
        this.charts.performance.data.labels = data.labels;
        this.charts.performance.data.datasets[0].data = data.netIncome;
        this.charts.performance.data.datasets[1].data = data.cumulative;
        this.charts.performance.update();
    }

    // Refresh all data
    async refreshData() {
        await this.loadFinancialData();
        this.updateSummaryCards();
        this.populateRecentRecords();

        // Update all charts
        this.updateIncomeExpensesChart();
        this.updateIncomeTrendChart();
        this.updateExpenseCategoriesChart();
        this.updatePerformanceChart();
    }

    // Export to PDF
    async exportToPDF() {
        try {
            this.showLoading();

            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Add title
            pdf.setFontSize(20);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Financial Analytics Report', 20, 20);

            // Add date
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'normal');
            const today = new Date().toLocaleDateString();
            pdf.text(`Generated on: ${today}`, 20, 30);

            // Add summary data
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Financial Summary', 20, 45);

            pdf.setFontSize(11);
            pdf.setFont('helvetica', 'normal');

            const totalIncome = this.financialData
                .filter(record => record.type === 'INCOME' && !record.deleted)
                .reduce((sum, record) => sum + (record.amount || 0), 0);

            const totalExpenses = this.financialData
                .filter(record => record.type === 'EXPENSE' && !record.deleted)
                .reduce((sum, record) => sum + (record.amount || 0), 0);

            const netBalance = totalIncome - totalExpenses;
            const totalRecords = this.financialData.filter(record => !record.deleted).length;

            pdf.text(`Total Income: ${totalIncome.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 20, 55);
            pdf.text(`Total Expenses: ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 20, 65);
            pdf.text(`Net Balance: ${netBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}`, 20, 75);
            pdf.text(`Total Records: ${totalRecords}`, 20, 85);

            // Capture charts as images and add to PDF
            let yPosition = 100;

            // Income vs Expenses Chart
            const incomeExpensesCanvas = document.getElementById('incomeExpensesChart');
            const incomeExpensesImg = incomeExpensesCanvas.toDataURL('image/png', 1.0);
            pdf.addImage(incomeExpensesImg, 'PNG', 20, yPosition, 170, 85);
            yPosition += 95;

            // Add new page if needed
            if (yPosition > 200) {
                pdf.addPage();
                yPosition = 20;
            }

            // Income Trend Chart
            const incomeTrendCanvas = document.getElementById('incomeTrendChart');
            const incomeTrendImg = incomeTrendCanvas.toDataURL('image/png', 1.0);
            pdf.addImage(incomeTrendImg, 'PNG', 20, yPosition, 170, 85);

            // Add new page
            pdf.addPage();
            yPosition = 20;

            // Expense Categories Chart
            const expenseCategoriesCanvas = document.getElementById('expenseCategoriesChart');
            const expenseCategoriesImg = expenseCategoriesCanvas.toDataURL('image/png', 1.0);
            pdf.addImage(expenseCategoriesImg, 'PNG', 20, yPosition, 170, 85);
            yPosition += 95;

            // Performance Chart
            const performanceCanvas = document.getElementById('performanceChart');
            const performanceImg = performanceCanvas.toDataURL('image/png', 1.0);
            pdf.addImage(performanceImg, 'PNG', 20, yPosition, 170, 85);

            // Add new page for data table
            pdf.addPage();

            // Recent records table
            pdf.setFontSize(14);
            pdf.setFont('helvetica', 'bold');
            pdf.text('Recent Financial Records', 20, 20);

            const tableData = this.financialData
                .filter(record => !record.deleted)
                .slice(-20)
                .reverse()
                .map(record => [
                    record.title,
                    record.type,
                    `${(record.amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}`,
                    record.description || 'No description'
                ]);

            pdf.autoTable({
                startY: 30,
                head: [['Title', 'Type', 'Amount', 'Description']],
                body: tableData,
                theme: 'grid',
                styles: { fontSize: 9 },
                columnStyles: {
                    0: { cellWidth: 40 },
                    1: { cellWidth: 25, halign: 'center' },
                    2: { cellWidth: 30, halign: 'right' },
                    3: { cellWidth: 70 }
                }
            });

            // Save the PDF
            pdf.save(`Financial_Analytics_Report_${today.replace(/\//g, '-')}.pdf`);

            this.hideLoading();
            this.showSuccess('PDF report generated successfully!');

        } catch (error) {
            console.error('Error generating PDF:', error);
            this.showError('Failed to generate PDF report');
            this.hideLoading();
        }
    }

    // Utility methods
    showLoading() {
        document.getElementById('loadingSpinner').classList.remove('hidden');
    }

    hideLoading() {
        document.getElementById('loadingSpinner').classList.add('hidden');
    }

    showSuccess(message) {
        this.showNotification(message, 'success');
    }

    showError(message) {
        this.showNotification(message, 'error');
    }

    showNotification(message, type) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            type === 'success'
                ? 'bg-green-500 text-white'
                : 'bg-red-500 text-white'
        }`;

        notification.innerHTML = `
            <div class="flex items-center">
                <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
                <span>${message}</span>
                <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }
}

// Initialize the financial charts when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FinancialCharts();
});