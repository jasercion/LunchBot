Array = [];
    var itemArray = [];

    var args = JSON.stringify(e.parameters.text);
        //args = args.replace(/[^\w\s]/gi, '');
	    //var argsplit = args.split(" ");

    //var date = argsplit[0];
        var date = args;

    numArray.push(getRandomIntInclusive(2, sheet.getLastRow()))

    var options = 5;

    //if (argsplit[1] != "") {
        //  options = argsplit[1];
	    //}

    for (var i=1; i<options; i++) {
          var num = getRandomIntInclusive(2, sheet.getLastRow())
	        for (var j = 0; j < numArray.length; j++) {
		        if (num == numArray[j]){
			          num = getRandomIntInclusive(2, sheet.getLastRow());
				            j=0;
					            }
						          }
							        numArray.push(num);
								    }

    var date = e.parameter.text;
        for (i=0; i<numArray.length; i++){
	      itemArray.push(sheet.getRange('A'+numArray[i]).getValue()+", "+sheet.getRange('B'+numArray[i]).getValue());
	            }
		        sendMessage(date, itemArray);
			   }
			    return ContentService.createTextOutput("");
			    }

//Function to post messages to the channel by constructing a JSON payload
function sendMessage(date, itemArray){

  var item = [];
    var titleStrings = "";

  var emojiConvert = {0: ":zero:",
                        1: ":one:",
			                      2: ":two:",
					                            3: ":three:",
								                          4: ":four:",
											                        5: ":five:",
														                      6: ":six:",
																                            7: ":seven:",
																			                          8: ":eight:",
																						                        9: ":nine:"
																									                      };

  for (var i=0; i<itemArray.length; i++) {
      titleStrings+="\n"+emojiConvert[i+1]+" "+itemArray[i];
        }

  for (i=0; i<itemArray.length; i++) {
      item.push({
            name: "option"+i,
	          type: "button",
		        text: emojiConvert[1+i],
			      value: itemArray[i]
			            });
				      }


  var payload = {text: "*Where should we go to lunch on "+date+"?*", attachments: [{title: titleStrings, callback_id: "vote_Item", actions: item}]}

  var url = getProperty("SLACK_INCOMING_WEBHOOK");
    var options = {
        'method': 'post',
	    'payload': JSON.stringify(payload)
	      };

  UrlFetchApp.fetch(url, options);
  }


//return the value of the given script property

function getProperty(propertyName){
  return PropertiesService.getScriptProperties().getProperty(propertyName);
  }


//return the spreadsheet object

function getSheet(sheetname){
  return SpreadsheetApp.openById(getProperty("SPREADSHEET_ID")).getSheetByName(sheetname);
  }

//Get random int in range

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
    max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
      }


//Lookup user display name

function queryUserInfo(userID) {

  var payload = {token: getProperty("API_TOKEN"), user: userID};
    var url = "https://slack.com/api/users.info";
      var options = {
          'method': 'get',
	      'payload': payload
	        };

  var userInfo = JSON.parse(UrlFetchApp.fetch(url, options));

  return userInfo;
  }