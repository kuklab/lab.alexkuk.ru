
var METRO = [
    [55.765057, 37.605000],
    [55.769907, 37.596159],
    [55.777079, 37.586632],
    [55.800452, 37.532730],
    [55.805056, 37.515650],
    [55.827196, 37.437630],
    [55.808975, 37.463551],
    [55.729826, 37.472091],
    [55.741274, 37.416000],
    [55.756803, 37.408104],
    [55.736183, 37.516851],
    [55.751812, 37.609806],
    [55.765493, 37.637444],
    [55.772138, 37.632465],
    [55.774785, 37.654052],
    [55.789304, 37.680016],
    [55.808006, 37.638474],
    [55.796375, 37.714520],
    [55.783189, 37.719154],
    [55.782413, 37.705250],
    [55.814499, 37.734776],
    [55.788716, 37.742844],
    [55.748748, 37.533417],
    [55.736420, 37.594872],
    [55.741468, 37.626114],
    [55.727195, 37.580109],
    [55.707185, 37.585430],
    [55.708837, 37.622509],
    [55.669858, 37.553673],
    [55.692220, 37.533760],
    [55.676471, 37.505093],
    [55.656532, 37.540970],
    [55.641936, 37.525692],
    [55.632787, 37.519512],
    [55.663050, 37.481918],
    [55.618280, 37.505779],
    [55.611853, 37.604485],
    [55.568000, 37.576504],
    [55.621007, 37.668686],
    [55.635805, 37.655983],
    [55.610002, 37.717781],
    [55.612826, 37.745075],
    [55.620520, 37.744217],
    [55.632690, 37.766361],
    [55.650208, 37.744560],
    [55.659256, 37.751083],
    [55.675498, 37.761726],
    [55.705436, 37.765846],
    [55.717192, 37.793655],
    [55.715152, 37.818031],
    [55.751854, 37.817688],
    [55.751369, 37.787132],
    [55.744963, 37.863522],
    [55.758605, 37.659159],
    [55.861658, 37.435226],
    [55.850527, 37.440376],
    [55.840071, 37.487240],
    [55.854593, 37.475910],
    [55.825543, 37.494965],
    [55.840845, 37.522430],
    [55.835326, 37.574100],
    [55.863497, 37.604656],
    [55.884395, 37.602425],
    [55.898804, 37.587318],
    [55.870271, 37.664566],
    [55.887587, 37.661648],
    [55.810235, 37.798977],
    [55.706894, 37.516251],
    [55.697954, 37.498569],
    [55.820893, 37.640533],
    [55.780570, 37.633324],
    [55.792794, 37.587833],
    [55.743756, 37.497883],
    [55.639795, 37.606030],
    [55.636687, 37.594700],
    [55.706223, 37.657185],
    [55.652744, 37.619505],
    [55.793618, 37.493420],
    [55.761612, 37.625170],
    [55.767919, 37.621651],
    [55.678130, 37.663364],
]

var METRO_ICON = L.icon({
    iconUrl: 'i/metro.svg',
    iconSize: [10, 7],
    iconAnchor: [5, 3],
});

var SHOPS = [
    [55.696117, 37.665038],
    [55.706880, 37.592082],
    [55.790544, 37.531335],
    [55.747835, 37.706838],
    [55.729462, 37.734647],
    [55.603119, 37.490845],
    [55.767268, 37.380574],
    [55.846107, 37.661519],
    [55.786010, 37.665811],
    [55.811916, 37.831893],
    [55.653758, 37.844810],
    [55.586398, 37.724497],
    [55.855449, 37.478485],
    [55.909834, 37.539983],
    [55.916527, 37.540069],
    [55.794494, 37.592854],
    [55.741089, 37.503934],
    [55.652792, 37.598391],
    [55.704791, 37.640491],
    [55.664129, 37.627616],
    [55.610644, 37.606931],
    [55.659327, 37.741685],
]

