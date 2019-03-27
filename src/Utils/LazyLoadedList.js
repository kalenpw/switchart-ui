class LazyLoadedList {
    allItems = [];
    visibleItems = [];
    amountLoaded = 8;
    lastSortedBy = null;

    constructor(allItems) {
        this.allItems = allItems;
        this.loadItems();
    }

    loadItems() {
        this.visibleItems = this.allItems.slice(0, this.amoutLoaded);
    }

    loadMore() {
        this.amountLoaded = this.amountLoaded + 8;
        this.loadItems();
    }

    hasLoadedAll() {
        return this.amountLoaded > this.allItems.length;
    }

    sortBy(sortMethod) {
        if (sortMethod == this.lastSortedBy) {
            this.reverse();
        }
        else {
            this.allItems.sort(sortMethod);
            this.lastSortedBy = sortMethod;
            this.loadItems();
        }
    }

    reverse() {
        this.allItems.reverse();
        this.loadItems();
    }
}

export default LazyLoadedList;