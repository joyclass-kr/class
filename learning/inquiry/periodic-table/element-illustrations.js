/**
 * 단주기 주기율표(1~20번) 실생활 활용 분야 맞춤형 SVG 일러스트 라이브러리
 * Periodic Table Real-Life Applications Visual SVG Illustrations
 */

(function () {
    'use strict';

    // 1~20번 원소 실생활 활용 분야 맞춤형 SVG 일러스트 사전 (viewBox: 0 0 48 48)
    const USE_ILLUSTRATIONS = {
        // [1] 수소 (H)
        '수소 연료전지 차': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="20" width="36" height="15" rx="5" fill="url(#grad-car-body)"/>
                <path d="M12 20 L16 11 Q18 9 22 9 L30 9 Q34 9 37 15 L39 20 Z" fill="#38ef7d" fill-opacity="0.35" stroke="#38ef7d" stroke-width="1.8"/>
                <circle cx="14" cy="35" r="4.5" fill="#0f172a" stroke="#4bcffa" stroke-width="2"/>
                <circle cx="14" cy="35" r="2" fill="#4bcffa"/>
                <circle cx="34" cy="35" r="4.5" fill="#0f172a" stroke="#4bcffa" stroke-width="2"/>
                <circle cx="34" cy="35" r="2" fill="#4bcffa"/>
                <path d="M22 23 L26 23 M24 21 L24 25" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
                <text x="25" y="17" font-size="7" font-weight="900" fill="#38ef7d" text-anchor="middle" font-family="sans-serif">H₂</text>
                <defs>
                    <linearGradient id="grad-car-body" x1="6" y1="20" x2="42" y2="35" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#0284c7"/>
                        <stop offset="1" stop-color="#059669"/>
                    </linearGradient>
                </defs>
            </svg>
        `,
        '물 생성': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 6 C24 6 11 23 11 31 C11 38.2 16.8 44 24 44 C31.2 44 37 38.2 37 31 C37 23 24 6 24 6 Z" fill="url(#grad-water)"/>
                <path d="M18 28 C18 24 22 18 24 15" stroke="rgba(255,255,255,0.7)" stroke-width="2" stroke-linecap="round"/>
                <ellipse cx="28" cy="36" rx="4" ry="2.5" fill="#ffffff" fill-opacity="0.25"/>
                <text x="24" y="34" font-size="8" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="sans-serif">H₂O</text>
                <defs>
                    <linearGradient id="grad-water" x1="11" y1="6" x2="37" y2="44" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#38bdf8"/>
                        <stop offset="1" stop-color="#0284c7"/>
                    </linearGradient>
                </defs>
            </svg>
        `,
        '암모니아 합성': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 8 L27 8 M24 8 L24 18 L34 38 C35.5 41 33.5 44 30 44 L18 44 C14.5 44 12.5 41 14 38 L24 18" stroke="#a78bfa" stroke-width="2" stroke-linejoin="round" fill="none"/>
                <path d="M16 34 L32 34 L30 42 L18 42 Z" fill="url(#grad-ammonia)"/>
                <circle cx="21" cy="37" r="1.5" fill="#ffffff"/>
                <circle cx="27" cy="39" r="1.2" fill="#ffffff"/>
                <circle cx="24" cy="27" r="2.2" fill="#38ef7d"/>
                <circle cx="20" cy="23" r="1.5" fill="#60a5fa"/>
                <circle cx="28" cy="23" r="1.5" fill="#60a5fa"/>
                <circle cx="24" cy="31" r="1.5" fill="#60a5fa"/>
                <defs>
                    <linearGradient id="grad-ammonia" x1="16" y1="34" x2="32" y2="42" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#818cf8"/>
                        <stop offset="1" stop-color="#6366f1"/>
                    </linearGradient>
                </defs>
            </svg>
        `,

        // [2] 헬륨 (He)
        '풍선/비행선': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="20" cy="19" rx="12" ry="14" fill="url(#grad-balloon)"/>
                <path d="M15 13 Q16 10 19 10" stroke="#fff" stroke-width="1.8" stroke-linecap="round" stroke-opacity="0.8"/>
                <polygon points="18,33 22,33 20,35" fill="#ef4444"/>
                <path d="M20 35 Q22 39 19 43" stroke="#94a3b8" stroke-width="1.5" fill="none"/>
                <ellipse cx="36" cy="18" rx="8" ry="4.5" fill="#f59e0b" stroke="#d97706" stroke-width="1"/>
                <polygon points="42,16 46,14 46,22 42,20" fill="#d97706"/>
                <rect x="34" y="22" width="4" height="2" fill="#475569" rx="0.5"/>
                <defs>
                    <linearGradient id="grad-balloon" x1="10" y1="7" x2="30" y2="33" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f87171"/>
                        <stop offset="1" stop-color="#dc2626"/>
                    </linearGradient>
                </defs>
            </svg>
        `,
        'MRI 냉각제': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="18" fill="none" stroke="#64748b" stroke-width="4"/>
                <circle cx="24" cy="24" r="11" fill="#0f172a" stroke="#38bdf8" stroke-width="2.5"/>
                <rect x="8" y="27" width="22" height="4" rx="2" fill="#06b6d4"/>
                <path d="M36 12 L36 20 M32 16 L40 16" stroke="#38bdf8" stroke-width="1.5"/>
                <path d="M10 10 L10 16 M7 13 L13 13" stroke="#38bdf8" stroke-width="1.2"/>
                <circle cx="24" cy="24" r="3" fill="#67e8f9" fill-opacity="0.4"/>
                <text x="24" y="44" font-size="6.5" font-weight="800" fill="#38bdf8" text-anchor="middle" font-family="sans-serif">-269℃</text>
            </svg>
        `,
        '잠수용 호흡 기체': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="13" y="14" width="9" height="25" rx="4" fill="url(#grad-tank1)"/>
                <rect x="25" y="14" width="9" height="25" rx="4" fill="url(#grad-tank2)"/>
                <rect x="15" y="9" width="5" height="5" rx="1" fill="#64748b"/>
                <rect x="27" y="9" width="5" height="5" rx="1" fill="#64748b"/>
                <path d="M17 9 L17 6 L30 6 L30 9" stroke="#94a3b8" stroke-width="1.5" fill="none"/>
                <ellipse cx="37" cy="18" rx="5" ry="3.5" fill="#334155" stroke="#38bdf8" stroke-width="1.2"/>
                <path d="M29 7 Q36 8 36 15" stroke="#38bdf8" stroke-width="1.5" fill="none"/>
                <circle cx="39" cy="8" r="2" fill="#7dd3fc" fill-opacity="0.7"/>
                <circle cx="43" cy="5" r="1.3" fill="#7dd3fc" fill-opacity="0.7"/>
                <defs>
                    <linearGradient id="grad-tank1" x1="13" y1="14" x2="22" y2="39" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#facc15"/>
                        <stop offset="1" stop-color="#ca8a04"/>
                    </linearGradient>
                    <linearGradient id="grad-tank2" x1="25" y1="14" x2="34" y2="39" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#38bdf8"/>
                        <stop offset="1" stop-color="#0284c7"/>
                    </linearGradient>
                </defs>
            </svg>
        `,

        // [3] 리튬 (Li)
        '리튬 이온 배터리': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="14" width="28" height="26" rx="4" fill="url(#grad-battery)" stroke="#22c55e" stroke-width="2"/>
                <rect x="20" y="8" width="8" height="6" rx="2" fill="#22c55e"/>
                <rect x="14" y="28" width="5" height="8" rx="1" fill="#4ade80"/>
                <rect x="21" y="28" width="5" height="8" rx="1" fill="#4ade80"/>
                <rect x="28" y="28" width="5" height="8" rx="1" fill="#4ade80"/>
                <path d="M25 17 L21 24 L26 24 L23 31" stroke="#facc15" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                <text x="35" y="22" font-size="6.5" font-weight="900" fill="#4ade80" font-family="sans-serif">Li⁺</text>
                <defs>
                    <linearGradient id="grad-battery" x1="10" y1="14" x2="38" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#064e3b"/>
                        <stop offset="1" stop-color="#022c22"/>
                    </linearGradient>
                </defs>
            </svg>
        `,
        '경량 합금': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21" cy="22" r="12" fill="#1e293b" stroke="#94a3b8" stroke-width="3"/>
                <circle cx="21" cy="22" r="5" fill="#38ef7d" fill-opacity="0.3" stroke="#38ef7d" stroke-width="1.8"/>
                <rect x="19.5" y="6" width="3" height="5" fill="#94a3b8"/>
                <rect x="19.5" y="33" width="3" height="5" fill="#94a3b8"/>
                <rect x="5" y="20.5" width="5" height="3" fill="#94a3b8"/>
                <rect x="32" y="20.5" width="5" height="3" fill="#94a3b8"/>
                <path d="M28 36 C34 32 38 24 41 12 C35 15 31 20 28 36 Z" fill="url(#grad-feather)"/>
                <path d="M28 36 L37 17" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"/>
                <defs>
                    <linearGradient id="grad-feather" x1="28" y1="36" x2="41" y2="12" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#38bdf8"/>
                        <stop offset="1" stop-color="#a78bfa"/>
                    </linearGradient>
                </defs>
            </svg>
        `,
        '조울증 치료제': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="rotate(-40 24 24)">
                    <rect x="14" y="10" width="20" height="14" rx="7" fill="#fb7185"/>
                    <rect x="14" y="24" width="20" height="14" rx="7" fill="#38bdf8"/>
                    <rect x="14" y="22" width="20" height="4" fill="#0f172a"/>
                    <ellipse cx="20" cy="16" rx="2" ry="4" fill="#ffffff" fill-opacity="0.4"/>
                </g>
                <path d="M37 10 L39 7 L41 10 L44 12 L41 14 L39 17 L37 14 L34 12 Z" fill="#facc15"/>
                <circle cx="10" cy="38" r="2" fill="#38ef7d"/>
            </svg>
        `,

        // [4] 베릴륨 (Be)
        '우주망원경 거울': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="24,19 28.5,21.5 28.5,26.5 24,29 19.5,26.5 19.5,21.5" fill="#fbbf24" stroke="#d97706" stroke-width="1"/>
                <polygon points="24,8 28.5,10.5 28.5,15.5 24,18 19.5,15.5 19.5,10.5" fill="#facc15" stroke="#d97706" stroke-width="0.8"/>
                <polygon points="24,30 28.5,32.5 28.5,37.5 24,40 19.5,37.5 19.5,32.5" fill="#facc15" stroke="#d97706" stroke-width="0.8"/>
                <polygon points="33,14 37.5,16.5 37.5,21.5 33,24 28.5,21.5 28.5,16.5" fill="#fde047" stroke="#d97706" stroke-width="0.8"/>
                <polygon points="33,25 37.5,27.5 37.5,32.5 33,35 28.5,32.5 28.5,27.5" fill="#f59e0b" stroke="#d97706" stroke-width="0.8"/>
                <polygon points="15,14 19.5,16.5 19.5,21.5 15,24 10.5,21.5 10.5,16.5" fill="#fde047" stroke="#d97706" stroke-width="0.8"/>
                <polygon points="15,25 19.5,27.5 19.5,32.5 15,35 10.5,32.5 10.5,27.5" fill="#f59e0b" stroke="#d97706" stroke-width="0.8"/>
                <path d="M40 7 L41 4 L42 7 L45 8 L42 9 L41 12 L40 9 L37 8 Z" fill="#ffffff"/>
            </svg>
        `,
        '항공우주 합금': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 6 C27 12 30 22 29 32 L19 32 C18 22 21 12 24 6 Z" fill="url(#grad-rocket)"/>
                <polygon points="19,25 12,33 18,33" fill="#f97316"/>
                <polygon points="29,25 36,33 30,33" fill="#f97316"/>
                <circle cx="24" cy="18" r="3.5" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
                <polygon points="21,33 27,33 24,43" fill="#ef4444"/>
                <polygon points="22.5,33 25.5,33 24,39" fill="#facc15"/>
                <defs>
                    <linearGradient id="grad-rocket" x1="19" y1="6" x2="29" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f1f5f9"/>
                        <stop offset="1" stop-color="#cbd5e1"/>
                    </linearGradient>
                </defs>
            </svg>
        `,
        'X선 관 창문': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="14" width="32" height="20" rx="10" fill="#1e1b4b" stroke="#818cf8" stroke-width="1.8"/>
                <rect x="22" y="10" width="4" height="28" rx="2" fill="#38ef7d" stroke="#10b981" stroke-width="1.2"/>
                <path d="M12 24 L22 24" stroke="#c084fc" stroke-width="2.5" stroke-dasharray="2 2"/>
                <path d="M26 24 L36 24" stroke="#38bdf8" stroke-width="2.5"/>
                <path d="M26 19 L35 17" stroke="#38bdf8" stroke-width="1.8"/>
                <path d="M26 29 L35 31" stroke="#38bdf8" stroke-width="1.8"/>
                <text x="24" y="44" font-size="7" font-weight="900" fill="#a78bfa" text-anchor="middle" font-family="sans-serif">X-RAY</text>
            </svg>
        `,

        // [5] 붕소 (B)
        '내열 유리': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 12 L34 12 L34 15 L32 15 L32 34 Q32 38 28 38 L20 38 Q16 38 16 34 L16 15 L14 15 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="1.8"/>
                <rect x="18" y="24" width="12" height="12" rx="1" fill="url(#grad-beaker-liquid)"/>
                <line x1="28" y1="20" x2="31" y2="20" stroke="#94a3b8" stroke-width="1.2"/>
                <line x1="27" y1="25" x2="31" y2="25" stroke="#94a3b8" stroke-width="1.2"/>
                <line x1="28" y1="30" x2="31" y2="30" stroke="#94a3b8" stroke-width="1.2"/>
                <path d="M24 39 Q28 41 26 46 Q24 48 22 46 Q20 41 24 39 Z" fill="#ef4444"/>
                <path d="M24 42 Q26 43 25 46 Q24 47 23 46 Q22 43 24 42 Z" fill="#facc15"/>
                <defs>
                    <linearGradient id="grad-beaker-liquid" x1="18" y1="24" x2="30" y2="36" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#06b6d4"/>
                        <stop offset="1" stop-color="#0284c7"/>
                    </linearGradient>
                </defs>
            </svg>
        `,
        '반도체 도핑': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="8" width="32" height="32" rx="4" fill="#0f172a" stroke="#475569" stroke-width="2"/>
                <line x1="8" y1="18" x2="40" y2="18" stroke="#334155" stroke-width="1.2"/>
                <line x1="8" y1="30" x2="40" y2="30" stroke="#334155" stroke-width="1.2"/>
                <line x1="18" y1="8" x2="18" y2="40" stroke="#334155" stroke-width="1.2"/>
                <line x1="30" y1="8" x2="30" y2="40" stroke="#334155" stroke-width="1.2"/>
                <circle cx="18" cy="18" r="3" fill="#64748b"/>
                <circle cx="30" cy="18" r="3" fill="#64748b"/>
                <circle cx="18" cy="30" r="3" fill="#64748b"/>
                <circle cx="30" cy="30" r="5" fill="#f59e0b" stroke="#fbbf24" stroke-width="2"/>
                <text x="30" y="32.5" font-size="6" font-weight="900" fill="#0f172a" text-anchor="middle" font-family="sans-serif">p⁺</text>
            </svg>
        `,
        '세제 보조제': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21" cy="27" r="10" fill="url(#grad-bubble1)" stroke="#38bdf8" stroke-width="1.8"/>
                <path d="M16 23 Q18 20 22 20" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round"/>
                <circle cx="33" cy="18" r="7" fill="url(#grad-bubble2)" stroke="#a78bfa" stroke-width="1.5"/>
                <path d="M30 15 Q32 13 35 13" stroke="#ffffff" stroke-width="1.2" stroke-linecap="round"/>
                <circle cx="14" cy="14" r="4" fill="#38ef7d" fill-opacity="0.3" stroke="#38ef7d" stroke-width="1.2"/>
                <path d="M37 32 L39 28 L41 32 L45 34 L41 36 L39 40 L37 36 L33 34 Z" fill="#facc15"/>
                <defs>
                    <linearGradient id="grad-bubble1" x1="11" y1="17" x2="31" y2="37" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#38bdf8" stop-opacity="0.4"/>
                        <stop offset="1" stop-color="#0284c7" stop-opacity="0.7"/>
                    </linearGradient>
                    <linearGradient id="grad-bubble2" x1="26" y1="11" x2="40" y2="25" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#c084fc" stop-opacity="0.4"/>
                        <stop offset="1" stop-color="#7c3aed" stop-opacity="0.7"/>
                    </linearGradient>
                </defs>
            </svg>
        `,

        // [6] 탄소 (C)
        '생명체 구성': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 8 Q24 20 34 8" stroke="#38ef7d" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <path d="M34 8 Q24 24 14 36 Q24 48 34 36" stroke="#4bcffa" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <path d="M14 8 Q24 24 34 36 Q24 48 14 36" stroke="#38ef7d" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                <line x1="18" y1="14" x2="30" y2="14" stroke="#facc15" stroke-width="2"/>
                <line x1="20" y1="24" x2="28" y2="24" stroke="#f472b6" stroke-width="2"/>
                <line x1="18" y1="34" x2="30" y2="34" stroke="#facc15" stroke-width="2"/>
            </svg>
        `,
        '연필심(흑연)': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="rotate(-35 24 24)">
                    <rect x="18" y="6" width="12" height="26" fill="#f59e0b"/>
                    <rect x="18" y="6" width="4" height="26" fill="#d97706"/>
                    <rect x="18" y="4" width="12" height="4" fill="#ef4444" rx="1"/>
                    <polygon points="18,32 30,32 24,42" fill="#fde68a"/>
                    <polygon points="21,37 27,37 24,42" fill="#1e293b"/>
                </g>
                <path d="M34 38 Q38 41 42 41" stroke="#334155" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `,
        '다이아몬드': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="14,16 34,16 42,24 24,42 6,24" fill="url(#grad-diamond)" stroke="#67e8f9" stroke-width="1.8"/>
                <line x1="14" y1="16" x2="24" y2="42" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.7"/>
                <line x1="34" y1="16" x2="24" y2="42" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.7"/>
                <line x1="6" y1="24" x2="42" y2="24" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.7"/>
                <polygon points="20,16 28,16 24,24" fill="#ffffff" fill-opacity="0.5"/>
                <path d="M36 8 L37 5 L38 8 L41 9 L38 10 L37 13 L36 10 L33 9 Z" fill="#ffffff"/>
                <defs>
                    <linearGradient id="grad-diamond" x1="6" y1="16" x2="42" y2="42" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#38bdf8"/>
                        <stop offset="0.5" stop-color="#0284c7"/>
                        <stop offset="1" stop-color="#1e1b4b"/>
                    </linearGradient>
                </defs>
            </svg>
        `,
        '탄소 섬유': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="8" width="32" height="32" rx="6" fill="#18181b" stroke="#3f3f46" stroke-width="2"/>
                <rect x="10" y="10" width="13" height="13" fill="#27272a"/>
                <rect x="25" y="10" width="13" height="13" fill="#3f3f46"/>
                <rect x="10" y="25" width="13" height="13" fill="#3f3f46"/>
                <rect x="25" y="25" width="13" height="13" fill="#27272a"/>
                <line x1="12" y1="12" x2="21" y2="21" stroke="#52525b" stroke-width="1.5"/>
                <line x1="27" y1="21" x2="36" y2="12" stroke="#71717a" stroke-width="1.5"/>
                <line x1="12" y1="36" x2="21" y2="27" stroke="#71717a" stroke-width="1.5"/>
                <line x1="27" y1="27" x2="36" y2="36" stroke="#52525b" stroke-width="1.5"/>
                <path d="M6 40 L42 8" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="3 3"/>
            </svg>
        `,

        // [7] 질소 (N)
        '대기 구성': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="14" fill="#0284c7"/>
                <path d="M18 16 Q22 14 26 18 Q29 20 27 24 Q24 27 19 25 Q16 23 18 16 Z" fill="#22c55e"/>
                <path d="M25 28 Q30 27 33 31 Q30 35 26 34 Z" fill="#22c55e"/>
                <circle cx="24" cy="24" r="19" stroke="#38ef7d" stroke-width="2.2" stroke-opacity="0.8" stroke-dasharray="7 2"/>
                <circle cx="24" cy="24" r="21.5" stroke="#4bcffa" stroke-width="1" stroke-opacity="0.4"/>
                <text x="24" y="26" font-size="7.5" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="sans-serif">78%</text>
            </svg>
        `,
        '과자 봉지 충전': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 11 L36 11 L33 37 L15 37 Z" fill="url(#grad-snack-bag)" stroke="#f59e0b" stroke-width="1.5"/>
                <path d="M11 11 L13 8 L16 11 L19 8 L22 11 L25 8 L28 11 L31 8 L34 11 L37 8 L37 11 Z" fill="#ef4444"/>
                <path d="M14 37 L16 40 L19 37 L22 40 L25 37 L28 40 L31 37 L34 40 L34 37 Z" fill="#ef4444"/>
                <path d="M17 16 Q24 13 31 16" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-opacity="0.6"/>
                <ellipse cx="24" cy="25" rx="6" ry="4" fill="#fde047" stroke="#d97706" stroke-width="1" transform="rotate(-15 24 25)"/>
                <circle cx="32" cy="22" r="3" fill="#38ef7d" fill-opacity="0.3"/>
                <text x="24" y="34" font-size="5.5" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="sans-serif">N₂ GAS</text>
                <defs>
                    <linearGradient id="grad-snack-bag" x1="12" y1="11" x2="36" y2="37" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f87171"/>
                        <stop offset="1" stop-color="#ea580c"/>
                    </linearGradient>
                </defs>
            </svg>
        `,
        '액체 질소 냉동': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="18" width="20" height="24" rx="4" fill="#334155" stroke="#94a3b8" stroke-width="1.8"/>
                <rect x="18" y="14" width="12" height="4" rx="1" fill="#64748b"/>
                <line x1="20" y1="24" x2="28" y2="24" stroke="#38bdf8" stroke-width="2"/>
                <path d="M16 12 Q20 7 24 11 Q28 6 32 10" stroke="#7dd3fc" stroke-width="2" stroke-linecap="round" fill="none"/>
                <path d="M24 27 L24 37 M19 32 L29 32 M20.5 28.5 L27.5 35.5 M20.5 35.5 L27.5 28.5" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round"/>
                <text x="24" y="44" font-size="5.5" font-weight="900" fill="#38ef7d" text-anchor="middle" font-family="sans-serif">-196℃</text>
            </svg>
        `,
        '비료': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 40 Q24 34 40 40 L40 42 L8 42 Z" fill="#78350f"/>
                <circle cx="14" cy="38" r="1.5" fill="#facc15"/>
                <circle cx="20" cy="36" r="1.8" fill="#38ef7d"/>
                <circle cx="28" cy="37" r="1.5" fill="#facc15"/>
                <circle cx="34" cy="39" r="1.8" fill="#38ef7d"/>
                <path d="M24 37 L24 20" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/>
                <path d="M24 25 C17 23 15 13 24 16 C24 21 24 23 24 25 Z" fill="#4ade80"/>
                <path d="M24 21 C31 19 33 9 24 12 C24 17 24 19 24 21 Z" fill="#22c55e"/>
                <circle cx="36" cy="12" r="3" fill="#facc15" fill-opacity="0.8"/>
            </svg>
        `,

        // [8] 산소 (O)
        '생물 호흡': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 10 L24 22 M24 20 L19 25 M24 20 L29 25" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
                <path d="M19 24 C14 24 11 30 11 35 C11 41 16 43 21 41 C22 36 22 30 19 24 Z" fill="url(#grad-lung-left)"/>
                <path d="M29 24 C34 24 37 30 37 35 C37 41 32 43 27 41 C26 36 26 30 29 24 Z" fill="url(#grad-lung-right)"/>
                <text x="24" y="9" font-size="7" font-weight="900" fill="#38bdf8" text-anchor="middle" font-family="sans-serif">O₂</text>
                <defs>
                    <linearGradient id="grad-lung-left" x1="11" y1="24" x2="22" y2="42" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#38bdf8"/>
                        <stop offset="1" stop-color="#0284c7"/>
                    </linearGradient>
                    <linearGradient id="grad-lung-right" x1="26" y1="24" x2="37" y2="42" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#38bdf8"/>
                        <stop offset="1" stop-color="#0284c7"/>
                    </linearGradient>
                </defs>
            </svg>
        `,
        '의료용 산소 호흡기': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="15" width="12" height="26" rx="5" fill="#15803d" stroke="#22c55e" stroke-width="1.8"/>
                <rect x="13" y="10" width="6" height="5" fill="#64748b"/>
                <circle cx="16" cy="8" r="3" fill="#cbd5e1" stroke="#334155" stroke-width="1"/>
                <path d="M30 20 C26 23 26 33 30 37 C34 37 38 33 38 28 C38 23 34 20 30 20 Z" fill="#38bdf8" fill-opacity="0.3" stroke="#38bdf8" stroke-width="1.8"/>
                <path d="M19 12 Q28 14 30 28" stroke="#94a3b8" stroke-width="1.5" fill="none"/>
                <text x="16" y="29" font-size="5" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="sans-serif">O₂</text>
            </svg>
        `,
        '연소 및 제강': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 28 L36 28 L32 42 L16 42 Z" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
                <ellipse cx="24" cy="28" rx="12" ry="3.5" fill="#f97316"/>
                <path d="M24 6 C28 12 33 16 30 24 C28 20 26 21 24 16 C22 21 19 20 18 24 C15 16 20 12 24 6 Z" fill="url(#grad-fire)"/>
                <path d="M24 14 C26 17 28 19 27 24 C25 22 24 23 24 19 C23 22 22 22 21 24 C20 19 22 17 24 14 Z" fill="#fde047"/>
                <defs>
                    <linearGradient id="grad-fire" x1="16" y1="6" x2="32" y2="25" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ef4444"/>
                        <stop offset="0.6" stop-color="#f97316"/>
                        <stop offset="1" stop-color="#eab308"/>
                    </linearGradient>
                </defs>
            </svg>
        `,

        // [9] 플루오린 (F)
        '충치 예방 치약': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 36 L24 24" stroke="#0284c7" stroke-width="3" stroke-linecap="round"/>
                <rect x="22" y="19" width="10" height="4" rx="1" fill="#ffffff" transform="rotate(-37 22 19)"/>
                <path d="M23 18 Q27 12 32 15" stroke="#06b6d4" stroke-width="3" stroke-linecap="round"/>
                <path d="M36 26 C33 26 31 29 31 32 C31 37 33 42 35 42 C36 42 36 38 37 38 C38 38 38 42 39 42 C41 42 43 37 43 32 C43 29 41 26 38 26 C37 26 37 27 36 27 Z" fill="#ffffff" stroke="#38bdf8" stroke-width="1.2"/>
                <path d="M41 22 L42 19 L43 22 L46 23 L43 24 L42 27 L41 24 L38 23 Z" fill="#facc15"/>
            </svg>
        `,
        '테프론 프라이팬 코팅': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="21" cy="25" r="14" fill="#1e293b" stroke="#475569" stroke-width="2"/>
                <rect x="33" y="23" width="12" height="4" rx="2" fill="#0f172a" stroke="#64748b" stroke-width="1.2"/>
                <ellipse cx="20" cy="25" rx="8" ry="6" fill="#ffffff" fill-opacity="0.9"/>
                <circle cx="21" cy="24" r="3.5" fill="#f59e0b"/>
                <path d="M12 20 Q16 15 22 15" stroke="#38ef7d" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        `,
        '냉매': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="12" width="32" height="18" rx="3" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.8"/>
                <line x1="12" y1="24" x2="36" y2="24" stroke="#cbd5e1" stroke-width="1.5"/>
                <circle cx="34" cy="17" r="1.5" fill="#22c55e"/>
                <path d="M12 34 Q18 31 24 35 Q30 39 36 34" stroke="#38bdf8" stroke-width="2" fill="none" stroke-linecap="round"/>
                <path d="M16 41 Q22 38 28 42 Q34 45 40 40" stroke="#38bdf8" stroke-width="1.5" fill="none" stroke-linecap="round"/>
                <path d="M16 28 L16 32 M14 30 L18 30" stroke="#0ea5e9" stroke-width="1.2"/>
            </svg>
        `,

        // [10] 네온 (Ne)
        '네온사인 간판': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="13" width="36" height="22" rx="4" fill="#090d16" stroke="#f43f5e" stroke-width="2" stroke-opacity="0.8"/>
                <text x="24" y="28" font-size="10" font-weight="900" fill="#ff4d4d" text-anchor="middle" font-family="monospace" style="filter: drop-shadow(0 0 4px #ff0055);">NEON</text>
                <circle cx="10" cy="9" r="1.5" fill="#f43f5e"/>
                <circle cx="38" cy="9" r="1.5" fill="#f43f5e"/>
                <line x1="10" y1="9" x2="10" y2="13" stroke="#f43f5e" stroke-width="1"/>
                <line x1="38" y1="9" x2="38" y2="13" stroke="#f43f5e" stroke-width="1"/>
            </svg>
        `,
        '레이저 기술': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="19" width="14" height="10" rx="2" fill="#334155" stroke="#64748b" stroke-width="1.5"/>
                <rect x="20" y="21" width="4" height="6" fill="#94a3b8"/>
                <line x1="24" y1="24" x2="42" y2="24" stroke="#ff0055" stroke-width="3" stroke-linecap="round"/>
                <line x1="24" y1="24" x2="42" y2="24" stroke="#ffffff" stroke-width="1" stroke-linecap="round"/>
                <circle cx="42" cy="24" r="3" fill="#ff0055" fill-opacity="0.7"/>
                <path d="M42 18 L42 30 M36 24 L48 24" stroke="#ff4d4d" stroke-width="1.2"/>
            </svg>
        `,
        '고전압 표시등': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="28" width="24" height="10" rx="2" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
                <path d="M16 28 C16 19 20 12 24 12 C28 12 32 19 32 28 Z" fill="url(#grad-neon-lamp)" stroke="#ff4d4d" stroke-width="1.8"/>
                <path d="M25 16 L22 22 L26 22 L23 27" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                <defs>
                    <linearGradient id="grad-neon-lamp" x1="16" y1="12" x2="32" y2="28" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ff6b6b"/>
                        <stop offset="1" stop-color="#dc2626"/>
                    </linearGradient>
                </defs>
            </svg>
        `,

        // [11] 나트륨 (Na)
        '식용 소금(NaCl)': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 18 L32 18 L30 38 Q30 41 24 41 Q18 41 18 38 Z" fill="#334155" stroke="#94a3b8" stroke-width="1.5"/>
                <rect x="19" y="11" width="10" height="7" rx="2" fill="#cbd5e1"/>
                <circle cx="21" cy="14" r="0.8" fill="#475569"/>
                <circle cx="24" cy="14" r="0.8" fill="#475569"/>
                <circle cx="27" cy="14" r="0.8" fill="#475569"/>
                <rect x="34" y="24" width="4" height="4" fill="#ffffff" stroke="#94a3b8" stroke-width="0.8"/>
                <rect x="38" y="32" width="3.5" height="3.5" fill="#ffffff" stroke="#94a3b8" stroke-width="0.8"/>
                <rect x="32" y="36" width="3" height="3" fill="#ffffff" stroke="#94a3b8" stroke-width="0.8"/>
                <text x="24" y="32" font-size="6" font-weight="900" fill="#38ef7d" text-anchor="middle" font-family="sans-serif">NaCl</text>
            </svg>
        `,
        '체액 삼투압 조절': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="16" fill="#1e293b" stroke="#f59e0b" stroke-width="2" stroke-dasharray="6 2"/>
                <circle cx="24" cy="24" r="8" fill="#0f172a" stroke="#38ef7d" stroke-width="1.5"/>
                <text x="24" y="26.5" font-size="6.5" font-weight="900" fill="#38ef7d" text-anchor="middle" font-family="sans-serif">Na⁺</text>
                <path d="M12 24 L6 24 M8 21 L5 24 L8 27" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M36 24 L42 24 M40 21 L43 24 L40 27" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round"/>
                <path d="M24 12 L24 6 M21 8 L24 5 L27 8" stroke="#38bdf8" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
        `,
        '나트륨등': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 42 L14 14 Q14 8 22 8 L30 8" stroke="#64748b" stroke-width="2.5" stroke-linecap="round" fill="none"/>
                <path d="M26 8 L34 8 L36 15 L24 15 Z" fill="#334155" stroke="#94a3b8" stroke-width="1.2"/>
                <polygon points="25,15 35,15 42,38 18,38" fill="url(#grad-sodium-light)"/>
                <ellipse cx="30" cy="38" rx="12" ry="4" fill="#facc15" fill-opacity="0.3"/>
                <defs>
                    <linearGradient id="grad-sodium-light" x1="30" y1="15" x2="30" y2="38" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f59e0b" stop-opacity="0.8"/>
                        <stop offset="1" stop-color="#facc15" stop-opacity="0.1"/>
                    </linearGradient>
                </defs>
            </svg>
        `,

        // [12] 마그네슘 (Mg)
        '식물 엽록소': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 38 C10 38 12 18 28 12 C36 9 38 14 38 18 C38 34 20 38 10 38 Z" fill="url(#grad-leaf)"/>
                <path d="M10 38 Q22 28 36 14" stroke="#ffffff" stroke-width="1.5" stroke-opacity="0.6" fill="none"/>
                <circle cx="26" cy="23" r="5" fill="#065f46" stroke="#34d399" stroke-width="1.5"/>
                <text x="26" y="25.5" font-size="5.5" font-weight="900" fill="#34d399" text-anchor="middle" font-family="sans-serif">Mg</text>
                <defs>
                    <linearGradient id="grad-leaf" x1="10" y1="38" x2="38" y2="12" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#16a34a"/>
                        <stop offset="1" stop-color="#4ade80"/>
                    </linearGradient>
                </defs>
            </svg>
        `,
        '불꽃놀이 섬광': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="4" fill="#ffffff" stroke="#facc15" stroke-width="1.5"/>
                <line x1="24" y1="8" x2="24" y2="16" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="24" y1="32" x2="24" y2="40" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="8" y1="24" x2="16" y2="24" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="32" y1="24" x2="40" y2="24" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
                <line x1="13" y1="13" x2="18" y2="18" stroke="#fde047" stroke-width="2" stroke-linecap="round"/>
                <line x1="30" y1="30" x2="35" y2="35" stroke="#fde047" stroke-width="2" stroke-linecap="round"/>
                <line x1="35" y1="13" x2="30" y2="18" stroke="#fde047" stroke-width="2" stroke-linecap="round"/>
                <line x1="18" y1="30" x2="13" y2="35" stroke="#fde047" stroke-width="2" stroke-linecap="round"/>
            </svg>
        `,
        '경량 노트북/노트북 케이스': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="12" width="24" height="17" rx="2" fill="#0f172a" stroke="#cbd5e1" stroke-width="1.8"/>
                <rect x="15" y="15" width="18" height="11" fill="#38bdf8" fill-opacity="0.3"/>
                <path d="M8 32 L40 32 L36 36 L12 36 Z" fill="#94a3b8" stroke="#cbd5e1" stroke-width="1.2"/>
                <rect x="21" y="33" width="6" height="2" fill="#475569" rx="0.5"/>
            </svg>
        `,

        // [13] 알루미늄 (Al)
        '음료수 캔': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="11" width="18" height="28" rx="4" fill="url(#grad-al-can)" stroke="#cbd5e1" stroke-width="1.5"/>
                <ellipse cx="24" cy="11" rx="8" ry="2.5" fill="#94a3b8"/>
                <ellipse cx="24" cy="39" rx="8" ry="2.5" fill="#64748b"/>
                <ellipse cx="24" cy="11" rx="3" ry="1.2" fill="#ffffff"/>
                <path d="M15 22 Q24 26 33 22 L33 30 Q24 34 15 30 Z" fill="#ef4444"/>
                <text x="24" y="28" font-size="5" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="sans-serif">Al</text>
                <defs>
                    <linearGradient id="grad-al-can" x1="15" y1="11" x2="33" y2="39" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f1f5f9"/>
                        <stop offset="0.5" stop-color="#cbd5e1"/>
                        <stop offset="1" stop-color="#94a3b8"/>
                    </linearGradient>
                </defs>
            </svg>
        `,
        '주방용 호일': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="16" width="10" height="20" rx="3" fill="#64748b" stroke="#cbd5e1" stroke-width="1.5"/>
                <path d="M15 20 L38 20 Q42 22 38 24 L15 24 Z" fill="url(#grad-foil)"/>
                <path d="M15 24 L36 28 Q40 30 36 32 L15 32 Z" fill="url(#grad-foil)"/>
                <line x1="22" y1="20" x2="28" y2="24" stroke="#ffffff" stroke-width="1.8"/>
                <defs>
                    <linearGradient id="grad-foil" x1="15" y1="20" x2="40" y2="32" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#ffffff"/>
                        <stop offset="0.5" stop-color="#cbd5e1"/>
                        <stop offset="1" stop-color="#94a3b8"/>
                    </linearGradient>
                </defs>
            </svg>
        `,
        '비행기 동체': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 26 L18 24 L26 12 L30 12 L26 24 L38 23 L42 18 L44 18 L42 25 L44 26 L42 27 L44 34 L42 34 L38 29 L26 28 L30 40 L26 40 L18 28 L8 26 Z" fill="url(#grad-plane)" stroke="#94a3b8" stroke-width="1.2"/>
                <defs>
                    <linearGradient id="grad-plane" x1="8" y1="12" x2="44" y2="40" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#f8fafc"/>
                        <stop offset="1" stop-color="#cbd5e1"/>
                    </linearGradient>
                </defs>
            </svg>
        `,
        '창틀': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="8" width="32" height="32" rx="2" fill="#334155" stroke="#cbd5e1" stroke-width="2.5"/>
                <rect x="12" y="12" width="11" height="11" fill="#38bdf8" fill-opacity="0.4"/>
                <rect x="25" y="12" width="11" height="11" fill="#38bdf8" fill-opacity="0.4"/>
                <rect x="12" y="25" width="11" height="11" fill="#38bdf8" fill-opacity="0.4"/>
                <rect x="25" y="25" width="11" height="11" fill="#38bdf8" fill-opacity="0.4"/>
                <line x1="24" y1="8" x2="24" y2="40" stroke="#cbd5e1" stroke-width="2"/>
                <line x1="8" y1="24" x2="40" y2="24" stroke="#cbd5e1" stroke-width="2"/>
            </svg>
        `,

        // [14] 규소 (Si)
        '컴퓨터 반도체 칩': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="12" width="24" height="24" rx="3" fill="#0f172a" stroke="#22c55e" stroke-width="2"/>
                <rect x="17" y="17" width="14" height="14" rx="2" fill="#1e293b"/>
                <text x="24" y="26.5" font-size="7" font-weight="900" fill="#38ef7d" text-anchor="middle" font-family="sans-serif">Si</text>
                <line x1="16" y1="7" x2="16" y2="12" stroke="#facc15" stroke-width="1.8"/>
                <line x1="24" y1="7" x2="24" y2="12" stroke="#facc15" stroke-width="1.8"/>
                <line x1="32" y1="7" x2="32" y2="12" stroke="#facc15" stroke-width="1.8"/>
                <line x1="16" y1="36" x2="16" y2="41" stroke="#facc15" stroke-width="1.8"/>
                <line x1="24" y1="36" x2="24" y2="41" stroke="#facc15" stroke-width="1.8"/>
                <line x1="32" y1="36" x2="32" y2="41" stroke="#facc15" stroke-width="1.8"/>
                <line x1="7" y1="16" x2="12" y2="16" stroke="#facc15" stroke-width="1.8"/>
                <line x1="7" y1="24" x2="12" y2="24" stroke="#facc15" stroke-width="1.8"/>
                <line x1="7" y1="32" x2="12" y2="32" stroke="#facc15" stroke-width="1.8"/>
                <line x1="36" y1="16" x2="41" y2="16" stroke="#facc15" stroke-width="1.8"/>
                <line x1="36" y1="24" x2="41" y2="24" stroke="#facc15" stroke-width="1.8"/>
                <line x1="36" y1="32" x2="41" y2="32" stroke="#facc15" stroke-width="1.8"/>
            </svg>
        `,
        '유리/모래': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 40 Q18 32 30 38 Q38 42 42 40 L42 43 L6 43 Z" fill="#d97706"/>
                <path d="M18 12 L30 12 L28 32 Q28 35 24 35 Q20 35 20 32 Z" fill="#38bdf8" fill-opacity="0.3" stroke="#38bdf8" stroke-width="1.8"/>
                <path d="M22 17 L22 28" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.7"/>
                <circle cx="12" cy="38" r="1.2" fill="#fde047"/>
                <circle cx="34" cy="39" r="1.2" fill="#fde047"/>
                <circle cx="38" cy="37" r="1.2" fill="#fde047"/>
            </svg>
        `,
        '태양광 패널': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <polygon points="12,18 36,18 42,38 6,38" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2"/>
                <line x1="24" y1="18" x2="24" y2="38" stroke="#93c5fd" stroke-width="1.5"/>
                <line x1="9" y1="28" x2="39" y2="28" stroke="#93c5fd" stroke-width="1.5"/>
                <circle cx="36" cy="10" r="5" fill="#facc15"/>
                <line x1="30" y1="14" x2="26" y2="18" stroke="#facc15" stroke-width="1.5"/>
                <line x1="36" y1="17" x2="36" y2="21" stroke="#facc15" stroke-width="1.5"/>
            </svg>
        `,
        '실리콘 고무': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="22" y="6" width="4" height="20" rx="1.5" fill="#cbd5e1"/>
                <path d="M17 24 C17 22 31 22 31 24 L32 36 Q32 40 28 40 L20 40 Q16 40 16 36 Z" fill="#f43f5e" stroke="#fb7185" stroke-width="1.5"/>
                <path d="M21 30 Q24 35 27 30" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.6"/>
            </svg>
        `,

        // [15] 인 (P)
        'DNA & RNA': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="16" cy="12" r="4.5" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5"/>
                <text x="16" y="14.5" font-size="5" font-weight="900" fill="#0f172a" text-anchor="middle" font-family="sans-serif">P</text>
                <circle cx="32" cy="22" r="4.5" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5"/>
                <text x="32" y="24.5" font-size="5" font-weight="900" fill="#0f172a" text-anchor="middle" font-family="sans-serif">P</text>
                <circle cx="16" cy="34" r="4.5" fill="#f59e0b" stroke="#fbbf24" stroke-width="1.5"/>
                <text x="16" y="36.5" font-size="5" font-weight="900" fill="#0f172a" text-anchor="middle" font-family="sans-serif">P</text>
                <path d="M16 16 Q28 20 32 22 Q20 28 16 34" stroke="#38ef7d" stroke-width="2.5" fill="none"/>
            </svg>
        `,
        '성냥 마찰면': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="6" y="22" width="22" height="18" rx="2" fill="#7f1d1d" stroke="#b91c1c" stroke-width="1.5"/>
                <g transform="rotate(35 28 18)">
                    <rect x="26" y="6" width="4" height="24" fill="#fde68a"/>
                    <ellipse cx="28" cy="6" rx="3.5" ry="5" fill="#dc2626"/>
                </g>
                <circle cx="27" cy="23" r="3" fill="#facc15"/>
                <path d="M29 19 L32 17 M25 18 L23 15 M31 24 L34 26" stroke="#ef4444" stroke-width="1.5"/>
            </svg>
        `,
        '농업용 비료': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18 L32 18 L30 42 L14 42 Z" fill="#065f46" stroke="#10b981" stroke-width="1.8"/>
                <polygon points="12,18 22,14 32,18" fill="#047857"/>
                <text x="22" y="32" font-size="8" font-weight="900" fill="#34d399" text-anchor="middle" font-family="sans-serif">NPK</text>
                <path d="M36 40 C36 30 40 20 44 14" stroke="#facc15" stroke-width="2" fill="none"/>
                <circle cx="41" cy="22" r="2" fill="#facc15"/>
                <circle cx="39" cy="27" r="2" fill="#facc15"/>
            </svg>
        `,
        '뼈 구성': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g transform="rotate(45 24 24)">
                    <circle cx="16" cy="21" r="4.5" fill="#f1f5f9"/>
                    <circle cx="16" cy="27" r="4.5" fill="#f1f5f9"/>
                    <circle cx="32" cy="21" r="4.5" fill="#f1f5f9"/>
                    <circle cx="32" cy="27" r="4.5" fill="#f1f5f9"/>
                    <rect x="16" y="22" width="16" height="4" fill="#f1f5f9"/>
                </g>
                <circle cx="36" cy="12" r="3" fill="#38ef7d" fill-opacity="0.4"/>
                <text x="24" y="44" font-size="6" font-weight="900" fill="#cbd5e1" text-anchor="middle" font-family="sans-serif">Ca-P</text>
            </svg>
        `,

        // [16] 황 (S)
        '성냥 및 화약': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="14" y="24" width="4" height="20" rx="1" fill="#fde68a"/>
                <ellipse cx="16" cy="22" rx="3.5" ry="4.5" fill="#b45309"/>
                <path d="M16 6 C20 10 24 15 20 22 C18 19 16 20 16 16 C16 20 14 19 12 22 C8 15 12 10 16 6 Z" fill="#facc15" stroke="#ea580c" stroke-width="1"/>
                <circle cx="16" cy="15" r="2.5" fill="#ffffff"/>
            </svg>
        `,
        '황산 제조': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 8 L27 8 M24 8 L24 18 L34 38 C35.5 41 33.5 44 30 44 L18 44 C14.5 44 12.5 41 14 38 L24 18" stroke="#eab308" stroke-width="2" stroke-linejoin="round" fill="none"/>
                <path d="M16 34 L32 34 L30 42 L18 42 Z" fill="#ca8a04"/>
                <text x="24" y="32" font-size="5" font-weight="900" fill="#facc15" text-anchor="middle" font-family="sans-serif">H₂SO₄</text>
                <circle cx="20" cy="38" r="1.5" fill="#ffffff"/>
            </svg>
        `,
        '온천/단백질 구성': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="24" cy="34" rx="16" ry="7" fill="#0284c7" stroke="#38bdf8" stroke-width="1.8"/>
                <ellipse cx="24" cy="34" rx="12" ry="4.5" fill="#38bdf8"/>
                <path d="M17 26 Q19 21 16 16 Q13 11 16 7" stroke="#facc15" stroke-width="2" fill="none" stroke-linecap="round"/>
                <path d="M24 24 Q26 19 23 14 Q20 9 23 5" stroke="#facc15" stroke-width="2" fill="none" stroke-linecap="round"/>
                <path d="M31 26 Q33 21 30 16 Q27 11 30 7" stroke="#facc15" stroke-width="2" fill="none" stroke-linecap="round"/>
            </svg>
        `,

        // [17] 염소 (Cl)
        '수돗물/수영장 소독': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="8" y="16" width="32" height="24" rx="4" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
                <path d="M8 26 Q16 23 24 26 Q32 29 40 26" stroke="#ffffff" stroke-width="1.8" stroke-opacity="0.7" fill="none"/>
                <line x1="30" y1="12" x2="30" y2="28" stroke="#cbd5e1" stroke-width="1.8"/>
                <line x1="35" y1="12" x2="35" y2="28" stroke="#cbd5e1" stroke-width="1.8"/>
                <line x1="30" y1="16" x2="35" y2="16" stroke="#cbd5e1" stroke-width="1.5"/>
                <line x1="30" y1="21" x2="35" y2="21" stroke="#cbd5e1" stroke-width="1.5"/>
                <circle cx="16" cy="18" r="4.5" fill="#10b981"/>
                <text x="16" y="20.5" font-size="5" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="sans-serif">Cl₂</text>
            </svg>
        `,
        '소금(NaCl)': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16 18 L32 18 L30 38 Q30 41 24 41 Q18 41 18 38 Z" fill="#1e293b" stroke="#38bdf8" stroke-width="1.5"/>
                <rect x="19" y="11" width="10" height="7" rx="2" fill="#cbd5e1"/>
                <rect x="34" y="24" width="4" height="4" fill="#ffffff" stroke="#94a3b8" stroke-width="0.8"/>
                <rect x="38" y="32" width="3.5" height="3.5" fill="#ffffff" stroke="#94a3b8" stroke-width="0.8"/>
                <text x="24" y="32" font-size="6" font-weight="900" fill="#38bdf8" text-anchor="middle" font-family="sans-serif">NaCl</text>
            </svg>
        `,
        'PVC 파이프': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 18 L26 18 Q30 18 30 22 L30 38" stroke="#0284c7" stroke-width="8" stroke-linecap="round" fill="none"/>
                <path d="M10 18 L26 18 Q30 18 30 22 L30 38" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" fill="none"/>
                <rect x="6" y="14" width="4" height="8" rx="1" fill="#0369a1"/>
                <rect x="26" y="38" width="8" height="4" rx="1" fill="#0369a1"/>
                <text x="20" y="32" font-size="5.5" font-weight="900" fill="#ffffff" font-family="sans-serif">PVC</text>
            </svg>
        `,

        // [18] 아르곤 (Ar)
        '전구 내부 가스': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 28 C14 24 13 18 16 13 C19 8 29 8 32 13 C35 18 34 24 30 28 L28 34 L20 34 Z" fill="#0f172a" stroke="#facc15" stroke-width="1.8"/>
                <rect x="20" y="34" width="8" height="4" fill="#64748b"/>
                <rect x="21" y="38" width="6" height="3" fill="#475569" rx="1"/>
                <path d="M22 28 L22 20 L24 22 L26 20 L26 28" stroke="#f59e0b" stroke-width="1.5" stroke-linejoin="round"/>
                <text x="24" y="17" font-size="6" font-weight="900" fill="#a78bfa" text-anchor="middle" font-family="sans-serif">Ar</text>
            </svg>
        `,
        '특수 용접 보호기체': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 10 L24 22 L22 24 L10 12 Z" fill="#64748b"/>
                <path d="M24 22 L30 28 L28 30 L22 24 Z" fill="#94a3b8"/>
                <polygon points="30,28 36,34 34,36 28,30" fill="#cbd5e1"/>
                <circle cx="36" cy="36" r="8" fill="#818cf8" fill-opacity="0.3"/>
                <circle cx="36" cy="36" r="3" fill="#ffffff"/>
                <line x1="36" y1="31" x2="36" y2="27" stroke="#38bdf8" stroke-width="1.8"/>
                <line x1="41" y1="36" x2="45" y2="36" stroke="#38bdf8" stroke-width="1.8"/>
                <line x1="39" y1="33" x2="43" y2="30" stroke="#facc15" stroke-width="1.8"/>
            </svg>
        `,
        '이중창 내부 충전': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="8" width="6" height="32" rx="1" fill="#38bdf8" fill-opacity="0.8"/>
                <rect x="30" y="8" width="6" height="32" rx="1" fill="#38bdf8" fill-opacity="0.8"/>
                <rect x="18" y="10" width="12" height="28" fill="#818cf8" fill-opacity="0.25" stroke="#a78bfa" stroke-width="1" stroke-dasharray="3 2"/>
                <text x="24" y="26" font-size="6.5" font-weight="900" fill="#c084fc" text-anchor="middle" font-family="sans-serif">Ar</text>
            </svg>
        `,

        // [19] 칼륨 (K)
        '바나나/체내 이온 균형': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 28 C14 38 28 40 38 28 C34 32 24 33 16 26 Z" fill="#facc15" stroke="#eab308" stroke-width="1.2"/>
                <path d="M10 24 C14 35 28 37 38 22 C34 26 22 28 14 20 Z" fill="#fde047" stroke="#ca8a04" stroke-width="1.2"/>
                <circle cx="10" cy="22" r="2" fill="#713f12"/>
                <circle cx="28" cy="14" r="6" fill="#15803d" stroke="#4ade80" stroke-width="1.5"/>
                <text x="28" y="17" font-size="7" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="sans-serif">K⁺</text>
            </svg>
        `,
        '비료 원료': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14 18 L34 18 L31 42 L17 42 Z" fill="#ca8a04" stroke="#eab308" stroke-width="1.8"/>
                <text x="24" y="32" font-size="9" font-weight="900" fill="#ffffff" text-anchor="middle" font-family="sans-serif">K</text>
                <circle cx="12" cy="38" r="2" fill="#facc15"/>
                <circle cx="36" cy="38" r="2" fill="#facc15"/>
                <path d="M24 10 L24 15 M21 12 L24 15 L27 12" stroke="#4ade80" stroke-width="2"/>
            </svg>
        `,
        '비누': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="20" width="28" height="18" rx="6" fill="url(#grad-soap)" stroke="#c084fc" stroke-width="1.8"/>
                <ellipse cx="24" cy="24" rx="10" ry="2.5" fill="#ffffff" fill-opacity="0.4"/>
                <circle cx="15" cy="14" r="5" fill="#38bdf8" fill-opacity="0.5" stroke="#38bdf8" stroke-width="1.2"/>
                <circle cx="24" cy="11" r="3.5" fill="#818cf8" fill-opacity="0.5" stroke="#818cf8" stroke-width="1.2"/>
                <circle cx="32" cy="15" r="4" fill="#38ef7d" fill-opacity="0.5" stroke="#38ef7d" stroke-width="1.2"/>
                <defs>
                    <linearGradient id="grad-soap" x1="10" y1="20" x2="38" y2="38" gradientUnits="userSpaceOnUse">
                        <stop stop-color="#e9d5ff"/>
                        <stop offset="1" stop-color="#c084fc"/>
                    </linearGradient>
                </defs>
            </svg>
        `,

        // [20] 칼슘 (Ca)
        '뼈와 치아 구성': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12 C18 12 14 17 14 24 C14 32 17 40 21 40 C23 40 23 34 24 34 C25 34 25 40 27 40 C31 40 34 32 34 24 C34 17 30 12 24 12 Z" fill="#ffffff" stroke="#38bdf8" stroke-width="1.8"/>
                <path d="M33 13 L34 10 L35 13 L38 14 L35 15 L34 18 L33 15 L30 14 Z" fill="#facc15"/>
                <text x="24" y="27" font-size="7" font-weight="900" fill="#0284c7" text-anchor="middle" font-family="sans-serif">Ca²⁺</text>
            </svg>
        `,
        '시멘트/건축 자재': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="12" y="14" width="16" height="26" rx="2" fill="#334155" stroke="#94a3b8" stroke-width="1.8"/>
                <rect x="28" y="22" width="12" height="18" rx="2" fill="#475569" stroke="#94a3b8" stroke-width="1.5"/>
                <rect x="16" y="18" width="3" height="4" fill="#38bdf8"/>
                <rect x="22" y="18" width="3" height="4" fill="#38bdf8"/>
                <rect x="16" y="26" width="3" height="4" fill="#38bdf8"/>
                <rect x="22" y="26" width="3" height="4" fill="#38bdf8"/>
                <rect x="32" y="26" width="3" height="4" fill="#facc15"/>
            </svg>
        `,
        '우유 영양소': `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 18 L24 18 L24 40 L12 40 Z" fill="#f8fafc" stroke="#38bdf8" stroke-width="1.8"/>
                <polygon points="12,18 18,12 24,18" fill="#38bdf8"/>
                <path d="M12 28 Q18 32 24 28 L24 40 L12 40 Z" fill="#0284c7"/>
                <path d="M28 24 L38 24 L36 40 L30 40 Z" fill="#f8fafc" stroke="#38bdf8" stroke-width="1.5"/>
                <text x="18" y="25" font-size="5" font-weight="900" fill="#0284c7" text-anchor="middle" font-family="sans-serif">MILK</text>
                <circle cx="33" cy="18" r="2" fill="#38bdf8"/>
            </svg>
        `
    };

    // 21~118번 원소를 위한 스마트 카테고리/키워드 폴백 SVG 생성 함수
    function getFallbackIllustration(useText, category) {
        const text = (useText || '').toLowerCase();

        if (text.includes('배터리') || text.includes('전지')) {
            return `
                <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="12" y="16" width="24" height="24" rx="4" fill="#0f172a" stroke="#22c55e" stroke-width="2"/>
                    <rect x="20" y="11" width="8" height="5" rx="1.5" fill="#22c55e"/>
                    <path d="M25 21 L21 28 L26 28 L23 35" stroke="#facc15" stroke-width="2.5" stroke-linecap="round"/>
                </svg>`;
        }
        if (text.includes('합금') || text.includes('강철') || text.includes('도금') || text.includes('금속') || text.includes('동전') || text.includes('수저')) {
            return `
                <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="14" fill="#1e293b" stroke="#cbd5e1" stroke-width="2"/>
                    <circle cx="24" cy="24" r="5" fill="#64748b"/>
                    <rect x="22" y="6" width="4" height="6" fill="#cbd5e1"/>
                    <rect x="22" y="36" width="4" height="6" fill="#cbd5e1"/>
                    <rect x="6" y="22" width="6" height="4" fill="#cbd5e1"/>
                    <rect x="36" y="22" width="6" height="4" fill="#cbd5e1"/>
                </svg>`;
        }
        if (text.includes('반도체') || text.includes('전자') || text.includes('led') || text.includes('칩') || text.includes('디스플레이') || text.includes('센서')) {
            return `
                <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="14" y="14" width="20" height="20" rx="3" fill="#0f172a" stroke="#38ef7d" stroke-width="2"/>
                    <rect x="19" y="19" width="10" height="10" rx="1" fill="#38ef7d" fill-opacity="0.3"/>
                    <circle cx="24" cy="24" r="2" fill="#38ef7d"/>
                    <line x1="24" y1="8" x2="24" y2="14" stroke="#facc15" stroke-width="2"/>
                    <line x1="24" y1="34" x2="24" y2="40" stroke="#facc15" stroke-width="2"/>
                    <line x1="8" y1="24" x2="14" y2="24" stroke="#facc15" stroke-width="2"/>
                    <line x1="34" y1="24" x2="40" y2="24" stroke="#facc15" stroke-width="2"/>
                </svg>`;
        }
        if (text.includes('의료') || text.includes('치료') || text.includes('병원') || text.includes('약') || text.includes('진단') || text.includes('조영제')) {
            return `
                <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="16" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
                    <rect x="21" y="14" width="6" height="20" rx="2" fill="#ef4444"/>
                    <rect x="14" y="21" width="20" height="6" rx="2" fill="#ef4444"/>
                </svg>`;
        }
        if (text.includes('보석') || text.includes('귀금속') || text.includes('금') || text.includes('은') || text.includes('장신구') || text.includes('루비')) {
            return `
                <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <polygon points="14,18 34,18 40,26 24,40 8,26" fill="#facc15" stroke="#eab308" stroke-width="1.8"/>
                    <polygon points="20,18 28,18 24,26" fill="#ffffff" fill-opacity="0.6"/>
                    <path d="M35 12 L36 9 L37 12 L40 13 L37 14 L36 17 L35 14 L32 13 Z" fill="#ffffff"/>
                </svg>`;
        }
        if (text.includes('우주') || text.includes('항공') || text.includes('로켓') || text.includes('원자력') || text.includes('원자로')) {
            return `
                <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 8 C27 13 29 22 28 30 L20 30 C19 22 21 13 24 8 Z" fill="#cbd5e1" stroke="#94a3b8" stroke-width="1.5"/>
                    <polygon points="20,26 14,32 19,32" fill="#f97316"/>
                    <polygon points="28,26 34,32 29,32" fill="#f97316"/>
                    <polygon points="22,30 26,30 24,38" fill="#ef4444"/>
                </svg>`;
        }
        if (text.includes('레이저') || text.includes('광섬유') || text.includes('통신') || text.includes('형광체')) {
            return `
                <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="14" fill="#0f172a" stroke="#a855f7" stroke-width="2"/>
                    <line x1="12" y1="24" x2="36" y2="24" stroke="#f43f5e" stroke-width="3"/>
                    <line x1="12" y1="24" x2="36" y2="24" stroke="#ffffff" stroke-width="1"/>
                </svg>`;
        }
        if (text.includes('비료') || text.includes('농업') || text.includes('식물') || text.includes('영양')) {
            return `
                <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 38 L24 20" stroke="#22c55e" stroke-width="2.5" stroke-linecap="round"/>
                    <path d="M24 26 C18 24 16 16 24 18 Z" fill="#4ade80"/>
                    <path d="M24 22 C30 20 32 12 24 14 Z" fill="#22c55e"/>
                    <circle cx="16" cy="38" r="2" fill="#facc15"/>
                    <circle cx="32" cy="38" r="2" fill="#facc15"/>
                </svg>`;
        }
        if (text.includes('유리') || text.includes('세라믹') || text.includes('도자기') || text.includes('광학')) {
            return `
                <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 14 L32 14 L30 36 Q30 39 24 39 Q18 39 18 36 Z" fill="#38bdf8" fill-opacity="0.3" stroke="#38bdf8" stroke-width="2"/>
                    <path d="M20 20 L20 30" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.6"/>
                </svg>`;
        }

        // 기본 과학 장비 플라스크 아이콘
        return `
            <svg viewBox="0 0 48 48" class="use-svg" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 10 L27 10 M24 10 L24 20 L33 36 C34.5 39 32.5 42 29 42 L19 42 C15.5 42 13.5 39 15 36 L24 20" stroke="#38ef7d" stroke-width="2" stroke-linejoin="round" fill="none"/>
                <path d="M17 34 L31 34 L29 40 L19 40 Z" fill="#38ef7d" fill-opacity="0.4"/>
                <circle cx="24" cy="28" r="2" fill="#facc15"/>
            </svg>
        `;
    }

    /**
     * 특정 원소의 활용 항목에 대한 SVG 아이콘 반환
     */
    function getUseIllustrationSvg(useText, element) {
        if (!useText) return '';
        const trimmed = useText.trim();

        // 1. 단주기표 1~20번 일러스트 사전에서 검색
        if (USE_ILLUSTRATIONS[trimmed]) {
            return USE_ILLUSTRATIONS[trimmed];
        }

        // 2. 부분 일치 검색
        for (const [key, svg] of Object.entries(USE_ILLUSTRATIONS)) {
            if (trimmed === key || trimmed.includes(key) || key.includes(trimmed)) {
                return svg;
            }
        }

        // 3. 폴백 스마트 카테고리 아이콘 반환
        return getFallbackIllustration(trimmed, element ? element.category : '');
    }

    /**
     * 모달에 삽입할 실생활 활용 비주얼 카드 HTML 생성
     */
    function renderUseCardHtml(useText, element) {
        const svg = getUseIllustrationSvg(useText, element);
        return `
            <div class="use-visual-card" title="${escapeHtml(useText)}">
                <div class="use-visual-icon-box">
                    ${svg}
                </div>
                <div class="use-visual-label">${escapeHtml(useText)}</div>
            </div>
        `;
    }

    function escapeHtml(text) {
        return (text || '').replace(/[&<>"']/g, function (m) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#039;'
            }[m];
        });
    }

    // 전역 공개
    window.ELEMENT_ILLUSTRATIONS = USE_ILLUSTRATIONS;
    window.getUseIllustrationSvg = getUseIllustrationSvg;
    window.renderUseCardHtml = renderUseCardHtml;

})();
