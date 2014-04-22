var __billingBlockIsShowing = false;
var __selectedImgIndex = null;
var __selectedDate = "SEPT 21, 2012";
var __selectedTime = "12:00PM";
var __fbToken = null;

// ================== DOCUMENT READY ====================
$(document).ready(function() {
	detectCompatibility();
	initIntroSection();
	initImageSelectionSection();
	initEditSection();
	initFooter();
	setDefaultValues();
});


// ================== MISC ====================

function detectCompatibility() {
	if (!isCanvasSupported()) {
		$("#browserWarningMsg").css({
			"display": "block"
		});
	}
}

function isCanvasSupported() {
	var elem = document.createElement('canvas');
	return !!(elem.getContext && elem.getContext('2d'));
}

function setDefaultValues() {
	$("#date_text").html(__selectedDate);
	$("#time_text").html(__selectedTime);
}

// ================== INTRO SECTION ====================

function initIntroSection() {
	$("#createInviteBtn").click(function() {
		$("#introPanel_wrapper").animate({
			"opacity": 0
		}, 300, function() {
			$(this).css("display", "none");

			$("#selectImage_wrapper").css({
				"display": "block",
				"opacity": 0
			}).animate({
				"opacity": 1
			});
		});
	});
}




// ================== IMAGE SELECTION SECTION ====================

function initImageSelectionSection() {
	$(".imageSelectionItem").click(function() {
		$(".imageSelectionItem.selected").removeClass("selected");
		$(this).addClass("selected");

		var imgId = $(this).attr("id");
		var selectedIndex = imgId.substr(11);

		__selectedImgIndex = selectedIndex;

		$("#template_wrapper").css("background-image", "url(images/bgTemplate" + __selectedImgIndex + ".jpg)");

		if (__selectedImgIndex == "1" || __selectedImgIndex == "2") {
			$("#edit_wrapper").css("left", "455px");
			$("#calendar_marker").css("left", "250px");
		} else {
			$("#edit_wrapper").css("left", "47px");
			$("#calendar_marker").css("left", "350px");
		}

		$("#selectImage_wrapper").animate({
			"opacity": 0
		}, 300, function() {
			$(this).css("display", "none");
			$("#editAndSend_wrapper").css({
				"display": "block",
				"opacity": 0
			}).animate({
				"opacity": 1
			});
		});
	});
}



// ================== EDIT SECTION ====================

