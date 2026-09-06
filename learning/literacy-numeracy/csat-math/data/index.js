// 고르고 세는 데 필요한 칸만 담은 차례표.
// 문제 본문과 풀이는 회차를 고를 때 data/exams/<회차>.js로 따로 받는다.
// tools/rebuild-index.mjs가 data/exams에서 만든다. 손으로 고치지 않는다.
(function () {
  "use strict";
  window.CSAT_MATH = {
 "units": [
  {
   "id": "m1-explog",
   "subject": "수학Ⅰ",
   "name": "지수함수와 로그함수"
  },
  {
   "id": "m1-trig",
   "subject": "수학Ⅰ",
   "name": "삼각함수"
  },
  {
   "id": "m1-seq",
   "subject": "수학Ⅰ",
   "name": "수열"
  },
  {
   "id": "m2-limit",
   "subject": "수학Ⅱ",
   "name": "함수의 극한과 연속"
  },
  {
   "id": "m2-diff",
   "subject": "수학Ⅱ",
   "name": "미분"
  },
  {
   "id": "m2-integ",
   "subject": "수학Ⅱ",
   "name": "적분"
  },
  {
   "id": "prob-count",
   "subject": "확률과 통계",
   "name": "경우의 수"
  },
  {
   "id": "prob-prob",
   "subject": "확률과 통계",
   "name": "확률"
  },
  {
   "id": "prob-stat",
   "subject": "확률과 통계",
   "name": "통계"
  },
  {
   "id": "calc-seq",
   "subject": "미적분",
   "name": "수열의 극한"
  },
  {
   "id": "calc-diff",
   "subject": "미적분",
   "name": "미분법"
  },
  {
   "id": "calc-integ",
   "subject": "미적분",
   "name": "적분법"
  },
  {
   "id": "geom-curve",
   "subject": "기하",
   "name": "이차곡선"
  },
  {
   "id": "geom-vector",
   "subject": "기하",
   "name": "평면벡터"
  },
  {
   "id": "geom-space",
   "subject": "기하",
   "name": "공간도형과 공간좌표"
  }
 ],
 "exams": [
  {
   "id": "2027-09",
   "year": 2027,
   "round": "9월",
   "label": "2027학년도 9월",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
  },
  {
   "id": "2027-06",
   "year": 2027,
   "round": "6월",
   "label": "2027학년도 6월",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
  },
  {
   "id": "2026-suneung",
   "year": 2026,
   "round": "수능",
   "label": "2026학년도 수능",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
  },
  {
   "id": "2026-09",
   "year": 2026,
   "round": "9월",
   "label": "2026학년도 9월",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
  },
  {
   "id": "2026-06",
   "year": 2026,
   "round": "6월",
   "label": "2026학년도 6월",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
  },
  {
   "id": "2025-suneung",
   "year": 2025,
   "round": "수능",
   "label": "2025학년도 수능",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
  },
  {
   "id": "2025-09",
   "year": 2025,
   "round": "9월",
   "label": "2025학년도 9월",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
  },
  {
   "id": "2025-06",
   "year": 2025,
   "round": "6월",
   "label": "2025학년도 6월",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
  },
  {
   "id": "2024-suneung",
   "year": 2024,
   "round": "수능",
   "label": "2024학년도 수능",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
  },
  {
   "id": "2024-09",
   "year": 2024,
   "round": "9월",
   "label": "2024학년도 9월",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
  },
  {
   "id": "2024-06",
   "year": 2024,
   "round": "6월",
   "label": "2024학년도 6월",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
  },
  {
   "id": "2023-suneung",
   "year": 2023,
   "round": "수능",
   "label": "2023학년도 수능",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
  },
  {
   "id": "2023-09",
   "year": 2023,
   "round": "9월",
   "label": "2023학년도 9월",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
  },
  {
   "id": "2023-06",
   "year": 2023,
   "round": "6월",
   "label": "2023학년도 6월",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
  },
  {
   "id": "2022-suneung",
   "year": 2022,
   "round": "수능",
   "label": "2022학년도 수능",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500234&m=0403&s=suneung"
  },
  {
   "id": "2022-09",
   "year": 2022,
   "round": "9월",
   "label": "2022학년도 9월",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
  },
  {
   "id": "2022-06",
   "year": 2022,
   "round": "6월",
   "label": "2022학년도 6월",
   "source": "https://www.suneung.re.kr/boardCnts/list.do?boardID=1500236&m=0403&s=suneung"
  }
 ],
 "problems": [
  {
   "id": "2027-09-9",
   "exam": "2027-09",
   "no": 9,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2027-09-10",
   "exam": "2027-09",
   "no": 10,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2027-09-11",
   "exam": "2027-09",
   "no": 11,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2027-09-12",
   "exam": "2027-09",
   "no": 12,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2027-09-13",
   "exam": "2027-09",
   "no": 13,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2027-09-14",
   "exam": "2027-09",
   "no": 14,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2027-09-15",
   "exam": "2027-09",
   "no": 15,
   "score": 4,
   "units": [
    "m2-limit"
   ]
  },
  {
   "id": "2027-09-20",
   "exam": "2027-09",
   "no": 20,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2027-09-21",
   "exam": "2027-09",
   "no": 21,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2027-09-22",
   "exam": "2027-09",
   "no": 22,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2027-09-prob-28",
   "exam": "2027-09",
   "no": 28,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2027-09-prob-29",
   "exam": "2027-09",
   "no": 29,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2027-09-prob-30",
   "exam": "2027-09",
   "no": 30,
   "score": 4,
   "units": [
    "prob-stat"
   ]
  },
  {
   "id": "2027-09-calc-28",
   "exam": "2027-09",
   "no": 28,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2027-09-calc-29",
   "exam": "2027-09",
   "no": 29,
   "score": 4,
   "units": [
    "calc-seq"
   ]
  },
  {
   "id": "2027-09-calc-30",
   "exam": "2027-09",
   "no": 30,
   "score": 4,
   "units": [
    "calc-integ"
   ]
  },
  {
   "id": "2027-09-geom-28",
   "exam": "2027-09",
   "no": 28,
   "score": 4,
   "units": [
    "geom-space"
   ]
  },
  {
   "id": "2027-09-geom-29",
   "exam": "2027-09",
   "no": 29,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2027-09-geom-30",
   "exam": "2027-09",
   "no": 30,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2027-06-9",
   "exam": "2027-06",
   "no": 9,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2027-06-10",
   "exam": "2027-06",
   "no": 10,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2027-06-11",
   "exam": "2027-06",
   "no": 11,
   "score": 4,
   "units": [
    "m2-limit"
   ]
  },
  {
   "id": "2027-06-12",
   "exam": "2027-06",
   "no": 12,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2027-06-13",
   "exam": "2027-06",
   "no": 13,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2027-06-14",
   "exam": "2027-06",
   "no": 14,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2027-06-15",
   "exam": "2027-06",
   "no": 15,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2027-06-20",
   "exam": "2027-06",
   "no": 20,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2027-06-21",
   "exam": "2027-06",
   "no": 21,
   "score": 4,
   "units": [
    "m2-diff",
    "m2-limit"
   ]
  },
  {
   "id": "2027-06-22",
   "exam": "2027-06",
   "no": 22,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2027-06-prob-28",
   "exam": "2027-06",
   "no": 28,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2027-06-prob-29",
   "exam": "2027-06",
   "no": 29,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2027-06-prob-30",
   "exam": "2027-06",
   "no": 30,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2027-06-calc-28",
   "exam": "2027-06",
   "no": 28,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2027-06-calc-29",
   "exam": "2027-06",
   "no": 29,
   "score": 4,
   "units": [
    "calc-seq"
   ]
  },
  {
   "id": "2027-06-calc-30",
   "exam": "2027-06",
   "no": 30,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2027-06-geom-28",
   "exam": "2027-06",
   "no": 28,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2027-06-geom-29",
   "exam": "2027-06",
   "no": 29,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2027-06-geom-30",
   "exam": "2027-06",
   "no": 30,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2026-suneung-9",
   "exam": "2026-suneung",
   "no": 9,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2026-suneung-10",
   "exam": "2026-suneung",
   "no": 10,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2026-suneung-11",
   "exam": "2026-suneung",
   "no": 11,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2026-suneung-12",
   "exam": "2026-suneung",
   "no": 12,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2026-suneung-13",
   "exam": "2026-suneung",
   "no": 13,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2026-suneung-14",
   "exam": "2026-suneung",
   "no": 14,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2026-suneung-15",
   "exam": "2026-suneung",
   "no": 15,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2026-suneung-20",
   "exam": "2026-suneung",
   "no": 20,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2026-suneung-21",
   "exam": "2026-suneung",
   "no": 21,
   "score": 4,
   "units": [
    "m2-limit"
   ]
  },
  {
   "id": "2026-suneung-22",
   "exam": "2026-suneung",
   "no": 22,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2026-suneung-prob-28",
   "exam": "2026-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2026-suneung-prob-29",
   "exam": "2026-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "prob-stat"
   ]
  },
  {
   "id": "2026-suneung-prob-30",
   "exam": "2026-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2026-suneung-calc-28",
   "exam": "2026-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "calc-integ"
   ]
  },
  {
   "id": "2026-suneung-calc-29",
   "exam": "2026-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "calc-seq"
   ]
  },
  {
   "id": "2026-suneung-calc-30",
   "exam": "2026-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2026-suneung-geom-28",
   "exam": "2026-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "geom-space"
   ]
  },
  {
   "id": "2026-suneung-geom-29",
   "exam": "2026-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2026-suneung-geom-30",
   "exam": "2026-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2026-09-9",
   "exam": "2026-09",
   "no": 9,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2026-09-10",
   "exam": "2026-09",
   "no": 10,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2026-09-11",
   "exam": "2026-09",
   "no": 11,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2026-09-12",
   "exam": "2026-09",
   "no": 12,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2026-09-13",
   "exam": "2026-09",
   "no": 13,
   "score": 4,
   "units": [
    "m2-limit"
   ]
  },
  {
   "id": "2026-09-14",
   "exam": "2026-09",
   "no": 14,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2026-09-15",
   "exam": "2026-09",
   "no": 15,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2026-09-20",
   "exam": "2026-09",
   "no": 20,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2026-09-21",
   "exam": "2026-09",
   "no": 21,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2026-09-22",
   "exam": "2026-09",
   "no": 22,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2026-09-prob-28",
   "exam": "2026-09",
   "no": 28,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2026-09-prob-29",
   "exam": "2026-09",
   "no": 29,
   "score": 4,
   "units": [
    "prob-stat"
   ]
  },
  {
   "id": "2026-09-prob-30",
   "exam": "2026-09",
   "no": 30,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2026-09-calc-28",
   "exam": "2026-09",
   "no": 28,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2026-09-calc-29",
   "exam": "2026-09",
   "no": 29,
   "score": 4,
   "units": [
    "calc-seq"
   ]
  },
  {
   "id": "2026-09-calc-30",
   "exam": "2026-09",
   "no": 30,
   "score": 4,
   "units": [
    "calc-integ"
   ]
  },
  {
   "id": "2026-09-geom-28",
   "exam": "2026-09",
   "no": 28,
   "score": 4,
   "units": [
    "geom-space"
   ]
  },
  {
   "id": "2026-09-geom-29",
   "exam": "2026-09",
   "no": 29,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2026-09-geom-30",
   "exam": "2026-09",
   "no": 30,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2026-06-9",
   "exam": "2026-06",
   "no": 9,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2026-06-10",
   "exam": "2026-06",
   "no": 10,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2026-06-11",
   "exam": "2026-06",
   "no": 11,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2026-06-12",
   "exam": "2026-06",
   "no": 12,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2026-06-13",
   "exam": "2026-06",
   "no": 13,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2026-06-14",
   "exam": "2026-06",
   "no": 14,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2026-06-15",
   "exam": "2026-06",
   "no": 15,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2026-06-20",
   "exam": "2026-06",
   "no": 20,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2026-06-21",
   "exam": "2026-06",
   "no": 21,
   "score": 4,
   "units": [
    "m2-limit"
   ]
  },
  {
   "id": "2026-06-22",
   "exam": "2026-06",
   "no": 22,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2026-06-prob-28",
   "exam": "2026-06",
   "no": 28,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2026-06-prob-29",
   "exam": "2026-06",
   "no": 29,
   "score": 4,
   "units": [
    "prob-stat"
   ]
  },
  {
   "id": "2026-06-prob-30",
   "exam": "2026-06",
   "no": 30,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2026-06-calc-28",
   "exam": "2026-06",
   "no": 28,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2026-06-calc-29",
   "exam": "2026-06",
   "no": 29,
   "score": 4,
   "units": [
    "calc-seq"
   ]
  },
  {
   "id": "2026-06-calc-30",
   "exam": "2026-06",
   "no": 30,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2026-06-geom-28",
   "exam": "2026-06",
   "no": 28,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2026-06-geom-29",
   "exam": "2026-06",
   "no": 29,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2026-06-geom-30",
   "exam": "2026-06",
   "no": 30,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2025-suneung-9",
   "exam": "2025-suneung",
   "no": 9,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2025-suneung-10",
   "exam": "2025-suneung",
   "no": 10,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2025-suneung-11",
   "exam": "2025-suneung",
   "no": 11,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2025-suneung-12",
   "exam": "2025-suneung",
   "no": 12,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2025-suneung-13",
   "exam": "2025-suneung",
   "no": 13,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2025-suneung-14",
   "exam": "2025-suneung",
   "no": 14,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2025-suneung-15",
   "exam": "2025-suneung",
   "no": 15,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2025-suneung-20",
   "exam": "2025-suneung",
   "no": 20,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2025-suneung-21",
   "exam": "2025-suneung",
   "no": 21,
   "score": 4,
   "units": [
    "m2-limit"
   ]
  },
  {
   "id": "2025-suneung-22",
   "exam": "2025-suneung",
   "no": 22,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2025-suneung-prob-28",
   "exam": "2025-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2025-suneung-prob-29",
   "exam": "2025-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "prob-stat"
   ]
  },
  {
   "id": "2025-suneung-prob-30",
   "exam": "2025-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2025-suneung-calc-28",
   "exam": "2025-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "calc-integ",
    "calc-diff"
   ]
  },
  {
   "id": "2025-suneung-calc-29",
   "exam": "2025-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "calc-seq"
   ]
  },
  {
   "id": "2025-suneung-calc-30",
   "exam": "2025-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2025-suneung-geom-28",
   "exam": "2025-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "geom-space"
   ]
  },
  {
   "id": "2025-suneung-geom-29",
   "exam": "2025-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2025-suneung-geom-30",
   "exam": "2025-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2025-09-9",
   "exam": "2025-09",
   "no": 9,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2025-09-10",
   "exam": "2025-09",
   "no": 10,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2025-09-11",
   "exam": "2025-09",
   "no": 11,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2025-09-12",
   "exam": "2025-09",
   "no": 12,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2025-09-13",
   "exam": "2025-09",
   "no": 13,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2025-09-14",
   "exam": "2025-09",
   "no": 14,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2025-09-15",
   "exam": "2025-09",
   "no": 15,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2025-09-20",
   "exam": "2025-09",
   "no": 20,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2025-09-21",
   "exam": "2025-09",
   "no": 21,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2025-09-22",
   "exam": "2025-09",
   "no": 22,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2025-09-prob-28",
   "exam": "2025-09",
   "no": 28,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2025-09-prob-29",
   "exam": "2025-09",
   "no": 29,
   "score": 4,
   "units": [
    "prob-stat"
   ]
  },
  {
   "id": "2025-09-prob-30",
   "exam": "2025-09",
   "no": 30,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2025-09-calc-28",
   "exam": "2025-09",
   "no": 28,
   "score": 4,
   "units": [
    "calc-integ"
   ]
  },
  {
   "id": "2025-09-calc-29",
   "exam": "2025-09",
   "no": 29,
   "score": 4,
   "units": [
    "calc-seq"
   ]
  },
  {
   "id": "2025-09-calc-30",
   "exam": "2025-09",
   "no": 30,
   "score": 4,
   "units": [
    "calc-integ",
    "calc-diff"
   ]
  },
  {
   "id": "2025-09-geom-28",
   "exam": "2025-09",
   "no": 28,
   "score": 4,
   "units": [
    "geom-space"
   ]
  },
  {
   "id": "2025-09-geom-29",
   "exam": "2025-09",
   "no": 29,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2025-09-geom-30",
   "exam": "2025-09",
   "no": 30,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2025-06-9",
   "exam": "2025-06",
   "no": 9,
   "score": 4,
   "units": [
    "m2-limit"
   ]
  },
  {
   "id": "2025-06-10",
   "exam": "2025-06",
   "no": 10,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2025-06-11",
   "exam": "2025-06",
   "no": 11,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2025-06-12",
   "exam": "2025-06",
   "no": 12,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2025-06-13",
   "exam": "2025-06",
   "no": 13,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2025-06-14",
   "exam": "2025-06",
   "no": 14,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2025-06-15",
   "exam": "2025-06",
   "no": 15,
   "score": 4,
   "units": [
    "m2-diff",
    "m2-integ"
   ]
  },
  {
   "id": "2025-06-20",
   "exam": "2025-06",
   "no": 20,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2025-06-21",
   "exam": "2025-06",
   "no": 21,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2025-06-22",
   "exam": "2025-06",
   "no": 22,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2025-06-prob-28",
   "exam": "2025-06",
   "no": 28,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2025-06-prob-29",
   "exam": "2025-06",
   "no": 29,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2025-06-prob-30",
   "exam": "2025-06",
   "no": 30,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2025-06-calc-28",
   "exam": "2025-06",
   "no": 28,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2025-06-calc-29",
   "exam": "2025-06",
   "no": 29,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2025-06-calc-30",
   "exam": "2025-06",
   "no": 30,
   "score": 4,
   "units": [
    "calc-diff",
    "calc-seq"
   ]
  },
  {
   "id": "2025-06-geom-28",
   "exam": "2025-06",
   "no": 28,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2025-06-geom-29",
   "exam": "2025-06",
   "no": 29,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2025-06-geom-30",
   "exam": "2025-06",
   "no": 30,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2024-suneung-9",
   "exam": "2024-suneung",
   "no": 9,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2024-suneung-10",
   "exam": "2024-suneung",
   "no": 10,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2024-suneung-11",
   "exam": "2024-suneung",
   "no": 11,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2024-suneung-12",
   "exam": "2024-suneung",
   "no": 12,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2024-suneung-13",
   "exam": "2024-suneung",
   "no": 13,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2024-suneung-14",
   "exam": "2024-suneung",
   "no": 14,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2024-suneung-15",
   "exam": "2024-suneung",
   "no": 15,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2024-suneung-20",
   "exam": "2024-suneung",
   "no": 20,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2024-suneung-21",
   "exam": "2024-suneung",
   "no": 21,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2024-suneung-22",
   "exam": "2024-suneung",
   "no": 22,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2024-suneung-prob-28",
   "exam": "2024-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2024-suneung-prob-29",
   "exam": "2024-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2024-suneung-prob-30",
   "exam": "2024-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "prob-stat"
   ]
  },
  {
   "id": "2024-suneung-calc-28",
   "exam": "2024-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "calc-integ"
   ]
  },
  {
   "id": "2024-suneung-calc-29",
   "exam": "2024-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "calc-seq"
   ]
  },
  {
   "id": "2024-suneung-calc-30",
   "exam": "2024-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2024-suneung-geom-28",
   "exam": "2024-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "geom-space"
   ]
  },
  {
   "id": "2024-suneung-geom-29",
   "exam": "2024-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2024-suneung-geom-30",
   "exam": "2024-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2024-09-9",
   "exam": "2024-09",
   "no": 9,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2024-09-10",
   "exam": "2024-09",
   "no": 10,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2024-09-11",
   "exam": "2024-09",
   "no": 11,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2024-09-12",
   "exam": "2024-09",
   "no": 12,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2024-09-13",
   "exam": "2024-09",
   "no": 13,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2024-09-14",
   "exam": "2024-09",
   "no": 14,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2024-09-15",
   "exam": "2024-09",
   "no": 15,
   "score": 4,
   "units": [
    "m2-limit"
   ]
  },
  {
   "id": "2024-09-20",
   "exam": "2024-09",
   "no": 20,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2024-09-21",
   "exam": "2024-09",
   "no": 21,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2024-09-22",
   "exam": "2024-09",
   "no": 22,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2024-09-prob-28",
   "exam": "2024-09",
   "no": 28,
   "score": 4,
   "units": [
    "prob-stat"
   ]
  },
  {
   "id": "2024-09-prob-29",
   "exam": "2024-09",
   "no": 29,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2024-09-prob-30",
   "exam": "2024-09",
   "no": 30,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2024-09-calc-28",
   "exam": "2024-09",
   "no": 28,
   "score": 4,
   "units": [
    "calc-integ"
   ]
  },
  {
   "id": "2024-09-calc-29",
   "exam": "2024-09",
   "no": 29,
   "score": 4,
   "units": [
    "calc-seq"
   ]
  },
  {
   "id": "2024-09-calc-30",
   "exam": "2024-09",
   "no": 30,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2024-09-geom-28",
   "exam": "2024-09",
   "no": 28,
   "score": 4,
   "units": [
    "geom-space"
   ]
  },
  {
   "id": "2024-09-geom-29",
   "exam": "2024-09",
   "no": 29,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2024-09-geom-30",
   "exam": "2024-09",
   "no": 30,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2024-06-9",
   "exam": "2024-06",
   "no": 9,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2024-06-10",
   "exam": "2024-06",
   "no": 10,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2024-06-11",
   "exam": "2024-06",
   "no": 11,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2024-06-12",
   "exam": "2024-06",
   "no": 12,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2024-06-13",
   "exam": "2024-06",
   "no": 13,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2024-06-14",
   "exam": "2024-06",
   "no": 14,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2024-06-15",
   "exam": "2024-06",
   "no": 15,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2024-06-20",
   "exam": "2024-06",
   "no": 20,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2024-06-21",
   "exam": "2024-06",
   "no": 21,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2024-06-22",
   "exam": "2024-06",
   "no": 22,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2024-06-prob-28",
   "exam": "2024-06",
   "no": 28,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2024-06-prob-29",
   "exam": "2024-06",
   "no": 29,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2024-06-prob-30",
   "exam": "2024-06",
   "no": 30,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2024-06-calc-28",
   "exam": "2024-06",
   "no": 28,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2024-06-calc-29",
   "exam": "2024-06",
   "no": 29,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2024-06-calc-30",
   "exam": "2024-06",
   "no": 30,
   "score": 4,
   "units": [
    "calc-seq"
   ]
  },
  {
   "id": "2024-06-geom-28",
   "exam": "2024-06",
   "no": 28,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2024-06-geom-29",
   "exam": "2024-06",
   "no": 29,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2024-06-geom-30",
   "exam": "2024-06",
   "no": 30,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2023-suneung-9",
   "exam": "2023-suneung",
   "no": 9,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2023-suneung-10",
   "exam": "2023-suneung",
   "no": 10,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2023-suneung-11",
   "exam": "2023-suneung",
   "no": 11,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2023-suneung-12",
   "exam": "2023-suneung",
   "no": 12,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2023-suneung-13",
   "exam": "2023-suneung",
   "no": 13,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2023-suneung-14",
   "exam": "2023-suneung",
   "no": 14,
   "score": 4,
   "units": [
    "m2-limit"
   ]
  },
  {
   "id": "2023-suneung-15",
   "exam": "2023-suneung",
   "no": 15,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2023-suneung-20",
   "exam": "2023-suneung",
   "no": 20,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2023-suneung-21",
   "exam": "2023-suneung",
   "no": 21,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2023-suneung-22",
   "exam": "2023-suneung",
   "no": 22,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2023-suneung-prob-28",
   "exam": "2023-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "prob-stat"
   ]
  },
  {
   "id": "2023-suneung-prob-29",
   "exam": "2023-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2023-suneung-prob-30",
   "exam": "2023-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2023-suneung-calc-28",
   "exam": "2023-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2023-suneung-calc-29",
   "exam": "2023-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "calc-integ"
   ]
  },
  {
   "id": "2023-suneung-calc-30",
   "exam": "2023-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2023-suneung-geom-28",
   "exam": "2023-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2023-suneung-geom-29",
   "exam": "2023-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2023-suneung-geom-30",
   "exam": "2023-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "geom-space"
   ]
  },
  {
   "id": "2023-09-9",
   "exam": "2023-09",
   "no": 9,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2023-09-10",
   "exam": "2023-09",
   "no": 10,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2023-09-11",
   "exam": "2023-09",
   "no": 11,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2023-09-12",
   "exam": "2023-09",
   "no": 12,
   "score": 4,
   "units": [
    "m2-limit"
   ]
  },
  {
   "id": "2023-09-13",
   "exam": "2023-09",
   "no": 13,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2023-09-14",
   "exam": "2023-09",
   "no": 14,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2023-09-15",
   "exam": "2023-09",
   "no": 15,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2023-09-20",
   "exam": "2023-09",
   "no": 20,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2023-09-21",
   "exam": "2023-09",
   "no": 21,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2023-09-22",
   "exam": "2023-09",
   "no": 22,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2023-09-prob-28",
   "exam": "2023-09",
   "no": 28,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2023-09-prob-29",
   "exam": "2023-09",
   "no": 29,
   "score": 4,
   "units": [
    "prob-stat"
   ]
  },
  {
   "id": "2023-09-prob-30",
   "exam": "2023-09",
   "no": 30,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2023-09-calc-28",
   "exam": "2023-09",
   "no": 28,
   "score": 4,
   "units": [
    "calc-seq",
    "calc-diff"
   ]
  },
  {
   "id": "2023-09-calc-29",
   "exam": "2023-09",
   "no": 29,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2023-09-calc-30",
   "exam": "2023-09",
   "no": 30,
   "score": 4,
   "units": [
    "calc-integ",
    "calc-diff"
   ]
  },
  {
   "id": "2023-09-geom-28",
   "exam": "2023-09",
   "no": 28,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2023-09-geom-29",
   "exam": "2023-09",
   "no": 29,
   "score": 4,
   "units": [
    "geom-space"
   ]
  },
  {
   "id": "2023-09-geom-30",
   "exam": "2023-09",
   "no": 30,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2023-06-9",
   "exam": "2023-06",
   "no": 9,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2023-06-10",
   "exam": "2023-06",
   "no": 10,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2023-06-11",
   "exam": "2023-06",
   "no": 11,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2023-06-12",
   "exam": "2023-06",
   "no": 12,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2023-06-13",
   "exam": "2023-06",
   "no": 13,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2023-06-14",
   "exam": "2023-06",
   "no": 14,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2023-06-15",
   "exam": "2023-06",
   "no": 15,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2023-06-20",
   "exam": "2023-06",
   "no": 20,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2023-06-21",
   "exam": "2023-06",
   "no": 21,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2023-06-22",
   "exam": "2023-06",
   "no": 22,
   "score": 4,
   "units": [
    "m2-limit"
   ]
  },
  {
   "id": "2023-06-prob-28",
   "exam": "2023-06",
   "no": 28,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2023-06-prob-29",
   "exam": "2023-06",
   "no": 29,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2023-06-prob-30",
   "exam": "2023-06",
   "no": 30,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2023-06-calc-28",
   "exam": "2023-06",
   "no": 28,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2023-06-calc-29",
   "exam": "2023-06",
   "no": 29,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2023-06-calc-30",
   "exam": "2023-06",
   "no": 30,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2023-06-geom-28",
   "exam": "2023-06",
   "no": 28,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2023-06-geom-29",
   "exam": "2023-06",
   "no": 29,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2023-06-geom-30",
   "exam": "2023-06",
   "no": 30,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2022-suneung-9",
   "exam": "2022-suneung",
   "no": 9,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2022-suneung-10",
   "exam": "2022-suneung",
   "no": 10,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2022-suneung-11",
   "exam": "2022-suneung",
   "no": 11,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2022-suneung-12",
   "exam": "2022-suneung",
   "no": 12,
   "score": 4,
   "units": [
    "m2-limit"
   ]
  },
  {
   "id": "2022-suneung-13",
   "exam": "2022-suneung",
   "no": 13,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2022-suneung-14",
   "exam": "2022-suneung",
   "no": 14,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2022-suneung-15",
   "exam": "2022-suneung",
   "no": 15,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2022-suneung-20",
   "exam": "2022-suneung",
   "no": 20,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2022-suneung-21",
   "exam": "2022-suneung",
   "no": 21,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2022-suneung-22",
   "exam": "2022-suneung",
   "no": 22,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2022-suneung-prob-28",
   "exam": "2022-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2022-suneung-prob-29",
   "exam": "2022-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "prob-stat"
   ]
  },
  {
   "id": "2022-suneung-prob-30",
   "exam": "2022-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2022-suneung-calc-28",
   "exam": "2022-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2022-suneung-calc-29",
   "exam": "2022-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2022-suneung-calc-30",
   "exam": "2022-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "calc-integ"
   ]
  },
  {
   "id": "2022-suneung-geom-28",
   "exam": "2022-suneung",
   "no": 28,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2022-suneung-geom-29",
   "exam": "2022-suneung",
   "no": 29,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2022-suneung-geom-30",
   "exam": "2022-suneung",
   "no": 30,
   "score": 4,
   "units": [
    "geom-space"
   ]
  },
  {
   "id": "2022-09-9",
   "exam": "2022-09",
   "no": 9,
   "score": 4,
   "units": [
    "m2-diff",
    "m2-integ"
   ]
  },
  {
   "id": "2022-09-10",
   "exam": "2022-09",
   "no": 10,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2022-09-11",
   "exam": "2022-09",
   "no": 11,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2022-09-12",
   "exam": "2022-09",
   "no": 12,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2022-09-13",
   "exam": "2022-09",
   "no": 13,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2022-09-14",
   "exam": "2022-09",
   "no": 14,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2022-09-15",
   "exam": "2022-09",
   "no": 15,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2022-09-20",
   "exam": "2022-09",
   "no": 20,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2022-09-21",
   "exam": "2022-09",
   "no": 21,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2022-09-22",
   "exam": "2022-09",
   "no": 22,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2022-09-prob-28",
   "exam": "2022-09",
   "no": 28,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2022-09-prob-29",
   "exam": "2022-09",
   "no": 29,
   "score": 4,
   "units": [
    "prob-stat"
   ]
  },
  {
   "id": "2022-09-prob-30",
   "exam": "2022-09",
   "no": 30,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2022-09-calc-28",
   "exam": "2022-09",
   "no": 28,
   "score": 4,
   "units": [
    "calc-integ",
    "calc-diff"
   ]
  },
  {
   "id": "2022-09-calc-29",
   "exam": "2022-09",
   "no": 29,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2022-09-calc-30",
   "exam": "2022-09",
   "no": 30,
   "score": 4,
   "units": [
    "calc-integ",
    "calc-diff"
   ]
  },
  {
   "id": "2022-09-geom-28",
   "exam": "2022-09",
   "no": 28,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2022-09-geom-29",
   "exam": "2022-09",
   "no": 29,
   "score": 4,
   "units": [
    "geom-space"
   ]
  },
  {
   "id": "2022-09-geom-30",
   "exam": "2022-09",
   "no": 30,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  },
  {
   "id": "2022-06-9",
   "exam": "2022-06",
   "no": 9,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2022-06-10",
   "exam": "2022-06",
   "no": 10,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2022-06-11",
   "exam": "2022-06",
   "no": 11,
   "score": 4,
   "units": [
    "m2-integ"
   ]
  },
  {
   "id": "2022-06-12",
   "exam": "2022-06",
   "no": 12,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2022-06-13",
   "exam": "2022-06",
   "no": 13,
   "score": 4,
   "units": [
    "m1-seq"
   ]
  },
  {
   "id": "2022-06-14",
   "exam": "2022-06",
   "no": 14,
   "score": 4,
   "units": [
    "m2-limit",
    "m2-diff"
   ]
  },
  {
   "id": "2022-06-15",
   "exam": "2022-06",
   "no": 15,
   "score": 4,
   "units": [
    "m1-trig"
   ]
  },
  {
   "id": "2022-06-20",
   "exam": "2022-06",
   "no": 20,
   "score": 4,
   "units": [
    "m2-integ",
    "m2-diff"
   ]
  },
  {
   "id": "2022-06-21",
   "exam": "2022-06",
   "no": 21,
   "score": 4,
   "units": [
    "m1-explog"
   ]
  },
  {
   "id": "2022-06-22",
   "exam": "2022-06",
   "no": 22,
   "score": 4,
   "units": [
    "m2-diff"
   ]
  },
  {
   "id": "2022-06-prob-28",
   "exam": "2022-06",
   "no": 28,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2022-06-prob-29",
   "exam": "2022-06",
   "no": 29,
   "score": 4,
   "units": [
    "prob-count"
   ]
  },
  {
   "id": "2022-06-prob-30",
   "exam": "2022-06",
   "no": 30,
   "score": 4,
   "units": [
    "prob-prob"
   ]
  },
  {
   "id": "2022-06-calc-28",
   "exam": "2022-06",
   "no": 28,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2022-06-calc-29",
   "exam": "2022-06",
   "no": 29,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2022-06-calc-30",
   "exam": "2022-06",
   "no": 30,
   "score": 4,
   "units": [
    "calc-diff"
   ]
  },
  {
   "id": "2022-06-geom-28",
   "exam": "2022-06",
   "no": 28,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2022-06-geom-29",
   "exam": "2022-06",
   "no": 29,
   "score": 4,
   "units": [
    "geom-curve"
   ]
  },
  {
   "id": "2022-06-geom-30",
   "exam": "2022-06",
   "no": 30,
   "score": 4,
   "units": [
    "geom-vector"
   ]
  }
 ]
};
})();
