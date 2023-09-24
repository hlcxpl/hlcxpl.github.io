const darkModeToggle = document.getElementById('dark-mode-toggle');
const sectionsToToggle = document.querySelectorAll('.dark-mode-toggleable');
const footer = document.querySelector('footer');
const originalClasses = {};
const changedSections = new Set();

let isDarkMode = false;

// Almacena las clases originales de las secciones en un objeto
sectionsToToggle.forEach((section) => {
    originalClasses[section.id] = {
        bgClass: section.classList.contains('bg-light') ? 'bg-light' : 'bg-dark',
        textClass: section.classList.contains('text-light') ? 'text-light' : 'text-dark',
    };
});

const moonIcon = document.querySelector('.moon-icon');
const sunIcon = document.querySelector('.sun-icon');

// Inicialmente, muestra la luna y oculta el sol
moonIcon.classList.remove('d-none');
sunIcon.classList.add('d-none');

darkModeToggle.addEventListener('click', function () {
    isDarkMode = !isDarkMode;

    // Cambiar las clases de las secciones
    sectionsToToggle.forEach((section) => {
        const originalClass = originalClasses[section.id];
        if (section.classList.contains('bg-light')) {
            section.classList.toggle('bg-dark', isDarkMode);
            section.classList.toggle('text-light', isDarkMode);
            section.classList.toggle('text-dark', !isDarkMode);

            // Si la sección cambió, agregamos o eliminamos de changedSections
            if (isDarkMode) {
                changedSections.add(section);
            } else {
                changedSections.delete(section);
            }
        }
    });

    // Cambiar las clases del footer
    footer.classList.toggle('bg-dark', isDarkMode);
    footer.classList.toggle('text-light', isDarkMode);
    footer.classList.toggle('text-dark', !isDarkMode);

    // Cambiar la visibilidad de los íconos
    moonIcon.classList.toggle('d-none', isDarkMode);
    sunIcon.classList.toggle('d-none', !isDarkMode);
});

// Al desactivar el modo oscuro, restaurar solo las secciones que cambiaron
darkModeToggle.addEventListener('dblclick', function () {
    if (!isDarkMode) return; // Solo se aplica cuando el modo oscuro está activado
    changedSections.forEach((section) => {
        const originalClass = originalClasses[section.id];
        section.classList.toggle('bg-dark', false);
        section.classList.toggle('text-light', false);
        section.classList.toggle('text-dark', true);
    });

    // Restaurar el footer
    footer.classList.toggle('bg-dark', false);
    footer.classList.toggle('text-light', false);
    footer.classList.toggle('text-dark', true);
    isDarkMode = false; // Cambiar el estado de nuevo a modo claro

    // Mostrar la luna y ocultar el sol
    moonIcon.classList.remove('d-none');
    sunIcon.classList.add('d-none');
});