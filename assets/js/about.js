document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".bio-block");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  blocks.forEach(block => {
    observer.observe(block);
  });
});
