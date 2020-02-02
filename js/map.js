ymaps.ready(init);

var burgerMap;

function init (){
	burgerMap = new ymaps.Map("map", {
        center: [59.91815364, 30.30557800],
        zoom: 9
    });

	var mPlacemark = new ymaps.Placemark(
		[55.75399400, 37.62209300], {
		hintContent: 'Санкт-Петербург',
		balloonContent: '<div style="background: white; font-size: 16px; font-weight: 600; color: red;">Столица Башкирии</div>'
	});

	burgerMap.geoObjects.add(mPlacemark);
	mPlacemark.balloon.open();
}

