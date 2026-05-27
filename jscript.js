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
const fechaObjetivo = new Date(2026, 5, 20, 14, 5, 0).getTime();

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaObjetivo - ahora;

    if (diferencia <= 0) {
        const timer = document.querySelector('.timer');
        const faltan = document.querySelector('.faltan');
        faltan.style.display = 'none';

        timer.innerHTML = '<div class="finished">¡Llegó la hora!</div>';
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

/*
setTimeout(() => {
    document.body.classList.add("cambio");
}, 23000); // */

// Audio rewind control: disable rewind button for 2s after use
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('musica');
    const rewindBtn = document.getElementById('rewindBtn');
    if (!audio || !rewindBtn) return;

    rewindBtn.addEventListener('click', () => {
        if (rewindBtn.disabled) return;
        // Seek to start
        try {
            audio.currentTime = 0;
        } catch (e) {}
        // briefly disable the button for 2 seconds
        rewindBtn.disabled = true;
        rewindBtn.classList.add('disabled');
        setTimeout(() => {
            rewindBtn.disabled = false;
            rewindBtn.classList.remove('disabled');
        }, 2000);
    });
});