function initEditSection() {
	$("#message_text").bind("focusin", function() {
		$(this).parent().css({
			"background-color": "#FFFFFF"
		});
		$(this).next(".editCTA").css({
			"background-color": "transparent"
		}).html("DONE");
	});

	$("#message_text").bind("focusout", function() {
		$(this).parent().css({
			"background-color": "transparent"
		});
		$(this).next(".editCTA").css({
			"background-color": "#000000"
		}).html('<span class="editArrow"></span>EDIT');
	});

	$("#time_text").bind("focusin", function() {
		$(this).css({
			"color": "#333333"
		});
		$("#time_wrapper").css({
			"background-color": "#FFFFFF"
		});
		$("#time_wrapper .editCTA").css({
			"background-color": "transparent"
		}).html("DONE");
	});

	$("#time_text").bind("focusout", function() {
		$(this).css({
			"color": "#e2e2e2"
		});
		$("#time_wrapper").css({
			"background-color": "transparent"
		});
		$("#time_wrapper .editCTA").css({
			"background-color": "#000000"
		}).html('<span class="editArrow"></span>EDIT');
	});

	$("#selectAnImageBtn").click(function() {
		$("#editAndSend_wrapper").animate({
			"opacity": 0
		}, 300, function() {
			$("#editAndSend_wrapper").css({
				"display": "none"
			});
			$("#selectImage_wrapper").css({
				"display": "block",
				"opacity": 0
			}).animate({
				"opacity": 1
			});
		});
	});


	// ------------ calendar picker -------------- //
	var monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];

	$("#calendar_marker").glDatePicker({
		showAlways: false,
		cssName: "default",
		startDate: new Date("September 20, 2012"),
		allowOld: false,
		zIndex: 9999,
		position: "absolute",
		endDate: new Date("November 30, 2012"),
		onChange: function(target, newDate) {

			var formattedDate = monthNames[newDate.getMonth()] + " " + newDate.getDate() + ", " + newDate.getFullYear();

			__selectedDate = formattedDate;

			$("#date_text").html(__selectedDate);
		}
	});

	$("#date_wrapper").glDatePicker(); //??? keeps calendar in place when clicked
	$("#date_wrapper").click(function() {
		$("#calendar_marker").click();
	});


	// ------------ time field -------------- //
	$('#time_text').timeEntry({
		//spinnerImage: 'images/spinnerDefault.png',
		spinnerSize: [20, 20, 8],
		defaultTime: '12:00PM',
		initialField: 0,
		//timeSteps:  [1, 5, 0] ,
		ampmPrefix: '',
		spinnerImage: '',
		//setDatetime: '12/25/2009 11:30AM'
	});

	// Get the time entry form control.
	$('#time_text').timeEntry().change(function() {
		// Get time value from the control.
		inviteTime = $('#defaultEntry').val();
	});


	// ------------ facebook post -------------- //
	$('#fbPostPanelTrigger').fancybox({
		width: '324',
		height: '181',
		modal: 'true',
		padding: 0,
		margin: 0,
		beforeShow: function() {
			resestFBPostPanel();
		}
	});

	$("#fbPostBtn").click(function() {
		fbGalleryPostConnect();
	});

	$("#fbEventBtn").click(function() {
		fbEventPostConnect();
	});


	// ------------ EMAIL FORM -------------- //
	$('#emailBtn').fancybox({
		width: '324',
		height: '359',
		modal: 'true',
		padding: 0,
		margin: 0,
		beforeShow: function() {
			resetEmailForm();
		},
		afterShow: function() {
			$("#yourName").focus();
		}
	});

	$(".panelCloseBtn, #emailSuccessCloseBtn").click(function() {
		$.fancybox.close();
	});

	$("#emailFormSubmitBtn").click(function() {
		validateEmailForm();
	});
}






// ================== FOOTER ====================

function initFooter() {
	$('#filmCreditsBtn').click(function() {

		if (__billingBlockIsShowing != true) {
			showBillingBlock();
		} else {
			hideBillingBlock();
		}
	});
}

function hideBillingBlock() {
	$("#billing_panel").animate({
		"top": "114px"
	}, function() {
		$(this).css("display", "none");
	});

	$("#filmCreditsBtn").attr("class", "filmCreditsBtnUp");
	__billingBlockIsShowing = false;
}

function showBillingBlock() {
	$("#billing_panel").css("display", "block").animate({
		"top": "0px"
	});

	$("#filmCreditsBtn").attr("class", "filmCreditsBtnDown");
	__billingBlockIsShowing = true;
}



/*
 * ============================= FB EVENT =================================================
 */

function createEventWithPHP(name, startTime, endTime, location, description) {
	var eventData = {
		"access_token": fbtoken,
		"start_time": startTime,
		"end_time": endTime,
		"location": location,
		"name": name,
		"description": description,
		"privacy": "OPEN"
	}
	$.post("/events.php", eventData, function(response) {
		if (response) {
			alert("We have successfully created a Facebook event with ID: " + response);
		}
	})
}


function fbEventPostConnect() {

	FB.getLoginStatus(function(response) {

		if (!response.session) {
			FB.ui({
				method: "oauth",
				"perms": 'user_photos, publish_stream, create_event'
			}, function() {
				__fbToken = response.authResponse.accessToken;

				createMyEvent();
			});
		} else {

			__fbToken = response.authResponse.accessToken;

			createMyEvent();
		}



	});
}


