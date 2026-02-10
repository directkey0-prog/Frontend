// =============================================================================
// DirectKey API Service & Comprehensive Dummy Data
// =============================================================================

const API_BASE = 'http://localhost:5000/api';
const USE_DUMMY_DATA = true; // Toggle to false when backend is ready

// =============================================================================
// Generic API Call Helper
// =============================================================================

const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error.message.startsWith('API Error')) {
      throw error;
    }
    throw new Error(`Network Error: Unable to reach server. ${error.message}`);
  }
};

// =============================================================================
// Comprehensive Nigerian Location Data
// =============================================================================

const locationData = {
  Abia: {
    'Aba North': ['Eziama', 'Ogbor Hill', 'Osusu'],
    'Aba South': ['Aba GRA', 'Faulks Road', 'Azikiwe Road', 'Factory Road'],
    'Arochukwu': ['Arochukwu Town', 'Ohafia Road'],
    'Umuahia North': ['Umuahia GRA', 'Library Avenue', 'Aba Road', 'World Bank'],
    'Umuahia South': ['Ubakala', 'Nsulu', 'Apumiri'],
    'Osisioma': ['Osisioma Town', 'Aba-Owerri Road'],
    'Ikwuano': ['Ikwuano Town', 'Oloko'],
    'Ohafia': ['Ohafia Town', 'Abiriba'],
  },
  Adamawa: {
    'Yola North': ['Jimeta', 'Yola GRA', 'Karewa', 'Demsawo'],
    'Yola South': ['Yola Town', 'Namtari', 'Adarawo'],
    'Mubi North': ['Mubi Town', 'Lokuwa', 'Kolere'],
    'Mubi South': ['Mubi South', 'Gella'],
    'Numan': ['Numan Town', 'Numan GRA'],
    'Ganye': ['Ganye Town', 'Sugu'],
    'Hong': ['Hong Town', 'Pella'],
  },
  'Akwa Ibom': {
    'Uyo': ['Uyo Town', 'Ewet Housing', 'Shelter Afrique', 'Aka Itiam', 'Four Lanes'],
    'Eket': ['Eket Town', 'QIT', 'Idua'],
    'Ikot Ekpene': ['Ikot Ekpene Town', 'Abia Street', 'Calabar Road'],
    'Oron': ['Oron Town', 'Udung Uko'],
    'Abak': ['Abak Town', 'Midim'],
    'Itu': ['Itu Town', 'Itam'],
  },
  Anambra: {
    'Awka South': ['Awka GRA', 'Amawbia', 'Okpuno', 'Ifite'],
    'Onitsha North': ['Onitsha GRA', 'Inland Town', 'Fegge'],
    'Onitsha South': ['Woliwo', 'Odoakpu'],
    'Nnewi North': ['Nnewi Town', 'Uruagu', 'Otolo', 'Umudim'],
    'Idemili North': ['Ogidi', 'Nkpor', 'Obosi'],
    'Anambra East': ['Aguleri', 'Nsugbe', 'Otuocha'],
  },
  Bauchi: {
    'Bauchi': ['Bauchi GRA', 'Wunti', 'Yelwa', 'Federal Low Cost'],
    'Katagum': ['Azare', 'Katagum Town'],
    'Toro': ['Toro Town'],
    'Dass': ['Dass Town'],
    'Ningi': ['Ningi Town'],
  },
  Bayelsa: {
    'Yenagoa': ['Yenagoa Town', 'Ovom', 'Swali', 'Biogbolo', 'Opolo', 'Amarata'],
    'Ogbia': ['Ogbia Town', 'Otuoke'],
    'Sagbama': ['Sagbama Town'],
    'Nembe': ['Nembe Town', 'Ogbolomabiri'],
    'Brass': ['Brass Town', 'Twon-Brass'],
  },
  Benue: {
    'Makurdi': ['Makurdi GRA', 'High Level', 'Wadata', 'North Bank', 'Modern Market'],
    'Gboko': ['Gboko Town', 'Gboko South'],
    'Oturkpo': ['Otukpo Town', 'Otukpo GRA'],
    'Katsina-Ala': ['Katsina-Ala Town'],
    'Vandeikya': ['Vandeikya Town'],
  },
  Borno: {
    'Maiduguri': ['Maiduguri GRA', 'Old GRA', 'London Ciki', 'Bolori', 'Gwange'],
    'Jere': ['Jere Town', 'Maimalari'],
    'Biu': ['Biu Town'],
    'Bama': ['Bama Town'],
    'Konduga': ['Konduga Town'],
  },
  'Cross River': {
    'Calabar Municipal': ['Calabar GRA', 'Marian', 'Watt Market', 'Diamond Hill', 'Henshaw Town'],
    'Calabar South': ['Calabar South', 'Anantigha', 'Ekpo Abasi'],
    'Ikom': ['Ikom Town'],
    'Ogoja': ['Ogoja Town'],
    'Obudu': ['Obudu Town', 'Obudu Ranch'],
  },
  Delta: {
    'Warri South': ['Warri GRA', 'Effurun', 'Jakpa', 'Enerhen', 'Airport Road', 'NPA', 'Igbudu'],
    'Oshimili South': ['Asaba GRA', 'Cable Point', 'Okpanam', 'Summit Road', 'DBS Road'],
    'Uvwie': ['Effurun', 'Ekpan', 'Ugboroke'],
    'Ethiope East': ['Isiokolo', 'Abraka', 'University Area'],
    'Sapele': ['Sapele Town', 'Amukpe'],
    'Ughelli North': ['Ughelli Town', 'Agbarho'],
    'Ika North East': ['Agbor', 'Owa'],
  },
  Ebonyi: {
    'Abakaliki': ['Abakaliki Town', 'Kpirikpiri', 'Presco', 'Azugwu'],
    'Afikpo North': ['Afikpo Town', 'Unwana'],
    'Ikwo': ['Ikwo Town', 'Echara'],
    'Ezza North': ['Effium', 'Ezzamgbo'],
    'Onicha': ['Onicha Town', 'Abaomege'],
  },
  Edo: {
    'Oredo': ['GRA Benin City', 'Ring Road', 'Sapele Road', 'Akpakpava', 'Ugbowo', 'Uselu', 'Airport Road'],
    'Egor': ['Egor', 'Uselu', 'Ugbowo', 'University of Benin'],
    'Ikpoba Okha': ['Aduwawa', 'Ikpoba Hill', 'Upper Sokponba', 'Oluku'],
    'Orhionmwon': ['Abudu', 'Ugo', 'Igbanke'],
    'Ovia North-East': ['Okada', 'Ekiadolor'],
    'Etsako West': ['Auchi', 'South Ibie'],
    'Esan Central': ['Irrua', 'Ewu'],
  },
  Ekiti: {
    'Ado Ekiti': ['Ado Ekiti Town', 'Ajilosun', 'Basiri', 'Adebayo'],
    'Ikere': ['Ikere-Ekiti'],
    'Ijero': ['Ijero-Ekiti'],
    'Ikole': ['Ikole-Ekiti'],
    'Oye': ['Oye-Ekiti', 'Ayede'],
    'Emure': ['Emure-Ekiti'],
  },
  Enugu: {
    'Enugu North': ['Independence Layout', 'New Haven', 'GRA', 'Ogui', 'Coal Camp'],
    'Enugu South': ['Achara Layout', 'Maryland', 'Trans-Ekulu', 'Agbani Road', 'Uwani'],
    'Enugu East': ['Nike', 'Emene', 'Abakpa', 'Trans Ekulu'],
    'Nsukka': ['Nsukka Town', 'University of Nigeria', 'Onuiyi', 'Odenigwe'],
    'Udi': ['Udi Town', 'Ngwo', 'Affa'],
    'Nkanu West': ['Agbani'],
  },
  Abuja: {
    'AMAC': ['Wuse', 'Wuse 2', 'Garki', 'Garki 2', 'Maitama', 'Asokoro', 'Central Area', 'Guzape', 'Utako', 'Jabi', 'Life Camp', 'Gwarinpa', 'Katampe', 'Durumi', 'Gudu'],
    'Bwari': ['Bwari', 'Kubwa', 'Dutse', 'Byazhin', 'Ushafa'],
    'Gwagwalada': ['Gwagwalada', 'University of Abuja', 'Dobi', 'Kutunku'],
    'Kuje': ['Kuje', 'Rubochi', 'Chibiri', 'Gaube'],
    'Kwali': ['Kwali', 'Kilankwa', 'Dabi', 'Pai'],
    'Abaji': ['Abaji', 'Yaba', 'Rimba', 'Pandagi'],
  },
  Gombe: {
    'Gombe': ['Gombe Town', 'GRA', 'Federal Low Cost', 'Tudun Wada'],
    'Akko': ['Akko Town', 'Kumo'],
    'Kaltungo': ['Kaltungo Town'],
    'Billiri': ['Billiri Town'],
    'Nafada': ['Nafada Town'],
  },
  Imo: {
    'Owerri Municipal': ['Owerri Town', 'Wetheral', 'Douglas Road', 'Royce Road'],
    'Owerri North': ['Naze', 'Ihiagwa', 'Avu'],
    'Owerri West': ['Umuguma', 'Obinze'],
    'Orlu': ['Orlu Town', 'Banana Junction'],
    'Okigwe': ['Okigwe Town', 'Umulolo'],
    'Oguta': ['Oguta Town', 'Oguta Lake'],
  },
  Jigawa: {
    'Dutse': ['Dutse Town', 'Dutse GRA', 'Takur'],
    'Hadejia': ['Hadejia Town', 'Hadejia GRA'],
    'Gumel': ['Gumel Town'],
    'Kazaure': ['Kazaure Town'],
    'Birnin Kudu': ['Birnin Kudu Town'],
  },
  Kaduna: {
    'Kaduna North': ['Malali', 'Ungwan Rimi', 'Badarawa', 'Kawo', 'GRA Kaduna', 'Kabala Costain'],
    'Kaduna South': ['Barnawa', 'Kakuri', 'Tudun Wada', 'Sabon Tasha', 'Television'],
    'Chikun': ['Narayi', 'Gonin Gora', 'Millennium City', 'Rido'],
    'Igabi': ['Rigasa', 'Turunku', 'Afaka'],
    'Zaria': ['Samaru', 'Sabon Gari Zaria', 'ABU', 'Tudun Wada Zaria'],
    "Jema'a": ['Kafanchan', 'Kagoro'],
  },
  Kano: {
    'Kano Municipal': ['Sabon Gari', 'Fagge', 'Nassarawa GRA', 'Bompai', 'Zoo Road'],
    'Gwale': ['Gwale', 'Goron Dutse', 'Dorayi', 'Yakasai'],
    'Tarauni': ['Tarauni', 'Hotoro', 'Rijiyar Zaki', 'Unguwar Uku'],
    'Fagge': ['Fagge', 'Sabon Gari', 'Kofar Wambai', 'Court Road'],
    'Dala': ['Dala', 'Kofar Kabuga', 'Gwammaja'],
    'Nasarawa': ['Nasarawa GRA', 'Ibrahim Taiwo Road', 'Bompai Road'],
    'Ungogo': ['Ungogo Town', 'Rijiyar Zaki'],
    'Kumbotso': ['Kumbotso Town', 'Panshekara'],
  },
  Katsina: {
    'Katsina': ['Katsina GRA', 'Kofar Marusa', 'Kofar Sauri'],
    'Funtua': ['Funtua Town', 'Funtua GRA'],
    'Daura': ['Daura Town', 'Daura GRA'],
    'Malumfashi': ['Malumfashi Town'],
    'Dutsin Ma': ['Dutsin Ma Town'],
  },
  Kebbi: {
    'Birnin Kebbi': ['Birnin Kebbi Town', 'Birnin Kebbi GRA', 'Gwadangaji'],
    'Argungu': ['Argungu Town'],
    'Yauri': ['Yauri Town'],
    'Zuru': ['Zuru Town'],
    'Jega': ['Jega Town'],
  },
  Kogi: {
    'Lokoja': ['Lokoja Town', 'Lokoja GRA', 'Felele', 'Adankolo'],
    'Okene': ['Okene Town', 'Okene GRA'],
    'Kabba/Bunu': ['Kabba Town'],
    'Ankpa': ['Ankpa Town'],
    'Idah': ['Idah Town'],
  },
  Kwara: {
    'Ilorin West': ['Ilorin GRA', 'Tanke', 'Basin', 'Fate', 'Gaa Akanbi'],
    'Ilorin South': ['Fufu', 'Ita Kure', 'Surulere'],
    'Ilorin East': ['Oke Oyi', 'Ita Amodu'],
    'Offa': ['Offa Town'],
    'Irepodun': ['Omu-Aran'],
  },
  Lagos: {
    'Eti-Osa': ['Lekki Phase 1', 'Lekki Phase 2', 'Victoria Island', 'Ikoyi', 'Ajah', 'Banana Island', 'Chevron', 'Ikate', 'Osapa London', 'Agungi', 'Eko Atlantic'],
    'Ikeja': ['GRA Ikeja', 'Alausa', 'Opebi', 'Allen Avenue', 'Adeniyi Jones', 'Toyin Street', 'Computer Village', 'Airport Road', 'Oregun', 'Maryland'],
    'Surulere': ['Adeniran Ogunsanya', 'Bode Thomas', 'Akerele', 'Aguda', 'Iponri', 'Masha', 'Lawanson', 'Ojuelegba'],
    'Lagos Island': ['Marina', 'Broad Street', 'Onikan', 'Campos Square', 'Obalende', 'CMS'],
    'Alimosho': ['Egbeda', 'Idimu', 'Ipaja', 'Akowonjo', 'Ikotun', 'Igando', 'Ayobo'],
    'Kosofe': ['Ojota', 'Ketu', 'Mile 12', 'Alapere', 'Ogudu', 'Magodo GRA', 'Isheri'],
    'Amuwo-Odofin': ['Festac Town', 'Mile 2', 'Apple Junction', 'Satellite Town'],
    'Ibeju-Lekki': ['Ibeju', 'Lakowe', 'Abijo', 'Bogije', 'Sangotedo', 'Awoyaya'],
    'Agege': ['Agege Town', 'Pen Cinema', 'Oke-Odo', 'Dopemu', 'Mangoro'],
    'Ifako-Ijaiye': ['Ogba', 'Ifako', 'Ijaiye', 'Fagba', 'Iju'],
    'Lagos Mainland': ['Yaba', 'Ebute Metta', 'Oyingbo', 'Iwaya', 'Sabo'],
    'Shomolu': ['Shomolu Town', 'Bariga', 'Gbagada', 'Pedro'],
    'Mushin': ['Mushin Town', 'Idi-Oro', 'Papa Ajao', 'Ladipo'],
    'Oshodi-Isolo': ['Oshodi', 'Isolo', 'Ajao Estate', 'Mafoluku'],
    'Apapa': ['Apapa GRA', 'Ajegunle', 'Marine Beach', 'Wharf Road'],
    'Ikorodu': ['Ikorodu Town', 'Igbogbo', 'Bayeku', 'Agric'],
    'Badagry': ['Badagry Town', 'Ajara', 'Topo'],
    'Epe': ['Epe Town', 'Eredo', 'Noforija'],
    'Ojo': ['Ojo Town', 'Alaba', 'Trade Fair', 'Igbo Elerin'],
  },
  Nasarawa: {
    'Lafia': ['Lafia Town', 'Lafia GRA', 'Shabu'],
    'Keffi': ['Keffi Town', 'Keffi GRA'],
    'Karu': ['Karu Town', 'Jikwoyi', 'Mararaba', 'Nyanya'],
    'Nasarawa': ['Nasarawa Town'],
    'Akwanga': ['Akwanga Town'],
  },
  Niger: {
    'Chanchaga': ['Minna GRA', 'Tunga', 'Chanchaga'],
    'Suleja': ['Suleja Town', 'Suleja GRA', 'Kwamba'],
    'Bida': ['Bida Town', 'Bida GRA'],
    'Kontagora': ['Kontagora Town', 'Kontagora GRA'],
    'Bosso': ['Bosso Town'],
  },
  Ogun: {
    'Abeokuta South': ['Ake', 'Itoku', 'Kuto', 'Sapon', 'Onikolobo', 'Ibara'],
    'Abeokuta North': ['Akomoje', 'Obantoko', 'Asero', 'Camp'],
    'Ado-Odo/Ota': ['Ota', 'Sango Ota', 'Joju', 'Canaan Land', 'Toll Gate', 'Ijoko'],
    'Ifo': ['Ifo', 'Agbado', 'Akute', 'Ajuwon'],
    'Shagamu': ['Shagamu Town', 'Makun', 'Sabo'],
    'Obafemi Owode': ['Owode', 'Mowe', 'Ibafo', 'Ofada'],
    'Ijebu Ode': ['Ijebu Ode Town', 'Itoro', 'Imoru'],
    'Ikenne': ['Ikenne Town', 'Iperu'],
  },
  Ondo: {
    'Akure South': ['Akure Town', 'Alagbaka', 'Oba Ile', 'FUTA'],
    'Akure North': ['Iju', 'Itaogbolu'],
    'Ondo West': ['Ondo Town', 'Yaba Ondo'],
    'Okitipupa': ['Okitipupa Town'],
    'Owo': ['Owo Town'],
    'Ilaje': ['Igbokoda'],
  },
  Osun: {
    'Osogbo': ['Osogbo Town', 'Oke-Baale', 'Odi-Olowo', 'GRA Osogbo'],
    'Ife Central': ['Ile-Ife Town', 'Sabo', 'Lagere'],
    'Ilesa East': ['Ilesa Town', 'Bolorunduro'],
    'Ede North': ['Ede Town'],
    'Iwo': ['Iwo Town'],
    'Ejigbo': ['Ejigbo Town'],
  },
  Oyo: {
    'Ibadan North': ['Bodija', 'University of Ibadan', 'Agodi GRA', 'Sango', 'Mokola', 'Samonda', 'Dugbe'],
    'Ibadan North-West': ['Eleyele', 'Jericho', 'Iyaganku GRA'],
    'Ibadan South-West': ['Ring Road', 'Challenge', 'Oluyole', 'Apata'],
    'Ibadan North-East': ['Iwo Road', 'New Garage', 'Bashorun', 'Ashi'],
    'Ibadan South-East': ['Mapo', 'Oje', 'Oranyan', 'Beere'],
    'Akinyele': ['Akobo', 'Ojoo', 'Moniya'],
    'Oluyole': ['Oluyole Estate', 'Idi Ayunre'],
    'Ogbomosho North': ['Ogbomosho Town', 'Sabo'],
    'Oyo West': ['Oyo Town', 'Ojongbodu'],
    'Saki West': ['Saki Town'],
  },
  Plateau: {
    'Jos North': ['Jos Town', 'Terminus', 'Bukuru', 'Farin Gada', 'Tudun Wada'],
    'Jos South': ['Bukuru', 'Rayfield', 'Angwan Rogo'],
    'Mangu': ['Mangu Town'],
    'Pankshin': ['Pankshin Town'],
    'Shendam': ['Shendam Town'],
  },
  Rivers: {
    'Port Harcourt': ['GRA Phase 1', 'GRA Phase 2', 'Old GRA', 'New GRA', 'D-Line', 'Rumuola', 'Ada George', 'Trans Amadi', 'Diobu'],
    'Obio/Akpor': ['Rumuigbo', 'Rukpokwu', 'Choba', 'Ozuoba', 'Rumuokoro', 'Elelenwo', 'Rumolumeni'],
    'Ikwerre': ['Isiokpo', 'Ubima', 'Aluu'],
    'Eleme': ['Eleme Town', 'Alode'],
    'Oyigbo': ['Oyigbo Town', 'Afam'],
    'Bonny': ['Bonny Town'],
  },
  Sokoto: {
    'Sokoto North': ['Sokoto Town', 'Arkilla'],
    'Sokoto South': ['Sokoto GRA', 'Mabera'],
    'Wamako': ['Wamako Town', 'Usmanu Danfodiyo University'],
    'Tambuwal': ['Tambuwal Town'],
    'Bodinga': ['Bodinga Town'],
  },
  Taraba: {
    'Jalingo': ['Jalingo Town', 'Jalingo GRA', 'Turaki'],
    'Wukari': ['Wukari Town'],
    'Bali': ['Bali Town'],
    'Takum': ['Takum Town'],
    'Zing': ['Zing Town'],
  },
  Yobe: {
    'Damaturu': ['Damaturu Town', 'Damaturu GRA', 'Sabon Pegi'],
    'Potiskum': ['Potiskum Town', 'Potiskum GRA'],
    'Nguru': ['Nguru Town', 'Nguru GRA'],
    'Gashua': ['Gashua Town'],
    'Geidam': ['Geidam Town'],
  },
  Zamfara: {
    'Gusau': ['Gusau Town', 'Gusau GRA', 'Tudun Wada Gusau'],
    'Kaura Namoda': ['Kaura Namoda Town'],
    'Talata Mafara': ['Talata Mafara Town'],
    'Anka': ['Anka Town'],
    'Bukkuyum': ['Bukkuyum Town'],
  },
};

