document.addEventListener("DOMContentLoaded", () => {
    const createForm = document.getElementById("createForm");
    const backBtn = document.getElementById("backBtn");

    const titleInput = document.getElementById("title");
    const typeSelect = document.getElementById("type");
    const amountInput = document.getElementById("amount");
    const descriptionInput = document.getElementById("description");

    const titleError = document.getElementById("titleError");
    const typeError = document.getElementById("typeError");
    const amountError = document.getElementById("amountError");

    // Back button
    backBtn.addEventListener("click", () => history.back());

    const titleRegex = /^[a-zA-Z0-9 ]{3,50}$/;

    createForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        let valid = true;

        // Title validation
        if (!titleRegex.test(titleInput.value.trim())) {
            titleError.classList.remove("hidden");
            valid = false;
        } else {
            titleError.classList.add("hidden");
        }

        // Type validation
        if (!typeSelect.value) {
            typeError.classList.remove("hidden");
            valid = false;
        } else {
            typeError.classList.add("hidden");
        }

        // Amount validation
        const amountValue = parseFloat(amountInput.value);
        if (isNaN(amountValue) || amountValue <= 0) {
            amountError.classList.remove("hidden");
            valid = false;
        } else {
            amountError.classList.add("hidden");
        }

        if (!valid) return;

        const payload = {
            title: titleInput.value.trim(),
            type: typeSelect.value,
            description: descriptionInput.value.trim(),
            amount: amountValue
        };

        try {
            const response = await fetch("/financial-records", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Financial record created successfully!");
                window.location.replace("/financial-records-view")
            } else {
                const error = await response.text();
                alert("Failed to create record: " + error);
            }
        } catch (err) {
            console.error(err);
            alert("Error creating record.");
        }
    });
});
