let items = document.querySelectorAll('.element');
let scroller = document.querySelector('.scroller');
let itemHalfWidth = items[0].offsetWidth/2;

scroller.scrollBy({left: itemHalfWidth*3});

items[2].classList.add('spotlight');

let isDragged = false;

items.forEach(item=>{
    item.addEventListener('mouseup',()=>{
        if(isDragged){
            return;
        }
        if(item.classList.contains('spotlight')){
            return;
        }
        else if(item.nextElementSibling.classList.contains('spotlight')){
            item.nextElementSibling.classList.remove('spotlight');
            item.classList.add('spotlight');
            scroller.scrollBy({left: -itemHalfWidth*2, behavior: "smooth"});
            setTimeout(()=>{
                scroller.insertBefore(scroller.lastElementChild,scroller.firstElementChild);
                scroller.scroll({left: itemHalfWidth*3});
            },500);
        }
        else if(item.previousElementSibling.classList.contains('spotlight')){
            item.previousElementSibling.classList.remove('spotlight');
            item.classList.add('spotlight');
            scroller.scrollBy({left: itemHalfWidth*2, behavior: "smooth"});
            setTimeout(()=>{
                scroller.appendChild(scroller.firstElementChild);
                scroller.scroll({left: itemHalfWidth*3});
            },500);
        }
        else {
            return;
        }
    })
})

scroller.addEventListener('scroll',()=>{
    
    

    items.forEach((item,index)=>{
            let itemWidth = item.offsetWidth;
            let scrollerHalfWidth = scroller.offsetWidth/2;
            let scrollerClient = scroller.getBoundingClientRect();
            let itemClient = item.getBoundingClientRect();
            let itemOffset = itemClient.left - scrollerClient.left;
            let itemCenter = itemOffset + (itemWidth/2);
            if(itemCenter>=0 && itemCenter<=scrollerHalfWidth*2){
                item.querySelector('.box').style.transform = `scale(${1.6-0.6*Math.abs((itemCenter-scrollerHalfWidth)/scrollerHalfWidth)})`;
            }
    });

});

let startX;
let mouseisDown;
let scrollLeft;

scroller.addEventListener('mousedown',e=>pointerMouseDown(e));
scroller.addEventListener('pointerdown',e=>pointerMouseDown(e));

function pointerMouseDown (e) {

    startX = e.pageX;
    scrollLeft = scroller.scrollLeft;
    mouseisDown = true;
}

scroller.addEventListener('mouseleave',afterDrag);
scroller.addEventListener('pointerleave',afterDrag);

scroller.addEventListener('mouseup',afterDrag);
scroller.addEventListener('pointerup',afterDrag);

function afterDrag () {

    isDragged = false;
    mouseisDown = false;
    let spotlight = scroller.querySelector('.spotlight');
    if(distance>itemHalfWidth){
        spotlight.previousElementSibling.classList.add('spotlight');
        spotlight.classList.remove('spotlight');
        scroller.insertBefore(scroller.lastElementChild,scroller.firstElementChild);
        scroller.scroll({left: itemHalfWidth*3});
    }
    if(distance<(-itemHalfWidth)){
        spotlight.nextElementSibling.classList.add('spotlight');
        spotlight.classList.remove('spotlight');
        scroller.appendChild(scroller.firstElementChild);
        scroller.scroll({left: itemHalfWidth*3});
    }
    else{
        scroller.scrollLeft = scrollLeft;
    }
    distance = 0;
}



let distance = 0;

scroller.addEventListener('mousemove',e=>mousePointerMove(e));
scroller.addEventListener('pointermove',e=>mousePointerMove(e));

function mousePointerMove (e) {

    if(!mouseisDown){
        return;
    }
    isDragged = true;
    distance = e.pageX - startX;
    if(Math.abs(distance)<=itemHalfWidth*2){
        scroller.scrollLeft = scrollLeft - distance;
    }
}