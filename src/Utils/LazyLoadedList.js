class LazyLoadedList {
    allItems = [];
    visibleItems = [];
    amoutLoaded = 8;

    constructor(allItems) {
        this.allItems = allItems;
        this.loadItems();
    }

    loadItems() {
        this.visibleItems = this.allItems.slice(0, this.amoutLoaded);
    }

    loadMore() {
        this.amoutLoaded = this.amoutLoaded + 8;
        this.loadItems();
    }

    hasLoadedAll() {
        return this.amoutLoaded > this.allItems.length;
    }

    sortBy(sortMethod){
        this.allItems.sort(sortMethod);
        this.loadItems();
    }

    reverse(){
        this.allItems.reverse();
        this.loadItems();
    }
}

export default LazyLoadedList;