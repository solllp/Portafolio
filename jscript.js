const sections = Array.from(document.querySelectorAll('.section'));
let isAutoScrolling = false;
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (isAutoScrolling) return;

    const trigger = window.innerHeight * 0.4;
    const currentScroll = window.scrollY;
    const directionDown = currentScroll > lastScrollY;
    lastScrollY = currentScroll;

    if (directionDown) {
        for (const section of sections) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= trigger && rect.top > 0) {
                isAutoScrolling = true;
                section.scrollIntoView({ behavior: 'smooth' });
                window.setTimeout(() => {
                    isAutoScrolling = false;
                }, 700);
                break;
            }
        }
    } else {
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const rect = section.getBoundingClientRect();
            if (rect.top < 0 && rect.bottom >= trigger && rect.bottom <= window.innerHeight) {
                isAutoScrolling = true;
                section.scrollIntoView({ behavior: 'smooth' });
                window.setTimeout(() => {
                    isAutoScrolling = false;
                }, 700);
                break;
            }
        }
    }
});

const borderGlow = document.querySelector('.border-glow');
const observer = new IntersectionObserver((entries) => {
    let any = false;
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            any = true;
        } else {
            entry.target.classList.remove('active');
        }
    });
    borderGlow.classList.toggle('active', any);
}, { threshold: 0.1 });

// observe all sections
document.querySelectorAll('.section').forEach(s => observer.observe(s));



//HORARIO
const fechaObjetivo = new Date(2026, 5, 20, 19, 0, 0).getTime();
let contadorFinalizado = false;
let reboteFinishedId = null;

function iniciarReboteFinished(elemento, area) {
    if (!elemento || !area || reboteFinishedId) return;

    let x = 24;
    let y = 24;
    let velocidadX = 160;
    let velocidadY = 130;
    let tiempoAnterior = null;

    function animar(tiempoActual) {
        if (tiempoAnterior === null) {
            tiempoAnterior = tiempoActual;
        }

        const delta = (tiempoActual - tiempoAnterior) / 1000;
        tiempoAnterior = tiempoActual;

        const maxX = Math.max(0, area.clientWidth - elemento.offsetWidth);
        const maxY = Math.max(0, area.clientHeight - elemento.offsetHeight);

        x += velocidadX * delta;
        y += velocidadY * delta;

        if (x <= 0 || x >= maxX) {
            velocidadX *= -1;
            x = Math.min(Math.max(x, 0), maxX);
        }

        if (y <= 0 || y >= maxY) {
            velocidadY *= -1;
            y = Math.min(Math.max(y, 0), maxY);
        }

        elemento.style.left = `${x}px`;
        elemento.style.top = `${y}px`;

        reboteFinishedId = requestAnimationFrame(animar);
    }

    reboteFinishedId = requestAnimationFrame(animar);
}

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
        if (contadorFinalizado) return;

        contadorFinalizado = true;

        const timer = document.querySelector('.timer');
        const faltan = document.querySelector('.faltan');
        faltan.style.display = 'none';
        timer.classList.add('finished-mode');

        timer.innerHTML = '<div class="finished">🥳¡Llegó la hora para celebrar!🥳</div>';
        iniciarReboteFinished(timer.querySelector('.finished'), timer);
        return;
    }

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    document.getElementById('dias').textContent = dias;
    document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
    document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
    document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');

    document.querySelectorAll('.timer > div').forEach(el => {
        el.classList.remove('animate');
        void el.offsetWidth;
        el.classList.add('animate');
    });
}

setInterval(actualizarContador, 1000);
actualizarContador();


setTimeout(() => {
    document.body.classList.add("cambio");
}, 20000); // 20s para sincronizar con el cambio de fondo   

// Audio rewind control: disable rewind button for 2s after use
document.addEventListener('DOMContentLoaded', () => {

    const audio = document.getElementById('musica');

    const playPauseBtn = document.getElementById('playPauseBtn');

    const restartBtn = document.getElementById('restartBtn');

    // PLAY / PAUSE
    playPauseBtn.addEventListener('click', () => {

        if(audio.paused){

            audio.play();

            playPauseBtn.textContent = '⏸';

        }else{

            audio.pause();

            playPauseBtn.textContent = '▶';

        }

    });

    // RESTART
    restartBtn.addEventListener('click', () => {

        audio.currentTime = 0;

        audio.play();

        playPauseBtn.textContent = '⏸';

    });

});
