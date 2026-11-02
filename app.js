const form = document.querySelector("#order-form");
const medicineList = document.querySelector("#medicine-list");
const addMedicineButton = document.querySelector("#add-medicine");
const formError = document.querySelector("#form-error");
const summary = document.querySelector("#order-summary");
const summaryContent = document.querySelector("#summary-content");
const editRequestButton = document.querySelector("#edit-request");
const shopNumbers = ["919989105144", "919985358726"];
const fulfilmentHoursStatus = document.querySelector("#fulfilment-hours-status");
const shopTimeFormatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23"
});
const shopLocation = Object.freeze({
  latitude: 18.3178061,
  longitude: 83.8949325,
  address: "Balaga Road, Bondilipuram, Balaga, Srikakulam, Andhra Pradesh – 532001.",
  googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=18.3178061%2C83.8949325",
  googleMapsShortUrl: "https://maps.app.goo.gl/4wrpJ71FLAXv8N7r8?g_st=aw",
  directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=18.3178061%2C83.8949325&travelmode=driving"
});
const teluguTranslations = Object.freeze({
  "Gowri Medicals | Your Local Pharmacy": "Gowri Medicals | మీ దగ్గరలోని మెడికల్ షాప్",
  "Main navigation": "ప్రధాన నావిగేషన్",
  "Gowri Medicals home": "గౌరి మెడికల్స్ హోమ్",
  "Toggle navigation": "నావిగేషన్ తెరవండి లేదా మూసివేయండి",
  "About": "మా గురించి",
  "Services": "సేవలు",
  "Our Store": "మా దుకాణం",
  "Location": "చిరునామా",
  "Delivery": "డెలివరీ",
  "Route": "మార్గం",
  "Order Medicines": "మందులు కోరండి",
  "YOUR LOCAL PHARMACY": "మీ దగ్గరలోని మెడికల్ షాప్",
  "Your Local Pharmacy,": "మీ దగ్గరలోనే",
  "Here to Help.": "మీకు సేవ చేయడానికి మీ మెడికల్స్.",
  "మీ ఆరోగ్యం మా బాధ్యత": "మీ ఆరోగ్యమే మా బాధ్యత",
  "Your nearby pharmacy in Balaga Mettu, Srikakulam. Send us your medicine request, and our team will assist you.": "Balaga Mettu, Srikakulamలో మీకు దగ్గరలోని మెడికల్ షాప్. మందుల వివరాలు పంపండి; మా బృందం మీకు సహాయం చేస్తుంది.",
  "Request medicines": "మందులు కోరండి",
  "Get directions": "మార్గం చూడండి",
  "Open every day": "ప్రతిరోజూ తెరిచి ఉంటుంది",
  "Shop Hours": "దుకాణం వేళలు",
  "Shop Hours:": "దుకాణం వేళలు:",
  "Home Delivery:": "హోమ్ డెలివరీ:",
  "Every day, 8:00 AM – 10:00 PM": "ప్రతిరోజూ, ఉదయం 8:00 – రాత్రి 10:00",
  "Every day, 10:00 AM – 9:00 PM": "ప్రతిరోజూ, ఉదయం 10:00 – రాత్రి 9:00",
  "Shop pickup: 8:00 AM – 10:00 PM every day": "దుకాణం నుంచి తీసుకోవడం: ప్రతిరోజూ ఉదయం 8:00 – రాత్రి 10:00",
  "Home delivery: 10:00 AM – 9:00 PM every day": "హోమ్ డెలివరీ: ప్రతిరోజూ ఉదయం 10:00 – రాత్రి 9:00",
  "Service hours": "సేవల వేళలు",
  "Doorstep delivery is available only between 10:00 AM and 9:00 PM. You can still send a request; Gowri Medicals will confirm availability.": "ఇంటి వద్ద డెలివరీ ప్రతిరోజూ ఉదయం 10:00 నుంచి రాత్రి 9:00 వరకు మాత్రమే అందుబాటులో ఉంటుంది. మీరు అభ్యర్థన పంపవచ్చు; లభ్యతను గౌరి మెడికల్స్ నిర్ధారిస్తుంది.",
  "Shop pickup is available only between 8:00 AM and 10:00 PM. You can still send a request; Gowri Medicals will confirm availability.": "దుకాణం నుంచి మందులు ప్రతిరోజూ ఉదయం 8:00 నుంచి రాత్రి 10:00 వరకు మాత్రమే తీసుకోవచ్చు. మీరు అభ్యర్థన పంపవచ్చు; లభ్యతను గౌరి మెడికల్స్ నిర్ధారిస్తుంది.",
  "Gowri Medicals medical shop": "Gowri Medicals మెడికల్ షాప్",
  "HERE FOR YOU": "మీ సేవలో",
  "YOUR LOCAL MEDICAL SHOP": "మీ దగ్గరలోని మెడికల్ షాప్",
  "Care, right around the corner.": "మీకు చేరువలోనే ఆరోగ్య సేవలు.",
  "SCROLL TO EXPLORE": "మరిన్ని వివరాలు చూడండి",
  "Medical shop highlights": "మా మెడికల్ షాప్ ప్రత్యేకతలు",
  "Friendly local care": "ఆప్యాయమైన స్థానిక సేవ",
  "మీకు దగ్గరగా, మీతో పాటు": "మీకు దగ్గరగా, మీతో పాటు",
  "Easy medicine requests": "మందుల కోసం సులభంగా కోరండి",
  "WhatsApp us or use our order form": "వాట్సాప్ చేయండి లేదా ఆర్డర్ ఫారమ్ నింపండి",
  "ABOUT GOWRI MEDICALS": "గౌరి మెడికల్స్ గురించి",
  "A familiar face": "మీకు పరిచయమైన సేవ",
  "for your family's care.": "మీ కుటుంబ ఆరోగ్య సంరక్షణ కోసం.",
  "At Gowri Medicals, we’re here to make everyday medicine needs feel simple and personal. Visit us at Balaga Road, Bondilipuram, Balaga, Srikakulam, Andhra Pradesh – 532001, or send a medicine request from wherever you are in Srikakulam.": "రోజువారీ మందుల అవసరాలను సులభంగా తీర్చేందుకు Gowri Medicals మీకు తోడుగా ఉంటుంది. Balaga Road, Bondilipuram, Balaga, Srikakulam, Andhra Pradesh – 532001లోని మా దుకాణాన్ని సందర్శించండి లేదా Srikakulamలో ఎక్కడి నుంచైనా మందుల వివరాలు పంపండి.",
  "మీ కుటుంబ ఆరోగ్య సంరక్షణ కోసం మేము ఎల్లప్పుడూ మీకు దగ్గరగా ఉంటాము.": "మీ కుటుంబ ఆరోగ్య సంరక్షణలో మేము ఎల్లప్పుడూ మీకు తోడుగా ఉంటాము.",
  "Find our shop": "మా దుకాణాన్ని కనుగొనండి",
  "A SIMPLE WAY TO REQUEST": "మందులు కోరడానికి సులభమైన మార్గం",
  "Medicine, made easier.": "మందులు కోరడం ఇప్పుడు సులభం.",
  "Share what you need. We’ll confirm availability and delivery or pickup details with you.": "మీకు కావాల్సిన మందుల వివరాలు పంపండి. లభ్యత, డెలివరీ లేదా దుకాణం నుంచి తీసుకునే వివరాలను మేము మీకు తెలియజేస్తాము.",
  "Your details": "మీ వివరాలు",
  "We’ll use these details to respond to your request.": "మీ అభ్యర్థనకు సమాధానం ఇవ్వడానికి ఈ వివరాలను ఉపయోగిస్తాము.",
  "Full name": "పూర్తి పేరు",
  "Enter your full name": "మీ పూర్తి పేరు నమోదు చేయండి",
  "Mobile number": "మొబైల్ నంబర్",
  "Mobile": "మొబైల్",
  "10-digit mobile number": "10 అంకెల మొబైల్ నంబర్",
  "Enter a valid 10-digit Indian mobile number.": "సరైన 10 అంకెల భారతీయ మొబైల్ నంబర్ నమోదు చేయండి.",
  "How would you like to receive it?": "మీకు మందులు ఎలా కావాలి?",
  "Doorstep delivery": "ఇంటి వద్ద డెలివరీ",
  "Shop pickup": "దుకాణం నుంచి తీసుకోవడం",
  "Customer location": "కస్టమర్ స్థానం",
  "Share and confirm your exact location for doorstep delivery.": "ఇంటి వద్ద డెలివరీ కోసం మీ ఖచ్చితమైన స్థానాన్ని పంచుకుని నిర్ధారించండి.",
  "For shop pickup, sharing your location is optional.": "దుకాణం నుంచి తీసుకునేటప్పుడు మీ స్థానాన్ని పంచుకోవడం ఐచ్ఛికం.",
  "Sharing your location is required for doorstep delivery and optional for shop pickup. GPS permission is requested only when you choose the current-location option.": "ఇంటి వద్ద డెలివరీకి మీ స్థానాన్ని పంచుకోవడం తప్పనిసరి; దుకాణం నుంచి తీసుకునేటప్పుడు ఐచ్ఛికం. ప్రస్తుత స్థానాన్ని ఎంచుకున్నప్పుడే GPS అనుమతి అడుగుతాము.",
  "Tap the map to place your pin. Drag the pin to adjust it.": "మీ స్థానాన్ని గుర్తించడానికి మ్యాప్‌పై నొక్కండి. గుర్తును లాగి సరిచేయండి.",
  "Check the pin and address before confirming.": "నిర్ధారించే ముందు గుర్తు, చిరునామాను సరిచూడండి.",
  "Confirm Delivery Location": "డెలివరీ చిరునామాను నిర్ధారించండి",
  "Confirm Location": "స్థానాన్ని నిర్ధారించండి",
  "Location confirmed": "స్థానం నిర్ధారించబడింది",
  "Your location is confirmed. Use Edit Location if you need to change it.": "మీ స్థానం నిర్ధారించబడింది. మార్చాలంటే స్థానాన్ని సవరించండి.",
  "Your current location was found. Adjust the pin if needed, then confirm location.": "మీ ప్రస్తుత స్థానం లభించింది. అవసరమైతే గుర్తును సరిచేసి, స్థానాన్ని నిర్ధారించండి.",
  "Enter your address, then find it on the map. A locality name alone does not identify an exact location.": "మీ చిరునామాను నమోదు చేసి మ్యాప్‌లో వెతకండి. ప్రాంతం పేరు మాత్రమే ఖచ్చితమైన స్థలాన్ని గుర్తించదు.",
  "No exact result found. Place the pin on the map to choose the location.": "ఖచ్చితమైన చిరునామా దొరకలేదు. స్థలాన్ని ఎంచుకోవడానికి మ్యాప్‌లో గుర్తును ఉంచండి.",
  "Share your location for doorstep delivery, or skip this step for shop pickup.": "ఇంటి వద్ద డెలివరీ కోసం మీ స్థానాన్ని పంచుకోండి లేదా దుకాణం నుంచి తీసుకునేటప్పుడు ఈ దశను వదిలేయండి.",
  "Skip sharing location (Shop Pickup)": "స్థానాన్ని పంచుకోకుండా ఉండండి (దుకాణం నుంచి తీసుకోవడం)",
  "Location will not be shared. This is optional for shop pickup.": "స్థానం పంచుకోబడదు. దుకాణం నుంచి తీసుకునేటప్పుడు ఇది ఐచ్ఛికం.",
  "Where should we deliver your order?": "మీ ఆర్డర్‌ను ఎక్కడికి డెలివరీ చేయాలి?",
  "Choose one way to share your exact delivery location.": "మీ ఖచ్చితమైన డెలివరీ చిరునామాను తెలిపే ఒక పద్ధతిని ఎంచుకోండి.",
  "Use My Current Location": "నా ప్రస్తుత స్థానాన్ని ఉపయోగించండి",
  "Select Location on Map": "మ్యాప్‌లో స్థానాన్ని ఎంచుకోండి",
  "Enter Address Manually": "చిరునామాను చేతితో నమోదు చేయండి",
  "Your location is used only for delivery. GPS permission is requested only when you choose the current-location option.": "మీ స్థానాన్ని డెలివరీ కోసం మాత్రమే ఉపయోగిస్తాము. ప్రస్తుత స్థానాన్ని ఎంచుకున్నప్పుడే GPS అనుమతి అడుగుతాము.",
  "Your current location was found. Adjust the pin if needed, then confirm delivery location.": "మీ ప్రస్తుత స్థానం లభించింది. అవసరమైతే గుర్తును సరిచేసి, డెలివరీ చిరునామాను నిర్ధారించండి.",
  "Tap the map to place your delivery pin. Drag the pin to adjust it.": "డెలివరీ స్థలాన్ని గుర్తించడానికి మ్యాప్‌పై నొక్కండి. గుర్తును లాగి సరిచేయండి.",
  "Choose your exact delivery location before continuing.": "కొనసాగించే ముందు మీ ఖచ్చితమైన డెలివరీ చిరునామాను ఎంచుకోండి.",
  "Edit Location": "చిరునామాను సవరించండి",
  "Check the pin and address before confirming delivery.": "డెలివరీని నిర్ధారించే ముందు గుర్తు, చిరునామా సరిచూడండి.",
  "We’ll look for a matching map location. If no exact match is found, select your pin on the map or use GPS.": "సరిపోలే మ్యాప్ చిరునామాను వెతుకుతాము. ఖచ్చితమైన చిరునామా దొరకకపోతే మ్యాప్‌లో గుర్తు ఎంచుకోండి లేదా GPS ఉపయోగించండి.",
  "Your delivery location is confirmed. Use Edit Location if you need to change it.": "మీ డెలివరీ చిరునామా నిర్ధారించబడింది. మార్చాలంటే చిరునామాను సవరించండి.",
  "Enter your address, then find it on the map. Locality names alone do not identify an exact delivery point.": "మీ చిరునామాను నమోదు చేసి మ్యాప్‌లో వెతకండి. ప్రాంతం పేరు మాత్రమే ఖచ్చితమైన డెలివరీ స్థలాన్ని గుర్తించదు.",
  "Location selected. Adjust the pin if needed, then confirm delivery location.": "స్థలం ఎంచుకున్నారు. అవసరమైతే గుర్తును సరిచేసి డెలివరీ చిరునామాను నిర్ధారించండి.",
  "Current location requires browser permission and a secure connection (HTTPS or localhost). Select on Map or enter an address instead.": "ప్రస్తుత స్థానానికి బ్రౌజర్ అనుమతి, సురక్షిత కనెక్షన్ (HTTPS లేదా localhost) అవసరం. బదులుగా మ్యాప్‌లో ఎంచుకోండి లేదా చిరునామా నమోదు చేయండి.",
  "Your current location was found. Adjust the pin if needed, then confirm delivery location.": "మీ ప్రస్తుత స్థానం లభించింది. అవసరమైతే గుర్తును సరిచేసి, డెలివరీ చిరునామాను నిర్ధారించండి.",
  "Medicine request": "మందుల అభ్యర్థన",
  "Add medicine names and the quantity you need.": "మందుల పేర్లు, కావాల్సిన పరిమాణం నమోదు చేయండి.",
  "Medicine name": "మందు పేరు",
  "e.g. medicine name": "ఉదా: మందు పేరు",
  "Qty": "సంఖ్య",
  "Remove medicine": "మందును తొలగించండి",
  "Add another medicine": "మరో మందును జోడించండి",
  "Additional instructions": "అదనపు సూచనలు",
  "(optional)": "(ఐచ్ఛికం)",
  "Anything else we should know?": "ఇంకేమైనా తెలియజేయాలనుకుంటున్నారా?",
  "Urgent medicine request": "అత్యవసర మందుల అభ్యర్థన",
  "We’ll do our best to respond as soon as possible.": "వీలైనంత త్వరగా స్పందించడానికి ప్రయత్నిస్తాము.",
  "Review order request": "మందుల అభ్యర్థనను పరిశీలించండి",
  "Your details are used only to respond to this request. This form does not place or confirm an order.": "మీ అభ్యర్థనకు స్పందించడానికి మాత్రమే మీ వివరాలు ఉపయోగిస్తాము. ఈ ఫారమ్‌తో ఆర్డర్ ఖరారు కాదు.",
  "REQUEST READY": "అభ్యర్థన సిద్ధంగా ఉంది",
  "Review your request": "మీ అభ్యర్థనను పరిశీలించండి",
  "This is only a request. It is not confirmed until Gowri Medicals confirms availability and accepts it.": "ఇది కేవలం అభ్యర్థన మాత్రమే. మందులు అందుబాటులో ఉన్నాయని Gowri Medicals నిర్ధారించి అంగీకరించే వరకు ఆర్డర్ ఖరారు కాదు.",
  "Send to 9989105144": "9989105144కు పంపండి",
  "Send to 9985358726": "9985358726కు పంపండి",
  "Edit request": "అభ్యర్థనను సవరించండి",
  "WhatsApp will open with your message ready to send. Please tap Send in WhatsApp to share it.": "పంపడానికి సిద్ధంగా ఉన్న సందేశంతో వాట్సాప్ తెరుచుకుంటుంది. సందేశాన్ని పంచుకోవడానికి వాట్సాప్‌లో పంపు బటన్‌ను నొక్కండి.",
  "HERE FOR YOUR EVERYDAY NEEDS": "మీ రోజువారీ అవసరాలకు",
  "Local care, made simple.": "స్థానిక సేవలు, సులభంగా.",
  "Visit us in person or get in touch with your medicine request.": "మమ్మల్ని నేరుగా సందర్శించండి లేదా మందుల వివరాలతో సంప్రదించండి.",
  "Medicine requests": "మందుల అభ్యర్థనలు",
  "Share your medicine list through our website form or WhatsApp.": "మా వెబ్‌సైట్ ఫారమ్ లేదా వాట్సాప్ ద్వారా మందుల జాబితా పంపండి.",
  "Delivery or pickup": "డెలివరీ లేదా దుకాణం నుంచి తీసుకోవడం",
  "Choose your preference. We’ll confirm local delivery availability with you.": "మీకు నచ్చిన విధానాన్ని ఎంచుకోండి. మీ ప్రాంతానికి డెలివరీ ఉందో లేదో మేము నిర్ధారిస్తాము.",
  "Convenient hours": "అనుకూలమైన పని వేళలు",
  "A LITTLE LOOK AROUND": "మా దుకాణాన్ని చూడండి",
  "Our store, in Srikakulam.": "Srikakulamలోని మా దుకాణం.",
  "We’d love to show you around. Visit us at Balaga Road, Bondilipuram, Balaga, Srikakulam, Andhra Pradesh – 532001.": "Balaga Road, Bondilipuram, Balaga, Srikakulam, Andhra Pradesh – 532001లోని మా దుకాణాన్ని సందర్శించండి.",
  "Gowri Medicals store photo gallery": "గౌరి మెడికల్స్ దుకాణం ఫోటోలు",
  "View a larger photo of the inside of Gowri Medicals": "గౌరి మెడికల్స్ లోపలి ఫోటోను పెద్దగా చూడండి",
  "Inside Gowri Medicals, showing the medicine shelves and billing counter": "మందుల అరలు, బిల్లింగ్ కౌంటర్‌తో గౌరి మెడికల్స్ లోపలి భాగం",
  "Inside the Store": "దుకాణం లోపలి భాగం",
  "A look inside Gowri Medicals.": "గౌరి మెడికల్స్ లోపలి దృశ్యం.",
  "View a larger photo of the Gowri Medicals storefront": "గౌరి మెడికల్స్ దుకాణం ఫోటోను పెద్దగా చూడండి",
  "Gowri Medicals storefront at Balaga, Srikakulam": "Balaga, Srikakulamలోని Gowri Medicals దుకాణం",
  "Our Storefront": "మా దుకాణం బయట దృశ్యం",
  "Visit us at Balaga Road, Bondilipuram, Balaga, Srikakulam, Andhra Pradesh – 532001.": "Balaga Road, Bondilipuram, Balaga, Srikakulam, Andhra Pradesh – 532001లోని మా దుకాణాన్ని సందర్శించండి.",
  "COME SAY HELLO": "మమ్మల్ని కలవండి",
  "Right here in": "మీకు చేరువలోనే",
  "your neighbourhood.": "మీ పరిసరాల్లో.",
  "Open in Google Maps": "గూగుల్ మ్యాప్స్‌లో చూడండి",
  "Gowri Medicals location in Google Maps": "గూగుల్ మ్యాప్స్‌లో Gowri Medicals స్థానం",
  "DELIVERY LOCATION": "డెలివరీ చిరునామా",
  "Choose Your Exact Delivery Location": "మీ ఖచ్చితమైన డెలివరీ చిరునామాను ఎంచుకోండి",
  "Select your actual destination by GPS, on the map, or with an address. Shop pickup does not need a delivery location.": "GPS, మ్యాప్ లేదా చిరునామా ద్వారా మీ ఖచ్చితమైన స్థలాన్ని ఎంచుకోండి. దుకాణం నుంచి తీసుకునే వారికి డెలివరీ చిరునామా అవసరం లేదు.",
  "Choose a delivery location method": "డెలివరీ చిరునామా ఎంచుకునే విధానం",
  "◎ Use My Current Location": "◎ నా ప్రస్తుత స్థానాన్ని ఉపయోగించండి",
  "⌖ Select on Map": "⌖ మ్యాప్‌లో ఎంచుకోండి",
  "Current location is requested only after you press its button. You can move the map marker to adjust the pin.": "మీరు బటన్ నొక్కినప్పుడు మాత్రమే ప్రస్తుత స్థానానికి అనుమతి అడుగుతాము. మ్యాప్‌లో గుర్తును కదిలించి స్థలాన్ని సరిచేయవచ్చు.",
  "Interactive map to select your delivery location": "డెలివరీ చిరునామా ఎంచుకునే ఇంటరాక్టివ్ మ్యాప్",
  "The delivery map is unavailable. You can still use GPS or enter an address manually.": "డెలివరీ మ్యాప్ అందుబాటులో లేదు. GPS ఉపయోగించండి లేదా చిరునామాను చేతితో నమోదు చేయండి.",
  "Enter Address Manually": "చిరునామాను చేతితో నమోదు చేయండి",
  "Locality in Srikakulam": "శ్రీకాకుళంలోని ప్రాంతం",
  "Select locality": "ప్రాంతాన్ని ఎంచుకోండి",
  "Other Srikakulam locality": "శ్రీకాకుళంలోని మరో ప్రాంతం",
  "Street or area name": "వీధి లేదా ప్రాంతం పేరు",
  "Street, road or area": "వీధి, రోడ్డు లేదా ప్రాంతం",
  "House number / building name": "ఇంటి నంబర్ / భవనం పేరు",
  "House number or building": "ఇంటి నంబర్ లేదా భవనం పేరు",
  "Nearby landmark": "దగ్గరలోని గుర్తింపు స్థలం",
  "A nearby landmark": "దగ్గరలోని గుర్తింపు స్థలం",
  "Additional delivery instructions": "డెలివరీకి అదనపు సూచనలు",
  "Floor, gate, directions for delivery, etc.": "అంతస్తు, గేటు, దారి వివరాలు మొదలైనవి",
  "Find Address on Map": "చిరునామాను మ్యాప్‌లో కనుగొనండి",
  "Choose the matching map result, then adjust the pin if needed:": "సరైన మ్యాప్ చిరునామాను ఎంచుకోండి. అవసరమైతే గుర్తును సరిచేయండి:",
  "Location selected": "స్థలం ఎంచుకున్నారు",
  "The pin can be moved before you confirm the location.": "నిర్ధారించే ముందు గుర్తును కదిలించవచ్చు.",
  "Confirm This Location": "ఈ చిరునామాను నిర్ధారించండి",
  "Home delivery is available every day from 10:00 AM to 9:00 PM. Gowri Medicals will confirm delivery availability.": "హోమ్ డెలివరీ ప్రతిరోజూ ఉదయం 10:00 నుంచి రాత్రి 9:00 వరకు అందుబాటులో ఉంటుంది. డెలివరీ లభ్యతను గౌరి మెడికల్స్ నిర్ధారిస్తుంది.",
  "STARTING POINT": "ప్రారంభ స్థలం",
  "DESTINATION": "చేరాల్సిన స్థలం",
  "Your address": "మీ చిరునామా",
  "ROUTE DISTANCE": "మార్గ దూరం",
  "ESTIMATED DRIVING TIME": "అంచనా ప్రయాణ సమయం",
  "Map showing the route from Gowri Medicals to the entered delivery address": "గౌరి మెడికల్స్ నుంచి డెలివరీ చిరునామా వరకు మార్గం",
  "Route estimates are approximate and may vary with traffic and road conditions.": "మార్గ దూరం, సమయం అంచనా మాత్రమే. ట్రాఫిక్, రహదారి పరిస్థితుల వల్ల మారవచ్చు.",
  "Open Directions in Google Maps": "గూగుల్ మ్యాప్స్‌లో మార్గం చూడండి",
  "GOOD TO KNOW": "మీకు ఉపయోగపడే సమాచారం",
  "Frequently asked": "తరచుగా అడిగే",
  "questions.": "ప్రశ్నలు.",
  "మీకు సహాయం చేయడానికి మేము సిద్ధంగా ఉన్నాము.": "మీకు సహాయం చేయడానికి మేము సిద్ధంగా ఉన్నాము.",
  "Is my medicine order confirmed when I submit the form?": "ఫారమ్ పంపగానే నా మందుల ఆర్డర్ ఖరారు అవుతుందా?",
  "No. The form prepares a request for you to send through WhatsApp. Your request is confirmed only after the shop checks availability and accepts it.": "కాదు. ఈ ఫారమ్ వాట్సాప్‌లో పంపడానికి అభ్యర్థనను సిద్ధం చేస్తుంది. మందులు ఉన్నాయని దుకాణం నిర్ధారించి అంగీకరించిన తర్వాతే మీ అభ్యర్థన ఖరారు అవుతుంది.",
  "Can I request doorstep delivery?": "ఇంటి వద్ద డెలివరీ కోరవచ్చా?",
  "Yes. Choose Doorstep Delivery, then use GPS, select a map pin, or enter your address. Home delivery is available every day from 10:00 AM to 9:00 PM. The shop will confirm delivery coverage and acceptance.": "అవును. ఇంటి వద్ద డెలివరీ ఎంచుకుని GPS ఉపయోగించండి, మ్యాప్‌లో గుర్తు పెట్టండి లేదా చిరునామా నమోదు చేయండి. హోమ్ డెలివరీ ప్రతిరోజూ ఉదయం 10:00 నుంచి రాత్రి 9:00 వరకు అందుబాటులో ఉంటుంది. డెలివరీ లభ్యతను దుకాణం నిర్ధారిస్తుంది.",
  "What are your working hours?": "దుకాణం పని వేళలు ఏమిటి?",
  "Shop Hours: Every day, 8:00 AM – 10:00 PM. Home Delivery: Every day, 10:00 AM – 9:00 PM.": "దుకాణం వేళలు: ప్రతిరోజూ ఉదయం 8:00 – రాత్రి 10:00. హోమ్ డెలివరీ: ప్రతిరోజూ ఉదయం 10:00 – రాత్రి 9:00.",
  "Can I contact either of your WhatsApp numbers?": "మీ వాట్సాప్ నంబర్లలో దేనికైనా సంప్రదించవచ్చా?",
  "Yes. You can send your request to either 9989105144 or 9985358726 using the buttons above, or call either number directly.": "అవును. పైన ఉన్న బటన్ల ద్వారా 9989105144 లేదా 9985358726కు అభ్యర్థన పంపవచ్చు లేదా నేరుగా ఫోన్ చేయవచ్చు.",
  "WE’RE JUST A MESSAGE AWAY": "మాకు సందేశం పంపండి",
  "Need a hand? Talk to us.": "సహాయం కావాలా? మాతో మాట్లాడండి.",
  "Call or WhatsApp either of our shop numbers.": "మా దుకాణం నంబర్లలో దేనికైనా ఫోన్ చేయండి లేదా వాట్సాప్ పంపండి.",
  "Visit us: Balaga Road, Bondilipuram, Balaga, Srikakulam, Andhra Pradesh – 532001.": "మా దుకాణ చిరునామా: Balaga Road, Bondilipuram, Balaga, Srikakulam, Andhra Pradesh – 532001.",
  "PHONE / WHATSAPP 01": "ఫోన్ / వాట్సాప్ 01",
  "PHONE / WHATSAPP 02": "ఫోన్ / వాట్సాప్ 02",
  "Your neighbourhood medical shop in Balaga, Srikakulam.": "Balaga, Srikakulamలో మీకు దగ్గరలోని మెడికల్ షాప్.",
  "FAQs": "తరచుగా అడిగే ప్రశ్నలు",
  "Gowri Medicals. All rights reserved.": "Gowri Medicals. అన్ని హక్కులు ప్రత్యేకించబడ్డాయి.",
  "Balaga Road, Bondilipuram, Balaga, Srikakulam, Andhra Pradesh – 532001.": "Balaga Road, Bondilipuram, Balaga, Srikakulam, Andhra Pradesh – 532001.",
  "Shop address:": "దుకాణం చిరునామా:",
  "Shop location:": "దుకాణం స్థానం:",
  "Gowri Medicals Shop Location:": "Gowri Medicals దుకాణ స్థానం:",
  "Shop Google Maps:": "దుకాణం Google Maps:",
  "Customer Location:": "కస్టమర్ స్థానం:",
  "Customer location: Not shared (optional for shop pickup).": "కస్టమర్ స్థానం: పంచుకోలేదు (దుకాణం నుంచి తీసుకునేటప్పుడు ఐచ్ఛికం).",
  "Customer address:": "కస్టమర్ చిరునామా:",
  "Customer Google Maps:": "కస్టమర్ Google Maps:",
  "Open shop location": "దుకాణ స్థానాన్ని తెరవండి",
  "Not shared (optional for shop pickup).": "పంచుకోలేదు (దుకాణం నుంచి తీసుకునేటప్పుడు ఐచ్ఛికం).",
  "GOWRI MEDICALS": "GOWRI MEDICALS",
  "Map showing Gowri Medicals in Balaga, Srikakulam": "Balaga, Srikakulamలోని Gowri Medicals మ్యాప్",
  "The shop map could not load. Use the official Google Maps location or directions instead.": "దుకాణం మ్యాప్ తెరుచుకోలేదు. అధికారిక Google Maps స్థానం లేదా మార్గాన్ని ఉపయోగించండి.",
  "Shop map loading failed.": "దుకాణం మ్యాప్ లోడ్ కాలేదు.",
  "Contact Gowri Medicals on WhatsApp": "వాట్సాప్‌లో Gowri Medicals‌ను సంప్రదించండి",
  "WhatsApp us": "వాట్సాప్ చేయండి",
  "Select language": "భాషను ఎంచుకోండి",
  "Dark mode": "డార్క్ మోడ్",
  "Light mode": "లైట్ మోడ్",
  "Switch to light mode": "లైట్ మోడ్‌కు మారండి",
  "Switch to dark mode": "డార్క్ మోడ్‌కు మారండి",
  "Doorstep Delivery": "ఇంటి వద్ద డెలివరీ",
  "Shop Pickup": "దుకాణం నుంచి తీసుకోవడం",
  "Urgent request": "అత్యవసర అభ్యర్థన",
  "Standard request": "సాధారణ అభ్యర్థన",
  "Medicine request — Gowri Medicals": "మందుల అభ్యర్థన — Gowri Medicals",
  "Reference:": "రిఫరెన్స్:",
  "Name:": "పేరు:",
  "Mobile:": "మొబైల్:",
  "Preference:": "మందులు పొందే విధానం:",
  "Locality:": "ప్రాంతం:",
  "Exact address:": "ఖచ్చితమైన చిరునామా:",
  "Landmark:": "గుర్తింపు స్థలం:",
  "Not provided": "ఇవ్వలేదు",
  "Latitude:": "అక్షాంశం:",
  "Longitude:": "రేఖాంశం:",
  "Customer map:": "కస్టమర్ స్థానం మ్యాప్:",
  "Shop-to-customer directions:": "దుకాణం నుంచి కస్టమర్ చిరునామాకు మార్గం:",
  "Delivery instructions:": "డెలివరీ సూచనలు:",
  "None": "ఏమీ లేవు",
  "Location: Not required (shop pickup)": "చిరునామా: అవసరం లేదు (దుకాణం నుంచి తీసుకోవడం)",
  "Medicines:": "మందులు:",
  "Qty": "సంఖ్య",
  "Additional instructions:": "అదనపు సూచనలు:",
  "Urgent:": "అత్యవసరం:",
  "Yes": "అవును",
  "No": "కాదు",
  "I understand this is a request only, not a confirmed order. Please confirm availability and acceptance.": "ఇది అభ్యర్థన మాత్రమే, ఖరారైన ఆర్డర్ కాదు అని అర్థం చేసుకున్నాను. మందుల లభ్యతను నిర్ధారించి, అభ్యర్థనను అంగీకరించండి.",
  "Not required (shop pickup)": "అవసరం లేదు (దుకాణం నుంచి తీసుకోవడం)",
  "Selected map location": "మ్యాప్‌లో ఎంచుకున్న స్థలం",
  "Instructions": "సూచనలు",
  "Urgency": "అత్యవసరం",
  "Order reference": "ఆర్డర్ రిఫరెన్స్",
  "Customer": "కస్టమర్",
  "Preference": "మందులు పొందే విధానం",
  "Locality": "ప్రాంతం",
  "Exact address": "ఖచ్చితమైన చిరునామా",
  "Landmark": "గుర్తింపు స్థలం",
  "Coordinates": "కోఆర్డినేట్లు",
  "Customer map": "కస్టమర్ స్థానం మ్యాప్",
  "Open destination location": "డెలివరీ స్థలాన్ని తెరవండి",
  "Shop-to-customer directions": "దుకాణం నుంచి కస్టమర్ చిరునామాకు మార్గం",
  "Open driving directions": "డ్రైవింగ్ మార్గాన్ని తెరవండి",
  "Medicines": "మందులు",
  "Urgent medicine request": "అత్యవసర మందుల అభ్యర్థన",
  "Standard request": "సాధారణ అభ్యర్థన",
  "Please enter a medicine name and a quantity between 1 and 99 for every item.": "ప్రతి మందు పేరుతో పాటు 1 నుంచి 99 మధ్య పరిమాణాన్ని నమోదు చేయండి.",
  "Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.": "6, 7, 8 లేదా 9తో ప్రారంభమయ్యే సరైన 10 అంకెల భారతీయ మొబైల్ నంబర్ నమోదు చేయండి.",
  "Choose and confirm your exact delivery location before requesting doorstep delivery.": "ఇంటి వద్ద డెలివరీ కోరే ముందు మీ ఖచ్చితమైన చిరునామాను ఎంచుకుని నిర్ధారించండి.",
  "Choose your exact delivery location before continuing.": "కొనసాగించే ముందు మీ ఖచ్చితమైన డెలివరీ చిరునామాను ఎంచుకోండి.",
  "Location permission was denied. Allow location access in your browser settings, or select on the map / enter the address manually.": "స్థాన అనుమతి నిరాకరించబడింది. బ్రౌజర్ సెట్టింగ్స్‌లో అనుమతించండి లేదా మ్యాప్‌లో ఎంచుకోండి / చిరునామాను చేతితో నమోదు చేయండి.",
  "Your location is unavailable. Check your device GPS and internet connection, or select on the map / enter the address manually.": "మీ స్థానం అందుబాటులో లేదు. పరికర GPS, ఇంటర్నెట్‌ను తనిఖీ చేయండి లేదా మ్యాప్‌లో ఎంచుకోండి / చిరునామాను చేతితో నమోదు చేయండి.",
  "Getting your location timed out. Try again or select on the map / enter the address manually.": "మీ స్థానం పొందడానికి ఎక్కువ సమయం పట్టింది. మళ్లీ ప్రయత్నించండి లేదా మ్యాప్‌లో ఎంచుకోండి / చిరునామాను చేతితో నమోదు చేయండి.",
  "Could not get your location. Select on the map or enter the address manually.": "మీ స్థానం పొందలేకపోయాము. మ్యాప్‌లో ఎంచుకోండి లేదా చిరునామాను చేతితో నమోదు చేయండి.",
  "Please select a destination within Srikakulam town.": "శ్రీకాకుళం పట్టణ పరిధిలోని చిరునామాను ఎంచుకోండి.",
  "Location selected. Adjust the pin if needed, then confirm it.": "స్థలం ఎంచుకున్నారు. అవసరమైతే గుర్తును సరిచేసి, నిర్ధారించండి.",
  "Location selected — please confirm": "స్థలం ఎంచుకున్నారు — దయచేసి నిర్ధారించండి",
  "Delivery location confirmed": "డెలివరీ చిరునామా నిర్ధారించబడింది",
  "Delivery location confirmed.": "డెలివరీ స్థానం నిర్ధారించబడింది.",
  "Selected delivery pin": "ఎంచుకున్న డెలివరీ గుర్తు",
  "No readable address found. Confirm the selected coordinates.": "చదవగల చిరునామా దొరకలేదు. ఎంచుకున్న కోఆర్డినేట్లను నిర్ధారించండి.",
  "Try loading the map again": "మ్యాప్‌ను మళ్లీ లోడ్ చేయండి",
  "MapLibre GL JS could not be loaded from the available public CDNs.": "అందుబాటులో ఉన్న పబ్లిక్ CDNల నుంచి MapLibre GL JS లోడ్ కాలేదు.",
  "Select a valid location on the map.": "మ్యాప్‌లో సరైన స్థానాన్ని ఎంచుకోండి.",
  "Selected map coordinates": "మ్యాప్‌లో ఎంచుకున్న కోఆర్డినేట్లు",
  "Location confirmed. Preparing your map and driving directions.": "చిరునామా నిర్ధారించబడింది. మ్యాప్, డ్రైవింగ్ మార్గాన్ని సిద్ధం చేస్తున్నాము.",
  "Your delivery location is confirmed for this request. The route and travel time are estimates.": "ఈ అభ్యర్థనకు మీ డెలివరీ చిరునామా నిర్ధారించబడింది. మార్గం, ప్రయాణ సమయం అంచనా మాత్రమే.",
  "Location confirmed. Road routing is unavailable, but the map pins and Google Maps directions are ready.": "చిరునామా నిర్ధారించబడింది. రహదారి మార్గం అందుబాటులో లేదు; మ్యాప్ గుర్తులు, గూగుల్ మ్యాప్స్ మార్గం సిద్ధంగా ఉన్నాయి.",
  "Location confirmed. No road route was returned, but Google Maps directions are ready.": "చిరునామా నిర్ధారించబడింది. రహదారి మార్గం లభించలేదు; గూగుల్ మ్యాప్స్ మార్గం సిద్ధంగా ఉంది.",
  "Location confirmed. The on-page map or route could not load; Google Maps directions are ready below.": "చిరునామా నిర్ధారించబడింది. ఈ పేజీలో మ్యాప్ లేదా మార్గం తెరవలేదు; క్రింద గూగుల్ మ్యాప్స్ మార్గం సిద్ధంగా ఉంది.",
  "Could not find a confident address match. Use the map to place the pin at your building, or try a more specific street or landmark.": "సరైన చిరునామా దొరకలేదు. మీ ఇంటి వద్ద మ్యాప్ గుర్తును ఉంచండి లేదా మరింత స్పష్టమైన వీధి / గుర్తింపు స్థలం నమోదు చేయండి.",
  "No confident address match was found. Use the map to place the pin at your building, or try a more specific street or landmark.": "సరైన చిరునామా దొరకలేదు. మీ ఇంటి వద్ద మ్యాప్ గుర్తును ఉంచండి లేదా మరింత స్పష్టమైన వీధి / గుర్తింపు స్థలం నమోదు చేయండి.",
  "Searching addresses…": "చిరునామాలను వెతుకుతున్నాము…",
  "Searching for address suggestions. If no exact match is available, place the pin on the map.": "చిరునామాలను వెతుకుతున్నాము. సరైన చిరునామా దొరకకపోతే మ్యాప్‌లో గుర్తును ఉంచండి.",
  "Select the matching address below. You can adjust its pin on the map before confirming.": "క్రింద సరైన చిరునామాను ఎంచుకోండి. నిర్ధారించే ముందు మ్యాప్‌లో గుర్తును సరిచేయవచ్చు.",
  "No exact result found. Place the delivery pin on the map to choose the location.": "ఖచ్చితమైన చిరునామా దొరకలేదు. స్థలాన్ని ఎంచుకోవడానికి మ్యాప్‌లో డెలివరీ గుర్తును ఉంచండి.",
  "Address lookup failed. You can still select the exact location on the map or use GPS.": "చిరునామా వెతకడం సాధ్యం కాలేదు. మ్యాప్‌లో ఖచ్చితమైన స్థలాన్ని ఎంచుకోవచ్చు లేదా GPS ఉపయోగించవచ్చు.",
  "The pin is selected, but its address could not be resolved. You can still confirm the map location.": "మ్యాప్‌లో స్థలం ఎంచుకున్నారు, కానీ చిరునామా దొరకలేదు. ఈ స్థలాన్ని నిర్ధారించవచ్చు.",
  "No road route was returned. The selected start and destination are shown on the map; open Google Maps for the complete route.": "రహదారి మార్గం లభించలేదు. మ్యాప్‌లో ప్రారంభం, గమ్యం చూపించాము; పూర్తి మార్గం కోసం గూగుల్ మ్యాప్స్ తెరవండి.",
  "Road distance and driving time are estimates from the available route and may vary with traffic and road conditions.": "రహదారి దూరం, ప్రయాణ సమయం అందుబాటులో ఉన్న మార్గం ఆధారంగా అంచనా మాత్రమే. ట్రాఫిక్, రహదారి పరిస్థితుల వల్ల మారవచ్చు.",
  "Select a location using GPS, the map or address search before confirming.": "నిర్ధారించే ముందు GPS, మ్యాప్ లేదా చిరునామా ద్వారా స్థలాన్ని ఎంచుకోండి.",
  "Use the map to place the pin at your building, or try a more specific street or landmark.": "మీ ఇంటి వద్ద మ్యాప్ గుర్తును ఉంచండి లేదా మరింత స్పష్టమైన వీధి / గుర్తింపు స్థలాన్ని నమోదు చేయండి.",
  "The address was found, but the map did not load. Check your internet connection, then try Select on Map.": "చిరునామా దొరికింది, కానీ మ్యాప్ తెరుచుకోలేదు. ఇంటర్నెట్‌ను తనిఖీ చేసి, మళ్లీ మ్యాప్‌లో ఎంచుకోండి.",
  "The interactive map did not load. Check your internet connection.": "ఇంటరాక్టివ్ మ్యాప్ తెరుచుకోలేదు. మీ ఇంటర్నెట్‌ను తనిఖీ చేయండి.",
  "Map loading timed out. Check your internet connection and try again.": "మ్యాప్ తెరవడానికి ఎక్కువ సమయం పట్టింది. ఇంటర్నెట్‌ను తనిఖీ చేసి మళ్లీ ప్రయత్నించండి.",
  "Driving route could not be calculated. Google Maps directions are available below.": "డ్రైవింగ్ మార్గాన్ని లెక్కించలేకపోయాము. క్రింద గూగుల్ మ్యాప్స్ మార్గం అందుబాటులో ఉంది.",
  "Could not load the route map. Google Maps directions are available below.": "మార్గం మ్యాప్ తెరవలేకపోయాము. క్రింద గూగుల్ మ్యాప్స్ మార్గం అందుబాటులో ఉంది.",
  "Use Ctrl + scroll to zoom the map": "మ్యాప్‌ను జూమ్ చేయడానికి Ctrl నొక్కి స్క్రోల్ చేయండి",
  "Use two fingers to move the map": "మ్యాప్‌ను కదిలించడానికి రెండు వేళ్లతో లాగండి",
  "Zoom in": "జూమ్ పెంచండి",
  "Zoom out": "జూమ్ తగ్గించండి",
  "Reset bearing to north": "మ్యాప్ దిశను ఉత్తరానికి మార్చండి",
  "Map": "మ్యాప్",
  "Toggle attribution": "మ్యాప్ వివరాలను చూపించండి లేదా దాచండి",
  "Customer delivery location": "కస్టమర్ డెలివరీ చిరునామా",
  "Location details are not needed for shop pickup.": "దుకాణం నుంచి తీసుకునే వారికి చిరునామా అవసరం లేదు.",
  "Choose and confirm your exact delivery location below.": "క్రింద మీ ఖచ్చితమైన డెలివరీ చిరునామాను ఎంచుకుని నిర్ధారించండి.",
  "You can still use GPS or enter an address manually.": "మీరు GPS ఉపయోగించవచ్చు లేదా చిరునామాను చేతితో నమోదు చేయవచ్చు.",
  "Tap the map to place your delivery pin. Drag the pin to adjust it.": "డెలివరీ స్థలాన్ని గుర్తించడానికి మ్యాప్‌ను తాకండి. గుర్తును కదిలించి సరిచేయవచ్చు.",
  "Map unavailable. You can still use GPS, enter an address, and open directions in Google Maps.": "మ్యాప్ అందుబాటులో లేదు. GPS ఉపయోగించండి, చిరునామా నమోదు చేయండి లేదా గూగుల్ మ్యాప్స్‌లో మార్గం చూడండి.",
  "Current location requires browser permission and a secure connection (HTTPS or localhost). Select on Map or enter an address instead.": "ప్రస్తుత స్థానానికి బ్రౌజర్ అనుమతి, సురక్షిత కనెక్షన్ (HTTPS లేదా localhost) అవసరం. బదులుగా మ్యాప్‌లో ఎంచుకోండి లేదా చిరునామా నమోదు చేయండి.",
  "Requesting your location. Please allow access in your browser if prompted.": "మీ స్థానాన్ని పొందుతున్నాము. బ్రౌజర్ అనుమతి అడిగితే అనుమతించండి.",
  "Your current location appears to be outside Srikakulam town. You can still set a delivery address manually or on the map.": "మీ ప్రస్తుత స్థానం శ్రీకాకుళం పట్టణం వెలుపల ఉన్నట్లు ఉంది. చిరునామాను చేతితో నమోదు చేయండి లేదా మ్యాప్‌లో ఎంచుకోండి.",
  "Map unavailable. Your GPS coordinates are selected; you can confirm them and open directions in Google Maps.": "మ్యాప్ అందుబాటులో లేదు. మీ GPS స్థానం ఎంచుకున్నాము; దాన్ని నిర్ధారించి గూగుల్ మ్యాప్స్‌లో మార్గం చూడవచ్చు.",
  "Address lookup could not be completed. You can still select the exact location on the map or use GPS.": "చిరునామా వెతకడం సాధ్యం కాలేదు. మ్యాప్‌లో ఖచ్చితమైన స్థలాన్ని ఎంచుకోవచ్చు లేదా GPS ఉపయోగించవచ్చు.",
  "Map unavailable. You can still open Google Maps using your selected coordinates.": "మ్యాప్ అందుబాటులో లేదు. మీరు ఎంచుకున్న కోఆర్డినేట్లతో గూగుల్ మ్యాప్స్‌ను తెరవవచ్చు.",
  "Location confirmed. Preparing your map and driving directions.": "చిరునామా నిర్ధారించబడింది. మ్యాప్, డ్రైవింగ్ మార్గాన్ని సిద్ధం చేస్తున్నాము.",
  "Location selected. Adjust the pin if needed, then confirm it.": "స్థలం ఎంచుకున్నారు. అవసరమైతే గుర్తును సరిచేసి, నిర్ధారించండి.",
  "The address was found, but the map did not load. Check your internet connection, then try Select on Map.": "చిరునామా దొరికింది, కానీ మ్యాప్ తెరుచుకోలేదు. ఇంటర్నెట్‌ను తనిఖీ చేసి, మళ్లీ మ్యాప్‌లో ఎంచుకోండి.",
  "Tap the map to place your delivery pin. Drag the pin to adjust it.": "డెలివరీ స్థలాన్ని గుర్తించడానికి మ్యాప్‌ను తాకండి. గుర్తును కదిలించి సరిచేయవచ్చు.",
  "Map unavailable. You can still use GPS, enter an address, and open directions in Google Maps.": "మ్యాప్ అందుబాటులో లేదు. GPS ఉపయోగించండి, చిరునామా నమోదు చేయండి లేదా గూగుల్ మ్యాప్స్‌లో మార్గం చూడండి.",
  "Current location requires browser permission and a secure connection (HTTPS or localhost). Select on Map or enter an address instead.": "ప్రస్తుత స్థానానికి బ్రౌజర్ అనుమతి, సురక్షిత కనెక్షన్ (HTTPS లేదా localhost) అవసరం. బదులుగా మ్యాప్‌లో ఎంచుకోండి లేదా చిరునామా నమోదు చేయండి.",
  "Requesting your location. Please allow access in your browser if prompted.": "మీ స్థానాన్ని పొందుతున్నాము. బ్రౌజర్ అనుమతి అడిగితే అనుమతించండి.",
  "Your current location appears to be outside Srikakulam town. You can still set a delivery address manually or on the map.": "మీ ప్రస్తుత స్థానం శ్రీకాకుళం పట్టణం వెలుపల ఉన్నట్లు ఉంది. చిరునామాను చేతితో నమోదు చేయండి లేదా మ్యాప్‌లో ఎంచుకోండి.",
  "Map unavailable. Your GPS coordinates are selected; you can confirm them and open directions in Google Maps.": "మ్యాప్ అందుబాటులో లేదు. మీ GPS స్థానం ఎంచుకున్నాము; దాన్ని నిర్ధారించి గూగుల్ మ్యాప్స్‌లో మార్గం చూడవచ్చు.",
  "Searching for address suggestions. If no exact match is available, place the pin on the map.": "చిరునామాలను వెతుకుతున్నాము. సరైన చిరునామా దొరకకపోతే మ్యాప్‌లో గుర్తును ఉంచండి.",
  "Select the matching address below. You can adjust its pin on the map before confirming.": "క్రింద సరైన చిరునామాను ఎంచుకోండి. నిర్ధారించే ముందు మ్యాప్‌లో గుర్తును సరిచేయవచ్చు.",
  "No exact result found. Place the delivery pin on the map to choose the location.": "ఖచ్చితమైన చిరునామా దొరకలేదు. స్థలాన్ని ఎంచుకోవడానికి మ్యాప్‌లో డెలివరీ గుర్తును ఉంచండి.",
  "Address lookup failed. You can still select the exact location on the map or use GPS.": "చిరునామా వెతకడం సాధ్యం కాలేదు. మ్యాప్‌లో ఖచ్చితమైన స్థలాన్ని ఎంచుకోవచ్చు లేదా GPS ఉపయోగించవచ్చు.",
  "The pin is selected, but its address could not be resolved. You can still confirm the map location.": "మ్యాప్‌లో స్థలం ఎంచుకున్నారు, కానీ చిరునామా దొరకలేదు. ఈ స్థలాన్ని నిర్ధారించవచ్చు.",
  "Location confirmed. Road routing is unavailable, but the map pins and Google Maps directions are ready.": "చిరునామా నిర్ధారించబడింది. రహదారి మార్గం అందుబాటులో లేదు; మ్యాప్ గుర్తులు, గూగుల్ మ్యాప్స్ మార్గం సిద్ధంగా ఉన్నాయి.",
  "Location confirmed. No road route was returned, but Google Maps directions are ready.": "చిరునామా నిర్ధారించబడింది. రహదారి మార్గం లభించలేదు; గూగుల్ మ్యాప్స్ మార్గం సిద్ధంగా ఉంది.",
  "Choose a location using GPS, the map or address search before confirming.": "నిర్ధారించే ముందు GPS, మ్యాప్ లేదా చిరునామా ద్వారా స్థలాన్ని ఎంచుకోండి.",
  "Your delivery location is confirmed for this request. The route and travel time are estimates.": "ఈ అభ్యర్థనకు మీ డెలివరీ చిరునామా నిర్ధారించబడింది. మార్గం, ప్రయాణ సమయం అంచనా మాత్రమే.",
  "Location confirmed. The on-page map or route could not load; Google Maps directions are ready below.": "చిరునామా నిర్ధారించబడింది. ఈ పేజీలో మ్యాప్ లేదా మార్గం తెరవలేదు; క్రింద గూగుల్ మ్యాప్స్ మార్గం సిద్ధంగా ఉంది.",
  "Geocoding by Photon · Routing by OSRM": "చిరునామా శోధన: Photon · మార్గం: OSRM",
  "Please complete this required field.": "దయచేసి ఈ తప్పనిసరి వివరాన్ని నమోదు చేయండి.",
  "Enter a valid 10-digit Indian mobile number.": "సరైన 10 అంకెల భారతీయ మొబైల్ నంబర్ నమోదు చేయండి.",
  "Enter a quantity between 1 and 99.": "1 నుంచి 99 మధ్య పరిమాణాన్ని నమోదు చేయండి."
});
const englishTranslations = Object.freeze(
  Object.fromEntries(Object.entries(teluguTranslations).map(([english, telugu]) => [telugu, english]))
);
let currentLanguage = document.documentElement.lang === "te" ? "te" : "en";
const routeSection = document.querySelector("#route");
const routeStatus = document.querySelector("#route-status");
const routeResults = document.querySelector("#route-results");
const routeMapWrap = document.querySelector(".route-map-wrap");
const routeGoogleLink = document.querySelector("#route-google-link");
const routeMetrics = document.querySelector("#route-metrics");
const manualAddressForm = document.querySelector("#manual-address-form");
const pickerMapPanel = document.querySelector("#picker-map-panel");
const selectedLocationCard = document.querySelector("#selected-location-card");
const locationConfirmationSuccess = document.querySelector("#location-confirmation-success");
const deliveryLocationSection = document.querySelector("#route");
const locationMethodButtons = [...document.querySelectorAll(".location-method")];
const fulfilmentInputs = [...form.querySelectorAll('input[name="fulfilment"]')];
let routeMap;
let routeMarkers = [];
let routeHasLine = false;
let shopMap;
let pickerMap;
let pickerMarker;
let mapLibrePromise;
const mapReadyPromises = new WeakMap();
let selectedLocation;
let confirmedLocation;
let activeLocationMethod;
let gpsLocationAvailable = false;
let latestOrder;
let reverseLookupSequence = 0;
let reverseLookupTimer;
let routeRequestSequence = 0;
const mapStyleUrl = "https://tiles.openfreemap.org/styles/liberty";

