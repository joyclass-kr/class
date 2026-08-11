(() => {
  const overrides = {
    "gaya-theme-park": "https://gtp.ghct.or.kr/",
    "daewangam-park": "https://daewangam.donggu.ulsan.kr/",
    sogeumsan: "https://cms.wfmc.kr/web/lay1/S1T194C468/contents.do",
    "cheongju-zoo": "https://www.cheongju.go.kr/child/contents.do?key=1620",
    "naro-space-center": "https://www.kari.re.kr/narospacecenter/",
    "upo-wetland": "https://www.cng.go.kr/tour/upo.web",
    "miryang-weather-science": "https://science.kma.go.kr/miryang/",
    "cheongju-early-printing": "https://www.cheongju.go.kr/jikjiworld/contents.do?key=17474",
    "value-부산어촌민속관": "https://www.busan.go.kr/sea/onmapmuseum",
    "value-대구근대역사관": "https://dgfca.or.kr/map_list?html_cd=11",
    "regional-039": "https://www.hc.go.kr/06571/06780/06786.web?amode=view&idx=221&tord=name",
    "regional-041": "https://www.hc.go.kr/06485.web",
    "regional-a035": "https://science.kma.go.kr/jbsci/company/aboutus",
    "regional-a039": "https://tour.taebaek.go.kr/tpmuseum",
    "fun-regional-002": "https://www.yanggum.or.kr/",
    "fun-regional-003": "https://www.yanggum.or.kr/",
    "fun-regional-004": "https://www.yw.go.kr/tour/selectTourCntntsWebView.do?ctgry=6&key=560&pageIndex=1&pageUnit=9&searchCnd=all&tourNo=50",
    "fun-regional-008": "https://korean.visitkorea.or.kr/detail/ms_detail.do?cotid=d130b0c0-8439-4c1e-999a-1c7c6b9a9497",
    "fun-regional-010": "https://www.guri.go.kr/gbv/index.do",
    "fun-regional-024": "https://www.hadongteamuseum.org/",
    "fun-regional-052": "https://brsisul.or.kr/",
    "fun-regional-054": "https://www.seosan.go.kr/tour/index.do",
    "fun-regional-062": "https://www.jincheon.go.kr/site/tour/sub.do?menukey=2160",
    "fun-address-029": "https://www.yp21.go.kr/museumhub/contents.do?key=956",
    "fun-address-031": "https://ggsec.gg.go.kr/",
    "fun-address-046": "https://tradition.oc.go.kr/",
    "fun-manual-105": "https://www.uiryeong.go.kr/board/view.uiryeong?boardId=BBS_0000080&dataSid=1100991&menuCd=DOM_000000203001005000",
    "fun-manual-108": "https://www.gunwi3964.co.kr/",
    "fun-manual-109": "https://www.jindo.go.kr/tour/sub.cs?m=9",
    "fun-manual-112": "https://cheongyang.go.kr/star/sub01_01.do",
    "value-의림지역사박물관": "https://tour.jecheon.go.kr/tour/base/tour/contents/view?clturCntntsNo=94296&cpn=1&menuLevel=3&menuNo=97&psz=10&rcpp=10&siteId=base&trc=0"
  };

  for (const place of window.KOREA_TRAVEL_PLACES || []) {
    const officialUrl = overrides[place.id];
    if (!officialUrl) continue;
    place.officialUrl = officialUrl;
    place.officialLinkVerified = true;
  }
})();



