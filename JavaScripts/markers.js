
//wywołanie mapy leaflet i ustawienie widoku na kraków
var map = L.map('map').setView([50.0614300, 19.9365800], 15);
var satLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Dodawanie warstwy satelitarnej z dostawcy Mapbox (opcjonalne)
    googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
        maxZoom: 20,
        subdomains:['mt0','mt1','mt2','mt3']
});

    // Grupa warstw dla kontrolki Layer Control
    var baseMaps = {
        "OpenStreetMap": satLayer,
        "Mapa satelitarna": googleSat
    };
    
  //dodanie obsługi leaflet wyszukiwania do mapy
  L.Control.geocoder().addTo(map);
//dodanie różnych warstw 
  L.control.layers(baseMaps).addTo(map);




  //deklaracje ikon w zależności od kategorii
  var parkIcon = L.icon({
    iconUrl: '../style/img/icons/park.png',
    iconSize: [40,40],
     });

     
  var infoIcon = L.icon({
    iconUrl: '../style/img/icons/info.png',
    iconSize: [40,40],
     });

     
  var restaurantIcon = L.icon({
    iconUrl: '../style/img/icons/restaurant.png',
    iconSize: [40,40],
     });


  var museumIcon = L.icon({
      iconUrl: '../style/img/icons/museum.png',
      iconSize: [40,40],});
    
       
  var viewIcon = L.icon({
      iconUrl: '../style/img/icons/view.png',
      iconSize: [40,40],});
  
  var barIcon = L.icon({
      iconUrl: '../style/img/icons/bar.png',
      iconSize: [40,40],});
      
  var atmIcon = L.icon({
      iconUrl: '../style/img/icons/atm.png',
      iconSize: [40,40],});
  
  var nmIcon = L.icon({
      iconUrl: '../style/img/icons/nm.png',
      iconSize: [40,40],});

  var wcIcon = L.icon({
      iconUrl: '../style/img/icons/wc.png',
      iconSize: [40,40],});
  
  var funIcon = L.icon({
      iconUrl: '../style/img/icons/fun.png',
      iconSize: [40,40],});

  var defaultIcon = L.icon({
      iconUrl: '../style/img/icons/default.png',
      iconSize: [40,40],});
    
   //funkcja dynamicznie przypisująca ikonę w zależności od kategorii markera
  function getIconForCategory(category) {
      var icons = {
        'park': parkIcon,
        'museum': museumIcon,
        'bar' : barIcon,
        'atm' : atmIcon,
        'info': infoIcon,
        'natureMonument': nmIcon,
        'restaurant' : restaurantIcon,
        'fun' : funIcon,
        'wc' : wcIcon,
        'viewpoint' : viewIcon
      };
              return icons[category] || defaultIcon; // domyślna ikona jeśli kategoria nie jest znana
          }
                     


//deklaracja markerów wewnątrz projektu 
  var rawMarkers = [
    {coords: [50.053555165158244, 19.848564721218292], category: 'park', title: 'Las Wolski'},
    {coords: [50.0645817136116, 19.943452411089474], category: 'info', title: 'Punkt Informacji'},
    {coords: [50.06205651582134, 19.937869678768998], category: 'museum', title: 'Rynek Podziemny'},
    {coords: [50.06157439140573, 19.93736005904437], category: 'viewpoint', title: 'Sukiennice'},
    {coords: [50.06277280600165, 19.938084255501], category: 'museum', title: 'Muzeum Bursztynu'},
    {coords: [50.06031474322343, 19.941430219690446], category: 'park', title: 'Planty'},
    {coords: [50.061956647590286, 19.93674315095667], category: 'viewpoint', title: 'Rynek główny'},
    {coords: [50.06108881834254, 19.93938244469425], category: 'restaurant', title: 'Italiano Pizza and pasta'},
    {coords: [50.008295158356304, 19.932197653896544], category: 'natureMonument', title: 'Dąb Szypułkowy'},
    {coords: [50.05638309009899, 19.92486451752291], category: 'natureMonument', title: 'Pomnik Przyrody Wiąz górski'},
    {coords: [52.218977335206326, 21.02698130066818], category: 'natureMonument', title: 'Pomnik przyrody Spadające Konary'},
    {coords: [50.01275843527185, 22.071621631714695], category: 'natureMonument', title: 'Modrzew Słotek'},
    {coords: [50.03943576653912, 21.978823469295314], category: 'natureMonument', title: 'Topola Wanda - pomnik przyrody'},
    {coords: [50.008295158356304, 19.932197653896544], category: 'park', title: 'Lisia Góra'},
    {coords: [50.065893541087426, 19.95011823312167], category: 'park', title: 'Park Strzelecki'},
    {coords: [52.234042015368246, 21.005997153566554], category: 'park', title: 'Park Świętokrzyski'},
    {coords: [52.24205559007616, 21.05439129999806], category: 'park', title: 'Park Skaryszewski'},
    {coords: [50.024806168925636, 21.999880539118724], category: 'park', title: 'Park Kultury i Wypoczynku'},
    {coords: [50.03784251981432, 22.006749525402462], category: 'museum', title: 'Muzeum Dobranocek'},
    {coords: [50.03527275653483, 22.001264858988975], category: 'museum', title: 'Muzeum Okręgowe w Rzeszowie'},
    {coords: [52.23286684420999, 20.981032958893557], category: 'museum', title: 'Muzeum Powstania Warszawskiego'},
    {coords: [52.23185402392427, 21.023237549389133], category: 'museum', title: 'Muzeum Narodowe w Warszawie'},
    {coords: [50.060897618803274, 19.923756563067272], category: 'museum', title: 'Muzeum Narodowe w Krakowie'},
    {coords: [50.0628179302432, 19.941466320883098], category: 'atm', title: 'Bankomat Bank Pekao'},
    {coords: [50.06089857714012, 19.9362919746465], category: 'atm', title: 'Bankomat PKO Banku Polskiego'},
    {coords: [50.0411779464954, 19.94278057188052], category: 'atm', title: 'Bankomat PKO Banku Polskiego Smolki'},
    {coords: [50.04132519519302, 22.00378868460847], category: 'atm', title: 'Euronet Polska Sp. z o.o.'},
    {coords: [50.01946462308785, 21.982298223225428], category: 'atm', title: 'Bankomat PKO Banku Polskiego akademicka'},
    {coords: [50.037254476397884, 19.94507014285578], category: 'viewpoint', title: 'Punkt widokowy Krzemionki'},
    {coords: [50.03999298411976, 19.9140229824643], category: 'viewpoint', title: 'Punkt widokowy na Wawel'},
    {coords: [50.088430768555405, 19.86759139999806], category: 'viewpoint', title: 'Punkt widokowy przy krzyżu "pod lipką"'},
    {coords: [49.98792965430816, 22.050968054003615], category: 'viewpoint', title: 'Panorama pogórze karpackie'},
    {coords: [52.249929405707974, 21.01395332769446], category: 'viewpoint', title: 'Punkt widokowy Warszawa'},
    {coords: [50.038248252600916, 22.00316469006734], category: 'bar', title: 'Pub K20'},
    {coords: [50.037127083621925, 22.00561791165481], category: 'bar', title: 'Corner Pub Mała Graciarnia Rzeszów'},
    {coords: [50.06269736311796, 19.934847992842947], category: 'bar', title: 'BaniaLuka'},
    {coords: [50.061831445702154, 19.935832699998063], category: 'bar', title: 'Vis a Vis. Drink-bar'},
    {coords: [50.0643488018698, 19.937751293235355], category: 'bar', title: 'The Artist Cocktail Bar'},
    {coords: [50.06393113290446, 19.942860001612825], category: 'fun', title: 'Teatr im. Juliusza Słowackiego w Krakowie'},
    {coords: [50.0615205852016, 19.935422947001836], category: 'fun', title: 'Kino Pod Baranami'},
    {coords: [50.064400296631746, 19.94076952397438], category: 'fun', title: 'Kino 7D Max & Gry VR Kraków'},
    {coords: [50.03495567484332, 22.000864204017365], category: 'fun', title: 'Kino „Zorza”'},
    {coords: [50.019123215425616, 21.990689099998054], category: 'fun', title: 'Kino Helios'},
    {coords: [50.06443468437378, 19.935119145961146], category: 'wc', title: 'Toaleta Publiczna'},
    {coords: [50.05766221920261, 19.94567094225736], category: 'wc', title: 'Toaleta'},
    {coords: [50.06469138477872, 19.9450605999988], category: 'wc', title: 'WC'},
    {coords: [50.0323564166722, 21.999173345742427], category: 'wc', title: 'WC Rzeszów'},
    {coords: [50.02450477982727, 21.998003749440127], category: 'wc', title: 'Toaleta Publiczna przy Bulwarach'},
    {coords: [50.062617282040776, 19.93809080882538], category: 'info', title: 'InfoKraków'},
    {coords: [50.061795280812305, 19.937605452573617], category: 'info', title: 'InfoKraków Sukiennice'},
    {coords: [50.03786949257718, 22.003095182845605], category: 'info', title: 'Podkarpacka Regionalna Organizacja Turystyczna'},
    {coords: [50.03754589386159, 22.00403189705621], category: 'info', title: 'Regionalne Centrum Informacji Turystycznej (Rzeszowskie Piwnice)'},
    {coords: [52.23178239319089, 21.006169136872906], category: 'info', title: 'Stołeczne Biuro Turystyki'},
    {coords: [52.23276768890413, 21.013354134052193], category: 'restaurant', title: 'Restauracja Gala Smaków'},
    {coords: [50.06429836989672, 19.942220390556788], category: 'restaurant', title: 'Szalone Widelce'},
    {coords: [50.062912211944784, 19.94122889130315], category: 'restaurant', title: 'Tawerna Wilczy Dół'},
    {coords: [50.037100556716226, 22.001418287792635], category: 'restaurant', title: 'Restauracja „Niebieskie Migdały”'},
    {coords: [50.03023128715652, 22.006994565634045], category: 'restaurant', title: 'Molto. Restauracja.'}




];

