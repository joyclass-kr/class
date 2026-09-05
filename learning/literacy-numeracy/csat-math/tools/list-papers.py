import re, json, urllib.request, ssl
ctx = ssl.create_default_context(); ctx.check_hostname=False; ctx.verify_mode=ssl.CERT_NONE
BASE="https://www.suneung.re.kr"
def get(u):
    req=urllib.request.Request(u, headers={"User-Agent":"Mozilla/5.0"})
    return urllib.request.urlopen(req, context=ctx, timeout=30).read().decode("utf-8","replace")
FILE_RE = re.compile(r"fn_fileDown\('([a-f0-9]+)'\);\"\s*title=['\"]([^'\"]+)['\"]")
rows=[]
for board,pages,kind in ((1500234,4,"수능"),(1500236,13,"모평")):
    for pg in range(1,pages+1):
        html=get(f"{BASE}/boardCnts/list.do?type=default&page={pg}&m=0403&boardID={board}&s=suneung")
        for tr in re.findall(r"<tr[^>]*>(.*?)</tr>", html, re.S):
            files=FILE_RE.findall(tr)
            if not files: continue
            tds=[re.sub(r"\s+"," ",re.sub(r"<[^>]+>","",td)).strip() for td in re.findall(r"<td[^>]*>(.*?)</td>", tr, re.S)]
            rows.append({"kind":kind,"tds":tds[:5],"files":[{"seq":s,"name":n} for s,n in files]})
json.dump(rows, open("board-rows.json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
math=[r for r in rows if any("수학" in t for t in r["tds"])]
print("전체", len(rows), "/ 수학", len(math))
for r in math: print(r["kind"], "|", " ".join(r["tds"][:4]), "|", len(r["files"]),"개")
