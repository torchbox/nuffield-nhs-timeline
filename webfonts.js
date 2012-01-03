/*
 * MyFonts Webfont Build ID 150272, 2010-11-26T04:32:40-0500
 *
 * The fonts listed in this notice are subject to the End User License
 * Agreement(s) entered into by the website owner. All other parties are
 * explicitly restricted from using the Licensed Webfonts(s).
 *
 * You may obtain a valid license at the urls below.
 *
 * Webfont: Futura Demi
 * Url: http://new.myfonts.com/fonts/paratype/futura-book/futura-demi/
 * Foundry: ParaType
 * Copyright: Copyright (c) 1990-2008 ParaType, Inc. All Rights Reserved.
 * License: http://www.myfonts.com/viewlicense?1056
 * Licensed pageviews: 10,000/month
 * CSS font-family: FuturaPTDemi-Reg
 * CSS font-weight: normal
 *
 * (c) 2010 Bitstream, Inc
*/



// change this to false if you're having trouble with WOFFs
var woffEnabled = true;


var scripts = document.getElementsByTagName("SCRIPT");
var script = scripts[scripts.length-1].src;

// safari 3.1: data-css
// firefox 3.6+: woff
// firefox 3.5+: data-css
// chrome 4+: data-css
// chrome 6+: woff
// IE 5+: eot
// IE 9: woff
// opera 10.1+: data-css
// mobile safari: svg



var browserName, browserVersion, webfontType;

var webfontTypeOverride;

if (/webfont=(woff|ttf|eot)/.test(window.location.search))
{
	webfontTypeOverride = RegExp.$1;

	if (webfontTypeOverride == 'ttf')
		webfontTypeOverride = 'data-css';
}

if (/MSIE (\d+\.\d+)/.test(navigator.userAgent))
{
	browserName = 'MSIE';
	browserVersion = new Number(RegExp.$1);
	if (browserVersion >= 9.0 && woffEnabled)
		webfontType = 'woff';
	else if (browserVersion >= 5.0)
		webfontType = 'eot';
}

else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent))
{
	browserName = 'Firefox';
	browserVersion = new Number(RegExp.$1);
	if (browserVersion >= 3.6 && woffEnabled)
		webfontType = 'woff';
	else if (browserVersion >= 3.5)
		webfontType = 'data-css';
}

else if (/Chrome\/(\d+\.\d+)/.test(navigator.userAgent)) // must check before safari
{
	browserName = 'Chrome';
	browserVersion = new Number(RegExp.$1);

	if (browserVersion >= 6.0 && woffEnabled)
		webfontType = 'woff';

	else if (browserVersion >= 4.0)
		webfontType = 'data-css';
}

else if (/Mozilla.*(iPhone|iPad).*AppleWebKit.*Safari/.test(navigator.userAgent))
{
	browserName = 'MobileSafari';
	webfontType = 'svg';
}

else if (/Safari\/(\d+\.\d+)/.test(navigator.userAgent))
{
	browserName = 'Safari';
	if (/Version\/(\d+\.\d+)/.test(navigator.userAgent))
	{
		browserVersion = new Number(RegExp.$1);
		if (browserVersion >= 3.1)
			webfontType = 'data-css';
	}
}

else if (/Opera\/(\d+\.\d+)/.test(navigator.userAgent))
{
	browserName = 'Opera';
	if (/Version\/(\d+\.\d+)/.test(navigator.userAgent))
	{
		browserVersion = new Number(RegExp.$1);
		if (browserVersion >= 10.1)
			webfontType = 'data-css';
	}
}

if (!webfontType)
{
	// use flash?
}

if (webfontTypeOverride)
	webfontType = webfontTypeOverride;

switch (webfontType)
{
		case 'eot':
		document.write("<style>\n");
				document.write("@font-face {font-family:\"FuturaPTDemi-Reg\";src:url(\"fonts.eot\");}\n");
				document.write("</style>");
		break;

		case 'woff':
		document.write("<style>\n");
				document.write("@font-face {font-family:\"FuturaPTDemi-Reg\";src:url(\"fonts.woff\") format(\"woff\");}\n");
				document.write("</style>");
		break;

		case 'data-css':
		document.write("<link rel='stylesheet' type='text/css' href='fonts.css'>");
		break;


	default:
		webfontType = 'default';
		break;
}