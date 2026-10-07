const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

if (!reducedMotion && "IntersectionObserver" in window) {
    const sections = document.querySelectorAll("[data-reveal]");

    if (sections.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        observer.unobserve(entry.target);
                    }
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -30px 0px" }
        );

        document.documentElement.classList.add("motion-ready");

        for (const section of sections) {
            if (section.getBoundingClientRect().top < window.innerHeight * 0.9) {
                section.classList.add("is-visible");
            } else {
                observer.observe(section);
            }
        }
    }
}