document.querySelector("#official-shop-map-link").href = shopLocation.googleMapsUrl;
document.querySelector("#shop-directions-link").href = shopLocation.directionsUrl;

function translate(message) {
  return currentLanguage === "te" ? (teluguTranslations[message] || message) : message;
}

function translateDocument() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let node;
  while ((node = walker.nextNode())) {
    if (node.parentElement.closest('[data-user-content="true"]')) continue;
    const original = node.nodeValue;
    const phrase = original.trim();
    const localized = currentLanguage === "te"
      ? teluguTranslations[phrase]
      : englishTranslations[phrase];
    if (localized) {
      node.nodeValue = `${original.slice(0, original.indexOf(phrase))}${localized}${original.slice(original.indexOf(phrase) + phrase.length)}`;
    }
  }

  document.querySelectorAll("[placeholder], [aria-label], [title], [alt]").forEach((element) => {
    ["placeholder", "aria-label", "title", "alt"].forEach((attribute) => {
      const value = element.getAttribute(attribute);
      if (!value) return;
      const localized = currentLanguage === "te" ? teluguTranslations[value] : englishTranslations[value];
      if (localized) element.setAttribute(attribute, localized);
    });
  });

  const heading = document.querySelector("#hero-title");
  if (heading) {
    heading.replaceChildren();
    const firstLine = document.createElement("span");
    firstLine.textContent = translate("Your Local Pharmacy,");
    heading.append(firstLine, document.createElement("br"), document.createTextNode(translate("Here to Help.")));
  }
  document.documentElement.lang = currentLanguage;
  document.title = translate("Gowri Medicals | Your Local Pharmacy");
  document.querySelector("#language-select").value = currentLanguage;
  updateThemeControl();
}

