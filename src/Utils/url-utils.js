export function formatName(name) {
    return name.replace(/ /g, '_').replace(/\W/g, '');
}

export function getArtworkUrl(fileName) {
    let base = "/storage/";
    let split = fileName.split("/");
    split = split.splice(1, split.length - 1);
    let url = base + split.join("/");
    return url;
}

