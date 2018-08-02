
// 上传图片
$('.upload-hook').click(function(){
  $(".file-hook").click();
})

// input[type='file']监听函数
function PreviewImage(imgFile){
  //传递的参数：input当前对象
  //图片容器 
  //图片宽度
  //图片高度（宽高不传：默认200x200）
  var base64 = new Base64(imgFile, $('.img-list'), 200, 200);
}


