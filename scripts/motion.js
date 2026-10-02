/* Locally hosted GSAP 3.13 + Lenis 1.3.26. One shared animation clock. */
window.startPortfolioMotion = function () {
 if (!document.querySelector('.hero') || !window.gsap || !window.ScrollTrigger || !window.Lenis) return;
 const {gsap,ScrollTrigger,Lenis}=window;
 gsap.registerPlugin(ScrollTrigger);
 ScrollTrigger.config({ignoreMobileResize:true});
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
 mm.add({desktop:'(min-width: 801px) and (pointer: fine)',mobile:'(max-width: 800px), (pointer: coarse)'},context=>{
  const {desktop}=context.conditions;

  document.body.classList.add('motion-active');
  const lenis=desktop?new Lenis({lerp:.16,smoothWheel:true,syncTouch:false,autoRaf:false,anchors:{offset:-30,duration:.8}}):{isDestroyed:false,raf(){},resize(){},scrollTo(target){window.scrollTo({top:target.getBoundingClientRect().top+scrollY-30,behavior:'instant'});},destroy(){this.isDestroyed=true;}};
  if(desktop)lenis.on('scroll',ScrollTrigger.update);
  const tick=time=>lenis.raf(time*1000);
  if(desktop)gsap.ticker.add(tick);gsap.ticker.lagSmoothing(0);
  const localCleanups=[];
  if(window.startAtmosphere)localCleanups.push(window.startAtmosphere(gsap));
  const on=(el,event,fn)=>{el.addEventListener(event,fn);localCleanups.push(()=>el.removeEventListener(event,fn));};
  const intro=gsap.timeline({defaults:{ease:'power4.out'}});
  intro.from('.hero-meta',{y:15,opacity:0,duration:.45})
   .from('.hero-name>span',{yPercent:115,rotationX:-35,clipPath:'inset(0 0 100% 0)',stagger:.045,duration:.9},.1)
   .from('.hero-introduction,.hero-caption',{y:25,opacity:0,duration:.65},.65)
   .from('.scroll',{y:20,opacity:0,duration:.5},1)
   .from('.hero-rule',{scaleX:0,duration:.8},.5);
  if(scrollY>100)intro.progress(1);
  const letters=gsap.utils.toArray('.hero-name>span');
  const hero=gsap.timeline({scrollTrigger:{trigger:'.hero',start:'top top',end:desktop?'+=85%':'+=60%',scrub:.6,invalidateOnRefresh:true},defaults:{ease:'none'}});
  letters.forEach((letter,i)=>hero.to(letter,{x:()=>((i/(letters.length-1))-.5)*-.035*innerWidth,y:()=> (i%2? .1:-.18)*innerHeight,rotation:(i-(letters.length-1)/2)*2,scale:.95,duration:1},0));
  hero.to('.hero-bottom',{y:-90,opacity:0,duration:.75},0).to('.hero-meta',{y:-30,opacity:0,duration:.6},0).to('.hero-name b',{rotation:180,duration:1},0);
  if(document.querySelector('.hero-sculpture')){
   hero.to('.hero-sculpture',{y:()=>innerHeight*.25,rotation:18,scale:1.15,duration:1},0).to('.hero-echo',{xPercent:-12,y:-60,duration:1},0);
   intro.from('.hero-sculpture',{rotation:-12,scale:.85,opacity:0,duration:1.1},.15);
   if(desktop){const sculpture=document.querySelector('.hero-sculpture img'),rx=gsap.quickTo(sculpture,'rotationY',{duration:1}),ry=gsap.quickTo(sculpture,'rotationX',{duration:1}),hx=gsap.quickTo(sculpture,'x',{duration:1});on(document.querySelector('.hero'),'pointermove',event=>{rx((event.clientX/innerWidth-.5)*12);ry((event.clientY/innerHeight-.5)*-9);hx((event.clientX/innerWidth-.5)*18)});on(document.querySelector('.hero'),'pointerleave',()=>{rx(0);ry(0);hx(0)});}
  }
  const story=gsap.timeline({scrollTrigger:{trigger:'.scroll-scene',start:desktop?'top top':'top 70%',end:desktop?()=>'+='+innerHeight*1.35:'bottom 20%',pin:desktop,scrub:desktop?.55:.3,anticipatePin:1,invalidateOnRefresh:true},defaults:{ease:'none'}});
  story.from('.cs-type span',{xPercent:(i)=>i?-8:8,duration:.3})
   .to('.cs-type span',{xPercent:(i)=>i?110:-110,rotation:(i)=>i?8:-8,duration:.7},.35)
   .from('.human-type span',{yPercent:120,clipPath:'inset(0 0 100% 0)',opacity:0,stagger:.18,duration:.6},.6)
   .from('.human-type b',{scale:0,opacity:0,stagger:.18,duration:.3},.9)
   .to('.human-type',{scale:desktop?.92:1,duration:.3},1.5)
   .to('.scene-progress i',{scaleX:1,duration:1.85},0);
  gsap.from('.story>h2 .line-mask>span',{yPercent:115,stagger:.08,ease:'power3.out',scrollTrigger:{trigger:'.story>h2',start:'top 85%',end:'top 40%',scrub:.5}});
  gsap.from('.about-copy>article',{y:35,stagger:.12,scrollTrigger:{trigger:'.about-copy',start:'top 95%',end:'top 65%',scrub:.4}});
  // One moving typographic bridge: scroll progress + a restrained velocity skew.
  const marquee=document.querySelector('.motion-marquee>div');

  document.querySelectorAll('.section-title').forEach(title=>gsap.from(title.querySelectorAll('.line-mask>span'),{yPercent:110,stagger:.07,ease:'power3.out',scrollTrigger:{trigger:title,start:'top 90%',end:'top 45%',scrub:.4}}));
  document.querySelectorAll('.project').forEach(project=>{
   gsap.from(project.querySelector('.project-heading'),{y:16,opacity:0,duration:.5,ease:'power2.out',scrollTrigger:{trigger:project,start:'top 90%',once:true}});
  });
  const progress=document.createElement('div');progress.className='timeline-progress';document.querySelector('#timeline').append(progress);
  gsap.to(progress,{scaleY:1,ease:'none',scrollTrigger:{trigger:'#timeline',start:'top 65%',end:'bottom 65%',scrub:true}});
  document.querySelectorAll('.timeline-row').forEach(row=>{
   ScrollTrigger.create({trigger:row,start:'top 65%',end:'bottom 40%',toggleClass:'is-focused'});
   gsap.from(row.querySelector('h3'),{x:25,scrollTrigger:{trigger:row,start:'top 90%',end:'top 60%',scrub:.4}});
  });
  {
   const touchCompanion=matchMedia('(pointer: coarse)').matches || !desktop;
   const fairy=document.createElement('div');fairy.className='cursor-fairy';fairy.setAttribute('aria-hidden','true');
   fairy.innerHTML=`<svg viewBox="0 0 48 56" xmlns="http://www.w3.org/2000/svg"><g fill="#e7f3ff" stroke="#9aafc5" stroke-width=".8"><path class="fairy-wing" d="M23 30C0 31 2 4 12 10C20 14 24 22 23 30Z"/><path class="fairy-wing right" d="M25 30C48 31 46 4 36 10C28 14 24 22 25 30Z"/><path class="fairy-wing" d="M21 30C4 26 4 45 14 40Z"/><path class="fairy-wing right" d="M27 30C44 26 44 45 34 40Z"/></g><circle cx="24" cy="23" r="4" fill="#d8e0e9" stroke="#6e8094" stroke-width=".8"/><path d="M24 28L19 39L29 39Z" fill="#9baec2"/><path d="M21 39L19 47M27 39L28 47M21 30L15 34M27 30L34 25" fill="none" stroke="#6e8094" stroke-linecap="round"/><path d="M34 25L39 16" stroke="#6e8094" stroke-width=".8"/><path class="fairy-star" d="M40 9L41 14L46 15L41 16L40 21L39 16L34 15L39 14Z" fill="#b5d4f2"/></svg>`;
   document.body.append(fairy);
   const fx=gsap.quickTo(fairy,'x',{duration:.65,ease:'power3.out'}),fy=gsap.quickTo(fairy,'y',{duration:.65,ease:'power3.out'});
   let fairySeen=false,returnHome;
   if(touchCompanion){gsap.set(fairy,{x:innerWidth-52,y:innerHeight-100,opacity:.85});fairySeen=true;}
   const followFairy=event=>{if(returnHome)returnHome.kill();if(!fairySeen){gsap.set(fairy,{x:event.clientX+22,y:event.clientY-32});fairySeen=true;}fx(Math.max(4,Math.min(innerWidth-44,event.clientX+22)));fy(Math.max(4,Math.min(innerHeight-50,event.clientY-32)));gsap.to(fairy,{opacity:.85,duration:.25,overwrite:'auto'});if(touchCompanion)returnHome=gsap.delayedCall(1.6,()=>{fx(innerWidth-52);fy(innerHeight-100);});};
   on(document,'pointermove',event=>{if(event.pointerType!=='touch')followFairy(event);});
   on(document,'pointerdown',followFairy);
   on(window,'resize',()=>{if(touchCompanion){fx(innerWidth-52);fy(innerHeight-100);}});
   on(document.documentElement,'pointerleave',()=>{if(!touchCompanion){gsap.to(fairy,{opacity:0,duration:.3});fairySeen=false;}});
   localCleanups.push(()=>{if(returnHome)returnHome.kill();gsap.killTweensOf(fairy);fx.tween.kill();fy.tween.kill();fairy.remove();});
  }
  if(desktop && matchMedia('(pointer: fine)').matches){
   const cursor=document.createElement('div');cursor.className='pointer-label';cursor.setAttribute('aria-hidden','true');document.body.append(cursor);
   const x=gsap.quickTo(cursor,'x',{duration:.18}),y=gsap.quickTo(cursor,'y',{duration:.18});
   on(document,'pointermove',event=>{x(event.clientX+15);y(event.clientY+15)});
   document.querySelectorAll('.project-stage,.cv-link,a[href^="https:"]').forEach(link=>{
    on(link,'pointerenter',()=>{cursor.textContent=link.matches('.project-stage')?'VIEW PROJECT':link.matches('.cv-link')?'CV INFO':'VISIT';gsap.to(cursor,{opacity:1,scale:1,duration:.2})});
    on(link,'pointerleave',()=>gsap.to(cursor,{opacity:0,scale:.65,duration:.2}));
   });
   document.querySelectorAll('.capability-grid li').forEach(item=>{on(item,'pointermove',event=>{const r=item.getBoundingClientRect();gsap.to(item,{x:(event.clientX-r.left-r.width/2)*.08,duration:.4})});on(item,'pointerleave',()=>gsap.to(item,{x:0,duration:.5}));});
   localCleanups.push(()=>cursor.remove());
  }
  const ending=gsap.timeline({scrollTrigger:{trigger:'.contact',start:'top 90%',end:'top 10%',scrub:.6},defaults:{ease:'none'}});
  ending.from('.contact .line-mask>span',{yPercent:110,stagger:.12,duration:1},0)
   .from('.contact-star',{rotation:-180,scale:.25,duration:1},0)
   .from('.contact-bottom',{y:50,duration:.6},.5);
  gsap.to('.contact-star',{rotation:90,ease:'none',scrollTrigger:{trigger:'.contact',start:'top 10%',end:'bottom bottom',scrub:.5}});
  document.fonts.ready.then(()=>{if(!lenis.isDestroyed){lenis.resize();ScrollTrigger.refresh();const target=location.hash && document.getElementById(location.hash.slice(1));if(target)lenis.scrollTo(target,{immediate:true})}});
  return ()=>{intro.kill();gsap.ticker.remove(tick);lenis.destroy();localCleanups.forEach(fn=>fn());progress.remove();document.body.classList.remove('motion-active');};
 });
 const cleanup=event=>{if(event.persisted)return;mm.revert();listeners.forEach(fn=>fn());};
 listen(window,'pagehide',cleanup);
};
