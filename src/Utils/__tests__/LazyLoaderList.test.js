import LazyLoadedList from "../LazyLoadedList.js";

test("a dummy test", () =>{
    let list = new LazyLoadedList([]);
    console.log("*******************");
    console.log(list);
    console.log(list.amountLoaded);
    console.log("*******************");
    expect(list.amountLoaded).toBe(8);
});