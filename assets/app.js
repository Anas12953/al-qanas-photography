(()=>{
  const map={
    "assets/kindergarten-circle.jpg":"https://images.pexels.com/photos/8422248/pexels-photo-8422248.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "assets/kindergarten-story.jpg":"https://images.pexels.com/photos/8613091/pexels-photo-8613091.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "assets/school-event.jpg":"https://images.pexels.com/photos/37909368/pexels-photo-37909368.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "assets/graduation-caps.jpg":"https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1800",
    "assets/school-exhibition.jpg":"https://images.pexels.com/photos/8613091/pexels-photo-8613091.jpeg?auto=compress&cs=tinysrgb&w=1800"
  };
  document.querySelectorAll("img").forEach(img=>{
    const src=img.getAttribute("src");
    if(map[src]) img.src=map[src];
  });
  const s=document.createElement("script");
  s.src="assets/app-core.js?v=5.0.2";
  s.defer=false;
  document.body.appendChild(s);
})();