window.addEventListener('load',function(){
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    // 1鼠标经过
    preview_img.addEventListener('mouseover',function(){
        mask.style.display ='block';
        big.style.display = 'block';
    })
    preview_img.addEventListener('mouseout',function(){
        mask.style.display = 'none';
        big.style.display = 'none';
    })
    preview_img.addEventListener('mousemove',function(e){
        //先计算鼠标在盒子内的坐标
        var x =e.pageX - this.offsetLeft;
        var y =e.pageY - this.offsetTop;
        // console.log(x,y);
        // 盒子高度的一半为150
        //mask移动的距离
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetWidth / 2;
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        //如果x坐标小于0就让他停在0的位置
        if(maskX <= 0 ){
            maskX = 0;
        }else if(maskX >= maskMax){
            maskX = maskMax;
        }
        if(maskY <=0){
            maskY = 0;
        }else if(maskY >= maskMax){
            masky = maskMax;
        }
        mask.style.left = maskX +'px';
        mask.style.top =  maskY +'px';
        //大图片的移动距离 = 遮挡层移动距离 * 大图片的最大移动距离 / 遮挡层的最大移动距离；
        var  bigImg = document.querySelector('.bigImg')
        //大图片最大移动距离
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        //大图片的移动距离
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;

        bigImg.style.left = -bigX+'px';
        bigImg.style.top = -bigY+'px';
    })
})