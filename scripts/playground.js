/* Original particle globe: pointer deflection and an accessible scatter action. */
window.startParticleSphere=function(){
 const button=document.querySelector('.particle-sphere');if(!button)return;
 const canvas=button.querySelector('canvas'),ctx=canvas.getContext('2d');if(!ctx)return;
 const reduced={matches:false,addEventListener(){},removeEventListener(){}};let w=0,h=0,last=0,burst=0,mx=0,my=0,aimX=0,aimY=0,visible=true,hover=false,pointerX=0,pointerY=0,touchUntil=0;
 const points=Array.from({length:600},(_,i)=>{const y=1-i/599*2,r=Math.sqrt(1-y*y),a=i*Math.PI*(3-Math.sqrt(5));return {x:Math.cos(a)*r,y,z:Math.sin(a)*r,dx:0,dy:0,vx:0,vy:0};});
 const resize=()=>{w=button.clientWidth;h=button.clientHeight;const dpr=Math.min(devicePixelRatio||1,1.5);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);render(0);};
 const render=time=>{ctx.clearRect(0,0,w,h);const size=Math.min(h*.34,w*.35),angle=reduced.matches?0:time*.18+mx*.5,tilt=my*.35;
 const interacting=!reduced.matches&&(hover||performance.now()<touchUntil),reach=Math.min(115,size*.8);
 const deform=(x,y,z=1)=>{const dx=x-pointerX,dy=y-pointerY,d=Math.hypot(dx,dy),weight=interacting?Math.pow(Math.max(0,1-d/reach),2):0;const a=Math.atan2(dy,dx);const strength=weight*(30+size*.24)*(.55+(z+1)*.225);return {x:Math.cos(a+.6)*strength,y:Math.sin(a+.6)*strength,weight};};
 const projected=points.map((p,i)=>{let x=p.x*Math.cos(angle)+p.z*Math.sin(angle),z=p.z*Math.cos(angle)-p.x*Math.sin(angle),y=p.y*Math.cos(tilt)-z*Math.sin(tilt);z=p.y*Math.sin(tilt)+z*Math.cos(tilt);const spread=1+burst*(.4+.5*Math.sin(i*2.4)**2),bx=w/2+x*size*spread,by=h/2+y*size*spread,target=deform(bx,by,z);
 if(reduced.matches){p.dx=p.dy=p.vx=p.vy=0;}else{p.vx=(p.vx+(target.x-p.dx)*.12)*.76;p.vy=(p.vy+(target.y-p.dy)*.12)*.76;p.dx+=p.vx;p.dy+=p.vy;}
 return {x:bx+p.dx,y:by+p.dy,z,weight:target.weight};}).sort((a,b)=>a.z-b.z);
 for(const p of projected){ctx.beginPath();ctx.fillStyle=`rgba(80,112,139,${Math.min(.95,.17+(p.z+1)*.32+p.weight*.2)})`;ctx.arc(p.x,p.y,1+(p.z+1)*.85+p.weight*.8,0,Math.PI*2);ctx.fill();}
 // The orbit bends at the same point of contact as the particle surface.
 ctx.strokeStyle='rgba(96,125,151,.22)';ctx.lineWidth=.8;ctx.beginPath();
 for(let i=0;i<=160;i++){const a=i/160*Math.PI*2,ex=Math.cos(a)*size*1.22,ey=Math.sin(a)*size*.27,bx=w/2+ex*Math.cos(-.35)-ey*Math.sin(-.35),by=h/2+ex*Math.sin(-.35)+ey*Math.cos(-.35),bend=deform(bx,by);i?ctx.lineTo(bx+bend.x*.65,by+bend.y*.65):ctx.moveTo(bx+bend.x*.65,by+bend.y*.65);}
 ctx.closePath();ctx.stroke();};
 const tick=time=>{if(!visible||document.hidden||reduced.matches||time-last<1/30)return;last=time;mx+=(aimX-mx)*.06;my+=(aimY-my)*.06;burst*=.94;render(time);};
 const move=e=>{const r=button.getBoundingClientRect();pointerX=e.clientX-r.left;pointerY=e.clientY-r.top;aimX=pointerX/r.width-.5;aimY=pointerY/r.height-.5;if(e.pointerType==='touch'){touchUntil=performance.now()+1400;}else hover=true;};
 const scatter=()=>{if(!reduced.matches)burst=1.8;};const leave=()=>{aimX=aimY=0;hover=false;};
 const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;});observer.observe(button);
 const ro=new ResizeObserver(resize);ro.observe(button);resize();button.classList.add('sphere-ready');
 button.addEventListener('pointermove',move);button.addEventListener('pointerdown',move);button.addEventListener('pointerleave',leave);button.addEventListener('click',scatter);
 const preference=()=>render(0);reduced.addEventListener('change',preference);if(window.gsap)gsap.ticker.add(tick);
 window.addEventListener('pagehide',()=>{observer.disconnect();ro.disconnect();if(window.gsap)gsap.ticker.remove(tick);reduced.removeEventListener('change',preference);button.removeEventListener('pointermove',move);button.removeEventListener('pointerdown',move);button.removeEventListener('pointerleave',leave);button.removeEventListener('click',scatter);},{once:true});
};
