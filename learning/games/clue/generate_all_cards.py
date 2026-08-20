import os
import subprocess

OUT_DIR = r"E:\webprojects\class\learning\games\clue\assets\images\cards"
TEMP_DIR = r"E:\webprojects\class\learning\games\clue\temp_html"
os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(TEMP_DIR, exist_ok=True)

EDGE_PATH = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

COMMON_HEAD = '''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 600px;
    height: 800px;
    background: #0b071e;
    overflow: hidden;
    font-family: 'Malgun Gothic', '맑은 고딕', 'Apple SD Gothic Neo', sans-serif;
  }
  .card {
    width: 600px;
    height: 800px;
    position: relative;
    background: radial-gradient(ellipse at 50% 35%, #3a226b 0%, #1a1038 65%, #0d0722 100%);
  }
</style>
</head>
<body>
<div class="card">
<svg width="600" height="800" viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- Card outer border glow -->
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="glow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="6" result="blur1" />
      <feMerge>
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <filter id="flameGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="8" result="blur1" />
      <feGaussianBlur stdDeviation="15" result="blur2" />
      <feMerge>
        <feMergeNode in="blur2" />
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <!-- Gradients -->
    <linearGradient id="frameBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7e3af2"/>
      <stop offset="50%" stop-color="#3b1578"/>
      <stop offset="100%" stop-color="#1e0a45"/>
    </linearGradient>

    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffe875"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>

    <linearGradient id="brassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="30%" stop-color="#fef08a"/>
      <stop offset="70%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>

    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="45%" stop-color="#facc15"/>
      <stop offset="100%" stop-color="#fb7185"/>
    </linearGradient>

    <linearGradient id="flameGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="25%" stop-color="#fef08a"/>
      <stop offset="65%" stop-color="#f97316"/>
      <stop offset="100%" stop-color="#dc2626"/>
    </linearGradient>

    <radialGradient id="aura" cx="50%" cy="55%" r="45%">
      <stop offset="0%" stop-color="#fbbf24" stop-opacity="0.3"/>
      <stop offset="50%" stop-color="#a855f7" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <!-- Star Symbols -->
    <g id="star">
      <polygon points="0,-16 4.7,-4.8 16,-4.8 6.8,2.4 10,14 0,7 -10,14 -6.8,2.4 -16,-4.8 -4.7,-4.8" fill="#fde047" stroke="#78350f" stroke-width="1.5"/>
    </g>
    <g id="sparkle">
      <path d="M 0,-14 Q 0,0 14,0 Q 0,0 0,14 Q 0,0 -14,0 Q 0,0 0,-14 Z" fill="#ffffff"/>
    </g>
    <g id="bat">
      <path d="M -15,0 Q -10,-8 0,-2 Q 10,-8 15,0 Q 22,-5 25,5 Q 15,10 10,6 Q 5,12 0,8 Q -5,12 -10,6 Q -15,10 -25,5 Q -22,-5 -15,0 Z" fill="#2e1065"/>
    </g>
  </defs>

  <!-- Background Aura -->
  <circle cx="300" cy="460" r="230" fill="url(#aura)"/>

  <!-- Moon in Sky -->
  <path d="M 75,90 A 22,22 0 1 0 110,110 A 18,18 0 1 1 75,90 Z" fill="#fef08a" opacity="0.9"/>

  <!-- Starry Background Dots -->
  <use href="#sparkle" x="140" y="110" transform="scale(0.5) translate(140, 110)"/>
  <use href="#sparkle" x="460" y="105" transform="scale(0.6) translate(307, 70)"/>
  <use href="#sparkle" x="90" y="700"/>
  <use href="#sparkle" x="510" y="690"/>
  <circle cx="160" cy="180" r="2" fill="#fff" opacity="0.8"/>
  <circle cx="440" cy="190" r="2.5" fill="#fff" opacity="0.9"/>
  <circle cx="110" cy="650" r="2" fill="#fff" opacity="0.6"/>
  <circle cx="490" cy="640" r="2" fill="#fff" opacity="0.7"/>

  <!-- Outer Card Frame -->
  <rect x="10" y="10" width="580" height="780" rx="28" fill="none" stroke="url(#frameBorder)" stroke-width="14"/>
  <rect x="20" y="20" width="560" height="760" rx="20" fill="none" stroke="#f59e0b" stroke-width="4" filter="url(#goldGlow)"/>
  <rect x="26" y="26" width="548" height="748" rx="16" fill="none" stroke="#6b21a8" stroke-width="2"/>

  <!-- Corner Stars & Bats -->
  <use href="#star" x="45" y="45"/>
  <use href="#star" x="555" y="45"/>
  <use href="#star" x="45" y="755"/>
  <use href="#star" x="555" y="755"/>
  <use href="#bat" x="520" y="65"/>
'''

COMMON_TAIL = '''
</svg>
</div>
</body>
</html>
'''

def render_title_text(title):
    return f'''
  <!-- Title Text Header -->
  <g id="titleGroup">
    <text x="303" y="118" text-anchor="middle" font-size="82" font-weight="900" fill="#090514" font-family="'Malgun Gothic', sans-serif">{title}</text>
    <text x="300" y="120" text-anchor="middle" font-size="82" font-weight="900" fill="#1e1035" font-family="'Malgun Gothic', sans-serif">{title}</text>
    <text x="300" y="114" text-anchor="middle" font-size="82" font-weight="900" fill="none" stroke="#ffffff" stroke-width="16" stroke-linejoin="round" font-family="'Malgun Gothic', sans-serif">{title}</text>
    <text x="300" y="114" text-anchor="middle" font-size="82" font-weight="900" fill="none" stroke="#1e1b4b" stroke-width="6" stroke-linejoin="round" font-family="'Malgun Gothic', sans-serif">{title}</text>
    <text x="300" y="114" text-anchor="middle" font-size="82" font-weight="900" fill="url(#titleGrad)" font-family="'Malgun Gothic', sans-serif">{title}</text>
  </g>
  <use href="#sparkle" x="170" y="90"/>
  <use href="#sparkle" x="430" y="90"/>
'''

