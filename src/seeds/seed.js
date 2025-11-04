const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/config');
const { User, Hotel, Tour, Service, Booking, Review, Notification } = require('../models');

// Kết nối database
mongoose.connect(config.mongoose.url, config.mongoose.options);

// Dữ liệu mẫu cho User
const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    isEmailVerified: true,
  },
  {
    name: 'Nguyễn Văn An',
    email: 'nguyenvanan@example.com',
    password: 'password123',
    role: 'user',
    isEmailVerified: true,
  },
  {
    name: 'Trần Thị Bình',
    email: 'tranthibinh@example.com',
    password: 'password123',
    role: 'user',
    isEmailVerified: true,
  },
  {
    name: 'Lê Minh Công',
    email: 'leminhcong@example.com',
    password: 'password123',
    role: 'user',
    isEmailVerified: false,
  },
  {
    name: 'Phạm Thị Dung',
    email: 'phamthidung@example.com',
    password: 'password123',
    role: 'user',
    isEmailVerified: true,
  },
  {
    name: 'Hoàng Văn Hải',
    email: 'hoangvanhai@example.com',
    password: 'password123',
    role: 'user',
    isEmailVerified: true,
  },
  {
    name: 'Đỗ Thị Mai',
    email: 'dothimai@example.com',
    password: 'password123',
    role: 'user',
    isEmailVerified: true,
  },
  {
    name: 'Vũ Minh Tuấn',
    email: 'vuminhtuan@example.com',
    password: 'password123',
    role: 'user',
    isEmailVerified: false,
  },
  {
    name: 'Bùi Thị Lan',
    email: 'buithilan@example.com',
    password: 'password123',
    role: 'user',
    isEmailVerified: true,
  },
  {
    name: 'Đinh Văn Nam',
    email: 'dinhvannam@example.com',
    password: 'password123',
    role: 'user',
    isEmailVerified: true,
  },
];

