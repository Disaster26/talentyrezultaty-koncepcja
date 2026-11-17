(function(){
var d=document,b=d.querySelector('.burger'),m=d.getElementById('menu');
d.getElementById('rok').textContent=new Date().getFullYear();
b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o)});
m.addEventListener('click',function(e){if(e.target.tagName==='A'){m.classList.remove('open');b.setAttribute('aria-expanded','false')}});
// aktywna pozycja menu
var links=[].slice.call(m.querySelectorAll('a')),secs=links.map(function(a){return d.querySelector(a.getAttribute('href'))});
if('IntersectionObserver' in window){
 var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){var i=secs.indexOf(x.target);links.forEach(function(a,j){a.classList.toggle('on',j===i)})}})},{rootMargin:'-45% 0px -50% 0px'});
 secs.forEach(function(s){s&&io.observe(s)});
 var mob=d.getElementById('mob'),cta=d.getElementById('cta');
 new IntersectionObserver(function(en){mob.classList.toggle('widac',!en[0].isIntersecting&&en[0].boundingClientRect.top<0)}).observe(cta);
}
// formularz pokazowy
d.getElementById('fo').addEventListener('submit',function(e){e.preventDefault();d.getElementById('foi').textContent='To podgląd - wysyłka zadziała na docelowej stronie.'});
// lightbox
var lb=d.getElementById('lb'),li=lb.querySelector('img'),lp=lb.querySelector('p'),items=[].slice.call(d.querySelectorAll('[data-lb]')),cur=0;
function show(i){cur=(i+items.length)%items.length;var el=items[cur],im=el.tagName==='IMG'?el:el.querySelector('img');li.src=el.getAttribute('data-full');li.alt=im.alt;lp.textContent=im.alt+'  ('+(cur+1)+'/'+items.length+')';lb.classList.add('on')}
items.forEach(function(el,i){el.addEventListener('click',function(){show(i)})});
lb.querySelector('.x').onclick=function(){lb.classList.remove('on')};
lb.querySelector('.pv').onclick=function(e){e.stopPropagation();show(cur-1)};
lb.querySelector('.nx').onclick=function(e){e.stopPropagation();show(cur+1)};
lb.addEventListener('click',function(e){if(e.target===lb)lb.classList.remove('on')});
d.addEventListener('keydown',function(e){if(!lb.classList.contains('on'))return;if(e.key==='Escape')lb.classList.remove('on');if(e.key==='ArrowLeft')show(cur-1);if(e.key==='ArrowRight')show(cur+1)});
var sx=0;lb.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
lb.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx;if(Math.abs(dx)>50)show(cur+(dx<0?1:-1))});
// przeciaganie mysza kart sciezek
var sc=d.querySelector('.sciezki'),down=false,x0=0,s0=0;
sc.addEventListener('mousedown',function(e){if(sc.scrollWidth<=sc.clientWidth)return;down=true;x0=e.pageX;s0=sc.scrollLeft;sc.style.scrollSnapType='none'});
window.addEventListener('mouseup',function(){if(down){down=false;sc.style.scrollSnapType=''}});
sc.addEventListener('mousemove',function(e){if(!down)return;e.preventDefault();sc.scrollLeft=s0-(e.pageX-x0)});
})();
