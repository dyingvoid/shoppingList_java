function fetchJson(json) {
    const container = document.getElementById("json-container");
    container.innerHTML = '';

    json.forEach(object => {
        const div = createDiv(object);
        const btn = createBtn(remove, div);

        const name = document.createElement('p');
        name.textContent = object['name'];

        div.appendChild(name);
        div.appendChild(btn);
        container.appendChild(div);
    });
}

function createDiv(jsonObject) {
    let div = document.createElement('div');
    div.id = jsonObject['id'];

    return div;
}

function createBtn(method, parentDiv) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.onclick = function() {
        method(parentDiv);
    };
    btn.textContent = "Delete";

    return btn;
}

async function remove(div) {
    await fetch('/lists/' + div.id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            fetchJson(data)
        });
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
    })
        .then(response => {
            if (!response.ok)
                throw new Error("Bad response");
            return response.json()
        })
        .then(data => {
            fetchJson(data);
        })
        .catch(error => console.log('Error: ', error));
}