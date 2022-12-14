import ShortcutItem from "./ShortcutItem.js";


/**
 * @type {string[]}
 */
let tmpKeys = [];

/**
 * @type {string[]}
 */
let keys = [];

/**
 * @type {Object}
 */
let objKeyList = {
    listName: 'Test',
    keyList: [
        [
            ['Control', 'Shift', 'V'],
            'Paste as plain text',
        ],
    ],
};

/**
 * Defines the order to sort keys in. Array will be used in reversed format to
 * `unshift()` keys.
 * @const {string[]}
 */
const KEY_SORT_ORDER = [
    'Control',
    'Shift',
    'Meta',
    'Alt',
].reverse();

/**
 * Captures all non-repeating key presses while the `keyup` event has not been triggered.
 * @param {Event} e `Event` object provided by `addEventListener()`
 */
function keyListener(e) {
    e.preventDefault();
    if (!e.repeat)
        tmpKeys.push(e.key);
}

/**
 * Disables key listeners, stores key presses to `keys`, focuses the
 * `#actionName` field, and shows the formatted key combination
 * @param {Event} e `Event` object provided by `addEventListener()`
 */
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

/** Adds event listeners when the `#shortcut` field is in focus */
function get_pressed_keys() {
    document.addEventListener('keydown', keyListener);
    document.addEventListener('keyup', endKeyListener);
    document.querySelector('#shortcut')
        .addEventListener('blur', endKeyListener);
}

/** To be @depricated */
function format_kbd(arrShortcut) {
    return '<kbd>' + arrShortcut.join('</kbd> + <kbd>') + '</kbd>';
}

/** Takes the current `objKeyList` and loads it in as a table. */
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

/** Adds the new shortcut to `objKeyList` and runs {@link display_as_table} */
function add_shortcut() {
    let shortcut_name = document.querySelector('#actionName').value;
    let keyPair = [keys, shortcut_name];
    objKeyList.keyList.push(keyPair);
    console.log(shortcut_name, keyPair, objKeyList);
    display_as_table();
}