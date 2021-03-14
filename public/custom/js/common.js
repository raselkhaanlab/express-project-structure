$(document).ready(function(){
    $('.datepicker').datepicker({
        dateFormat: 'dd-mm-yy'
    });
})

$(document).on('focus','.focus',function(){
    $(this).select();
})


function isIframe() {
    if ( window.location !== window.parent.location){
        var isIframe = true;
    }
    return isIframe;
}

// Calling iniFrame function
var isIframe = isIframe();

$(document).on('click','.auth-link',function (e) {
    var iv = $(this).attr('iframe-validate')
    if (typeof iv !== typeof undefined && iv !== false) {
        $(this).attr('iframe-validate',false);
        return true;
    }
    if(isIframe){
        e.preventDefault();
        var href = $(this).attr('href');
        if (typeof href !== typeof undefined && href !== false) {
            if(href.indexOf('?')>0){
                href = href+'&key='+ck;
            }else{
                href = href+'?key='+ck;
            }

            $(this).attr('href',href);
            $(this).attr('iframe-validate',true);
            window.location.href = window.location.origin+href;

        }else{
            var href = $(this).attr('data-href');
            if (typeof href !== typeof undefined && href !== false) {
                if(href.indexOf('?')>0){
                    href = href+'&key='+ck;
                }else{
                    href = href+'?key='+ck;
                }
                $(this).attr('href',href);
                $(this).attr('iframe-validate',true);
                window.location.href = window.location.origin+href;
            }
        }
    }else{
        //alert('Not in iframe');
    }
})

$(document).on('click','.confirmation',function () {
    var href = $(this).attr('data-href');
    if(isIframe){
        href += '?key='+ck;
    }
    var action = $(this).attr('btn-action');
    if(!action){
        action = 'do';
    }
    var message = $(this).attr('confirm-msg');
    if(!message){
        message = siteContents['are_you_sure'];
    }
    $.confirm({
        title: '<b class="text-default">'+siteContents['confirmation']+'!</b>',
        content:'<b>'+message+'</b>',
        escapeKey: true,
        backgroundDismiss: true,
        theme:'light',
        buttons: {
            Confirm: {
                text: action,
                btnClass: 'btn-theme-2',
                keys: ['enter'],
                action: function () {
                    window.location.href = window.location.origin+href;
                }
            },
            cancel: {
                text: siteContents['no'],
                btnClass: 'btn-danger',
                action: function () {
                    // close
                }
            }
        }
    });
})

function photoPreview(input,preview_id,width,height,classes='') {
    var img = $(input).val();
    var ext = img.split('.');
    ext = ext[ext.length-1];
    var allow = ["jpg", "jpeg", "png"];
    var exist = allow.indexOf(ext.toLowerCase());
    if(exist>=0){
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $(preview_id).html('<img src="'+e.target.result+'" class="img-fluid rounded-circle '+classes+'" width="'+width+'" height="'+height+'"/>');
            }
            reader.readAsDataURL(input.files[0]);
            return true;
        }
    }else{
        return false
    }

}

function formReset($form){
    $form.find('input[type=text]').val('');
    $form.find('select').val('');
    $form.find('input[type=number]').val('');
}

$(document).on('keypress keyup','.real-number',function (event) {
    var number=parseInt($(this).val());
    //console.log(event);
    if(isNaN(number) || number==0){
        if(event.charCode==48){
            return false;
        }
        if(event.charCode==0){
            return false;
        }
    }
    return isRealNumber(event, this)
});

$(document).on('keypress keyup','.none-zero',function (event) {
    var number=parseInt($(this).val());
    //console.log(event);
    if(isNaN(number) || number==0){
        if(event.charCode==48){
            $(this).val('')
            return false;
        }
        if(event.charCode==0){
            $(this).val('')
            return false;
        }
    }
});
function isRealNumber(evt, element) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (
        //(charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
    //(charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}


$(document).on('keypress keyup','.decimal',function (event) {
    return isDecimal(event, this)
});
$(document).on('keyup','.percent',function () {
    let percent = parseFloat($(this).val());
    if(percent>100){
        $(this).val(100);
    }else if(percent<0){
        $(this).val(0);
    }
    $(this).trigger('change')
});

function isDecimal(evt, element) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (
        //(charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;


    return true;
}

function isEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


$(document).on('click','.read-more',function () {
    var text = $(this).closest('div').find('.contents_full').text();
    $.alert({
        title: '',
        content: text,
        type: 'dark',
        escapeKey: true,
        backgroundDismiss: true,
        columnClass: 'col-md-6 col-12 read-more-modal',
        buttons:{
            OK:{
                text:'OK',
                keys: ['enter'],
                btnClass:'btn btn-theme-2'
            }
        }
    });

})



function copyText(text) {
    text = text.trim();
    var $temp = $("<textarea></textarea>");
    $("body").append($temp);
    $temp.val(text).select();
    document.execCommand("copy");
    $temp.remove();
    return true;
}

$(document).on('click','.btn-copy',function(){
    var textTarget = $($(this).attr('data-copy'));
    copyText(textTarget.text());
    var _this = this;
    $('.copied').html(siteContents['copied']);
    setTimeout(function(){
        $('.copied').empty();
    },1000)
})

function cartListPrepaired(cartList) {
    var tickets = '';
    cartList.forEach(t=>{
        tickets+='<div class="card"><div class="ticket-details">'+t.serial+'<i class="fa fa-times cart-remove" aria-hidden="true" href="/en/remove-cart/'+t.ticket_id+'"></i></div></div>'
    })

    $('#cartTickets').html(tickets)
}



