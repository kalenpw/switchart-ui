function alphabeticalSort(a , b){
    if(a.title < b.title){
        return -1;
    }
    else if(a.title > b.title){
        return 1;
    }
    return 0;
}

function dateSort(a , b){
    if(a.updated_at < b.updated_at){
        return 1;
    }
    else if(a.updated_at > b.updated_at){
        return -1;
    }
    return 0;
}
export {dateSort}
export {alphabeticalSort}