var streams = {
    "stream": [
        {
            "id":"none",
            "name":"None (Paused)",
            "description":"Stream is paused",
            "subKey": "N/A",
            "channel": "N/A"
        },
        {
            "id":"twitter",
            "name":"Twitter Stream (Live)",
            "description":"A real-time stream of actual messages on Twitter.  For readability, capped at 10 tweets per second.",
            "subKey": "sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe",
            "channel":"pubnub-twitter"
        },
        {
            "id":"wikipedia",
            "name":"Wikipedia Changes (Live)",
            "description": "This data stream provides any recent modifications to the database of Wikipedia articles, in all languages and categories.",
            "subKey": "sub-c-b0d14910-0601-11e4-b703-02ee2ddab7fe",
            "channel": "pubnub-wikipedia"
        },
        {
            "id":"hackernews",
            "name":"Hacker News Articles (Live)",
            "description": "Stream the most recent trending articles from Hacker News.  <b>Updated every 10 seconds</b>.",
            "subKey": "sub-c-c00db4fc-a1e7-11e6-8bfd-0619f8945a4f",
            "channel": "hacker-news"
        },
        {
            "id":"gamestate",
            "name":"Game State Sync (Simulated)",
            "description": "View the latest state information of a multi-player role playing game",
            "subKey": "sub-c-b1cadece-f0fa-11e3-928e-02ee2ddab7fe",
            "channel": "pubnub-game-state"
        },
        {
            "id":"sensornetwork",
            "name": "Sensor Network (Simulated)",
            "description": "Mimic data from a network of outdoor field sensors",
            "subKey": "sub-c-5f1b7c8e-fbee-11e3-aa40-02ee2ddab7fe",
            "channel": "pubnub-sensor-network"
        },
        {
            "id":"marketorders",
            "name": "Market Orders (Simulated)",
            "description": "Receive constantly updating market orders from a variety of financial securities",
            "subKey": "sub-c-4377ab04-f100-11e3-bffd-02ee2ddab7fe",
            "channel": "pubnub-market-orders"
        }
    ]
}