//dynamiczne przypisanie ikon
var markers = rawMarkers.map(m => {
  var marker = L.marker(m.coords, {category: m.category, title: m.title});
  marker.setIcon(getIconForCategory(m.category));
  marker.bindPopup(m.title);
  return marker;
});

markers.forEach(marker => {
switch (marker.options.title) {
  //symulacja dodanych informacji typu ocena i komentarze
case 'Rynek Podziemny':
marker.info = {
    zdjecie: '../style/img/imgHTML/podz.jpg',
    nazwa: "Rynek Podziemny",
    adres: 'Rynek Główny 1, 31-042 Kraków',
    ocena: 4.4,
    komentarze: ['user23: Bardzo interesujące!', 'Basia: Warto odwiedzić.']
};
break;

case 'Muzeum Bursztynu':
marker.info = {
    zdjecie: '../style/img/imgHTML/bursztyn.jpg',
    nazwa: "Muzeum Bursztynu",
    adres: 'Świętego Jana 2, 31-018 Kraków',
    ocena: 4.5,
    komentarze: ['user: Piękne widoki!', 'user23: Wspaniałe miejsce.']
};
break;

case 'Las Wolski':
marker.info = {
    zdjecie: '../style/img/imgHTML/laswolski.jpg',
    nazwa: "Las Wolski",
    adres: 'Kraków',
    ocena: 4.5,
    komentarze: ['user: Piękne widoki!', 'unknown: Wspaniałe miejsce.']
};
break;

case 'Rynek główny':
marker.info = {
    zdjecie: '../style/img/imgHTML/rynekgl.jpg',
    nazwa: "Rynek Głowny",
    adres: 'Rynek Główny, 31-422 Kraków',
    ocena: 4.5,
    komentarze: ['maja123: Piękne widoki!', 'sweetcat1: Wspaniałe miejsce.']
};
break;

case 'Sukiennice':
marker.info = {
    zdjecie: '../style/img/imgHTML/sukiennice.jpg',
    nazwa: "Sukiennice",
    adres: 'Rynek Główny 1/3, 31-042 Kraków',
    ocena: 4.5,
    komentarze: ['user: Piękne widoki!', 'barbara: Wspaniałe miejsce.']
};
break;

case 'Italiano Pizza and pasta':
marker.info = {
    zdjecie: '../style/img/imgHTML/italiano.jpg',
    nazwa: "Italiano Pizza and pasta",
    adres: 'Sienna 6, 31-041 Kraków',
    ocena: 4.5,
    komentarze: ['superman: Super jedzenie!', 'majka: Pyszna pizza :)']
};
break;

case 'Punkt Informacji':
marker.info = {
    zdjecie: '../style/img/imgHTML/info.jpg',
    nazwa: "Punkt Informacji Miejskiej - InfoKraków",
    adres: 'Szpitalna 25, 31-024 Kraków',
    ocena: 4.1,
    komentarze: ['daniel23: Pomocne panie', ' grzesiek432: Długie kolejki']
};
break;

case 'Planty':
marker.info = {
    zdjecie: '../style/img/imgHTML/planty.jpg',
    nazwa: "Planty",
    adres: '31-041 Kraków',
    ocena: 4.5,
    komentarze: ['Janina: Urokliwy park', 'Zbigniew: Przyjemny spacerek']
};
break;
case 'Dąb Szypułkowy':
marker.info = {
    zdjecie: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Kraków_ul._Jugowicka_14_pomnik_przyrody_Dąb_szypułkowy_Quercus_robur.jpg',
    nazwa: "Pomnik przyrody Dąb Szypułkowy",
    adres: 'Jugowicka 10C, 30-443 Kraków',
    ocena: 5,
    komentarze: ['user23: Piękne drzewo!', 'janek23: Warto zobaczyć']
};
break;

case 'Pomnik Przyrody Wiąz górski':
marker.info = {
    zdjecie: 'https://plikimpi.krakow.pl//zalacznik/407952/frame_4_2969215234.jpg',
    nazwa: "Pomnik Przyrody Wiąz górski",
    adres: '30-102 Kraków',
    ocena: 5.0,
    komentarze: ['basia34: Potrzeba więcej takich drzew :)', 'unknown: Wspaniałe miejsce.']
};
break;

case 'Pomnik przyrody Spadające Konary':
marker.info = {
    zdjecie: 'https://bi.im-g.pl/im/f0/40/ce/z13517040IHG,Drzewo-na-skwerze-Kisielewskiego-zagraza-pieszym.jpg',
    nazwa: "Pomnik przyrody Spadające Konary",
    adres: 'Ujazdów, 00 001, Warszawa',
    ocena: 5,
    komentarze: ['user: Piękne widoki!', 'unknown: Wspaniałe miejsce.']
};
break;
case 'Modrzew Słotek':
marker.info = {
    zdjecie: 'https://www.pomniki-przyrody.pl/wp-content/uploads/2017/04/Rezerwat-nad-Młyńską-Strugą-pień-pomnikowego-dębu.jpg',
    nazwa: "Modrzew Słotek - pomnik przyrody",
    adres: 'Świętego Marcina 62, 35-330 Rzeszów',
    ocena: 5,
    komentarze: ['user432: Super', 'unknown: Wspaniałe miejsce.']
};
break;
case 'Lisia Góra':
marker.info = {
    zdjecie: 'https://visitrzeszow.pl/media/places/lisia_gora_2.jpg?v=1617958276',
    nazwa: "Lisia Góra",
    adres: 'Żeglarska, 35-086 Rzeszów',
    ocena: 4.7,
    komentarze: ['user: Miejsce bardzo przyjazne na spacer', 'unknown: Miejsce piękne, z potencjałem.']
};
break;
case 'Topola Wanda - pomnik przyrody':
marker.info = {
    zdjecie: 'https://www.rpdp.hostingasp.pl/images/0000005000-0000005999/5290_7670.jpg',
    nazwa: "Topola Wanda - pomnik przyrody",
    adres: '35-111 Rzeszów',
    ocena: 5,
    komentarze: ['basia34: Potrzeba więcej takich drzew :)', 'unknown: Wspaniałe miejsce.']
};
break;


case 'Park Strzelecki':
marker.info = {
    zdjecie: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/ParkStrzelecki-WidokOgólnyNaPółnocnyWschód-POL%2C_Kraków.jpg/1280px-ParkStrzelecki-WidokOgólnyNaPółnocnyWschód-POL%2C_Kraków.jpg',
    nazwa: "Park Strzelecki",
    adres: 'Zygmunta Augusta 7, 31-505 Kraków',
    ocena: 4.9,
    komentarze: ['kinia34: Miłe miejsce do spędzenia czasu', 'robert: Park praktycznie w centrum Krakowa']
};
break;

case 'Park Świętokrzyski':
marker.info = {
    zdjecie: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Warsaw_07-13_img29_View_from_Palace_of_Culture_and_Science.jpg',
    nazwa: "Park Świętokrzyski",
    adres: 'Świętokrzyska, 00-901 Warszawa',
    ocena: 4.5,
    komentarze: ['monika: Park średnio atrakcyjny.', 'user6677: Mnie się spodobało']
};
break;
case 'Park Skaryszewski':
marker.info = {
    zdjecie: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Warszawa%2C_Park_Skaryszewski_z_góry.jpg/1920px-Warszawa%2C_Park_Skaryszewski_z_góry.jpg',
    nazwa: "Park Skaryszewski im. Ignacego Jana Paderewskiego",
    adres: 'al. Jerzego Waszyngtona, 00-999 Warszawa',
    ocena: 4.7,
    komentarze: ['krzysztof: Rozległy park', 'unknown64: Wspaniale miejsce wsrodku Warszawskiego centrum miasta.']
};
break;
case 'Park Kultury i Wypoczynku':
marker.info = {
    zdjecie: 'http://rzeszow-news.pl/wp-content/uploads/2014/11/bulwary-e1426950435515.jpg',
    nazwa: "Park Kultury i Wypoczynku",
    adres: '35-001 Rzeszów',
    ocena: 4.7,
    komentarze: ['user: Miejsce bardzo przyjazne na spacer', 'unknown: Miejsce piękne, z potencjałem.']
};
break;
case 'Muzeum Dobranocek':
marker.info = {
    zdjecie: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Teatr_Maska_i_Muzeum_Dobranocek_w_Rzeszowie.jpg',
    nazwa: "Muzeum Dobranocek ze zbiorów Wojciecha Jamy w Rzeszowie",
    adres: 'Adama Mickiewicza 13, 35-064 Rzeszów',
    ocena: 4.6,
    komentarze: ['liliana: Powrót do lat dzieciństwa🙂', 'janek23: Fantastyczna podróż do czasów dzieciństwa. ']
};
break;

case 'Muzeum Okręgowe w Rzeszowie':
marker.info = {
    zdjecie: 'https://www.muzeum.rzeszow.pl/wp-content/uploads/2017/05/5-Muzeum-Okręgowe-Rzeszów.jpg',
    nazwa: "Muzeum Okręgowe w Rzeszowie",
    adres: '3 Maja 19, 35-030 Rzeszów',
    ocena: 4.5,
    komentarze: ['unknown: Wspaniałe miejsce.']
};
break;

case 'Muzeum Powstania Warszawskiego':
marker.info = {
    zdjecie: 'https://warsawtour.pl/wp-content/uploads/2022/04/Muzeum-Powstania-Warszawskiego-fot.-Filip-Kwiatkowski-5.jpg',
    nazwa: "Muzeum Powstania Warszawskiego",
    adres: 'Grzybowska 79, 00-844 Warszawa',
    ocena: 4.7,
    komentarze: ['user545: Super muzeum przedstawiające historię Powstania Warszawskiego.', 'unknown: Polecam z pełną odpowiedzialnością.']
};
break;
case 'Muzeum Narodowe w Warszawie':
marker.info = {
    zdjecie: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Muzeum_Narodowe_w_Warszawie.jpg',
    nazwa: "Muzeum Narodowe w Warszawie",
    adres: 'al. Jerozolimskie 3, 00-495 Warszawa',
    ocena: 4.6,
    komentarze: ['user432: Super', 'unknown: Wspaniałe miejsce.']
};
break;
case 'Muzeum Narodowe w Krakowie':
marker.info = {
    zdjecie: 'https://s8.tvp.pl/images2/8/a/7/uid_8a731f1006a4981d39e6b28180025eb01623226486043_width_900_play_0_pos_0_gs_0_height_506.jpg',
    nazwa: "Muzeum Narodowe w Krakowie",
    adres: 'al. 3 Maja 1, 30-062 Kraków',
    ocena: 4.7,
    komentarze:  ['user432: Super', 'unknown: Wspaniałe miejsce.']
};
break;
case 'Bankomat Bank Pekao':
marker.info = {
    zdjecie: '../style/img/imgHTML/atm.png',
    nazwa: "Bankomat Bank Pekao",
    adres: 'Szpitalna 15, 30-960 Kraków',
    ocena: 2.3,
    komentarze: ['greg34: Wpłatomat oczywiście jak nie działał tak nadal nie działa', 'baska: Byłam jakiś czas temu - wpłatomat nie działał. ']
};
break;


case 'Bankomat PKO Banku Polskiego':
marker.info = {
    zdjecie: 'https://s3-media0.fl.yelpcdn.com/bphoto/eR7oGt-Q2LUmVkD9gf_-5g/o.jpg',
    nazwa: "Bankomat PKO Banku Polskiego",
    adres: 'Rynek Główny 21, 31-008 Kraków',
    ocena: 1.6,
    komentarze: ['kinia34: Najgorszy bank w Krakowie', 'robert: Bankomat PKO nie działa z kartą Banku PKO.']
};
break;

case 'Bankomat PKO Banku Polskiego Smolki':
marker.info = {
    zdjecie: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Bankomat_050421.jpg',
    nazwa: "Bankomat PKO Banku Polskiego",
    adres: 'Smolki 8, 30-001 Kraków',
    ocena: 3.5,
    komentarze: ['paweł: w tym miejscu nie ma gdzie postawić samochodu', 'user6677: Był nieczynny gdy chciałem skorzystać']
};
break;
case 'Euronet Polska Sp. z o.o.':
marker.info = {
    zdjecie: '../style/img/imgHTML/euronet.png',
    nazwa: "Euronet Polska Sp. z o.o.",
    adres: 'Aleja Józefa Piłsudskiego 34, 35-001 Rzeszów',
    ocena: 3.7,
    komentarze: []
};
break;
case 'Bankomat PKO Banku Polskiego akademicka':
marker.info = {
    zdjecie: 'https://prowly-uploads.s3.eu-west-1.amazonaws.com/uploads/landing_page/template_background/69341/709247229440b5f05986cead93a91e8a.jpg',
    nazwa: "Bankomat PKO Banku Polskiego",
    adres: 'Akademicka 2, 35-001 Rzeszów',
    ocena: 3.9,
    komentarze: []
};
break;
case 'Punkt widokowy Krzemionki':
marker.info = {
    zdjecie: 'https://plikimpi.krakow.pl/pliki/387348/4.jpg',
    nazwa: "Punkt widokowy Krzemionki",
    adres: '30-001, Kraków',
    ocena: 4.7,
    komentarze: ['zbyszek432: Wspaniałe miejsce na krótki spacer', 'gresd: Super widok na krakow polecam.']
};
break;

case 'Punkt widokowy na Wawel':
marker.info = {
    zdjecie: 'https://cdn.galleries.smcloud.net/t/galleries/gf-SWoh-vTYR-DJex_wawel-zamek-krolewski-na-wawelu-994x828.jpg',
    nazwa: "Punkt widokowy na Wawel",
    adres: 'Salezjańska 7, 30-374 Kraków',
    ocena: 4.9,
    komentarze: ['jakub: Punkt z ładnym widokiem na Wawel, Kopiec Kościuszki, widać też kawałek diabelskiego młyńca ', 'gresd: SPiękne i spokojne miejsce. Wspaniała panorama.']
};
break;

case 'Punkt widokowy przy krzyżu "pod lipką"':
marker.info = {
    zdjecie: 'https://www.trasadlabobasa.pl/image/16845.jpg',
    nazwa: "Punkt widokowy przy krzyżu pod lipką",
    adres: 'Stanisława Ignacego Witkiewicza, 31-398 Kraków',
    ocena: 4.8,
    komentarze: ['user432: Super', 'unknown: Wspaniałe miejsce.']
};
break;

case 'Panorama pogórze karpackie':
marker.info = {
    zdjecie: 'https://mynaszlaku.pl/wp-content/uploads/2020/04/widok-z-wiezy-widokowej-pod-jaworzem.jpg',
    nazwa: "Panorama pogórze karpackie",
    adres: '35-330 Rzeszów',
    ocena: 4.8,
    komentarze: ['user432: Ciekawy punkt widokowy, oraz liczne podjazdy i trasy rowerowe.', 'unknown: Najczęściej odwiedzana przeze mnie miejscówka do widoków na Tatry. ']
};
break;

case 'Punkt widokowy Warszawa':
marker.info = {
    zdjecie: 'https://wf1.xcdn.pl/files/21/07/13/179807_H1cd_IMG_20200604_182438scaled_83.jpg.webp',
    nazwa: "Punkt widokowy Warszawa",
    adres: '00-001 Warszawa',
    ocena: 4.3,
    komentarze: ['user432: Super', 'unknown: Wspaniałe miejsce.']
};
break;

case 'Pub K20':
marker.info = {
    zdjecie: 'https://bi.im-g.pl/im/5f/61/13/z20323679IHG.jpg',
    nazwa: "Pub K20",
    adres: 'Mikołaja Kopernika 4, 35-002 Rzeszów',
    ocena: 4.9,
    komentarze: ['user432: Super', 'unknown: Wspaniałe miejsce.']
};
break;

case 'Corner Pub Mała Graciarnia Rzeszów':
marker.info = {
    zdjecie: 'https://partyonline.pl/files/place_gallery/18910/corner-pub-mala-graciarnia-rzeszow_22318910.jpg',
    nazwa: "Corner Pub Mała Graciarnia Rzeszów",
    adres: 'Przesmyk 2, 35-065 Rzeszów',
    ocena: 4.1,
    komentarze: ['user432: Super', 'unknown: Wspaniałe miejsce.']
};
break;

case 'BaniaLuka':
marker.info = {
    zdjecie: 'https://krakowbuzz.com/wp-content/uploads/2017/08/Bania-Luka-Krakow.jpg',
    nazwa: "BaniaLuka",
    adres: 'Szewska 13, 31-009 Kraków',
    ocena: 4.4,
    komentarze: ['user432: Super', 'unknown: Wspaniałe miejsce.']
};
break;

case 'Vis a Vis. Drink-bar':
marker.info = {
    zdjecie: 'https://upload.wikimedia.org/wikipedia/commons/1/12/Vis-à-vis_01_AB.jpg',
    nazwa: "Vis a Vis. Drink-bar",
    adres: 'Rynek Główny 29, 31-010 Kraków',
    ocena: 4.3,
    komentarze: ['user432: Super', 'unknown: Wspaniałe miejsce.']
};
break;

case 'The Artist Cocktail Bar':
marker.info = {
    zdjecie: 'https://krakowboatparty.com/wp-content/uploads/2020/06/Opus-Lounge-Bar-2.jpg',
    nazwa: "The Artist Cocktail Bar",
    adres: 'św. Marka 11A, 31-012 Kraków',
    ocena: 4.7,
    komentarze: ['user432: Super', 'unknown: Wspaniałe miejsce.']
};
break;
case 'Teatr im. Juliusza Słowackiego w Krakowie':
marker.info = {
    zdjecie: '../style/img/imgHTML/teatr.png',
    nazwa: "Teatr im. Juliusza Słowackiego w Krakowie",
    adres: 'plac Świętego Ducha 1, 31-023 Kraków',
    ocena: 4.8,
    komentarze: ['mike432: To jeden z najpiękniejszych teatrów', 'gresd: Budynek jest przepiękny']
};
break;

case 'Kino Pod Baranami':
marker.info = {
    zdjecie: 'https://media.krakow.travel/photos/21796/xxl.jpg',
    nazwa: "Kino Pod Baranami",
    adres: 'Rynek Główny 27, 31-010 Kraków',
    ocena: 4.7,
    komentarze: ['zuser2: Klimatyczne miejsce w sercu Krakowa', 'piotr: Super']
};
break;

case 'Kino 7D Max & Gry VR Kraków':
marker.info = {
    zdjecie: 'https://assets.superprezenty.pl/files/uploaded/programs/c679d740d5bd40228f74eda5022adaa2.jpeg',
    nazwa: "Kino 7D Max & Gry VR Kraków",
    adres: 'Floriańska 36, 31-021 Kraków',
    ocena: 4.4,
    komentarze: ['zbyszek432: Fajne doświadczenie, do wyboru kilka filmów.', 'gresd: ciekawe miejsce.']
};
break;

case 'Kino „Zorza”':
marker.info = {
    zdjecie: 'https://bi.im-g.pl/im/cc/d2/1b/z29172940AMP.jpg',
    nazwa: "Kino Zorza",
    adres: '3 Maja 28, 35-030 Rzeszów',
    ocena: 4.6,
    komentarze: ['zbyszek432: Bardzo łądne kino', 'gresd: tanie bilety i niszowe filmy.']
};
break;

case 'Kino Helios':
marker.info = {
    zdjecie: 'https://www.resinet.pl/_foty_news/260/kino-helios-w-galerii-rzeszow-wznawia-dzialalnosc-strefa-barowa-wciaz-pozostanie-zamknieta_40094.jpg',
    nazwa: "Kino Helios",
    adres: 'Aleja Józefa Piłsudskiego 44, 35-001 Rzeszów',
    ocena: 4.5,
    komentarze: ['zbyszek432: polecam', 'gresd: smaczne naczosy.']
};
break;

case 'Toaleta Publiczna':
marker.info = {
    zdjecie: '../style/img/imgHTML/wc.jpg',
    nazwa: "Toaleta Publiczna",
    adres: 'plac Szczepański, 31-011 Kraków',
    ocena: 3.8,
    komentarze: ['zbyszek432: super', 'gresd: polecam']
};
break;

case 'Toaleta':
marker.info = {
    zdjecie: '../style/img/imgHTML/wc2.png',
    nazwa: "Toaleta",
    adres: 'Józefa Dietla 84, 31-031 Kraków',
    ocena: 2.5,
    komentarze: ['gresd: polecam']
};
break;

case 'WC':
marker.info = {
    zdjecie: '../style/img/imgHTML/wc3.png',
    nazwa: "WC",
    adres: 'Tunel, skrzyżowanie ulic Basztowa / Lubicz / Westerplatte, Pawia, 31-154 Kraków',
    ocena: 3.5,
    komentarze: ['zbyszek432: wejscie 4zl', 'gresd: czysto.']
};
break;

case 'WC Rzeszów':
marker.info = {
    zdjecie: '../style/img/imgHTML/wc.jpg',
    nazwa: "WC Rzeszów",
    adres: 'plac Śreniawitów, 35-001 Rzeszów',
    ocena: 2.3,
    komentarze: ['zbyszek432: wejscie 4zl', 'gresd: czysto.']
};
break;

case 'Toaleta Publiczna przy Bulwarach':
marker.info = {
    zdjecie: 'https://rzeszow-news.pl/wp-content/uploads/2016/08/toaletyy.jpg',
    nazwa: "Toaleta Publiczna przy Bulwarach",
    adres: 'Hetmańska 45E, 35-078 Rzeszów',
    ocena: 4.0,
    komentarze: ['zbyszek432: wejscie 4zl', 'gresd: czysto.']
};
break;
case 'InfoKraków':
marker.info = {
    zdjecie: 'https://infokrakow.pl/images/InfoKrakow-ul-sw-Jana-2.jpeg',
    nazwa: "InfoKraków",
    adres: 'Świętego Jana 2, 33-332 Kraków',
    ocena: 4.5,
    komentarze: ['jan2: polecam']
};
break;

case 'InfoKraków Sukiennice':
marker.info = {
    zdjecie: 'https://infokrakow.pl/images/InfoKrakow-Sukiennice.jpeg',
    nazwa: "InfoKraków Sukiennice",
    adres: 'Rynek Główny 1/3, 31-042 Kraków',
    ocena: 4.1,
    komentarze: ['jan2: polecam']
};
break;
case 'Podkarpacka Regionalna Organizacja Turystyczna':
marker.info = {
    zdjecie: '../style/img/imgHTML/inforz.png',
    nazwa: "Podkarpacka Regionalna Organizacja Turystyczna",
    adres: 'Grunwaldzka 2, (wejście od, Jana Matejki, 35-068 Rzeszów',
    ocena: 4.9,
    komentarze: ['jan2: polecam']
};
break;

case 'Regionalne Centrum Informacji Turystycznej (Rzeszowskie Piwnice)':
marker.info = {
    zdjecie: 'https://rzeszow-news.pl/wp-content/uploads/2022/08/piwnice.jpg',
    nazwa: "Regionalne Centrum Informacji Turystycznej (Rzeszowskie Piwnice)",
    adres: 'Rynek 26, 35-064 Rzeszów',
    ocena: 3.7,
    komentarze: ['jan2: polecam']
};
break;
case 'Stołeczne Biuro Turystyki':
marker.info = {
    zdjecie: 'https://cdn.galleries.smcloud.net/t/galleries/gf-ESCJ-hi8V-exxq_warszawa-stare-miasto-1920x1080-nocrop.jpg',
    nazwa: "Stołeczne Biuro Turystyki",
    adres: 'Pałac Kultury i Nauki, plac Defilad 1, 00-901 Warszawa',
    ocena: 4.0,
    komentarze: ['jan2: polecam']
};
break;

case 'Restauracja Gala Smaków':
marker.info = {
    zdjecie: 'https://partyonline.pl/files/place_gallery/15195/restauracja-gala-smakow---sniadania-obiady-kolacje_5.jpg',
    nazwa: "Restauracja Gala Smaków",
    adres: 'Zgoda 5, 00-032 Warszawa',
    ocena: 3.8,
    komentarze: ['olka322: nie polecam', 'janusz: dobra polska kuchnia']
};
break;
case 'Szalone Widelce':
marker.info = {
    zdjecie: 'https://media-cdn.tripadvisor.com/media/photo-s/0f/5b/df/44/piwnica-szalone-widelce.jpg',
    nazwa: "Szalone Widelce",
    adres: 'Szpitalna 40, 31-024 Kraków',
    ocena: 4.7,
    komentarze: ['jan2: polecam']
};
break;

case 'Tawerna Wilczy Dół':
marker.info = {
    zdjecie: 'https://pojedztam.pl/wp-content/uploads/2023/12/tawerna-wilczy-dol-w-krakowie.png',
    nazwa: "Tawerna Wilczy Dół",
    adres: 'Szpitalna 22, 31-024 Kraków',
    ocena: 4.8,
    komentarze: ['jan2: polecam']
};
break;
case 'Restauracja „Niebieskie Migdały”':
marker.info = {
    zdjecie: 'https://www.rzeszowskiesmaki.resinet.pl/foto/news/4/niebieskie-migdaly-rzeszow.jpg',
    nazwa: "Restauracja Niebieskie Migdały",
    adres: '3 Maja 8, 35-030 Rzeszów',
    ocena: 4.4,
    komentarze: ['jan2: polecam']
};
break;

case 'Molto. Restauracja.':
marker.info = {
    zdjecie: 'https://media-cdn.tripadvisor.com/media/photo-s/1d/4a/58/cf/wpadnij-na-drinka-lub.jpg',
    nazwa: "Molto. Restauracja.",
    adres: 'Podwisłocze 29, 35-309 Rzeszów',
    ocena: 4.6,
    komentarze: ['jan2: polecam']
};
break;
default:
// domyślna obsługa jeśli tytuł nie pasuje do żadnego przypadku
break;
}
});


