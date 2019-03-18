export function alphabeticalSort(a , b){
    if(a.name < b.name){
        return -1;
    }
    else if(a.name > b.name){
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