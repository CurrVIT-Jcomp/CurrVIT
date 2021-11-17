App = {
  web3Provider: null,
  contracts: {},
  account: '0',
  loading: false,
  tokenPrice: 1000000000000000, //in wei
  tokensSold: 0,
  tokensAvailable: 750000,

  init: function() {
    console.log("App initialized...")
    return App.initWeb3();
  },

  initWeb3: function() {
  
      //web3 instance
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    
    return App.initContracts();
  },

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if(err === null) {
        App.account = account;
        $('#accountAddress')
      }
    })

    // Load token sale contract
    App.contracts.CurrVITSale.deployed().then(function(instance) {
      CurrVITSaleInstance = instance;
      return CurrVITSaleInstance.tokenPrice();
    })

      

      // Load token contract
      App.contracts.CurrVIT.deployed().then(function(instance) {
        CurrVITInstance = instance;
        return CurrVITInstance.balanceOf(App.account);
      }).then(function(balance) {
        $('.dapp-balance').html(balance.toNumber());
        App.loading = false;
        loader.hide();
        content.show();
      })
    });
  },

  
    

$(function() {
  $(window).load(function() {
    App.init();
  })
});
