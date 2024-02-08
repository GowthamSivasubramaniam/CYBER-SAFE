document.addEventListener("DOMContentLoaded", function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    var fetchedURL = activeTab.url;
    // fetch('http://54.198.2.223:5000/run_python_code', {
    fetch("http://localhost:5000/run_python_code", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: fetchedURL }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
          func(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // var resultText = document.getElementById('resultText');
        resultText.textContent = "Page is too busy, Retry after sometime.";
        // resultText.textContent = error;
      });
      function func(data)
      {   
        
        var resultText = document.getElementById("resultText");
        var resultText1 = document.getElementById("resultText1");
        var resultText2 = document.getElementById("resultText2");
        var resultText3 = document.getElementById("resultText3");
        var resultText4 = document.getElementById("resultText4");
        var resultText5 = document.getElementById("resultText5");
        var card = document.getElementById("card");
        if (data.result[0][0] != "No deception found")
        {
          card.style.display = "block";
          document.getElementById("but").style.display="block"
          document.getElementById("but1").style.display="block";
          document.getElementById("rcard").style.display="block"
          resultText.textContent = "Click on next to continue";
          document.getElementById("but").addEventListener('click',function()
          {
            fun();
          });
          document.getElementById("but1").addEventListener('click',function()
          {
            fun1();
          });
        var i=-1;
        function fun()
        { 
          
          if(i<data.result.length-1)
          {
            i+=1;
        resultText1.textContent = data.result[i][1];
        resultText.textContent = "Type : " + data.result[i][0];
        resultText2.textContent = data.result[i][3];
        resultText3.textContent = data.result[i][4];
        resultText4.textContent = data.result[i][5];
        resultText5.textContent = data.result[i][6];
       
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          function: function (data,i) {
            var v = data.result[i][7].length;
            var divElements = document.querySelectorAll(
              "." + data.result[i][7][v - 1]
            );
            
            var flaggedText=data.result[i][6];
            divElements.forEach(function (div) {
            if (div.textContent.includes(flaggedText)){
               div.scrollIntoView({
                alignToTop:'false',
                block:'center',
                behavior: "smooth",
              });
              div.style.borderStyle = "Solid";
              div.style.borderColor = "red";
              div.style.borderWidth = "3px";
              div.style.borderRadius = "5px";
              
            }
            });
          },
          args: [data,i],
        });
        
      }
        
      }
      function fun1()
      { 
        if(i>0)
        {
          i-=1;
        resultText1.textContent = data.result[i][1];
        resultText.textContent = "Type : " + data.result[i][0];
        resultText2.textContent = data.result[i][3];
        resultText3.textContent = data.result[i][4];
        resultText4.textContent = data.result[i][5];
        resultText5.textContent = data.result[i][6];
       
        chrome.scripting.executeScript({
          target: { tabId: activeTab.id },
          function: function (data,i) {
            var v = data.result[i][7].length;
            var divElements = document.querySelectorAll(
              "." + data.result[i][7][v - 1]
            );
            document.querySelector("." + data.result[i][7][v - 1]).scrollIntoView({
              behavior: "smooth",
            }); 
          },
          args: [data,i],
        });
       
      }
        
      }

      }
      }
  });
});
