function changePrizeState(){
    var total_prize_amount = 0;
    var all_total_prize = 0;
    $('.prize_amount').each(function () {
        var prize_amount = $(this).val();
        if(prize_amount=='' || !$.isNumeric(prize_amount)){
            prize_amount = 0;
        }else{
            prize_amount = parseFloat(prize_amount);
        }
        var total_prize = $(this).closest('tr').find('.total_prize').val();

        if(total_prize == '' || !$.isNumeric(total_prize)){
            total_prize = 1;
        }else{
            total_prize = parseInt(total_prize);
        }

        total_prize_amount=total_prize_amount+(prize_amount*total_prize);
    });
    $('.total_prize').each(function () {
        var total_prize = $(this).val();
        if(total_prize == '' || !$.isNumeric(total_prize)){
            total_prize = 0;
        }else{
            total_prize = parseFloat(total_prize);
        }
        all_total_prize=all_total_prize+total_prize;
    });

    $('#total_prize_amount').html(parseFloat(total_prize_amount.toFixed(8)));
    $('#all_total_prize').html(all_total_prize);
}
$(document).ready(function(){

    changePrizeState();
    $(document).on("change  keyup", ".prize_amount,.total_prize", function()
    {
        changePrizeState()
    });

    $(document).on('change keyup','#sold_percent',function(){
        var percent = parseFloat($(this).val());
        var total_amount = parseFloat($(this).attr('total-amount'));
        var total_prize_amount = parseFloat($(this).attr('total-prize-amount'));

        let total_profit = ((total_amount/100)*percent)-total_prize_amount;
        if(isNaN(total_profit)){
            total_profit = 0;
        }
        $('#total_profit').html(total_profit.toFixed(2));

    })

    ///profile photo change
    $(document).on('click','#change_profile_img',function(){
        $(this).closest('div').find('input[name="phofile_photo"]').trigger('click');
    });

    var photo_parent = '#profile_img';
    var current_img = $(photo_parent).html();

    $(document).on('change','input[name="phofile_photo"]',function(){
        if(photoPreview(this,photo_parent,300,300)){
            $('#change_profile_img').hide();
            $(this).closest('form').show();
        }else{
            $('#reset_profile_img').trigger('click');
        }

    })
    $(document).on('click','#reset_profile_img',function () {
        $('#change_profile_img').show();
        $(this).closest('form').hide();
        $(photo_parent).html(current_img);
    })
    ///End profile photo change


    // change state by country
    $(document).on('change','#country_id',function () {
        var country_id = $(this).val();
        var url = window.location.origin+'/api/get-states/'+country_id;
        $this = $(this);
        $.get(url,function(states){
            var options  = '<option value="">Select State</option>';
            for(var k in states){
                options += '<option value="'+states[k].id+'">'+states[k].name+'</option>';
            }
            $this.closest('form').find('#state_id').html(options);
        },'json').fail(function(err){
            console.log('Error:');
            console.log(err);
        })
    })
    // end change state by country





});


$(document).on('click','#subscribeNow',function () {
    var email = $(this).closest('form').find('input[type="email"]').val();
    var $this = $(this);
    if(isEmail(email)){
        var url = window.location.origin +'/'+Lang+'/subscribe';
        $(this).closest('form').find('.err-msg').empty();
        $.post(url,{email:email},function (res) {
            $this.closest('form').find('input[type="email"]').val('');
            $this.closest('form').find('.message').html(res.message);
            $this.closest('form').find('.message').addClass('text-success');
            $this.closest('form').find('.message').removeClass('text-danger');
        },'json')
    }else{
        $(this).closest('form').find('.message').removeClass('text-success');
        $(this).closest('form').find('.message').addClass('text-danger');
        $(this).closest('form').find('.message').html(siteContents['invalid_email_err_msg'])
    }

})

