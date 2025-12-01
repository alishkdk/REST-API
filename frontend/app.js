document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("userForm");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

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
                body: JSON.stringify({ first_name,last_name,email,gender,address })
            });

            const data = await response.json();
            if (data.status === "sucess") {
                alert("User added successfully! ID: " + data.id);
                form.reset();
            } else {
                alert("Something went wrong!");
            }
        } catch (err) {
            console.error(err);
            alert("Error connecting to server");
        }
    });
});