# 1. ROPE (밧줄)
def get_rope_svg():
    title_svg = render_title_text("밧줄")
    illustration = '''
  <g transform="translate(0, 40)">
    <!-- Swirling Magic Particles -->
    <path d="M 120,440 Q 200,240 300,240 Q 400,240 480,440 Q 400,600 300,600 Q 200,600 120,440 Z" fill="none" stroke="#a855f7" stroke-width="3" stroke-dasharray="10 15" opacity="0.6"/>
    <circle cx="300" cy="420" r="190" fill="#fde047" opacity="0.1" filter="url(#glow)"/>

    <!-- Coiled Rope Outer Loops -->
    <!-- Loop 1 (Back) -->
    <path d="M 160,400 Q 140,280 300,280 Q 460,280 440,400 Q 460,540 300,540 Q 140,540 160,400 Z" fill="none" stroke="#78350f" stroke-width="34" stroke-linecap="round"/>
    <path d="M 160,400 Q 140,280 300,280 Q 460,280 440,400 Q 460,540 300,540 Q 140,540 160,400 Z" fill="none" stroke="#d97706" stroke-width="24" stroke-linecap="round"/>
    <path d="M 160,400 Q 140,280 300,280 Q 460,280 440,400 Q 460,540 300,540 Q 140,540 160,400 Z" fill="none" stroke="#fef08a" stroke-width="8" stroke-dasharray="14 12" stroke-linecap="round"/>

    <!-- Loop 2 (Front) -->
    <path d="M 170,440 Q 150,310 300,310 Q 450,310 430,440 Q 450,560 300,560 Q 150,560 170,440 Z" fill="none" stroke="#451a03" stroke-width="30" stroke-linecap="round"/>
    <path d="M 170,440 Q 150,310 300,310 Q 450,310 430,440 Q 450,560 300,560 Q 150,560 170,440 Z" fill="none" stroke="#b45309" stroke-width="20" stroke-linecap="round"/>
    <path d="M 170,440 Q 150,310 300,310 Q 450,310 430,440 Q 450,560 300,560 Q 150,560 170,440 Z" fill="none" stroke="#fef08a" stroke-width="6" stroke-dasharray="12 10" stroke-linecap="round"/>

    <!-- Central Knot -->
    <rect x="230" y="370" width="140" height="110" rx="40" fill="#d97706" stroke="#451a03" stroke-width="8"/>
    <rect x="240" y="380" width="120" height="90" rx="30" fill="#fbbf24"/>
    <!-- Knot Strands -->
    <line x1="260" y1="370" x2="260" y2="480" stroke="#78350f" stroke-width="4"/>
    <line x1="300" y1="370" x2="300" y2="480" stroke="#78350f" stroke-width="4"/>
    <line x1="340" y1="370" x2="340" y2="480" stroke="#78350f" stroke-width="4"/>

    <!-- Hanging Rope Tails -->
    <path d="M 260,470 Q 230,550 210,640" fill="none" stroke="#451a03" stroke-width="26" stroke-linecap="round"/>
    <path d="M 260,470 Q 230,550 210,640" fill="none" stroke="#d97706" stroke-width="18" stroke-linecap="round"/>
    <path d="M 260,470 Q 230,550 210,640" fill="none" stroke="#fef08a" stroke-width="5" stroke-dasharray="10 10"/>

    <path d="M 340,470 Q 370,550 390,630" fill="none" stroke="#451a03" stroke-width="26" stroke-linecap="round"/>
    <path d="M 340,470 Q 370,550 390,630" fill="none" stroke="#d97706" stroke-width="18" stroke-linecap="round"/>
    <path d="M 340,470 Q 370,550 390,630" fill="none" stroke="#fef08a" stroke-width="5" stroke-dasharray="10 10"/>

    <!-- Frayed Ends -->
    <g transform="translate(210, 640)">
      <line x1="0" y1="0" x2="-10" y2="20" stroke="#d97706" stroke-width="5" stroke-linecap="round"/>
      <line x1="0" y1="0" x2="0" y2="25" stroke="#fbbf24" stroke-width="5" stroke-linecap="round"/>
      <line x1="0" y1="0" x2="10" y2="18" stroke="#d97706" stroke-width="5" stroke-linecap="round"/>
    </g>
    <g transform="translate(390, 630)">
      <line x1="0" y1="0" x2="-10" y2="18" stroke="#d97706" stroke-width="5" stroke-linecap="round"/>
      <line x1="0" y1="0" x2="0" y2="25" stroke="#fbbf24" stroke-width="5" stroke-linecap="round"/>
      <line x1="0" y1="0" x2="10" y2="20" stroke="#d97706" stroke-width="5" stroke-linecap="round"/>
    </g>

    <!-- KAWAII FACE ON KNOT -->
    <g id="kawaiiFace" transform="translate(300, 425)">
      <!-- Left Eye -->
      <ellipse cx="-24" cy="0" rx="10" ry="12" fill="#18181b"/>
      <circle cx="-27" cy="-4" r="4" fill="#ffffff"/>
      <circle cx="-21" cy="3" r="2" fill="#ffffff"/>
      <!-- Right Eye -->
      <ellipse cx="24" cy="0" rx="10" ry="12" fill="#18181b"/>
      <circle cx="21" cy="-4" r="4" fill="#ffffff"/>
      <circle cx="27" cy="3" r="2" fill="#ffffff"/>
      <!-- Cheek Blush -->
      <ellipse cx="-36" cy="8" rx="9" ry="5" fill="#f43f5e" opacity="0.7"/>
      <ellipse cx="36" cy="8" rx="9" ry="5" fill="#f43f5e" opacity="0.7"/>
      <!-- Mouth -->
      <path d="M -9,6 Q 0,16 9,6" fill="#be123c" stroke="#18181b" stroke-width="2.8" stroke-linecap="round"/>
    </g>

    <!-- Floating Sparkles -->
    <use href="#sparkle" x="140" y="270" transform="scale(0.9)"/>
    <use href="#sparkle" x="460" y="280" transform="scale(0.9)"/>
    <use href="#sparkle" x="120" y="550"/>
    <use href="#sparkle" x="480" y="540"/>
  </g>
'''
    return COMMON_HEAD + title_svg + illustration + COMMON_TAIL

