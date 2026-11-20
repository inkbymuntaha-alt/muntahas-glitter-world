(function(){
"use strict";
const openings=[
"Yay Muntaha!","Woohoo, Muntaha!","Bravo, superstar!","Hooray, Muntaha!","Amazing work, artist!","You did it, Muntaha!","Super-duper job!","Wow, look at you!","Fantastic colouring!","Hip-hip-hooray!","Muntaha, you're shining!","What a brilliant artist!","Give yourself a cheer!","Oh wow, wonderful!","That is magnificent!","You are a colour champion!","Sparkle power, Muntaha!","A big hooray for you!","Incredible work, superstar!","Muntaha, that's dazzling!","Three cheers for you!","You make art magical!","Brilliant job, little creator!","Look at that masterpiece!"
];
const endings=[
"Your colours are bursting with joy!","Every little detail is full of magic!","Those colours make the page shine!","You brought this picture to life!","Your imagination is out of this world!","That masterpiece deserves a big clap!","You are growing into an amazing artist!","Your creative sparkle is unstoppable!","Every colour choice is wonderful!","That is a super special creation!","Keep creating and keep shining bright!","Your artwork makes everyone smile!"
];
const lines=[];
for(const a of openings)for(const b of endings)lines.push(a+" "+b);
const unique=[...new Set(lines)];
if(unique.length<220)throw new Error("Praise library must contain at least 220 unique lines");
const KEY="muntahaPraiseRecentV1";
function readRecent(){try{const v=JSON.parse(localStorage.getItem(KEY)||"[]");return Array.isArray(v)?v.filter(n=>Number.isInteger(n)&&n>=0&&n<unique.length).slice(-40):[]}catch(e){return[]}}
function nextPraise(){let recent=readRecent(),available=unique.map((_,i)=>i).filter(i=>!recent.includes(i));if(!available.length){recent=[];available=unique.map((_,i)=>i)}const index=available[Math.floor(Math.random()*available.length)];recent.push(index);try{localStorage.setItem(KEY,JSON.stringify(recent.slice(-40)))}catch(e){}return {index,text:unique[index]}}
window.MuntahaPraises={lines:unique,next:nextPraise,queueSize:40};
})();