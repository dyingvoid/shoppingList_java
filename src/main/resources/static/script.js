function fetchJson(json) {
    const container = document.getElementById("json-container");
    container.innerHTML = '';

    json.forEach(object => {
        let div = document.createElement('div');
        let name = document.createElement('span');
        let amount = document.createElement('span');
        let checkBox = document.createElement('input');
        let button = document.createElement('button');

        div.id = object.name;

        name.textContent = object.name;
        amount.textContent = object.amount;

        checkBox.type = 'checkbox';
        checkBox.checked = Boolean(object.bought);

        button.type = 'button';
        button.onclick = async function(){
            await remove(div);
        }
        button.innerText = 'Remove';

        div.appendChild(name);
        div.appendChild(amount);
        div.appendChild(checkBox);
        div.appendChild(button);

        container.appendChild(div);
    });
}

async function remove(div) {
    await fetch('/lists/' + div.id, {
        method: 'DELETE'
    })
    await get();
}

async function get() {
    await fetch("/lists", {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            fetchJson(data);
        });
}

async function post() {
    await fetch("/lists", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById("item-name").value,
            amount: document.getElementById('item-count').value,
            })
    }).catch(error => console.log('Error: ', error));
    await get();
}