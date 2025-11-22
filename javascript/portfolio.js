document.addEventListener('DOMContentLoaded', function(){
  const nav = document.getElementById('nav');
  const togg = document.getElementById('navToggle');
  const year = document.getElementById('year');

  if(year) year.textContent = new Date().getFullYear();

  if(togg){
    togg.addEventListener('click', () => {
      if(nav.style.display === 'flex') nav.style.display = '';
      else nav.style.display = 'flex';
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href');
      if(href.length > 1){
        e.preventDefault();
        const el = document.querySelector(href);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
        if(nav && window.innerWidth < 768) nav.style.display = '';
      }
    });
  });

  const tlItems = document.querySelectorAll('.tl-item');
  if('IntersectionObserver' in window && tlItems.length){
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    tlItems.forEach(i => obs.observe(i));
  } else {
    tlItems.forEach(i => i.classList.add('in'));
  }
});
