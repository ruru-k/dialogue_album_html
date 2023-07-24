const CG_src = new Array(
  "sample_img/1.jpg",
  "sample_img/2.jpg",
);
let talk_x = [...Array(element_num)].map(_ => {
  return [...Array(CG_src.length)].map(_ => [])
});
let talk_y = [...Array(element_num)].map(_ => {
  return [...Array(CG_src.length)].map(_ => [])
});
let talk_txt = [...Array(element_num)].map(_ => {
  return [...Array(CG_src.length)].map(_ => [])
});