//obsługa filtrowania markerów
var markersLayer = L.layerGroup(markers).addTo(map);
var filterContainer = document.getElementById('filter-container');

var customControl = L.Control.extend({
options: {
position: 'topleft'
},

onAdd: function (map) {
var container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
container.innerHTML = '<button class="custom-button" onclick="toggleFilterPanel()">Filtruj</button>';
return container;
}
});

map.addControl(new customControl());

function toggleFilterPanel() {
if (filterContainer.style.display === 'none' || filterContainer.style.display === '') {
filterContainer.style.display = 'block';
} else {
filterContainer.style.display = 'none';
}
}
function filterMarkers() {
var museumChecked = document.getElementById('museumCheckbox').checked;
var viewChecked = document.getElementById('viewCheckbox').checked;
var nmChecked = document.getElementById('nmCheckbox').checked;
var funChecked = document.getElementById('funCheckbox').checked;
var parkChecked = document.getElementById('parkCheckbox').checked;

var infoChecked = document.getElementById('infoCheckbox').checked;
var atmsChecked = document.getElementById('atmsCheckbox').checked;
var wcChecked = document.getElementById('wcCheckbox').checked;
var restaurantCheckedd = document.getElementById('restaurantCheckbox').checked;
var barChecked = document.getElementById('barCheckbox').checked;

markersLayer.clearLayers();

markers.forEach(function(marker) {
if ((museumChecked && marker.options.category === 'museum') ||
(viewChecked && marker.options.category === 'viewpoint') || 
(nmChecked && marker.options.category === 'natureMonument') ||
(funChecked && marker.options.category === 'fun') ||
(parkChecked && marker.options.category === 'park') ||

(infoChecked && marker.options.category === 'info') ||
(atmsChecked && marker.options.category === 'atm') ||
(wcChecked  && marker.options.category === 'wc') ||
(restaurantCheckedd && marker.options.category === 'restaurant') ||
(barChecked && marker.options.category === 'bar')


)   {
markersLayer.addLayer(marker);
}
});
}

