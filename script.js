const menu=document.getElementById('menu'),nav=document.getElementById('navlinks');
menu.addEventListener('click',()=>{let open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'✕':'☰'});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');menu.textContent='☰'}));
const items=document.querySelectorAll('.reveal');
if('IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});items.forEach(el=>observer.observe(el))}else items.forEach(el=>el.classList.add('visible'));
document.getElementById('enquiry').addEventListener('submit',e=>{e.preventDefault();if(e.currentTarget.reportValidity()){document.getElementById('success').style.display='block';e.currentTarget.reset()}});