function setLanguage(language) {
  currentLanguage = language === "te" ? "te" : "en";
  try {
    localStorage.setItem("gm-language", currentLanguage);
  } catch {
    // The preference remains active for the current page if storage is unavailable.
  }
  translateDocument();
  updateFulfilmentHoursStatus();
  if (selectedLocation) updateSelectedLocationCard();
  if (confirmedLocation && !routeResults.hidden) {
    document.querySelector("#route-destination").textContent =
      confirmedLocation.address || translate("Selected map location");
    document.querySelector("#route-locality-label").textContent =
      confirmedLocation.locality || translate("Selected map coordinates");
  } else if (routeResults.hidden) {
    document.querySelector("#route-destination").textContent = translate("Your address");
    document.querySelector("#route-locality-label").textContent = "Srikakulam";
  }
  document.querySelectorAll("form input, form select, form textarea").forEach((field) => {
    field.setCustomValidity("");
  });
  if (latestOrder) buildSummary(latestOrder);
}

function updateThemeControl() {
  const dark = document.documentElement.dataset.theme !== "light";
  const label = dark ? "Dark mode" : "Light mode";
  document.querySelector("#theme-label").textContent = translate(label);
  document.querySelector("#theme-toggle").setAttribute("aria-label", translate(dark ? "Switch to light mode" : "Switch to dark mode"));
  document.querySelector("#theme-toggle").setAttribute("aria-pressed", String(!dark));
}