// funkcja inicjalizująca bazę danych IndexedDB
function initIndexedDB() {
  return new Promise((resolve, reject) => {
      var request = indexedDB.open('markersDB', 4); 

      request.onupgradeneeded = function(event) {
          var db = event.target.result;

          // markery
          if (!db.objectStoreNames.contains('markers')) {
              db.createObjectStore('markers', { keyPath: 'id', autoIncrement: true });
          }

          // komentarze
          if (!db.objectStoreNames.contains('comments')) {
              var commentsStore = db.createObjectStore('comments', { keyPath: 'id', autoIncrement: true });
              commentsStore.createIndex('placeName', 'placeName', { unique: false });
          }

          // ulubione miejsca
          if (!db.objectStoreNames.contains('favourites')) {
              var favouritesStore = db.createObjectStore('favourites', { keyPath: 'id', autoIncrement: true });
              favouritesStore.createIndex('userName', 'userName', { unique: false });
          }

            // Oceny
          if (!db.objectStoreNames.contains('ratings')) {
              var ratingsStore = db.createObjectStore('ratings', { keyPath: 'id', autoIncrement: true });
              ratingsStore.createIndex('placeName', 'placeName', { unique: false });
              ratingsStore.createIndex('addedBy', 'addedBy', { unique: false });
      }
      };

      request.onsuccess = function(event) {
          var db = event.target.result;
          resolve(db);
      };

      request.onerror = function(event) {
          reject(event.target.error);
      };
  });
}