// =============================================================================
// Comprehensive Dummy Property Data (15 properties)
// =============================================================================

const dummyProperties = [
  {
    id: '1',
    property_name: 'Exquisite 4-Bedroom Duplex with BQ in Lekki Phase 1',
    description: 'This stunning 4-bedroom fully detached duplex sits on a quiet, well-paved street in the heart of Lekki Phase 1. The property features a spacious living room with high ceilings, a modern open-plan kitchen fitted with granite countertops and premium appliances, and a dedicated dining area. Each bedroom is en-suite with fitted wardrobes and quality bathroom fixtures. The master bedroom comes with a walk-in closet and a private balcony overlooking the manicured garden. A self-contained Boys Quarter (BQ) is included. The compound is interlocked with ample parking for 3 cars. This is the ideal home for families seeking comfort and style in one of Lagos\' most prestigious neighborhoods.',
    property_type: 'Duplex',
    monthly_rent: 3500000,
    price_per_year: 42000000,
    bedrooms: 4,
    bathrooms: 5,
    state: 'Lagos',
    local_government: 'Eti-Osa',
    area: 'Lekki Phase 1',
    status: 'approved',
    featured: true,
    amenities: ['Parking Space', 'Security', 'Backup Generator', 'Water Supply', 'Air Conditioning', 'Furnished', 'Garden', 'Balcony'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop1a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop1b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop1c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop1d/800/600' },
      { image_url: 'https://picsum.photos/seed/prop1e/800/600' },
    ],
    views_count: 342,
    created_at: '2026-01-15T10:30:00.000Z',
    users: {
      full_name: 'Chief Adebayo Ogundimu',
      email: 'adebayo.ogundimu@gmail.com',
      phone_number: '+2348034521890',
      whatsapp: '+2348034521890',
    },
    landlord_contacts: {
      full_name: 'Chief Adebayo Ogundimu',
      email: 'adebayo.ogundimu@gmail.com',
      phone_number: '+2348034521890',
      whatsapp: '+2348034521890',
    },
  },
  {
    id: '2',
    property_name: 'Luxurious 3-Bedroom Apartment in Maitama, Abuja',
    description: 'Welcome to this beautifully designed 3-bedroom apartment located in the serene and upscale Maitama district of Abuja. The apartment boasts a contemporary design with floor-to-ceiling windows that flood every room with natural light. The living area is expansive and opens up to a large balcony with panoramic views of the Abuja skyline. The kitchen is fully fitted with modern cabinetry, an island counter, and top-brand appliances. All three bedrooms are generously sized and en-suite. The estate offers 24-hour security, a well-maintained swimming pool, a fitness center, and dedicated underground parking. Perfect for diplomats, expatriates, and executives looking for premium living in the nation\'s capital.',
    property_type: 'Apartment',
    monthly_rent: 4500000,
    price_per_year: 54000000,
    bedrooms: 3,
    bathrooms: 4,
    state: 'Abuja',
    local_government: 'AMAC',
    area: 'Maitama',
    status: 'approved',
    featured: true,
    amenities: ['Swimming Pool', 'Gym', 'Parking Space', 'Security', 'Air Conditioning', 'Backup Generator', 'Water Supply', 'Balcony', 'Furnished'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop2a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop2b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop2c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop2d/800/600' },
      { image_url: 'https://picsum.photos/seed/prop2e/800/600' },
      { image_url: 'https://picsum.photos/seed/prop2f/800/600' },
    ],
    views_count: 487,
    created_at: '2026-01-20T14:00:00.000Z',
    users: {
      full_name: 'Alhaji Musa Ibrahim',
      email: 'musa.ibrahim@yahoo.com',
      phone_number: '+2348091234567',
      whatsapp: '+2348091234567',
    },
    landlord_contacts: {
      full_name: 'Alhaji Musa Ibrahim',
      email: 'musa.ibrahim@yahoo.com',
      phone_number: '+2348091234567',
      whatsapp: '+2348091234567',
    },
  },
  {
    id: '3',
    property_name: 'Modern Studio Apartment in Victoria Island',
    description: 'A chic and compact studio apartment ideally located on Victoria Island, one of Lagos\' most vibrant commercial and social hubs. This property is perfect for young professionals, entrepreneurs, or anyone who wants to live close to the action. The studio features a smartly designed open-plan layout that maximizes space, a fitted kitchenette with a breakfast counter, and a tastefully finished bathroom with a rain shower. The building offers round-the-clock security, a shared gym on the rooftop, and a convenient ground-floor parking lot. You are just minutes away from major offices on Adeola Odeku Street, trendy restaurants, and the iconic Bar Beach. Truly a premium city-living experience.',
    property_type: 'Studio',
    monthly_rent: 750000,
    price_per_year: 9000000,
    bedrooms: 1,
    bathrooms: 1,
    state: 'Lagos',
    local_government: 'Eti-Osa',
    area: 'Victoria Island',
    status: 'approved',
    featured: false,
    amenities: ['Security', 'Gym', 'Parking Space', 'Air Conditioning', 'Backup Generator', 'Water Supply'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop3a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop3b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop3c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop3d/800/600' },
    ],
    views_count: 215,
    created_at: '2026-01-22T09:15:00.000Z',
    users: {
      full_name: 'Mrs. Folake Adeyemi',
      email: 'folake.adeyemi@outlook.com',
      phone_number: '+2348055678901',
      whatsapp: '+2348055678901',
    },
    landlord_contacts: {
      full_name: 'Mrs. Folake Adeyemi',
      email: 'folake.adeyemi@outlook.com',
      phone_number: '+2348055678901',
      whatsapp: '+2348055678901',
    },
  },
  {
    id: '4',
    property_name: 'Spacious 3-Bedroom Bungalow in Bodija, Ibadan',
    description: 'This well-maintained 3-bedroom bungalow is located in the prestigious Bodija area of Ibadan, Oyo State. The property sits on a generous plot of land with a large fenced compound and a beautiful front lawn. Inside, you will find a cozy sitting room, a separate dining room, and a functional kitchen. Each bedroom is spacious with adequate cross-ventilation and fitted wardrobes. The master bedroom is en-suite. The bungalow also includes a detached two-room Boys Quarter at the back. The neighborhood is peaceful and family-friendly, with easy access to the University of Ibadan, Bodija Market, and major road networks. An excellent choice for families who value space and tranquility.',
    property_type: 'Bungalow',
    monthly_rent: 350000,
    price_per_year: 4200000,
    bedrooms: 3,
    bathrooms: 2,
    state: 'Oyo',
    local_government: 'Ibadan North',
    area: 'Bodija',
    status: 'approved',
    featured: false,
    amenities: ['Parking Space', 'Garden', 'Security', 'Water Supply', 'Backup Generator'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop4a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop4b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop4c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop4d/800/600' },
    ],
    views_count: 128,
    created_at: '2026-01-18T11:45:00.000Z',
    users: {
      full_name: 'Dr. Olumide Fashola',
      email: 'olumide.fashola@gmail.com',
      phone_number: '+2348023456789',
      whatsapp: '+2348023456789',
    },
    landlord_contacts: {
      full_name: 'Dr. Olumide Fashola',
      email: 'olumide.fashola@gmail.com',
      phone_number: '+2348023456789',
      whatsapp: '+2348023456789',
    },
  },
  {
    id: '5',
    property_name: 'Premium 5-Bedroom Penthouse in Ikoyi',
    description: 'An extraordinary penthouse experience awaits you in this exclusive 5-bedroom unit perched atop a luxury high-rise in Ikoyi, Lagos. This property redefines opulence with its double-height living room, Italian marble flooring throughout, a private rooftop terrace with an infinity pool, and floor-to-ceiling glass walls that offer breathtaking 360-degree views of the Lagos Lagoon and the city skyline. The penthouse features a state-of-the-art kitchen with imported German fittings, a home cinema room, a private elevator, and a wine cellar. Each of the five bedrooms is a master suite with premium finishes. The building provides concierge service, underground parking for 4 vehicles, and 24/7 security surveillance. For those who demand nothing but the absolute best.',
    property_type: 'Penthouse',
    monthly_rent: 5000000,
    price_per_year: 60000000,
    bedrooms: 5,
    bathrooms: 5,
    state: 'Lagos',
    local_government: 'Eti-Osa',
    area: 'Ikoyi',
    status: 'approved',
    featured: true,
    amenities: ['Swimming Pool', 'Gym', 'Parking Space', 'Security', 'Air Conditioning', 'Furnished', 'Backup Generator', 'Water Supply', 'Balcony', 'Garden'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop5a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop5b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop5c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop5d/800/600' },
      { image_url: 'https://picsum.photos/seed/prop5e/800/600' },
      { image_url: 'https://picsum.photos/seed/prop5f/800/600' },
    ],
    views_count: 498,
    created_at: '2026-01-25T16:20:00.000Z',
    users: {
      full_name: 'Engr. Chukwuemeka Obi',
      email: 'chukwuemeka.obi@protonmail.com',
      phone_number: '+2348067890123',
      whatsapp: '+2348067890123',
    },
    landlord_contacts: {
      full_name: 'Engr. Chukwuemeka Obi',
      email: 'chukwuemeka.obi@protonmail.com',
      phone_number: '+2348067890123',
      whatsapp: '+2348067890123',
    },
  },
  {
    id: '6',
    property_name: 'Elegant 2-Bedroom Flat in GRA, Port Harcourt',
    description: 'This tastefully finished 2-bedroom flat is situated within a secure and well-managed estate in the Government Residential Area (GRA) Phase 2, Port Harcourt. The apartment offers an open-plan living and dining area, a modern kitchen with ample storage space, and two generously proportioned bedrooms, both en-suite with quality sanitary fittings. The living area opens to a private balcony that overlooks the estate\'s landscaped gardens. Residents enjoy 24-hour power supply backed by a central generator, treated borehole water, CCTV surveillance, and professional estate management. Conveniently located near major banks, supermarkets, and the Port Harcourt Pleasure Park. An ideal home for professionals working in the oil and gas sector.',
    property_type: 'Apartment',
    monthly_rent: 1200000,
    price_per_year: 14400000,
    bedrooms: 2,
    bathrooms: 2,
    state: 'Rivers',
    local_government: 'Port Harcourt',
    area: 'GRA Phase 2',
    status: 'approved',
    featured: false,
    amenities: ['Parking Space', 'Security', 'Backup Generator', 'Water Supply', 'Air Conditioning', 'Balcony'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop6a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop6b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop6c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop6d/800/600' },
      { image_url: 'https://picsum.photos/seed/prop6e/800/600' },
    ],
    views_count: 189,
    created_at: '2026-01-12T08:30:00.000Z',
    users: {
      full_name: 'Barr. Ngozi Eze',
      email: 'ngozi.eze@gmail.com',
      phone_number: '+2348078901234',
      whatsapp: '+2348078901234',
    },
    landlord_contacts: {
      full_name: 'Barr. Ngozi Eze',
      email: 'ngozi.eze@gmail.com',
      phone_number: '+2348078901234',
      whatsapp: '+2348078901234',
    },
  },
  {
    id: '7',
    property_name: 'Newly Built 4-Bedroom Semi-Detached in Sangotedo',
    description: 'Brand new 4-bedroom semi-detached duplex in a gated estate in Sangotedo, along the Lekki-Epe Expressway corridor. This property is fresh off the construction line and has never been lived in. It features a large living room, a fitted kitchen with granite worktops, all rooms en-suite, and a spacious family lounge on the first floor. The master bedroom comes with a jacuzzi tub and a walk-in closet. There is a self-contained BQ for domestic staff. The estate boasts excellent road networks, a community playground, a central waste management system, and reliable security. Sangotedo is rapidly developing and offers great value for money compared to the more established Lekki neighborhoods. Perfect for families who want a new home in a growing community.',
    property_type: 'Semi-Detached',
    monthly_rent: 1800000,
    price_per_year: 21600000,
    bedrooms: 4,
    bathrooms: 4,
    state: 'Lagos',
    local_government: 'Ibeju-Lekki',
    area: 'Sangotedo',
    status: 'approved',
    featured: false,
    amenities: ['Parking Space', 'Security', 'Water Supply', 'Backup Generator', 'Garden'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop7a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop7b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop7c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop7d/800/600' },
      { image_url: 'https://picsum.photos/seed/prop7e/800/600' },
    ],
    views_count: 276,
    created_at: '2026-01-28T13:00:00.000Z',
    users: {
      full_name: 'Mr. Tunde Bakare',
      email: 'tunde.bakare@hotmail.com',
      phone_number: '+2348045678123',
      whatsapp: '+2348045678123',
    },
    landlord_contacts: {
      full_name: 'Mr. Tunde Bakare',
      email: 'tunde.bakare@hotmail.com',
      phone_number: '+2348045678123',
      whatsapp: '+2348045678123',
    },
  },
  {
    id: '8',
    property_name: 'Affordable 2-Bedroom Apartment in Kubwa, Abuja',
    description: 'A clean and comfortable 2-bedroom apartment in a well-maintained block of flats in Kubwa, one of Abuja\'s most affordable satellite towns. The apartment features a nice living room with POP ceiling, a functional kitchen with storage cabinets, and two decent-sized bedrooms with built-in wardrobes. The master bedroom is en-suite while the second bedroom shares a guest toilet. The compound is fully fenced with a security gate. There is a reliable water supply from a borehole and dedicated parking space. Kubwa offers excellent value for money and is well connected to the city center via the Kubwa Expressway. Close to schools, hospitals, and the popular Kubwa market. Ideal for young couples, small families, or civil servants on a budget.',
    property_type: 'Apartment',
    monthly_rent: 400000,
    price_per_year: 4800000,
    bedrooms: 2,
    bathrooms: 2,
    state: 'Abuja',
    local_government: 'Bwari',
    area: 'Kubwa',
    status: 'approved',
    featured: false,
    amenities: ['Parking Space', 'Security', 'Water Supply'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop8a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop8b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop8c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop8d/800/600' },
    ],
    views_count: 95,
    created_at: '2026-01-10T07:00:00.000Z',
    users: {
      full_name: 'Hajiya Aisha Mohammed',
      email: 'aisha.mohammed@gmail.com',
      phone_number: '+2348012349876',
      whatsapp: '+2348012349876',
    },
    landlord_contacts: {
      full_name: 'Hajiya Aisha Mohammed',
      email: 'aisha.mohammed@gmail.com',
      phone_number: '+2348012349876',
      whatsapp: '+2348012349876',
    },
  },
  {
    id: '9',
    property_name: 'Charming 3-Bedroom Duplex in Jericho, Ibadan',
    description: 'A well-built 3-bedroom duplex situated in the serene Jericho GRA extension in Ibadan. This property combines the calm of suburban living with proximity to the city\'s major landmarks. The ground floor houses a spacious living room, a guest toilet, a dining area, and a kitchen with modern fittings. Upstairs, you will find three comfortable bedrooms, each with its own bathroom and fitted wardrobes. The master suite includes a private sitting area. The property sits on a large compound with a beautiful garden, outdoor seating area, and parking for 2 vehicles. Jericho remains one of Ibadan\'s most desirable residential areas, close to Cocoa House, Jericho Mall, and the National Museum. Great for families who appreciate a quieter pace of life without sacrificing convenience.',
    property_type: 'Duplex',
    monthly_rent: 500000,
    price_per_year: 6000000,
    bedrooms: 3,
    bathrooms: 3,
    state: 'Oyo',
    local_government: 'Ibadan North',
    area: 'Jericho',
    status: 'pending',
    featured: false,
    amenities: ['Parking Space', 'Garden', 'Security', 'Water Supply', 'Backup Generator'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop9a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop9b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop9c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop9d/800/600' },
      { image_url: 'https://picsum.photos/seed/prop9e/800/600' },
    ],
    views_count: 67,
    created_at: '2026-02-01T15:30:00.000Z',
    users: {
      full_name: 'Prof. Babatunde Olaiya',
      email: 'babatunde.olaiya@yahoo.com',
      phone_number: '+2348098761234',
      whatsapp: '+2348098761234',
    },
    landlord_contacts: {
      full_name: 'Prof. Babatunde Olaiya',
      email: 'babatunde.olaiya@yahoo.com',
      phone_number: '+2348098761234',
      whatsapp: '+2348098761234',
    },
  },
  {
    id: '10',
    property_name: 'Serviced 1-Bedroom Apartment in Wuse 2, Abuja',
    description: 'A fully serviced 1-bedroom apartment in the bustling heart of Wuse 2, Abuja. This property is the definition of convenience. The apartment comes fully furnished with a comfortable queen-sized bed, a plush sofa set, a smart TV, and a fully equipped kitchenette. Daily cleaning and laundry services are available upon request. The building features a rooftop lounge, a co-working space on the ground floor, and high-speed fiber optic internet throughout. You are walking distance from major restaurants, banks, embassies, and the popular Jabi Lake Mall. Ideal for business travelers, single professionals, or anyone looking for a hassle-free, move-in-ready apartment in Abuja\'s most central location.',
    property_type: 'Studio',
    monthly_rent: 800000,
    price_per_year: 9600000,
    bedrooms: 1,
    bathrooms: 1,
    state: 'Abuja',
    local_government: 'AMAC',
    area: 'Wuse 2',
    status: 'approved',
    featured: true,
    amenities: ['Furnished', 'Air Conditioning', 'Security', 'Parking Space', 'Backup Generator', 'Water Supply', 'Gym'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop10a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop10b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop10c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop10d/800/600' },
    ],
    views_count: 310,
    created_at: '2026-01-30T12:00:00.000Z',
    users: {
      full_name: 'Mr. Emeka Nwosu',
      email: 'emeka.nwosu@gmail.com',
      phone_number: '+2348056781234',
      whatsapp: '+2348056781234',
    },
    landlord_contacts: {
      full_name: 'Mr. Emeka Nwosu',
      email: 'emeka.nwosu@gmail.com',
      phone_number: '+2348056781234',
      whatsapp: '+2348056781234',
    },
  },
  {
    id: '11',
    property_name: 'Executive 3-Bedroom Flat in GRA Ikeja',
    description: 'A tastefully finished 3-bedroom flat in the highly sought-after Government Residential Area (GRA) of Ikeja. This apartment occupies the entire first floor of a low-rise building and offers generous living space throughout. The living and dining areas flow seamlessly, creating an ideal space for entertaining. The kitchen is well-appointed with ample counter space, fitted cabinets, and provisions for gas cooking. All bedrooms are en-suite with tile flooring and air conditioning units already installed. The master bedroom features a full-length mirror wardrobe and a large bathroom with a bathtub. The GRA Ikeja location means you are close to the airport, major corporate offices on Awolowo Way, and top-tier schools. A solid choice for corporate tenants and established families.',
    property_type: 'Apartment',
    monthly_rent: 1500000,
    price_per_year: 18000000,
    bedrooms: 3,
    bathrooms: 3,
    state: 'Lagos',
    local_government: 'Ikeja',
    area: 'GRA Ikeja',
    status: 'approved',
    featured: false,
    amenities: ['Parking Space', 'Security', 'Air Conditioning', 'Backup Generator', 'Water Supply', 'Balcony'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop11a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop11b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop11c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop11d/800/600' },
      { image_url: 'https://picsum.photos/seed/prop11e/800/600' },
    ],
    views_count: 203,
    created_at: '2026-01-14T10:00:00.000Z',
    users: {
      full_name: 'Mrs. Bolaji Okonkwo',
      email: 'bolaji.okonkwo@outlook.com',
      phone_number: '+2348032198765',
      whatsapp: '+2348032198765',
    },
    landlord_contacts: {
      full_name: 'Mrs. Bolaji Okonkwo',
      email: 'bolaji.okonkwo@outlook.com',
      phone_number: '+2348032198765',
      whatsapp: '+2348032198765',
    },
  },
  {
    id: '12',
    property_name: 'Affordable 2-Bedroom Bungalow in Sango Ota, Ogun',
    description: 'A neat and affordable 2-bedroom bungalow in a peaceful residential neighborhood in Sango Ota, Ogun State. This property is ideal for budget-conscious tenants who still want quality living. The bungalow features a comfortable living room with POP ceiling, two bedrooms with built-in wardrobes, a separate kitchen and store room, and a shared bathroom and toilet. The compound is fenced and gated with a small front yard. Sango Ota is strategically located on the Lagos-Abeokuta expressway, making it accessible to both cities. The area is popular with students from nearby Covenant University and Bells University, as well as workers who commute to Lagos. Proximity to Sango bus stop makes public transportation very convenient.',
    property_type: 'Bungalow',
    monthly_rent: 300000,
    price_per_year: 3600000,
    bedrooms: 2,
    bathrooms: 1,
    state: 'Ogun',
    local_government: 'Ado-Odo/Ota',
    area: 'Sango Ota',
    status: 'pending',
    featured: false,
    amenities: ['Parking Space', 'Security'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop12a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop12b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop12c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop12d/800/600' },
    ],
    views_count: 53,
    created_at: '2026-02-03T17:45:00.000Z',
    users: {
      full_name: 'Mr. Sunday Adeyinka',
      email: 'sunday.adeyinka@gmail.com',
      phone_number: '+2348076543219',
      whatsapp: '+2348076543219',
    },
    landlord_contacts: {
      full_name: 'Mr. Sunday Adeyinka',
      email: 'sunday.adeyinka@gmail.com',
      phone_number: '+2348076543219',
      whatsapp: '+2348076543219',
    },
  },
  {
    id: '13',
    property_name: 'Luxury 4-Bedroom Duplex in Asokoro, Abuja',
    description: 'An impressive 4-bedroom fully detached duplex in the exclusive Asokoro district of Abuja. Asokoro is home to the Presidential Villa and many foreign embassies, making it one of the most secure and prestigious neighborhoods in Nigeria. This property features a grand entrance foyer, a large living room with chandelier lighting, a formal dining room, and a chef\'s kitchen with imported countertops and appliances. Upstairs, each of the four bedrooms is generously proportioned with en-suite bathrooms featuring premium fixtures. The master suite includes a private lounge, a dressing room, and a luxury bathroom with a jacuzzi. Outside, the compound offers a well-maintained garden, a covered car port for 3 vehicles, and a fully furnished 2-bedroom BQ. Premium living for discerning tenants.',
    property_type: 'Duplex',
    monthly_rent: 4000000,
    price_per_year: 48000000,
    bedrooms: 4,
    bathrooms: 5,
    state: 'Abuja',
    local_government: 'AMAC',
    area: 'Asokoro',
    status: 'rejected',
    featured: false,
    amenities: ['Parking Space', 'Security', 'Garden', 'Air Conditioning', 'Furnished', 'Backup Generator', 'Water Supply', 'Swimming Pool'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop13a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop13b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop13c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop13d/800/600' },
      { image_url: 'https://picsum.photos/seed/prop13e/800/600' },
      { image_url: 'https://picsum.photos/seed/prop13f/800/600' },
    ],
    views_count: 156,
    created_at: '2026-01-08T14:15:00.000Z',
    users: {
      full_name: 'Chief Obiora Anichebe',
      email: 'obiora.anichebe@yahoo.com',
      phone_number: '+2348087654321',
      whatsapp: '+2348087654321',
    },
    landlord_contacts: {
      full_name: 'Chief Obiora Anichebe',
      email: 'obiora.anichebe@yahoo.com',
      phone_number: '+2348087654321',
      whatsapp: '+2348087654321',
    },
  },
  {
    id: '14',
    property_name: '3-Bedroom Semi-Detached in Independence Layout, Enugu',
    description: 'A solidly built 3-bedroom semi-detached house in the prestigious Independence Layout, Enugu. This property offers great value in one of the South-East\'s most established residential areas. The ground floor features a welcoming living room, a guest toilet, and a fitted kitchen with modern cabinetry. The three bedrooms are on the upper floor, all en-suite with tiled bathrooms. The master bedroom has a large window that lets in plenty of natural light and a view of the surrounding greenery that Enugu is famous for. The compound is shared with just one other unit and includes a paved parking area and a small garden. Independence Layout is known for its tree-lined streets, proximity to the Enugu State Government House, and a strong sense of community. Ideal for professionals working in Enugu\'s growing economy.',
    property_type: 'Semi-Detached',
    monthly_rent: 450000,
    price_per_year: 5400000,
    bedrooms: 3,
    bathrooms: 3,
    state: 'Enugu',
    local_government: 'Enugu North',
    area: 'Independence Layout',
    status: 'pending',
    featured: false,
    amenities: ['Parking Space', 'Security', 'Water Supply', 'Garden', 'Backup Generator'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop14a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop14b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop14c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop14d/800/600' },
      { image_url: 'https://picsum.photos/seed/prop14e/800/600' },
    ],
    views_count: 88,
    created_at: '2026-02-05T09:30:00.000Z',
    users: {
      full_name: 'Mr. Ikechukwu Okafor',
      email: 'ikechukwu.okafor@gmail.com',
      phone_number: '+2348043219876',
      whatsapp: '+2348043219876',
    },
    landlord_contacts: {
      full_name: 'Mr. Ikechukwu Okafor',
      email: 'ikechukwu.okafor@gmail.com',
      phone_number: '+2348043219876',
      whatsapp: '+2348043219876',
    },
  },
  {
    id: '15',
    property_name: 'Modern 3-Bedroom Apartment in Nassarawa GRA, Kano',
    description: 'A modern and well-finished 3-bedroom apartment in the upscale Nassarawa GRA area of Kano. This property offers contemporary living in Northern Nigeria\'s largest city. The apartment features a spacious open-plan living and dining area with tasteful POP ceiling designs and recessed lighting. The kitchen is fitted with quality cabinets, a stainless steel sink, and provisions for both gas and electric cooking. All three bedrooms are en-suite with ceramic tile flooring and built-in wardrobes. The building is located within a gated compound with 24-hour security, a standby generator, and a borehole water system. Nassarawa GRA is one of Kano\'s most desirable addresses, close to the Emir\'s Palace, major banks, and the Kano State Government House. Excellent for professionals, businesspeople, and families seeking comfort in the heart of Kano.',
    property_type: 'Apartment',
    monthly_rent: 600000,
    price_per_year: 7200000,
    bedrooms: 3,
    bathrooms: 3,
    state: 'Kano',
    local_government: 'Kano Municipal',
    area: 'Nassarawa GRA',
    status: 'rejected',
    featured: false,
    amenities: ['Parking Space', 'Security', 'Backup Generator', 'Water Supply', 'Air Conditioning'],
    property_images: [
      { image_url: 'https://picsum.photos/seed/prop15a/800/600' },
      { image_url: 'https://picsum.photos/seed/prop15b/800/600' },
      { image_url: 'https://picsum.photos/seed/prop15c/800/600' },
      { image_url: 'https://picsum.photos/seed/prop15d/800/600' },
    ],
    views_count: 74,
    created_at: '2026-01-26T11:00:00.000Z',
    users: {
      full_name: 'Alhaji Suleiman Danjuma',
      email: 'suleiman.danjuma@yahoo.com',
      phone_number: '+2348065432198',
      whatsapp: '+2348065432198',
    },
    landlord_contacts: {
      full_name: 'Alhaji Suleiman Danjuma',
      email: 'suleiman.danjuma@yahoo.com',
      phone_number: '+2348065432198',
      whatsapp: '+2348065432198',
    },
  },
];

