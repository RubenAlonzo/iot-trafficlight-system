const getRandomLocation = () => {
    const locations = [
        "Dooley Skyway",
        "Rau Hills",
        "Ernser Dale",
        "Emilie Highway",
        "Sipes Greens",
    ];
    return locations[Math.floor(Math.random() * locations.length)];
};

const generateGuid = () => {
    return window.URL.createObjectURL(new Blob([])).split("/").pop();
};

const recalculateTotalSteps = () => {
    const localStorageKey = "totalSteps";
    const totalSteps = localStorage.getItem(localStorageKey) ?? 0;
    const newTotalSteps = parseInt(totalSteps) + 10
    localStorage.setItem(localStorageKey, newTotalSteps);
    return newTotalSteps
};

const getTotalStepsElement = () => {
    return document
        .getElementById("totalSteps")
};

const generateRowData = () => {
    return {
        id: generateGuid(),
        location: getRandomLocation(),
        hour: new Date().toLocaleTimeString(),
    };
};

const getLocalData = () => {
    const localData = localStorage.getItem("crossHistory") ?? JSON.stringify([]);
    return JSON.parse(localData);
};

const addNewRow = (newRow) => {
    const localData = getLocalData();
    localStorage.setItem(
        "crossHistory",
        JSON.stringify([...localData, newRow])
    );
};

const addTableRow = ({ id, location, hour }) => {
    const row = document.createElement("tr");
    const idRegister = document.createElement("td");
    idRegister.textContent = id;
    const placeRegister = document.createElement("td");
    placeRegister.textContent = location;
    const hourRegister = document.createElement("td");
    hourRegister.textContent = hour;
    row.appendChild(idRegister);
    row.appendChild(placeRegister);
    row.appendChild(hourRegister);

    document.querySelector("tbody").appendChild(row);
};

const renderTableRows = () => {
    const tableData = getLocalData();
    tableData.forEach((row) => {
        addTableRow(row);
    });
};

const saveNew = () => {
    const newData = generateRowData();
    addNewRow(newData);
    addTableRow(newData);
    getTotalStepsElement().textContent = `Total steps: ${recalculateTotalSteps()}`;
}

renderTableRows();
saveNew()