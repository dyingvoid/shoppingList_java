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
        checkBox.onclick = async function(){
            await changeBought(div, checkBox);
        };

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

async function changeBought(div, checkbox){
    await fetch('/lists/' + div.id, {
        method: 'PUT',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(checkbox.checked)
    }).catch(err => console.log(err));
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
    let amountVal = document.getElementById('item-count').value;

    await fetch("/lists", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: document.getElementById("item-name").value,
            amount: amountVal === '' ? '1' : amountVal,
            })
    }).catch(error => console.log('Error: ', error));
    await get();
}