function setTheme(theme) {
  const selectedTheme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = selectedTheme;
  document.querySelector('meta[name="theme-color"]').content = selectedTheme === "light" ? "#f5f8f5" : "#07130f";
  try {
    localStorage.setItem("gm-theme", selectedTheme);
  } catch {
    // The preference remains active for the current page if storage is unavailable.
  }
  updateThemeControl();
}

document.querySelector("#theme-toggle").addEventListener("click", () => {
  setTheme(document.documentElement.dataset.theme === "light" ? "dark" : "light");
});
document.querySelector("#language-select").addEventListener("change", (event) => {
  setLanguage(event.target.value);
});
setTheme(document.documentElement.dataset.theme);
translateDocument();

function createMedicineRow() {
  const row = document.createElement("div");
  row.className = "medicine-row";
  row.innerHTML = `
    <label class="field medicine-name">${translate("Medicine name")} <span class="required">*</span>
      <input name="medicine" type="text" placeholder="${translate("e.g. medicine name")}" required maxlength="100">
    </label>
    <label class="field medicine-quantity">${translate("Qty")} <span class="required">*</span>
      <input name="quantity" type="number" min="1" max="99" value="1" inputmode="numeric" required>
    </label>
    <button class="remove-medicine" type="button" aria-label="${translate("Remove medicine")}">×</button>
  `;
  return row;
}

