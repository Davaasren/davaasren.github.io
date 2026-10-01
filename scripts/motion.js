/* Locally hosted GSAP 3.13 + Lenis 1.3.26. One shared animation clock. */
window.startPortfolioMotion = function () {
 if (!document.querySelector('.hero') || !window.gsap || !window.ScrollTrigger || !window.Lenis) return;
 const {gsap,ScrollTrigger,Lenis}=window;
 gsap.registerPlugin(ScrollTrigger);
 const mm=gsap.matchMedia();
 const listeners=[];
 const listen=(el,event,fn,options)=>{el.addEventListener(event,fn,options);listeners.push(()=>el.removeEventListener(event,fn,options));};
 // Line masks preserve the original accessible heading text.
 document.querySelectorAll('.story>h2,.section-title,.contact h2').forEach(heading=>{
  if(heading.querySelector('.line-mask'))return;
  const star=heading.querySelector('.contact-star');if(star)star.remove();
  heading.innerHTML=heading.innerHTML.split(/<br\s*\/?\s*>/i).map(line=>`<span class="line-mask"><span>${line}</span></span>`).join('');
  if(star)heading.append(star);
 });
 mm.add({desktop:'(min-width: 801px)',mobile:'(max-width: 800px)',reduce:'(prefers-reduced-motion: reduce)'},context=>{
  const {desktop,reduce}=context.conditions;
  if(reduce)return;
  document.body.classList.add('motion-active');
  const lenis=new Lenis({lerp:.12,smoothWheel:true,syncTouch:false,autoRaf:false,anchors:{offset:-30,duration:.8}});
  lenis.on('scroll',ScrollTrigger.update);
  const tick=time=>lenis.raf(time*1000);
  gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);
  const localCleanups=[];
  const on=(el,event,fn)=>{el.addEventListener(event,fn);localCleanups.push(()=>el.removeEventListener(event,fn));};
  const intro=gsap.timeline({defaults:{ease:'power4.out'}});
  intro.from('.hero-meta',{y:15,opacity:0,duration:.45})
   .from('.hero-name>span',{yPercent:115,rotationX:-35,clipPath:'inset(0 0 100% 0)',stagger:.075,duration:1.05},.1)
   .from('.hero-bottom>p,.hero-caption',{y:25,opacity:0,duration:.65},.65)
   .from('.scroll',{y:20,opacity:0,duration:.5},1)
   .from('.hero-rule',{scaleX:0,duration:.8},.5);
  if(scrollY>100)intro.progress(1);
  const letters=gsap.utils.toArray('.hero-name>span');
  const hero=gsap.timeline({scrollTrigger:{trigger:'.hero',start:'top top',end:desktop?'+=85%':'+=60%',scrub:.6,invalidateOnRefresh:true},defaults:{ease:'none'}});
  letters.forEach((letter,i)=>hero.to(letter,{x:()=>[ -.16,-.08,0,.08,.16][i]*innerWidth,y:()=>[ -.28,.10,-.14,.16,-.22][i]*innerHeight,rotation:[-12,-5,0,6,12][i],scale:desktop?1.35:1.15,duration:1},0));
  hero.to('.hero-bottom',{y:-90,opacity:0,duration:.75},0).to('.hero-meta',{y:-30,opacity:0,duration:.6},0).to('.hero-name b',{rotation:180,duration:1},0);
  const story=gsap.timeline({scrollTrigger:{trigger:'.scroll-scene',start:desktop?'top top':'top 70%',end:desktop?()=>'+='+innerHeight*1.8:'bottom 20%',pin:desktop,scrub:desktop?.55:.3,anticipatePin:1,invalidateOnRefresh:true},defaults:{ease:'none'}});
  story.from('.cs-type span',{xPercent:(i)=>i?-8:8,duration:.3})
   .to('.cs-type span',{xPercent:(i)=>i?110:-110,rotation:(i)=>i?8:-8,duration:.7},.35)
   .from('.human-type span',{yPercent:120,clipPath:'inset(0 0 100% 0)',opacity:0,stagger:.18,duration:.6},.6)
   .from('.human-type b',{scale:0,opacity:0,stagger:.18,duration:.3},.9)
   .to('.human-type',{scale:desktop?.92:1,duration:.3},1.5)
   .to('.scene-progress i',{scaleX:1,duration:1.85},0);
  gsap.from('.story>h2 .line-mask>span',{yPercent:115,stagger:.08,ease:'power3.out',scrollTrigger:{trigger:'.story>h2',start:'top 85%',end:'top 40%',scrub:.5}});
  gsap.from('.about-copy>p',{y:35,stagger:.12,scrollTrigger:{trigger:'.about-copy',start:'top 95%',end:'top 65%',scrub:.4}});
  // One moving typographic bridge: scroll progress + a restrained velocity skew.
  const marquee=document.querySelector('.motion-marquee>div');
  gsap.to(marquee,{xPercent:-35,ease:'none',scrollTrigger:{trigger:'.work',start:'top bottom',end:'bottom top',scrub:.7,onUpdate:self=>{gsap.to(marquee,{skewX:gsap.utils.clamp(-3,3,self.getVelocity()/1000),duration:.4,overwrite:'auto'})}}});
  document.querySelectorAll('.section-title').forEach(title=>gsap.from(title.querySelectorAll('.line-mask>span'),{yPercent:110,stagger:.07,ease:'power3.out',scrollTrigger:{trigger:title,start:'top 90%',end:'top 45%',scrub:.4}}));
  document.querySelectorAll('.project').forEach((project,i)=>{
   const stage=project.querySelector('.project-stage'),inner=project.querySelector('.stage-inner');
   const next=project.nextElementSibling;
   if(desktop && next) ScrollTrigger.create({trigger:project,start:'top top',endTrigger:next,end:'top top',pin:true,pinSpacing:false,anticipatePin:1});
   const reveal=gsap.timeline({scrollTrigger:{trigger:project,start:'top 95%',end:'top 15%',scrub:.5},defaults:{ease:'none'}});
   reveal.from(project.querySelector('.project-number'),{y:55,rotation:-10,duration:.35},0)
    .from(project.querySelector('h3'),{x:desktop?100:35,y:30,duration:.45},.08)
    .from(stage,{clipPath:'inset(20% 8% 20% 8%)',y:70,duration:.8},.12)
    .from(inner,{scale:1.2,y:45,duration:.8},.12)
    .from(project.querySelector('.project-description'),{y:30,duration:.4},.5);
   gsap.to(inner,{y:-35,ease:'none',scrollTrigger:{trigger:stage,start:'top 30%',end:'bottom top',scrub:.6}});
   if(desktop){
    const word=stage.querySelector('.stage-word'),x=gsap.quickTo(word,'x',{duration:.6,ease:'power3.out'}),y=gsap.quickTo(word,'y',{duration:.6,ease:'power3.out'});
    on(stage,'pointermove',event=>{const r=stage.getBoundingClientRect();x(((event.clientX-r.left)/r.width-.5)*25);y(((event.clientY-r.top)/r.height-.5)*-20)});
    on(stage,'pointerleave',()=>{x(0);y(0)});
   }
  });
  const progress=document.createElement('div');progress.className='timeline-progress';document.querySelector('#timeline').append(progress);
  gsap.to(progress,{scaleY:1,ease:'none',scrollTrigger:{trigger:'#timeline',start:'top 65%',end:'bottom 65%',scrub:true}});
  document.querySelectorAll('.timeline-row').forEach(row=>{
   ScrollTrigger.create({trigger:row,start:'top 65%',end:'bottom 40%',toggleClass:'is-focused'});
   gsap.from(row.querySelector('h3'),{x:25,scrollTrigger:{trigger:row,start:'top 90%',end:'top 60%',scrub:.4}});
  });
  if(desktop && matchMedia('(pointer: fine)').matches){
   const cursor=document.createElement('div');cursor.className='pointer-label';cursor.setAttribute('aria-hidden','true');document.body.append(cursor);
   const x=gsap.quickTo(cursor,'x',{duration:.18}),y=gsap.quickTo(cursor,'y',{duration:.18});
   on(document,'pointermove',event=>{x(event.clientX+15);y(event.clientY+15)});
   document.querySelectorAll('.project-stage,.cv-link,a[href^="https:"]').forEach(link=>{
    on(link,'pointerenter',()=>{cursor.textContent=link.matches('.project-stage')?'VIEW':link.matches('.cv-link')?'CV INFO':'VISIT';gsap.to(cursor,{opacity:1,scale:1,duration:.2})});
    on(link,'pointerleave',()=>gsap.to(cursor,{opacity:0,scale:.65,duration:.2}));
   });
   document.querySelectorAll('.capability-grid li').forEach(item=>{on(item,'pointermove',event=>{const r=item.getBoundingClientRect();gsap.to(item,{x:(event.clientX-r.left-r.width/2)*.08,duration:.4})});on(item,'pointerleave',()=>gsap.to(item,{x:0,duration:.5}));});
   localCleanups.push(()=>cursor.remove());
  }
  const ending=gsap.timeline({scrollTrigger:{trigger:'.contact',start:'top 90%',end:'top 10%',scrub:.6},defaults:{ease:'none'}});
  ending.from('.contact .line-mask>span',{xPercent:(i)=>i%2?25:-25,yPercent:110,stagger:.12,duration:1},0)
   .from('.contact-star',{rotation:-180,scale:.25,duration:1},0)
   .from('.contact-bottom',{y:50,duration:.6},.5);
  gsap.to('.contact-star',{rotation:90,ease:'none',scrollTrigger:{trigger:'.contact',start:'top 10%',end:'bottom bottom',scrub:.5}});
  document.fonts.ready.then(()=>{if(!lenis.isDestroyed){lenis.resize();ScrollTrigger.refresh()}});
  return ()=>{intro.kill();gsap.ticker.remove(tick);lenis.destroy();localCleanups.forEach(fn=>fn());progress.remove();document.body.classList.remove('motion-active');};
 });
 const cleanup=event=>{if(event.persisted)return;mm.revert();listeners.forEach(fn=>fn());};
 listen(window,'pagehide',cleanup);
};
