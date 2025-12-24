<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Financial Records</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.28/jspdf.plugin.autotable.min.js"></script>
</head>
<body class="bg-gray-100 p-6 font-sans">

<div class="container mx-auto">
    <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Financial Records</h1>
        <div class="flex items-center space-x-2">
            <a href="/financial-records/chart" style="background: black" id="overview" class="px-4 py-2 bg-blue text-white rounded hover:bg-black-700 transition-colors">
                <i class="fas fa-plus"></i> OverView
            </a>
            <a href="/financial-records/create" id="createBtn" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                <i class="fas fa-plus"></i> Create
            </a>
            <input type="text" id="searchInput" placeholder="Search..." class="px-3 py-2 border rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500">
            <button id="exportPdfBtn" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                <i class="fas fa-file-pdf"></i> Export PDF
            </button>
        </div>
    </div>

    <div class="overflow-x-auto bg-white shadow rounded-lg">
        <table id="recordsTable" class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
            </thead>
            <tbody id="recordsBody" class="bg-white divide-y divide-gray-200">
            </tbody>
        </table>
    </div>
</div>

<script src="/js/financial_records/list.js"></script>
</body>
</html>
