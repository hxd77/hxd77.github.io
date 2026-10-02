// Decorative pointer response; content remains visible without JavaScript.
(() => {
  const art = document.querySelector(".hero-art");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(pointer: fine)");
  if (!art) return;
  let frame;
  const reset = () => {
    cancelAnimationFrame(frame);
    art.style.setProperty("--tilt-x", "0deg");
    art.style.setProperty("--tilt-y", "0deg");
  };
  art.addEventListener("pointermove", (event) => {
    if (reducedMotion.matches || !finePointer.matches) return;
    const bounds = art.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      art.style.setProperty("--tilt-x", `${-y * 6}deg`);
      art.style.setProperty("--tilt-y", `${x * 6}deg`);
    });
  });
  art.addEventListener("pointerleave", reset);
  reducedMotion.addEventListener("change", reset);
})();
