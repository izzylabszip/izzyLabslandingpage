import * as THREE from './vendor/three.module.min.js';
import { clamp, ease, blend, phonePose, cameraDistance } from './care-motion.js';

function roundedShape(width,height,radius) {
  const x=-width/2,y=-height/2,s=new THREE.Shape();
  s.moveTo(x+radius,y);s.lineTo(x+width-radius,y);s.quadraticCurveTo(x+width,y,x+width,y+radius);
  s.lineTo(x+width,y+height-radius);s.quadraticCurveTo(x+width,y+height,x+width-radius,y+height);
  s.lineTo(x+radius,y+height);s.quadraticCurveTo(x,y+height,x,y+height-radius);
  s.lineTo(x,y+radius);s.quadraticCurveTo(x,y,x+radius,y);return s;
}

// CareNearby's pin with a real heart-shaped opening, not a flat decal.
export function createCareLogoGeometry(depth=.28,bevel=.045) {
  const pin=new THREE.Shape();pin.moveTo(0,-1.35);
  pin.bezierCurveTo(-.17,-1.2,-1.12,-.33,-1.12,.38);
  pin.bezierCurveTo(-1.12,1.78,1.12,1.78,1.12,.38);
  pin.bezierCurveTo(1.12,-.33,.17,-1.2,0,-1.35);
  const heart=new THREE.Path();heart.moveTo(0,-.38);
  heart.bezierCurveTo(-.14,-.23,-.58,.07,-.58,.42);
  heart.bezierCurveTo(-.58,.82,-.2,.95,0,.63);
  heart.bezierCurveTo(.2,.95,.58,.82,.58,.42);
  heart.bezierCurveTo(.58,.07,.14,-.23,0,-.38);
  pin.holes.push(heart);
  const geometry=new THREE.ExtrudeGeometry(pin,{depth,bevelEnabled:true,bevelSegments:5,steps:1,bevelSize:bevel,bevelThickness:bevel,curveSegments:36});
  geometry.translate(0,0,-depth/2);return geometry;
}

function environment(renderer) {
  const studio=new THREE.Scene();studio.background=new THREE.Color('#234b39');
  const panel=(w,h,x,y,z,color)=>{const m=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({color,side:THREE.DoubleSide}));m.position.set(x,y,z);m.lookAt(0,0,0);studio.add(m);};
  panel(3,8,-4,3,4,'#ffffff');panel(.8,7,4,1,2,'#c3ffe0');panel(7,2,0,5,-2,'#ffffff');panel(8,5,0,-2,-5,'#041b10');
  const pmrem=new THREE.PMREMGenerator(renderer),target=pmrem.fromScene(studio,.03);
  studio.traverse(o=>{o.geometry?.dispose();o.material?.dispose();});pmrem.dispose();return target;
}

function phone(texture,metal,renderer) {
  const group=new THREE.Group();
  texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=Math.min(4,renderer.capabilities.getMaxAnisotropy());
  const body=new THREE.ExtrudeGeometry(roundedShape(1.32,2.82,.16),{depth:.095,bevelEnabled:true,bevelSegments:4,steps:1,bevelSize:.026,bevelThickness:.025,curveSegments:18});body.translate(0,0,-.085);
  group.add(new THREE.Mesh(body,metal));
  const surface=new THREE.ShapeGeometry(roundedShape(1.245,2.696,.125),24);
  const pos=surface.attributes.position,uv=surface.attributes.uv;
  for(let n=0;n<pos.count;n++)uv.setXY(n,(pos.getX(n)+.6225)/1.245,(pos.getY(n)+1.348)/2.696);
  const screen=new THREE.Mesh(surface,new THREE.MeshBasicMaterial({map:texture,toneMapped:false}));screen.position.z=.05;group.add(screen);
  const button=new THREE.Mesh(new THREE.BoxGeometry(.025,.3,.045),metal);button.position.set(.68,.4,-.03);group.add(button);
  return group;
}

