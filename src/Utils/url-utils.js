export function formatName(name) {
    return name.replace(/ /g, '_').replace(/\W/g, '');
}