var SHOP_ICON = L.icon({
    iconUrl: 'i/cart.svg',
    iconSize: [11, 10],
    iconAnchor: [5, 4],
});

var TRAINS = [
    [55.776594, 37.657185],
    [55.776358, 37.579594],
    [55.743410, 37.567062],
    [55.757295, 37.660532],
    [55.795148, 37.587833],
]

var TRAIN_ICON = L.icon({
    iconUrl: 'i/train.svg',
    iconSize: [9, 12],
    iconAnchor: [5, 6],
});


var OFFSET = 0.17915;


function markers(points, icon) {
    var markers = []
    points.forEach(function (point) {
    	var latitude = point[0];
    	var longitude = point[1];
    	var marker = L.marker(
    	    [latitude - OFFSET, longitude],
    	    {icon: icon, opacity: 0.8}
    	)
	markers.push(marker);
    });
    return markers;
}


var METRO_MARKERS = markers(METRO, METRO_ICON)
var SHOP_MARKERS = markers(SHOPS, SHOP_ICON)
var TRAIN_MARKERS = markers(TRAINS, TRAIN_ICON)

var ARBAT = L.polyline(
    [[55.752798 - OFFSET, 37.600652],
     [55.752508 - OFFSET, 37.583314]],
    {color: 'white', opacity: 0.8}
)


function viz(div, image, center=undefined) {
    if (center == undefined) {
	center = [55.750475 - OFFSET, 37.621766];
    }
    var map = L.map(div).setView(
	center,
	11
    );

    L.tileLayer('https://vec02.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}&scale=2').addTo(map);

    var overlay = L.imageOverlay(
	image,
	[[55.933 - OFFSET, 37.255],
	 [55.555 - OFFSET, 37.947]],
	{attribution: '<a href="http://maps.yandex.ru">Яндекс</a>'}
    ).addTo(map);

    return map
}


function show(markers, map) {
    markers.forEach(function(marker) {
	marker.addTo(map);
    });
}

function hide(markers) {
    markers.forEach(function(marker) {
	marker.remove();
    });
}

var MAP = viz('m21', 'i/21.png');
viz('m16', 'i/16.png', [55.804598 - OFFSET, 37.636398]);


var METRO_CHECK = $('input[name="metro"]');
var SHOP_CHECK = $('input[name="shop"]');
var TRAIN_CHECK = $('input[name="train"]');

var METRO_LINK = $('a[name="metro"]');
var SHOP_LINK = $('a[name="shop"]');
var TRAIN_LINK = $('a[name="train"]');

var METRO_CHECKED = false;
var SHOP_CHECKED = false;
var TRAIN_CHECKED = false;

var CHECKED = [false, false, false];

[[METRO_CHECK, METRO_LINK, METRO_MARKERS],
 [SHOP_CHECK, SHOP_LINK, SHOP_MARKERS],
 [TRAIN_CHECK, TRAIN_LINK, TRAIN_MARKERS]].forEach(function(record, index) {
     var check = record[0];
     var link = record[1];
     var markers = record[2];
     check.change(function() {
	 if(this.checked) {
	     show(markers, MAP);
	     CHECKED[index] = true;
	 } else {
	     hide(markers)
	     CHECKED[index] = false;
	 }
     });
     link.mouseenter(function (event) {
	 if (CHECKED[index]) {
	     return
	 }
	 check.prop('checked', true);
	 show(markers, MAP);
     });
     link.mouseleave(function (event) {
	 if (CHECKED[index]) {
	     return
	 }
	 check.prop('checked', false);
	 hide(markers);
     });
});


var ARBAT_LINK = $('a[name="arbat"]')

ARBAT_LINK.mouseenter(function (event) {
    ARBAT.addTo(MAP);
});
ARBAT_LINK.mouseleave(function (event) {
    ARBAT.remove();
});
ARBAT_LINK.click(function (event) {
    MAP.flyToBounds(ARBAT);
});