# 2. KITCHEN (주방)
def get_kitchen_svg():
    title_svg = render_title_text("주방")
    illustration = '''
  <g transform="translate(0, 40)">
    <!-- Room Background Wall & Tile Pattern -->
    <rect x="80" y="160" width="440" height="490" rx="20" fill="#1e1b4b" stroke="#7e3af2" stroke-width="4"/>
    <path d="M 80,340 L 520,340 M 80,240 L 520,240 M 200,160 L 200,340 M 320,160 L 320,340 M 440,160 L 440,340" stroke="#312e81" stroke-width="2"/>

    <!-- Kitchen Window -->
    <rect x="360" y="190" width="120" height="110" rx="10" fill="#090514" stroke="#f59e0b" stroke-width="4"/>
    <path d="M 360,245 L 480,245 M 420,190 L 420,300" stroke="#f59e0b" stroke-width="3"/>
    <circle cx="440" cy="220" r="10" fill="#fef08a"/>
    <use href="#sparkle" x="390" y="270" transform="scale(0.5)"/>

    <!-- Hanging Utensils Rack -->
    <line x1="120" y1="190" x2="280" y2="190" stroke="#94a3b8" stroke-width="4" stroke-linecap="round"/>
    <!-- Ladle -->
    <path d="M 140,190 L 140,240 A 12,12 0 1 0 160,240 L 160,190" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
    <!-- Spatula -->
    <path d="M 190,190 L 190,230 L 180,230 L 180,260 L 205,260 L 205,230 L 195,230 L 195,190" fill="#cbd5e1" stroke="#475569" stroke-width="2"/>
    <!-- Whisk -->
    <path d="M 240,190 L 240,230 Q 225,250 240,265 Q 255,250 240,230" fill="none" stroke="#cbd5e1" stroke-width="3"/>

    <!-- Wooden Counter Top -->
    <rect x="70" y="440" width="460" height="40" fill="#b45309" stroke="#451a03" stroke-width="4"/>
    <rect x="70" y="480" width="460" height="170" rx="8" fill="#78350f" stroke="#451a03" stroke-width="4"/>
    <!-- Counter Doors -->
    <rect x="100" y="500" width="180" height="130" rx="6" fill="#92400e" stroke="#451a03" stroke-width="3"/>
    <rect x="320" y="500" width="180" height="130" rx="6" fill="#92400e" stroke="#451a03" stroke-width="3"/>
    <circle cx="260" cy="565" r="7" fill="#fbbf24"/>
    <circle cx="340" cy="565" r="7" fill="#fbbf24"/>

    <!-- Cute Cooking Pot on Counter -->
    <ellipse cx="230" cy="440" rx="90" ry="18" fill="#64748b"/>
    <path d="M 140,330 L 140,430 C 140,460 320,460 320,430 L 320,330 Z" fill="#e2e8f0" stroke="#334155" stroke-width="5"/>
    <path d="M 140,330 C 140,310 320,310 320,330 C 320,350 140,350 140,330 Z" fill="#94a3b8" stroke="#334155" stroke-width="4"/>
    <!-- Handles -->
    <path d="M 115,350 C 95,350 95,390 140,390" fill="none" stroke="#334155" stroke-width="7" stroke-linecap="round"/>
    <path d="M 345,350 C 365,350 365,390 320,390" fill="none" stroke="#334155" stroke-width="7" stroke-linecap="round"/>
    <!-- Pot Lid & Knob -->
    <path d="M 145,330 C 145,285 315,285 315,330 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="4"/>
    <ellipse cx="230" cy="285" rx="18" ry="10" fill="#fbbf24" stroke="#d97706" stroke-width="3"/>

    <!-- Steam & Hearts Rising -->
    <path d="M 200,270 Q 180,230 200,190" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
    <path d="M 260,270 Q 280,230 260,190" fill="none" stroke="#ffffff" stroke-width="4" stroke-linecap="round" opacity="0.7"/>
    <!-- Steam Heart -->
    <path d="M 230,190 C 220,175 200,185 230,205 C 260,185 240,175 230,190 Z" fill="#fb7185" opacity="0.8"/>

    <!-- Kawaii Face on Pot -->
    <g transform="translate(230, 385)">
      <ellipse cx="-25" cy="0" rx="8" ry="10" fill="#1e293b"/>
      <circle cx="-28" cy="-3" r="3" fill="#fff"/>
      <ellipse cx="25" cy="0" rx="8" ry="10" fill="#1e293b"/>
      <circle cx="22" cy="-3" r="3" fill="#fff"/>
      <ellipse cx="-35" cy="6" rx="7" ry="4" fill="#f43f5e" opacity="0.6"/>
      <ellipse cx="35" cy="6" rx="7" ry="4" fill="#f43f5e" opacity="0.6"/>
      <path d="M -8,4 Q 0,12 8,4" fill="#be123c" stroke="#1e293b" stroke-width="2" stroke-linecap="round"/>
    </g>

    <!-- Strawberry Cake on Plate (Right side of counter) -->
    <ellipse cx="430" cy="435" rx="55" ry="16" fill="#ffffff" stroke="#cbd5e1" stroke-width="3"/>
    <!-- Cake Slice -->
    <path d="M 390,430 L 430,370 L 470,430 Z" fill="#fbcfe8" stroke="#db2777" stroke-width="3"/>
    <path d="M 390,430 L 470,430 L 470,410 L 390,410 Z" fill="#f472b6"/>
    <!-- Strawberry on top -->
    <circle cx="430" cy="365" r="10" fill="#dc2626"/>
    <path d="M 428,355 L 432,355 L 430,350 Z" fill="#22c55e"/>

    <use href="#sparkle" x="110" y="290"/>
    <use href="#sparkle" x="490" y="370"/>
  </g>
'''
    return COMMON_HEAD + title_svg + illustration + COMMON_TAIL

