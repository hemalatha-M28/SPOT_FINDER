
const COIMBATORE_DATA = {
  areas: [
    {
      id: "gandhipuram",
      name: "Gandhipuram",
      tagline: "The Pulse of Coimbatore",
      bannerImage: "images/Gandhipuram.jpeg",
      description: "Gandhipuram is Coimbatore’s vibrant commercial and transport hub, known for its bustling markets, shopping streets, and diverse food scene.",
      spots: [
        {
          id: "gandhipuram-cross-cut",
          name: "Cross Cut Road Shopping District",
          description: "One of the most famous shopping streets in South India. Known for exquisite silk sarees, jewelry stores, and a lively market atmosphere that is vibrant day and night.",
          location: "Cross Cut Rd, Gandhipuram",
          entryFee: "Free",
          timings: "10:00 AM - 10:00 PM",
          bestTime: "October to March (Evening shopping)",
          mapUrl: "https://maps.google.com/?q=Cross+Cut+Rd+Gandhipuram+Coimbatore",
          image: "images/Gandhipuram1.jpeg"
        },
        {
          id: "voc-park",
          name: "V.O.Chidambaranar Park & Zoo",
          description: "A leisure park that serves as a vital green lung for the city center. Featuring a mini-zoo, a toy train, children's play areas, and lush gardens, it is perfect for weekend strolls.",
          location: "Park Gate Rd, Gandhipuram Area",
          entryFee: "₹20 for Adults, ₹10 for Children",
          timings: "04:00 PM - 07:30 PM (Weekdays), 10:00 AM - 07:30 PM (Sundays)",
          bestTime: "Late afternoon for cool breeze",
          mapUrl: "https://maps.google.com/?q=VOC+Park+and+Zoo+Coimbatore",
          image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=800"
        },
        {
          id: "sree-annapoorna-monument",
          name: "Heritage Annapoorna Tower",
          description: "A culinary monument marking the birthplace of the legendary Sree Annapoorna Sree Gowrishankar chain, capturing decades of Coimbatore's filter coffee culture.",
          location: "Sathy Rd, Gandhipuram",
          entryFee: "Free (Pay for food)",
          timings: "06:00 AM - 10:00 PM",
          bestTime: "Morning breakfast hours",
          mapUrl: "https://maps.google.com/?q=Sree+Annapoorna+Gandhipuram+Coimbatore",
          image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800"
        }
      ],
      restaurants: [
        {
          id: "annapoorna-gandhipuram",
          name: "Sree Annapoorna Sree Gowrishankar",
          rating: "4.8",
          reviews: "15,240",
          cuisine: "South Indian Vegetarian",
          price: "₹₹ (Moderate)",
          location: "75, East Arokiasamy Rd / Sathy Road Cross, Gandhipuram",
          hours: "06:00 AM - 10:00 PM",
          contact: "+91 422 223 1455",
          mapUrl: "https://maps.google.com/?q=Sree+Annapoorna+Gandhipuram+Coimbatore",
          image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800"
        },
        {
          id: "geetha-cafe",
          name: "Geetha Cafe",
          rating: "4.5",
          reviews: "4,820",
          cuisine: "Authentic Brahmin Meals & Snacks",
          price: "₹ (Budget-Friendly)",
          location: "Near Central Bus Stand, Gandhipuram",
          hours: "07:00 AM - 09:30 PM",
          contact: "+91 422 223 5078",
          mapUrl: "https://maps.google.com/?q=Geetha+Cafe+Gandhipuram+Coimbatore",
          image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800"
        },
        {
          id: "barbeque-nation-gandhipuram",
          name: "Barbeque Nation",
          rating: "4.6",
          reviews: "8,950",
          cuisine: "North Indian, BBQ Buffet & Grill",
          price: "₹₹₹ (Premium)",
          location: "Town Hall Road / Gandhipuram Town Center",
          hours: "12:00 PM - 04:30 PM, 06:30 PM - 11:00 PM",
          contact: "+91 422 665 4222",
          mapUrl: "https://maps.google.com/?q=Barbeque+Nation+Gandhipuram+Coimbatore",
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
        }
      ]
    },
    {
      id: "ukkadam",
      name: "Ukkadam",
      tagline: "Scenic Wetlands & Heritage Gates",
      bannerImage: "images/Ukkadam.jpeg",
      description: "Ukkadam is a lively neighborhood known for Ukkadam Lake, local markets, excellent street food, and easy connectivity across Coimbatore.",
      spots: [
        {
          id: "ukkadam-lake",
          name: "Valankulam Lake & Bypass Deck",
          description: "An incredibly scenic wetland lake featuring a modern elevated deck pathway, sunset viewing spots, boating facilities, and dynamic evening light shows.",
          location: "Ukkadam Bypass Road",
          entryFee: "Free (Boating charges apply)",
          timings: "05:00 AM - 09:00 PM",
          bestTime: "5:30 PM - 7:00 PM for sunset views",
          mapUrl: "https://maps.google.com/?q=Valankulam+Lake+Coimbatore",
          image: "images/Ukkadam1.jpeg"
        },
        {
          id: "perur-temple",
          name: "Arulmigu Patteeswarar Swamy Temple",
          description: "Located near Ukkadam's periphery, this ancient temple built by Karikala Chola is renowned for its architectural marvel, golden hall, and intricate stone carvings.",
          location: "Perur, Coimbatore (7 km from Ukkadam)",
          entryFee: "Free (Special tickets available)",
          timings: "05:00 AM - 01:00 PM, 04:00 PM - 09:00 PM",
          bestTime: "Early morning to witness the prayer rituals",
          mapUrl: "https://maps.google.com/?q=Perur+Pateeswarar+Temple+Coimbatore",
          image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800"
        },
        {
          id: "ukkadam-art-district",
          name: "Ukkadam Open Street Art Gallery",
          description: "A creative initiative transforming the flyover pillars and public walls into stunning canvas depictions of Coimbatore's rich heritage, local flora, and wildlife.",
          location: "Ukkadam Flyover Pillars",
          entryFee: "Free",
          timings: "Open 24 Hours",
          bestTime: "Daylight hours for photography",
          mapUrl: "https://maps.google.com/?q=Ukkadam+Flyover+Coimbatore",
          image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=800"
        }
      ],
      restaurants: [
        {
          id: "hm-biryani",
          name: "HMR Elahi Restaurant",
          rating: "4.4",
          reviews: "6,280",
          cuisine: "Mughlai, Biryani & Tandoor",
          price: "₹₹ (Moderate)",
          location: "Near Ukkadam Bus Stand",
          hours: "11:30 AM - 11:00 PM",
          contact: "+91 422 230 1900",
          mapUrl: "https://maps.google.com/?q=HMR+Restaurant+Ukkadam+Coimbatore",
          image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800"
        },
        {
          id: "lake-view-dhaba",
          name: "The Lake View Deck & Cafe",
          rating: "4.3",
          reviews: "1,120",
          cuisine: "Continental, Chinese, Mocktails",
          price: "₹₹ (Moderate)",
          location: "Valankulam Bypass Roadfront",
          hours: "04:00 PM - 11:30 PM",
          contact: "+91 98430 89765",
          mapUrl: "https://maps.google.com/?q=Valankulam+Lakeview+Cafe+Coimbatore",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800"
        },
        {
          id: "bhai-kadai-briyani",
          name: "Bhai Kadai Beef Biryani & Kebab",
          rating: "4.6",
          reviews: "3,400",
          cuisine: "Traditional Street-style Biryani",
          price: "₹ (Budget-Friendly)",
          location: "Sungam-Ukkadam Bypass Link Road",
          hours: "12:00 PM - 09:30 PM",
          contact: "+91 97914 25066",
          mapUrl: "https://maps.google.com/?q=Bhai+Kadai+Ukkadam+Coimbatore",
          image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800"
        }
      ]
    },
    {
      id: "rs-puram",
      name: "R.S. Puram",
      tagline: "Elegant Avenues & Gourmet Lanes",
      bannerImage: "images/RSpuram.jpeg",
      description: "R.S. Puram is Coimbatore's upscale shopping and dining destination, offering premium stores, cafés, restaurants, and a pleasant atmosphere.",
      spots: [
        {
          id: "db-road",
          name: "D.B. Road Smart Street Walkway",
          description: "Coimbatore's flagship smart street project. It features pedestrian-friendly plazas, designer seating, dynamic architectural lighting, and world-class retail stores.",
          location: "Diwan Bahadur Road, R.S. Puram",
          entryFee: "Free",
          timings: "Open 24 Hours (Shops 10 AM - 9:30 PM)",
          bestTime: "November to February (Evening walk)",
          mapUrl: "https://maps.google.com/?q=DB+Road+RS+Puram+Coimbatore",
          image: "images/RSpuram1.jpeg"
        },
        {
          id: "forest-museum",
          name: "Gass Forest Museum",
          description: "A historic government-run natural history museum housed inside the Forest College campus. Established in the late 19th century, it showcases rare taxidermy and forest heritage.",
          location: "Forest College Campus, Cowley Brown Road, R.S. Puram",
          entryFee: "₹40 for Adults, ₹20 for Children",
          timings: "09:00 AM - 01:00 PM, 02:00 PM - 05:30 PM (Closed on Sat & Sun)",
          bestTime: "Morning hours",
          mapUrl: "https://maps.google.com/?q=Gass+Forest+Museum+Coimbatore",
          image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?q=80&w=800"
        },
        {
          id: "siruvani-house",
          name: "Siruvani Eco-Water Display Park",
          description: "An informative exhibition center dedicated to the Siruvani River, widely recognized as one of the sweetest tasting drinking water sources in the world.",
          location: "Siruvani Office campus, R.S. Puram",
          entryFee: "Free",
          timings: "10:00 AM - 05:00 PM (Closed Sunday)",
          bestTime: "Afternoon",
          mapUrl: "https://maps.google.com/?q=Siruvani+Water+Office+RS+Puram+Coimbatore",
          image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800"
        }
      ],
      restaurants: [
        {
          id: "on-the-streets",
          name: "On The Streets (OTS Cafe)",
          rating: "4.7",
          reviews: "2,840",
          cuisine: "Gourmet Burgers, Specialty Coffee & Shakes",
          price: "₹₹₹ (Premium)",
          location: "East Sambandam Road, R.S. Puram",
          hours: "11:00 AM - 11:00 PM",
          contact: "+91 422 435 6077",
          mapUrl: "https://maps.google.com/?q=OTS+Cafe+RS+Puram+Coimbatore",
          image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800"
        },
        {
          id: "shree-gowri-rs",
          name: "Sree Gowrishankar Heritage Vegetarian",
          rating: "4.7",
          reviews: "9,850",
          cuisine: "South Indian Vegetarian, Ghee Roast Dosa",
          price: "₹₹ (Moderate)",
          location: "D.B. Road, R.S. Puram",
          hours: "06:00 AM - 10:30 PM",
          contact: "+91 422 254 0888",
          mapUrl: "https://maps.google.com/?q=Sree+Annapoorna+RS+Puram+Coimbatore",
          image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800"
        },
        {
          id: "kasha-ki-asha",
          name: "French Crepes & Co. (R.S. Puram Branch)",
          rating: "4.5",
          reviews: "920",
          cuisine: "French Patisserie, Desserts & Waffles",
          price: "₹₹₹ (Premium)",
          location: "Venkatasamy Road East, R.S. Puram",
          hours: "12:00 PM - 10:30 PM",
          contact: "+91 90430 33455",
          mapUrl: "https://maps.google.com/?q=Crepes+Cafe+RS+Puram+Coimbatore",
          image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800"
        }
      ]
    },
    {
      id: "town-hall",
      name: "Town Hall",
      tagline: "Historic Heritage & Heritage Bazaars",
      bannerImage: "images/Townhall.jpeg",
      description: "Town Hall is a historic commercial area known for its traditional markets, textile shops, and vibrant local shopping experience",
      spots: [
        {
          id: "coimbatore-town-hall",
          name: "Victoria Town Hall",
          description: "An elegant stone masonry building constructed in 1892 in honor of Queen Victoria's Golden Jubilee. It stands as an architectural emblem of the city's civic administration.",
          location: "Big Bazaar St, Town Hall",
          entryFee: "Free (Exterior viewing)",
          timings: "09:30 AM - 06:00 PM",
          bestTime: "Golden hour (4:30 PM - 6:00 PM) for architectural photography",
          mapUrl: "https://maps.google.com/?q=Victoria+Town+Hall+Coimbatore",
          image: "images/Townhall1.jpeg"
        },
        {
          id: "koniamman-temple",
          name: "Arulmigu Koniamman Temple",
          description: "Dedicated to the city's guardian deity, Goddess Koni Amman. This ancient temple is the epicenter of the famous annual Car Festival that draws lakhs of devotees.",
          location: "Big Bazaar St, Town Hall",
          entryFee: "Free",
          timings: "06:00 AM - 12:30 PM, 04:00 PM - 09:00 PM",
          bestTime: "During the annual chariot festival in Feb/March",
          mapUrl: "https://maps.google.com/?q=Koniamman+Temple+Coimbatore",
          image: "https://images.unsplash.com/photo-1602631985686-2bb060a988d4?q=80&w=800"
        },
        {
          id: "athupalam-toll-gate",
          name: "Historic Noyyal River Bridge Viewpoint",
          description: "A heritage site on the Noyyal River showcasing the old stone bridge structures and pathways built to connect Coimbatore to the southern trading routes.",
          location: "Athupalam, Town Hall Area",
          entryFee: "Free",
          timings: "Open 24 Hours",
          bestTime: "Monsoon season when river flows",
          mapUrl: "https://maps.google.com/?q=Athupalam+Noyyal+River+Coimbatore",
          image: "https://images.unsplash.com/photo-1545487833-1633f7ba7d22?q=80&w=800"
        }
      ],
      restaurants: [
        {
          id: "haji-mussa",
          name: "Haji Mussa Biryani",
          rating: "4.5",
          reviews: "5,420",
          cuisine: "Traditional Mutton Biryani, Mughlai",
          price: "₹₹ (Moderate)",
          location: "Opposite Town Hall Building, Big Bazaar St",
          hours: "11:00 AM - 10:30 PM",
          contact: "+91 422 239 1234",
          mapUrl: "https://maps.google.com/?q=Haji+Mussa+Biryani+Town+Hall+Coimbatore",
          image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800"
        },
        {
          id: "royal-hindu-restaurant",
          name: "Royal Hindu Restaurant",
          rating: "4.3",
          reviews: "3,110",
          cuisine: "Heritage South Indian Meals & Tiffin",
          price: "₹ (Budget-Friendly)",
          location: "Opposite Railway Station, Town Hall Road",
          hours: "06:30 AM - 10:00 PM",
          contact: "+91 422 222 1789",
          mapUrl: "https://maps.google.com/?q=Royal+Hindu+Restaurant+Coimbatore",
          image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800"
        },
        {
          id: "kovai-biriyani-hotel",
          name: "Kovai Biriyani Center",
          rating: "4.2",
          reviews: "1,890",
          cuisine: "Kongunad Spiced Chicken Biryani",
          price: "₹ (Budget-Friendly)",
          location: "Raja Street, Near Town Hall Complex",
          hours: "11:30 AM - 04:00 PM, 06:30 PM - 10:00 PM",
          contact: "+91 95009 88766",
          mapUrl: "https://maps.google.com/?q=Kovai+Biriyani+Center+Town+Hall+Coimbatore",
          image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800"
        }
      ]
    },
    {
      id: "race-course",
      name: "Race Course",
      tagline: "Luxurious Avenues & Scenic Jogging Tracks",
      bannerImage: "images/Racecourse.jpeg",
      description: "Race Course is a popular destination for morning walks, jogging, cafés, and a peaceful green environment in the heart of Coimbatore.",
      spots: [
        {
          id: "race-course-walking-track",
          name: "Race Course Promenade & Walking Track",
          description: "A beautifully paved 2.5 km circular track lined with ancient rain trees, smart benches, creative art installations, and fitness zones.",
          location: "Race Course Rd, Thomas Park Area",
          entryFee: "Free",
          timings: "Open 24 Hours",
          bestTime: "5:00 AM - 8:00 AM & 6:00 PM - 9:00 PM",
          mapUrl: "https://maps.google.com/?q=Race+Course+Walking+Track+Coimbatore",
          image: "images/Racecourse1.jpeg"
        },
        {
          id: "gd-naidu-museum",
          name: "GD Naidu Museum & Science Center",
          description: "An outstanding exhibition dedicated to the legendary industrialist and inventor G.D. Naidu, featuring old vintage cars, science experiments, and history of manufacturing.",
          location: "President Hall, Avinashi Road (bordering Race Course)",
          entryFee: "₹50 for Adults, ₹30 for Kids (Separate ticket for Car Museum)",
          timings: "09:00 AM - 05:00 PM (Closed on Mondays)",
          bestTime: "10:00 AM - 1:00 PM",
          mapUrl: "https://maps.google.com/?q=G+D+Naidu+Museum+Coimbatore",
          image: "https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?q=80&w=800"
        },
        {
          id: "thomas-park",
          name: "Thomas Park Garden",
          description: "A heritage roundabout garden displaying botanical specimens and flowering plants, adding to the lush green identity of the Race Course locality.",
          location: "Thomas Park Circular Junction",
          entryFee: "Free",
          timings: "06:00 AM - 08:00 PM",
          bestTime: "Morning walk time",
          mapUrl: "https://maps.google.com/?q=Thomas+Park+Coimbatore",
          image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800"
        }
      ],
      restaurants: [
        {
          id: "the-french-door",
          name: "The French Door - Cafe & Bistro",
          rating: "4.9",
          reviews: "4,210",
          cuisine: "Gourmet French, Italian, Fine Dining",
          price: "₹₹₹₹ (Ultra-Premium)",
          location: "Bashyakarlu Rd, Race Course",
          hours: "11:00 AM - 11:00 PM",
          contact: "+91 422 222 0808",
          mapUrl: "https://maps.google.com/?q=The+French+Door+Race+Course+Coimbatore",
          image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=800"
        },
        {
          id: "under-the-tree",
          name: "Under The Tree (UTT Cafe)",
          rating: "4.7",
          reviews: "2,350",
          cuisine: "Continental, Woodfired Pizzas, Specialty Tea",
          price: "₹₹₹ (Premium)",
          location: "Race Course Rd, Opp. Thomas Park",
          hours: "12:00 PM - 11:30 PM",
          contact: "+91 99443 65444",
          mapUrl: "https://maps.google.com/?q=Under+The+Tree+Race+Course+Coimbatore",
          image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800"
        },
        {
          id: "red-pearl",
          name: "Red Pearl Pan Asian fine dine",
          rating: "4.6",
          reviews: "1,520",
          cuisine: "Japanese Sushi, Chinese & Thai",
          price: "₹₹₹₹ (Ultra-Premium)",
          location: "Vivanta Coimbatore, Avinashi Rd, Race Course",
          hours: "12:30 PM - 03:00 PM, 07:00 PM - 11:30 PM",
          contact: "+91 422 668 1000",
          mapUrl: "https://maps.google.com/?q=Vivanta+Coimbatore+Race+Course",
          image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800"
        }
      ]
    },
    {
      id: "peelamedu",
      name: "Peelamedu",
      tagline: "Industrial Pioneers & Academic Hubs",
      bannerImage: "images/Peelamedu.jpeg",
      description: "Peelamedu is a fast-growing locality known for educational institutions, shopping malls, hospitals, and business centers.",
      spots: [
        {
          id: "fun-republic-mall",
          name: "Fun Republic Mall",
          description: "One of Coimbatore's largest lifestyle malls. Housing a multi-screen cinema, international apparel brands, play zones, and a massive food court.",
          location: "Avinashi Road, Peelamedu",
          entryFee: "Free",
          timings: "10:00 AM - 10:00 PM",
          bestTime: "Weekends with family",
          mapUrl: "https://maps.google.com/?q=Fun+Republic+Mall+Coimbatore",
          image: "images/Peelamedu1.jpeg"
        },
        {
          id: "psg-tech-museum",
          name: "PSG Tech Heritage Museum",
          description: "A private museum chronicling the industrial revolution of Coimbatore led by the PSG groups, showcasing antique machinery and educational evolution artifacts.",
          location: "PSG Tech Campus, Peelamedu",
          entryFee: "Free (Requires prior permission or educational pass)",
          timings: "09:00 AM - 04:30 PM (Closed Sundays)",
          bestTime: "Morning shifts",
          mapUrl: "https://maps.google.com/?q=PSG+College+of+Technology+Coimbatore",
          image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=800"
        },
        {
          id: "codissia-complex",
          name: "CODISSIA Trade Fair Complex",
          description: "One of Asia's largest pillar-less exhibition halls, hosting prestigious industrial expos, book festivals, and cultural events throughout the year.",
          location: "Codissia Rd, Peelamedu East Area",
          entryFee: "Varies with exhibition",
          timings: "09:00 AM - 06:00 PM (On expo days)",
          bestTime: "During major trade fairs and book festivals",
          mapUrl: "https://maps.google.com/?q=CODISSIA+Trade+Fair+Complex+Coimbatore",
          image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800"
        }
      ],
      restaurants: [
        {
          id: "smoke-hub-peelamedu",
          name: "Smoke Hub Barbeque - Peelamedu",
          rating: "4.5",
          reviews: "3,890",
          cuisine: "Barbeque & Multi-cuisine Grill buffet",
          price: "₹₹₹ (Premium)",
          location: "Avinashi Road, Peelamedu",
          hours: "11:30 AM - 04:30 PM, 06:30 PM - 11:00 PM",
          contact: "+91 422 495 9999",
          mapUrl: "https://maps.google.com/?q=Smoke+Hub+Barbeque+Peelamedu+Coimbatore",
          image: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=800"
        },
        {
          id: "haribhavanam-peelamedu",
          name: "Haribhavanam Hotel - Kongu Cuisine",
          rating: "4.6",
          reviews: "7,810",
          cuisine: "Authentic Non-Vegetarian Kongunad meals",
          price: "₹₹ (Moderate)",
          location: "Goldwins / Avinashi Road, Peelamedu Area",
          hours: "11:30 AM - 10:30 PM",
          contact: "+91 422 257 3255",
          mapUrl: "https://maps.google.com/?q=Haribhavanam+Goldwins+Coimbatore",
          image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800"
        },
        {
          id: "the-creme-co",
          name: "The Creme & Co. Patisserie",
          rating: "4.7",
          reviews: "1,110",
          cuisine: "Gourmet Desserts, Waffles, Milkshakes",
          price: "₹₹ (Moderate)",
          location: "Near PSG Tech, Avinashi Rd, Peelamedu",
          hours: "11:00 AM - 11:30 PM",
          contact: "+91 97893 45672",
          mapUrl: "https://maps.google.com/?q=The+Creme+and+Co+Peelamedu+Coimbatore",
          image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800"
        }
      ]
    },
    {
      id: "saibaba-colony",
      name: "Saibaba Colony",
      tagline: "Serene Gardens & Modern Cafes",
      bannerImage: "images/Saibabacolony.jpeg",
      description: "Saibaba Colony is a lively residential neighborhood famous for its cafés, restaurants, parks, and relaxed atmosphere.",
      spots: [
        {
          id: "saibaba-temple",
          name: "Sri Naga Sai Mandir",
          description: "One of the oldest and most revered Shirdi Sai Baba temples in the region, established in 1943. Known for its gold chariot and serene meditation environment.",
          location: "Mettupalayam Road, Saibaba Colony",
          entryFee: "Free",
          timings: "05:00 AM - 01:00 PM, 04:00 PM - 09:00 PM",
          bestTime: "Thursday (Day of special prayers)",
          mapUrl: "https://maps.google.com/?q=Naga+Sai+Mandir+Mettupalayam+Road+Coimbatore",
          image: "https://images.unsplash.com/photo-1602631985686-2bb060a988d4?q=80&w=800"
        },
        {
          id: "bharathi-park",
          name: "Bharathi Park Layout & Playgrounds",
          description: "A well-maintained neighborhood park with dedicated jogging tracks, children's swings, outdoor gym setups, and serene floral paths.",
          location: "Bharathi Park Road, Saibaba Colony",
          entryFee: "Free",
          timings: "05:00 AM - 10:00 AM, 04:00 PM - 08:30 PM",
          bestTime: "Sunrise hours for exercise",
          mapUrl: "https://maps.google.com/?q=Bharathi+Park+Saibaba+Colony+Coimbatore",
          image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800"
        },
        {
          id: "nrd-eco-park",
          name: "Mettupalayam Road Green Canopy",
          description: "A scenic tree-lined stretch hosting nurseries and agricultural demonstration zones run by the university experts.",
          location: "Mettupalayam Road Highway entrance",
          entryFee: "Free",
          timings: "09:00 AM - 06:00 PM",
          bestTime: "Afternoons to shop for native saplings",
          mapUrl: "https://maps.google.com/?q=Mettupalayam+Road+Coimbatore",
          image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800"
        }
      ],
      restaurants: [
        {
          id: "kannan-snack-bar",
          name: "Kannan Kaapi & Snack Bar",
          rating: "4.6",
          reviews: "2,200",
          cuisine: "Filter Coffee, Podi Dosa & Snacks",
          price: "₹ (Budget-Friendly)",
          location: "NSR Road, Saibaba Colony",
          hours: "06:30 AM - 09:30 PM",
          contact: "+91 422 244 5566",
          mapUrl: "https://maps.google.com/?q=Kannan+Kaapi+Saibaba+Colony+Coimbatore",
          image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?q=80&w=800"
        },
        {
          id: "besant-nagar-chat",
          name: "Kovai Besant Nagar Chat Center",
          rating: "4.4",
          reviews: "1,550",
          cuisine: "Street food, Pani Puri, Pav Bhaji",
          price: "₹ (Budget-Friendly)",
          location: "NSR Road Cross, Saibaba Colony",
          hours: "04:00 PM - 10:30 PM",
          contact: "+91 98944 12345",
          mapUrl: "https://maps.google.com/?q=Besant+Nagar+Chat+Saibaba+Colony+Coimbatore",
          image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=800"
        },
        {
          id: "the-specialty-veg",
          name: "The Vegetarian Fine Dine",
          rating: "4.5",
          reviews: "980",
          cuisine: "North Indian & Continental Vegetarian",
          price: "₹₹₹ (Premium)",
          location: "Mettupalayam Road, Saibaba Colony Junction",
          hours: "11:30 AM - 10:30 PM",
          contact: "+91 422 422 5599",
          mapUrl: "https://maps.google.com/?q=Vegetarian+Fine+Dine+Saibaba+Colony+Coimbatore",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800"
        }
      ]
    },
    {
      id: "singanallur",
      name: "Singanallur",
      tagline: "Eco-Reserve Lakes & Transport Crossroads",
      bannerImage: "images/Singanallur.jpeg",
      description: "Singanallur is well known for its scenic lake, birdwatching, peaceful surroundings, and excellent transport connectivity.",
      spots: [
        {
          id: "singanallur-lake",
          name: "Singanallur Urban Wetland Lake & Bird Sanctuary",
          description: "A biodiversity hotspot home to over 160 species of birds, butterflies, and rich aquatic flora. Features nature walk programs, butterfly parks, and bird-watching towers.",
          location: "Trichy Road, Singanallur",
          entryFee: "Free (Contributions welcome for nature walks)",
          timings: "06:00 AM - 09:00 AM, 04:30 PM - 06:30 PM",
          bestTime: "November to February (Migratory bird season)",
          mapUrl: "https://maps.google.com/?q=Singanallur+Lake+Coimbatore",
          image: "images/Singanallur1.jpeg"
        },
        {
          id: "uzhavar-sandhai-singanallur",
          name: "Singanallur Farmers Market (Uzhavar Sandhai)",
          description: "One of the oldest government-initiated direct farmer-to-consumer markets, showcasing fresh farm produce arriving daily from agricultural pockets of Coimbatore.",
          location: "Trichy Road, Singanallur",
          entryFee: "Free",
          timings: "05:00 AM - 10:00 AM",
          bestTime: "Early morning 6:00 AM for absolute freshness",
          mapUrl: "https://maps.google.com/?q=Uzhavar+Sandhai+Singanallur+Coimbatore",
          image: "https://images.unsplash.com/photo-1542224566-6e85f2e6772f?q=80&w=800"
        },
        {
          id: "railway-museum-singanallur",
          name: "Kovai Train Carriage & Heritage Spot",
          description: "A localized showcase detailing the historical meter-gauge railway connectivity that built the textile trade of Coimbatore.",
          location: "Near Singanallur Railway Station Area",
          entryFee: "Free",
          timings: "10:00 AM - 05:00 PM",
          bestTime: "Afternoon",
          mapUrl: "https://maps.google.com/?q=Singanallur+Railway+Station+Coimbatore",
          image: "https://images.unsplash.com/photo-1545487833-1633f7ba7d22?q=80&w=800"
        }
      ],
      restaurants: [
        {
          id: "hotel-rajasthani",
          name: "Rajasthani Bhojanalaya - Singanallur Branch",
          rating: "4.5",
          reviews: "1,200",
          cuisine: "Rajasthani Thali, Marwari Vegetarian",
          price: "₹₹ (Moderate)",
          location: "Trichy Road, Singanallur",
          hours: "11:30 AM - 03:30 PM, 07:00 PM - 10:30 PM",
          contact: "+91 422 259 8899",
          mapUrl: "https://maps.google.com/?q=Rajasthani+Bhojanalaya+Singanallur+Coimbatore",
          image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800"
        },
        {
          id: "ss-hyderabad-singanallur",
          name: "SS Hyderabad Biryani",
          rating: "4.4",
          reviews: "6,920",
          cuisine: "Hyderabadi Dum Biryani, Mughlai",
          price: "₹₹ (Moderate)",
          location: "Trichy Road Junction, Singanallur",
          hours: "11:00 AM - 11:00 PM",
          contact: "+91 422 259 5555",
          mapUrl: "https://maps.google.com/?q=SS+Hyderabad+Biryani+Singanallur+Coimbatore",
          image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800"
        },
        {
          id: "murugan-idli-singanallur",
          name: "Sri Murugan Tiffin Room",
          rating: "4.3",
          reviews: "2,300",
          cuisine: "Classic South Indian Idli & Chutneys",
          price: "₹ (Budget-Friendly)",
          location: "Near Bus Stand, Trichy Road, Singanallur",
          hours: "06:00 AM - 10:00 PM",
          contact: "+91 94432 99012",
          mapUrl: "https://maps.google.com/?q=Murugan+Idli+Singanallur+Coimbatore",
          image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800"
        }
      ]
    },
    {
      id: "saravanampatti",
      name: "Saravanampatti",
      tagline: "Silicon Valley of Kovai & IT Hubs",
      bannerImage: "images/Saravanampatti.jpeg",
      description: "Saravanampatti is Coimbatore's IT hub, home to leading technology companies, educational institutions, and modern lifestyle amenities.",
      spots: [
        {
          id: "chilotg-it-park",
          name: "CHIL SEZ IT Park (Keeranatham)",
          description: "The primary tech park hosting global software giants. Surrounded by beautifully landscaped green areas, food courts, and futuristic corporate layouts.",
          location: "Keeranatham Road, Saravanampatti",
          entryFee: "Free (Visitor pass needed inside office blocks)",
          timings: "Open 24 Hours",
          bestTime: "Evening when the campus lights up",
          mapUrl: "https://maps.google.com/?q=CHIL+SEZ+IT+Park+Coimbatore",
          image: "images/Saravanampatti1.jpeg"
        },
        {
          id: "prozone-mall",
          name: "Prozone Mall",
          description: "Located close to Saravanampatti, this massive horizontally designed shopping mall boasts the largest INOX cinema screen in Coimbatore, a giant family entertainment park, and a sprawling open-air food hub.",
          location: "Sathy Road, Saravanampatti Area",
          entryFee: "Free",
          timings: "10:00 AM - 10:00 PM",
          bestTime: "Weekend evenings",
          mapUrl: "https://maps.google.com/?q=Prozone+Mall+Coimbatore",
          image: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=800"
        },
        {
          id: "keeranatham-temple",
          name: "Historic Athanoor Amman Temple",
          description: "A peaceful rural temple on the outskirts of the IT hub, showcasing classic Tamil village worship styles and dynamic local history.",
          location: "Keeranatham Village Road",
          entryFee: "Free",
          timings: "06:00 AM - 12:00 PM, 05:00 PM - 08:30 PM",
          bestTime: "Sunset hours",
          mapUrl: "https://maps.google.com/?q=Athanoor+Amman+Temple+Keeranatham",
          image: "https://images.unsplash.com/photo-1602631985686-2bb060a988d4?q=80&w=800"
        }
      ],
      restaurants: [
        {
          id: "tech-bistro",
          name: "The Tech Bistro & Brewery Lounge",
          rating: "4.6",
          reviews: "2,100",
          cuisine: "Global Fusion, Craft Cocktails, Pizza",
          price: "₹₹₹ (Premium)",
          location: "IT Corridor Road, Saravanampatti",
          hours: "11:00 AM - 11:30 PM",
          contact: "+91 422 433 7799",
          mapUrl: "https://maps.google.com/?q=Tech+Bistro+Saravanampatti+Coimbatore",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800"
        },
        {
          id: "kovai-al-taza",
          name: "Al Taza Shawarma & Middle Eastern",
          rating: "4.7",
          reviews: "4,500",
          cuisine: "Lebanese Shawarma, Hummus, Wraps",
          price: "₹₹ (Moderate)",
          location: "Sathy Road, Saravanampatti",
          hours: "12:00 PM - 11:30 PM",
          contact: "+91 97902 44322",
          mapUrl: "https://maps.google.com/?q=Al+Taza+Saravanampatti+Coimbatore",
          image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800"
        },
        {
          id: "cafe-de-kovai",
          name: "Cafe De Kovai",
          rating: "4.5",
          reviews: "890",
          cuisine: "Continental Desserts, Coffee, Pastas",
          price: "₹₹ (Moderate)",
          location: "Near CHIL SEZ, Saravanampatti",
          hours: "11:30 AM - 11:00 PM",
          contact: "+91 98422 56781",
          mapUrl: "https://maps.google.com/?q=Cafe+De+Kovai+Saravanampatti+Coimbatore",
          image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800"
        }
      ]
    },
    {
      id: "vadavalli",
      name: "Vadavalli",
      tagline: "Western Foothills & Mystic Temples",
      bannerImage: "https://q-xx.bstatic.com/xdata/images/hotel/840x460/482185396.jpg?k=745d5aaf7b25d8820fb98a9118a812588a316a69ece4cb5382b58170a0815759&o=",
      description: "Vadavalli is a serene residential area near the Western Ghats, known for its greenery, pleasant climate, and easy access to nature.",
      spots: [
        {
          id: "marudhamalai-temple",
          name: "Marudhamalai Murugan Hill Temple",
          description: "Perched on a scenic hillock, this 1200-year-old temple is dedicated to Lord Murugan. Known for its spiritual power, clean mountain air, and panoramic views of Coimbatore.",
          location: "Marudhamalai Hill Road (5 km from Vadavalli)",
          entryFee: "Free (Hill bus service at ₹10 per trip)",
          timings: "05:30 AM - 08:30 PM",
          bestTime: "Early morning to witness the sunrise above the valley",
          mapUrl: "https://maps.google.com/?q=Marudhamalai+Temple+Coimbatore",
          image: "https://images.unsplash.com/photo-1602631985686-2bb060a988d4?q=80&w=800"
        },
        {
          id: "bharathiar-university-gardens",
          name: "Bharathiar University Botanical Gardens",
          description: "A grand university research park boasting vast arrays of native medicinal plants, rare forest species, and calm shaded walkways.",
          location: "Maruthamalai Road, Vadavalli Area",
          entryFee: "₹30 for Adults (Requires entry permit at gate)",
          timings: "09:00 AM - 05:00 PM (Closed Sundays)",
          bestTime: "Winter months (December-January)",
          mapUrl: "https://maps.google.com/?q=Bharathiar+University+Coimbatore",
          image: "https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=800"
        },
        {
          id: "anuvavi-subramanyar",
          name: "Anuvavi Subramanyar Temple",
          description: "Tucked deeper in the hills, this temple features a natural mountain spring that never runs dry. Associated with legends of Lord Hanuman from the Ramayana.",
          location: "Anuvavi, near Vadavalli",
          entryFee: "Free",
          timings: "06:00 AM - 06:00 PM",
          bestTime: "Monsoon mornings for surrounding waterfalls",
          mapUrl: "https://maps.google.com/?q=Anuvavi+Subramanyar+Temple+Coimbatore",
          image: "https://images.unsplash.com/photo-1545487833-1633f7ba7d22?q=80&w=800"
        }
      ],
      restaurants: [
        {
          id: "hill-view-veg",
          name: "Sree Annapoorna - Vadavalli Branch",
          rating: "4.7",
          reviews: "5,820",
          cuisine: "South Indian Vegetarian Breakfast, Filter Coffee",
          price: "₹₹ (Moderate)",
          location: "Marudhamalai Main Road, Vadavalli",
          hours: "06:00 AM - 10:00 PM",
          contact: "+91 422 242 3344",
          mapUrl: "https://maps.google.com/?q=Sree+Annapoorna+Vadavalli+Coimbatore",
          image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?q=80&w=800"
        },
        {
          id: "hills-bistro",
          name: "The Western Foothills Cafe",
          rating: "4.5",
          reviews: "950",
          cuisine: "Woodfired Pizza, Italian, Fresh Juices",
          price: "₹₹ (Moderate)",
          location: "Cooperative Nagar, Marudhamalai Road, Vadavalli",
          hours: "12:00 PM - 10:30 PM",
          contact: "+91 96291 55022",
          mapUrl: "https://maps.google.com/?q=Foothills+Cafe+Vadavalli+Coimbatore",
          image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800"
        },
        {
          id: "arjuna-chettinad",
          name: "Arjuna Chettinad Mess",
          rating: "4.4",
          reviews: "1,220",
          cuisine: "Spicy Chettinad Non-Vegetarian Meals",
          price: "₹₹ (Moderate)",
          location: "Vadavalli Main Bus Stand Road",
          hours: "11:30 AM - 04:00 PM, 06:30 PM - 10:00 PM",
          contact: "+91 99943 00871",
          mapUrl: "https://maps.google.com/?q=Arjuna+Chettinad+Mess+Vadavalli+Coimbatore",
          image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?q=80&w=800"
        }
      ]
    }
  ]
};

window.COIMBATORE_DATA = COIMBATORE_DATA;
