# 주문 — 자율신경 온몸 평면 2D 그림 (autonomic-diagram.svg)

인체 시뮬레이터 **신경계 · 3. 자율신경 (교감·부교감)** 장면에 쓸 그림입니다.

---

## 0. 왜 다시 그리는가

지금은 `nervous-autonomic.webp` 라는 **형광 파랑 홀로그램 사진**이 깔려 있습니다.

- 사람 몸이 **빛나는 파란 유리 인형**처럼 보입니다. 인체 도식이 아닙니다.
- 기관(눈·기관지·심장·소화관·방광)이 **다 같은 파랑**으로 뭉개져 어느 것이
  무엇인지 알 수 없습니다. 그 위에 붉은 원만 얹혀 있습니다.
- 어두운 배경에 어두운 몸이라 대비가 낮고, 붉은 글씨가 몸 위에 겹칩니다.

이 장면이 가르치는 것은 **같은 기관에 교감·부교감 두 신경이 함께 붙어
반대로 조절한다**는 것입니다. 그러려면 **기관 다섯이 또렷이 갈리고,
두 신경 줄기가 눈에 보이게 달라야** 합니다.

## 1. 규격

- `viewBox="0 0 1000 700"`
- 배경을 깔지 마세요. 투명하게 둡니다.
- **`<text>` 0개.** 이름표는 엔진이 HTML 로 얹습니다.
- **`radialGradient` · `filter` · 발광 금지.** 순백 하이라이트 금지.
- `linearGradient` 는 조각 하나에 하나, stop 두 개, **밝기 차 15% 안**.
- 조각마다 `id`.

## 2. 짜임

몸을 **앞에서 본 반투명 윤곽** 안에 기관 다섯을 놓고,
**등뼈를 따라 두 신경 줄기**가 내려가며 각 기관으로 가지를 뻗습니다.

- **왼쪽 줄기 = 교감신경** (긴장·위기)
- **오른쪽 줄기 = 부교감신경** (휴식·안정)

두 줄기는 **색과 굵기로 확실히 달라야** 합니다. 학생이 어느 쪽이 어느 쪽인지
색만 보고 알아야 합니다.

## 3. 조각 이름 (id)

```
bodyOutline     몸 윤곽 — 아주 옅은 선 하나. 사람 모양임만 알면 된다.
spine           등뼈 — 가운데 세로

<g id="sympathetic">      교감신경 줄기와 가지 (왼쪽)
   symToEye, symToLung, symToHeart, symToGut, symToBladder
</g>
<g id="parasympathetic">  부교감신경 줄기와 가지 (오른쪽)
   paraToEye, paraToLung, paraToHeart, paraToGut, paraToBladder
</g>

organEye        눈
organLung       기관지 (허파 포함)
organHeart      심장
organGut        소화관 (위와 창자)
organBladder    방광
```

기관 다섯은 **엔진이 크기와 색을 바꿉니다.** 각각 `<g>` 묶음으로 싸 주세요.
(교감이 켜지면 눈은 커지고 심장은 빨라지는 표시를 엔진이 얹습니다.)

## 4. 색

| 조각 | 칠 | 테두리 |
|---|---|---|
| bodyOutline | 없음 (`fill="none"`) | `#5b6a80`, 굵기 2 |
| spine | `#dfe6ee` | `#a8b3c2` |
| sympathetic (줄기·가지) | 선만 `#e8734a`, 굵기 3.5 | — |
| parasympathetic (줄기·가지) | 선만 `#4a9d8f`, 굵기 3.5 | — |
| organEye | `#e8ecf2` | `#9aa5b4` |
| organLung | `#e0a2ad` | `#bd7a86` |
| organHeart | `#c8455e` | `#e88a9a` |
| organGut | `#d9a05b` | `#b07c3c` |
| organBladder | `#e5c46a` | `#bb9c40` |

## 5. 하지 말아야 할 것

- 홀로그램·형광·발광, 파란 유리 느낌
- 배경 사각형
- 영어 글자
- 뼈대·근육 같은 곁가지 (이 장면은 자율신경만 다룹니다)

## 6. 받고 나서 제가 재는 것

- 위 열여덟 개 `id` 가 다 있는가
- `<text>` 0개, `radialGradient` · `filter` 0개, 밝기 차 15% 안
- 교감과 부교감의 **선 색이 다른가**
- 기관 다섯이 **서로 다른 색인가**
- 가지가 제 기관에 닿아 있는가 (틈 0):
  symToEye↔organEye, paraToEye↔organEye, symToHeart↔organHeart …
  열 쌍 전부
- 두 줄기가 `spine` 에 닿아 있는가
- 기관 다섯이 `bodyOutline` 안에 들어 있는가
- 눈금(0~1000, 0~700) 밖으로 나간 조각이 없는가

파일 자리: `learning/inquiry/human-body/assets/images/autonomic-diagram.svg`
