(function () {
	'use strict'

	var dt = document.getElementsByTagName('dt'),
		duration = 1000,
		ddPadding = 10,
		easingSqrt = function (t, b, c, d) {
			t /= d;
			t--;
			return c * Math.sqrt(1 - t * t) + b
		},
		easingLiner = function (t, b, c, d) {
			return c * t / d + b;
		};

	var isAnimate = false;

	for (var i = 0; i < dt.length; i++) {

		var accordion = function () {
			if (isAnimate === false) {
				isAnimate = true;

				var dd = this.nextElementSibling,
					ddStyle = dd.style,
					ddScr = dd.scrollHeight + ddPadding * 2,
					ddopac = ddStyle.opacity,
					start = new Date() * 1,
					toggle = function () {
						var current = new Date() - start;
						if (dd.classList.contains('opened') === false) {

							var H = easingSqrt(current, 0, ddScr, duration),
								P = easingLiner(current, 0, ddPadding, duration),
								opacity = easingLiner(current, ddopac, 1, duration);
							ddStyle.height = H + 'px';
							ddStyle.paddingTop = P + 'px';
							ddStyle.paddingBottom = P + 'px';
							ddStyle.opacity = opacity;
							if (current >= duration) {
								clearInterval(toggleFn);
								ddStyle.height = 'auto';
								ddStyle.paddingTop = ddPadding + 'px';
								ddStyle.paddingBottom = ddPadding + 'px';
								ddStyle.opacity = '1';
								dd.classList.add('opened');
								isAnimate = false;
								return;
							}
						} else {
							var H = easingSqrt(current, 0, ddScr, duration),
								P = easingSqrt(current, 0, ddPadding, duration),
								opacity = easingLiner(current, ddopac, 0.5, duration);
							ddStyle.height = ddScr - H + 'px';
							ddStyle.opacity = ddopac - opacity;
							ddStyle.paddingTop = ddPadding - P + 'px';
							ddStyle.paddingBottom = ddPadding - P + 'px';
							//console.log(H);
							//console.log(opacity);
							if (current >= duration) {
								clearInterval(toggleFn);
								ddStyle.height = '0';
								ddStyle.opacity = '0';
								ddStyle.border = 'none';
								ddStyle.paddingTop = '0';
								ddStyle.paddingBottom = '0';
								dd.classList.remove('opened')
								isAnimate = false;
								return;
							}

						}
					},
					toggleFn = setInterval(toggle, 16);
				ddStyle.border = 'solid 1px #444444';
			}
		};


		dt[i].addEventListener('click', accordion);

	}
})();