function updateMedicineRows() {
  const rows = medicineList.querySelectorAll(".medicine-row");
  rows.forEach((row) => {
    const removeButton = row.querySelector(".remove-medicine");
    removeButton.hidden = rows.length === 1;
  });
}

function showError(message) {
  formError.textContent = translate(message);
  formError.hidden = false;
  formError.scrollIntoView({ behavior: "smooth", block: "center" });
}

function addSummaryItem(label, value, className = "") {
  const item = document.createElement("div");
  item.className = `summary-item ${className}`.trim();
  const title = document.createElement("span");
  title.textContent = translate(label);
  const content = document.createElement("strong");
  content.textContent = value;
  content.dataset.userContent = "true";
  item.append(title, content);
  summaryContent.append(item);
}

function addSummaryLink(label, value, href) {
  const item = document.createElement("div");
  item.className = "summary-item summary-map-link";
  const title = document.createElement("span");
  title.textContent = translate(label);
  const link = document.createElement("a");
  link.textContent = translate(value);
  link.href = href;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  item.append(title, link);
  summaryContent.append(item);
}

function createGoogleDirectionsLink(destination) {
  const directions = new URL("https://www.google.com/maps/dir/");
  directions.searchParams.set("api", "1");
  directions.searchParams.set("origin", `${shopLocation.latitude},${shopLocation.longitude}`);
  directions.searchParams.set("destination", `${destination.latitude},${destination.longitude}`);
  directions.searchParams.set("travelmode", "driving");
  return directions.toString();
}

function createGoogleDestinationLink(destination) {
  const search = new URL("https://www.google.com/maps/search/");
  search.searchParams.set("api", "1");
  search.searchParams.set("query", `${destination.latitude},${destination.longitude}`);
  return search.toString();
}

function buildSummary(order) {
  latestOrder = order;
  summaryContent.replaceChildren();
  addSummaryItem("Order reference", order.reference);
  addSummaryItem("Customer", order.name);
  addSummaryItem("Mobile", order.mobile);
  addSummaryItem("Preference", translate(order.fulfilment));
  addSummaryItem(
    "Service hours",
    translate(order.fulfilment === "Doorstep Delivery"
      ? "Home delivery: 10:00 AM – 9:00 PM every day"
      : "Shop pickup: 8:00 AM – 10:00 PM every day")
  );
  addSummaryItem("Gowri Medicals Shop Location:", shopLocation.address);
  addSummaryLink("Shop Google Maps:", "Open shop location", shopLocation.googleMapsUrl);
  if (order.destination) {
    addSummaryItem(
      "Customer Location:",
      order.destination.address || `${order.destination.latitude.toFixed(6)}, ${order.destination.longitude.toFixed(6)}`
    );
    if (order.destination.locality) addSummaryItem("Locality", order.destination.locality);
    if (order.destination.address) addSummaryItem("Customer address:", order.destination.address);
    if (order.destination.landmark) addSummaryItem("Landmark", order.destination.landmark);
    addSummaryItem("Coordinates", `${order.destination.latitude.toFixed(6)}, ${order.destination.longitude.toFixed(6)}`);
    addSummaryLink("Customer Google Maps:", "Open destination location", createGoogleDestinationLink(order.destination));
    if (order.fulfilment === "Doorstep Delivery") {
      addSummaryLink("Shop-to-customer directions", "Open driving directions", createGoogleDirectionsLink(order.destination));
    }
    if (order.fulfilment === "Doorstep Delivery" && order.destination.instructions) {
      addSummaryItem("Instructions", order.destination.instructions);
    }
  } else {
    addSummaryItem("Customer Location:", translate("Not shared (optional for shop pickup)."));
  }

  const medicines = document.createElement("div");
  medicines.className = "summary-item summary-medicines";
  const label = document.createElement("span");
  label.textContent = translate("Medicines");
  const list = document.createElement("ul");
  order.medicines.forEach((medicine) => {
    const item = document.createElement("li");
    item.textContent = `${medicine.name} — ${translate("Qty")} ${medicine.quantity}`;
    list.append(item);
  });
  medicines.append(label, list);
  summaryContent.append(medicines);

  if (order.instructions) addSummaryItem("Additional instructions:", order.instructions);
  addSummaryItem("Urgency", translate(order.urgent ? "Urgent request" : "Standard request"));

  const message = [
    translate("Medicine request — Gowri Medicals"),
    `${translate("Reference:")} ${order.reference}`,
    `${translate("Name:")} ${order.name}`,
    `${translate("Mobile:")} ${order.mobile}`,
    `${translate("Preference:")} ${translate(order.fulfilment)}`,
    `${translate("Shop Hours:")} ${translate("Every day, 8:00 AM – 10:00 PM")}`,
    `${translate("Home Delivery:")} ${translate("Every day, 10:00 AM – 9:00 PM")}`,
    "",
    translate("Gowri Medicals Shop Location:"),
    `${translate("Shop address:")} ${shopLocation.address}`,
    `${translate("Shop Google Maps:")} ${shopLocation.googleMapsUrl}`,
    "",
    translate("Customer Location:"),
    ...(order.destination
      ? [
          ...(order.destination.locality ? [`${translate("Locality:")} ${order.destination.locality}`] : []),
          ...(order.destination.address ? [`${translate("Customer address:")} ${order.destination.address}`] : []),
          ...(order.destination.landmark ? [`${translate("Landmark:")} ${order.destination.landmark}`] : []),
          `${translate("Latitude:")} ${order.destination.latitude.toFixed(6)}`,
          `${translate("Longitude:")} ${order.destination.longitude.toFixed(6)}`,
          `${translate("Customer Google Maps:")} ${createGoogleDestinationLink(order.destination)}`,
          ...(order.fulfilment === "Doorstep Delivery" && order.destination.instructions
            ? [`${translate("Delivery instructions:")} ${order.destination.instructions}`]
            : [])
        ]
      : [translate("Customer location: Not shared (optional for shop pickup).")]),
    translate("Medicines:"),
    ...order.medicines.map((medicine) => `- ${medicine.name} — ${translate("Qty")} ${medicine.quantity}`),
    `${translate("Additional instructions:")} ${order.instructions || translate("None")}`,
    `${translate("Urgent:")} ${translate(order.urgent ? "Yes" : "No")}`,
    "",
    translate("I understand this is a request only, not a confirmed order. Please confirm availability and acceptance.")
  ].join("\n");
  document.querySelector("#whatsapp-one").href = `https://wa.me/${shopNumbers[0]}?text=${encodeURIComponent(message)}`;
  document.querySelector("#whatsapp-two").href = `https://wa.me/${shopNumbers[1]}?text=${encodeURIComponent(message)}`;
}