// =============================================================================
// Payment tracking (in-memory mock store)
// =============================================================================

const paidConnections = [];

// =============================================================================
// Exported Service Functions
// =============================================================================

/**
 * Get properties with optional filters.
 * Supports filters: state, local_government, area, property_type, min_rent,
 * max_rent, bedrooms, status, featured, search (text search)
 */
export const getProperties = async (filters = {}) => {
  if (!USE_DUMMY_DATA) {
    const query = new URLSearchParams(filters).toString();
    return apiCall(`/properties?${query}`);
  }

  let results = [...dummyProperties];

  // Only return approved properties by default (unless status filter is set)
  if (!filters.status) {
    results = results.filter((p) => p.status === 'approved');
  } else {
    results = results.filter((p) => p.status === filters.status);
  }

  if (filters.state) {
    results = results.filter(
      (p) => p.state.toLowerCase() === filters.state.toLowerCase()
    );
  }

  if (filters.local_government) {
    results = results.filter(
      (p) =>
        p.local_government.toLowerCase() ===
        filters.local_government.toLowerCase()
    );
  }

  if (filters.area) {
    results = results.filter(
      (p) => p.area.toLowerCase() === filters.area.toLowerCase()
    );
  }

  if (filters.property_type) {
    results = results.filter(
      (p) =>
        p.property_type.toLowerCase() === filters.property_type.toLowerCase()
    );
  }

  if (filters.min_rent) {
    results = results.filter(
      (p) => p.monthly_rent >= Number(filters.min_rent)
    );
  }

  if (filters.max_rent) {
    results = results.filter(
      (p) => p.monthly_rent <= Number(filters.max_rent)
    );
  }

  if (filters.bedrooms) {
    results = results.filter(
      (p) => p.bedrooms === Number(filters.bedrooms)
    );
  }

  if (filters.featured) {
    results = results.filter((p) => p.featured === true);
  }

  if (filters.search) {
    const term = filters.search.toLowerCase();
    results = results.filter(
      (p) =>
        p.property_name.toLowerCase().includes(term) ||
        p.description.toLowerCase().includes(term) ||
        p.area.toLowerCase().includes(term) ||
        p.state.toLowerCase().includes(term) ||
        p.local_government.toLowerCase().includes(term)
    );
  }

  // Simulate network delay
  return new Promise((resolve) => {
    setTimeout(() => resolve(results), 300);
  });
};

