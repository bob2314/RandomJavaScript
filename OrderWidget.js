////////////////////////////////////////////////////////////////////////////////////////////////////
//	DVD Purchase Data - Used in the order widget and the products detail
////////////////////////////////////////////////////////////////////////////////////////////////////
var dvdPurchaseData = {
	Editions : [
		{
			id : 0,
			name : "5-Disc Super Set",
			retailers : [
				{
					id : 0,
					name : "Amazon",
					link : "http://disney.go.com/guestservices/disclaimers/redirect?destination=http://www.amazon.com/Finding-Five-Disc-Ultimate-Collectors-Edition/dp/B00867GHS8/ref=sr_1_3?ie=UTF8&qid=1351802465&sr=8-3&keywords=finding+nemo/",
					tracking : "exit/nem/product/dvd/ultimatebd/amazon/"
				},
					{
					id : 0,
					name : "Target",
					link : "http://disney.go.com/guestservices/disclaimers/redirect?destination=http://www.target.com/p/finding-nemo-5-discs-includes-digital-copy-3d-2d-blu-ray-dvd/-/A-14225622#prodSlot=medium_1_2&term=finding%20nemo%20dvd/",
					tracking : "exit/nem/product/dvd/ultimatebd/target/"
				},
					{
					id : 0,
					name : "Walmart",
					link : "http://disney.go.com/guestservices/disclaimers/redirect?destination=http://www.walmart.com/ip/Finding-Nemo-3D-Blu-ray-2-Disc-Blu-ray-DVD-Digital-Copy-Widescreen/21015708/",
					tracking : "exit/nem/product/dvd/ultimatebd/walmart/"
				}
			]
		},
		{
			id : 1,
			name : "3-Disc Combo Pack In Blu-ray&trade; Packaging",
			retailers : [
				{
					id : 0,
					name : "Amazon",
					link : "http://disney.go.com/guestservices/disclaimers/redirect?destination=http%3A%2F%2Fwww.amazon.com%2FFinding-Nemo-Three-Disc-Collectors-Edition%2Fdp%2FB00867GJYK%2F",
					tracking : "exit/nem/product/dvd/collectorsbd/amazon/"
				},
				{
					id : 1,
					name : "Walmart",
					link : "http://disney.go.com/guestservices/disclaimers/redirect?destination=http%3A%2F%2Fwww.walmart.com%2Fip%2F21015706%2F",
					tracking : "exit/nem/product/dvd/collectorsbd/walmart/"
				},
				{
					id : 2,
					name : "Target",
					link : "http://disney.go.com/guestservices/disclaimers/redirect?destination=http%3A%2F%2Fwww.target.com%2Fp%2Ffinding-nemo-3-discs-includes-digital-copy-blu-ray-dvd%2F-%2FA-14155251%23prodSlot%3Dmedium_1_1%26term%3Dfinding%2520nemo%2520dvd%2F",
					tracking : "exit/nem/product/dvd/collectorsbd/target/"
				},
				{
					id : 3,
					name : "Best Buy",
					link : "http://disney.go.com/guestservices/disclaimers/redirect?destination=http%3A%2F%2Fwww.bestbuy.com%2Fsite%2FFinding%2BNemo%2B%282%2BDisc%29%2B-%2BWidescreen%2B-%2BBlu-ray%2BDisc%2F6965336.p%3Fid%3D1325489%26skuId%3D6965336%26st%3Dfinding%2520nemo%26lp%3D3%26cp%3D1",
					tracking : "exit/nem/product/dvd/collectorsbd/bestbuy/"
				},
				{
					id : 4,
					name : "Kmart",
					link : "http://disney.go.com/guestservices/disclaimers/redirect?destination=http%3A%2F%2Fentertainment.kmart.com%2Ffinding-nemo%2F786936828238",
					tracking : "exit/nem/product/dvd/collectorsbd/kmart/"
				}				
				
			]
		},
		{
			id : 2,
			name : "3-Disc Combo Pack In DVD Packaging",
			retailers : [
				{
					id : 0,
					name : "Amazon",
					link : "http://disney.go.com/guestservices/disclaimers/redirect?destination=http%3A%2F%2Fwww.amazon.com%2FFinding-Nemo-Three-Disc-Collectors-Packaging%2Fdp%2FB00867GK26%2Fref%3Dsr_1_4%3Fs%3Dmovies-tv%26ie%3DUTF8%26qid%3D1354224424%26sr%3D1-4%26keywords%3Dfinding%2Bnemo",
					tracking : "exit/nem/product/dvd/collectorsdvd/amazon/"
				},
				{
					id : 0,
					name : "Walmart",
					link : "http://disney.go.com/guestservices/disclaimers/redirect?destination=http%3A%2F%2Fwww.walmart.com%2Fip%2F21015709%2F",
					tracking : "exit/nem/product/dvd/collectorsdvd/walmart/"
				},
				{
					id : 0,
					name : "Target",
					link : "http://disney.go.com/guestservices/disclaimers/redirect?destination=http%3A%2F%2Fwww.target.com%2Fp%2Ffinding-nemo-3-discs-dvd-blu-ray%2F-%2FA-14155249%23prodSlot%3Dmedium_1_3%26term%3Dfinding%2520nemo%2520dvd%2F",
					tracking : "exit/nem/product/dvd/collectorsdvd/amazon/"
				}
			]
		},
		{
			id : 3,
			name : "HD Digital",
			retailers : [
				{
					id : 0,
					name : "iTunes",
					link : "http://disney.go.com/guestservices/disclaimers/redirect?destination=https://itunes.apple.com/us/movie/finding-nemo/id255295077",
					tracking : "exit/nem/product/dvd/collectorsbd/itunes/"
				}
			]
		}
	]
};


