# readme
セリフを入れたアルバムを作成するjs。  

表示する画像のパスを js/imgs.js に追加する。  

|key|action|
|-|-|
|→, d|next image|
|←, a|previous image|

セリフをドラッグで移動。  
indexを変更で別パターンを記載。  
一時保存でブラウザを閉じるまで保存。  
出力でinnertext.jsがダウンロードされるので、jsフォルダのものを上書きする。  
初期化はinnertext.jsの中を全削除でよい。  

吹き出しのスタイルはhtmlのclass名とstyle.cssで調節。  
吹き出し数を増やす場合は、各要素をコピペで増やして、element_numを増やす。  