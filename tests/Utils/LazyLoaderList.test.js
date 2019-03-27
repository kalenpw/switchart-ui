import LazyLoadedList from "@/Utils/LazyLoadedList.js";

test("Loads lazily", () =>{
    let dummyAry = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    let list = new LazyLoadedList(dummyAry);
    expect(list.amountLoaded).toBe(8);
    expect(list.visibleItems.length).toBe(8);
    expect(list.allItems.length).toBe(10);
    expect(list.hasLoadedAll()).toBe(false);
    list.loadMore();
    expect(list.hasLoadedAll()).toBe(true);
    expect(list.visibleItems.length).toBe(10);
    expect(list.amountLoaded).toBe(16);
});

test("load all works", () =>{
    let dummyArray = [];
    for(let i = 0; i < 100; i++){
        dummyArray.push(i);
    }
    let list = new LazyLoadedList(dummyArray);
    expect(list.visibleItems.length).toBe(8);
    list.loadAll();
    expect(list.visibleItems.length).toBe(dummyArray.length);
});