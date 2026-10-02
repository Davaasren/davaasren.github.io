/* Explicit URL choice wins; remember it across portfolio pages and visits. */
window.portfolioLanguage=(()=>{const requested=new URLSearchParams(location.search).get('lang');let saved;try{saved=localStorage.getItem('portfolio-language');}catch{}return ['en','mn'].includes(requested)?requested:saved==='mn'?'mn':'en';})();
document.documentElement.lang=window.portfolioLanguage;
try{localStorage.setItem('portfolio-language',window.portfolioLanguage);}catch{}
window.applyPortfolioLanguage=function(){
 const mn=window.portfolioLanguage==='mn';
 const dictionary={
 'Davaasuren Batsuuri':'Батсуурь Даваасүрэн','Help,':'Тусламж,','in Teams.':'Teams дотор.','System':'Системийн','studies.':'судалгаа.','Skip to content':'Агуулга руу алгасах','Work':'Төслүүд','About':'Тухай','Lab':'Туршилт','Contact':'Холбоо','Download CV ↗':'CV татах ↗','CV ↗':'CV ↗',
 'PORTFOLIO / CV':'БҮТЭЭЛҮҮД / CV','Computer Science graduate.':'Компьютерын ухааны төгсөгч.','ULAANBAATAR, MN':'УЛААНБААТАР, МОНГОЛ','01 / PORTFOLIO':'01 / БҮТЭЭЛҮҮД','AVAILABLE FOR WORK':'АЖЛЫН САНАЛД НЭЭЛТТЭЙ','SELECTED WORK':'ОНЦЛОХ ТӨСЛҮҮД',
 '01 / A DIRECTION, IN PROGRESS':'01 / ХӨГЖИЖ БУЙ ЧИГЛЭЛ','01 / FOUNDATION → DIRECTION':'01 / СУУРЬ → ЧИГЛЭЛ','COMPUTER':'КОМПЬЮТЕРЫН','SCIENCE':'УХААН','ALGORITHM':'АЛГОРИТМ','LOGIC':'ЛОГИК','PROGRAMMING':'ПРОГРАМЧЛАЛ','A TECHNICAL FOUNDATION.':'ТЕХНИКИЙН СУУРЬ.','A MORE HUMAN DIRECTION.':'ХҮНД ЧИГЛЭСЭН ХАНДЛАГА.','COMPUTER SCIENCE':'КОМПЬЮТЕРЫН УХААН',
 'THE FOUNDATION':'МИНИЙ СУУРЬ','THE DIRECTION':'МИНИЙ ЧИГЛЭЛ','Technical roots.':'Техникийн суурь.','Human curiosity.':'Хүнийг ойлгох сониуч зан.','How it looks.':'Хэрхэн харагдах.','How it behaves.':'Хэрхэн ажиллах.','How it meets people.':'Хүнд хэрхэн хүрэх.',
 'I’m Davaa / Б. Даваасүрэн, a Computer Science graduate from the National University of Mongolia.':'Намайг Батсуурийн Даваасүрэн гэдэг. Би Монгол Улсын Их Сургуулийг компьютерын ухааны чиглэлээр төгссөн.',
 'My foundation is technical. My curiosity is increasingly human.':'Миний суурь мэдлэг техникийнх. Харин сонирхол минь хүнийг ойлгоход улам чиглэж байна.',
 'University projects, personal platforms and professional experience have shaped my interest in digital experiences.':'Их сургуулийн төслүүд, хувийн платформууд болон ажлын туршлага минь цахим орчин дахь хүний туршлагыг сонирхох эхлэл болсон.',
 '02 / PERSONAL PROJECTS & PROFESSIONAL EXPERIENCE':'02 / ХУВИЙН ТӨСЛҮҮД БА АЖЛЫН ТУРШЛАГА','INTERACTION — EXPERIENCE — TECHNOLOGY — DESIGN':'ХАРИЛЦАН ҮЙЛЧЛЭЛ — ТУРШЛАГА — ТЕХНОЛОГИ — ДИЗАЙН',
 '03 / EXPERIENCE':'03 / АЖЛЫН ТУРШЛАГА','EDUCATION':'БОЛОВСРОЛ','04 / WHAT I BRING & WHERE I’M GOING':'04 / ЧАДВАР БА ХӨГЖЛИЙН ЧИГЛЭЛ','Foundation':'Суурь мэдлэг','Technology':'Технологи','Exploring':'Судалж буй чиглэл','Areas I’m developing, rather than professional expertise.':'Эдгээр нь миний цаашид хөгжүүлж буй чиглэлүүд.',
 '05 / THE PLAYGROUND':'05 / ТУРШИЛТЫН ТАЛБАР','A space to try, learn, repeat.':'Турших, суралцах, дахин оролдох орон зай.','001 — SILVER ORBIT':'001 — МӨНГӨЛӨГ ОРБИТ','MOVE TO BEND · TAP TO SCATTER':'КУРСОРООР ХӨДӨЛГӨ · ТОВШИЖ ТАРАА','A small world of particles. Bring it to life.':'Жижиг хэсгүүдийн ертөнц. Хөдөлгөөнд оруулаарай.','CLICK · TAP · ENTER':'ДАР · ТОВШ · ENTER',
 '06 / WHAT’S NEXT?':'06 / ДАРААГИЙН АЛХАМ','THE PRACTICAL VERSION':'ТОВЧ НАМТАР','Download CV — PDF coming soon.':'CV татах — PDF удахгүй нэмэгдэнэ.','Back to top ↑':'Дээш буцах ↑','ROLE':'ҮҮРЭГ','Visit website ↗':'Вебсайт үзэх ↗','ILLUSTRATIVE ARTWORK · MOVE OR TAP TO REVEAL':'ДҮРСЛЭЛ · КУРСОР ЭСВЭЛ ТОВШИЛТООР ХАРАХ','PROJECT IMAGERY TO COME':'ТӨСЛИЙН ЗУРАГ УДАХГҮЙ','← Selected work':'← Төслүүд рүү буцах','Context':'Нөхцөл','Problem':'Асуудал','Solution':'Шийдэл','My role':'Миний үүрэг','Davaa / Home':'Даваасүрэн / Нүүр','Get in touch ↗':'Холбоо барих ↗',
 'This page will develop into a fuller case study as supporting material is added.':'Нэмэлт материал оруулахын хэрээр энэ хуудсыг дэлгэрэнгүй танилцуулга болгон хөгжүүлнэ.'
 };
 if(mn){
 const set=(selector,html)=>{const el=document.querySelector(selector);if(el)el.innerHTML=html;};
 set('.story>h2','Хэрхэн <em>ажиллахаас.</em><br>Ямар <em>мэдрэмж төрүүлэх рүү.</em>');
 set('#work>.section-title','Миний оролцсон<br><em>бүтээлүүд.</em>');
 set('#experience>.section-title','Өөр өөр орчин.<br><em>Илүү өргөн хараа.</em>');
 set('#lab>.section-title','Сониуч зандаа<br><em>зай гаргая.</em>');
 set('.contact>h2','Сонирхолтой<br><em>ажлын саналд</em><br>нээлттэй<span class="contact-star" aria-hidden="true">✳</span>');
 set('.about-copy article:nth-child(2) p:last-child','Мэддэг зүйлдээ тулгуурлан <strong>харилцан үйлчлэл, дизайн, бүтээлч технологийг</strong> судалж байна.');
 const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);const nodes=[];while(walker.nextNode())nodes.push(walker.currentNode);
 nodes.forEach(node=>{if(node.parentElement.closest('script,style,.hero-name,.hero-echo'))return;const key=node.textContent.trim();if(dictionary[key])node.textContent=node.textContent.replace(key,dictionary[key]);else if(key.endsWith('This page will develop into a fuller case study as supporting material is added.'))node.textContent=node.textContent.replace('This page will develop into a fuller case study as supporting material is added.',dictionary['This page will develop into a fuller case study as supporting material is added.']);else if(key.startsWith('Visit ')&&key.endsWith(' ↗'))node.textContent=key.replace('Visit ','Үзэх: ');});
 document.title=document.querySelector('#project-detail h1')?`${document.querySelector('#project-detail h1').textContent} — Даваасүрэн`:'Даваасүрэн — Бүтээлүүд';
 const sphere=document.querySelector('.particle-sphere');if(sphere)sphere.setAttribute('aria-label','Мөнгөлөг бөмбөлгийн хэсгүүдийг тараах');
 document.querySelectorAll('.project-stage,.project-link').forEach(el=>{const title=el.closest('.project')?.querySelector('h3')?.textContent;if(title)el.setAttribute('aria-label',`${title} төслийн тухай`);});
 document.querySelector('nav')?.setAttribute('aria-label','Үндсэн цэс');
 }
 const nav=document.querySelector('.nav');if(nav){const switcher=document.createElement('div');switcher.className='language-switch';switcher.setAttribute('role','group');switcher.setAttribute('aria-label',mn?'Хэл сонгох':'Choose language');['en','mn'].forEach(lang=>{const button=document.createElement('button');button.type='button';button.textContent=lang.toUpperCase();button.lang=lang;button.setAttribute('aria-pressed',String(lang===window.portfolioLanguage));button.addEventListener('click',()=>{const url=new URL(location.href);url.searchParams.set('lang',lang);location.assign(url.href);});switcher.append(button);});nav.append(switcher);}
 document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(!href.startsWith('/')&&!href.startsWith('#'))return;const url=new URL(href,location.href);url.searchParams.set('lang',window.portfolioLanguage);a.href=url.pathname+url.search+url.hash;});
};