addMedicineButton.addEventListener("click", () => {
  const row = createMedicineRow();
  medicineList.append(row);
  updateMedicineRows();
  row.querySelector('input[name="medicine"]').focus();
});

medicineList.addEventListener("click", (event) => {
  const removeButton = event.target.closest(".remove-medicine");
  if (!removeButton) return;
  removeButton.closest(".medicine-row").remove();
  updateMedicineRows();
});

form.addEventListener("input", () => {
  formError.hidden = true;
  summary.hidden = true;
});

form.addEventListener("change", () => {
  summary.hidden = true;
});

function addLocalizedValidation(formElement) {
  formElement.addEventListener("invalid", (event) => {
    const field = event.target;
    if (field.validity.valueMissing) {
      field.setCustomValidity(translate("Please complete this required field."));
    } else if (field.validity.patternMismatch) {
      field.setCustomValidity(translate("Enter a valid 10-digit Indian mobile number."));
    } else if (field.validity.rangeUnderflow || field.validity.rangeOverflow) {
      field.setCustomValidity(translate("Enter a quantity between 1 and 99."));
    }
  }, true);
  formElement.addEventListener("input", (event) => {
    if (event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLSelectElement ||
        event.target instanceof HTMLTextAreaElement) {
      const fields = event.target instanceof HTMLInputElement && event.target.type === "radio"
        ? [...formElement.elements].filter((field) => field.name === event.target.name)
        : [event.target];
      fields.forEach((field) => field.setCustomValidity(""));
    }
  });
  formElement.addEventListener("change", (event) => {
    if (event.target instanceof HTMLInputElement && event.target.type === "radio") {
      [...formElement.elements]
        .filter((field) => field.name === event.target.name)
        .forEach((field) => field.setCustomValidity(""));
    }
  });
}

addLocalizedValidation(form);

function syncLocationMethodPanels() {
  const fulfilment = form.querySelector('input[name="fulfilment"]:checked')?.value;
  const fulfilmentSelected = Boolean(fulfilment);
  const deliverySelected = fulfilment === "Doorstep Delivery";
  const manualSelected = activeLocationMethod === "manual";
  const mapVisible = activeLocationMethod === "map" ||
    (activeLocationMethod === "gps" && gpsLocationAvailable);
  deliveryLocationSection.hidden = !fulfilmentSelected;
  document.querySelector("#skip-location-sharing").hidden = deliverySelected;
  pickerMapPanel.hidden = !mapVisible;
  manualAddressForm.hidden = !manualSelected;
  manualAddressForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.disabled = !manualSelected || !fulfilmentSelected;
  });
  locationMethodButtons.forEach((button) => {
    const selected = button.dataset.locationMethod === activeLocationMethod;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });
  document.querySelector(".submit-button").disabled =
    !fulfilment || (deliverySelected && !confirmedLocation);
}

function setLocationMethod(method) {
  if (method !== activeLocationMethod) {
    window.clearTimeout(reverseLookupTimer);
    reverseLookupSequence += 1;
    routeRequestSequence += 1;
    selectedLocation = null;
    confirmedLocation = null;
    gpsLocationAvailable = false;
    pickerMarker?.remove();
    pickerMarker = null;
    selectedLocationCard.hidden = true;
    routeResults.hidden = true;
    routeStatus.hidden = true;
    addressSuggestions.hidden = true;
    document.querySelector("#address-suggestion-list").replaceChildren();
    document.querySelector("#gps-location-message").hidden = true;
  }
  activeLocationMethod = method;
  syncLocationMethodPanels();
}

function updateFulfilmentFields() {
  const fulfilment = form.querySelector('input[name="fulfilment"]:checked')?.value;
  if (fulfilment !== "Doorstep Delivery") {
    routeRequestSequence += 1;
    routeResults.hidden = true;
  }
  if (fulfilment === "Doorstep Delivery" && activeLocationMethod === "skip") {
    activeLocationMethod = undefined;
  }
  syncLocationMethodPanels();
  const description = document.querySelector("#location-section-description");
  description.textContent = translate(
    fulfilment === "Doorstep Delivery"
      ? "Share and confirm your exact location for doorstep delivery."
      : "For shop pickup, sharing your location is optional."
  );
  if (selectedLocation) updateSelectedLocationCard();
  updateFulfilmentHoursStatus();
}

function updateFulfilmentHoursStatus() {
  const fulfilment = form.querySelector('input[name="fulfilment"]:checked')?.value;
  const [hours, minutes] = shopTimeFormatter.format(new Date()).split(":").map(Number);
  const currentMinute = hours * 60 + minutes;
  const message = fulfilment === "Doorstep Delivery" && (currentMinute < 600 || currentMinute >= 1260)
    ? "Doorstep delivery is available only between 10:00 AM and 9:00 PM. You can still send a request; Gowri Medicals will confirm availability."
    : fulfilment === "Shop Pickup" && (currentMinute < 480 || currentMinute >= 1320)
      ? "Shop pickup is available only between 8:00 AM and 10:00 PM. You can still send a request; Gowri Medicals will confirm availability."
      : "";
  fulfilmentHoursStatus.textContent = message ? translate(message) : "";
  fulfilmentHoursStatus.hidden = !message;
}

fulfilmentInputs.forEach((input) => input.addEventListener("change", updateFulfilmentFields));
updateFulfilmentFields();

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formError.hidden = true;
  updateFulfilmentHoursStatus();

  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const mobile = String(data.get("mobile")).trim();
  if (!/^[6-9]\d{9}$/.test(mobile)) {
    showError("Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9.");
    form.elements.mobile.focus();
    return;
  }

  const medicines = [...medicineList.querySelectorAll(".medicine-row")].map((row) => ({
    name: row.querySelector('input[name="medicine"]').value.trim(),
    quantity: row.querySelector('input[name="quantity"]').value
  }));
  if (medicines.some((medicine) => !medicine.name || Number(medicine.quantity) < 1 || Number(medicine.quantity) > 99)) {
    showError("Please enter a medicine name and a quantity between 1 and 99 for every item.");
    return;
  }

  const fulfilment = String(data.get("fulfilment"));
  if (fulfilment === "Doorstep Delivery" && !confirmedLocation) {
    showError("Choose your exact delivery location before continuing.");
    routeSection.scrollIntoView({ behavior: "smooth", block: "start" });
    locationMethodButtons[0].focus({ preventScroll: true });
    return;
  }

  const reference = `GM-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  const order = {
    reference,
    name: String(data.get("name")).trim(),
    mobile,
    fulfilment,
    destination: fulfilment === "Doorstep Delivery" ? confirmedLocation || null : null,
    medicines,
    instructions: String(data.get("instructions") || "").trim(),
    urgent: data.get("urgent") === "on"
  };
  buildSummary(order);
  summary.hidden = false;
  summary.scrollIntoView({ behavior: "smooth", block: "start" });
});

editRequestButton.addEventListener("click", () => {
  summary.hidden = true;
  form.scrollIntoView({ behavior: "smooth", block: "start" });
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector("#primary-links");
menuToggle.addEventListener("click", () => {
  const expanded = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!expanded));
  navLinks.classList.toggle("is-open", !expanded);
});
navLinks.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    navLinks.classList.remove("is-open");
  }
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
updateMedicineRows();

function setRouteStatus(message, state = "info") {
  routeStatus.textContent = translate(message);
  routeStatus.dataset.state = state;
  routeStatus.hidden = false;
}

function loadMapLibre() {
  if (window.maplibregl) return Promise.resolve(window.maplibregl);
  if (mapLibrePromise) return mapLibrePromise;

  const cdns = [
    {
      name: "jsDelivr",
      script: "https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.1/dist/maplibre-gl.js",
      stylesheet: "https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.1/dist/maplibre-gl.css"
    },
    {
      name: "unpkg",
      script: "https://unpkg.com/maplibre-gl@5.6.1/dist/maplibre-gl.js",
      stylesheet: "https://unpkg.com/maplibre-gl@5.6.1/dist/maplibre-gl.css"
    }
  ];

  const loadStylesheet = (url) => new Promise((resolve, reject) => {
    let stylesheet = document.querySelector("#maplibre-stylesheet");
    if (stylesheet?.href === url && stylesheet.sheet) {
      resolve();
      return;
    }
    stylesheet?.remove();
    stylesheet = document.createElement("link");
    stylesheet.id = "maplibre-stylesheet";
    stylesheet.rel = "stylesheet";
    stylesheet.href = url;
    const timeout = window.setTimeout(() => finish(new Error(`${url} timed out.`)), 10000);
    const finish = (error) => {
      window.clearTimeout(timeout);
      stylesheet.removeEventListener("load", onLoad);
      stylesheet.removeEventListener("error", onError);
      if (error) {
        stylesheet.remove();
        reject(error);
      } else {
        resolve();
      }
    };
    const onLoad = () => finish();
    const onError = () => finish(new Error(`${url} could not be loaded.`));
    stylesheet.addEventListener("load", onLoad, { once: true });
    stylesheet.addEventListener("error", onError, { once: true });
    document.head.append(stylesheet);
  });

  const loadScript = (url) => new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.async = true;
    script.crossOrigin = "anonymous";
    script.src = url;
    const timeout = window.setTimeout(() => finish(new Error(`${url} timed out.`)), 10000);
    const finish = (error) => {
      window.clearTimeout(timeout);
      script.removeEventListener("load", onLoad);
      script.removeEventListener("error", onError);
      if (error) {
        script.remove();
        reject(error);
      } else if (window.maplibregl?.Map) {
        resolve(window.maplibregl);
      } else {
        script.remove();
        reject(new Error(`${url} loaded without exposing the MapLibre GL JS API.`));
      }
    };
    const onLoad = () => finish();
    const onError = () => finish(new Error(`${url} could not be loaded.`));
    script.addEventListener("load", onLoad, { once: true });
    script.addEventListener("error", onError, { once: true });
    document.head.append(script);
  });

  mapLibrePromise = (async () => {
    const errors = [];
    for (const cdn of cdns) {
      try {
        const [, maplibregl] = await Promise.all([
          loadStylesheet(cdn.stylesheet),
          loadScript(cdn.script)
        ]);
        return maplibregl;
      } catch (error) {
        errors.push(`${cdn.name}: ${error.message}`);
      }
    }
    document.querySelector("#maplibre-stylesheet")?.remove();
    throw new Error(`${translate("MapLibre GL JS could not be loaded from the available public CDNs.")} ${errors.join(" ")}`);
  })().catch((error) => {
    mapLibrePromise = null;
    throw error;
  });
  return mapLibrePromise;
}

function createMap(elementId, zoom = 16) {
  const map = new window.maplibregl.Map({
    container: elementId,
    style: mapStyleUrl,
    center: [shopLocation.longitude, shopLocation.latitude],
    zoom,
    attributionControl: true,
    cooperativeGestures: true
  });
  map.addControl(new window.maplibregl.NavigationControl({ showCompass: false }), "top-right");

  let lastMapError;
  const ready = new Promise((resolve, reject) => {
    let settled = false;
    const timeout = window.setTimeout(() => {
      if (settled) return;
      settled = true;
      const details = lastMapError?.message ? ` ${lastMapError.message}` : "";
      reject(new Error(`${translate("Map loading timed out. Check your internet connection and try again.")}${details}`));
    }, 20000);
    map.once("load", () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeout);
      translateDocument();
      resolve(map);
    });
    map.on("error", (event) => {
      lastMapError = event.error || lastMapError;
    });
  });
  mapReadyPromises.set(map, ready);
  return map;
}

async function waitForMap(map) {
  await mapReadyPromises.get(map);
  map.resize();
  return map;
}

function removeMap(map) {
  if (!map) return;
  map.remove();
  mapReadyPromises.delete(map);
}

async function getPickerMap() {
  await loadMapLibre();
  if (!pickerMap) {
    pickerMap = createMap("picker-map", 14);
    pickerMap.on("click", (event) => {
      selectLocation(event.lngLat.lat, event.lngLat.lng, "map");
    });
  }
  try {
    await waitForMap(pickerMap);
  } catch (error) {
    removeMap(pickerMap);
    pickerMap = null;
    throw error;
  }
  window.setTimeout(() => pickerMap?.resize(), 100);
  return pickerMap;
}

async function getRouteMap() {
  await loadMapLibre();
  if (!routeMap) routeMap = createMap("route-map", 14);
  try {
    await waitForMap(routeMap);
  } catch (error) {
    removeMap(routeMap);
    routeMap = null;
    throw error;
  }
  window.setTimeout(() => routeMap?.resize(), 100);
  return routeMap;
}

async function getShopMap() {
  await loadMapLibre();
  if (!shopMap) shopMap = createMap("shop-map", 16);
  try {
    await waitForMap(shopMap);
  } catch (error) {
    removeMap(shopMap);
    shopMap = null;
    throw error;
  }
  window.setTimeout(() => shopMap?.resize(), 100);
  return shopMap;
}

async function initializeShopMap() {
  try {
    const map = await getShopMap();
    const markerElement = document.createElement("div");
    markerElement.className = "maplibre-marker shop-location-marker";
    markerElement.title = "GOWRI MEDICALS";

    const popupContent = document.createElement("div");
    popupContent.className = "shop-map-popup";
    const title = document.createElement("strong");
    title.textContent = "GOWRI MEDICALS";
    const address = document.createElement("p");
    address.textContent = shopLocation.address;
    popupContent.append(title, address);

    new window.maplibregl.Marker({ element: markerElement })
      .setLngLat([shopLocation.longitude, shopLocation.latitude])
      .setPopup(new window.maplibregl.Popup({ offset: 18 }).setDOMContent(popupContent))
      .addTo(map);
  } catch (error) {
    const mapElement = document.querySelector("#shop-map");
    mapElement.dataset.unavailable = "true";
    document.querySelector("#shop-map-fallback").hidden = false;
    document.querySelector("#shop-map-fallback-message").textContent =
      `${translate("The shop map could not load. Use the official Google Maps location or directions instead.")} ${error.message}`;
  }
}

function isWithinSrikakulam(latitude, longitude) {
  return latitude >= 18.15 && latitude <= 18.45 &&
    longitude >= 83.70 && longitude <= 84.08;
}

function getManualAddress() {
  const selectedLocality = manualAddressForm.querySelector('[name="manual-locality"]').value.trim();
  return {
    locality: selectedLocality === "Other Srikakulam locality" ? "Srikakulam" : selectedLocality,
    street: manualAddressForm.querySelector('[name="street"]').value.trim(),
    building: manualAddressForm.querySelector('[name="building"]').value.trim(),
    landmark: manualAddressForm.querySelector('[name="landmark"]').value.trim(),
    instructions: manualAddressForm.querySelector('[name="delivery-instructions"]').value.trim()
  };
}

function formatManualAddress(address) {
  return [address.building, address.street].filter(Boolean).join(", ");
}

function updateSelectedLocationCard() {
  if (!selectedLocation) {
    selectedLocationCard.hidden = true;
    return;
  }
  selectedLocationCard.hidden = false;
  const isDoorstepDelivery =
    form.querySelector('input[name="fulfilment"]:checked')?.value === "Doorstep Delivery";
  document.querySelector("#selected-location-title").textContent = translate(
    confirmedLocation ? "Location confirmed" : "Location selected — please confirm"
  );
  document.querySelector("#selected-location-address").textContent =
    selectedLocation.address || translate("No readable address found. Confirm the selected coordinates.");
  locationConfirmationSuccess.textContent = translate(
    isDoorstepDelivery ? "Delivery location confirmed." : "Location confirmed"
  );
  locationConfirmationSuccess.hidden = !confirmedLocation;
  document.querySelector("#selected-coordinates").textContent =
    `${translate("Latitude:")} ${selectedLocation.latitude.toFixed(6)} · ${translate("Longitude:")} ${selectedLocation.longitude.toFixed(6)}`;
  const confirmButton = document.querySelector("#confirm-selected-location");
  confirmButton.textContent = translate(isDoorstepDelivery ? "Confirm Delivery Location" : "Confirm Location");
  confirmButton.hidden = Boolean(confirmedLocation);
  const editButton = document.querySelector("#edit-selected-location");
  editButton.textContent = translate("Edit Location");
  editButton.hidden = !confirmedLocation;
}

function showPickerMapFallback(error) {
  const mapElement = document.querySelector("#picker-map");
  const fallback = document.querySelector("#picker-map-fallback");
  const fallbackLink = document.querySelector("#picker-map-fallback-link");
  mapElement.dataset.unavailable = "true";
  fallback.hidden = false;
  document.querySelector("#picker-map-fallback-message").textContent =
    `${error.message} ${translate("You can still use GPS or enter an address manually.")}`;
  fallbackLink.href = selectedLocation
    ? createGoogleDirectionsLink(selectedLocation)
    : "#";
  fallbackLink.hidden = !selectedLocation;
  fallbackLink.innerHTML = `${translate(selectedLocation ? "Open Directions in Google Maps" : "Open in Google Maps")} <span aria-hidden="true">↗</span>`;
}

function showPickerMap() {
  pickerMapPanel.hidden = false;
  document.querySelector("#picker-map").dataset.unavailable = "false";
  document.querySelector("#picker-map-fallback").hidden = true;
}

function addPlaceFromReverseGeocode(properties) {
  const localPlace = properties.suburb || properties.city_district || properties.city ||
    properties.county || properties.district || "";
  const localitySelect = manualAddressForm.querySelector('[name="manual-locality"]');
  if (localPlace) {
    let option = [...localitySelect.options].find((item) =>
      item.value.toLowerCase() === localPlace.toLowerCase()
    );
    if (!option) {
      option = document.createElement("option");
      option.value = localPlace;
      option.textContent = localPlace;
      localitySelect.add(option);
    }
    localitySelect.value = localPlace;
  }
  const street = properties.street || properties.road || properties.pedestrian || "";
  const building = properties.housenumber || properties.name || "";
  manualAddressForm.querySelector('[name="street"]').value = street;
  manualAddressForm.querySelector('[name="building"]').value = building;
  if (!selectedLocation.landmark && properties.name && properties.name !== building) {
    manualAddressForm.querySelector('[name="landmark"]').value = properties.name;
  }
  manualAddressForm.querySelector('[name="delivery-instructions"]').value = selectedLocation.instructions || "";
  selectedLocation.locality = localPlace || selectedLocation.locality;
  selectedLocation.address = formatManualAddress({
    building,
    street
  }) || selectedLocation.address;
  selectedLocation.landmark = manualAddressForm.querySelector('[name="landmark"]').value.trim();
  if (confirmedLocation &&
      confirmedLocation.latitude === selectedLocation.latitude &&
      confirmedLocation.longitude === selectedLocation.longitude) {
    confirmedLocation = { ...selectedLocation };
  }
  updateSelectedLocationCard();
}

async function reverseGeocodeLocation(latitude, longitude, sequence) {
  const query = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    lang: "en"
  });
  try {
    const response = await fetchJson(
      `https://photon.komoot.io/reverse?${query}`,
      "Could not resolve the selected address"
    );
    if (sequence !== reverseLookupSequence || !selectedLocation ||
        selectedLocation.latitude !== latitude || selectedLocation.longitude !== longitude) return;
    const place = response.features?.[0];
    if (!place) return;
    if (!place.properties || !Array.isArray(place.geometry?.coordinates)) return;
    const [resultLongitude, resultLatitude] = place.geometry.coordinates.map(Number);
    if (!Number.isFinite(resultLatitude) || !Number.isFinite(resultLongitude)) return;
    const latitudeDistance = (resultLatitude - latitude) * 111000;
    const longitudeDistance = (resultLongitude - longitude) * 111000 * Math.cos(latitude * Math.PI / 180);
    if (Math.hypot(latitudeDistance, longitudeDistance) > 1000) return;
    addPlaceFromReverseGeocode(place.properties);
  } catch {
    if (sequence === reverseLookupSequence) {
      setRouteStatus("The pin is selected, but its address could not be resolved. You can still confirm the map location.", "error");
    }
  }
}