//symulacja działania konta użytkownika
// funkcja do zapisywania markera do bazy danych indexedDB 
function saveMarkerToDB(markerData) {
initIndexedDB().then(function(db) {
var transaction = db.transaction('markers', 'readwrite');
var store = transaction.objectStore('markers');

var request = store.add(markerData);

request.onsuccess = function(event) {
console.log('Marker został zapisany w bazie danych.');
};

request.onerror = function(event) {
console.error('Błąd podczas zapisu markera do bazy danych.');
};
});
}

// czytanie markerów z bazy danych przy starcie aplikacji
readMarkersFromDB();

function resetMarkers() {
markersLayer.clearLayers();
markers.forEach(function(marker) {
markersLayer.addLayer(marker);
});
}

// wyświetlanie informacji o markerze
var infoContainer = L.control({ position: 'bottomleft' });

infoContainer.onAdd = function (map) {
  this._div = L.DomUtil.create('div', 'info-container'); 
  this.update();
  return this._div;
};

// aktualizacja zawartości kontenera na podstawie informacji o zaznaczonym miejscu
infoContainer.update = function (info) {
  
this._div.innerHTML = '<h4>Informacje o miejscu</h4>';

if (info) {
this._div.innerHTML += `
<div style="text-align: right;">
  <label class="checkbox-container">
    <input type="checkbox" id="favoriteCheckbox" onclick="toggleFavorite('${info.nazwa}', this, '${info.zdjecie}')"  />
    <i class="fas fa-heart icon-heart">
      <i class="fas fa-plus-circle icon-plus-sign"></i>
    </i>
    <span class="tooltip-text">Dodaj do ulubionych</span>
  </label>
</div>

<p><strong></strong> <img src="${info.zdjecie}" alt="Zdjęcie"></p>
<p><strong> ${info.nazwa}</strong></p>
<p><strong>Adres:</strong> ${info.adres}</p>
<span class="rating"><strong>Ocena:</strong> ${generateRatingStars(info.ocena)}</span><button onclick="showRatingForm('${info.nazwa}')" class="rate-place-button")">Oceń miejsce</button>

<p><strong>Komentarze:</strong></p>
<div id="commentsContainer"></div>
<div class="comment-section" id="commentsSection">
    <textarea id="commentInput" placeholder="Dodaj komentarz..."></textarea>
    <button onclick="addComment('${info.nazwa}')">Wyślij</button>
</div>
<span class="close-button" onclick="resetInfoContainer()">x</span>`;
} else {
this._div.innerHTML += 'Kliknij na marker, aby zobaczyć informacje.';
}
displayComments(info);
};

