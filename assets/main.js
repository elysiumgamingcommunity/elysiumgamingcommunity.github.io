$(function () {
	let iframe      = $('#pixiethemeframe');
	let	themeItem   = $('.theme-item');
	let deviceItem  = $('.device-item');
	let purchaseBtn = $('a.btn-purchase');
	let loader      = $('.loader');
	let urlParams = new URLSearchParams(window.location.search);

	if(urlParams.has('theme')) {
		setTimeout(function() {
			$('.theme-item[data-theme="' + urlParams.get('theme') + '"]').click();
		}, 300);
	} else {
		urlParams.set('theme', 'pixiehype');
	    var newRelativePathQuery = window.location.pathname + '?' + urlParams.toString();
	    history.pushState(null, '', newRelativePathQuery);
	}

	deviceItem.on('click', function(event) {
		if (addActiveClassToContext(deviceItem, $(this), event)) {
			iframe.attr('width', $(this).data('width'));
			iframe.attr('src');
		}
	});

	themeItem.on('click', function(event) {
		if (addActiveClassToContext(themeItem, $(this), event)) {
			loader.css({ display: 'flex' });
			purchaseBtn.attr('href', $(this).data('tfurl')).attr('href');
			iframe.attr('src', $(this).data('url')).attr('src');

			// Update query
			urlParams.set('theme', $(this).data('theme'));
		    var newRelativePathQuery = window.location.pathname + '?' + urlParams.toString();
		    history.pushState(null, '', newRelativePathQuery);
		}
	});

	purchaseBtn.on('click', function() {
		fbq('track', 'Purchase', {
			content_ids: urlParams.get('theme'),
		});
	});

	function addActiveClassToContext(item, context, event) {
		event.preventDefault();
		event.stopPropagation();
		if (context.hasClass('active')) {
			return;
		}

		item.removeClass('active');
		context.addClass('active');
		return true;
	};

	document.getElementById('pixiethemeframe').onload = function () {
		setTimeout(() => {
			loader.css({ display: 'none' });
		}, 500);
    };
});