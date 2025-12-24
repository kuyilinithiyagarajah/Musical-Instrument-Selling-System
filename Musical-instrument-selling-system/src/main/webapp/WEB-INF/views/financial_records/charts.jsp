<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Financial Charts & Analytics</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="/js/financial_records/charts.js" defer></script>
</head>
<body class="bg-gray-100 min-h-screen">
<!-- Navigation -->
<nav class="bg-white shadow-lg mb-6">
    <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between items-center py-4">
            <div class="flex items-center">
                <button id="backBtn" class="mr-4 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                    <i class="fas fa-arrow-left"></i> Back
                </button>
                <h1 class="text-2xl font-bold text-gray-800">
                    <i class="fas fa-chart-line mr-2"></i>Financial Analytics
                </h1>
            </div>
            <div class="flex space-x-2">
                <button id="refreshBtn" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                    <i class="fas fa-sync-alt"></i> Refresh
                </button>
                <button id="exportPdfBtn" class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors">
                    <i class="fas fa-file-pdf"></i> Export PDF
                </button>
            </div>
        </div>
    </div>
</nav>

<!-- Loading Spinner -->
<div id="loadingSpinner" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
    <div class="bg-white p-6 rounded-lg shadow-lg">
        <div class="flex items-center space-x-3">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span class="text-lg">Loading...</span>
        </div>
    </div>
</div>

<!-- Summary Cards -->
<div class="max-w-7xl mx-auto px-4 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                    <i class="fas fa-arrow-up text-xl"></i>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Total Income</p>
                    <p id="totalIncome" class="text-2xl font-bold text-green-600">$0.00</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                    <i class="fas fa-arrow-down text-xl"></i>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Total Expenses</p>
                    <p id="totalExpenses" class="text-2xl font-bold text-red-600">$0.00</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
                    <i class="fas fa-balance-scale text-xl"></i>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Net Balance</p>
                    <p id="netBalance" class="text-2xl font-bold">$0.00</p>
                </div>
            </div>
        </div>

        <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex items-center">
                <div class="p-3 rounded-full bg-purple-100 text-purple-600 mr-4">
                    <i class="fas fa-receipt text-xl"></i>
                </div>
                <div>
                    <p class="text-sm text-gray-600">Total Records</p>
                    <p id="totalRecords" class="text-2xl font-bold text-purple-600">0</p>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Charts Container -->
<div class="max-w-7xl mx-auto px-4 space-y-6" id="chartsContainer">
    <!-- Income vs Expenses Chart -->
    <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-800">
                <i class="fas fa-chart-bar mr-2"></i>Income vs Expenses
            </h2>
            <div class="flex space-x-2">
                <select id="incomeExpensesPeriod" class="px-3 py-2 border rounded">
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                    <option value="yearly">Yearly</option>
                </select>
            </div>
        </div>
        <div class="relative" style="height: 400px;">
            <canvas id="incomeExpensesChart"></canvas>
        </div>
    </div>

    <!-- Income Trend Chart -->
    <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-800">
                <i class="fas fa-line-chart mr-2"></i>Income Trend
            </h2>
            <div class="flex space-x-2">
                <select id="incomeTrendPeriod" class="px-3 py-2 border rounded">
                    <option value="last6months">Last 6 Months</option>
                    <option value="last12months">Last 12 Months</option>
                    <option value="last24months">Last 24 Months</option>
                </select>
            </div>
        </div>
        <div class="relative" style="height: 400px;">
            <canvas id="incomeTrendChart"></canvas>
        </div>
    </div>

    <!-- Expense Categories Chart -->
    <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-800">
                <i class="fas fa-chart-pie mr-2"></i>Expense Categories
            </h2>
            <div class="flex space-x-2">
                <select id="expenseCategoriesPeriod" class="px-3 py-2 border rounded">
                    <option value="thisMonth">This Month</option>
                    <option value="last3months">Last 3 Months</option>
                    <option value="thisYear">This Year</option>
                </select>
            </div>
        </div>
        <div class="relative" style="height: 400px;">
            <canvas id="expenseCategoriesChart"></canvas>
        </div>
    </div>

    <!-- Financial Performance Chart -->
    <div class="bg-white rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center mb-4">
            <h2 class="text-xl font-bold text-gray-800">
                <i class="fas fa-chart-area mr-2"></i>Financial Performance
            </h2>
            <div class="flex space-x-2">
                <select id="performancePeriod" class="px-3 py-2 border rounded">
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="quarterly">Quarterly</option>
                </select>
            </div>
        </div>
        <div class="relative" style="height: 400px;">
            <canvas id="performanceChart"></canvas>
        </div>
    </div>

    <!-- Data Table -->
    <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">
            <i class="fas fa-table mr-2"></i>Recent Financial Records
        </h2>
        <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                </tr>
                </thead>
                <tbody id="recentRecordsTable" class="bg-white divide-y divide-gray-200">
                <!-- Data will be populated by JavaScript -->
                </tbody>
            </table>
        </div>
    </div>
</div>

<!-- Footer -->
<footer class="bg-white shadow-lg mt-12">
    <div class="max-w-7xl mx-auto px-4 py-6">
        <div class="text-center text-gray-600">
            <p>&copy; 2024 Financial Analytics Dashboard. All rights reserved.</p>
        </div>
    </div>
</footer>
</body>
</html>