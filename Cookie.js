/**
 * Класс для управления cookie
 * @returns
 */
function Cookie() {}

/**
 * Установка cookie
 * @param {String} name название cookie
 * @param {String} value значение cookie
 * @param {Array} options параменты: expires - время жизни (число или объект типа Date), path - путь для cookie, domain - домен для cookie, secure - если true, то пересылать cookie только по защищённому соединению
 * @returns {void}
 */
Cookie.set=function(name, value, options) {
	options = options || {};

	var expires = options.expires;

	if (typeof expires == "number" && expires) {
		var d = new Date();
		d.setTime(d.getTime() + expires * 1000);
		expires = options.expires = d;
	}
	if (expires && expires.toUTCString) {
		options.expires = expires.toUTCString();
	}

	value = encodeURIComponent(value);

	var updatedCookie = name + "=" + value;

	for (var propName in options) {
		updatedCookie += "; " + propName;
		var propValue = options[propName];
		if (propValue !== true) {
			updatedCookie += "=" + propValue;
		}
	}

	document.cookie = updatedCookie;
}

/**
 * Получение cookie
 * @param {String} name название cookie
 * @returns {void}
 */
Cookie.get = function (name) {
	var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
			));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * Удаление cookie
 * @param {String} name название cookie
 * @returns {void}
 */
Cookie.delete=function(name) {
	setCookie(name, "", {
		expires: -1
	});
}


