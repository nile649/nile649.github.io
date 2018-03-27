// Global
var win = window,
    doc = document;

// Global Functions

function hasClass(el, cls) {
  return el.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
};

function addClass(el, cls) {
  if (!this.hasClass(el, cls)) {
    el.className += " " + cls;
  }
};

function removeClass(el, cls) {
  if (this.hasClass(el, cls)) {

    var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
    el.className = el.className.replace(reg,' ');
  }
};

// Elements

var site = doc.getElementsByClassName('site-wrap')[0];
var wrap = doc.getElementsByClassName('panel-wrap')[0];

var panel = doc.getElementsByClassName('panel');

var zoom = doc.getElementsByClassName('js-zoom');

var nav_up = doc.getElementsByClassName('js-up'),
    nav_left = doc.getElementsByClassName('js-left'),
    nav_right = doc.getElementsByClassName('js-right'),
    nav_down = doc.getElementsByClassName('js-down');

var animation = doc.getElementsByClassName('js-animation');

// Tracking
var pos_x = 0,
    pos_y = 0;

function setPos(){
  wrap.style.transform = 'translateX(' + pos_x + '00%) translateY(' + pos_y + '00%)';
  setTimeout( function(){
    removeClass(wrap, 'animate');
  }, 600);
}

setPos();

function moveUp(){
  addClass(wrap, 'animate');
  pos_y++;
  setPos();
}

function moveLeft(){
  addClass(wrap, 'animate');
  pos_x++;
  setPos();
}

function moveRight(){
  addClass(wrap, 'animate');
  pos_x--;
  setPos();
}

function moveDown(){
  addClass(wrap, 'animate');
  pos_y--;
  setPos();
}

for (var x = 0; x < nav_up.length; x++){
  nav_up[x].addEventListener('click', moveUp);
}

for (var x = 0; x < nav_left.length; x++){
  nav_left[x].addEventListener('click', moveLeft);
}

for (var x = 0; x < nav_right.length; x++){
  nav_right[x].addEventListener('click', moveRight);
}

for (var x = 0; x < nav_down.length; x++){
  nav_down[x].addEventListener('click', moveDown);
}

// Animations

for (var x = 0; x < animation.length; x++){
  ( function(_x){
    animation[_x].addEventListener('click', function(){
      toggleAnimation(_x);
    });
  })(x);
}

function toggleAnimation(i){
  for (var x = 0; x < animation.length; x++){
    if (i === x){
      addClass(animation[x], 'active');
      addClass(wrap, animation[x].getAttribute('data-animation'));
    } else {
      removeClass(animation[x], 'active');
      removeClass(wrap, animation[x].getAttribute('data-animation'));
    }
  }
  
}

for (var x = 0; x < zoom.length; x++){
  zoom[x].addEventListener('click', zoomOut);   
}

function zoomOut(e){
  e.stopPropagation();
  addClass(site, 'show-all');
  for (var x = 0; x < panel.length; x++){
    ( function(_x){
      panel[_x].addEventListener('click', setPanelAndZoom);
    })(x);
  }
}

function setPanelAndZoom(e){
  pos_x = -e.target.getAttribute('data-x-pos'),
  pos_y = e.target.getAttribute('data-y-pos');
  setPos();
  zoomIn();
}


function zoomIn(){
  for (var x = 0; x < panel.length; x++){
    panel[x].removeEventListener('click', setPanelAndZoom);
  }
  removeClass(site, 'show-all');
}

$(document).ready(function(){
  var heights = $("div.project").map(function ()
    {
        return $(this).height();
        console.log( $(this).height());
    }).get(),

    maxHeight = Math.max.apply(null, heights);
    console.log(maxHeight);
    $(".project").css({"height":(maxHeight+50)+"px"});

    var lenn=$(".project").length;
    var wid=$(".project").width();
    wid=wid+30;
    var win=$(window).width();
    if(win>1400){lenn=lenn-3;}
    if(win<1400 && win>1200){lenn=lenn-2;}
    if(win<602){lenn=lenn-1;}
    var current=0;
    $(".arrow.right").click(function(){
      if(current>(-lenn)){
        current--;
        $("#project-container .project").css({"transform":"translateX("+current*wid+"px)"});
      }
    })
    $(".arrow.left").click(function(){
      if(current<0){
        current++;
        $("#project-container .project").css({"transform":"translateX("+current*wid+"px)"});
      }
    })



    $(".project").click(function(){
        $(".info>div,.info").css({"display":"block","opacity":"1"});
        var icon=$(this).find('.icon>i').attr('class');
        var title=$(this).find('h3').html();
        var id=$(this).attr('id');
        $(".info>.img i").attr('class',icon);
        $(".info>.text h2.title").html(title);
        var text='';
        if(id=="1"){text='<div class="btn"><a href="https://github.com/nile649/Tensorflow-Tutorial/blob/master/Style_transfer.ipynb" target="_blank"><i class="flaticon-github-logo"></i> View On Github</a></div>';}
        if(id=="2"){text='<div class="btn"><a href="https://github.com/nile649/Tensorflow-Tutorial/blob/master/Tensor%20FLow%20Models.ipynb" target="_blank"><i class="flaticon-github-logo"></i> View On Github</a></div>';}
        if(id=="3"){text='<div class="btn"><a href="https://github.com/nile649/Tensorflow-Tutorial/blob/master/Twitter_bot.ipynb" target="_blank"><i class="flaticon-github-logo"></i> View On Github</a></div>';}
        if(id=="4"){text='<div class="btn"><a href="https://github.com/twinspica14/Personal-Project-For-parking#personal-project-for-parking" target="_blank"><i class="flaticon-github-logo"></i> View On Github</a></div>';}
        if(id=="5"){text='<div class="btn"><a href="https://github.com/twinspica14/college-project-automation" target="_blank"><i class="flaticon-github-logo"></i> View On Github</a></div>';}
        if(id=="6"){text='<div class="btn"><a href="https://github.com/twinspica14/openCV" target="_blank"><i class="flaticon-github-logo"></i> View On Github</a></div>';}
        if(id=="7"){text='<div class="btn"><a href="https://github.com/twinspica14/Map-withpopups" target="_blank"><i class="flaticon-github-logo"></i> View On Github</a></div>';}

        $(".info>.text p").html(text);
        setTimeout(function(){
          $(".info>div").css({"transform":"translateX(0)"});
        },200);
    })
    $(".arrow.back").click(function(){
       $(".info>div.img").css({"transform":"translateX(-100%)"});
       $(".info>div.text").css({"transform":"translateX(100%)"});
        setTimeout(function(){
           $(".info>div,.info").css({"display":"none","opacity":"0"});
        },500);
    })
})