// Dữ liệu mẫu cho Hotel
const hotels = [
  {
    name: 'Vinpearl Luxury Nha Trang',
    address: 'Hòn Tre Island',
    city: 'Nha Trang',
    description: 'Khách sạn 5 sao sang trọng với view biển tuyệt đẹp',
    rating: 4.8,
    pricePerNight: 3500000,
    amenities: ['Hồ bơi', 'Spa', 'Nhà hàng', 'Gym', 'Bar', 'Wi-Fi miễn phí'],
    images: ['https://images.unsplash.com/photo-1566073771259-6a8506099945', 'https://images.unsplash.com/photo-1582719508461-905c673771fd'],
    contactInfo: {
      phone: '0258-3598188',
      email: 'reservation@vinpearl.com',
    },
  },
  {
    name: 'Intercontinental Danang Sun Peninsula Resort',
    address: 'Bãi Bắc, Sơn Trà',
    city: 'Đà Nẵng',
    description: 'Resort 5 sao với kiến trúc độc đáo',
    rating: 4.9,
    pricePerNight: 4500000,
    amenities: ['Hồ bơi', 'Spa', 'Nhà hàng', 'Sân golf', 'Wi-Fi miễn phí'],
    images: ['https://images.unsplash.com/photo-1571896349842-33c89424de2d', 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9'],
    contactInfo: {
      phone: '0236-3938888',
      email: 'danang@ihg.com',
    },
  },
  {
    name: 'JW Marriott Phu Quoc',
    address: 'Khu Du Lịch Bãi Kem',
    city: 'Phú Quốc',
    description: 'Resort 5 sao view biển tuyệt đẹp',
    rating: 4.7,
    pricePerNight: 4200000,
    amenities: ['Hồ bơi vô cực', 'Spa', 'Nhà hàng', 'Bar bãi biển', 'Gym'],
    images: ['https://images.unsplash.com/photo-1520250497591-112f2f40a3f4', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7'],
    contactInfo: {
      phone: '0297-3626666',
      email: 'phuquoc@marriott.com',
    },
  },
  {
    name: 'The Reverie Saigon',
    address: '22-36 Nguyễn Huệ, Quận 1',
    city: 'Hồ Chí Minh',
    description: 'Khách sạn 5 sao cao cấp tại trung tâm Sài Gòn',
    rating: 4.8,
    pricePerNight: 5000000,
    amenities: ['Spa', 'Nhà hàng', 'Rooftop bar', 'Hồ bơi', 'Gym'],
    images: ['https://images.unsplash.com/photo-1542314831-068cd1dbfeeb', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa'],
    contactInfo: {
      phone: '028-38234999',
      email: 'info@thereveriesaigon.com',
    },
  },
  {
    name: 'Sofitel Legend Metropole Hanoi',
    address: '15 Ngô Quyền',
    city: 'Hà Nội',
    description: 'Khách sạn lịch sử sang trọng',
    rating: 4.6,
    pricePerNight: 4800000,
    amenities: ['Hồ bơi', 'Spa', 'Nhà hàng Pháp', 'Bar', 'Wi-Fi'],
    images: ['https://images.unsplash.com/photo-1496417263034-38ec4f0b665a', 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c'],
    contactInfo: {
      phone: '024-38266919',
      email: 'h1555@sofitel.com',
    },
  },
  {
    name: 'Sheraton Nha Trang Hotel',
    address: '26-28 Trần Phú',
    city: 'Nha Trang',
    description: 'Khách sạn 5 sao view biển',
    rating: 4.5,
    pricePerNight: 2800000,
    amenities: ['Hồ bơi', 'Spa', 'Nhà hàng', 'Bar', 'Gym'],
    images: ['https://images.unsplash.com/photo-1564501049412-61c2a3083791', 'https://images.unsplash.com/photo-1573052905904-34ad8c27f0cc'],
    contactInfo: {
      phone: '0258-3880000',
      email: 'nhatrang@sheraton.com',
    },
  },
  {
    name: 'Pullman Danang Beach Resort',
    address: '101 Võ Nguyên Giáp',
    city: 'Đà Nẵng',
    description: 'Resort sang trọng bên bãi biển Mỹ Khê',
    rating: 4.4,
    pricePerNight: 3200000,
    amenities: ['Hồ bơi', 'Spa', 'Nhà hàng', 'Kid club', 'Wi-Fi'],
    images: ['https://images.unsplash.com/photo-1455587734955-081b22074882', 'https://images.unsplash.com/photo-1598605259893-a9e820946c2f'],
    contactInfo: {
      phone: '0236-3958888',
      email: 'h7560@accor.com',
    },
  },
  {
    name: 'Anam QT Resort',
    address: 'Phú Quốc Marina',
    city: 'Phú Quốc',
    description: 'Resort phong cách Indochine',
    rating: 4.6,
    pricePerNight: 3800000,
    amenities: ['Hồ bơi', 'Spa', 'Nhà hàng', 'Bar', 'Bãi biển riêng'],
    images: ['https://images.unsplash.com/photo-1549294413-26f195200c16', 'https://images.unsplash.com/photo-1571896349842-33c89424de2d'],
    contactInfo: {
      phone: '0297-3999999',
      email: 'info@theanamresort.com',
    },
  },
  {
    name: 'Park Hyatt Saigon',
    address: '2 Lam Sơn Square, Quận 1',
    city: 'Hồ Chí Minh',
    description: 'Khách sạn boutique cao cấp',
    rating: 4.7,
    pricePerNight: 4600000,
    amenities: ['Spa', 'Hồ bơi', 'Nhà hàng', 'Bar', 'Gym'],
    images: ['https://images.unsplash.com/photo-1551882547-ff40c63fe5fa', 'https://images.unsplash.com/photo-1566195992011-5f6b21e539aa'],
    contactInfo: {
      phone: '028-38241234',
      email: 'saigon.park@hyatt.com',
    },
  },
  {
    name: 'Apricot Hotel Hanoi',
    address: '136 Hàng Trống',
    city: 'Hà Nội',
    description: 'Khách sạn boutique tại phố cổ',
    rating: 4.5,
    pricePerNight: 2500000,
    amenities: ['Rooftop pool', 'Spa', 'Nhà hàng', 'Bar', 'Wi-Fi'],
    images: ['https://images.unsplash.com/photo-1517840901100-8179e982acb7', 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461'],
    contactInfo: {
      phone: '024-32288888',
      email: 'info@apricothotels.com',
    },
  },
];

// Dữ liệu mẫu cho Service
const services = [
  {
    name: 'Thuê xe 4 chỗ có tài xế',
    description: 'Dịch vụ thuê xe 4 chỗ đời mới kèm tài xế chuyên nghiệp',
    price: 800000,
    type: 'transport',
  },
  {
    name: 'Thuê xe 7 chỗ có tài xế',
    description: 'Dịch vụ thuê xe 7 chỗ đời mới kèm tài xế chuyên nghiệp',
    price: 1200000,
    type: 'transport',
  },
  {
    name: 'Thuê xe 16 chỗ có tài xế',
    description: 'Dịch vụ thuê xe 16 chỗ kèm tài xế cho nhóm đông',
    price: 1800000,
    type: 'transport',
  },
  {
    name: 'Buffet sáng tại khách sạn',
    description: 'Buffet sáng đa dạng món Á - Âu',
    price: 250000,
    type: 'food',
  },
  {
    name: 'Set ăn trưa hải sản',
    description: 'Set ăn trưa hải sản tươi sống cho 2 người',
    price: 600000,
    type: 'food',
  },
  {
    name: 'Hướng dẫn viên tiếng Việt',
    description: 'HDV chuyên nghiệp, nhiệt tình',
    price: 500000,
    type: 'guide',
  },
  {
    name: 'Hướng dẫn viên tiếng Anh',
    description: 'HDV chuyên nghiệp, thành thạo tiếng Anh',
    price: 800000,
    type: 'guide',
  },
  {
    name: 'Vé cáp treo Bà Nà Hills',
    description: 'Vé cáp treo khứ hồi kèm buffet trưa',
    price: 750000,
    type: 'ticket',
  },
  {
    name: 'Vé VinWonders Phú Quốc',
    description: 'Vé tham quan công viên chủ đề',
    price: 600000,
    type: 'ticket',
  },
  {
    name: 'Bảo hiểm du lịch',
    description: 'Bảo hiểm du lịch toàn diện',
    price: 150000,
    type: 'other',
  },
];

// Dữ liệu mẫu cho Tour
const tours = [
  {
    name: 'Tour Nha Trang 3N2Đ',
    description: 'Khám phá biển đảo Nha Trang, tham quan các địa điểm nổi tiếng',
    destination: 'Nha Trang',
    duration: '3 ngày 2 đêm',
    pricePerPerson: 4500000,
    itinerary: [
      {
        day: 1,
        activities: [
          'Khởi hành từ TP.HCM',
          'Check-in khách sạn',
          'Tắm biển tự do',
          'Ăn tối hải sản',
        ],
      },
      {
        day: 2,
        activities: [
          'Tham quan Vinpearl Land',
          'Chơi các trò chơi giải trí',
          'Ăn trưa buffet',
          'Về khách sạn nghỉ ngơi',
        ],
      },
      {
        day: 3,
        activities: [
          'Check-out khách sạn',
          'Mua sắm đặc sản',
          'Trở về TP.HCM',
        ],
      },
    ],
    images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19', 'https://images.unsplash.com/photo-1583417319070-4a69db38a482'],
    includedServices: ['Khách sạn 4 sao', 'Xe đưa đón', 'Hướng dẫn viên', 'Bảo hiểm'],
    hotels: [],
  },
  {
    name: 'Tour Đà Nẵng - Hội An 4N3Đ',
    description: 'Khám phá thành phố đáng sống và phố cổ Hội An',
    destination: 'Đà Nẵng - Hội An',
    duration: '4 ngày 3 đêm',
    pricePerPerson: 5500000,
    itinerary: [
      {
        day: 1,
        activities: ['Bay đến Đà Nẵng', 'Check-in khách sạn', 'Tự do khám phá'],
      },
      {
        day: 2,
        activities: ['Tham quan Bà Nà Hills', 'Cầu Vàng', 'Chùa Linh Ứng'],
      },
      {
        day: 3,
        activities: ['Phố cổ Hội An', 'Chùa Cầu', 'Thả đèn lồng'],
      },
      {
        day: 4,
        activities: ['Tham quan Ngũ Hành Sơn', 'Mua sắm', 'Bay về'],
      },
    ],
    images: ['https://images.unsplash.com/photo-1583417319070-4a69db38a482', 'https://images.unsplash.com/photo-1578271887552-5ac3a72752bc'],
    includedServices: ['Khách sạn 5 sao', 'Vé máy bay', 'Xe đưa đón', 'HDV'],
    hotels: [],
  },
  {
    name: 'Tour Phú Quốc 4N3Đ',
    description: 'Nghỉ dưỡng tại đảo ngọc Phú Quốc',
    destination: 'Phú Quốc',
    duration: '4 ngày 3 đêm',
    pricePerPerson: 6800000,
    itinerary: [
      {
        day: 1,
        activities: ['Bay đến Phú Quốc', 'Check-in resort', 'Tắm biển'],
      },
      {
        day: 2,
        activities: ['Tour 4 đảo', 'Lặn ngắm san hô', 'Câu cá'],
      },
      {
        day: 3,
        activities: ['VinWonders', 'Safari', 'Grand World'],
      },
      {
        day: 4,
        activities: ['Tự do nghỉ dưỡng', 'Bay về'],
      },
    ],
    images: ['https://images.unsplash.com/photo-1589394815804-964ed0be2eb5', 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b'],
    includedServices: ['Resort 5 sao', 'Vé máy bay', 'Tour 4 đảo', 'HDV'],
    hotels: [],
  },
  {
    name: 'Tour Sài Gòn - Mũi Né 3N2Đ',
    description: 'Khám phá đồi cát và biển Mũi Né',
    destination: 'Mũi Né - Phan Thiết',
    duration: '3 ngày 2 đêm',
    pricePerPerson: 3200000,
    itinerary: [
      {
        day: 1,
        activities: ['Khởi hành từ Sài Gòn', 'Check-in resort', 'Tắm biển'],
      },
      {
        day: 2,
        activities: ['Đồi cát bay', 'Suối tiên', 'Chùa Vạn Thạnh Tú'],
      },
      {
        day: 3,
        activities: ['Tự do tắm biển', 'Về Sài Gòn'],
      },
    ],
    images: ['https://images.unsplash.com/photo-1510414842594-a61c69b5ae57', 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a'],
    includedServices: ['Resort 4 sao', 'Xe đưa đón', 'HDV', 'Bữa sáng'],
    hotels: [],
  },
  {
    name: 'Tour Hà Nội - Hạ Long 3N2Đ',
    description: 'Khám phá thủ đô và vịnh Hạ Long',
    destination: 'Hà Nội - Hạ Long',
    duration: '3 ngày 2 đêm',
    pricePerPerson: 5200000,
    itinerary: [
      {
        day: 1,
        activities: ['Bay đến Hà Nội', 'Tham quan Văn Miếu', 'Phố cổ'],
      },
      {
        day: 2,
        activities: ['Du thuyền vịnh Hạ Long', 'Hang Sửng Sốt', 'Kayaking'],
      },
      {
        day: 3,
        activities: ['Chợ Đồng Xuân', 'Mua sắm', 'Bay về'],
      },
    ],
    images: ['https://images.unsplash.com/photo-1528127269322-539801943592', 'https://images.unsplash.com/photo-1601899643780-c5c52fbfb1b8'],
    includedServices: ['Khách sạn 4 sao', 'Du thuyền', 'Vé máy bay', 'HDV'],
    hotels: [],
  },
  {
    name: 'Tour Sapa 3N2Đ',
    description: 'Khám phá miền núi phía Bắc',
    destination: 'Sapa - Lào Cai',
    duration: '3 ngày 2 đêm',
    pricePerPerson: 4200000,
    itinerary: [
      {
        day: 1,
        activities: ['Xe đêm từ Hà Nội', 'Đến Sapa sáng sớm', 'Tham quan thị trấn'],
      },
      {
        day: 2,
        activities: ['Fansipan', 'Cáp treo', 'Bản Cát Cát'],
      },
      {
        day: 3,
        activities: ['Thác Bạc', 'Mua sắm', 'Xe về Hà Nội'],
      },
    ],
    images: ['https://images.unsplash.com/photo-1583417319070-4a69db38a482', 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9'],
    includedServices: ['Khách sạn 3 sao', 'Xe giường nằm', 'HDV', 'Bảo hiểm'],
    hotels: [],
  },
  {
    name: 'Tour Đà Lạt 3N2Đ',
    description: 'Khám phá thành phố ngàn hoa',
    destination: 'Đà Lạt',
    duration: '3 ngày 2 đêm',
    pricePerPerson: 3800000,
    itinerary: [
      {
        day: 1,
        activities: ['Bay đến Đà Lạt', 'Hồ Xuân Hương', 'Chợ đêm'],
      },
      {
        day: 2,
        activities: ['Thác Datanla', 'Ga Đà Lạt', 'Làng Cù Lần'],
      },
      {
        day: 3,
        activities: ['Vườn hoa', 'Mua sắm đặc sản', 'Bay về'],
      },
    ],
    images: ['https://images.unsplash.com/photo-1583417319070-4a69db38a482', 'https://images.unsplash.com/photo-1605555948034-0372a7d2b0a0'],
    includedServices: ['Khách sạn 4 sao', 'Vé máy bay', 'Xe đưa đón', 'HDV'],
    hotels: [],
  },
  {
    name: 'Tour Quy Nhơn 3N2Đ',
    description: 'Nghỉ dưỡng tại biển Quy Nhơn',
    destination: 'Quy Nhơn - Bình Định',
    duration: '3 ngày 2 đêm',
    pricePerPerson: 4000000,
    itinerary: [
      {
        day: 1,
        activities: ['Bay đến Quy Nhơn', 'Check-in resort', 'Tắm biển'],
      },
      {
        day: 2,
        activities: ['Kỳ Co - Eo Gió', 'Ghềnh Ráng', 'Tháp Đôi'],
      },
      {
        day: 3,
        activities: ['Tự do nghỉ dưỡng', 'Bay về'],
      },
    ],
    images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4'],
    includedServices: ['Resort 4 sao', 'Vé máy bay', 'Xe đưa đón', 'HDV'],
    hotels: [],
  },
  {
    name: 'Tour Côn Đảo 3N2Đ',
    description: 'Khám phá đảo thiên đường Côn Đảo',
    destination: 'Côn Đảo',
    duration: '3 ngày 2 đêm',
    pricePerPerson: 7500000,
    itinerary: [
      {
        day: 1,
        activities: ['Bay đến Côn Đảo', 'Check-in resort', 'Tắm biển'],
      },
      {
        day: 2,
        activities: ['Lặn ngắm san hô', 'Đảo Bảy Cạnh', 'Nhà tù Côn Đảo'],
      },
      {
        day: 3,
        activities: ['Nghĩa trang Hàng Dương', 'Bay về'],
      },
    ],
    images: ['https://images.unsplash.com/photo-1559827260-dc66d52bef19', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5'],
    includedServices: ['Resort 5 sao', 'Vé máy bay', 'Tour lặn biển', 'HDV'],
    hotels: [],
  },
  {
    name: 'Tour Ninh Bình 2N1Đ',
    description: 'Khám phá non nước Ninh Bình',
    destination: 'Ninh Bình',
    duration: '2 ngày 1 đêm',
    pricePerPerson: 2500000,
    itinerary: [
      {
        day: 1,
        activities: ['Khởi hành từ Hà Nội', 'Tràng An', 'Bái Đính'],
      },
      {
        day: 2,
        activities: ['Tam Cốc', 'Hang Múa', 'Về Hà Nội'],
      },
    ],
    images: ['https://images.unsplash.com/photo-1583417319070-4a69db38a482', 'https://images.unsplash.com/photo-1528127269322-539801943592'],
    includedServices: ['Khách sạn 3 sao', 'Xe đưa đón', 'HDV', 'Bữa sáng'],
    hotels: [],
  },
];

// Hàm seed dữ liệu
const seedData = async () => {
  try {
    console.log('🌱 Bắt đầu seed dữ liệu...');

    // Xóa dữ liệu cũ
    console.log('🗑️  Xóa dữ liệu cũ...');
    await User.deleteMany({});
    await Hotel.deleteMany({});
    await Tour.deleteMany({});
    await Service.deleteMany({});
    await Booking.deleteMany({});
    await Review.deleteMany({});
    await Notification.deleteMany({});

    // Hash password cho users
    console.log('👤 Tạo users...');
    const hashedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await bcrypt.hash(user.password, 8),
      }))
    );
    const createdUsers = await User.insertMany(hashedUsers);
    console.log(`✅ Đã tạo ${createdUsers.length} users`);

    // Tạo hotels
    console.log('🏨 Tạo hotels...');
    const createdHotels = await Hotel.insertMany(hotels);
    console.log(`✅ Đã tạo ${createdHotels.length} hotels`);

    // Tạo services
    console.log('🎯 Tạo services...');
    const createdServices = await Service.insertMany(services);
    console.log(`✅ Đã tạo ${createdServices.length} services`);

    // Cập nhật tours với hotel IDs
    console.log('🗺️  Tạo tours...');
    const toursWithHotels = tours.map((tour, index) => ({
      ...tour,
      hotels: [createdHotels[index]._id],
    }));
    const createdTours = await Tour.insertMany(toursWithHotels);
    console.log(`✅ Đã tạo ${createdTours.length} tours`);

    // Tạo bookings
    console.log('📅 Tạo bookings...');
    const bookings = [];
    for (let i = 0; i < 10; i++) {
      const user = createdUsers[i % createdUsers.length];
      const tour = createdTours[i % createdTours.length];
      const hotel = createdHotels[i % createdHotels.length];
      const selectedServices = [
        createdServices[i % createdServices.length]._id,
        createdServices[(i + 1) % createdServices.length]._id,
      ];

      const startDate = new Date(2024, 11, i + 1); // Tháng 12/2024
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 3);

      const numberOfPeople = Math.floor(Math.random() * 4) + 1;
      const totalPrice = tour.pricePerPerson * numberOfPeople + hotel.pricePerNight * 3;

      bookings.push({
        userId: user._id,
        tourId: tour._id,
        hotelId: hotel._id,
        services: selectedServices,
        numberOfPeople,
        startDate,
        endDate,
        totalPrice,
        status: ['pending', 'confirmed', 'completed'][i % 3],
        paymentStatus: ['paid', 'unpaid'][i % 2],
      });
    }
    const createdBookings = await Booking.insertMany(bookings);
    console.log(`✅ Đã tạo ${createdBookings.length} bookings`);

    // Tạo reviews
    console.log('⭐ Tạo reviews...');
    const reviews = [];
    for (let i = 0; i < 10; i++) {
      const user = createdUsers[i % createdUsers.length];
      const targetType = i % 2 === 0 ? 'tour' : 'hotel';
      const targetId = targetType === 'tour' ? createdTours[i % createdTours.length]._id : createdHotels[i % createdHotels.length]._id;

      reviews.push({
        userId: user._id,
        targetType,
        targetId,
        rating: Math.floor(Math.random() * 2) + 4, // 4-5 sao
        comment: [
          'Tuyệt vời, rất đáng để trải nghiệm!',
          'Dịch vụ tốt, nhân viên nhiệt tình.',
          'Cảnh đẹp, không gian thoáng mát.',
          'Giá hơi cao nhưng chất lượng xứng đáng.',
          'Rất hài lòng, sẽ quay lại lần sau.',
        ][i % 5],
      });
    }
    const createdReviews = await Review.insertMany(reviews);
    console.log(`✅ Đã tạo ${createdReviews.length} reviews`);

    // Tạo notifications
    console.log('🔔 Tạo notifications...');
    const notifications = [];
    for (let i = 0; i < 10; i++) {
      const user = createdUsers[i % createdUsers.length];
      const booking = createdBookings[i % createdBookings.length];

      notifications.push({
        userId: user._id,
        type: ['booking', 'system', 'promotion', 'reminder'][i % 4],
        title: [
          'Đặt tour thành công',
          'Thông báo hệ thống',
          'Khuyến mãi đặc biệt',
          'Nhắc nhở chuyến đi',
        ][i % 4],
        message: [
          `Bạn đã đặt tour ${createdTours[i % createdTours.length].name} thành công`,
          'Hệ thống sẽ bảo trì vào 2h sáng ngày mai',
          'Giảm giá 20% cho tour mùa hè',
          `Chuyến đi của bạn sẽ bắt đầu vào ${booking.startDate.toLocaleDateString('vi-VN')}`,
        ][i % 4],
        relatedId: booking._id,
        relatedType: 'booking',
        isRead: i % 3 === 0,
        priority: ['low', 'normal', 'high'][i % 3],
        data: {
          bookingId: booking._id,
          tourName: createdTours[i % createdTours.length].name,
        },
      });
    }
    const createdNotifications = await Notification.insertMany(notifications);
    console.log(`✅ Đã tạo ${createdNotifications.length} notifications`);

    console.log('');
    console.log('🎉 Seed dữ liệu thành công!');
    console.log('📊 Tổng kết:');
    console.log(`   - Users: ${createdUsers.length}`);
    console.log(`   - Hotels: ${createdHotels.length}`);
    console.log(`   - Tours: ${createdTours.length}`);
    console.log(`   - Services: ${createdServices.length}`);
    console.log(`   - Bookings: ${createdBookings.length}`);
    console.log(`   - Reviews: ${createdReviews.length}`);
    console.log(`   - Notifications: ${createdNotifications.length}`);
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Lỗi khi seed dữ liệu:', error);
    process.exit(1);
  }
};

// Chạy seed
seedData();