infoContainer.addTo(map);



// dodawanie komentarza do IndexedDB
function addComment(placeName) {
  var commentText = document.getElementById('commentInput').value;
  var addedBy = checkLoggedInUser();

  initIndexedDB().then(db => {
    var transaction = db.transaction(['comments'], 'readwrite');
    var store = transaction.objectStore('comments');
    var comment = {
      placeName: placeName,
      commentText: commentText,
      addedBy: addedBy.username,
      timestamp: new Date().toISOString()
    };
    store.add(comment);
  }).then(() => {
    console.log('Komentarz dodany.');
    alert('Komentarz dodany.');
    updateInfoPanel(placeName); // aktualizacja panelu info o miejscu
  }).catch(err => {console.error('Błąd podczas dodawania komentarza: ', err);
  });
}

// aktualizacja panelu informacyjnego
function updateInfoPanel(placeName) {
  initIndexedDB().then(db => {
    var transaction = db.transaction(['comments'], 'readonly');
    var store = transaction.objectStore('comments');
    var index = store.index('placeName');
    var range = IDBKeyRange.only(placeName);
    var comments = [];

    index.openCursor(range).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        comments.push(cursor.value);
        cursor.continue();
      } else {
        displayComments(comments);
      }
    };
  });
}

// Funkcja do wyświetlania komentarzy w panelu informacyjnym
function displayComments(info) {
  // obsługa wyjątku
  if (!info || typeof info.nazwa === 'undefined') {
    //console.error('Informacje o miejscu są niepełne lub niezdefiniowane.');
    return;
  }

  var commentsContainer = document.getElementById('commentsContainer');
  if (!commentsContainer) {
    console.error('Nie znaleziono kontenera na komentarze.');
    return;
  }

  // czyszczenie istniejących komentarzy
  commentsContainer.innerHTML = '';


  //komentarze dodajemy z wewnątrz projektu i z bazy danych indexedDB więc musimy zrobić obsługę obu przypadków

  // dodawanie komentarzy z obiektu 'info'
  if (info.komentarze && info.komentarze.length > 0) {
    info.komentarze.forEach(comment => {
      var commentDiv = document.createElement('div');
      commentDiv.classList.add('comment');
      commentDiv.innerHTML = comment;
      commentsContainer.appendChild(commentDiv);
    });
  }

  // dodawanie komentarzy z IndexedDB
  initIndexedDB().then(db => {
    var transaction = db.transaction(['comments'], 'readonly');
    var store = transaction.objectStore('comments');
    var index = store.index('placeName');
    var range = IDBKeyRange.only(info.nazwa);

    index.openCursor(range).onsuccess = function(event) {
      var cursor = event.target.result;
      if (cursor) {
        var commentDiv = document.createElement('div');
        commentDiv.classList.add('comment');
        commentDiv.innerHTML = `<strong>${cursor.value.addedBy}:</strong> ${cursor.value.commentText}`;
        commentsContainer.appendChild(commentDiv);
        cursor.continue();
      }
    };
  })
  .catch(err => {
    console.error('Błąd podczas wyświetlania komentarzy z IndexedDB:', err);
  });
}



