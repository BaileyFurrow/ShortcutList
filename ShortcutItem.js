class ShortcutItem {

    static LIST_TITLE;
    static AUTHOR;

    static KEY_SORT_ORDER = [
        'Control',
        'Shift',
        'Meta',
        'Alt',
    ].reverse();

    constructor(keys, name) {
        this.keys = keys;
        this.name = name;
    }

    /**
     * Takes `this.keys` and adds HTML formatting using \<kbd\>
     * @return {String}    Formatted key combination with \<kbd\> tags
     */
    formatKeys() {
        let formattedKeys;

        let prefix = '<kbd>',
            suffix = '</kbd>'
            joiner = '</kbd> + <kbd>';
        
        formattedKeys = prefix + this.keys.join(joiner) + suffix;
        
        return formattedKeys;
    }
}

export default ShortcutItem;