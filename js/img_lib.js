let img_forward=(src, iname)=>{
  var num = Number(iname.name);
  if((src.length-1) > num ){num++;}
  else {num=0;}
  iname.src=src[num];
  iname.name=num;
  return num;
}
let img_backward=(src, iname)=>{
  var num = Number(iname.name);
  if(num != 0 ){num--;}
  else {num=(src.length-1);}
  iname.src=src[num];
  iname.name=num;
  return num;
}
let img_forward2=(src, iname)=>{
  var num = Number(iname.name);
  if((src.length-2) > num ){num = num+2;}
  iname.src=src[num];
  iname.name=num;
  return num;
}
let img_backward2=(src, iname)=>{
  var num = Number(iname.name);
  if(num > 1 ){num = num-2;}
  iname.src=src[num];
  iname.name=num;
  return num;
}
let img_same=(src, iname, num)=>{
  if(typeof num == 'undefined') {num = Number(iname.name);}
  iname.src=src[num];
  iname.name=num;
  return num;
}
let img_reset=(src, iname)=>{
  var num = 0;
  iname.src=src[num];
  iname.name=num;
}
let img_random=(src, iname)=>{
  var num = getRandomInt(src.length);
  iname.src=src[num];
  iname.name=num;
  return num;
}
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let img_opacity=(opa, iname)=>{
  iname.style.opacity = opa;
}