# 3. HALL (현관홀)
def get_hall_svg():
    title_svg = render_title_text("현관홀")
    illustration = '''
  <g transform="translate(0, 40)">
    <!-- Hall Walls Perspective -->
    <polygon points="60,650 160,160 440,160 540,650" fill="#1e1b4b" stroke="#6366f1" stroke-width="4"/>
    <!-- Checkered Floor Perspective -->
    <polygon points="60,650 160,480 440,480 540,650" fill="#312e81"/>
    <path d="M 60,650 L 160,480 M 180,650 L 230,480 M 300,650 L 300,480 M 420,650 L 370,480 M 540,650 L 440,480" stroke="#4338ca" stroke-width="2"/>
    <path d="M 120,540 L 480,540 M 90,600 L 510,600" stroke="#4338ca" stroke-width="2"/>

    <!-- Red Carpet -->
    <polygon points="230,650 270,480 330,480 370,650" fill="#b91c1c" stroke="#f59e0b" stroke-width="3"/>
    <!-- Gold Fringe lines on Carpet -->
    <line x1="230" y1="650" x2="370" y2="650" stroke="#fbbf24" stroke-width="5"/>

    <!-- Archway Double Doors -->
    <path d="M 200,480 L 200,280 C 200,200 400,200 400,280 L 400,480 Z" fill="#78350f" stroke="#451a03" stroke-width="6"/>
    <!-- Door Divider & Panels -->
    <line x1="300" y1="210" x2="300" y2="480" stroke="#451a03" stroke-width="5"/>
    <rect x="220" y="320" width="65" height="130" rx="6" fill="#92400e" stroke="#451a03" stroke-width="3"/>
    <rect x="315" y="320" width="65" height="130" rx="6" fill="#92400e" stroke="#451a03" stroke-width="3"/>
    <!-- Gold Door Knobs -->
    <circle cx="272" cy="400" r="7" fill="#fbbf24" stroke="#b45309" stroke-width="2"/>
    <circle cx="328" cy="400" r="7" fill="#fbbf24" stroke="#b45309" stroke-width="2"/>

    <!-- Grandfather Clock on Left Wall -->
    <g transform="translate(100, 260)">
      <rect x="0" y="0" width="55" height="220" rx="6" fill="#451a03" stroke="#f59e0b" stroke-width="3"/>
      <!-- Clock Face -->
      <circle cx="27" cy="35" r="20" fill="#fffbeb" stroke="#78350f" stroke-width="3"/>
      <circle cx="27" cy="35" r="2" fill="#000"/>
      <line x1="27" y1="35" x2="27" y2="23" stroke="#000" stroke-width="2"/>
      <line x1="27" y1="35" x2="35" y2="35" stroke="#000" stroke-width="2"/>
      <!-- Pendulum Window -->
      <rect x="12" y="70" width="31" height="120" rx="4" fill="#1e1b4b" stroke="#78350f" stroke-width="2"/>
      <circle cx="27" cy="140" r="10" fill="#fbbf24" filter="url(#glow)"/>
      <line x1="27" y1="70" x2="27" y2="130" stroke="#fbbf24" stroke-width="2"/>
    </g>

    <!-- Wall Sconce Lamps with Warm Glow -->
    <g transform="translate(170, 240)">
      <circle cx="0" cy="0" r="30" fill="#fbbf24" opacity="0.4" filter="url(#flameGlow)"/>
      <path d="M -10,10 L 0,-15 L 10,10 Z" fill="#fef08a"/>
      <rect x="-6" y="10" width="12" height="20" fill="#d97706"/>
    </g>
    <g transform="translate(430, 240)">
      <circle cx="0" cy="0" r="30" fill="#fbbf24" opacity="0.4" filter="url(#flameGlow)"/>
      <path d="M -10,10 L 0,-15 L 10,10 Z" fill="#fef08a"/>
      <rect x="-6" y="10" width="12" height="20" fill="#d97706"/>
    </g>

    <use href="#sparkle" x="300" y="170" transform="scale(1.2)"/>
    <use href="#sparkle" x="140" y="580"/>
    <use href="#sparkle" x="460" y="580"/>
  </g>
'''
    return COMMON_HEAD + title_svg + illustration + COMMON_TAIL

