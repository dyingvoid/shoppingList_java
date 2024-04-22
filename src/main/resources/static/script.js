function fetchJson(json) {
    const container = document.getElementById("json-container");
    container.innerHTML = '';

    json.forEach(object => {
        let div = document.createElement('div');
        div.id = 'list-id:' + object['id'];

        const btn = document.createElement('button');
        btn.type = 'button';
        btn.onclick = async function () {
            await remove(div);
        };
        btn.textContent = "Delete";

        const name = document.createElement('p');
        name.textContent = object['name'];

        const label = document.createElement('label');
        label.textContent = 'Item name:';

        const input = document.createElement('input');
        input.type = 'text';

        const inputBtn = document.createElement('button');
        inputBtn.type = 'button';
        inputBtn.textContent = 'Add'
        inputBtn.onclick = async function() {
            await postItem(listDiv.split(':')[1], input.textContent);
        }

        object['items'].forEach(item => {
            createItem(item, div);
        });

        div.appendChild(name);
        div.appendChild(btn);
        div.appendChild(label);
        div.appendChild(input);
        div.appendChild(inputBtn);

        container.appendChild(div);
    });
}

function createItem(item, listDiv) {
    const div = document.createElement('div');
    div.id = 'item-id:' + item['id'];
}

async function postItem(listId, itemName) {
    await fetch('/lists/' + listId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name: itemName})
    })
}

async function remove(div) {
    await fetch('/lists/' + div.id.split(':')[1], {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            fetchJson(data)
        });

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
        body: JSON.stringify({name: document.getElementById("list-name").value})
    }).catch(error => console.log('Error: ', error));
    await get();
}