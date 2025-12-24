document.addEventListener("DOMContentLoaded", () => {
    const recordsTableBody = document.getElementById("recordsBody");
    const searchInput = document.getElementById("searchInput");
    const exportPdfBtn = document.getElementById("exportPdfBtn");

    let records = [];

    async function fetchRecords() {
        try {
            const response = await fetch("/financial-records");
            records = await response.json();
            renderTable(records);
        } catch (error) {
            console.error("Error fetching records:", error);
        }
    }

    function renderTable(data) {
        recordsTableBody.innerHTML = "";
        data.forEach(record => {
            const tr = document.createElement("tr");
            tr.classList.add("hover:bg-gray-100");
            tr.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">${record.id}</td>
                <td class="px-6 py-4 whitespace-nowrap">${record.title}</td>
                <td class="px-6 py-4 whitespace-nowrap">${record.type}</td>
                <td class="px-6 py-4 whitespace-nowrap">${record.description || ""}</td>
                <td class="px-6 py-4 whitespace-nowrap">${record.amount.toFixed(2)}</td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <button class="editBtn px-2 py-1 bg-black text-white rounded hover:bg-gray-800 mr-2" data-id="${record.id}">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="deleteBtn px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600" data-id="${record.id}">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </td>
            `;
            recordsTableBody.appendChild(tr);
        });

        document.querySelectorAll(".editBtn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const id = e.currentTarget.getAttribute("data-id");
                window.location.href = `/financial-records/edit?recordId=${id}`;
            });
        });

        document.querySelectorAll(".deleteBtn").forEach(btn => {
            btn.addEventListener("click", async (e) => {
                const id = e.currentTarget.getAttribute("data-id");
                if (confirm("Are you sure you want to delete this record?")) {
                    try {
                        const response = await fetch(`/financial-records/${id}`, {
                            method: "DELETE"
                        });
                        if (response.ok) fetchRecords();
                        else alert("Failed to delete record");
                    } catch (err) {
                        console.error(err);
                    }
                }
            });
        });
    }

    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        const filtered = records.filter(r =>
            r.title.toLowerCase().includes(query) ||
            r.type.toLowerCase().includes(query) ||
            (r.description && r.description.toLowerCase().includes(query))
        );
        renderTable(filtered);
    });

    exportPdfBtn.addEventListener("click", () => {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const tableData = records.map(r => [r.id, r.title, r.type, r.description || "", r.amount.toFixed(2)]);
        doc.autoTable({ head: [["ID", "Title", "Type", "Description", "Amount"]], body: tableData });
        doc.save("financial_records.pdf");
    });

    fetchRecords();
});
