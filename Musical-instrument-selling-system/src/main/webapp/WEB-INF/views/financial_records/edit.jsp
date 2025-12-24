<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Edit Financial Record</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="bg-gray-100 p-6 font-sans">

<div class="container mx-auto max-w-lg bg-white p-8 rounded-xl shadow-lg">
    <h1 class="text-3xl font-bold mb-6 text-center text-gray-800">Edit Financial Record</h1>
    <form id="editForm" class="space-y-5">
        <div>
            <label for="title" class="block font-medium text-gray-700">Title</label>
            <input type="text" id="title" name="title" placeholder="Enter title"
                   class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <p id="titleError" class="text-red-500 text-sm mt-1 hidden">Title must be 3-50 characters, letters, numbers, spaces allowed.</p>
        </div>

        <div>
            <label for="type" class="block font-medium text-gray-700">Type</label>
            <select id="type" name="type"
                    class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option value="">Select type</option>
                <option value="EXPENSE">Expense</option>
                <option value="INCOME">Income</option>
            </select>
            <p id="typeError" class="text-red-500 text-sm mt-1 hidden">Please select a type.</p>
        </div>

        <div>
            <label for="amount" class="block font-medium text-gray-700">Amount</label>
            <input type="number" id="amount" name="amount" placeholder="Enter amount" step="0.01"
                   class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <p id="amountError" class="text-red-500 text-sm mt-1 hidden">Amount must be a positive number.</p>
        </div>

        <div>
            <label for="description" class="block font-medium text-gray-700">Description</label>
            <textarea id="description" name="description" placeholder="Optional description"
                      class="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"></textarea>
        </div>

        <div class="flex justify-between items-center">
            <button type="submit" class="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all shadow-md flex items-center space-x-2">
                <i class="fas fa-save"></i>
                <span>Update</span>
            </button>
            <button type="button" id="backBtn" class="px-5 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-all shadow-md flex items-center space-x-2">
                <i class="fas fa-arrow-left"></i>
                <span>Back</span>
            </button>
        </div>
    </form>
</div>

<script src="/js/financial_records/edit.js"></script>
</body>
</html>
