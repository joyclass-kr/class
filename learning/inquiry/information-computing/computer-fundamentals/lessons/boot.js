(() => {
    "use strict";

    // 한 차시를 열 때 그 차시에 필요한 파일만 받는다.
    // 머리에서 바로 실행되므로 꾸미는 파일의 차례를 원래대로 맞출 수 있다.
    const current = document.currentScript;
    const version = (current.src.split("?v=")[1] || "");
    const atCourseRoot = !/\/lessons\/?$/.test(location.pathname.replace(/[^/]*$/, ""));
    const base = current.src.replace(/[^/]*$/, "");
    const requested = new URLSearchParams(location.search).get("lesson");
    const id = /^[a-j][0-9]{2}$/.test(requested || "") ? requested : (atCourseRoot ? "a01" : "a02");

    const withLab = ["a04","a05","b02","b03","c01","c02","c03","c04","d01","d02","d03","e01","e02","e03","e04","e05","f01","f02","f03","g01","g02","g03","h01","h02","h03","h04","h05","i01","i02","j01","j02","j03"];
    const withReview = ["a02","a03","a05","b01","b02","b03","c01","c02","c03","c04","d01","d02","d03","e01","e02","e03","e04","e05","f01","f03","g01","g02","g03","h01","h02","h03","h04","h05","i01","i02","j01","j02","j03"];
    const detailed = ["a01","a02","a03","a04","a05","b01"];
    const letterFile = { b: "foundation-b", c: "foundation-c", d: "foundation-d", e: "foundation-e", f: "foundation-fg", g: "foundation-fg", h: "foundation-h", i: "foundation-ij", j: "foundation-ij" };
    const tag = (file) => base + file + (version ? "?v=" + version : "");

    // 공용 꾸밈이 먼저, 차시 전용 꾸밈이 뒤에 온다.
    for (const sheet of ["shell.css", "labs/" + id + ".css"]) {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = tag(sheet);
        document.head.append(link);
    }

    const files = ["foundation-core.js", "index-data.js", "lab-shared.js"];
    if (withLab.includes(id)) files.push("labs/" + id + ".js");
    if (detailed.includes(id)) files.push("detail/" + id + ".js");
    else files.push("foundation-compact.js", letterFile[id[0]] + ".js");
    if (withReview.includes(id)) files.push("reviews/" + id + ".js");
    files.push("shell.js");

    // 화면 뼈대를 다 읽은 뒤에 넣는다. 넣은 차례대로 실행된다.
    const load = () => {
        for (const file of files) {
            const script = document.createElement("script");
            script.src = tag(file);
            script.async = false;
            document.head.append(script);
        }
    };
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", load, { once: true });
    else load();
})();
