"use client";

import type { MiddleCurriculumVisual as Visual } from "../../lib/middle-curriculum-workouts";

function GeometryVisual({ variant }: { variant: string }) {
  if (variant === "cube-skew") {
    return (
      <svg viewBox="0 0 260 130" role="img" aria-label="정육면체에서 두 직선의 위치 관계">
        <g className="curriculum-visual-guide">
          <path d="M45 30H145V105H45Z M75 15H175V90H145 M45 30L75 15 M145 30L175 15 M145 105L175 90" />
        </g>
        <g className="curriculum-visual-highlight">
          <path d="M45 30H145 M175 15V90" />
        </g>
        <g className="curriculum-visual-label">
          <text x="32" y="29">A</text><text x="148" y="28">B</text>
          <text x="181" y="17">C</text><text x="181" y="94">G</text>
        </g>
      </svg>
    );
  }
  if (variant === "line-plane-perpendicular") {
    return (
      <svg viewBox="0 0 260 130" role="img" aria-label="평면에 수직인 직선">
        <polygon className="curriculum-visual-plane" points="45,78 105,46 218,68 155,103" />
        <path className="curriculum-visual-highlight" d="M132 12V78" />
        <path className="curriculum-visual-guide" d="M118 78H132V64" />
        <text className="curriculum-visual-label" x="140" y="25">l</text>
        <text className="curriculum-visual-label" x="185" y="88">α</text>
      </svg>
    );
  }
  if (variant === "perpendicular-bisector") {
    return (
      <svg viewBox="0 0 260 130" role="img" aria-label="선분의 수직이등분선">
        <path className="curriculum-visual-guide" d="M45 88H215 M130 16V112 M122 88V80H130" />
        <path className="curriculum-visual-mark" d="M84 82V94 M176 82V94" />
        <circle className="curriculum-visual-point" cx="130" cy="34" r="4" />
        <text className="curriculum-visual-label" x="34" y="105">A</text>
        <text className="curriculum-visual-label" x="216" y="105">B</text>
        <text className="curriculum-visual-label" x="140" y="34">P</text>
      </svg>
    );
  }
  if (variant === "angle-bisector") {
    return (
      <svg viewBox="0 0 260 130" role="img" aria-label="각의 이등분선">
        <path className="curriculum-visual-guide" d="M55 104L218 104 M55 104L184 24" />
        <path className="curriculum-visual-highlight" d="M55 104L205 61" />
        <path className="curriculum-visual-arc" d="M93 104A38 38 0 0 0 86 84 M86 84A38 38 0 0 0 76 73" />
        <text className="curriculum-visual-label" x="42" y="119">O</text>
        <text className="curriculum-visual-label" x="221" y="111">B</text>
        <text className="curriculum-visual-label" x="186" y="23">A</text>
        <text className="curriculum-visual-label" x="208" y="61">X</text>
      </svg>
    );
  }
  if (["isosceles-angle", "triangle-exterior", "incenter-bisector", "centroid-ratio", "circumcenter-distance"].includes(variant)) {
    const isExterior = variant === "triangle-exterior";
    const isIncenter = variant === "incenter-bisector";
    const isCentroid = variant === "centroid-ratio";
    const isCircumcenter = variant === "circumcenter-distance";
    return (
      <svg viewBox="0 0 280 150" role="img" aria-label="삼각형의 각과 중심">
        <path className="curriculum-visual-guide" d="M42 122L230 122L132 24Z" />
        {isExterior && <path className="curriculum-visual-highlight" d="M230 122H270" />}
        {isIncenter && <path className="curriculum-visual-highlight" d="M42 122L153 88" />}
        {isCentroid && <><path className="curriculum-visual-guide" d="M132 24L136 122" /><circle className="curriculum-visual-point" cx="135" cy="88" r="4" /></>}
        {isCircumcenter && <><circle className="curriculum-visual-point" cx="136" cy="82" r="4" /><path className="curriculum-visual-highlight" d="M136 82L42 122 M136 82L132 24 M136 82L230 122" /></>}
        <g className="curriculum-visual-label">
          <text x="126" y="18">A</text><text x="29" y="139">B</text><text x="232" y="139">C</text>
          {isIncenter && <text x="157" y="88">I</text>}
          {isCentroid && <text x="142" y="88">G</text>}
          {isCircumcenter && <text x="143" y="78">O</text>}
        </g>
      </svg>
    );
  }
  if (["parallelogram-angle", "parallelogram-side"].includes(variant)) {
    return (
      <svg viewBox="0 0 280 145" role="img" aria-label="평행사변형의 각과 변">
        <path className="curriculum-visual-guide" d="M68 25H232L202 120H38Z" />
        <path className="curriculum-visual-mark" d="M125 20V30 M145 20V30 M110 115V125 M130 115V125" />
        <g className="curriculum-visual-label"><text x="55" y="22">A</text><text x="235" y="22">B</text><text x="205" y="138">C</text><text x="24" y="138">D</text></g>
      </svg>
    );
  }
  if (variant === "trapezoid-midline") {
    return (
      <svg viewBox="0 0 280 145" role="img" aria-label="사다리꼴의 중점연결선">
        <path className="curriculum-visual-guide" d="M95 24H190L238 120H42Z" />
        <path className="curriculum-visual-highlight" d="M69 72H214" />
        <circle className="curriculum-visual-point" cx="69" cy="72" r="3" /><circle className="curriculum-visual-point" cx="214" cy="72" r="3" />
        <g className="curriculum-visual-label"><text x="57" y="69">M</text><text x="218" y="69">N</text></g>
      </svg>
    );
  }
  if (["scale-factor", "missing-side", "perimeter-ratio", "area-ratio", "two-triangles", "combined-similarity"].includes(variant)) {
    return (
      <svg viewBox="0 0 300 145" role="img" aria-label="닮은 두 삼각형의 대응 관계">
        <path className="curriculum-visual-guide" d="M22 118L112 118L65 43Z M155 118L282 118L215 18Z" />
        <path className="curriculum-visual-mark" d="M48 113V123 M194 113V123" />
        <g className="curriculum-visual-label"><text x="10" y="136">A</text><text x="113" y="136">B</text><text x="60" y="38">C</text><text x="143" y="136">D</text><text x="283" y="136">E</text><text x="210" y="15">F</text></g>
      </svg>
    );
  }
  if (["parallel-segment", "midpoint-segment"].includes(variant)) {
    return (
      <svg viewBox="0 0 280 150" role="img" aria-label="삼각형과 평행한 선분">
        <path className="curriculum-visual-guide" d="M35 126L245 126L135 20Z" />
        <path className="curriculum-visual-highlight" d="M82 82H198" />
        <g className="curriculum-visual-label"><text x="130" y="16">A</text><text x="23" y="143">B</text><text x="247" y="143">C</text><text x="68" y="80">D</text><text x="202" y="80">E</text></g>
      </svg>
    );
  }
  if (["hypotenuse", "missing-leg", "right-triangle-check"].includes(variant)) {
    return (
      <svg viewBox="0 0 270 145" role="img" aria-label="직각삼각형의 세 변">
        <path className="curriculum-visual-guide" d="M48 120H230L48 28Z M48 104H64V120" />
        <g className="curriculum-visual-label"><text x="34" y="136">C</text><text x="233" y="136">A</text><text x="34" y="25">B</text><text x="132" y="142">a</text><text x="30" y="78">b</text><text x="142" y="66">c</text></g>
      </svg>
    );
  }
  if (["rectangle-diagonal", "square-diagonal"].includes(variant)) {
    return (
      <svg viewBox="0 0 280 145" role="img" aria-label="사각형의 대각선">
        <rect className="curriculum-visual-guide" x="44" y="24" width="190" height="96" />
        <path className="curriculum-visual-highlight" d="M44 120L234 24" />
        <path className="curriculum-visual-guide" d="M44 104H60V120" />
      </svg>
    );
  }
  if (variant === "solid-diagonal") {
    return (
      <svg viewBox="0 0 290 150" role="img" aria-label="직육면체의 공간 대각선">
        <path className="curriculum-visual-guide" d="M42 45H190V126H42Z M82 20H230V101H190 M42 45L82 20 M190 45L230 20 M190 126L230 101" />
        <path className="curriculum-visual-highlight" d="M42 126L230 20" />
      </svg>
    );
  }
  if (variant === "isosceles-height") {
    return (
      <svg viewBox="0 0 280 145" role="img" aria-label="이등변삼각형의 높이">
        <path className="curriculum-visual-guide" d="M36 122L244 122L140 22Z M140 22V122 M140 106H156V122" />
        <path className="curriculum-visual-mark" d="M83 117V127 M197 117V127" />
      </svg>
    );
  }
  if (variant === "composite-distance") {
    return (
      <svg viewBox="0 0 280 145" role="img" aria-label="서로 수직인 두 이동과 두 점 사이 거리">
        <path className="curriculum-visual-guide" d="M42 118H226V30 M210 118V102H226" />
        <path className="curriculum-visual-highlight" d="M42 118L226 30" />
        <circle className="curriculum-visual-point" cx="42" cy="118" r="4" /><circle className="curriculum-visual-point" cx="226" cy="30" r="4" />
      </svg>
    );
  }
  if (["single-ratio", "three-ratios", "pythagorean-first", "side-from-sine", "side-from-cosine", "side-from-tangent", "ratio-scale", "radical-side", "fraction-decimal"].includes(variant)) {
    return (
      <svg viewBox="0 0 280 150" role="img" aria-label="삼각비를 적용하는 직각삼각형">
        <path className="curriculum-visual-guide" d="M44 124H238L44 28Z M44 108H60V124" />
        <path className="curriculum-visual-arc" d="M205 124A33 33 0 0 0 209 109" />
        <g className="curriculum-visual-label"><text x="28" y="141">C</text><text x="241" y="141">A</text><text x="28" y="25">B</text><text x="204" y="105">A</text></g>
      </svg>
    );
  }
  if (["special-angle", "special-angle-expression"].includes(variant)) {
    return (
      <svg viewBox="0 0 300 150" role="img" aria-label="30도 45도 60도 특수각 직각삼각형">
        <path className="curriculum-visual-guide" d="M25 122H135L25 42Z M166 122H278L222 25Z M25 106H41V122 M166 106H182V122" />
        <g className="curriculum-visual-label"><text x="92" y="116">30°</text><text x="231" y="116">45°</text><text x="35" y="38">60°</text><text x="211" y="21">45°</text></g>
      </svg>
    );
  }
  if (["central-to-inscribed", "inscribed-to-central", "arc-to-inscribed", "same-arc", "semicircle-angle", "arc-sum"].includes(variant)) {
    return (
      <svg viewBox="0 0 280 160" role="img" aria-label="중심각과 원주각">
        <circle className="curriculum-visual-guide" cx="140" cy="80" r="62" />
        <path className="curriculum-visual-guide" d="M87 48L140 80L199 55 M87 48L141 139L199 55" />
        <circle className="curriculum-visual-point" cx="140" cy="80" r="4" />
        <g className="curriculum-visual-label"><text x="135" y="75">O</text><text x="73" y="46">A</text><text x="202" y="54">B</text><text x="139" y="154">P</text></g>
      </svg>
    );
  }
  if (variant === "cyclic-quadrilateral") {
    return (
      <svg viewBox="0 0 280 160" role="img" aria-label="원에 내접하는 사각형">
        <circle className="curriculum-visual-guide" cx="140" cy="80" r="62" />
        <path className="curriculum-visual-highlight" d="M95 37L196 59L170 133L82 101Z" />
        <g className="curriculum-visual-label"><text x="84" y="34">A</text><text x="201" y="58">B</text><text x="172" y="148">C</text><text x="67" y="105">D</text></g>
      </svg>
    );
  }
  if (["tangent-chord-angle", "tangent-length", "tangent-expression", "tangent-perimeter"].includes(variant)) {
    return (
      <svg viewBox="0 0 300 160" role="img" aria-label="원의 접선과 현">
        <circle className="curriculum-visual-guide" cx="128" cy="82" r="58" />
        <path className="curriculum-visual-highlight" d="M180 56L273 21 M180 56L247 133" />
        <path className="curriculum-visual-guide" d="M128 82L180 56" />
        <g className="curriculum-visual-label"><text x="116" y="78">O</text><text x="183" y="53">A</text><text x="278" y="20">T</text><text x="251" y="141">P</text></g>
      </svg>
    );
  }
  if (["chord-length", "center-to-chord", "equal-chord-distance", "equal-chord-length", "chord-comparison"].includes(variant)) {
    return (
      <svg viewBox="0 0 280 160" role="img" aria-label="중심에서 현에 내린 수선">
        <circle className="curriculum-visual-guide" cx="140" cy="80" r="63" />
        <path className="curriculum-visual-highlight" d="M80 104H200 M140 80V104" />
        <path className="curriculum-visual-guide" d="M140 92H152V104" />
        <g className="curriculum-visual-label"><text x="132" y="75">O</text><text x="68" y="108">A</text><text x="204" y="108">B</text><text x="143" y="121">M</text></g>
      </svg>
    );
  }
  if (variant === "space-lines-angle") {
    return (
      <svg viewBox="0 0 300 150" role="img" aria-label="공간에서 두 직선이 이루는 각">
        <path className="curriculum-visual-guide" d="M35 116L260 38 M55 34L247 123" />
        <path className="curriculum-visual-arc" d="M126 84A36 36 0 0 1 158 74" />
        <g className="curriculum-visual-label"><text x="245" y="31">ℓ₁</text><text x="251" y="137">ℓ₂</text><text x="142" y="65">θ</text></g>
      </svg>
    );
  }
  if (["space-line-plane", "space-point-plane-distance", "space-perpendicular-foot"].includes(variant)) {
    return (
      <svg viewBox="0 0 300 160" role="img" aria-label="직선과 평면 및 수선의 발">
        <polygon className="curriculum-visual-plane" points="42,106 109,63 261,84 193,130" />
        <path className="curriculum-visual-highlight" d="M151 20V94" />
        <path className="curriculum-visual-guide" d="M136 94H151V79" />
        <circle className="curriculum-visual-point" cx="151" cy="20" r="4" /><circle className="curriculum-visual-point" cx="151" cy="94" r="4" />
        <g className="curriculum-visual-label"><text x="159" y="22">P</text><text x="158" y="109">H</text><text x="231" y="115">α</text></g>
      </svg>
    );
  }
  if (["space-planes-angle", "space-parallel-planes"].includes(variant)) {
    const parallel = variant === "space-parallel-planes";
    return (
      <svg viewBox="0 0 300 160" role="img" aria-label={parallel ? "평행한 두 평면" : "두 평면이 이루는 각"}>
        <polygon className="curriculum-visual-plane" points="32,69 115,31 269,54 184,94" />
        <polygon className="curriculum-visual-plane" points={parallel ? "32,116 115,78 269,101 184,141" : "83,142 112,31 184,94 159,153"} />
        {!parallel && <path className="curriculum-visual-arc" d="M147 93A28 28 0 0 1 166 111" />}
        <g className="curriculum-visual-label"><text x="247" y="48">α</text><text x="244" y="130">β</text></g>
      </svg>
    );
  }
  if (variant === "space-vector-projection") {
    return (
      <svg viewBox="0 0 300 150" role="img" aria-label="벡터의 정사영">
        <path className="curriculum-visual-guide" d="M35 122H270 M260 116L270 122L260 128" />
        <path className="curriculum-visual-guide" d="M35 122L192 27 M181 30L192 27L188 38" />
        <path className="curriculum-visual-guide" d="M192 27V122" />
        <path className="curriculum-visual-highlight" d="M35 122H192" />
        <path className="curriculum-visual-guide" d="M176 122V106H192" />
        <g className="curriculum-visual-label">
          <text x="197" y="28" className="curriculum-visual-vector-label">a</text>
          <text x="260" y="140" className="curriculum-visual-vector-label">b</text>
          <text x="88" y="112">정사영</text>
        </g>
      </svg>
    );
  }
  if (variant === "space-area-projection") {
    return (
      <svg viewBox="0 0 300 160" role="img" aria-label="평면도형의 정사영">
        <polygon className="curriculum-visual-plane" points="25,119 102,66 210,88 132,141" />
        <polygon className="curriculum-visual-highlight" points="93,50 162,28 235,63 164,86" />
        <path className="curriculum-visual-guide" d="M93 50V119 M162 28V88 M235 63V103 M164 86V141" />
        <text className="curriculum-visual-label" x="206" y="133">정사영</text>
      </svg>
    );
  }
  if (variant === "space-three-perpendiculars") {
    return (
      <svg viewBox="0 0 300 170" role="img" aria-label="삼수선의 정리">
        <polygon className="curriculum-visual-plane" points="30,116 105,72 272,98 194,145" />
        <path className="curriculum-visual-highlight" d="M145 20V102 M145 102L232 119 M145 20L232 119" />
        <path className="curriculum-visual-guide" d="M130 102H145V87 M145 102L91 132" />
        <g className="curriculum-visual-label"><text x="153" y="22">P</text><text x="151" y="116">H</text><text x="236" y="124">A</text><text x="76" y="141">B</text><text x="244" y="143">α</text></g>
      </svg>
    );
  }
  if (variant === "triangle-construction") {
    return (
      <svg viewBox="0 0 260 130" role="img" aria-label="세 변으로 삼각형 작도">
        <path className="curriculum-visual-guide" d="M45 105L205 105L116 28Z" />
        <text className="curriculum-visual-label" x="116" y="122">6</text>
        <text className="curriculum-visual-label" x="70" y="61">4</text>
        <text className="curriculum-visual-label" x="166" y="61">3</text>
      </svg>
    );
  }
  const method = variant.endsWith("sss") ? "SSS" : variant.endsWith("sas") ? "SAS" : "ASA";
  return (
    <svg viewBox="0 0 300 130" role="img" aria-label={method + " 합동인 두 삼각형"}>
      <path className="curriculum-visual-guide" d="M25 105L118 105L72 28Z M178 105L271 105L225 28Z" />
      <g className="curriculum-visual-mark">
        <path d="M68 100V110 M221 100V110" />
        {method !== "ASA" && <path d="M43 71L51 76 M196 71L204 76" />}
        {method === "SSS" && <path d="M94 72L102 67 M247 72L255 67" />}
      </g>
      <g className="curriculum-visual-label">
        <text x="16" y="119">A</text><text x="119" y="119">B</text><text x="67" y="22">C</text>
        <text x="168" y="119">D</text><text x="272" y="119">E</text><text x="220" y="22">F</text>
      </g>
    </svg>
  );
}