// wyświetlanie oceny w postaci gwiazdek
function generateRatingStars(rating) {
  let starsHtml = '';
  let ratingDisplay = '';

  if (rating === 'Brak ocen') {
      starsHtml = '<i class="far fa-star"></i>'.repeat(5); // 5 pustych gwiazdek
      ratingDisplay = '(Brak ocen)';
  } else {
      const filledStars = '<i class="fas fa-star"></i>'.repeat(Math.floor(rating));
      const halfStar = rating % 1 !== 0 ? '<i class="fas fa-star-half-alt"></i>' : '';
      const emptyStars = '<i class="far fa-star"></i>'.repeat(5 - Math.ceil(rating));
      starsHtml = `${filledStars}${halfStar}${emptyStars}`;
      ratingDisplay = `(${rating.toFixed(1)})`; // zaokrąglenie do jednego miejsca po przecinku
  }

  return `<span class="rating-stars">${starsHtml}</span> <span class="rating-number">${ratingDisplay}</span>`;
}


function resetInfoContainer() {
  infoContainer.update(); 
}
function closeInfoContainer() {
  currentMarker = null; 
  infoContainer.update(); 
}
//wczytywanie markerów dodanych przez użytkownika
function readMarkersFromDB() {
  initIndexedDB().then(function (db) {
  var transaction = db.transaction('markers', 'readonly');
  var store = transaction.objectStore('markers');
  
  store.openCursor().onsuccess = function (event) {
  var cursor = event.target.result;
  
  if (cursor) {
      var markerData = cursor.value;
      if (markerData.coordinates) {
        var coordinatesArray = markerData.coordinates.split(', ');
        var lat = parseFloat(coordinatesArray[0]);
        var lng = parseFloat(coordinatesArray[1]);
    
    } else {
        console.error('Błąd: brak współrzędnych dla markera', markerData);
    }  
      var marker = L.marker([lat, lng], { icon: getIconForCategory(markerData.category) });
      marker.info = {
          nazwa: markerData.placeName,
          adres: markerData.address,
          ocena: markerData.rating || 'Brak ocen',
          komentarze: markerData.comments && markerData.comments.length > 0 ? markerData.comments : ['Brak komentarzy'],
          zdjecie: markerData.imageURL
      };
  
      markersLayer.addLayer(marker);
  
      marker.on('click', function () {
          currentMarker = marker; // aktualizacja currentMarker przy kliknięciu
          infoContainer.update(marker.info);
      });
  
      cursor.continue();
  }
  };
  });
  }
  

