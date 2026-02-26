document.querySelector("#zipCode").addEventListener("input", displayCity);
document.querySelector("#password").addEventListener("click", passwordCheck);
document.querySelector("#username").addEventListener("input", usernameCheck);
document.querySelector("#state").addEventListener("change", displayCounties);
document.querySelector("#submitBtn").addEventListener("click", submit);

async function displayCity() {
    let zipCode = document.querySelector("#zipCode").value;
    let zipMsg = document.querySelector("#zipMsg");

    if (zipCode.length != 5) {
        zipMsg.textContent = "Zip code must be 5 digits";
        zipMsg.style.color = "red";
        return;
    }

    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    let response = await fetch(url);
    let data = await response.json();

    if (!data.city) {
        zipMsg.textContent = "Zip code not found";
        zipMsg.style.color = "red";
        document.querySelector("#city").textContent = "";
        document.querySelector("#latitude").textContent = "";
        document.querySelector("#longitude").textContent = "";
    } else {
        zipMsg.textContent = "Valid zip code";
        zipMsg.style.color = "green";
        document.querySelector("#city").textContent = data.city;
        document.querySelector("#latitude").textContent = data.latitude
        document.querySelector("#longitude").textContent = data.longitude
    }
}

async function displayStates() {
    let url = "https://csumb.space/api/allStatesAPI.php"

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();

        for (let i of data) {
            let optionEl = document.createElement("option");
            optionEl.textContent = i.state;
            document.querySelector("#state").append(optionEl);
            optionEl.value = i.usps;
        }

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}
displayStates();

async function displayCounties() {
    let state = document.querySelector("#state").value;
    let url = "https://csumb.space/api/countyListAPI.php?state=" + state;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();

        document.querySelector("#county").textContent = "";
        for (let i of data) {
            let optionEl = document.createElement("option");
            optionEl.textContent = i.county;
            document.querySelector("#county").append(optionEl);
        }

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

async function passwordCheck() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8";
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();

        if (document.querySelector("#password2")) {
            document.querySelector("#password2").textContent = "Recommended Password: " + data.password;
        }
        document.querySelector("#password").value = data.password;
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

async function usernameCheck() {
    let username = document.querySelector("#username").value;
    let usernameMsg = document.querySelector("#usernameMsg");
    let url = "https://csumb.space/api/usernamesAPI.php?username=" + username;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();

        if (data.available == true) {
            usernameMsg.textContent = "Username is available";
            usernameMsg.style.color = "green";
        } else {
            usernameMsg.textContent = "Username is not available";
            usernameMsg.style.color = "red";
        }

    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

function submit() {
    let username = document.querySelector("#username").value;
    let password = document.querySelector("#password").value;
    let passwordAgain = document.querySelector("#passwordAgain").value;

    if (username.length < 3) {
        alert("Username must be at least 3 characters long");
    } else {
        alert("Username accepted");
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
    } else {
        alert("Password accepted");
    }
    if (password != passwordAgain) {
        alert("Passwords do not match");
    } else {
        alert("Passwords match");
    }
}
