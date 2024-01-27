function createMessage(text, err = true) {
    
    
    let last = $('.message-back').last()
    let ofset = (last[0] ? window.scrollY + last[0].getBoundingClientRect().top + last[0].clientHeight : (5))

    $(".message-box").append(`<div class="message-back"><div class="message ${(err? '--6' : '--1')}">${text}</div></div>`);
    let item = $(".message-box").children().last();
    item.css({top: ofset+'px'})
    item.animate({right: 0}, 500, function(){
        setTimeout(() => {
            item.animate({right: '-800px'}, 500, function () {
                setTimeout(()=>$(this).remove(), 200)
            });
        }, 5000);
    })

}
