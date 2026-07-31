  // ---- envelope open ----
  document.getElementById('envelope-screen').addEventListener('click', () => {
    document.getElementById('envelope-screen').classList.add('hidden');
    showScreen('hero-screen');
  });

  function showScreen(id){
    document.querySelectorAll('#app > section').forEach(s => {
      if(s.id !== 'envelope-screen') s.classList.add('hidden');
    });
    const el = document.getElementById(id);
    el.classList.remove('hidden');
    el.classList.remove('fade-in'); void el.offsetWidth; el.classList.add('fade-in');
    window.scrollTo({top:0, behavior:'smooth'});
  }

  // ---- moments carousel ----
  const slides = [
    { emoji:'🌷', caption:"picked just for you, on an ordinary Tuesday.", image:null },
    { emoji:'🧸', caption:"every quiet moment with you is my favourite kind.", image:null },
    { emoji:'🌹', caption:"I'd choose this — us, exactly like this — every time.", image:null }
  ];
  let slideIndex = 0;

  function renderSlide(){
    const content = document.getElementById('slide-emoji');
    const frame = document.getElementById('slide-frame');
    const current = slides[slideIndex];
    if(current.image){
      content.innerHTML = '<img src="'+current.image+'" alt="">';
      frame.classList.add('has-image');
    } else {
      content.textContent = current.emoji;
      frame.classList.remove('has-image');
    }
    document.getElementById('slide-caption').textContent = current.caption;
    document.getElementById('slide-count').textContent =
      String(slideIndex+1).padStart(2,'0') + ' / ' + String(slides.length).padStart(2,'0');
    document.querySelectorAll('#slide-dots > div').forEach((d,i)=>{
      d.classList.toggle('active', i===slideIndex);
    });
  }

  // ---- generic photo upload ----
  function handleUpload(event, targetId){
    const file = event.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      const el = document.getElementById(targetId);
      el.innerHTML = '<img src="'+e.target.result+'" alt="">';
      el.closest('.upload-slot').classList.add('has-image');
    };
    reader.readAsDataURL(file);
  }

  // ---- carousel photo upload (stored per slide) ----
  function handleSlideUpload(event){
    const file = event.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = e => {
      slides[slideIndex].image = e.target.result;
      renderSlide();
    };
    reader.readAsDataURL(file);
  }

  function moveSlide(dir){
    slideIndex = (slideIndex + dir + slides.length) % slides.length;
    renderSlide();
  }

  function buildDots(){
    const wrap = document.getElementById('slide-dots');
    wrap.innerHTML = '';
    slides.forEach((s,i)=>{
      const d = document.createElement('div');
      d.textContent = s.emoji;
      d.addEventListener('click', ()=>{ slideIndex = i; renderSlide(); });
      wrap.appendChild(d);
    });
    renderSlide();
  }
  buildDots();

  // ---- fake play button ----
  document.querySelector('.player button').addEventListener('click', function(){
    this.textContent = this.textContent === '▶' ? '❚❚' : '▶';
  });
