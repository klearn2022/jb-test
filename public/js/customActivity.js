define(["postmonger"], function (Postmonger) {
    "use strict";
  
    var connection = new Postmonger.Session();
    var authTokens = {};
    var payload = null;
    $(window).ready(onRender);
  
    connection.on("initActivity", initialize);
    connection.on("requestedTokens", onGetTokens);
    connection.on("requestedEndpoints", onGetEndpoints);
    connection.on("requestedInteraction", onRequestedInteraction);
    connection.on(
      "requestedTriggerEventDefinition",
      onRequestedTriggerEventDefinition
    );
    connection.on("requestedDataSources", onRequestedDataSources);
  
    connection.on("clickedNext", save);
  
    function onRender() {
      // JB will respond the first time 'ready' is called with 'initActivity'
      connection.trigger("ready");
  
      connection.trigger("requestTokens");
      connection.trigger("requestEndpoints");
      connection.trigger("requestInteraction");
      connection.trigger("requestTriggerEventDefinition");
      connection.trigger("requestDataSources");
    }
  
    function onRequestedDataSources(dataSources) {
      console.log("*** requestedDataSources ***");
      console.log(dataSources);
    }
  
    function onRequestedInteraction(interaction) {
      console.log("*** requestedInteraction ***");
      console.log(interaction);
    }
  
    function onRequestedTriggerEventDefinition(eventDefinitionModel) {
      console.log("*** requestedTriggerEventDefinition ***");
      console.log(eventDefinitionModel);
    }

  
    function initialize(data) {
      console.log("Initialize Data:");
      console.log(data);

      if (data) {
        payload = data;
      }
  
      var hasInArguments = Boolean(
        payload["arguments"] &&
          payload["arguments"].execute &&
          payload["arguments"].execute.inArguments &&
          payload["arguments"].execute.inArguments.length > 0
      );
  
      var inArguments = hasInArguments
        ? payload["arguments"].execute.inArguments
        : {};
  
      console.log("inArguments: ");
      console.log(inArguments);
  
      // $.each(inArguments, function (index, inArgument) {
      //   $.each(inArgument, function (key, val) {});
      // });
  
      // connection.trigger("updateButton", {
      //   button: "next",
      //   text: "done",
      //   visible: true,
      // });
    }
  
    function onGetTokens(tokens) {
      console.log("Tokens: ");
      console.log(tokens);

      authTokens = tokens;
    }
  
    function onGetEndpoints(endpoints) {
      console.log("endpoints: ");
      console.log(endpoints);

    }
  
    function save() {
      
      let testInputValue = $("#all").val();

      console.log("payload in save fun: ");
      console.log(payload);


      payload["arguments"].execute.inArguments =  [
        {
          emailAddress: payload["arguments"].execute.inArguments[0].emailAddress
        },
        {
          test: testInputValue
        }
      ];
  
      payload["metaData"].isConfigured = true;
  
      
      connection.trigger("updateActivity", payload);
      console.log('Final payload["arguments"].execute.inArguments in save fun: ');

      for(let i=0;i<payload["arguments"].execute.inArguments.length; i++){
        console.log(payload["arguments"].execute.inArguments[i]);
      }

      //let funRes = updateInArguments();

    //body of function

    let newInArgs = [];
      newInArgs.push({emailAddress: payload["arguments"].execute.inArguments[0].emailAddress});

      if(testInputValue === 'all'){

      $('checkbox').not('#all').each(function(i,el){
        
        console.log("Element: " + el);

        newInArgs.push(`{$el.val()}: {{Interaction.ActivityCustomerKey.{$el.val()}}}`);

      });

      }else{

      $('checkbox').checked().not('#all').each(function(i,el){

        console.log("Element: " + el);
        newInArgs.push(`{$el.val()}: {{Interaction.ActivityCustomerKey.{$el.val()}}}`);

      });

      }

      console.log("newInArgs: " + newInArgs);

    }
  });
  

  function updateInArguments(){

    let testInputValue = $("#all").val();
      console.log("testInputValue: " + testInputValue)

    let newInArgs = [];
      newInArgs.push({emailAddress: payload["arguments"].execute.inArguments[0].emailAddress});

      if(testInputValue === true){

      $('checkbox').not('#all').each(function(i,el){
        
        console.log("Element: " + el);

        newInArgs.push(`{$el.val()}: {{Interaction.ActivityCustomerKey.{$el.val()}}}`);

      });
        return newInArgs;

      }else{

      $('checkbox').checked().not('#all').each(function(i,el){

        console.log("Element: " + el);
        newInArgs.push(`{$el.val()}: {{Interaction.ActivityCustomerKey.{$el.val()}}}`);

      });

        return newInArgs;

      }



  }