function CartEmpty() {
    $('#carts').html('<tr><td colspan="4">'+siteContents[`not_available`]+'</td></tr>');
    $('#FinalTotalPrice').html(0);
    $('#FinalTotalTicket').html(0);
    $('#cartNav').html(0);
    $('.cart-total-selected').html(0);
    $('.cart-total-random').html(0);
    $('#cartTickets').empty();
}

function CartUpdate(cart) {
    var sl = 1;
    var total_price = 0;
    $('#carts').find('.price').each(function (e) {
        $(this).closest('tr').find('.sl').html(sl++);
        total_price = total_price + parseFloat($(this).text());
    })
    total_price = parseFloat(total_price.toFixed(8))
    $('#FinalTotalPrice').html(total_price);
    $('#FinalTotalTicket').html($('#carts').find('.price').length);

    $('#cartNav').html(cart.random + cart.selected);
    $('.cart-total-selected').html(cart.selected);
    $('.cart-total-random').html(cart.random);
}
$(document).on('click', '.cart-remove', function (e) {
    var url = window.location.origin + $(this).attr('href');
    if (isIframe) {
        url += '?key=' + ck;
    }
    var $this = $(this);
    var i = $(this);
    if($this.find('i').length==1){
        i = $this.find('i');
    }
    i.attr('class','fa fa-spinner fa-pulse fa-fw');
    $.get(url, function (res) {
        if (res.error == 0) {
            $this.closest('tr').remove();
            $this.closest('.card').remove();
            CartUpdate(res.data.cartSummary);

        }else{
            $.dialog({
                title:'<b class="text-danger">'+siteContents['failure']+'</b>',
                content:res.message
            })
        }
    },'json').always(function () {
        if($this.find('i').length==1){
            i.attr('class','fa fa-times');
        }else{
            $this.attr('class','fa fa-times cart-remove');
        }

    })
})

$(document).on('click','.payment-confirmation',function () {
    var href = $(this).attr('data-href');
    href += '?reff='+$('input[name="reff_code"]').val();
    if(isIframe){
        href += '&key='+ck;
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
                    var url;
                    if(isIframe){
                        url = window.location.origin+'/en/order?key='+ck+'&reff='+$('input[name="reff_code"]').val();
                    }else{
                        url = window.location.origin+'/en/order?reff='+$('input[name="reff_code"]').val();
                    }
                    $.dialog({
                        content: function () {
                            var self = this;
                            return $.ajax({
                                url: url,
                                dataType: 'json',
                                method: 'post'
                            }).done(function (data) {
                                if(data.error){
                                    var alertTitle = (data.title)?data.title:siteContents['failure'];
                                    self.setTitle('<b class="text-danger">'+alertTitle+'</b>');
                                    self.setContent(data.message);
                                    if(data.classes){
                                        self.setColumnClass(data.classes);
                                    }
                                }else{
                                    if(typeof data.success_order !='undefined' || data.success_order){
                                        CartEmpty();
                                    }
                                    self.setContent(data.content);
                                    self.setTitle('<b class="text-success">'+data.title+'</b>');
                                    self.setColumnClass(data.classes);
                                }

                            }).fail(function(){
                                self.setContent(siteContents['something_wrong']);
                            });
                        }
                    });
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
$(document).ready(function () {

})
setInterval(function () {
    var isChecked = $(document).find('#WaitingForPayment').length;

    if(isChecked){
        var addrs = $(document).find('#WaitingForPayment').val();
        var url = window.location.origin+'/en/user-payment?addrs='+addrs;
        $.post(url,function (wallet) {
            let PayableAmount = $(document).find('#PayableAmount').val();
            if(wallet.balance >= PayableAmount){
                var PaymentBox = $(document).find('#WaitingForPayment').closest('#PaymentBox');
                PaymentBox.find('.payment-wait').html('<span class="text-success"><i class="fa fa-check-circle-o" aria-hidden="true"></i> Payment is Received</span>')
                PaymentBox.find('#ContinuePurchasing').attr('type','submit');
                PaymentBox.find('#ContinuePurchasing').attr('disabled',false);
            }
        },'json')
    }

},5000)



