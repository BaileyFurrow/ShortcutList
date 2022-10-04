class ShortcutItem {
    constructor(keys, name) {
        this.keys = keys;
        this.name = name;
    }

    formatKeys() {
        let formattedKeys;

        let prefix = '<kbd>',
            suffix = '</kbd>'
            joiner = '</kbd> + <kbd>';
        
        formattedKeys = prefix + this.keys.join(joiner) + suffix;
        
        return formattedKeys;
    }
}