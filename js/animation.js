let options = {
    root: document.body,
    rootMargin: '0px',
    threshold: 1.0
};

const callback = function(entries, observer) {
    entries.forEach(element => {
        if (element.isIntersecting === true) {
            animate(element.target);
        }
    });
};

const animate = function(elem) {
    const isanimated = elem.getAttribute('data-seen');
    if (isanimated === null) {
        elem.classList.forEach(element => {
            if (element.startsWith('animtype_')) {
                elem.style.animationName = element.replace('animtype_', '');
            }
        });
        elem.setAttribute('data-seen', 'true');
    }
}

const run = function() {
    const observer = new IntersectionObserver(callback);
    document.querySelectorAll('.animate').forEach(element => {
        observer.observe(element);
    });
}

// document.attr

document.addEventListener('DOMContentLoaded', run);
