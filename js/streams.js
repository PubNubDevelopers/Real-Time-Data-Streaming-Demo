var streams = {
  stream: [
    {
      id: 'none',
      name: 'None (Paused)',
      description: 'Stream is paused',
      subKey: 'N/A',
      channel: 'N/A'
    },
    {
      id: 'twitter',
      name: 'Twitter Stream',
      description:
        'A real-time stream of actual messages on Twitter.  For readability, capped at 10 tweets per second.',
      subKey: 'sub-c-d00e0d32-66ac-4628-aa65-a42a1f0c493b',
      //  OLD: "subKey": "sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe",
      channel: 'pubnub-twitter'
    },
    {
      id: 'wikipedia',
      name: 'Wikipedia Changes (Live)',
      description:
        'This data stream provides any recent modifications to the database of Wikipedia articles, en.wikipedia.org.',
      subKey: 'sub-c-83a959c1-2a4f-481b-8eb0-eab514c06ebf',
      //  OLD: "subKey": "sub-c-b0d14910-0601-11e4-b703-02ee2ddab7fe",
      channel: 'pubnub-wikipedia'
    },
    {
      id: 'gamestate',
      name: 'Game State Sync (Simulated)',
      description:
        'View the latest state information of a multi-player role playing game',
      subKey: 'sub-c-99084bc5-1844-4e1c-82ca-a01b18166ca8',
      //  OLD: "subKey": "sub-c-4377ab04-f100-11e3-bffd-02ee2ddab7fe",
      channel: 'pubnub-game-state'
    },
    {
      id: 'sensornetwork',
      name: 'Sensor Network (Simulated)',
      description: 'Mimic data from a network of outdoor field sensors',
      subKey: 'sub-c-99084bc5-1844-4e1c-82ca-a01b18166ca8',
      //  OLD: "subKey": "sub-c-4377ab04-f100-11e3-bffd-02ee2ddab7fe",
      channel: 'pubnub-sensor-network'
    },
    {
      id: 'marketorders',
      name: 'Market Orders (Simulated)',
      description:
        'Receive constantly updating market orders from a variety of financial securities',
      subKey: 'sub-c-99084bc5-1844-4e1c-82ca-a01b18166ca8',
      //  OLD: "subKey": "sub-c-4377ab04-f100-11e3-bffd-02ee2ddab7fe",
      channel: 'pubnub-market-orders'
    }
  ]
}