/**
 * Get a single property by its ID.
 */
export const getPropertyById = async (id) => {
  if (!USE_DUMMY_DATA) {
    return apiCall(`/properties/${id}`);
  }

  const property = dummyProperties.find((p) => p.id === String(id));

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (property) {
        resolve(property);
      } else {
        reject(new Error('Property not found'));
      }
    }, 200);
  });
};

/**
 * Get the connection fee for contacting a landlord.
 */
export const getConnectionFee = async () => {
  if (!USE_DUMMY_DATA) {
    return apiCall('/payments/connection-fee');
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve({ connection_fee: '15000' }), 100);
  });
};

/**
 * Get all available Nigerian states.
 */
export const getStates = async () => {
  if (!USE_DUMMY_DATA) {
    return apiCall('/locations/states');
  }

  const states = Object.keys(locationData).sort();

  return new Promise((resolve) => {
    setTimeout(() => resolve(states), 100);
  });
};

/**
 * Get Local Government Areas for a given state.
 */
export const getLGAs = async (state) => {
  if (!USE_DUMMY_DATA) {
    return apiCall(`/locations/lgas/${state}`);
  }

  const stateData = locationData[state];
  const lgas = stateData ? Object.keys(stateData).sort() : [];

  return new Promise((resolve) => {
    setTimeout(() => resolve(lgas), 100);
  });
};

