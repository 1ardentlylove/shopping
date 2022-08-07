window.addEventListener('load',function(){
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;

    //鼠标经过focus显示隐藏左右按钮
    focus.addEventListener('mouseenter',function(){
        arrow_l.style.display = 'block';
        arrow_r.style.display = 'block';
        clearInterval(timer);
        timer = null;
    })
    focus.addEventListener('mouseleave',function(){
        arrow_l.style.display = 'none';
        arrow_r.style.display = 'none';
        timer = setInterval(function(){
            arrow_r.click();
        },2000);

    })
    //动态生成小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for(var i=0; i<ul.children.length;i++){
        //创建一个li
        var li = document.createElement('li');
        // 记录当前小圆圈的索引号，通过自定义属性
        li.setAttribute('index',i);
        //把li插入ol中
        ol.appendChild(li);
        // 排他思想
        li.addEventListener('click',function(){
            //清楚所有li的类名
            for(var i=0; i< ol.children.length; i++){
                ol.children[i].className = '';
            }
            this.className = 'current';
            //点击圆圈移动图片
            //ul的移动距离就是圆圈的索引号乘图片宽度，是负值
            //点击某个li就获取某个li个索引号
            var index = this.getAttribute('index');
            //当点击了某个li，讲这个li的索引号赋值给num
            num = index;
            //当点击了某个li，讲这个li的索引号赋值给circle
            circle = index;

            /* console.log(focusWidth);
            console.log(index); */
            animate(ul, -index * focusWidth);
        })
    }
    //把ol内第一个li设为 current
    ol.children[0].className = 'current';
    //克隆第一张图片li放到ul最后
    var frist = ul.children[0].cloneNode(true);
    ul.appendChild(frist);
    //点击按钮图片滚动
    var num = 0;
    //cricle控制小圆圈的播放
    var circle  = 0;
    //节流阀
    var flag = true;
    //右侧
    arrow_r.addEventListener('click',function(){
        if(flag){
            flag = false;//关闭节流阀
            //如果走到最后复制的图片此时ul要快速复原
            if(num == ul.children.length-1){
                ul.style.left = 0 ;
                num=0;
            }
            num++;
            animate(ul, -num * focusWidth,function(){
                flag = true;
            });
            //点击右侧按钮，小圆圈跟随一起变化
            circle++;
            //如果circle==4则说明走到最后
            if(circle == ol.children.length){
                circle = 0;
            }
            circleChange();
        }

    });
    //左侧
    arrow_l.addEventListener('click',function(){
        if(flag){
            flag = false;
            //如果走到最后复制的图片此时ul要快速复原
            if(num == 0){
                num=ul.children.length-1;
                ul.style.left = -num * focusWidth + 'px';
            }
            num--;
            animate(ul, -num * focusWidth,function(){
                flag = true;
            });
            //点击右侧按钮，小圆圈跟随一起变化
            circle--;
            //如果circle<0则说明走到最左
            /* if(circle < 0){
                circle = ol.children.length-1;
            } */
            circle = circle < 0 ? ol.children.length-1 : circle;
            //调用函数
            circleChange();
            }
    });
    function circleChange(){
        //排他思想
        for(var i=0; i<ol.children.length; i++){
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }
    //自动播放
    var timer = setInterval(function(){
        arrow_r.click();
    },2000);
})