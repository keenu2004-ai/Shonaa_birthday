import fs from 'fs';
import path from 'path';

const photoOverrides = {
  // PHOTO 001
  'WhatsApp Image 2026-11-09 at 11.15.53 PM.jpeg': {
    title: 'The Legendary Cafe Pout',
    caption: 'Arms crossed, waiting for food with that cute little pout that melts my heart every single time.',
    category: 'favourite',
    location: 'Cafe Date',
    date: '2025',
    featured: true,
    displayOrder: 1,
  },
  // PHOTO 002
  'WhatsApp Image 2026-11-09 at 11.15.54 PM (1).jpeg': {
    title: 'Hollow of the Ancient Tree',
    caption: 'Curled up comfortably inside the multi-trunk tree in the scenic hill station woods.',
    category: 'vacations',
    location: 'Mussoorie Hills',
    date: 'Our First Vacation',
    featured: false,
    displayOrder: 15,
  },
  // PHOTO 003
  'WhatsApp Image 2026-11-09 at 11.15.54 PM.jpeg': {
    title: 'Mountain Bridge & Mist',
    caption: 'Standing on the green iron bridge against rolling clouds and misty Himalayan cliffs.',
    category: 'vacations',
    location: 'Mussoorie Trail',
    date: 'Our First Vacation',
    featured: false,
    displayOrder: 16,
  },
  // PHOTO 004
  'WhatsApp Image 2026-11-09 at 11.15.56 PM (1).jpeg': {
    title: 'Light Breaking Through the Cavern',
    caption: 'A dramatic beam of sunlight cutting through the natural ceiling inside Robber\'s Cave.',
    category: 'adventures',
    location: "Robber's Cave (Guchhupani)",
    date: 'Nature Trek',
    featured: false,
    displayOrder: 25,
  },
  // PHOTO 005
  'WhatsApp Image 2026-11-09 at 11.15.56 PM.jpeg': {
    title: 'Queen of the Hills Ridge',
    caption: 'Looking out over endless green Himalayan mountain ranges with rolling clouds below.',
    category: 'vacations',
    location: 'Mussoorie Viewpoint',
    date: 'Our First Vacation',
    featured: true,
    displayOrder: 5,
  },
  // PHOTO 006
  'WhatsApp Image 2026-11-09 at 11.15.57 PM (1).jpeg': {
    title: 'Mind Your Head at the Cave',
    caption: 'Laughing at the "Mind Your Head" sign on the mossy rock stairs entering the caverns.',
    category: 'adventures',
    location: "Robber's Cave Caverns",
    date: 'Nature Trek',
    featured: true,
    displayOrder: 8,
  },
  // PHOTO 007
  'WhatsApp Image 2026-11-09 at 11.15.57 PM.jpeg': {
    title: 'Reflections in the Stream',
    caption: 'Stepping through the cool natural cave stream under the towering limestone gorge.',
    category: 'adventures',
    location: "Robber's Cave Trail",
    date: 'Nature Trek',
    featured: false,
    displayOrder: 26,
  },
  // PHOTO 008
  'WhatsApp Image 2026-11-09 at 11.15.58 PM (1).jpeg': {
    title: 'Warmth in Red',
    caption: 'Solo portrait of Shonaa smiling warmly in her beautiful red patterned outfit.',
    category: 'her-photos',
    location: 'Portrait Memory',
    date: '2025',
    featured: false,
    displayOrder: 35,
  },
  // PHOTO 009
  'WhatsApp Image 2026-11-09 at 11.15.58 PM (2).jpeg': {
    title: 'High on the Ferris Wheel',
    caption: 'Arms outstretched at the top of the giant Ferris wheel with night festival lights glowing all around.',
    category: 'happy-moments',
    location: 'Night Fair Carnival',
    date: 'Pure Joy',
    featured: true,
    displayOrder: 4,
  },
  // PHOTO 010
  'WhatsApp Image 2026-11-09 at 11.15.58 PM (3).jpeg': {
    title: 'Late Night Blanket Call',
    caption: 'Wrapped up in a warm blanket holding a thermos, sharing sleepy late-night whispers.',
    category: 'happy-moments',
    location: 'Late Night Screen',
    date: 'Everyday Magic',
    featured: true,
    displayOrder: 10,
  },
  // PHOTO 011
  'WhatsApp Image 2026-11-09 at 11.15.58 PM (4).jpeg': {
    title: 'Diwali Diya Glow',
    caption: 'Lighting festive earthen lamps in purple silk embroidered attire, radiating festival warmth.',
    category: 'special-days',
    location: 'Diwali Celebration',
    date: 'Festival of Lights',
    featured: true,
    displayOrder: 9,
  },
  // PHOTO 012
  'WhatsApp Image 2026-11-09 at 11.15.58 PM.jpeg': {
    title: 'Capsule Pod Nap',
    caption: 'Completely relaxed and fast asleep inside the futuristic massage pod capsule at the mall.',
    category: 'happy-moments',
    location: 'Mall Outing',
    date: 'Goofy Moments',
    featured: false,
    displayOrder: 20,
  },
  // PHOTO 013
  'WhatsApp Image 2026-11-09 at 11.15.59 PM (1).jpeg': {
    title: 'Side-by-Side Smiles',
    caption: 'Casual cafe lunch date in collared shirts, smiling side by side without a care in the world.',
    category: 'our-photos',
    location: 'Cafe Lunch Date',
    date: '2025',
    featured: false,
    displayOrder: 11,
  },
  // PHOTO 014
  'WhatsApp Image 2026-11-09 at 11.15.59 PM.jpeg': {
    title: 'Soft Daylight & Checkered Knitwear',
    caption: 'Golden morning light illuminating your natural beauty in cozy checkered knitwear.',
    category: 'her-photos',
    location: 'Quiet Morning',
    date: '2025',
    featured: true,
    displayOrder: 7,
  },
  // PHOTO 015
  'WhatsApp Image 2026-11-09 at 11.16.02 PM (1).jpeg': {
    title: 'Plumeria in Your Hair',
    caption: 'Waving sweetly at the camera with a bright pink plumeria flower tucked into your long hair.',
    category: 'her-photos',
    location: 'Sweet Selfies',
    date: '2025',
    featured: false,
    displayOrder: 36,
  },
  // PHOTO 016
  'WhatsApp Image 2026-11-09 at 11.16.02 PM (2).jpeg': {
    title: 'Qutub Minar Under the Stars',
    caption: 'Standing by the soaring illuminated stone tower of Qutub Minar on our nighttime heritage stroll.',
    category: 'adventures',
    location: 'Qutub Complex Heritage Walk',
    date: 'Night Walk',
    featured: true,
    displayOrder: 6,
  },
  // PHOTO 017
  'WhatsApp Image 2026-11-09 at 11.16.02 PM.jpeg': {
    title: 'Childhood Hug with Maa',
    caption: 'A cherished vintage memory of baby Shonaa held safely in mother\'s loving embrace.',
    category: 'her-photos',
    location: 'Childhood Keepsake',
    date: 'Precious Memories',
    featured: false,
    displayOrder: 45,
  },
  // PHOTO 018
  'WhatsApp Image 2026-11-09 at 11.16.04 PM.jpeg': {
    title: 'Ancient Carvings & Heritage Arch',
    caption: 'Seated beneath the illuminated sandstone archways and historic motifs on our evening wander.',
    category: 'adventures',
    location: 'Historic Monuments',
    date: 'Heritage Night',
    featured: false,
    displayOrder: 27,
  },
  // PHOTO 019
  'WhatsApp Image 2026-11-09 at 11.16.05 PM.jpeg': {
    title: 'Illuminated Minar Promenade',
    caption: 'A quiet, peaceful walk along the stone pathways beneath the glowing spire of Qutub Minar.',
    category: 'adventures',
    location: 'Qutub Heritage Grounds',
    date: 'Night Walk',
    featured: false,
    displayOrder: 28,
  },
  // PHOTO 020
  'WhatsApp Image 2026-11-09 at 11.16.06 PM.jpeg': {
    title: 'Night Glow & Starlit Spire',
    caption: 'Looking over your shoulder as the architectural grandeur of centuries stands tall in the dark sky.',
    category: 'adventures',
    location: 'Qutub Complex',
    date: 'Night Walk',
    featured: false,
    displayOrder: 29,
  },
  // PHOTO 021
  'WhatsApp Image 2026-11-09 at 11.16.07 PM.jpeg': {
    title: 'Little Golden Puppy Friend',
    caption: 'Holding the sweetest golden puppy on your lap in your Dragon Ball tee, pure compassion in your eyes.',
    category: 'happy-moments',
    location: 'Evening Walk',
    date: 'Puppy Love',
    featured: true,
    displayOrder: 12,
  },
  // PHOTO 022
  'WhatsApp Image 2026-11-09 at 11.16.08 PM.jpeg': {
    title: 'Gentle Puppy Cuddles',
    caption: 'Gently comforting the tiny puppy — proof that your heart is the kindest place on earth.',
    category: 'happy-moments',
    location: 'Evening Walk',
    date: 'Puppy Love',
    featured: false,
    displayOrder: 21,
  },
  // PHOTO 023
  'WhatsApp Image 2026-11-09 at 11.16.10 PM.jpeg': {
    title: 'Holding the Black-and-Tan Pup',
    caption: 'Smiling with pride while holding the curious little black-and-tan pup with both hands.',
    category: 'happy-moments',
    location: 'Evening Walk',
    date: 'Puppy Love',
    featured: false,
    displayOrder: 22,
  },
  // PHOTO 024
  'WhatsApp Image 2026-11-09 at 11.16.11 PM.jpeg': {
    title: 'Paws & Pure Joy',
    caption: 'Looking down with so much tenderness at our little four-legged companion of the evening.',
    category: 'happy-moments',
    location: 'Evening Walk',
    date: 'Puppy Love',
    featured: false,
    displayOrder: 23,
  },
  // PHOTO 025
  'WhatsApp Image 2026-11-09 at 11.16.12 PM.jpeg': {
    title: 'Bangla Sahib Sarovar Blessing',
    caption: 'A serene spiritual evening at Gurudwara Bangla Sahib, head covered with tilak by the holy sarovar.',
    category: 'special-days',
    location: 'Gurudwara Bangla Sahib',
    date: 'Sacred Moments',
    featured: true,
    displayOrder: 3,
  },
  // PHOTO 026
  'WhatsApp Image 2026-11-09 at 11.16.13 PM (1).jpeg': {
    title: 'Baby Shonaa & Her Doll',
    caption: 'A precious vintage scan of little baby Shonaa hugging a wrapped doll on the bed.',
    category: 'her-photos',
    location: 'Childhood Memory',
    date: 'The Very Beginning',
    featured: false,
    displayOrder: 46,
  },
  // PHOTO 027
  'WhatsApp Image 2026-11-09 at 11.16.13 PM (2).jpeg': {
    title: 'Cheek Kiss & Pink Bows',
    caption: 'An affectionate kiss on your cheek with cute pink bow doodles — one of my favourite photos of us.',
    category: 'our-photos',
    location: 'Together Always',
    date: 'Sweetest Love',
    featured: true,
    displayOrder: 2,
  },
  // PHOTO 028
  'WhatsApp Image 2026-11-09 at 11.16.13 PM.jpeg': {
    title: 'Reflections in the Sacred Sarovar',
    caption: 'Standing quietly by the illuminated waters of Bangla Sahib Sarovar under the midnight sky.',
    category: 'special-days',
    location: 'Bangla Sahib Sarovar',
    date: 'Peaceful Night',
    featured: false,
    displayOrder: 30,
  },
  // PHOTO 029
  'WhatsApp Image 2026-11-09 at 11.16.14 PM (1).jpeg': {
    title: 'Gazing at the City Lights',
    caption: 'Standing by the glass balcony rail overlooking the shimmering ocean of city nightlights.',
    category: 'her-photos',
    location: 'High-Rise Balcony',
    date: 'Nightscape',
    featured: false,
    displayOrder: 37,
  },
  // PHOTO 030
  'WhatsApp Image 2026-11-09 at 11.16.14 PM.jpeg': {
    title: 'Cozy Corner Couch',
    caption: 'Seated comfortably on the grey lounge sofa under warm amber pendant lamps in a quiet cafe.',
    category: 'her-photos',
    location: 'Cafe Lounge',
    date: '2025',
    featured: false,
    displayOrder: 38,
  },
  // PHOTO 031
  'WhatsApp Image 2026-11-09 at 11.16.16 PM (1).jpeg': {
    title: 'Studying the Menu',
    caption: 'Looking up at the dessert and food court menus with that serious focus on picking something delicious.',
    category: 'her-photos',
    location: 'Food Court Date',
    date: '2025',
    featured: false,
    displayOrder: 39,
  },
  // PHOTO 032
  'WhatsApp Image 2026-11-09 at 11.16.16 PM.jpeg': {
    title: 'City Lights from the Balcony',
    caption: 'Wind blowing through your hair as you gaze out over the sparkling cityscape at night.',
    category: 'her-photos',
    location: 'Balcony Viewpoint',
    date: 'Night Thoughts',
    featured: false,
    displayOrder: 40,
  },
  // PHOTO 033
  'WhatsApp Image 2026-11-09 at 11.16.17 PM (1).jpeg': {
    title: 'Soft Smiles by the Bar Stools',
    caption: 'A gentle, radiant smile standing by the high wooden bar stools in the illuminated cafe.',
    category: 'her-photos',
    location: 'Cafe Date',
    date: '2025',
    featured: false,
    displayOrder: 41,
  },
  // PHOTO 034
  'WhatsApp Image 2026-11-09 at 11.16.17 PM.jpeg': {
    title: 'Effortlessly Graceful',
    caption: 'Natural, poised, and beautiful without even trying — my favourite person in any room.',
    category: 'her-photos',
    location: 'Cafe Outing',
    date: '2025',
    featured: false,
    displayOrder: 42,
  },
  // PHOTO 035
  'WhatsApp Image 2026-11-09 at 11.16.18 PM (1).jpeg': {
    title: 'Table for Two',
    caption: 'Sitting right across from me with long hair framing your face, having the best conversations.',
    category: 'favourite',
    location: 'Keventers Date',
    date: '2025',
    featured: true,
    displayOrder: 13,
  },
  // PHOTO 036
  'WhatsApp Image 2026-11-09 at 11.16.18 PM.jpeg': {
    title: 'Casual & Chic',
    caption: 'Leaning effortlessly by the counter, looking stylish in wide-leg denim and black sleeveless top.',
    category: 'her-photos',
    location: 'Cafe Outing',
    date: '2025',
    featured: false,
    displayOrder: 43,
  },
  // PHOTO 037
  'WhatsApp Image 2026-11-09 at 11.16.20 PM.jpeg': {
    title: 'Your Eyes Tell Stories',
    caption: 'Arms crossed on the warm wooden table, looking straight at me with that gentle, serene gaze.',
    category: 'favourite',
    location: 'Cafe Conversation',
    date: '2025',
    featured: true,
    displayOrder: 14,
  },
  // PHOTO 038
  'WhatsApp Image 2026-11-09 at 11.16.21 PM.jpeg': {
    title: 'Silken Hair & Quiet Thoughts',
    caption: 'A quiet, unposed moment at Keventers, long glossy hair catching the warm ceiling lights.',
    category: 'her-photos',
    location: 'Keventers Cafe',
    date: '2025',
    featured: false,
    displayOrder: 44,
  },
  // PHOTO 039
  'WhatsApp Image 2026-11-09 at 11.16.25 PM.jpeg': {
    title: 'Gentle Focus',
    caption: 'Looking down at the table, lost in the quiet warmth of an afternoon spent together.',
    category: 'her-photos',
    location: 'Cafe Afternoon',
    date: '2025',
    featured: false,
    displayOrder: 47,
  },
  // PHOTO 040
  'WhatsApp Image 2026-11-09 at 11.16.26 PM.jpeg': {
    title: 'Profile in Sunlight',
    caption: 'Turning slightly toward the conversation, showing off that elegant side profile and flowing hair.',
    category: 'her-photos',
    location: 'Cafe Table',
    date: '2025',
    featured: false,
    displayOrder: 48,
  },
  // PHOTO 041
  'WhatsApp Image 2026-11-09 at 11.16.31 PM.jpeg': {
    title: 'Terrace Cafe in the Hills',
    caption: 'Looking out over the Himalayan valley and hillside town from a wrought-iron terrace cafe.',
    category: 'vacations',
    location: 'Mussoorie / Hill Station Terrace',
    date: 'Our First Vacation',
    featured: true,
    displayOrder: 17,
  },
  // PHOTO 042
  'WhatsApp Image 2026-11-09 at 11.16.36 PM.jpeg': {
    title: 'Hillside Lake Valley Vista',
    caption: 'Standing by the viewing rail in a warm varsity jacket overlooking the tranquil lake in the valley below.',
    category: 'vacations',
    location: 'Scenic Lake Overlook',
    date: 'Hill Station Trip',
    featured: false,
    displayOrder: 18,
  },
  // PHOTO 043
  'WhatsApp Image 2026-11-09 at 11.16.41 PM.jpeg': {
    title: 'Overlooking Rolling Mountain Clouds',
    caption: 'Gazing into the distance across the pine valleys with dramatic clouds sweeping over the peaks.',
    category: 'vacations',
    location: 'Himalayan Ridge',
    date: 'Our First Vacation',
    featured: false,
    displayOrder: 19,
  },
  // PHOTO 044
  'WhatsApp Image 2026-11-09 at 11.16.42 PM.jpeg': {
    title: 'Walking the Mountain Road',
    caption: 'A peaceful stroll along the mountain road in a classic denim jacket against green terraced hills.',
    category: 'vacations',
    location: 'Valley Route',
    date: 'Hillside Walk',
    featured: false,
    displayOrder: 24,
  },
  // PHOTO 045
  'WhatsApp Image 2026-11-09 at 11.16.45 PM.jpeg': {
    title: 'Helmets & Open Highways',
    caption: 'Helmets buckled, ready for a cool breeze highway ride together with the open road ahead.',
    category: 'our-photos',
    location: 'Motorcycle Adventure',
    date: 'Road Trip',
    featured: true,
    displayOrder: 18,
  },
  // PHOTO 046
  'WhatsApp Image 2026-11-09 at 11.16.56 PM (1).jpeg': {
    title: 'Mountain Trail Steps',
    caption: 'Climbing the hill path surrounded by deodar trees and clean mountain air.',
    category: 'vacations',
    location: 'Mussoorie Hills',
    date: 'Our First Vacation',
    featured: false,
    displayOrder: 31,
  },
  // PHOTO 047
  'WhatsApp Image 2026-11-09 at 11.16.56 PM.jpeg': {
    title: 'Hilltop Pine Breeze',
    caption: 'Enjoying the refreshing Himalayan breeze among tall evergreens.',
    category: 'vacations',
    location: 'Hill Station Trails',
    date: 'Our First Vacation',
    featured: false,
    displayOrder: 32,
  },
  // PHOTO 048
  'WhatsApp Image 2026-11-09 at 11.16.57 PM.jpeg': {
    title: 'Scenic Mountain Overlook',
    caption: 'Taking in the sweeping vistas of the Garhwal range stretching toward the horizon.',
    category: 'vacations',
    location: 'Mussoorie Viewpoint',
    date: 'Our First Vacation',
    featured: false,
    displayOrder: 33,
  },
  // PHOTO 049
  'WhatsApp Image 2026-11-09 at 11.16.58 PM (1).jpeg': {
    title: 'Himalayan Ridge Walk',
    caption: 'Walking hand in hand through the scenic trails of the Queen of the Hills.',
    category: 'vacations',
    location: 'Mussoorie Ridge',
    date: 'Our First Vacation',
    featured: false,
    displayOrder: 34,
  },
  // PHOTO 050
  'WhatsApp Image 2026-11-09 at 11.16.58 PM (2).jpeg': {
    title: 'Tall Deodars of Mussoorie',
    caption: 'Standing beneath the towering Deodar cedars framing the misty mountain valley.',
    category: 'vacations',
    location: 'Deodar Cedar Forest',
    date: 'Our First Vacation',
    featured: false,
    displayOrder: 35,
  },
  // PHOTO 051
  'WhatsApp Image 2026-11-09 at 11.16.58 PM.jpeg': {
    title: 'Valley Whispers',
    caption: 'Resting on the stone ledge overlooking the lush valley below.',
    category: 'vacations',
    location: 'Mussoorie Ridge',
    date: 'Our First Vacation',
    featured: false,
    displayOrder: 36,
  },
  // PHOTO 052
  'WhatsApp Image 2026-11-09 at 11.16.59 PM.jpeg': {
    title: 'Grand Carved Stone Doorway',
    caption: 'Standing gracefully beside the historic carved monument portal in your blue kurti and white ghagra.',
    category: 'her-photos',
    location: 'Delhi Heritage Monument',
    date: 'Our First Official Date',
    featured: true,
    displayOrder: 20,
  },
  // PHOTO 053
  'WhatsApp Image 2026-11-09 at 11.17.00 PM.jpeg': {
    title: 'Mussoorie Mall Road & Gandhi Chowk',
    caption: 'Couple selfie strolling down Mall Road with the famous Gandhi statue in the background.',
    category: 'our-photos',
    location: 'Mussoorie Mall Road',
    date: 'Our First Vacation',
    featured: true,
    displayOrder: 21,
  },
  // PHOTO 054
  'WhatsApp Image 2026-11-09 at 11.17.01 PM.jpeg': {
    title: 'Heritage Grace in Ghagra',
    caption: 'Standing by ancient stone carvings on our first official date, looking like a royal vision.',
    category: 'her-photos',
    location: 'Heritage Grounds',
    date: 'Our First Official Date',
    featured: false,
    displayOrder: 49,
  },
  // PHOTO 055
  'WhatsApp Image 2026-11-09 at 11.17.02 PM.jpeg': {
    title: 'Christmas Fairy Lights Celebration',
    caption: 'Surrounded by the warm glow of Christmas fairy lights and holiday wreaths together.',
    category: 'our-photos',
    location: 'Christmas Celebration',
    date: 'Holiday Season',
    featured: true,
    displayOrder: 22,
  },
  // PHOTO 056
  'WhatsApp Image 2026-11-09 at 11.17.03 PM.jpeg': {
    title: 'Our First Official Date & First Photograph',
    caption: 'The very first couple picture we ever took together at the historic monument archway.',
    category: 'our-photos',
    location: 'Historic Monument Archway',
    date: 'April 2025',
    featured: true,
    displayOrder: 1,
  },
  // PHOTO 057
  'WhatsApp Image 2026-11-09 at 11.17.04 PM (1).jpeg': {
    title: 'Stone Wall Valley Viewpoint',
    caption: 'Standing by the mountain stone wall overlooking the rolling foothills of Garhwal.',
    category: 'vacations',
    location: 'Mussoorie Viewpoint',
    date: 'Our First Vacation',
    featured: false,
    displayOrder: 37,
  },
  // PHOTO 058
  'WhatsApp Image 2026-11-09 at 11.17.04 PM.jpeg': {
    title: 'Stairs of the Ancient Fort',
    caption: 'Walking down the historic stone steps after exploring the monument grounds.',
    category: 'adventures',
    location: 'Heritage Complex',
    date: 'Our First Official Date',
    featured: false,
    displayOrder: 38,
  },
  // PHOTO 059
  'WhatsApp Image 2026-11-09 at 11.17.05 PM (1).jpeg': {
    title: 'Courtyard Echoes',
    caption: 'Wandering through the open stone courtyards under the warm April sun.',
    category: 'adventures',
    location: 'Monument Courtyard',
    date: 'Our First Official Date',
    featured: false,
    displayOrder: 39,
  },
  // PHOTO 060
  'WhatsApp Image 2026-11-09 at 11.17.05 PM.jpeg': {
    title: 'Metro Travel After Our First Date',
    caption: 'Riding the metro together after our first official date, still wearing our first-date outfits with huge smiles.',
    category: 'our-photos',
    location: 'Metro Journey',
    date: 'Our First Official Date',
    featured: true,
    displayOrder: 23,
  },
  // PHOTO 061
  'WhatsApp Image 2026-11-09 at 11.17.07 PM.jpeg': {
    title: 'Archway Whispers',
    caption: 'Posing naturally beneath the weathered historic stone arch on our walk.',
    category: 'adventures',
    location: 'Heritage Trail',
    date: 'Our First Official Date',
    featured: false,
    displayOrder: 40,
  },
  // PHOTO 062
  'WhatsApp Image 2026-11-09 at 11.17.08 PM.jpeg': {
    title: 'Sunlit Pathways',
    caption: 'Following the stone trail where our journey as an official couple first began.',
    category: 'adventures',
    location: 'Monument Grounds',
    date: 'Our First Official Date',
    featured: false,
    displayOrder: 41,
  },
  // PHOTO 063
  'WhatsApp Image 2026-11-09 at 11.17.09 PM.jpeg': {
    title: 'Hugging the Penguin Plushie',
    caption: 'Holding the soft stuffed penguin tight while relaxing on the bed — the definition of adorable.',
    category: 'happy-moments',
    location: 'Cozy Room',
    date: 'Pure Comfort',
    featured: true,
    displayOrder: 24,
  },
  // PHOTO 064
  'WhatsApp Image 2026-11-09 at 11.17.12 PM.jpeg': {
    title: 'Blowing Out 23rd Birthday Candles',
    caption: 'Making a secret wish and blowing out the golden 23 candles with that unforgettable birthday smile.',
    category: 'birthday',
    location: 'Birthday Celebration',
    date: '10 November 2025',
    isBirthdayCelebration: true,
    featured: true,
    displayOrder: 25,
  },
  // PHOTO 065
  'WhatsApp Image 2026-11-09 at 11.17.13 PM (1).jpeg': {
    title: 'Rain Poncho at Christ Church',
    caption: 'Walking across the lush green lawn of historic Christ Church Mussoorie in a blue rain poncho.',
    category: 'vacations',
    location: 'Christ Church Mussoorie',
    date: 'Our First Vacation',
    featured: false,
    displayOrder: 42,
  },
  // PHOTO 066
  'WhatsApp Image 2026-11-09 at 11.17.13 PM (2).jpeg': {
    title: 'Christ Church Spire & Pine Trees',
    caption: 'The Gothic stone tower of Christ Church rising into the misty mountain air of the hills.',
    category: 'vacations',
    location: 'Christ Church Mussoorie',
    date: 'Our First Vacation',
    featured: false,
    displayOrder: 43,
  },
  // PHOTO 067
  'WhatsApp Image 2026-11-09 at 11.17.13 PM.jpeg': {
    title: 'Birthday Cake & Golden Glow',
    caption: 'Admiring the birthday cake with golden sparklers and balloons on your 23rd birthday.',
    category: 'birthday',
    location: 'Birthday Night',
    date: '10 November 2025',
    isBirthdayCelebration: true,
    featured: true,
    displayOrder: 26,
  },
  // PHOTO 068
  'WhatsApp Image 2026-11-10 at 1.03.33 AM.jpeg': {
    title: 'Breathtaking in White',
    caption: 'Stunning mirror selfie in your elegant white two-piece birthday dress — truly breathtaking.',
    category: 'her-photos',
    location: 'Birthday Glam',
    date: 'Special Occasion',
    isBirthdayCelebration: true,
    featured: true,
    displayOrder: 27,
  },
  // PHOTO 069
  'WhatsApp Image 2026-11-10 at 1.03.34 AM (1).jpeg': {
    title: 'Hello Kitty Smiles & Booth Cuddles',
    caption: 'Sitting close together on the teal booth with cute Hello Kitty face filters, overflowing with happiness.',
    category: 'our-photos',
    location: 'Cafe Booth Date',
    date: 'Pure Happiness',
    featured: true,
    displayOrder: 28,
  },
  // PHOTO 070
  'WhatsApp Image 2026-11-10 at 1.03.34 AM (2).jpeg': {
    title: 'Christmas Wreath & Holiday Pout',
    caption: 'A sweet romantic pout beside me in front of festive Christmas garlands and warm lights.',
    category: 'our-photos',
    location: 'Holiday Festivities',
    date: 'Christmas Season',
    featured: true,
    displayOrder: 29,
  },
  // PHOTO 071
  'WhatsApp Image 2026-11-10 at 1.03.34 AM.jpeg': {
    title: 'Mr. Penguin Smiling Back',
    caption: 'The adorable plushie with eyes squeezed in a happy smile — our official mascot of coziness.',
    category: 'happy-moments',
    location: 'Cozy Keepsakes',
    date: 'Sweet Memories',
    featured: false,
    displayOrder: 44,
  },
  // PHOTO 072 (Duplicate of PHOTO 001)
  'WhatsApp Image 2026-11-10 at 1.03.35 AM.jpeg': {
    title: 'Cafe Pout Encore',
    caption: 'Another look at that adorable cafe pout that makes my heart flutter every time.',
    category: 'favourite',
    location: 'Cafe Date',
    date: 'Special Dates',
    featured: false,
    displayOrder: 50,
  },
  // PHOTO 073
  'WhatsApp Image 2026-11-10 at 1.03.36 AM.jpeg': {
    title: 'Rajouri Garden Social Balcony',
    caption: 'Seated at the blue-tiled table at Rajouri Garden Social overlooking the vibrant lights below.',
    category: 'her-photos',
    location: 'Rajouri Garden Social',
    date: 'Dinner Date',
    featured: true,
    displayOrder: 30,
  },
  // PHOTO 074
  'WhatsApp Image 2026-11-10 at 1.03.37 AM.jpeg': {
    title: 'Take the Backpack!',
    caption: 'Playfully handing me the backpack across the table with that funny, animated expression.',
    category: 'happy-moments',
    location: 'Rajouri Garden Social',
    date: 'Playful Moments',
    featured: false,
    displayOrder: 45,
  },
  // PHOTO 075
  'WhatsApp Image 2026-11-10 at 1.03.38 AM (1).jpeg': {
    title: 'Sleeper Bus Road Trip Smiles',
    caption: 'Late-night sleeper bus adventure, Shonaa in clear glasses and Vaibhav smiling from ear to ear.',
    category: 'our-photos',
    location: 'Overnight Road Trip',
    date: 'Travel Adventures',
    featured: true,
    displayOrder: 31,
  },
  // PHOTO 076
  'WhatsApp Image 2026-11-10 at 1.03.38 AM (2).jpeg': {
    title: 'Silly Face Filters on the Bed',
    caption: 'Cracking up over funny wide-face filters while lounging around together — pure unfiltered laughs.',
    category: 'happy-moments',
    location: 'Lazy Afternoon',
    date: 'Goofy Laughs',
    featured: false,
    displayOrder: 46,
  },
  // PHOTO 077
  'WhatsApp Image 2026-11-10 at 1.03.38 AM.jpeg': {
    title: 'Gym Mirror Selfie — Tuti Fruti Energy',
    caption: 'Looking sporty in grey tee and track pants at the gym, staying active and focused on goals.',
    category: 'her-photos',
    location: 'Gym Workout',
    date: 'Fitness Days',
    featured: false,
    displayOrder: 47,
  },
  // PHOTO 078 (Duplicate of PHOTO 009)
  'WhatsApp Image 2026-11-10 at 1.03.39 AM (1).jpeg': {
    title: 'Carnival Night Under the Lights',
    caption: 'Soaring high above the fairgrounds on the Ferris wheel with festival lights below.',
    category: 'happy-moments',
    location: 'Night Carnival',
    date: 'Pure Joy',
    featured: false,
    displayOrder: 51,
  },
  // PHOTO 079
  'WhatsApp Image 2026-11-10 at 1.03.39 AM (2).jpeg': {
    title: 'Afternoon Lunch Date Together',
    caption: 'Enjoying our meal side by side in matching easygoing style, smiling for a quick memory.',
    category: 'our-photos',
    location: 'Lunch Date',
    date: '2025',
    featured: false,
    displayOrder: 48,
  },
  // PHOTO 080
  'WhatsApp Image 2026-11-10 at 1.03.39 AM.jpeg': {
    title: 'Doodle Hearts & Cozy Thoughts',
    caption: 'Outlined in hand-drawn white hearts and clouds, chilling together in our warm little universe.',
    category: 'our-photos',
    location: 'Cozy Afternoon',
    date: 'Doodle Love',
    featured: true,
    displayOrder: 32,
  },
  // PHOTO 081 (Duplicate of PHOTO 017)
  'WhatsApp Image 2026-11-10 at 1.03.40 AM (1).jpeg': {
    title: 'Maa\'s Loving Arms',
    caption: 'A cherished childhood scan celebrating unconditional maternal warmth and love.',
    category: 'her-photos',
    location: 'Family Keepsake',
    date: 'Precious Memories',
    featured: false,
    displayOrder: 52,
  },
  // PHOTO 082 (Duplicate of PHOTO 015)
  'WhatsApp Image 2026-11-10 at 1.03.40 AM (2).jpeg': {
    title: 'Plumeria Petals in the Breeze',
    caption: 'Soft smiles with the tropical plumeria flower tucked behind your ear.',
    category: 'her-photos',
    location: 'Sweet Selfies',
    date: '2025',
    featured: false,
    displayOrder: 53,
  },
  // PHOTO 083
  'WhatsApp Image 2026-11-10 at 1.03.40 AM.jpeg': {
    title: 'Dandiya Night in Sparkling Fuchsia',
    caption: 'Radiant in a glittering magenta traditional lehenga under the festive festival streamers.',
    category: 'special-days',
    location: 'Dandiya / Garba Festival',
    date: 'Festival Nights',
    featured: true,
    displayOrder: 33,
  },
  // PHOTO 084
  'WhatsApp Image 2026-11-10 at 1.03.41 AM (1).jpeg': {
    title: 'Qutub Minar Halo',
    caption: 'The glowing stone pinnacle of Qutub Minar rising straight behind you like an architectural crown.',
    category: 'her-photos',
    location: 'Qutub Complex',
    date: 'Night Walk',
    featured: false,
    displayOrder: 49,
  },
  // PHOTO 085
  'WhatsApp Image 2026-11-10 at 1.03.41 AM.jpeg': {
    title: 'Hardware Store Ski Goggles Explorer',
    caption: 'Trying on giant reflective blue ski goggles in the hardware aisle with the biggest, cheekiest smile.',
    category: 'happy-moments',
    location: 'DIY Hardware Store',
    date: 'Silly Adventures',
    featured: true,
    displayOrder: 34,
  },
};

// Read loveStory.ts and update mediaOverrides
const configPath = path.resolve('src/config/loveStory.ts');
let configContent = fs.readFileSync(configPath, 'utf8');

const overridesString = 'mediaOverrides: ' + JSON.stringify(photoOverrides, null, 2) + ' as Record<string, MediaOverride>,';

// Replace mediaOverrides: {} as Record<string, MediaOverride>,
configContent = configContent.replace(
  /mediaOverrides:\s*\{[\s\S]*?\}\s*as\s*Record<string,\s*MediaOverride>,/,
  overridesString
);

fs.writeFileSync(configPath, configContent, 'utf8');
console.log('Successfully injected 85 detailed photo overrides into src/config/loveStory.ts');