/**
 * Get areas for a given state and LGA.
 */
export const getAreas = async (state, lga) => {
  if (!USE_DUMMY_DATA) {
    return apiCall(`/locations/areas/${state}/${lga}`);
  }

  const stateData = locationData[state];
  const areas =
    stateData && stateData[lga] ? [...stateData[lga]].sort() : [];

  return new Promise((resolve) => {
    setTimeout(() => resolve(areas), 100);
  });
};

/**
 * Initialize a Paystack payment for landlord contact connection.
 * @param {Object} data - { email, amount, property_id, callback_url }
 * @returns {Object} - { authorization_url, reference }
 */
export const initializePayment = async (data) => {
  if (!USE_DUMMY_DATA) {
    return apiCall('/payments/initialize', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  const reference = 'DK-' + Date.now() + '-' + Math.random().toString(36).substring(2, 8);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: true,
        message: 'Payment initialized successfully',
        data: {
          authorization_url: `https://checkout.paystack.com/mock/${reference}`,
          access_code: 'mock_access_' + reference,
          reference: reference,
        },
      });
    }, 500);
  });
};

/**
 * Verify a Paystack payment by reference.
 * @param {string} reference - The payment reference
 * @returns {Object} - Payment verification result
 */
export const verifyPayment = async (reference) => {
  if (!USE_DUMMY_DATA) {
    return apiCall(`/payments/verify/${reference}`);
  }

  // Mock: always return success for dummy data
  return new Promise((resolve) => {
    setTimeout(() => {
      // Store the payment as successful
      const paymentRecord = {
        reference,
        status: 'success',
        verified_at: new Date().toISOString(),
      };

      resolve({
        status: true,
        message: 'Payment verified successfully',
        data: {
          status: 'success',
          reference: reference,
          amount: 1500000, // 15000 Naira in kobo
          currency: 'NGN',
          paid_at: new Date().toISOString(),
          channel: 'card',
          ...paymentRecord,
        },
      });
    }, 400);
  });
};