function sendFBEvent() {

	var event = {
		token: __fbToken,
		name: 'Trouble with the Curve Event',
		description: $("#message_text").val(), //'Description of your event',
		location: 'Location of event',
		start_time: Math.round(new Date().getTime() / 1000.0), // Example Start Date
		end_time: Math.round(new Date().getTime() / 1000.0) + 86400 // Example End Date
	};

	FB.api('/me/events', 'post', event, function(response) {

		if (!response || response.error) {
			//console.info('Facebook could not create event.  Please try again');
		} else {
			//console.info('Facebook event created: ' + response.id);
			//http://facebook.com/events/253320941378247
		}
	});
}


function createEvent(name, startTime, endTime, location, description) {

	var eventData = {
		//"access_token": __fbToken,
		"start_time": startTime,
		//"end_time":endTime,
		//"location" : location,
		"name": name
		//"description":description,
		//"privacy":"OPEN"
	}
	FB.api("/me/events?access_token=" + __fbToken, 'post', eventData, function(response) {
		if (!response || response.error) {
			//alert("response.error = " + response.error);
			var s = "";
			var obj = response.error;
			for (var p in obj) {
				s += p + " = " + obj[p] + "\n";
			}
			alert(s);

		} else {
			//console.info("We have successfully created a Facebook event with ID: "+response.id);
			var s = "";
			var obj = response;
			for (var p in obj) {
				s += p + " = " + obj[p] + "\n";
			}
			alert(s);
		}
	})
}

function createMyEvent() {

	var name = "My Amazing Event";
	var startTime = "09/14/2012 06:00 AM";
	var endTime = "09/14/2012 06:00 PM";
	var location = "Dhaka";
	var description = "This is the event description";
	createEvent(name, startTime, endTime, location, description);
}


/*
 * ============================== FB POST ================================================
 */

function resestFBPostPanel() {

	$("#fbPostSuccess_wrapper, #fbPostCloseBtn, #fbPostErrorMsg").css({
		"display": "none"
	});
	$("#fbPostLoader").css({
		"display": "block"
	});
}

function fbGalleryPostConnect() {

	FB.getLoginStatus(function(response) {

		if (!response.session) {
			FB.ui({
				method: "oauth",
				"perms": 'user_photos, publish_stream, create_event'
			}, takeFBGalleryPostSnapshot);
		} else {
			takeFBGalleryPostSnapshot();
		}

	});
}


function takeFBGalleryPostSnapshot() {

	$("#fbPostPanelTrigger").click();

	var getvars = 'cardNo=' + __selectedImgIndex + '&msg=' + encodeURIComponent($("#message_text").val()) + '&date=' + $('#date_text').html() + '&time=' + $('#time_text').val();

	var iframe = $('<iframe id="snapshotIframe" src="php/createImage.php?' + getvars + '" style="display:none;position:absolute;left:5000px;"></iframe>');

	$('body').append(iframe);

	setTimeout(function() {
		var el = iframe[0];
		if (el.contentWindow) {
			el.contentWindow.setCallback(postToFBGallery);
		} else if (el.contentDocument) {
			el.contentDocument.setCallback(postToFBGallery);
		}
	}, 500);
}

function postToFBGallery(shareImgUrl) {
	FB.api('/me/photos', 'post', {
		message: $("#message_text").val() + " Let's watch it together on " + $('#date_text').html() + ' at ' + $('#time_text').val(),
		url: shareImgUrl
	}, function(response) {

		if (!response || response.error) {
			//console.info('Facebook could not upload photo.  Please try again');

			$("#fbPostErrorMsg, #fbPostCloseBtn").css({
				"display": "block"
			});
			$("#fbPostLoader").css({
				"display": "none"
			});
		} else {
			//console.info('Photo Uploaded with Post ID: ' + response.id);

			$("#fbPostSuccess_wrapper, #fbPostCloseBtn").css({
				"display": "block"
			});
			$("#fbPostLoader").css({
				"display": "none"
			});

			$("#fbPostSuccessViewBtn").unbind().bind("click", function() {
				window.open("http://www.facebook.com/photo.php?fbid=" + response.id, "fbPost" + response.id);
			});
		}
	});
}