# 4. DINING ROOM (식당)
def get_diningroom_svg():
    title_svg = render_title_text("식당")
    illustration = '''
  <g transform="translate(0, 40)">
    <!-- Chandelier Overhead -->
    <g transform="translate(300, 160)">
      <line x1="0" y1="0" x2="0" y2="40" stroke="#fbbf24" stroke-width="4"/>
      <path d="M -90,70 Q 0,110 90,70" fill="none" stroke="#fbbf24" stroke-width="6"/>
      <!-- Candles on Chandelier -->
      <g transform="translate(-80, 40)">
        <circle cx="0" cy="-10" r="18" fill="#fde047" opacity="0.5" filter="url(#flameGlow)"/>
        <rect x="-6" y="0" width="12" height="30" fill="#fff"/>
        <path d="M 0,-15 C -8,-5 0,0 0,0 C 0,0 8,-5 0,-15 Z" fill="#f97316"/>
      </g>
      <g transform="translate(0, 50)">
        <circle cx="0" cy="-10" r="18" fill="#fde047" opacity="0.5" filter="url(#flameGlow)"/>
        <rect x="-6" y="0" width="12" height="30" fill="#fff"/>
        <path d="M 0,-15 C -8,-5 0,0 0,0 C 0,0 8,-5 0,-15 Z" fill="#f97316"/>
      </g>
      <g transform="translate(80, 40)">
        <circle cx="0" cy="-10" r="18" fill="#fde047" opacity="0.5" filter="url(#flameGlow)"/>
        <rect x="-6" y="0" width="12" height="30" fill="#fff"/>
        <path d="M 0,-15 C -8,-5 0,0 0,0 C 0,0 8,-5 0,-15 Z" fill="#f97316"/>
      </g>
    </g>

    <!-- High Back Chairs -->
    <!-- Left Chair -->
    <rect x="90" y="310" width="60" height="180" rx="8" fill="#991b1b" stroke="#451a03" stroke-width="4"/>
    <rect x="80" y="440" width="80" height="20" rx="4" fill="#b91c1c" stroke="#451a03" stroke-width="3"/>
    <rect x="90" y="460" width="15" height="150" fill="#451a03"/>
    <rect x="135" y="460" width="15" height="150" fill="#451a03"/>

    <!-- Right Chair -->
    <rect x="450" y="310" width="60" height="180" rx="8" fill="#991b1b" stroke="#451a03" stroke-width="4"/>
    <rect x="440" y="440" width="80" height="20" rx="4" fill="#b91c1c" stroke="#451a03" stroke-width="3"/>
    <rect x="450" y="460" width="15" height="150" fill="#451a03"/>
    <rect x="495" y="460" width="15" height="150" fill="#451a03"/>

    <!-- Main Dining Table -->
    <ellipse cx="300" cy="460" rx="200" ry="40" fill="#b45309" stroke="#451a03" stroke-width="6"/>
    <!-- Tablecloth -->
    <ellipse cx="300" cy="455" rx="190" ry="32" fill="#f8fafc" stroke="#cbd5e1" stroke-width="3"/>
    <path d="M 110,455 C 110,540 490,540 490,455 Z" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="3"/>
    <line x1="110" y1="455" x2="490" y2="455" stroke="#e2e8f0" stroke-width="4"/>

    <!-- Centerpiece Silver Cloche (Food Cover) -->
    <ellipse cx="300" cy="445" rx="65" ry="18" fill="#cbd5e1" stroke="#475569" stroke-width="3"/>
    <path d="M 235,445 C 235,370 365,370 365,445 Z" fill="#e2e8f0" stroke="#475569" stroke-width="4"/>
    <!-- Cloche Handle -->
    <circle cx="300" cy="365" r="10" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>

    <!-- Wine Glasses / Goblets -->
    <g transform="translate(180, 420)">
      <path d="M -10,-20 L 10,-20 L 6,0 L -6,0 Z" fill="#f43f5e" opacity="0.8"/>
      <path d="M -12,-25 L 12,-25 L 8,5 L -8,5 Z" fill="none" stroke="#fff" stroke-width="2"/>
      <line x1="0" y1="5" x2="0" y2="20" stroke="#fff" stroke-width="2"/>
      <line x1="-8" y1="20" x2="8" y2="20" stroke="#fff" stroke-width="2"/>
    </g>

    <g transform="translate(420, 420)">
      <path d="M -10,-20 L 10,-20 L 6,0 L -6,0 Z" fill="#f43f5e" opacity="0.8"/>
      <path d="M -12,-25 L 12,-25 L 8,5 L -8,5 Z" fill="none" stroke="#fff" stroke-width="2"/>
      <line x1="0" y1="5" x2="0" y2="20" stroke="#fff" stroke-width="2"/>
      <line x1="-8" y1="20" x2="8" y2="20" stroke="#fff" stroke-width="2"/>
    </g>

    <!-- Sparkles on Silverware -->
    <use href="#sparkle" x="300" y="340" transform="scale(1.1)"/>
    <use href="#sparkle" x="220" y="420"/>
    <use href="#sparkle" x="380" y="420"/>
  </g>
'''
    return COMMON_HEAD + title_svg + illustration + COMMON_TAIL

# 5. LOUNGE (응접실)
def get_lounge_svg():
    title_svg = render_title_text("응접실")
    illustration = '''
  <g transform="translate(0, 40)">
    <!-- Fireplace Background Arch -->
    <rect x="180" y="180" width="240" height="280" rx="16" fill="#451a03" stroke="#78350f" stroke-width="6"/>
    <!-- Inner Hearth -->
    <path d="M 220,460 L 220,280 C 220,220 380,220 380,280 L 380,460 Z" fill="#18181b"/>

    <!-- Fireplace Mantel Top -->
    <rect x="160" y="165" width="280" height="25" rx="4" fill="#92400e" stroke="#451a03" stroke-width="4"/>

    <!-- Dancing Fire & Glow -->
    <circle cx="300" cy="400" r="70" fill="#f97316" opacity="0.4" filter="url(#flameGlow)"/>
    <!-- Fire Logs -->
    <line x1="240" y1="440" x2="360" y2="420" stroke="#78350f" stroke-width="12" stroke-linecap="round"/>
    <line x1="240" y1="420" x2="360" y2="440" stroke="#78350f" stroke-width="12" stroke-linecap="round"/>
    <!-- Flames -->
    <path d="M 300,330 C 260,390 280,430 300,430 C 320,430 340,390 300,330 Z" fill="url(#flameGrad)"/>
    <path d="M 280,360 C 260,400 270,430 280,430 C 290,430 300,400 280,360 Z" fill="#fde047"/>
    <path d="M 320,360 C 300,400 310,430 320,430 C 330,430 340,400 320,360 Z" fill="#fde047"/>

    <!-- Soft Floor Rug -->
    <ellipse cx="300" cy="580" rx="220" ry="60" fill="#991b1b" stroke="#f59e0b" stroke-width="4"/>
    <ellipse cx="300" cy="580" rx="190" ry="48" fill="#b91c1c"/>

    <!-- Cozy Red Armchair (Left) -->
    <g transform="translate(100, 420)">
      <rect x="0" y="40" width="110" height="70" rx="16" fill="#dc2626" stroke="#7f1d1d" stroke-width="4"/> <!-- Cushion -->
      <rect x="-15" y="-30" width="30" height="120" rx="12" fill="#b91c1c" stroke="#7f1d1d" stroke-width="4"/> <!-- Left Arm -->
      <rect x="95" y="-30" width="30" height="120" rx="12" fill="#b91c1c" stroke="#7f1d1d" stroke-width="4"/> <!-- Right Arm -->
      <rect x="0" y="-80" width="110" height="110" rx="20" fill="#dc2626" stroke="#7f1d1d" stroke-width="4"/> <!-- Backrest -->
      <!-- Legs -->
      <rect x="10" y="110" width="14" height="30" fill="#451a03"/>
      <rect x="86" y="110" width="14" height="30" fill="#451a03"/>
    </g>

    <!-- Coffee Table & Tea Set (Center Front) -->
    <g transform="translate(320, 520)">
      <ellipse cx="60" cy="30" rx="70" ry="22" fill="#78350f" stroke="#451a03" stroke-width="4"/>
      <!-- Teapot -->
      <ellipse cx="50" cy="15" rx="18" ry="12" fill="#38bdf8" stroke="#0284c7" stroke-width="2"/>
      <path d="M 68,15 Q 80,10 75,22" fill="none" stroke="#0284c7" stroke-width="3"/> <!-- Spout -->
      <circle cx="50" cy="2" r="4" fill="#fbbf24"/>
      <!-- Teacup -->
      <ellipse cx="85" cy="22" rx="8" ry="5" fill="#fff" stroke="#cbd5e1" stroke-width="2"/>
      <!-- Steam -->
      <path d="M 85,15 Q 80,5 85,-2" fill="none" stroke="#fff" stroke-width="2" opacity="0.7"/>
    </g>

    <use href="#sparkle" x="300" y="300" transform="scale(1.2)"/>
    <use href="#sparkle" x="120" y="240"/>
    <use href="#sparkle" x="480" y="240"/>
  </g>
'''
    return COMMON_HEAD + title_svg + illustration + COMMON_TAIL