function selectLocation(latitude, longitude, source, address = "") {
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude) ||
      latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
    setRouteStatus("Select a valid location on the map.", "error");
    return;
  }
  if (source !== "map" && !isWithinSrikakulam(latitude, longitude)) {
    if (pickerMarker && selectedLocation) {
      pickerMarker.setLngLat([selectedLocation.longitude, selectedLocation.latitude]);
    }
    setRouteStatus("Please select a destination within Srikakulam town.", "error");
    return;
  }

  window.clearTimeout(reverseLookupTimer);
  const lookupSequence = ++reverseLookupSequence;
  routeRequestSequence += 1;
  confirmedLocation = null;
  document.querySelector(".submit-button").disabled =
    form.querySelector('input[name="fulfilment"]:checked')?.value !== "Shop Pickup";
  const preserveManualAddress = source === "manual";
  const manual = preserveManualAddress
    ? getManualAddress()
    : { locality: "", street: "", building: "", landmark: "", instructions: "" };
  selectedLocation = {
    latitude,
    longitude,
    source,
    manualAddress: preserveManualAddress,
    locality: manual.locality || (source === "map" ? "" : "Srikakulam Town"),
    address: address || formatManualAddress(manual),
    landmark: manual.landmark,
    instructions: manual.instructions
  };
  updateSelectedLocationCard();
  routeResults.hidden = true;
  setRouteStatus("Location selected. Adjust the pin if needed, then confirm it.");

  if (pickerMap) {
    const position = [longitude, latitude];
    if (!pickerMarker) {
      const markerElement = document.createElement("div");
      markerElement.className = "maplibre-marker destination";
      pickerMarker = new window.maplibregl.Marker({ element: markerElement, draggable: true })
        .setLngLat(position)
        .addTo(pickerMap);
      pickerMarker.on("dragend", () => {
        const point = pickerMarker.getLngLat();
        selectLocation(point.lat, point.lng, "map");
      });
    } else {
      pickerMarker.setLngLat(position);
    }
    pickerMarker.setLngLat(position);
    pickerMap.easeTo({ center: position });
  }
  document.querySelector("#picker-map-fallback-link").href =
    createGoogleDirectionsLink(selectedLocation);

  if (source !== "manual") {
    reverseLookupTimer = window.setTimeout(() => {
      void reverseGeocodeLocation(latitude, longitude, lookupSequence);
    }, 350);
  }
}

function updateAddressSuggestions(places, queryText) {
  const suggestionList = document.querySelector("#address-suggestion-list");
  const suggestions = document.querySelector("#address-suggestions");
  suggestionList.replaceChildren();

  const tokens = queryText.toLowerCase().match(/[a-z0-9]{3,}/g) || [];
  const genericTokens = new Set([
    "andhra", "behind", "building", "colony", "district", "house", "landmark",
    "india", "near", "opposite", "pradesh", "road", "street", "srikakulam", "town"
  ]);
  const specificTokens = tokens.filter((token) => !genericTokens.has(token));
  const matches = places.features.filter((place) => {
    const point = place.geometry?.coordinates;
    if (!point || !isWithinSrikakulam(Number(point[1]), Number(point[0]))) return false;
    const name = JSON.stringify(place.properties).toLowerCase();
    return specificTokens.some((token) => name.includes(token));
  });

  if (!matches.length) {
    suggestions.hidden = false;
    suggestionList.textContent =
      "No confident address match was found. Use the map to place the pin at your building, or try a more specific street or landmark.";
    return false;
  }

  matches.forEach((place) => {
    const properties = place.properties;
    const label = [
      properties.name,
      properties.street,
      properties.suburb,
      properties.city,
      properties.district
    ].filter(Boolean).filter((part, index, parts) => parts.indexOf(part) === index).join(", ");
    const button = document.createElement("button");
    button.className = "address-suggestion";
    button.type = "button";
    button.textContent = label;
    button.addEventListener("click", async () => {
      const [longitude, latitude] = place.geometry.coordinates.map(Number);
      const address = getManualAddress();
      const placeAddress = formatManualAddress(address) || label;
      addressSuggestions.hidden = true;
      setLocationMethod("map");
      showPickerMap();
      try {
        const map = await getPickerMap();
        map.resize();
        window.requestAnimationFrame(() => map.resize());
        map.easeTo({ center: [longitude, latitude], zoom: 17 });
      } catch (error) {
        showPickerMapFallback(error);
        setRouteStatus("The address was found, but the map did not load. Check your internet connection, then try Select on Map.", "error");
      }
      selectLocation(latitude, longitude, "manual", placeAddress);
      selectedLocation.landmark = address.landmark;
      selectedLocation.instructions = address.instructions;
      updateSelectedLocationCard();
    });
    suggestionList.append(button);
  });
  suggestions.hidden = false;
  return true;
}

const addressSuggestions = document.querySelector("#address-suggestions");

async function openPickerMap() {
  setLocationMethod("map");
  showPickerMap();
  try {
    const map = await getPickerMap();
    map.resize();
    window.requestAnimationFrame(() => map.resize());
    if (selectedLocation) map.easeTo({ center: [selectedLocation.longitude, selectedLocation.latitude], zoom: 17 });
    setRouteStatus("Tap the map to place your pin. Drag the pin to adjust it.");
  } catch (error) {
    showPickerMapFallback(error);
    setRouteStatus("Map unavailable. Choose GPS or enter an address manually.", "error");
  }
}

document.querySelector("#show-picker-map").addEventListener("click", openPickerMap);
document.querySelector("#retry-picker-map").addEventListener("click", openPickerMap);

document.querySelector("#show-manual-address").addEventListener("click", () => {
  setLocationMethod("manual");
  setRouteStatus("Enter your address, then find it on the map. A locality name alone does not identify an exact location.");
});

