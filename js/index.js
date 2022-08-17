var currentStream = -1;
var pubnub = null;
var currentListener = null;
var MAX_LIST_ITEMS = 200;

//  Interactive Demo only
var receivedMessageCount = {};
//  End Interactive Demo only

function onload()
{
    var streamSelect = document.getElementById('streamSelect');
    for(var i = 0; i < streams.stream.length; i++)
    {
        var opt = streams.stream[i].name;
        var li = document.createElement('li');
        var lia = document.createElement('a');
        lia.textContent = opt;
        lia.value = opt;
        lia.id = i;
        lia.setAttribute('class', 'dropdown-item');
        lia.setAttribute('href', '#');
        li.appendChild(lia);
        streamSelect.appendChild(li);

        receivedMessageCount[i] = 0;
    }

    $('.dropdown-menu li a').on('click', function () {
        var id = $(this).attr('id');
        onStreamSelect(id);
    });
}


function onPause()
{
    clearCodeSnippet();
    if (pubnub !== null)
    {
        pubnub.unsubscribeAll();
    }
}

function onStreamSelect(selectedStream)
{
    if (selectedStream != currentStream)
    {
        currentStream = selectedStream;
        console.log('Switching stream to: ' + streams.stream[currentStream].name);
        document.getElementById('dropdownMenuLink').textContent = streams.stream[currentStream].name;
        $("#streamKey").html("" + streams.stream[currentStream].subKey);
        $("#channelName").html("" + streams.stream[currentStream].channel);
        $("#description").html("" + streams.stream[currentStream].description);

        if (currentStream == 0)
        {
            onPause();
            return;
        }

        showCodeSnippet(streams.stream[currentStream].subKey, streams.stream[currentStream].channel)

        //  Unsubscribe from existing stream
        if (pubnub !== null)
        {
            pubnub.unsubscribeAll();
            pubnub.removeListener(currentListener);
        }

        pubnub = new PubNub({
            uuid: "RealTimeDemo",
            subscribeKey: streams.stream[currentStream].subKey
        });
        switch(streams.stream[currentStream].id) {
            case "twitter":
                pubnub.addListener({message: payload => {addFormattedMessageTwitter(payload)}});
                break;
            case "wikipedia":            
                currentListener = {message: payload => {addFormattedMessageWikipedia(payload)}};
                pubnub.addListener(currentListener);
                break;
            case "hackernews":
                currentListener = {message: payload => {addFormattedMessageHackerNews(payload)}};
                pubnub.addListener(currentListener);
                break;
            case "gamestate":
                currentListener = {message: payload => {addFormattedMessageGameState(payload)}};
                pubnub.addListener(currentListener);
                break;
            case "sensornetwork":
                currentListener = {message: payload => {addFormattedMessageSensorNetwork(payload)}};
                pubnub.addListener(currentListener);
                break;
            case "marketorders":
                currentListener = {message: payload => {addFormattedMessageMarketOrders(payload)}};
                pubnub.addListener(currentListener);
                break;
        }
        pubnub.subscribe({
            channels: [streams.stream[currentStream].channel]
        })
    }
}

function addFormattedMessageTwitter(payload)
{
    //console.log(payload)
    var li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    var outputHtml = "";
    outputHtml += "<b>Source: </b>Twitter <i class='fa-brands fa-twitter fa-2xl' style='float:right'></i><br>";
    outputHtml += "<b>Text: </b><a href='https://twitter.com/" + payload.message.user.screen_name + "/status/" + payload.message.id_str + "'target='new'>" + payload.message.text + "</a><br>";
    outputHtml += "<b>Posted from: </b>" + payload.message.source + "<br>";
    outputHtml += "<b>Tweeted from location: </b>" + payload.message.place.country + "<br>";
    outputHtml += "<b>User name: </b><a href='https://twitter.com/" + payload.message.user.screen_name + "'target='new'>" + payload.message.user.screen_name + "</a><br>";
    outputHtml += "<b>User profile location: </b>" + payload.message.user.location + "<br>";
    outputHtml += "<b>User follower count: </b>" + payload.message.user.followers_count + "<br>";
    
    outputHtml += "<b>Timestamp: </b>" + new Date(payload.timetoken / 10000);
    li.innerHTML = outputHtml;

    var list = document.getElementById('messageList');
    list.insertBefore(li, list.firstChild);

    //  Interactive Demo only
    demoActionCompleted(currentStream, 50, 'Receive 50 Twitter messages');
    //  End Interactive Demo only

    capElements()
}

function addFormattedMessageWikipedia(payload)
{
    console.log(payload);
    var li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    var outputHtml = "";
    outputHtml += "<b>Source: </b>Wikipedia <i class='fa-brands fa-wikipedia-w fa-2xl' style='float:right'></i><br>";
    outputHtml += "<b>Event: </b>" + payload.message.event + "<br>";
    outputHtml += "<b>Changed Item: </b>" + payload.message.item + "<br>";
    outputHtml += "<b>Link: </b><a href='" + payload.message.link + "' target='new'>" + payload.message.link + "</a><br>";
    outputHtml += "<b>User: </b>" + payload.message.user + "<br>";
    outputHtml += "<b>Timestamp: </b>" + new Date(payload.timetoken / 10000);
    li.innerHTML = outputHtml;

    var list = document.getElementById('messageList');
    list.insertBefore(li, list.firstChild);

    //  Interactive Demo only
    demoActionCompleted(currentStream, 7, 'Receive 7 Wikipedia changes');
    //  End Interactive Demo only
    
    capElements();
}

