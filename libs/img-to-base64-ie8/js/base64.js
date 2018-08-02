(function(w,d){
    var id = 1; // 此id无实在意义，仅为操作id
    w.Base64 = function(imgFile, ele, width, height){
        id ++;
        this.imgFile = imgFile;
        this.id = id;
        this.width = width || 200;
        this.height = height || 200;
        // 定义方法
    	var pattern = /(\.*.jpg$)|(\.*.png$)|(\.*.jpeg$)|(\.*.gif$)|(\.*.bmp$)/;      
        if(!pattern.test(this.imgFile.value)) { 
          alert("请上传jpg/jpeg/png/gif/bmp格式的照片！");  
          this.imgFile.focus(); 
        }else{
           //添加显示图片的HTML元素
           this.id += 1;
           $(ele).append("<div class='img-item'><div id='"+this.id+"'><img src='' width='"+this.width+"' height='"+this.height+"'/></div><span class='delete-hook' onclick='deleteImg(this)'>删除</span></div>");
           //判断浏览器类型
           if(document.all){ 
              //兼容IE
              this.ieBase64(this.imgFile.value, document.getElementById(this.id), this.width, this.height);
           }else{
              //兼容主流浏览器 
              this.mainBase64(this.imgFile.files[0], document.getElementById(this.id), this.width, this.height);
           }
           //重置表单(允许用户可以连续添加相同图片)
           this.resetForm(this.imgFile); 
        } 
    };
    Base64.prototype = {
        ieBase64: function(file, ele, width, height){
            var realPath, xmlHttp, xml_dom, tmpNode, imgBase64Data;
            realPath = file;//获取文件的真实本地路径.
            xmlHttp = new ActiveXObject("MSXML2.XMLHTTP");
            xmlHttp.open("POST",realPath, false);
            xmlHttp.send("");
            xml_dom = new ActiveXObject("MSXML2.DOMDocument");
            tmpNode = xml_dom.createElement("tmpNode");
            tmpNode.dataType = "bin.base64";
            tmpNode.nodeTypedValue = xmlHttp.responseBody;
            imgBase64Data = "data:image/bmp;base64," + tmpNode.text.replace(/\n/g,"");
            ele.innerHTML="<img src='"+imgBase64Data+"' width='"+width+"' height='"+height+"'/>"; //渲染图片
        },
        mainBase64: function(file, ele, width, height){
            var fileReader, imgData;
        	fileReader = new FileReader();  
            fileReader.readAsDataURL(file);  
            fileReader.onload = function () {  
                imgData = this.result; //base64数据
                ele.innerHTML = "<img src='"+imgData+"' width='"+width+"' height='"+height+"'/>"; //渲染图片
            }
        },
        resetForm: function(imgFile){
            $(imgFile).parent()[0].reset();
        }
    }
})(window,document);

//删除图片 ***此方法需要是全局函数，不可声明在匿名函数中
function deleteImg(img){
    $(img).parent().remove();
}
