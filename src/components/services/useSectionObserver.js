import { useEffect } from "react";

const useSectionObserver = (setHash) => {
  useEffect(() => {
    const sections = document.querySelectorAll("section, div[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            if (id) {
              setHash(`#${id}`);
              window.history.replaceState(null, "", `#${id}`);
            }
          }
        });
      },
      {
        threshold: 0.5, // Detecta si al menos el 50% de la sección está visible
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [setHash]);
};

export default useSectionObserver;
