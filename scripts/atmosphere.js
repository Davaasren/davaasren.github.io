/* Original silver field. Shares the existing GSAP clock and sleeps offscreen. */
window.startAtmosphere = function(gsap){
 const canvas=document.createElement('canvas');canvas.className='silver-field';canvas.setAttribute('aria-hidden','true');document.body.prepend(canvas);
 const ctx=canvas.getContext('2d');if(!ctx){canvas.remove();return ()=>{};}
 const phone=matchMedia('(pointer: coarse), (max-width:800px)').matches;
 let w=0,h=0,dpr=1,last=0,px=-1000,py=-1000,tx=-1000,ty=-1000,active=false;
 const lab=document.querySelector('#lab'),ripples=[];
 const resize=()=>{w=innerWidth;h=innerHeight;dpr=phone?1:Math.min(devicePixelRatio||1,1.5);canvas.width=w*dpr;canvas.height=h*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);};
 const move=e=>{tx=e.clientX;ty=e.clientY;if(!active){px=tx;py=ty;}active=true;};
 const leave=()=>{active=false;};
 const tap=e=>{move(e);if(e.target.closest('a,button'))return;ripples.push({x:e.clientX,y:e.clientY,birth:performance.now()/1000});if(ripples.length>5)ripples.shift();};
 const draw=time=>{
  if(document.hidden||time-last<1/(phone?20:30))return;last=time;
  px+=(tx-px)*.13;py+=(ty-py)*.13;
  const r=lab?.getBoundingClientRect(),play=r&&r.top<h&&r.bottom>0;
  ctx.clearRect(0,0,w,h);
  // Sparse dots: orbit away from the pointer, then settle back into their field.
  const gap=w<600?56:64,shift=(scrollY*.055)%gap;
  for(let x=24;x<w;x+=gap)for(let y=-gap;y<h+gap;y+=gap){
   const bx=x+Math.sin(y*.008+time*.18)*5,by=y-shift,dx=bx-px,dy=by-py,dist=Math.hypot(dx,dy),force=active?Math.max(0,1-dist/180):0;
   const spread=force*(play?38:20),angle=Math.atan2(dy,dx);
   const xx=bx+Math.cos(angle+force*.7)*spread,yy=by+Math.sin(angle+force*.7)*spread;
   ctx.fillStyle=`rgba(96,125,151,${.18+force*.22})`;ctx.beginPath();ctx.arc(xx,yy,force>0?1+force*1.1:.85,0,Math.PI*2);ctx.fill();
  }
  // Engraved contour islands: asymmetrical linework in the dot palette.
  const drift=Math.sin(time*.12)*8,parallax=Math.sin(scrollY*.0007)*24;
  const island=(cx,cy,size,rotation,count)=>{
   ctx.save();ctx.translate(cx,cy);ctx.rotate(rotation);ctx.strokeStyle='rgba(96,125,151,.19)';ctx.lineWidth=.8;
   for(let ring=0;ring<count;ring++){
    const radius=size*(.26+ring*.035);ctx.beginPath();
    for(let step=0;step<=(phone?60:120);step++){
     const a=step/(phone?60:120)*Math.PI*2;
     const fold=1+.15*Math.sin(a*3+ring*.065)+.085*Math.cos(a*5-ring*.04);
     const x=Math.cos(a)*radius*fold,y=Math.sin(a)*radius*fold*.68;
     step?ctx.lineTo(x,y):ctx.moveTo(x,y);
    }
    ctx.closePath();ctx.stroke();
   }
   ctx.restore();
  };
  island(w*.075,h*.20+parallax,Math.min(w*.25,290),-.4+drift*.001,phone?8:22);
  island(w*.94,h*.83-parallax,Math.min(w*.31,365),.65-drift*.001,phone?9:26);
  // Offset orbital arcs balance the organic contours with a precise shape.
  ctx.save();ctx.translate(w*.70,h*.06+drift);ctx.rotate(-.35);
  ctx.strokeStyle='rgba(96,125,151,.16)';ctx.lineWidth=.8;
  for(let n=0;n<(phone?6:12);n++){ctx.beginPath();ctx.ellipse(0,0,100+n*13,55+n*7,0,.12,Math.PI*1.8);ctx.stroke();}
  ctx.restore();
  // Fine, slowly breathing contours sit around the edges of the white canvas.
  for(let j=0;j<6;j++){
   ctx.beginPath();for(let y=-20;y<h+20;y+=12){const bend=Math.sin(y*.005+time*.16+j*.17)*42;const x=w*.88+j*22+bend+(active?Math.sin(y*.003+py*.002)*8:0);y===-20?ctx.moveTo(x,y):ctx.lineTo(x,y);}
   ctx.strokeStyle=`rgba(96,125,151,${play?.18:.1})`;ctx.lineWidth=.7;ctx.stroke();
  }
  // A quiet light pool follows the pointer without tinting the page itself.
  if(active){const glow=ctx.createRadialGradient(px,py,0,px,py,190);glow.addColorStop(0,'rgba(152,190,222,.085)');glow.addColorStop(1,'rgba(152,190,222,0)');ctx.fillStyle=glow;ctx.fillRect(px-190,py-190,380,380);}
  for(let i=ripples.length-1;i>=0;i--){const p=ripples[i],age=performance.now()/1000-p.birth;if(age>1.8){ripples.splice(i,1);continue;}ctx.beginPath();ctx.arc(p.x,p.y,12+age*110,0,Math.PI*2);ctx.strokeStyle=`rgba(97,146,182,${(1-age/1.8)*.3})`;ctx.lineWidth=1;ctx.stroke();}
 };
 resize();window.addEventListener('resize',resize);document.addEventListener('pointermove',move,{passive:true});document.documentElement.addEventListener('pointerleave',leave);document.addEventListener('pointerdown',tap,{passive:true});gsap.ticker.add(draw);
 document.body.classList.add('has-atmosphere');
 return ()=>{gsap.ticker.remove(draw);window.removeEventListener('resize',resize);document.removeEventListener('pointermove',move);document.documentElement.removeEventListener('pointerleave',leave);document.removeEventListener('pointerdown',tap);canvas.remove();document.body.classList.remove('has-atmosphere');};
};
