let img_index = 0;
const serifu_describe = () => {
  document.getElementById(`scene-now`).innerText = img_index;
  for (let j = 0;  j < element_num; j++){
    setSerifu(j);
  }
}
const num_backward = () => {
  img_backward(CG_src, document.getElementById('main_img'));
  img_index = Number(document.getElementById('main_img').name);
  img_w = document.getElementById("main_img").clientWidth;
  document.getElementById("form_area").style.left = img_w + 30;
  serifu_describe();
}
const num_forward = () => {
  img_forward(CG_src, document.getElementById('main_img'));
  img_index = Number(document.getElementById('main_img').name);
  img_w = document.getElementById("main_img").clientWidth;
  document.getElementById("form_area").style.left = img_w + 30;
  serifu_describe();
}
const num_random = () => {
  img_index = getRandomInt(CG_src.length);
  img_same(CG_src, document.getElementById('main_img'), img_index);
  img_w = document.getElementById("main_img").clientWidth;
  document.getElementById("form_area").style.left = img_w + 30;
  serifu_describe();
}
const num_set = () => {
  img_index = document.getElementById(`scene-select`).value;
  img_same(CG_src, document.getElementById('main_img'), img_index);
  img_w = document.getElementById("main_img").clientWidth;
  document.getElementById("form_area").style.left = img_w + 30;
  serifu_describe();
}

const handleDownload = () => {
  let data_csv="";//ここに文字データとして値を格納していく
  console.log('talk_txt.length', talk_txt.length)
  for(let i = 0; i < talk_txt.length; i++){
    if (talk_txt[i].length) {
      for (let j = 0; j < element_num; j++){
        data_csv += `talk_x[${i}].push('${talk_x[i][j]}');\n`;
        data_csv += `talk_y[${i}].push('${talk_y[i][j]}');\n`;
        data_csv += `talk_txt[${i}].push('${talk_txt[i][j].replaceAll('\n', '\\n')}');\n`;
      }
    }
  }
  const blob = new Blob([data_csv]);
  //document.getElementById("download").href = window.URL.createObjectURL(blob);
  //a要素を生成
  let element = document.createElement('a');
  //a要素のhref属性を設定
  element.href = window.URL.createObjectURL(blob);
  //a要素のdownload属性を設定
  element.download = 'innertext.js';
  //a要素のtarget属性を設定
  element.target = '_blank';
  //a要素のクリック実行
  element.click();
  sessionStorage.removeItem('talk_x')
  sessionStorage.removeItem('talk_y')
  sessionStorage.removeItem('talk_txt')
  delete data_csv;
}

//一時保存データ読み出し
const loadSessionStorage = () => {
  if (sessionStorage.getItem('talk_x')) {
    JSON.parse(sessionStorage.getItem('talk_x')).forEach((scene_element, i) => {
      talk_x[i]=scene_element;
    });
  }
  if (sessionStorage.getItem('talk_y')) {
    JSON.parse(sessionStorage.getItem('talk_y')).forEach((scene_element, i) => {
      talk_y[i]=scene_element;
    });
  }
  if (sessionStorage.getItem('talk_txt')) {
    JSON.parse(sessionStorage.getItem('talk_txt')).forEach((scene_element, i) => {
      talk_txt[i]=scene_element;
    });
  }
}
loadSessionStorage();

const setSerifu = (i) => {
  document.getElementById(`left${i}`).value = talk_x[img_index][i] ? talk_x[img_index][i] : 0;
  document.getElementById(`top${i}`).value = talk_y[img_index][i] ? talk_y[img_index][i] : 0;
  document.getElementById(`inputtext${i}`).value = talk_txt[img_index][i] ? talk_txt[img_index][i] : null;
  document.getElementById(`serifu${i}`).style.left = talk_x[img_index][i] * img_w / 100;
  document.getElementById(`serifu${i}`).style.top = talk_y[img_index][i] * window_h / 100;
  document.getElementById(`serifu${i}`).innerText = talk_txt[img_index][i] ? talk_txt[img_index][i] : null;
  document.getElementById(`serifu${i}`).style.opacity = talk_txt[img_index][i] ? 1 : 0;
}

const updateSerifu = (i) => {
  talk_x[img_index][i] = document.getElementById(`left${i}`).value;
  talk_y[img_index][i] = document.getElementById(`top${i}`).value;
  talk_txt[img_index][i] = document.getElementById(`inputtext${i}`).value;
  document.getElementById(`serifu${i}`).style.left = talk_x[img_index][i] * img_w / 100;
  document.getElementById(`serifu${i}`).style.top = talk_y[img_index][i] * window_h / 100;
  document.getElementById(`serifu${i}`).innerText = talk_txt[img_index][i];
  document.getElementById(`serifu${i}`).style.opacity = talk_txt[img_index][i] ? 1 : 0;
}

const setText = () => {
  for (let j = 0; j < element_num; j++){
    updateSerifu(j);
  }
}
let pointerX, pointerY;

const dragTextStart = (e) => {
  pointerX = e.screenX;
  pointerY = e.screenY;
}

const dragTextEnd = (e, i) => {
  document.getElementById(`left${i}`).value = Number(document.getElementById(`left${i}`).value) + ((e.screenX - pointerX) / img_w * 100);
  document.getElementById(`top${i}`).value = Number(document.getElementById(`top${i}`).value) + ((e.screenY - pointerY) / window_h * 100);
  for (let j = 0; j < element_num; j++){
    updateSerifu(j);
  }
}

window.addEventListener("load",function() {
  for (let j = 0; j < element_num; j++){
    document.getElementById(`serifu${j}`).ondragstart = function( event ){
      dragTextStart(event);
    };
    document.getElementById(`serifu${j}`).ondragend = function( event ){
      dragTextEnd(event, j);
    };
  }

})

const handleSessionStorage = () => {
  sessionStorage.setItem('talk_x', JSON.stringify(talk_x));
  sessionStorage.setItem('talk_y', JSON.stringify(talk_y));
  sessionStorage.setItem('talk_txt', JSON.stringify(talk_txt));
}