# 6. STUDY (집무실)
def get_study_svg():
    title_svg = render_title_text("집무실")
    illustration = '''
  <g transform="translate(0, 40)">
    <!-- Bookshelf Wall in Background -->
    <rect x="80" y="160" width="440" height="260" rx="10" fill="#451a03" stroke="#78350f" stroke-width="6"/>
    <!-- Shelves -->
    <line x1="80" y1="240" x2="520" y2="240" stroke="#78350f" stroke-width="6"/>
    <line x1="80" y1="330" x2="520" y2="330" stroke="#78350f" stroke-width="6"/>

    <!-- Colorful Books on Shelves -->
    <g transform="translate(100, 175)">
      <rect x="0" y="0" width="18" height="60" fill="#dc2626"/>
      <rect x="22" y="0" width="22" height="60" fill="#2563eb"/>
      <rect x="48" y="0" width="16" height="60" fill="#16a34a"/>
      <rect x="68" y="0" width="25" height="60" fill="#d97706"/>
      <rect x="97" y="0" width="20" height="60" fill="#9333ea"/>
      <rect x="220" y="0" width="18" height="60" fill="#dc2626"/>
      <rect x="242" y="0" width="22" height="60" fill="#2563eb"/>
      <rect x="268" y="0" width="26" height="60" fill="#d97706"/>
    </g>
    <g transform="translate(100, 260)">
      <rect x="0" y="0" width="22" height="65" fill="#2563eb"/>
      <rect x="26" y="0" width="18" height="65" fill="#dc2626"/>
      <rect x="48" y="0" width="28" height="65" fill="#16a34a"/>
      <rect x="220" y="0" width="20" height="65" fill="#9333ea"/>
      <rect x="244" y="0" width="25" height="65" fill="#d97706"/>
    </g>

    <!-- Executive Wooden Desk -->
    <rect x="70" y="440" width="460" height="40" fill="#92400e" stroke="#451a03" stroke-width="5"/>
    <rect x="90" y="480" width="420" height="160" fill="#78350f" stroke="#451a03" stroke-width="5"/>
    <!-- Desk Drawers -->
    <rect x="110" y="500" width="120" height="120" rx="4" fill="#b45309" stroke="#451a03" stroke-width="3"/>
    <rect x="370" y="500" width="120" height="120" rx="4" fill="#b45309" stroke="#451a03" stroke-width="3"/>
    <circle cx="170" cy="560" r="6" fill="#fbbf24"/>
    <circle cx="430" cy="560" r="6" fill="#fbbf24"/>

    <!-- Green Banker Lamp on Left Desk -->
    <g transform="translate(140, 340)">
      <circle cx="20" cy="30" r="40" fill="#22c55e" opacity="0.4" filter="url(#flameGlow)"/>
      <rect x="0" y="90" width="40" height="12" rx="4" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
      <path d="M 20,90 Q 30,50 20,30" fill="none" stroke="#fbbf24" stroke-width="6"/>
      <!-- Green Glass Shade -->
      <path d="M -5,30 Q 20,10 45,30 Z" fill="#15803d" stroke="#166534" stroke-width="3"/>
    </g>

    <!-- Open Book & Inkwell (Center Desk) -->
    <g transform="translate(260, 420)">
      <!-- Open Book Pages -->
      <path d="M -40,15 Q 0,5 40,15 L 35,-15 Q 0,-25 -35,-15 Z" fill="#fffbeb" stroke="#78350f" stroke-width="2"/>
      <path d="M -40,15 Q 0,25 40,15 L 35,-15 Q 0,-5 -35,-15 Z" fill="#fef3c7" stroke="#78350f" stroke-width="2"/>
      <line x1="0" y1="-20" x2="0" y2="20" stroke="#78350f" stroke-width="2"/>
      <!-- Inkwell & Feather Quill -->
      <rect x="50" y="-5" width="20" height="20" rx="4" fill="#1e293b"/>
      <path d="M 60,-5 Q 85,-40 95,-70" fill="none" stroke="#f8fafc" stroke-width="4" stroke-linecap="round"/>
    </g>

    <!-- World Globe on Right Desk -->
    <g transform="translate(420, 370)">
      <circle cx="20" cy="20" r="28" fill="#0284c7" stroke="#0369a1" stroke-width="3"/>
      <!-- Continents -->
      <path d="M 5,15 Q 20,5 30,18 Q 15,30 5,15 Z" fill="#22c55e"/>
      <path d="M 15,30 Q 30,25 35,35 Z" fill="#22c55e"/>
      <!-- Stand Arc -->
      <path d="M -5,20 C -5,-15 45,-15 45,20 C 45,45 -5,45 -5,20" fill="none" stroke="#fbbf24" stroke-width="4"/>
      <rect x="12" y="52" width="16" height="18" fill="#fbbf24"/>
    </g>

    <use href="#sparkle" x="160" y="340" transform="scale(1.1)"/>
    <use href="#sparkle" x="300" y="390"/>
  </g>
'''
    return COMMON_HEAD + title_svg + illustration + COMMON_TAIL

