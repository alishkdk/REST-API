document.getElementById("userForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const first_name = document.getElementById("name").value;
    const last_name = document.getElementById("last").value;
    const email = document.getElementById("email").value;
    const gender = document.getElementById("gender").value;
    const address = document.getElementById("address").value;

    try {
        const response = await fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                gender,
                address
            })
        });

        const data = await response.json();
        console.log("API Response:", data);

        if (data.status === "success") {
            alert("User created successfully! ID: " + data.id);
        } else {
            alert("Error: " + data.message);
        }

    } catch (error) {
        alert("Error connecting to server!");
        console.error(error);
    }
});