//ulubione
function toggleFavorite(placeName, checkboxElem, imageUrl) {
  var user = checkLoggedInUser();
  if (!user) {
    alert('Aby dodać miejsce do ulubionych, musisz być zalogowany');
    checkboxElem.checked = false;
    return;
  }

  if (checkboxElem.checked) {
    addToFavorites(placeName, user, imageUrl);
  } else {
    removeFromFavorites(placeName, user);
  }
}

function removeFromFavorites(placeName, user) {
  initIndexedDB().then(function(db) {
    var transaction = db.transaction('favourites', 'readwrite');
    var store = transaction.objectStore('favourites');
    store.delete(placeName).onsuccess = function() {
      console.log('Usunięto z ulubionych.');
      alert('Usunięto z ulubionych');
    };
  });
}

function addToFavorites(placeName, user, imageUrl) {
  if (!user) {
    alert('Aby dodać miejsce do ulubionych, musisz być zalogowany.');
    return;
  }

  var favorite = {
    placeName: placeName,
    userName: user.username,
    imageUrl: imageUrl
  };

  saveFavoriteToDB(favorite);
}


function saveFavoriteToDB(favorite) {
  initIndexedDB().then(function(db) {
    var transaction = db.transaction('favourites', 'readwrite');
    var store = transaction.objectStore('favourites');
    var request = store.add(favorite);

    request.onsuccess = function() {
      console.log('Dodano do ulubionych!');
      alert('Dodano do ulubionych!');
    };

    request.onerror = function(event) {
      console.error('Błąd przy dodawaniu miejsca do ulubionych.', event);
    };
  });
}

//oceny
// funkcja do dodawania oceny do bazy danych
function addRating(placeName, rating) {
  var addedBy = checkLoggedInUser();

  if (!addedBy) {
    alert('Musisz być zalogowany, aby dodać ocenę.');
    return;
  }

  initIndexedDB().then(db => {
    var transaction = db.transaction(['ratings'], 'readwrite');
    var store = transaction.objectStore('ratings');
    var ratingEntry = {
      placeName: placeName,
      rating: rating,
      addedBy: addedBy.username,
      timestamp: new Date().toISOString()
    };
    store.add(ratingEntry);
  }).then(() => {
    console.log('Ocena dodana.');
    alert('Ocena została dodana.');
    updateInfoPanel(placeName); // aktualizacja panelu info o miejscu
  }).catch(err => {
    console.error('Błąd podczas dodawania oceny: ', err);
  });
}


// funkcja pokazująca formularz do dodawania oceny
function showRatingForm(placeName) {
  var ratingForm = document.createElement('div');
  ratingForm.id = 'ratingForm'; // Ustawienie identyfikatora dla formularza
  ratingForm.className = 'rating-form-container';
  ratingForm.innerHTML = `
      <h3>Oceń miejsce: ${placeName}</h3>
      <input type="number" id="ratingInput" min="1" max="5" step="0.1" placeholder="Ocena (1-5)">
      <button onclick="addRating('${placeName}', document.getElementById('ratingInput').value)">Dodaj ocenę</button>
      <button onclick="closeRatingForm()">Anuluj</button>
  `;
  document.body.appendChild(ratingForm);
}

function closeRatingForm() {
  var ratingForm = document.getElementById('ratingForm'); // Pobranie formularza przez ID
  if (ratingForm) {
      ratingForm.remove(); // Usunięcie formularza z DOM
  }
}

markers.forEach(marker => {
  marker.on('click', function () {
    infoContainer.update(marker.info);
    marker.openPopup(); // Otwarcie popupu przy kliknięciu
  });
});
//wyświetlanie info  
markers.forEach(marker => {
marker.on('click', function () {
infoContainer.update(marker.info);
});
});

function checkLoggedInUser() {
  return JSON.parse(localStorage.getItem('loggedInUser'));
}

