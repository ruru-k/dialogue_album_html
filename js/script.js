let serifu_index = 0;
let img_index = 0;
const serifu_describe = () => {
  document.getElementById(`serifu_index`).value = serifu_index;
  for (let j = 0;  j < element_num; j++){
    setSerifu(j);
  }
}
const num_backward = () => {
  img_backward(CG_src, document.getElementById('main_img'));
  img_index = Number(document.getElementById('main_img').name);
  serifu_index = talk_txt[0][img_index][serifu_index] ? serifu_index : 0;
  img_w = document.getElementById("main_img").clientWidth;
  document.getElementById("form_area").style.left = img_w + 30;
  serifu_describe();
}
const num_forward = () => {
  img_forward(CG_src, document.getElementById('main_img'));
  img_index = Number(document.getElementById('main_img').name);
  serifu_index = talk_txt[0][img_index][serifu_index] ? serifu_index : 0;
  img_w = document.getElementById("main_img").clientWidth;
  document.getElementById("form_area").style.left = img_w + 30;
  serifu_describe();
}
const num_random = () => {
  img_index = getRandomInt(CG_src.length);
  img_same(CG_src, document.getElementById('main_img'), img_index);
  img_w = document.getElementById("main_img").clientWidth;
  document.getElementById("form_area").style.left = img_w + 30;
  serifu_random();
}
const serifu_forward = () => {
  serifu_index = ( serifu_index + 1 ) % talk_txt[0][img_index].length;
  serifu_describe();
}

const serifu_backward = () => {
  serifu_index = ( serifu_index - 1 ) % talk_txt[0][img_index].length;
  serifu_describe();
}
const serifu_random = () => {
  serifu_index = getRandomInt(talk_txt[0][img_index].length);
  serifu_describe();
}

const handleDownload = () => {
  let data_csv="";//ここに文字データとして値を格納していく
  for(let i = 0; i < talk_txt.length; i++){
    for (let j = 0; j < element_num; j++){
      const k_max = talk_txt[j][i]? talk_txt[j][i].length:0;
      for (let k = 0; k < k_max; k++){
        data_csv += `talk_x[${j}][${k}].push('${talk_x[j][i][k]}');\n`;
        data_csv += `talk_y[${j}][${k}].push('${talk_y[j][i][k]}');\n`;
        data_csv += `talk_txt[${j}][${k}].push('${talk_txt[j][i][k].replaceAll('\n', '\\n')}');\n`;
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
      scene_element.forEach((element, j) => {
        talk_x[i][j]=element;
      });
    });
  }
  if (sessionStorage.getItem('talk_y')) {
    JSON.parse(sessionStorage.getItem('talk_y')).forEach((scene_element, i) => {
      scene_element.forEach((element, j) => {
        talk_y[i][j]=element;
      });
    });
  }
  if (sessionStorage.getItem('talk_txt')) {
    JSON.parse(sessionStorage.getItem('talk_txt')).forEach((scene_element, i) => {
      scene_element.forEach((element, j) => {
        talk_txt[i][j]=element;
      });
    });
  }
}
loadSessionStorage();

const setSerifu = (i) => {
  document.getElementById(`left${i}`).value = talk_x[i][img_index][serifu_index];
  document.getElementById(`top${i}`).value = talk_y[i][img_index][serifu_index];
  document.getElementById(`inputtext${i}`).value = talk_txt[i][img_index][serifu_index] ? talk_txt[i][img_index][serifu_index] : null;
  document.getElementById(`serifu${i}`).style.left = talk_x[i][img_index][serifu_index] * img_w / 100;
  document.getElementById(`serifu${i}`).style.top = talk_y[i][img_index][serifu_index] * window_h / 100;
  document.getElementById(`serifu${i}`).innerText = talk_txt[i][img_index][serifu_index] ? talk_txt[i][img_index][serifu_index] : null;
  document.getElementById(`serifu${i}`).style.opacity = talk_txt[i][img_index][serifu_index] ? 1 : 0;
}

const updateSerifu = (i) => {
  talk_x[i][img_index][serifu_index] = document.getElementById(`left${i}`).value;
  talk_y[i][img_index][serifu_index] = document.getElementById(`top${i}`).value;
  talk_txt[i][img_index][serifu_index] = document.getElementById(`inputtext${i}`).value;
  document.getElementById(`serifu${i}`).style.left = talk_x[i][img_index][serifu_index] * img_w / 100;
  document.getElementById(`serifu${i}`).style.top = talk_y[i][img_index][serifu_index] * window_h / 100;
  document.getElementById(`serifu${i}`).innerText = talk_txt[i][img_index][serifu_index];
}

const setText = () => {
  if (serifu_index !== Number(document.getElementById("serifu_index").value)) {
    serifu_index = Number(document.getElementById("serifu_index").value);
    for (let j = 0; j < element_num; j++){
      setSerifu(j);
    }
  } else {
    for (let j = 0; j < element_num; j++){
      updateSerifu(j);
    }
  }
}
let pointerX, pointerY;

const dragTextStart = (e) => {
  pointerX = e.screenX;
  pointerY = e.screenY;
  console.log(pointerX, pointerY)
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