(function (global) {
    'use strict';

    const ANIMAL_AVATARS = Object.freeze([
        { name: '판다', icon: '🐼' }, { name: '토끼', icon: '🐰' },
        { name: '여우', icon: '🦊' }, { name: '곰', icon: '🐻' },
        { name: '사자', icon: '🦁' }, { name: '호랑이', icon: '🐯' },
        { name: '고양이', icon: '🐱' }, { name: '강아지', icon: '🐶' },
        { name: '개구리', icon: '🐸' }, { name: '아기새', icon: '🐥' },
        { name: '유니콘', icon: '🦄' }, { name: '공룡', icon: '🦖' },
        { name: '꿀벌', icon: '🐝' }, { name: '아기쥐', icon: '🐭' },
        { name: '코끼리', icon: '🐘' }, { name: '아기말', icon: '🐴' },
        { name: '아기양', icon: '🐑' }, { name: '펭귄', icon: '🐧' },
        { name: '부엉이', icon: '🦉' }, { name: '다람쥐', icon: '🐿️' },
        { name: '너구리', icon: '🦝' }, { name: '수달', icon: '🦦' },
        { name: '사슴', icon: '🦌' }, { name: '돌고래', icon: '🐬' },
        { name: '늑대', icon: '🐺' }, { name: '원숭이', icon: '🐒' },
        { name: '코알라', icon: '🐨' }, { name: '캥거루', icon: '🦘' },
        { name: '바다표범', icon: '🦭' }, { name: '고슴도치', icon: '🦔' },
        { name: '나무늘보', icon: '🦥' }, { name: '악어', icon: '🐊' },
        { name: '햄스터', icon: '🐹' }, { name: '아기거북이', icon: '🐢' },
        { name: '병아리', icon: '🐣' }, { name: '아기드래곤', icon: '🐲' }
    ]);
    const orderCache = new Map();

    function hashSeed(value) {
        let hash = 2166136261;
        for (const character of String(value || 'default-class')) {
            hash ^= character.charCodeAt(0);
            hash = Math.imul(hash, 16777619);
        }
        return hash >>> 0;
    }

    function seededRandom(seed) {
        let state = seed >>> 0;
        return function () {
            state += 0x6D2B79F5;
            let value = state;
            value = Math.imul(value ^ (value >>> 15), value | 1);
            value ^= value + Math.imul(value ^ (value >>> 7), value | 61);
            return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
        };
    }

    function createAvatarOrder(classKey) {
        const random = seededRandom(hashSeed(classKey));
        const order = ANIMAL_AVATARS.map((_, index) => index);
        for (let index = order.length - 1; index > 0; index -= 1) {
            const swapIndex = Math.floor(random() * (index + 1));
            [order[index], order[swapIndex]] = [order[swapIndex], order[index]];
        }

        const fixed = order.map((avatarIndex, index) => avatarIndex === index ? index : -1)
            .filter((index) => index >= 0);
        if (fixed.length === 1) {
            const other = (fixed[0] + 1) % order.length;
            [order[fixed[0]], order[other]] = [order[other], order[fixed[0]]];
        } else if (fixed.length > 1) {
            fixed.forEach((index, position) => {
                order[index] = fixed[(position + 1) % fixed.length];
            });
        }
        return Object.freeze(order);
    }

    function getOrder(classKey) {
        const key = String(classKey || 'default-class');
        if (!orderCache.has(key)) orderCache.set(key, createAvatarOrder(key));
        return orderCache.get(key);
    }

    function getAvatarForStudent(studentNumber, classKey) {
        const parsed = Number.parseInt(studentNumber, 10);
        const baseIndex = Number.isFinite(parsed) && parsed > 0
            ? (parsed - 1) % ANIMAL_AVATARS.length
            : 0;
        return ANIMAL_AVATARS[getOrder(classKey)[baseIndex]];
    }

    global.ClassroomAvatars = Object.freeze({
        avatars: ANIMAL_AVATARS,
        getAvatarForStudent,
        getOrder
    });
})(window);
