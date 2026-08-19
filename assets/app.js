(()=>{
const safe='https://images.pexels.com/photos/8613091/pexels-photo-8613091.jpeg?auto=compress&cs=tinysrgb&w=1600';
const map={
"kindergarten-circle.jpg":"https://images.pexels.com/photos/8422248/pexels-photo-8422248.jpeg?auto=compress&cs=tinysrgb&w=1600",
"school-exhibition.jpg":safe,
"graduation-caps.jpg":"https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600",
"campus-life.jpg":"https://images.pexels.com/photos/7972544/pexels-photo-7972544.jpeg?auto=compress&cs=tinysrgb&w=1600",
"kindergarten-story.jpg":safe,
"university-group.jpg":"https://images.pexels.com/photos/6147161/pexels-photo-6147161.jpeg?auto=compress&cs=tinysrgb&w=1600",
"school-event.jpg":"https://images.pexels.com/photos/37909368/pexels-photo-37909368.jpeg?auto=compress&cs=tinysrgb&w=1600"
};
document.querySelectorAll('img').forEach(img=>{const n=(img.getAttribute('src')||'').split('/').pop();if(map[n])img.src=map[n]});
document.querySelectorAll('[data-preview]').forEach(el=>{const n=(el.dataset.preview||'').split('/').pop();if(map[n])el.dataset.preview=map[n]});
const base=location.pathname.includes('/projects/')?'../assets/':'assets/';
const main=document.createElement('script');main.src=base+'app-published.js';main.onload=()=>{const v=document.createElement('script');v.src=base+'v42.js';document.body.appendChild(v)};document.body.appendChild(main);
})();
