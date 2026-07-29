/**
 * Curated 3D molecular / ionic structure models.
 * Coordinates are pedagogical ball-and-stick layouts, centered near the origin.
 */
window.MOLECULE_MODELS_3D = {
    'H₂O': {
        kind: '분자',
        geometry: '굽은형 · 결합각 약 104.5°',
        atoms: [
            { id: 'O1', num: 8, symbol: 'O', x: 0, y: -18, z: 0 },
            { id: 'H1', num: 1, symbol: 'H', x: -44, y: 35, z: 0 },
            { id: 'H2', num: 1, symbol: 'H', x: 44, y: 35, z: 0 }
        ],
        bonds: [
            { from: 'O1', to: 'H1', type: 'single' },
            { from: 'O1', to: 'H2', type: 'single' }
        ]
    },
    'CO₂': {
        kind: '분자',
        geometry: '직선형 · 결합각 180°',
        atoms: [
            { id: 'O1', num: 8, symbol: 'O', x: -72, y: 0, z: 0 },
            { id: 'C1', num: 6, symbol: 'C', x: 0, y: 0, z: 0 },
            { id: 'O2', num: 8, symbol: 'O', x: 72, y: 0, z: 0 }
        ],
        bonds: [
            { from: 'O1', to: 'C1', type: 'double' },
            { from: 'C1', to: 'O2', type: 'double' }
        ]
    },
    'NaCl': {
        kind: '이온쌍',
        geometry: 'Na⁺–Cl⁻ 이온쌍 · 고체에서는 이온 결정',
        atoms: [
            { id: 'Na1', num: 11, symbol: 'Na', charge: '+', x: -52, y: 0, z: 0 },
            { id: 'Cl1', num: 17, symbol: 'Cl', charge: '−', x: 52, y: 0, z: 0 }
        ],
        bonds: [
            { from: 'Na1', to: 'Cl1', type: 'ionic' }
        ]
    },
    'CH₄': {
        kind: '분자',
        geometry: '정사면체형 · 결합각 약 109.5°',
        atoms: [
            { id: 'C1', num: 6, symbol: 'C', x: 0, y: 0, z: 0 },
            { id: 'H1', num: 1, symbol: 'H', x: 44, y: 44, z: 44 },
            { id: 'H2', num: 1, symbol: 'H', x: -44, y: -44, z: 44 },
            { id: 'H3', num: 1, symbol: 'H', x: -44, y: 44, z: -44 },
            { id: 'H4', num: 1, symbol: 'H', x: 44, y: -44, z: -44 }
        ],
        bonds: [
            { from: 'C1', to: 'H1', type: 'single' },
            { from: 'C1', to: 'H2', type: 'single' },
            { from: 'C1', to: 'H3', type: 'single' },
            { from: 'C1', to: 'H4', type: 'single' }
        ]
    },
    'NH₃': {
        kind: '분자',
        geometry: '삼각뿔형 · 결합각 약 107°',
        atoms: [
            { id: 'N1', num: 7, symbol: 'N', x: 0, y: -24, z: 0 },
            { id: 'H1', num: 1, symbol: 'H', x: 0, y: 34, z: 52 },
            { id: 'H2', num: 1, symbol: 'H', x: -45, y: 34, z: -26 },
            { id: 'H3', num: 1, symbol: 'H', x: 45, y: 34, z: -26 }
        ],
        bonds: [
            { from: 'N1', to: 'H1', type: 'single' },
            { from: 'N1', to: 'H2', type: 'single' },
            { from: 'N1', to: 'H3', type: 'single' }
        ]
    },
    'H₂O₂': {
        kind: '분자',
        geometry: '비평면형 · H–O–O–H가 비틀린 구조',
        atoms: [
            { id: 'O1', num: 8, symbol: 'O', x: -30, y: 0, z: 0 },
            { id: 'O2', num: 8, symbol: 'O', x: 30, y: 0, z: 0 },
            { id: 'H1', num: 1, symbol: 'H', x: -68, y: 38, z: 30 },
            { id: 'H2', num: 1, symbol: 'H', x: 68, y: -38, z: 30 }
        ],
        bonds: [
            { from: 'H1', to: 'O1', type: 'single' },
            { from: 'O1', to: 'O2', type: 'single' },
            { from: 'O2', to: 'H2', type: 'single' }
        ]
    },
    'C₂H₆O': {
        kind: '분자',
        geometry: '에탄올 · 탄소 주변 정사면체형, 산소 주변 굽은형',
        atoms: [
            { id: 'C1', num: 6, symbol: 'C', x: -42, y: 0, z: 0 },
            { id: 'C2', num: 6, symbol: 'C', x: 18, y: 0, z: 0 },
            { id: 'O1', num: 8, symbol: 'O', x: 72, y: 14, z: 0 },
            { id: 'H1', num: 1, symbol: 'H', x: -72, y: -38, z: 24 },
            { id: 'H2', num: 1, symbol: 'H', x: -72, y: 34, z: 28 },
            { id: 'H3', num: 1, symbol: 'H', x: -68, y: 0, z: -43 },
            { id: 'H4', num: 1, symbol: 'H', x: 22, y: -40, z: 33 },
            { id: 'H5', num: 1, symbol: 'H', x: 22, y: -4, z: -45 },
            { id: 'H6', num: 1, symbol: 'H', x: 105, y: 43, z: 18 }
        ],
        bonds: [
            { from: 'C1', to: 'C2', type: 'single' },
            { from: 'C2', to: 'O1', type: 'single' },
            { from: 'O1', to: 'H6', type: 'single' },
            { from: 'C1', to: 'H1', type: 'single' },
            { from: 'C1', to: 'H2', type: 'single' },
            { from: 'C1', to: 'H3', type: 'single' },
            { from: 'C2', to: 'H4', type: 'single' },
            { from: 'C2', to: 'H5', type: 'single' }
        ]
    },
    'CaCO₃': {
        kind: '이온 모형',
        geometry: 'Ca²⁺와 평면 삼각형 CO₃²⁻ · 고체에서는 이온 결정',
        atoms: [
            { id: 'Ca1', num: 20, symbol: 'Ca', charge: '2+', x: -88, y: 0, z: 32 },
            { id: 'C1', num: 6, symbol: 'C', x: 24, y: 0, z: 0 },
            { id: 'O1', num: 8, symbol: 'O', x: 24, y: -58, z: 0 },
            { id: 'O2', num: 8, symbol: 'O', x: -26, y: 30, z: 0 },
            { id: 'O3', num: 8, symbol: 'O', x: 74, y: 30, z: 0 }
        ],
        bonds: [
            { from: 'Ca1', to: 'O2', type: 'ionic' },
            { from: 'C1', to: 'O1', type: 'double' },
            { from: 'C1', to: 'O2', type: 'single' },
            { from: 'C1', to: 'O3', type: 'single' }
        ]
    }
};