# 7. BILLIARD ROOM (당구실)
def get_billiardroom_svg():
    title_svg = render_title_text("당구실")
    illustration = '''
  <g transform="translate(0, 40)">
    <!-- Overhead Billiard Green Lamps -->
    <g transform="translate(200, 160)">
      <line x1="0" y1="0" x2="0" y2="40" stroke="#fbbf24" stroke-width="4"/>
      <circle cx="0" cy="65" r="35" fill="#22c55e" opacity="0.4" filter="url(#flameGlow)"/>
      <path d="M -40,75 L 0,35 L 40,75 Z" fill="#15803d" stroke="#166534" stroke-width="3"/>
    </g>
    <g transform="translate(400, 160)">
      <line x1="0" y1="0" x2="0" y2="40" stroke="#fbbf24" stroke-width="4"/>
      <circle cx="0" cy="65" r="35" fill="#22c55e" opacity="0.4" filter="url(#flameGlow)"/>
      <path d="M -40,75 L 0,35 L 40,75 Z" fill="#15803d" stroke="#166534" stroke-width="3"/>
    </g>

    <!-- Crossed Cue Sticks Behind Table -->
    <line x1="90" y1="220" x2="510" y2="580" stroke="#d97706" stroke-width="10" stroke-linecap="round"/>
    <line x1="90" y1="220" x2="510" y2="580" stroke="#fef08a" stroke-width="3" stroke-linecap="round"/>
    <line x1="510" y1="220" x2="90" y2="580" stroke="#d97706" stroke-width="10" stroke-linecap="round"/>
    <line x1="510" y1="220" x2="90" y2="580" stroke="#fef08a" stroke-width="3" stroke-linecap="round"/>

    <!-- Billiard Table Outer Wooden Frame -->
    <rect x="70" y="280" width="460" height="320" rx="28" fill="#78350f" stroke="#451a03" stroke-width="8"/>
    <!-- Table Pockets (6 Corner/Side Pockets) -->
    <circle cx="95" cy="305" r="18" fill="#18181b"/>
    <circle cx="505" cy="305" r="18" fill="#18181b"/>
    <circle cx="95" cy="575" r="18" fill="#18181b"/>
    <circle cx="505" cy="575" r="18" fill="#18181b"/>
    <circle cx="300" cy="295" r="16" fill="#18181b"/>
    <circle cx="300" cy="585" r="16" fill="#18181b"/>

    <!-- Green Felt Felt Surface -->
    <rect x="100" y="310" width="400" height="260" rx="16" fill="#10b981" stroke="#047857" stroke-width="6"/>

    <!-- Billiard Balls on Green Felt -->
    <!-- Triangle Rack Group -->
    <g transform="translate(340, 440)">
      <!-- Row 1 -->
      <circle cx="0" cy="0" r="12" fill="#ef4444" stroke="#991b1b" stroke-width="2"/> <!-- Red 3 -->
      <text x="0" y="4" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">3</text>

      <!-- Row 2 -->
      <circle cx="22" cy="-12" r="12" fill="#f59e0b" stroke="#b45309" stroke-width="2"/> <!-- Yellow 1 -->
      <text x="22" y="-8" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">1</text>

      <circle cx="22" cy="12" r="12" fill="#3b82f6" stroke="#1d4ed8" stroke-width="2"/> <!-- Blue 2 -->
      <text x="22" y="16" text-anchor="middle" font-size="10" font-weight="bold" fill="#fff">2</text>

      <!-- Row 3 (Black 8 in middle) -->
      <circle cx="44" cy="0" r="12" fill="#18181b" stroke="#000000" stroke-width="2"/> <!-- 8-ball -->
      <circle cx="44" cy="0" r="6" fill="#ffffff"/>
      <text x="44" y="3" text-anchor="middle" font-size="9" font-weight="bold" fill="#000">8</text>
    </g>

    <!-- Cue Ball (White) -->
    <circle cx="200" cy="440" r="13" fill="#ffffff" stroke="#cbd5e1" stroke-width="2" filter="url(#glow)"/>

    <use href="#sparkle" x="200" y="420" transform="scale(0.8)"/>
    <use href="#sparkle" x="350" y="420"/>
  </g>
'''
    return COMMON_HEAD + title_svg + illustration + COMMON_TAIL

