(function() {
            const canvas = document.getElementById('bgCanvas');
            const ctx = canvas.getContext('2d');
            let stars = [];

            function resize() {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                initStars();
            }

            function initStars() {
                stars = [];
                const count = Math.floor((canvas.width * canvas.height) / 3500);
                for (let i = 0; i < count; i++) {
                    stars.push({
                        x: Math.random() * canvas.width,
                        y: Math.random() * canvas.height,
                        radius: Math.random() * 1.4 + 0.3,
                        alpha: Math.random(),
                        speed: Math.random() * 0.01 + 0.003,
                        color: '#ffffff'
                    });
                }
            }

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                stars.forEach(star => {
                    star.alpha += star.speed;
                    if (star.alpha > 1 || star.alpha < 0) {
                        star.speed = -star.speed;
                    }
                    ctx.save();
                    ctx.globalAlpha = Math.max(0.1, Math.min(1, star.alpha));
                    ctx.fillStyle = star.color;
                    ctx.beginPath();
                    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                });
                requestAnimationFrame(draw);
            }

            window.addEventListener('resize', resize);
            resize();
            draw();
        })();