////////////////////////////////////////////////////////////////////////////////////////////////////
//	Order Widget
////////////////////////////////////////////////////////////////////////////////////////////////////
function OrderWidget(scope){
	var _window = scope;
	var _this = this;
	var _target;
	var _type;
	var currentEditionNum = 0;
	var currentRetailerNum = 0;
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	//	Public Methods
	////////////////////////////////////////////////////////////////////////////////////////////////
	this.init = function(target, type){
		_target = target||"body";
		_type = type||"ticket";
	};
	
	
	this.activate = function(){
		switch(_type){
			case "ticket":
				setBackgroundImage(_target, "global/orange_ticket_widget_bg.png", "no-repeat 0px 0px");
				activateTickets();
				break;
			case "dvd":
				setBackgroundImage(_target, "global/dvd_widget_bg.png", "no-repeat 0px 0px");
				activateDVDs();
				break;
			default:
				setBackgroundImage(_target, "global/orange_ticket_widget_bg.png", "no-repeat 0px 0px");
				activateTickets();
				break;
		}
	};
	
	
	this.showSpecialBG = function(){
		
		// Set up the black shadow bg...
		var top = $(_window).scrollTop();
		$("#shadow").css({
			'height': ($("body").height() + top)
		}).show();
		F
		
		// Set up click handler so we know when shadow is closed.
		$("#shadow").on("click.shadowOff", _this.hideSpecialBG);
		
		
		// Move the order widget to the top.
		$(_target).css({'z-index': '1000000001'});
		
		
		// Switch out the background.
		if (_type == "dvd") setBackgroundImage(_target, "global/dvd_widget_deep_bg.png", "no-repeat 0px 0px");

		
		// Setup the close button.
		$(_target).append('<div class="ticketsCloseButton" id="ticketClose"></div>');
		nemoButton("smallYellow", ".ticketsCloseButton", "tickets_close_button", 30, "X", null);
		$("#ticketClose").on("click.closeTickets", function(){
			_this.hideSpecialBG();
			_window.closeShadowboxes();
		});
	};
	
	
	this.hideSpecialBG = function(){
		
		if (_type == "ticket") setBackgroundImage(_target, "global/o.png", "no-repeat 0px 0px");
		else if (_type == "dvd") setBackgroundImage(_target, "global/dvd_widget_bg.png", "no-repeat 0px 0px");
		
		$("#ticketClose").off(".closeTickets");
		$("#ticketClose").hide();
	};
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	//	Private Methods - Tickets
	////////////////////////////////////////////////////////////////////////////////////////////////
	var activateTickets = function(){
		var html = '' +
		'<form id="ticketForm">' + 
			'<div id="ticketSubmit"></div>' +
		'</form>';
		
		$(_target).empty().html(html);
		
		nemoButton("smallYellow", _target+" #ticketSubmit", "ticket_submit", 170, "Find Tickets Now", "disclosure");
		$(_target+" #ticketSubmit").css("position", "relative");
		$(_target+" #ticketSubmit").on("click", openMovieConnectWidget);
	};
	
	
	////////////////////////////////////////////////////////////////////////////////////////////////
	//	Private Methods - DVD Ordering
	////////////////////////////////////////////////////////////////////////////////////////////////
	var activateDVDs = function(){
		var html = '' +
		'<div class="dvdWidgetBank">' + 
			'<div class="ownItToday">Reserve your copy now</div>' +
			'<div class="dvdDropdownBank">' +
				'<div id="dvdPurchaseButton"></div>' +
				'<div class="dvdWidgetLabel">EDITION:</div>' + 
				'<select class="dvdDropdown" id="dvdDropdownEdition"></select>' +
				'<div class="dvdWidgetLabel" id="dvdFromText">FROM:</div>' + 
				'<select class="dvdDropdown" id="dvdDropdownRetailer"></select>' +
			'</div>' +
		'</div>';
		
		$(_target).empty().html(html);
		
		nemoButton("smallYellow", _target + " #dvdPurchaseButton", "dvd_purchase_button", 150, "Order Now", "disclosure");
		$("#dvdPurchaseButton").css("position", "relative");
		$("#dvdPurchaseButton").on("click", findDVDClick);
		
		// add all of the editions to the dropdown
		var editionHtml = '';
		for (var a = 0; a < dvdPurchaseData.Editions.length; a++)
		{
			var thisEdition = dvdPurchaseData.Editions[a];
			editionHtml += '<option value=' + thisEdition.id + '>' + thisEdition.name + '</option>';
		}
		$("#dvdDropdownEdition").empty().html(editionHtml);
		
		// add the retailer data based upon the currentEditionNum
		var retailerHtml = '';
		for (var b = 0; b < dvdPurchaseData.Editions[currentEditionNum].retailers.length; b++)
		{
			var thisRetailer = dvdPurchaseData.Editions[currentEditionNum].retailers[b];
			retailerHtml += '<option value=' + thisRetailer.id + '>' + thisRetailer.name + '</option>';
		}
		$("#dvdDropdownRetailer").empty().html(retailerHtml);
		
		// update the menus upon change
		$("#dvdDropdownEdition").change(function() {
			currentEditionNum = this.selectedIndex;
			updateRetailerDropdown();
		});
		
		$("#dvdDropdownRetailer").change(function() {
			currentRetailerNum = this.selectedIndex;
		});
	};
	
	var updateRetailerDropdown = function() {
		currentRetailerNum = 0;
		var retailerHtml = '';
		var thisEdition = dvdPurchaseData.Editions[currentEditionNum];
		for (var a = 0; a < dvdPurchaseData.Editions[currentEditionNum].retailers.length; a++)
		{
			var thisRetailer = dvdPurchaseData.Editions[currentEditionNum].retailers[a];
			retailerHtml += '<option>' + thisRetailer.name + '</option>';
		}
		$("#dvdDropdownRetailer").empty().html(retailerHtml);
	};
	
	var findDVDClick = function(event){
		trackLink({ id : dvdPurchaseData.Editions[currentEditionNum].retailers[currentRetailerNum].tracking + "widget" });
		window.open(dvdPurchaseData.Editions[currentEditionNum].retailers[currentRetailerNum].link, "_blank");
		_this.hideSpecialBG();
		_window.closeShadowboxes();
	};
};


////////////////////////////////////////////////////////////////////////////////////////////////////
//	Return Type
////////////////////////////////////////////////////////////////////////////////////////////////////
OrderWidget.prototype.toString = function(){
	 return ("[object OrderWidget]");
}