import { formatName } from "@/Utils/url-utils.js";
import { getImageUrl } from "@/Utils/url-utils.js";

test("format name works", () =>{
    expect(formatName("Splatoon 2")).toBe("Splatoon_2");
    expect(formatName("Ys: VIII Lacrimosa of Dana")).toBe("Ys_VIII_Lacrimosa_of_Dana");
});

test("getImageUrl", () =>{
    expect(getImageUrl("/public/image.png")).toBe("/storage/public/image.png");
});