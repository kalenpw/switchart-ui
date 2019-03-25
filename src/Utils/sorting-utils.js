export function alphabeticalSort(a, b) {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
    }
    else if (a.name.toLowerCase() > b.name.toLowerCase()) {
        return 1;
    }
    return 0;
}

export function dateSort(a, b) {
    if (a.updated_at < b.updated_at) {
        return 1;
    }
    else if (a.updated_at > b.updated_at) {
        return -1;
    }
    return 0;
}

export function popularSort(a, b) {
    // sorting games
    if (a.artworks) {
        return b.artworks.length - a.artworks.length;
    }
    // sorting artworks
    if (a.netVotes) {
        return b.netVotes - a.netVotes;
    }
}