export function initCareModels() {
  const reduced=matchMedia('(prefers-reduced-motion: reduce)'),controllers=[];
  const casePage=document.querySelector('#work-carenearby');
  async function mount(host) {
    if(host.dataset.mounted)return;host.dataset.mounted='loading';
    const hero=host.dataset.care3d==='hero',story=host.closest('.care-device-story');
    let renderer;
    try {renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});}
    catch {host.dataset.mounted='fallback';return;}
    const canvas=renderer.domElement;canvas.className='care-3d-canvas';canvas.setAttribute('role','img');
    canvas.setAttribute('aria-label',hero?'Three-dimensional CareNearby pin-heart emblem in polished silver and emerald.':'CareNearby app screens opening into a three-phone composition as you scroll.');
    renderer.setPixelRatio(Math.min(devicePixelRatio,innerWidth<780?1.5:1.75));renderer.setClearColor(0,0);
    renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.25;
    host.append(canvas);
    const scene=new THREE.Scene(),env=environment(renderer);scene.environment=env.texture;
    const camera=new THREE.PerspectiveCamera(40,1,.1,80);
    const rig=new THREE.Group();scene.add(rig);
    const hemi=new THREE.HemisphereLight('#edfff5','#05301b',2);scene.add(hemi);
    const key=new THREE.DirectionalLight('#ffffff',4);key.position.set(-3,4,5);scene.add(key);
    const rim=new THREE.DirectionalLight('#6bffc0',3);rim.position.set(4,2,-1);scene.add(rim);
    const metal=new THREE.MeshPhysicalMaterial({color:'#e2e9e5',metalness:.92,roughness:.19,clearcoat:1,clearcoatRoughness:.1});
    const glass=new THREE.MeshPhysicalMaterial({color:'#03905d',metalness:.4,roughness:.12,clearcoat:1,transmission:.28,thickness:.7,ior:1.48});
    let emblem=null,phones=[],rings=[];
    if(hero) {
      emblem=new THREE.Group();
      emblem.add(new THREE.Mesh(createCareLogoGeometry(),[metal,glass]));rig.add(emblem);
      [1.45,1.9,2.4].forEach((radius,i)=>{
        const ring=new THREE.Mesh(new THREE.TorusGeometry(radius,.012,8,128),new THREE.MeshPhysicalMaterial({color:'#61dba2',metalness:.65,roughness:.2,transparent:true,opacity:.48-i*.09}));
        ring.rotation.x=-Math.PI/2;ring.position.set(.25,-1.48,-.2);scene.add(ring);rings.push(ring);
      });
      const floor=new THREE.Mesh(new THREE.CircleGeometry(8,64),new THREE.MeshPhysicalMaterial({color:'#003621',metalness:.65,roughness:.32,transparent:true,opacity:.62}));
      floor.rotation.x=-Math.PI/2;floor.position.y=-1.51;scene.add(floor);
    } else {
      try {
        const textures=await Promise.all(['services','home','caregivers'].map(name=>new THREE.TextureLoader().loadAsync('/studio/assets/carenearby/'+name+'.jpeg')));
        phones=textures.map(texture=>{const mesh=phone(texture,metal,renderer);rig.add(mesh);return mesh;});
      } catch {canvas.remove();env.dispose();renderer.dispose();host.dataset.mounted='fallback';return;}
    }
    let raf=0,visible=false,last=0,time=0,progress=0,targetProgress=0,distance=7,compact=false,lost=false;
    const caption=host.querySelector('[data-care-scene-step]'),title=host.querySelector('[data-care-scene-title]');
    let lastBeat=-1;
    function measureProgress() {
      if(!story)return;
      const rect=story.getBoundingClientRect();
      targetProgress=clamp(-rect.top/Math.max(1,rect.height-host.clientHeight));
    }
    function pose(dt=0) {
      const t=reduced.matches?0:time;
      progress=reduced.matches?1:blend(progress,targetProgress,1-Math.exp(-dt*9));
      if(hero) {
        const intro=reduced.matches?1:ease(time/2.4);
        emblem.position.set(.24,.04,0);
        emblem.rotation.set(-.02,blend(-.48,-.17,intro)+Math.sin(t*.22)*.09,0);
        camera.position.set(.12*Math.sin(t*.13),.28,distance+blend(.6,0,intro));camera.lookAt(.15,-.03,0);
        rings.forEach((ring,i)=>{ring.material.opacity=.3+Math.sin(t*.65-i*.8)*.09;});
      } else {
        phones.forEach((mesh,i)=>{const p=phonePose(i,progress,compact);mesh.position.set(p.x,p.y,p.z);mesh.rotation.set(p.rx,p.ry,p.rz);});
        rig.rotation.set(0,blend(-.13,.08,ease(progress)),0);
        rig.position.y=compact?.14:.10;
        camera.position.set(blend(-.12,.15,ease(progress)),.14,distance+blend(.35,0,ease(progress)));camera.lookAt(0,0,0);
        const beat=progress<.26?0:progress<.72?1:2;
        if(beat!==lastBeat){lastBeat=beat;caption.textContent=['01 / A familiar welcome','02 / Find your support','03 / Bring care closer'][beat];title.textContent=['Care starts here.','More choice. Less searching.','A connection that matters.'][beat];}
        host.style.setProperty('--care-progress',String(Math.max(.02,progress)));
      }
      key.position.x=-3+Math.sin(t*.25)*1.6;rim.position.z=1+Math.cos(t*.22)*2;
      scene.environmentRotation.y=Math.sin(t*.18)*.18;
      renderer.render(scene,camera);
    }
    function blocked(){return lost||document.hidden||casePage.hidden||document.body.classList.contains('has-overlay')||document.body.classList.contains('care-transitioning');}
    function frame(now){raf=0;if(!visible||blocked())return;const dt=last?Math.min((now-last)/1000,.05):1/60;last=now;if(!reduced.matches)time+=dt;pose(dt);if(!reduced.matches)raf=requestAnimationFrame(frame);}
    function wake(){cancelAnimationFrame(raf);raf=0;last=0;if(visible&&!blocked())raf=requestAnimationFrame(frame);}
    function resize(){const w=host.clientWidth,h=host.clientHeight;if(!w||!h)return;compact=w<780;renderer.setSize(w,h,false);camera.aspect=w/h;distance=cameraDistance(camera.aspect,hero,compact);camera.updateProjectionMatrix();measureProgress();pose(1);wake();}
    new ResizeObserver(resize).observe(host);
    new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;measureProgress();wake();},{threshold:.01}).observe(host);
    canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();lost=true;cancelAnimationFrame(raf);host.classList.remove('care-webgl-ready');host.dataset.mounted='fallback';});
    controllers.push({wake,scroll:measureProgress,reduce(){progress=targetProgress;resize();}});
    resize();host.classList.add('care-webgl-ready');host.dataset.mounted='ready';
  }
  const lazy=new IntersectionObserver(entries=>entries.forEach(entry=>{
    if(!entry.isIntersecting)return;
    mount(entry.target).catch(()=>{entry.target.dataset.mounted='fallback';entry.target.classList.remove('care-webgl-ready');});lazy.unobserve(entry.target);
  }),{rootMargin:'240px'});
  document.querySelectorAll('[data-care-3d]').forEach(host=>lazy.observe(host));
  document.addEventListener('contentroutechange',()=>controllers.forEach(c=>c.wake()));
  document.addEventListener('visibilitychange',()=>controllers.forEach(c=>c.wake()));
  new MutationObserver(()=>controllers.forEach(c=>c.wake())).observe(document.body,{attributes:true,attributeFilter:['class']});
  reduced.addEventListener('change',()=>controllers.forEach(c=>c.reduce()));
  window.addEventListener('scroll',()=>controllers.forEach(c=>c.scroll()),{passive:true});
}