/**
 * Check if a user has already paid for a property connection.
 * @param {string} propertyId - The property ID
 * @param {string} email - The user's email
 * @returns {Object} - { has_paid: boolean, landlord_contacts: Object|null }
 */
export const checkPaymentStatus = async (propertyId, email) => {
  if (!USE_DUMMY_DATA) {
    return apiCall(`/payments/status/${propertyId}?email=${encodeURIComponent(email)}`);
  }

  const existing = paidConnections.find(
    (p) => p.property_id === String(propertyId) && p.email === email
  );

  if (existing) {
    const property = dummyProperties.find(
      (p) => p.id === String(propertyId)
    );
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          has_paid: true,
          landlord_contacts: property ? property.landlord_contacts : null,
        });
      }, 200);
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        has_paid: false,
        landlord_contacts: null,
      });
    }, 200);
  });
};

/**
 * Record a successful payment connection (used after verifyPayment succeeds).
 * @param {string} propertyId - The property ID
 * @param {string} email - The user's email
 * @param {string} reference - The payment reference
 */
export const recordPayment = async (propertyId, email, reference) => {
  if (!USE_DUMMY_DATA) {
    return apiCall('/payments/record', {
      method: 'POST',
      body: JSON.stringify({
        property_id: propertyId,
        email,
        reference,
      }),
    });
  }

  paidConnections.push({
    property_id: String(propertyId),
    email,
    reference,
    paid_at: new Date().toISOString(),
  });

  const property = dummyProperties.find(
    (p) => p.id === String(propertyId)
  );

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: true,
        message: 'Payment recorded successfully',
        landlord_contacts: property ? property.landlord_contacts : null,
      });
    }, 200);
  });
};

