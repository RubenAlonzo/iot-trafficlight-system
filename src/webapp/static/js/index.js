const generateGuid = () => {
    return window.URL.createObjectURL(new Blob([])).split("/").pop();
};

const addTableRow = (steps) => {
    const row = document.createElement("tr");
    const idRegister = document.createElement("td");
    idRegister.textContent = generateGuid();
    const stepsRegister = document.createElement("td");
    stepsRegister.textContent = steps;
    row.appendChild(idRegister);
    row.appendChild(stepsRegister);

    document.querySelector("tbody").appendChild(row);
};

