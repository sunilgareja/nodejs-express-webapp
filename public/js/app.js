$( document ).ready(function() {

    console.log('client side js loaded');

    const weatherForm=$('form');
    const search=$('#searchLocation');

    weatherForm.on('submit', (event)=>{
        
        event.preventDefault();

        const searchQuery=search.val();

        $('#loading').html('<img height="auto" width="100" src="/img/loader.gif"/>');

        $('#location').html('');
        $('#forecast').html('');
        $('#darksky').html('');


        var ww=window.innerWidth;

        fetch('/weather?address='+searchQuery).then((res)=>{
            res.json().then((data)=>{

                $('#loading').html('');

                if (ww <= 680) {
                    var postscribeURL='<script src=https://darksky.net/widget/small/'+data.lat+','+data.long+'/si12/en.js?width=100%&height=200&title='+searchQuery+' Forecast&textColor=333333&bgColor=transparent&transparency=true&skyColor=undefined&fontFamily=Default&customFont=&units=uk><\/script>';
                    
                } else {
                    var postscribeURL='<script src=https://darksky.net/widget/default/'+data.lat+','+data.long+'/si12/en.js?width=100%&height=350&title='+searchQuery+'&textColor=333333&bgColor=transparent&transparency=true&skyColor=undefined&fontFamily=Default&customFont=&units=uk&htColor=333333&ltColor=C7C7C7&displaySum=yes&displayHeader=yes><\/script>';
                }

                if(data.error) {
                    $('#location').html('<p><b style="color:red">'+data.error+'</b></p>');

                } else {

                    postscribe('#darksky',postscribeURL);
                    $("#darksky").css('display','none');

                    setTimeout(() => {
                        $("#darksky").fadeIn(3000);
                    }, 800);
                
                    $('#location').html('<p><b style="color:grey">Location:</b> '+data.location+'</p>');

                    $('#forecast').html('<p><b style="color:grey">Current Forecast:</b> '+data.forecast+'</p>');

                }
            });

        });
 
    });

});

