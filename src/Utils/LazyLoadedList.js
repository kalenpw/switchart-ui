import { dateSort } from "@/Utils/sorting-utils.js";
import { alphabeticalSort } from "@/Utils/sorting-utils.js";
import { popularSort } from "@/Utils/sorting-utils.js";

class LazyLoadedList {
    allItems = [];
    visibleItems = [];
    amountLoaded = 8;
    lastSortedBy = null;
    isReverseSorted = false;

    constructor(allItems) {
        this.allItems = allItems;
        this.loadItems();
    }

    loadItems() {
        this.visibleItems = this.allItems.slice(0, this.amountLoaded);
    }

    loadMore() {
        this.amountLoaded = this.amountLoaded + 8;
        this.loadItems();
    }

    loadAll() {
        this.amountLoaded = this.allItems.length;
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
            this.isReverseSorted = false;
            this.allItems.sort(sortMethod);
            this.lastSortedBy = sortMethod;
            this.loadItems();
        }
    }

    reverse() {
        this.isReverseSorted = ! this.isReverseSorted;
        this.allItems.reverse();
        this.loadItems();
    }
    isSortedAlphabetically(){
        return this.lastSortedBy == alphabeticalSort;
    }
    isSortedDate(){
        return this.lastSortedBy == dateSort;
    }
    isSortedPopular(){
        return this.lastSortedBy == popularSort;
    }
}

export default LazyLoadedList;