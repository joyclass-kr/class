/**
 * 2022 개정 교육과정 3D 인체 해부학 고해상도 절차적 텍스처 & 노멀 맵 생성기
 * Canvas-based Real-time Procedural Medical Texture & Bump Map Generator
 */

var AnatomicalTextures = (function () {
    'use strict';

    function createGastricRugaeTexture() {
        var canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        var ctx = canvas.getContext('2d');

        // Base mucosal pinkish-crimson
        var grad = ctx.createLinearGradient(0, 0, 512, 512);
        grad.addColorStop(0, '#9e2a3b');
        grad.addColorStop(0.5, '#7a1c2b');
        grad.addColorStop(1, '#5c1320');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 512);

        // Gastric Rugae Wrinkles & Folds
        ctx.lineWidth = 6;
        ctx.strokeStyle = 'rgba(190, 60, 80, 0.45)';
        for (var i = 0; i < 30; i++) {
            ctx.beginPath();
            var y = i * 18 + Math.sin(i) * 10;
            ctx.moveTo(0, y);
            for (var x = 0; x <= 512; x += 32) {
                var waveY = y + Math.sin(x * 0.04 + i * 0.5) * 12;
                ctx.lineTo(x, waveY);
            }
            ctx.stroke();
        }

        // Micro capillaries (모세혈관망)
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = 'rgba(239, 68, 68, 0.35)';
        for (var c = 0; c < 45; c++) {
            ctx.beginPath();
            var cx = Math.random() * 512;
            var cy = Math.random() * 512;
            ctx.moveTo(cx, cy);
            for (var s = 0; s < 5; s++) {
                cx += (Math.random() - 0.5) * 24;
                cy += (Math.random() - 0.5) * 24;
                ctx.lineTo(cx, cy);
            }
            ctx.stroke();
        }

        var tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(2, 2);
        return tex;
    }

    function createLiverTexture() {
        var canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        var ctx = canvas.getContext('2d');

        // Deep rich hepatic reddish brown
        ctx.fillStyle = '#4a150e';
        ctx.fillRect(0, 0, 512, 512);

        // Hepatic lobule mottling (간소엽 미세 패턴)
        for (var i = 0; i < 2000; i++) {
            var x = Math.random() * 512;
            var y = Math.random() * 512;
            var r = Math.random() * 3 + 1;
            ctx.fillStyle = (Math.random() > 0.5) ? 'rgba(92, 32, 22, 0.4)' : 'rgba(40, 10, 8, 0.5)';
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }

        // Glisson's capsule vascular branching
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(160, 45, 30, 0.25)';
        for (var v = 0; v < 20; v++) {
            ctx.beginPath();
            var vx = Math.random() * 512;
            var vy = Math.random() * 512;
            ctx.moveTo(vx, vy);
            ctx.quadraticCurveTo(vx + 40, vy + 30, vx + 80, vy + 10);
            ctx.stroke();
        }

        var tex = new THREE.CanvasTexture(canvas);
        return tex;
    }

    function createIntestineTexture() {
        var canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        var ctx = canvas.getContext('2d');

        // Warm intestinal fleshy mucosal tone
        ctx.fillStyle = '#9e4635';
        ctx.fillRect(0, 0, 512, 512);

        // Circular plicae bands (윤상 주름)
        for (var y = 0; y < 512; y += 14) {
            ctx.fillStyle = (y % 28 === 0) ? 'rgba(180, 90, 70, 0.5)' : 'rgba(80, 25, 18, 0.4)';
            ctx.fillRect(0, y, 512, 6);
        }

        // Fine villi speckles
        for (var p = 0; p < 3000; p++) {
            var px = Math.random() * 512;
            var py = Math.random() * 512;
            ctx.fillStyle = 'rgba(230, 140, 120, 0.3)';
            ctx.fillRect(px, py, 1.5, 1.5);
        }

        var tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(4, 2);
        return tex;
    }

    function createBoneTexture() {
        var canvas = document.createElement('canvas');
        canvas.width = 256;
        canvas.height = 256;
        var ctx = canvas.getContext('2d');

        ctx.fillStyle = '#eaeef4';
        ctx.fillRect(0, 0, 256, 256);

        // Subtle osteon micro-rings
        for (var b = 0; b < 150; b++) {
            var bx = Math.random() * 256;
            var by = Math.random() * 256;
            ctx.strokeStyle = 'rgba(180, 190, 205, 0.35)';
            ctx.lineWidth = 1;
            ctx.strokeRect(bx, by, Math.random() * 4 + 2, Math.random() * 4 + 2);
        }

        return new THREE.CanvasTexture(canvas);
    }

    return {
        createGastricRugaeTexture: createGastricRugaeTexture,
        createLiverTexture: createLiverTexture,
        createIntestineTexture: createIntestineTexture,
        createBoneTexture: createBoneTexture
    };
})();