/**
 * Get featured properties for the homepage.
 */
export const getFeaturedProperties = async () => {
  if (!USE_DUMMY_DATA) {
    return apiCall('/properties/featured');
  }

  const featured = dummyProperties.filter(
    (p) => p.featured && p.status === 'approved'
  );

  return new Promise((resolve) => {
    setTimeout(() => resolve(featured), 300);
  });
};

/**
 * Get property types available in the system.
 */
export const getPropertyTypes = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        'Apartment',
        'Duplex',
        'Bungalow',
        'Semi-Detached',
        'Penthouse',
        'Studio',
      ]);
    }, 100);
  });
};

/**
 * Get all dummy properties (for admin/debug use).
 */
export const getAllProperties = async () => {
  if (!USE_DUMMY_DATA) {
    return apiCall('/properties/all');
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve([...dummyProperties]), 300);
  });
};

// =============================================================================
// Dummy Testimonials Data
// =============================================================================

const dummyTestimonials = [
  {
    id: '1',
    customer_name: 'Adebayo Ogunlesi',
    customer_title: 'Tenant in Lagos',
    testimonial_text: 'DirectKey made finding an apartment in Lekki so easy. I connected directly with the landlord and moved in within a week. No agent wahala!',
    rating: 5,
    image_url: null,
  },
  {
    id: '2',
    customer_name: 'Chioma Nwosu',
    customer_title: 'Tenant in Abuja',
    testimonial_text: 'I was skeptical at first, but the connection fee is totally worth it. Got a verified landlord contact and the apartment was exactly as listed.',
    rating: 5,
    image_url: null,
  },
  {
    id: '3',
    customer_name: 'Ibrahim Musa',
    customer_title: 'Landlord in Kano',
    testimonial_text: 'As a landlord, DirectKey brings me serious tenants only. No more time wasters. My properties get rented faster now.',
    rating: 4,
    image_url: null,
  },
  {
    id: '4',
    customer_name: 'Funke Akindele',
    customer_title: 'Tenant in Oyo',
    testimonial_text: 'Found a beautiful 3-bedroom duplex in Bodija through DirectKey. The process was smooth and transparent from start to finish.',
    rating: 5,
    image_url: null,
  },
  {
    id: '5',
    customer_name: 'Emeka Obi',
    customer_title: 'Landlord in Enugu',
    testimonial_text: 'Listing my properties on DirectKey has been great for business. The admin team reviews everything quickly and my listings go live fast.',
    rating: 4,
    image_url: null,
  },
  {
    id: '6',
    customer_name: 'Aisha Bello',
    customer_title: 'Tenant in Rivers',
    testimonial_text: 'Relocated to Port Harcourt and needed a place urgently. DirectKey helped me find and connect with a landlord the same day!',
    rating: 5,
    image_url: null,
  },
];

/**
 * Get testimonials for the homepage.
 */
export const getTestimonials = async () => {
  if (!USE_DUMMY_DATA) {
    return apiCall('/testimonials');
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve(dummyTestimonials), 300);
  });
};

/**
 * Subscribe to newsletter.
 */
export const subscribeNewsletter = async (email) => {
  if (!USE_DUMMY_DATA) {
    return apiCall('/newsletter/subscribe', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  return new Promise((resolve) => {
    setTimeout(() => resolve({ status: true, message: 'Subscribed successfully!' }), 300);
  });
};

// =============================================================================
// Default Export
// =============================================================================

export default {
  API_BASE,
  getProperties,
  getPropertyById,
  getConnectionFee,
  getStates,
  getLGAs,
  getAreas,
  initializePayment,
  verifyPayment,
  checkPaymentStatus,
  recordPayment,
  getFeaturedProperties,
  getPropertyTypes,
  getAllProperties,
  getTestimonials,
  subscribeNewsletter,
};
