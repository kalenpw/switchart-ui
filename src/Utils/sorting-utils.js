export function alphabeticalSort(a , b){
    if(a.name.toLowerCase() < b.name.toLowerCase()){
        return -1;
    }
    else if(a.name.toLowerCase() > b.name.toLowerCase()){
        return 1;
    }
    return 0;
}

export function dateSort(a , b){
    if(a.updated_at < b.updated_at){
        return 1;
    }
    else if(a.updated_at > b.updated_at){
        return -1;
    }
    return 0;
}

export function popularSort(a, b){
    return b.artworkCount - a.artworkCount;
}