document.querySelector("#skip-location-sharing").addEventListener("click", () => {
  setLocationMethod("skip");
  setRouteStatus("Location will not be shared. This is optional for shop pickup.");
});

document.querySelector("#use-current-location").addEventListener("click", () => {
  if (activeLocationMethod === "gps") {
    selectedLocation = null;
    confirmedLocation = null;
    pickerMarker?.remove();
    pickerMarker = null;
    selectedLocationCard.hidden = true;
    routeResults.hidden = true;
  }
  setLocationMethod("gps");
  gpsLocationAvailable = false;
  syncLocationMethodPanels();
  document.querySelector("#gps-location-message").hidden = true;
  setRouteStatus("Requesting your location. Please allow access in your browser if prompted.");
  if (!window.isSecureContext || !navigator.geolocation) {
    setRouteStatus("Current location requires browser permission and a secure connection (HTTPS or localhost). Select on Map or enter an address instead.", "error");
    return;
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    if (!isWithinSrikakulam(latitude, longitude)) {
      setRouteStatus("Your current location appears to be outside Srikakulam town. You can still set a delivery address manually or on the map.", "error");
      return;
    }
    gpsLocationAvailable = true;
    syncLocationMethodPanels();
    showPickerMap();
    try {
      const map = await getPickerMap();
      map.resize();
      window.requestAnimationFrame(() => map.resize());
      map.easeTo({ center: [longitude, latitude], zoom: 17 });
    } catch (error) {
      showPickerMapFallback(error);
      document.querySelector("#gps-location-message").textContent =
        `${translate("Your current location was found. Adjust the pin if needed, then confirm location.")} ${error.message}`;
      document.querySelector("#gps-location-message").hidden = false;
      setRouteStatus("Map unavailable. Your GPS coordinates are selected; you can confirm them and open directions in Google Maps.", "error");
      addressSuggestions.hidden = true;
      document.querySelector("#address-suggestion-list").replaceChildren();
      selectLocation(latitude, longitude, "gps");
      return;
    }
    addressSuggestions.hidden = true;
    document.querySelector("#address-suggestion-list").replaceChildren();
    selectLocation(latitude, longitude, "gps");
    document.querySelector("#gps-location-message").textContent =
      translate("Your current location was found. Adjust the pin if needed, then confirm location.");
    document.querySelector("#gps-location-message").hidden = false;
  }, (error) => {
    const messages = {
      1: "Location permission was denied. Allow location access in your browser settings, or select on the map / enter the address manually.",
      2: "Your location is unavailable. Check your device GPS and internet connection, or select on the map / enter the address manually.",
      3: "Getting your location timed out. Try again or select on the map / enter the address manually."
    };
    setRouteStatus(messages[error.code] || "Could not get your location. Select on the map or enter the address manually.", "error");
  }, { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 });
});

manualAddressForm.addEventListener("input", () => {
  addressSuggestions.hidden = true;
  document.querySelector("#address-suggestion-list").replaceChildren();
  if (!selectedLocation) return;
  selectedLocation = null;
  confirmedLocation = null;
  selectedLocationCard.hidden = true;
  routeResults.hidden = true;
  syncLocationMethodPanels();
});

document.querySelector("#find-manual-address").addEventListener("click", async () => {
  const requiredFields = [...manualAddressForm.querySelectorAll("[required]")];
  if (!requiredFields.every((field) => field.reportValidity())) return;

  const address = getManualAddress();
  const query = new URLSearchParams({
    q: [
      address.building,
      address.street,
      address.landmark,
      address.locality === "Other Srikakulam locality" ? "Srikakulam" : address.locality,
      "Srikakulam",
      "Andhra Pradesh",
      "India"
    ].filter(Boolean).join(", "),
    lat: String(shopLocation.latitude),
    lon: String(shopLocation.longitude),
    limit: "5",
    lang: "en"
  });
  const submit = document.querySelector("#find-manual-address");
  submit.disabled = true;
  submit.textContent = translate("Searching addresses…");
  setRouteStatus("Searching for address suggestions. If no exact match is available, place the pin on the map.");
  try {
    const places = await fetchJson(
      `https://photon.komoot.io/api/?${query}`,
      "Could not search address suggestions"
    );
    const hasSuggestions = updateAddressSuggestions(places, query.get("q"));
    if (hasSuggestions) {
      setRouteStatus("Select the matching address below. You can adjust its pin on the map before confirming.");
    } else {
      setRouteStatus("No exact result found. Place the pin on the map to choose the location.", "error");
    }
  } catch {
    addressSuggestions.hidden = false;
    document.querySelector("#address-suggestion-list").textContent = translate(
      "Address lookup could not be completed. You can still select the exact location on the map or use GPS."
    );
    setRouteStatus("Address lookup failed. You can still select the exact location on the map or use GPS.", "error");
  } finally {
    submit.disabled = false;
    submit.innerHTML = `${translate("Find Address on Map")} <span aria-hidden="true">⌖</span>`;
  }
});

async function fetchJson(url, timeoutMessage) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 15000);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error(`${timeoutMessage} (service returned ${response.status}).`);
    return await response.json();
  } catch (error) {
    if (error.name === "AbortError") throw new Error(`${timeoutMessage} (request timed out).`);
    throw error;
  } finally {
    window.clearTimeout(timeout);
  }
}

function formatDistance(meters) {
  if (meters < 1000) return currentLanguage === "te" ? `${Math.round(meters)} మీ` : `${Math.round(meters)} m`;
  return currentLanguage === "te" ? `${(meters / 1000).toFixed(1)} కి.మీ` : `${(meters / 1000).toFixed(1)} km`;
}

function formatDuration(seconds) {
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return currentLanguage === "te" ? `${minutes} నిమి` : `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (currentLanguage === "te") {
    return remainingMinutes ? `${hours} గం ${remainingMinutes} నిమి` : `${hours} గం`;
  }
  return remainingMinutes ? `${hours} hr ${remainingMinutes} min` : `${hours} hr`;
}

function clearRouteLayers(map) {
  routeMarkers.forEach((marker) => marker.remove());
  routeMarkers = [];
  if (routeHasLine && map.getLayer("delivery-route-line")) {
    map.removeLayer("delivery-route-line");
    map.removeSource("delivery-route");
  }
  routeHasLine = false;
}

function isCurrentRouteRequest(destination, sequence) {
  return sequence === routeRequestSequence && confirmedLocation &&
    destination.latitude === confirmedLocation.latitude &&
    destination.longitude === confirmedLocation.longitude;
}

async function showRoute(destination, sequence) {
  if (!isCurrentRouteRequest(destination, sequence)) return false;
  routeResults.hidden = false;
  routeMapWrap.hidden = false;
  routeGoogleLink.href = createGoogleDirectionsLink(destination);
  routeGoogleLink.innerHTML = `${translate("Open Directions in Google Maps")} <span aria-hidden="true">↗</span>`;
  routeGoogleLink.hidden = false;
  routeMetrics.hidden = true;
  document.querySelector("#route-destination").textContent =
    destination.address || translate("Selected map location");
  document.querySelector("#route-locality-label").textContent =
    destination.locality || translate("Selected map coordinates");
  const map = await getRouteMap();
  if (!isCurrentRouteRequest(destination, sequence)) return false;
  clearRouteLayers(map);

  const shopElement = document.createElement("div");
  shopElement.className = "maplibre-marker";
  shopElement.title = `GOWRI MEDICALS, ${shopLocation.address}`;
  const destinationElement = document.createElement("div");
  destinationElement.className = "maplibre-marker destination";
  destinationElement.title = translate("Customer delivery location");
  const shopMarker = new window.maplibregl.Marker({ element: shopElement })
    .setLngLat([shopLocation.longitude, shopLocation.latitude])
    .addTo(map);
  const destinationMarker = new window.maplibregl.Marker({ element: destinationElement })
    .setLngLat([destination.longitude, destination.latitude])
    .addTo(map);
  routeMarkers.push(shopMarker, destinationMarker);

  const coordinates = `${shopLocation.longitude},${shopLocation.latitude};${destination.longitude},${destination.latitude}`;
  const routeUrl = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=false`;
  let response;
  try {
    response = await fetchJson(routeUrl, "Could not calculate the road route");
  } catch {
    if (!isCurrentRouteRequest(destination, sequence)) return false;
    document.querySelector("#route-result-note").textContent = translate(
      "Driving route could not be calculated. Google Maps directions are available below."
    );
    setRouteStatus("Location confirmed. Road routing is unavailable, but the map pins and Google Maps directions are ready.", "error");
    return false;
  }
  if (!isCurrentRouteRequest(destination, sequence)) return false;
  const route = response.routes?.[0];
  if (response.code !== "Ok" || !route || !route.geometry ||
      !Number.isFinite(route.distance) || !Number.isFinite(route.duration)) {
    document.querySelector("#route-result-note").textContent = translate(
      "No road route was returned. The selected start and destination are shown on the map; open Google Maps for the complete route."
    );
    setRouteStatus("Location confirmed. No road route was returned, but Google Maps directions are ready.", "error");
    return false;
  }

  map.addSource("delivery-route", { type: "geojson", data: route.geometry });
  map.addLayer({
    id: "delivery-route-line",
    type: "line",
    source: "delivery-route",
    layout: { "line-join": "round", "line-cap": "round" },
    paint: { "line-color": "#2f8d4a", "line-width": 5, "line-opacity": 0.9 }
  });
  routeHasLine = true;
  const coordinatesOnRoute = route.geometry.coordinates;
  const longitudes = coordinatesOnRoute.map((point) => point[0]);
  const latitudes = coordinatesOnRoute.map((point) => point[1]);
  const bounds = [
    [Math.min(...longitudes), Math.min(...latitudes)],
    [Math.max(...longitudes), Math.max(...latitudes)]
  ];
  map.fitBounds(bounds, { padding: 45, maxZoom: 16 });
  document.querySelector("#route-distance").textContent = formatDistance(route.distance);
  document.querySelector("#route-duration").textContent = formatDuration(route.duration);
  routeMetrics.hidden = false;
  document.querySelector("#route-result-note").textContent = translate(
    "Road distance and driving time are estimates from the available route and may vary with traffic and road conditions."
  );
  return true;
}

async function confirmSelectedLocation() {
  if (!selectedLocation) {
    setRouteStatus("Choose a location using GPS, the map or address search before confirming.", "error");
    return;
  }

  const manual = activeLocationMethod === "manual" || selectedLocation.manualAddress
    ? getManualAddress()
    : { locality: "", street: "", building: "", landmark: "", instructions: "" };
  confirmedLocation = {
    ...selectedLocation,
    locality: manual.locality || selectedLocation.locality,
    address: formatManualAddress(manual) || selectedLocation.address,
    landmark: manual.landmark || selectedLocation.landmark,
    instructions: manual.instructions
  };
  selectedLocation = { ...confirmedLocation };
  updateSelectedLocationCard();
  syncLocationMethodPanels();
  summary.hidden = true;
  const isDoorstepDelivery =
    form.querySelector('input[name="fulfilment"]:checked')?.value === "Doorstep Delivery";
  if (!isDoorstepDelivery) {
    routeResults.hidden = true;
    return;
  }
  setRouteStatus("Delivery location confirmed.");
  const destination = { ...confirmedLocation };
  const requestSequence = ++routeRequestSequence;
  void showRoute(destination, requestSequence).catch((error) => {
    if (requestSequence !== routeRequestSequence) return;
    routeResults.hidden = false;
    routeMapWrap.hidden = true;
    routeMetrics.hidden = true;
    routeGoogleLink.href = createGoogleDirectionsLink(destination);
    routeGoogleLink.innerHTML = `${translate("Open Directions in Google Maps")} <span aria-hidden="true">↗</span>`;
    routeGoogleLink.hidden = false;
    document.querySelector("#route-destination").textContent =
      destination.address || translate("Selected map location");
    document.querySelector("#route-locality-label").textContent =
      destination.locality || translate("Selected map coordinates");
    document.querySelector("#route-result-note").textContent = translate(
      "Map unavailable. You can still open Google Maps using your selected coordinates."
    );
    setRouteStatus("Location confirmed. The on-page map or route could not load; Google Maps directions are ready below.", "error");
    console.error("Could not display the confirmed delivery route.", error);
  });
}

document.querySelector("#confirm-selected-location").addEventListener("click", confirmSelectedLocation);
document.querySelector("#edit-selected-location").addEventListener("click", () => {
  window.clearTimeout(reverseLookupTimer);
  reverseLookupSequence += 1;
  routeRequestSequence += 1;
  confirmedLocation = null;
  selectedLocationCard.hidden = false;
  routeResults.hidden = true;
  syncLocationMethodPanels();
  updateSelectedLocationCard();
  setRouteStatus("Location selected. Adjust the pin if needed, then confirm it.");
});
manualAddressForm.querySelector('[name="manual-locality"]').addEventListener("change", () => {
  if (!selectedLocation) return;
  selectedLocation.locality = manualAddressForm.querySelector('[name="manual-locality"]').value;
  routeRequestSequence += 1;
  confirmedLocation = null;
  updateSelectedLocationCard();
  syncLocationMethodPanels();
});
routeGoogleLink.href = shopLocation.directionsUrl;
void initializeShopMap();
