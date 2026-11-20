(function(){
"use strict";
const curated=[
["Princess Palace","castle"],["Unicorn Dream","unicorn"],["Mermaid Magic","mermaid"],["Fairy Garden","fairy"],["Sparkle Dress","dress"],["Royal Handbag","handbag"]
];
const themes=["Moonlit Castle","Crystal Crown","Starry Unicorn","Ocean Mermaid","Enchanted Fairy","Royal Gown","Magic Handbag","Cupcake Palace","Butterfly Garden","Dream Dragon","Rainbow Carousel","Swan Lake","Jewel Box","Flower Cottage","Moon Rabbit","Dolphin Cove","Puppy Picnic","Kitten Castle","Shooting Star","Candy Kingdom","Golden Tiara","Ice Cream Dream","Magic Wand","Cloud Kingdom","Rose Garden","Pearl Shell","Phoenix Feather","Fairy Door","Gingerbread House","Shooting Rocket","Turtle Lagoon","Sailboat Bay","Crystal Slipper","Heart Balloon","Baby Pegasus","Dragon Egg","Lily Pond","Sunflower House","Snowflake Queen","Magic Lantern","Bunny Tea Party","Star Princess","Coral Reef","Butterfly Wings","Panda Garden","Cherry Blossom","Comet Ride","Treasure Chest","Daisy Crown","Dreamy Swan","Rainbow Bridge","Moonlight Owl","Sweet Donut","Enchanted Forest"];
const endings=["Wonder","Dream","Parade","Garden","Adventure","Treasure","Fantasy","Celebration","Wonderland","Magic"];
const palettes=["#f6b8df","#bda4f4","#8ed8ed","#f7d77e","#a8dfb5","#f3a9a9","#c8b3ff","#f6c1a0","#a6d9d0","#d5b7eb"];
function rng(seed){let x=seed>>>0;return()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
function polygon(cx,cy,r,n,rot){const pts=[];for(let i=0;i<n;i++){const a=rot+i*Math.PI*2/n;pts.push([+(cx+Math.cos(a)*r).toFixed(1),+(cy+Math.sin(a)*r).toFixed(1)])}return"M"+pts.map(p=>p.join(",")).join(" L")+" Z"}
function heart(cx,cy,s){return `M ${cx} ${cy+s*.36} C ${cx-s*1.35} ${cy-s*.38}, ${cx-s*.9} ${cy-s*1.3}, ${cx} ${cy-s*.62} C ${cx+s*.9} ${cy-s*1.3}, ${cx+s*1.35} ${cy-s*.38}, ${cx} ${cy+s*.36} Z`}
function petal(cx,cy,rx,ry,rot){const x=rx,y=ry;return `M ${cx} ${cy} C ${cx-x*.95} ${cy-y*.55}, ${cx-x*.7} ${cy-y*1.4}, ${cx} ${cy-y*1.55} C ${cx+x*.7} ${cy-y*1.4}, ${cx+x*.95} ${cy-y*.55}, ${cx} ${cy} Z`}
function makeShapes(seed,kind){
 const r=rng(seed*7919+97),shapes=[];
 const add=(d,tag)=>{d=d.replace(/\\s+M\\s/g," Z M ");if(!/\\sZ\\s*$/i.test(d))d+=" Z";shapes.push({id:"r"+shapes.length,d,tag:tag||"region"})};
 const cx=250,cy=245,main=kind%12;
 if(main===0){add("M90 340 L90 190 L250 65 L410 190 L410 340 Z","castle");add("M145 190 V125 H205 V190 M295 190 V125 H355 V190");add("M215 340 V250 Q250 205 285 250 V340 Z")}
 else if(main===1){add("M250 70 C190 80 150 135 165 205 C180 270 225 300 250 350 C275 300 320 270 335 205 C350 135 310 80 250 70 Z","unicorn");add("M218 83 L250 15 L275 92 Z");add("M170 155 Q100 95 120 205 L175 225 M330 155 Q400 95 380 205 L325 225")}
 else if(main===2){add("M250 80 C185 130 190 215 250 250 C310 215 315 130 250 80 Z","shell");add("M250 245 C190 280 165 330 125 385 Q250 440 375 385 C335 330 310 280 250 245 Z","tail");add("M190 255 Q250 285 310 255")}
 else if(main===3){add("M250 90 C200 40 135 85 155 150 C90 180 130 260 200 250 C220 320 280 320 300 250 C370 260 410 180 345 150 C365 85 300 40 250 90 Z","fairy");add("M250 250 L210 390 L290 390 Z")}
 else if(main===4){add("M170 90 Q250 35 330 90 L370 340 Q250 410 130 340 Z","dress");add("M170 90 Q250 155 330 90 M130 340 Q250 295 370 340")}
 else if(main===5){add("M160 155 Q160 95 250 95 Q340 95 340 155 L355 355 Q250 395 145 355 Z","bag");add("M190 155 Q190 45 250 45 Q310 45 310 155")}
 else {const rad=70+r()*45;add(polygon(cx,cy,rad,5+Math.floor(r()*5),r()*Math.PI),"main");}
 // Main motif gets a unique inner medallion and orbiting closed regions.
 add(polygon(250,235,24+Math.floor(r()*18),5+Math.floor(r()*4),r()*6.28),"jewel");
 for(let i=0;i<8;i++){const a=i*Math.PI/4+(r()-.5)*.18,rr=145+r()*16,x=250+Math.cos(a)*rr,y=235+Math.sin(a)*rr,s=20+r()*13;let d;
  const type=(i+main)%4;
  if(type===0)d=heart(x,y,s);
  else if(type===1)d=polygon(x,y,s,5+Math.floor(r()*3),r()*6.28);
  else if(type===2)d=petal(x,y,s*.7,s*1.2,a);
  else d=`M ${x-s} ${y} A ${s} ${s} 0 1 0 ${x+s} ${y} A ${s} ${s} 0 1 0 ${x-s} ${y} Z`;
  add(d,"ornament");
 }
 for(let i=0;i<5;i++){const x=70+r()*360,y=55+r()*380,s=7+r()*9;add(polygon(x,y,s,4,Math.PI/4),"sparkle")}
 return shapes;
}
function generateCatalog(count){
 const total=Math.max(1,Math.min(512,Math.floor(count||512))),out=[];
 for(let i=0;i<total;i++){
  let title,kind;
  if(i<curated.length){title=curated[i][0];kind=i}
  else{const n=i-curated.length,theme=themes[n%themes.length],ending=endings[Math.floor(n/themes.length)%endings.length];title=theme+" "+ending;kind=n+6}
  out.push({id:i+1,title,shapes:makeShapes(i+1,kind),seed:i+1,previewPalette:palettes[i%palettes.length]});
 }
 return out;
}
window.generateCatalog=generateCatalog;
window.MuntahaCatalog=generateCatalog(512);
})();