# 8. CARD BACK (카드 뒷면)
def get_cardback_svg():
    return '''<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    width: 600px;
    height: 800px;
    background: #0b071e;
    overflow: hidden;
    font-family: 'Malgun Gothic', '맑은 고딕', 'Apple SD Gothic Neo', sans-serif;
  }
  .card {
    width: 600px;
    height: 800px;
    position: relative;
    background: radial-gradient(ellipse at 50% 50%, #2e1a5a 0%, #160d33 65%, #0a061c 100%);
  }
</style>
</head>
<body>
<div class="card">
<svg width="600" height="800" viewBox="0 0 600 800" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="4" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
    <filter id="orbGlow" x="-40%" y="-40%" width="180%" height="180%">
      <feGaussianBlur stdDeviation="12" result="blur1" />
      <feMerge>
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>

    <linearGradient id="frameBorder" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#7e3af2"/>
      <stop offset="50%" stop-color="#3b1578"/>
      <stop offset="100%" stop-color="#1e0a45"/>
    </linearGradient>

    <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffe875"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>

    <linearGradient id="titleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#fef08a"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>

    <!-- Diamond Pattern -->
    <pattern id="lattice" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 20,0 L 40,20 L 20,40 L 0,20 Z" fill="none" stroke="#a855f7" stroke-width="1.5" opacity="0.25"/>
      <circle cx="20" cy="20" r="2" fill="#fde047" opacity="0.3"/>
    </pattern>

    <g id="star">
      <polygon points="0,-16 4.7,-4.8 16,-4.8 6.8,2.4 10,14 0,7 -10,14 -6.8,2.4 -16,-4.8 -4.7,-4.8" fill="#fde047" stroke="#78350f" stroke-width="1.5"/>
    </g>
    <g id="sparkle">
      <path d="M 0,-14 Q 0,0 14,0 Q 0,0 0,14 Q 0,0 -14,0 Q 0,0 0,-14 Z" fill="#ffffff"/>
    </g>
    <g id="bat">
      <path d="M -15,0 Q -10,-8 0,-2 Q 10,-8 15,0 Q 22,-5 25,5 Q 15,10 10,6 Q 5,12 0,8 Q -5,12 -10,6 Q -15,10 -25,5 Q -22,-5 -15,0 Z" fill="#2e1065"/>
    </g>
  </defs>

  <!-- Diamond Lattice Background Overlay -->
  <rect x="30" y="30" width="540" height="740" rx="16" fill="url(#lattice)"/>

  <!-- Outer Card Frame -->
  <rect x="10" y="10" width="580" height="780" rx="28" fill="none" stroke="url(#frameBorder)" stroke-width="14"/>
  <rect x="20" y="20" width="560" height="760" rx="20" fill="none" stroke="#f59e0b" stroke-width="4" filter="url(#goldGlow)"/>
  <rect x="26" y="26" width="548" height="748" rx="16" fill="none" stroke="#6b21a8" stroke-width="2"/>

  <!-- Corner Stars & Bats -->
  <use href="#star" x="45" y="45"/>
  <use href="#star" x="555" y="45"/>
  <use href="#star" x="45" y="755"/>
  <use href="#star" x="555" y="755"/>
  <use href="#bat" x="520" y="65"/>
  <use href="#bat" x="80" y="735"/>

  <!-- Top Title: 저택 추리 -->
  <g transform="translate(300, 110)">
    <text x="3" y="3" text-anchor="middle" font-size="64" font-weight="900" fill="#090514">저택 추리</text>
    <text x="0" y="0" text-anchor="middle" font-size="64" font-weight="900" fill="none" stroke="#ffffff" stroke-width="12" stroke-linejoin="round">저택 추리</text>
    <text x="0" y="0" text-anchor="middle" font-size="64" font-weight="900" fill="url(#titleGrad)">저택 추리</text>
  </g>

  <!-- Central Glowing Crest Emblem Orb -->
  <g transform="translate(300, 410)">
    <!-- Aura Ring -->
    <circle cx="0" cy="0" r="185" fill="#fde047" opacity="0.25" filter="url(#orbGlow)"/>
    <circle cx="0" cy="0" r="170" fill="#1e1035" stroke="url(#goldGradient)" stroke-width="10" filter="url(#goldGlow)"/>
    <circle cx="0" cy="0" r="150" fill="none" stroke="#7e3af2" stroke-width="4" stroke-dasharray="8 8"/>

    <!-- Large 3D Gold Question Mark ? -->
    <text x="4" y="64" text-anchor="middle" font-size="185" font-weight="900" fill="#090514">?</text>
    <text x="0" y="60" text-anchor="middle" font-size="185" font-weight="900" fill="none" stroke="#ffffff" stroke-width="20" stroke-linejoin="round">?</text>
    <text x="0" y="60" text-anchor="middle" font-size="185" font-weight="900" fill="url(#titleGrad)">?</text>
  </g>

  <!-- Bottom Subtitle: MANOR MYSTERY -->
  <g transform="translate(300, 710)">
    <text x="0" y="0" text-anchor="middle" font-size="34" font-weight="900" fill="#fde047" letter-spacing="4">MANOR MYSTERY</text>
  </g>

  <use href="#sparkle" x="130" y="410" transform="scale(1.2)"/>
  <use href="#sparkle" x="470" y="410" transform="scale(1.2)"/>
  <use href="#sparkle" x="300" y="200"/>
  <use href="#sparkle" x="300" y="620"/>

</svg>
</div>
</body>
</html>
'''

CARDS = {
    "rope.png": get_rope_svg,
    "kitchen.png": get_kitchen_svg,
    "hall.png": get_hall_svg,
    "diningroom.png": get_diningroom_svg,
    "lounge.png": get_lounge_svg,
    "study.png": get_study_svg,
    "billiardroom.png": get_billiardroom_svg,
    "cardback.png": get_cardback_svg,
}

def main():
    print("Generating all remaining 8 cards...")
    for filename, get_svg_func in CARDS.items():
        html_content = get_svg_func()
        html_filename = filename.replace(".png", ".html")
        html_path = os.path.join(TEMP_DIR, html_filename)
        png_path = os.path.join(OUT_DIR, filename)

        with open(html_path, "w", encoding="utf-8") as f:
            f.write(html_content)

        html_url = "file:///" + html_path.replace("\\", "/")
        cmd = [
            EDGE_PATH,
            "--headless",
            "--disable-gpu",
            f"--screenshot={png_path}",
            "--window-size=600,800",
            "--hide-scrollbars",
            html_url,
        ]
        subprocess.run(cmd, check=True)
        print(f"Generated card: {filename}")

    print("ALL CARDS SUCCESSFULLY GENERATED!")

if __name__ == "__main__":
    main()
