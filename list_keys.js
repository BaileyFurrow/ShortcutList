let tmpKeys = [];
let keys = [];

let objKeyList = {
    listName: 'Test',
    keyList: [
        [
            ['Control', 'Shift', 'v'],
            'Paste as plain text',
        ],
    ],
};

// Desired order to list keys. Order is reversed (last to first) to unshift
// values in array.
const KEY_SORT_ORDER = [
    'Control',
    'Shift',
    'Meta',
    'Alt',
].reverse();


function keyListener(e) {
    e.preventDefault();
    if (!e.repeat)
        tmpKeys.push(e.key);
}

function endKeyListener(e) {
    // Disable event listeners for keydown/keyup
    document.removeEventListener('keydown', keyListener);
    document.removeEventListener('keyup', endKeyListener);

    // Stop function if no input was detected
    if (tmpKeys.length == 0) return;

    // Grab the pressed keys currently in `tmpKeys` array
    keys = tmpKeys;
    tmpKeys = [];
    console.log(`Keys input: ${keys}`);

    // Order the keys based on `KEY_SORT_ORDER`
    let orderIndex = 0;
    KEY_SORT_ORDER.forEach(modKey => {
        if (!keys.includes(modKey)) return;
        keys.splice(keys.indexOf(modKey), 1);
        keys.unshift(modKey);
    });


    // Blur (deselect) input field and focus the title field
    let shortcutField = document.querySelector('#shortcut');
    shortcutField.blur();
    shortcutField.value = '';
    document.querySelector('#actionName').focus();

    // Show keys pressed
    let shortcutText = document.querySelector('.shortcut-text');
    shortcutText.innerHTML = format_kbd(keys);
}

function get_pressed_keys() {
    document.addEventListener('keydown', keyListener);
    document.addEventListener('keyup', endKeyListener);
    document.querySelector('#shortcut')
        .addEventListener('blur', endKeyListener);
}

function format_kbd(arrShortcut) {
    return '<kbd>' + arrShortcut.join('</kbd> + <kbd>') + '</kbd>';
}


function display_as_table() {
    let table = document.querySelector('#shortcut-table');
    let table_header = table.querySelector('thead tr th');
    table_header.innerHTML = objKeyList.listName;
    let table_body = table.querySelector('tbody');
    
    // Clear the table if not already cleared.
    table_body.innerHTML = '';

    // Loop through each shortcut key
    objKeyList.keyList.forEach(v => {
        let tr = document.createElement('tr');
        let keyElem = document.createElement('td');
        let nameElem = document.createElement('td');
        
        keyElem.innerHTML = '<kbd>' + format_kbd(v[0]) + '</kbd>';
        nameElem.innerHTML = v[1];

        tr.appendChild(keyElem);
        tr.appendChild(nameElem);

        table_body.appendChild(tr);
    });
}


function add_shortcut() {
    let shortcut_name = document.querySelector('#actionName').value;
    let keyPair = [keys, shortcut_name];
    objKeyList.keyList.push(keyPair);
    console.log(shortcut_name, keyPair, objKeyList);
    display_as_table();
}