function addFormattedMessageHackerNews(payload)
{
    console.log(payload);
    var li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    var outputHtml = "";
    outputHtml += "<b>Source: </b>Hacker News Articles <i class='fa-brands fa-hacker-news fa-2xl' style='float:right'></i><br>";
    for (var i = 0; i < payload.message.length; i++)
    {
        outputHtml += "<b>Rank: </b>" + payload.message[i].rank + "<br>";
        outputHtml += "<b>Title: </b>" + payload.message[i].title + "<br>";
        outputHtml += "<b>Article: </b><a href='" + payload.message[i].link + "' target='new'>" + payload.message[i].link + "</a><br>";
        outputHtml += "<b>Comments: </b><a href='" + payload.message[i].comments + "' target='new'>" + payload.message[i].comments + "</a><br><br>";
    }
    outputHtml += "<b>Timestamp: </b>" + new Date(payload.timetoken / 10000);
    li.innerHTML = outputHtml;

    var list = document.getElementById('messageList');
    list.insertBefore(li, list.firstChild);

    //  Interactive Demo only
    demoActionCompleted(currentStream, 1, 'Receive 1 Hacker News update');
    //  End Interactive Demo only
        
    capElements();
}

function addFormattedMessageGameState(payload)
{
    console.log(payload);
    var li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    var outputHtml = "";
    outputHtml += "<b>Source: </b>Game State <i class='fa-solid fa-gamepad fa-2xl' style='float:right'></i><br>";
    outputHtml += "<b>Action Name: </b>" + payload.message.action_name + "<br>";
    outputHtml += "<b>Action Type: </b>" + payload.message.action_type + "<br>";
    outputHtml += "<b>Action Value: </b>" + payload.message.action_value + "<br>";
    outputHtml += "<b>Coordinates: </b>{ x = " + payload.message.coord_x + ", y = " + payload.message.coord_y + " }<br>";
    outputHtml += "<b>Timestamp: </b>" + new Date(payload.timetoken / 10000);
    li.innerHTML = outputHtml;

    var list = document.getElementById('messageList');
    list.insertBefore(li, list.firstChild);

    //  Interactive Demo only
    demoActionCompleted(currentStream, 30, 'Receive 30 Game State updates');
    //  End Interactive Demo only
    
    capElements();
}

function addFormattedMessageSensorNetwork(payload)
{
    console.log(payload);
    var li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    var outputHtml = "";
    outputHtml += "<b>Source: </b>Sensor Network <i class='fa-solid fa-temperature-half fa-2xl' style='float:right'></i><br>";
    outputHtml += "<b>Ambient Temperature: </b>" + payload.message.ambient_temperature + " °c<br>";
    outputHtml += "<b>Humidity: </b>" + payload.message.humidity + " %<br>";
    outputHtml += "<b>Photosensor: </b>" + payload.message.photosensor + " lm<br>";
    outputHtml += "<b>Radiation level: </b>" + payload.message.radiation_level + " Sv<br>";
    outputHtml += "<b>Sensor ID: </b>" + payload.message.sensor_uuid + "<br>";
    outputHtml += "<b>Timestamp: </b>" + new Date(payload.timetoken / 10000);
    li.innerHTML = outputHtml;

    var list = document.getElementById('messageList');
    list.insertBefore(li, list.firstChild);
    
    //  Interactive Demo only
    demoActionCompleted(currentStream, 25, 'Receive 25 Sensor readings');
    //  End Interactive Demo only

    capElements();
}

function addFormattedMessageMarketOrders(payload)
{
    console.log(payload);
    var li = document.createElement('li');
    li.setAttribute('class', 'list-group-item');
    var outputHtml = "";
    outputHtml += "<b>Source: </b>Market Orders <i class='fa-solid fa-money-bill-trend-up fa-2xl' style='float:right'></i><br>";
    outputHtml += "<b>Stock: </b>" + payload.message.symbol + "<br>";
    outputHtml += "<b>Bid Price: </b>" + Math.round(payload.message.bid_price * 100) / 100 + "<br>";
    outputHtml += "<b>Order Quantity: </b>" + payload.message.order_quantity + "<br>";
    outputHtml += "<b>Trade Type: </b>" + payload.message.trade_type + "<br>";
    outputHtml += "<b>Timestamp: </b>" + new Date(payload.timetoken / 10000);
    li.innerHTML = outputHtml;

    var list = document.getElementById('messageList');
    list.insertBefore(li, list.firstChild);
    
    //  Interactive Demo only
    demoActionCompleted(currentStream, 15, 'Receive 15 Market orders');
    //  End Interactive Demo only

    capElements();
}

function capElements()
{
    var list = document.getElementById('messageList');
    if (list.childElementCount > MAX_LIST_ITEMS)
        list.removeChild(list.lastElementChild);
}

function showCodeSnippet(subKey, channelName)
{
    var codeBlock = document.getElementById('code-block');
    var code = "<code><small><pre>\
var pubnub = new PubNub({ \n\
  uuid: 'MyIdentifier', \n\
  subscribeKey: \n\
    '" + subKey + "' \n\
}); \n\
pubnub.addListener({ \n\
  message: function(message) { \n\
    console.log(message.message);} \n\
}); \n\
pubnub.subscribe({ \n\
  channels: ['" + channelName + "'] \n\
}); \n\
</pre></small></code>";
    codeBlock.innerHTML = code;
}

function clearCodeSnippet()
{
    var codeBlock = document.getElementById('code-block');
    codeBlock.innerHTML = "";
}

function demoActionCompleted(currentStream, triggerVal, actionText)
{
    if (receivedMessageCount[currentStream] < triggerVal - 1) {
        receivedMessageCount[currentStream]++;
    }
    else {
        actionCompleted({
            action: actionText,
            blockDuplicateCalls: true,
            debug: false,
        })
    }    
}