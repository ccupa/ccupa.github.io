document.querySelector("#zipCode").addEventListener("change", displayCity);
document.querySelector("#password").addEventListener("click", passwordCheck);
document.querySelector("#username").addEventListener("click", usernameCheck);


async function displayCity() {

    let zipCode = document.querySelector("#zipCode").value;
    let url = "https://csumb.space/api/cityInfoAPI.php?zip=" + zipCode;
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    //alert(data.city);
    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.latitude
    document.querySelector("#longitude").textContent = data.longitude

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

async function passwordCheck() {
    let url = "https://csumb.space/api/suggestedPassword.php?length=8" + username;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        console.log(data);
        document.querySelector("#password2").textContent = data.password
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}

async function usernameCheck() {
    let url = " https://csumb.space/api/usernamesAPI.php?username=";
    let usedNames = ["eeny", "meeny", "miny", "maria", "john"];
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Error accessing API endpoint")
        }
        const data = await response.json();
        
        let name = document.querySelector("#username").value;
        for (let i of usedNames){
            if (name != usedNames) {
                name.textContent = data.username;
            }
            if (name == usedNames) {
                alert("choose another name");
            }
        }
    } catch (err) {
        if (err instanceof TypeError) {
            alert("Error accessing API endpoint (network failure)");
        } else {
            alert(err.message);
        }
    }
}