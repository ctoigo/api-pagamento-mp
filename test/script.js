$(function() {

  Mercadopago.setPublishableKey("TEST-220a20fe-c598-486f-b514-caf6d418c891");

  $('#cardnumber').payment('formatCardNumber');
  $('#cardexpiration').payment('formatCardExpiry');
  $('#cardcvc').payment('formatCardCVC');
  
  $('#cardnumber').keyup(function(event) {
    $('#label-cardnumber').empty().append($(this).val());
  });
  
  $('#cardexpiration').keyup(function(event) {
    var data = $(this).val() + '<span>' + $('#cardcvc').val() + '</span>';
    $('#label-cardexpiration').empty().append(data);
  });
  
  $('#cardcvc').keyup(function(event) {
    var data = $('#cardexpiration').val() + '<span>' + $(this).val() + '</span>';
    $('#label-cardexpiration').empty().append(data);
  });
  
  $('.button-cta').on('click', function () { 
    var proceed = true;
    $(".field input").each(function(){
      $(this).parent().find('path').each(function(){
        $(this).attr('fill', '#dddfe6');
      });
      
      if(!$.trim($(this).val())){
        $(this).parent().find('path').each(function(){
          $(this).attr('fill', '#f1404b');
          proceed = false;
        });
        
        if(!proceed){
          $(this).parent().find('svg').animate({opacity: '0.1'}, "slow");
          $(this).parent().find('svg').animate({opacity: '1'}, "slow");
          $(this).parent().find('svg').animate({opacity: '0.1'}, "slow");
          $(this).parent().find('svg').animate({opacity: '1'}, "slow");
        }
      } else {
        console.log('pagamento');
      }
    });
       
    if(proceed) //everything looks good! proceed purchase...
    {
      $('.field').find('path').each(function(){
        $(this).attr('fill', '#3ac569');
      });
      $('.payment').fadeToggle('slow', function() {
        $('.paid').fadeToggle('slow', 'linear');
      });
    }
  });


function getBin() {
  const cardnumber = document.getElementById("cardnumber");
  return cardnumber.substring(0,6);
}

function guessingPaymentMethod(event) {
    var bin = getBin();

    if (event.type == "keyup") {
        if (bin.length >= 6) {
            window.Mercadopago.getPaymentMethod({
                "bin": bin
            }, setPaymentMethodInfo);
        }
    } else {
        setTimeout(function() {
            if (bin.length >= 6) {
                window.Mercadopago.getPaymentMethod({
                    "bin": bin
                }, setPaymentMethodInfo);
            }
        }, 100);
    }
};

function setPaymentMethodInfo(status, response) {
    if (status == 200) {
        const paymentMethodElement = document.querySelector('input[name=paymentMethodId]');

        if (paymentMethodElement) {
            paymentMethodElement.value = response[0].id;
        } else {
            const input = document.createElement('input');
            input.setattribute('name', 'paymentMethodId');
            input.setAttribute('type', 'hidden');
            input.setAttribute('value', response[0].id);     

            form.appendChild(input);
        }
    } else {
        alert(`payment method info error: ${response}`);  
    }
};
  
});