function ChartVisual({ visual }: { visual: Extract<Visual, { type: "histogram" | "frequency-polygon" }> }) {
  const maximum = Math.max(...visual.values, 1);
  const baseline = 100;
  const chartHeight = 72;
  const xFor = (index: number) => 45 + index * 48;
  const yFor = (value: number) => baseline - value / maximum * chartHeight;
  const points = visual.values.map((value, index) => String(xFor(index) + 18) + "," + String(yFor(value))).join(" ");
  return (
    <svg viewBox="0 0 260 135" role="img" aria-label={visual.type === "histogram" ? "히스토그램" : "도수분포다각형"}>
      <path className="curriculum-chart-axis" d="M34 16V101H241" />
      {[0, 1, 2, 3].map((index) => (
        <text className="curriculum-chart-label" x={xFor(index) + 18} y="119" textAnchor="middle" key={"label-" + index}>
          {visual.labels[index]}
        </text>
      ))}
      {visual.type === "histogram" ? visual.values.map((value, index) => {
        const y = yFor(value);
        return (
          <g key={"bar-" + index}>
            <rect
              className={visual.highlight === index ? "curriculum-chart-bar is-highlighted" : "curriculum-chart-bar"}
              x={xFor(index)}
              y={y}
              width="36"
              height={baseline - y}
            />
            <text className="curriculum-chart-value" x={xFor(index) + 18} y={y - 4} textAnchor="middle">{value}</text>
          </g>
        );
      }) : (
        <>
          <polyline className="curriculum-chart-line" points={points} />
          {visual.values.map((value, index) => (
            <g key={"point-" + index}>
              <circle className="curriculum-chart-point" cx={xFor(index) + 18} cy={yFor(value)} r="4" />
              <text className="curriculum-chart-value" x={xFor(index) + 18} y={yFor(value) - 7} textAnchor="middle">{value}</text>
            </g>
          ))}
        </>
      )}
      <text className="curriculum-chart-label" x="15" y="22">도수</text>
    </svg>
  );
}

export default function MiddleCurriculumVisual({ visual }: { visual: Visual }) {
  return (
    <div className="middle-curriculum-visual">
      {visual.type === "geometry"
        ? <GeometryVisual variant={visual.variant} />
        : <ChartVisual visual={visual} />}
    </div>
  );
}
