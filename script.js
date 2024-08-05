const numberOfCheckboxes = 1825;
const table = document.querySelector('table');
const columns = 15; // Number of checkboxes per row
const statusMessage = document.getElementById('statusMessage');

// Load the saved states from local storage
const savedStates = JSON.parse(localStorage.getItem('checkboxStates')) || {};

function showStatusMessage() {
    statusMessage.classList.add('show');
    setTimeout(() => {
        statusMessage.classList.remove('show');
    }, 2000);
}

for (let i = 1; i <= numberOfCheckboxes; i++) {
    if (i % columns === 1) {
        var row = table.insertRow();
    }

    const cell = row.insertCell();
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = `checkbox${i}`;
    checkbox.name = `checkbox${i}`;
    checkbox.value = `value${i}`;

    // Set checkbox state based on saved state
    if (savedStates[`checkbox${i}`]) {
        checkbox.checked = true;
    }

    // Save the state of the checkbox when it's changed
    checkbox.addEventListener('change', () => {
        savedStates[`checkbox${i}`] = checkbox.checked;
        localStorage.setItem('checkboxStates', JSON.stringify(savedStates));
        showStatusMessage();
    });

    const label = document.createElement('label');
    label.htmlFor = `checkbox${i}`;
    label.appendChild(document.createTextNode(`Day ${i}`));

    const container = document.createElement('div');
    container.classList.add('checkbox-container');

    container.appendChild(checkbox);
    container.appendChild(label);
    cell.appendChild(container);
}