/*
 * ============================== EMAIL SHARE ================================================
 */

function resetEmailForm() {
	$("#emailForm, #emailFormSubmitBtn").css("display", "block");
	$("#emailSuccessPanel, #emailProgressBar, #emailFormErrorMsg").css("display", "none");

	$("#yourName, #email").val("");
}

function validateEmailForm() {
	var maxEmails = 20;
	var errorMsg = "";

	var emailEntry = $("#email").val();
	var emailArray = emailEntry.split(",");

	if (emailArray.length > maxEmails) {
		errorMsg = "You have exceeded the number of allowed emails";
		$("#emailFormErrorMsg").html(errorMsg).css({
			"opacity": 0,
			"display": "block"
		}).animate({
			"opacity": 1
		});

		$("#email").focus();
		return false;
	}

	if ($("#yourName").val() == "") {
		errorMsg = "Please enter your name";
		$("#emailFormErrorMsg").html(errorMsg).css({
			"opacity": 0,
			"display": "block"
		}).animate({
			"opacity": 1
		});

		$("#yourName").focus();
		return false;
	}

	for (var i = 0; i < emailArray.length; i++) {

		var trimmedString = trimWhiteSpace(emailArray[i]);

		if (!isEmail(trimmedString)) {
			errorMsg = "Invalid email(s) entered. Please try again.";
			$("#emailFormErrorMsg").html(errorMsg).css({
				"opacity": 0,
				"display": "block"
			}).animate({
				"opacity": 1
			});

			$("#email").focus();
			return false;
		}
	}

	// this will run if success
	$("#emailFormSubmitBtn").css("display", "none");
	$("#emailProgressBar").css("display", "block");
	takeEmailSnapshot();
}


function takeEmailSnapshot() {
	var getvars = 'cardNo=' + __selectedImgIndex + '&msg=' + encodeURIComponent($("#message_text").val()) + '&date=' + $('#date_text').html() + '&time=' + $('#time_text').val();

	var iframe = $('<iframe id="snapshotIframe" src="php/createImage.php?' + getvars + '" style="display:none;position:absolute;left:5000px;"></iframe>');

	$('body').append(iframe);

	setTimeout(function() {
		var el = iframe[0];
		if (el.contentWindow) {
			el.contentWindow.setCallback(sendEmail);
		} else if (el.contentDocument) {
			el.contentDocument.setCallback(sendEmail);
		}
	}, 500);
}

function sendEmail(imgUrl) {

	var postData = {
		"imageUrl": encodeURIComponent(imgUrl),
		"yourName": $("#yourName").val(),
		"email": $("#email").val(),
		"cardNo": __selectedImgIndex
	};

	$.ajax({
		type: 'POST',
		url: 'php/eblastHandler.php',
		data: postData,
		dataType: "json",
		success: submitFormSuccess
	});

	//console.info("sendMail url: " + imgUrl);
}



function submitFormSuccess(data) {

	if (data.errors) {
		//console.info("had errors");
		$("#emailFormErrorMsg").html(data.errors).css("opacity", 0).animate({
			"opacity": 1
		});
		$("#emailProgressBar").css("display", "none");
		$("#emailFormSubmitBtn").css("display", "block");

	} else if (data.success) {

		//console.info("was success");
		$('#emailForm').css({
			"display": "none"
		});
		$("#emailSuccessPanel").css({
			"display": "block",
			"opacity": 0
		}).animate({
			"opacity": 1
		});
	}
}

function trimWhiteSpace(string) {
	return $.trim(string);
}

function isEmail(email) {
	var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return re.test(email);
}