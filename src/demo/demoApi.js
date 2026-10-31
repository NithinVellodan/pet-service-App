/**
 * Presentation mode. Every API call is answered locally so the app
 * can be shown without the backend.
 */

const IMG = {
    dog: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=80',
    puppy: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=900&q=80',
    golden: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&w=900&q=80',
    cat: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=80',
    cat2: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80',
    play: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=900&q=80',
    food: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=900&q=80',
    toy: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=900&q=80',
    bed: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=80',
    banner: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1400&q=80',
    banner2: 'https://images.unsplash.com/photo-1444212477490-ca407925329e?auto=format&fit=crop&w=1400&q=80',
    person: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    person2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    trainer: 'https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=crop&w=900&q=80',
    stay: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=900&q=80',
    icon: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?auto=format&fit=crop&w=120&q=80',
};

export const DEMO_PROFILE = {
    accessToken: 'demo-token',
    name: 'Layla Hassan',
    profileName: 'Layla Hassan',
    mailId: 'layla.hassan@petme.demo',
    profileMail: 'layla.hassan@petme.demo',
    phone: '+971 50 123 4567',
    profilePhone: '+971 50 123 4567',
    photo: IMG.person,
    role: 'customer',
    cart_count: 2,
    isPetDetailsAdded: true,
    isVerified: true,
    locationAdded: true,
    geoAddressText: 'Dubai Marina, Dubai',
    exactLocation: {latitude: 25.0805, longitude: 55.1403},
    firebaseUid: 'demo-user',
    store_add: true,
    store_name: 'Paw & Co.',
    trainer_add: true,
    user: {id: 'demo-user', name: 'Layla Hassan'},
};

const STAYS = [
    ['Palm Pet Stay', 'A calm villa stay with a private garden and daily walks.', 180, IMG.stay, 'Palm Jumeirah'],
    ['Marina Paws', 'Sea-view boarding with playtime and evening feeding.', 140, IMG.play, 'Dubai Marina'],
    ['Desert Kennels', 'Spacious runs, air-conditioned rooms, and a trainer on site.', 95, IMG.golden, 'Al Barsha'],
    ['Jumeirah Home', 'A family home stay for one or two small pets.', 120, IMG.puppy, 'Jumeirah'],
];

const PETS = [
    ['Milo', 'Golden Retriever', 'Friendly, leash-trained, and happy around children.', 90, IMG.golden],
    ['Luna', 'British Shorthair', 'Quiet indoor cat who loves a sunny window.', 70, IMG.cat],
    ['Coco', 'Cocker Spaniel', 'Playful puppy, great for a weekend borrow.', 85, IMG.puppy],
    ['Nala', 'Siamese', 'Affectionate and used to apartment living.', 75, IMG.cat2],
];

const PRODUCTS = [
    ['Salmon Kibble 2kg', 'Grain-free daily food for adult dogs.', 89, 110, IMG.food],
    ['Rope Tug Toy', 'Cotton rope toy for fetch and tug.', 35, 48, IMG.toy],
    ['Orthopedic Bed', 'Washable bed for medium breeds.', 220, 280, IMG.bed],
    ['Cat Teaser Wand', 'Feather wand for indoor play.', 25, 32, IMG.cat],
];

const TRAINERS = [
    ['Omar Farid', 'Puppy manners and leash walking in Dubai Marina.', IMG.trainer, 'Dubai Marina'],
    ['Sara Rahman', 'Home visits for anxious dogs and basic obedience.', IMG.person, 'Jumeirah'],
    ['Noah James', 'Agility sessions for energetic breeds.', IMG.play, 'Al Quoz'],
];

const provider = {
    id: 'provider-1',
    name: 'Amina Khalid',
    email: 'amina@pawstay.demo',
    phone: '+971 55 222 3344',
    image: IMG.person2,
};

const review = (id, name, text, rating) => ({
    id,
    rating,
    review: text,
    date_updated: '2026-10-12T09:00:00',
    customer_details: {id, name, image: name === 'Layla Hassan' ? IMG.person : IMG.person2},
});

const gallery = images => images.map((image, index) => ({id: `g-${index}`, image}));

const petDetailRow = (id, name, price) => ({
    id,
    name,
    price_per_day: price,
    food_price: 15,
    no_of_pets: 2,
    remarks: 'Includes two walks and an evening meal.',
});

const locationData = (label, lat, lng) => ({
    location: label,
    latitude: lat,
    longitude: lng,
});

const stayDetail = index => {
    const [title, description, price, image, area] = STAYS[index % STAYS.length];
    return {
        id: `stay-${index + 1}`,
        title,
        name: title,
        description,
        about_services:
            'Daily walks, feeding on your schedule, and photo updates every evening.',
        image,
        price,
        price_per_day: price,
        average_rating: 4.8,
        location: `${area}, Dubai`,
        location_name: `${area}, Dubai`,
        location_data: locationData(`${area}, Dubai`, 25.08 + index * 0.01, 55.14 + index * 0.01),
        shareable_link: 'https://petme.demo/stay',
        gallery: gallery([image, IMG.play, IMG.puppy]),
        pet_details: [
            petDetailRow(`pet-type-${index}-dog`, 'Dog', price),
            petDetailRow(`pet-type-${index}-cat`, 'Cat', price - 20),
        ],
        facilities: [
            {id: 'f1', title: 'Air conditioning', icon: IMG.icon},
            {id: 'f2', title: 'Daily walks', icon: IMG.icon},
            {id: 'f3', title: 'Photo updates', icon: IMG.icon},
            {id: 'f4', title: 'Fenced garden', icon: IMG.icon},
        ],
        provider_details: provider,
        reviews: [
            review('r1', 'Layla Hassan', 'Milo came home happy and well walked.', 5),
            review('r2', 'Hassan Ali', 'Clear updates and a very calm house.', 4),
        ],
        is_in_wishlist: false,
    };
};

const petDetail = index => {
    const [name, breed, description, price, image] = PETS[index % PETS.length];
    return {
        id: `pet-${index + 1}`,
        name,
        title: name,
        pet_breed: breed,
        breed,
        description,
        color: index % 2 ? 'Cream' : 'Golden',
        weight: index % 2 ? '4 kg' : '28 kg',
        age: index % 2 ? '1 year' : '3 years',
        response: 'Comes when called and sits on request.',
        like: 'Tennis balls, belly rubs, and car rides.',
        worst_habit: 'Steals socks if they are left on the floor.',
        image,
        price,
        price_per_day: price,
        average_rating: 4.6,
        location: 'Dubai Marina, Dubai',
        location_name: 'Dubai Marina, Dubai',
        location_data: locationData('Dubai Marina, Dubai', 25.0805, 55.1403),
        shareable_link: 'https://petme.demo/pet',
        gallery: gallery([image, IMG.play]),
        pet_characteristics: ['Friendly', 'House trained', 'Good with kids'],
        provider_details: provider,
        reviews: [review('r3', 'Noor Ahmed', `${name} was gentle with our children.`, 5)],
        is_in_wishlist: false,
    };
};

const productDetail = index => {
    const [name, description, offer, original, image] = PRODUCTS[index % PRODUCTS.length];
    return {
        id: `product-${index + 1}`,
        name,
        title: name,
        product_name: name,
        product_title: name,
        description,
        image,
        offer_price: offer,
        original_price: original,
        final_price: offer,
        price: offer,
        rating: 4.7,
        offer: `${Math.round((1 - offer / original) * 100)}% off`,
        is_enabled: true,
        is_in_cart: false,
        is_in_wishlist: false,
        quantity: 1,
        start_date_and_time: '2026-11-01T09:00:00',
        end_date_and_time: '2026-11-07T21:00:00',
        gallery: gallery([image, IMG.food]),
        sizes: [
            {id: 's1', name: 'Small', price: offer},
            {id: 's2', name: 'Large', price: offer + 20},
        ],
        all_variants: [
            {id: 'v1', name: 'Regular', price: offer},
            {id: 'v2', name: 'Bundle of 2', price: offer * 2 - 10},
        ],
        provider_details: {...provider, name: 'Paw & Co.'},
        similar_products: PRODUCTS.filter((_, i) => i !== index % PRODUCTS.length).map(
            (row, i) => ({
                id: `similar-${i}`,
                name: row[0],
                image: row[4],
                offer_price: row[2],
                rating: 4.5,
                description: row[1],
            }),
        ),
        reviews: [review('r4', 'Mariam Saleh', 'Our dog finished the bag in a week.', 5)],
    };
};

const listing = (kind, index) => {
    if (kind === 'pet') {
        const pet = petDetail(index);
        return {...pet, title: pet.pet_breed, description: pet.description};
    }
    if (kind === 'product') {
        return productDetail(index);
    }
    if (kind === 'trainer') {
        const [name, description, image, area] = TRAINERS[index % TRAINERS.length];
        return {
            id: `trainer-${index + 1}`,
            name,
            title: name,
            description,
            image,
            location: `${area}, Dubai`,
            average_rating: 4.9,
            price: 200,
            price_per_day: 200,
            is_in_wishlist: false,
        };
    }
    if (kind === 'booking') {
        const stay = stayDetail(index);
        return {
            ...stay,
            start_date: '2026-11-04',
            end_date: '2026-11-08',
            stay_status: index % 2 ? 'ongoing' : 'accepted',
            booking_status: index % 2 ? 'ongoing' : 'accepted',
            pet_name: PETS[index % PETS.length][0],
            breed: PETS[index % PETS.length][1],
            age: '2 years',
            no_of_pending_bookings: 1,
            items_count: 1,
            quantity: 1,
        };
    }
    if (kind === 'order') {
        const product = productDetail(index);
        return {
            ...product,
            id: `order-${index + 1}`,
            status: index === 0 ? 'Confirmed' : 'Delivered',
            order_status: 'confirmed',
            items_count: 2,
            quantity: 1,
            total: product.offer_price,
            created_at: '2026-10-18T12:00:00',
        };
    }
    if (kind === 'notification') {
        const messages = [
            'Your stay at Palm Pet Stay is confirmed for 4–8 Nov.',
            'Omar Farid accepted your training session.',
            'Luna is ready to be collected this evening.',
            'Paw & Co. shipped your Salmon Kibble order.',
        ];
        return {
            id: `note-${index + 1}`,
            title: 'PetMe',
            message: messages[index % messages.length],
            image: [IMG.stay, IMG.trainer, IMG.cat, IMG.food][index % 4],
            is_read: false,
            created_at: '2026-10-28T08:30:00',
        };
    }
    if (kind === 'lost') {
        const pet = petDetail(index);
        return {
            ...pet,
            title: `Missing: ${pet.name}`,
            status: 'Lost',
            last_seen: 'Dubai Marina Walk',
        };
    }
    return stayDetail(index);
};

// Every item carries the array/object fields screens tend to read, so a
// partial demo item never leaves a field undefined.
const baseShape = {
    gallery: [],
    reviews: [],
    pet_details: [],
    pet_characteristics: [],
    facilities: [],
    similar_products: [],
    all_variants: [],
    sizes: [],
    services: [],
    provider_details: provider,
    location_data: locationData('Dubai, UAE', 25.2048, 55.2708),
    is_in_wishlist: false,
    is_in_cart: false,
};

const withBase = item => ({...baseShape, ...item});

const repeat = (kind, count = 4) =>
    Array.from({length: count}, (_, index) => withBase(listing(kind, index)));

const walletHistory = [
    {
        id: 'w1',
        transaction_type: 'credit',
        amount: 250,
        payment_datetime: '2026-10-21T14:10:00',
        transaction_id: 'PT10482',
        name: 'Refund',
    },
    {
        id: 'w2',
        transaction_type: 'debit',
        amount: 180,
        payment_datetime: '2026-10-18T09:40:00',
        transaction_id: 'PT10411',
        name: 'Stay booking',
    },
    {
        id: 'w3',
        transaction_type: 'debit',
        amount: 89,
        payment_datetime: '2026-10-11T16:05:00',
        transaction_id: 'PT10390',
        name: 'Shop order',
    },
];

const categories = [
    {id: 'cat-dog', name: 'Dog', title: 'Dog', image: IMG.golden},
    {id: 'cat-cat', name: 'Cat', title: 'Cat', image: IMG.cat},
    {id: 'cat-bird', name: 'Bird', title: 'Bird', image: IMG.play},
    {id: 'cat-rabbit', name: 'Rabbit', title: 'Rabbit', image: IMG.puppy},
];

const named = (prefix, names) =>
    names.map((name, index) => ({id: `${prefix}-${index + 1}`, name, title: name}));

const DATE_RANGE = {
    start_date: '2026-01-01',
    end_date: '2026-12-31',
    availability: true,
};

const availabilityObject = {
    availability: true,
    available_date_ranges: [DATE_RANGE],
};

function kindFor(path) {
    if (/borrow|my-pet|pet-wishlist|lost/.test(path)) {
        return 'pet';
    }
    if (/trainer/.test(path)) {
        return 'trainer';
    }
    if (/product|offer|cart|shop|store|donat|inventor/.test(path)) {
        return 'product';
    }
    if (/booking/.test(path)) {
        return 'booking';
    }
    if (/order/.test(path)) {
        return 'order';
    }
    if (/notification/.test(path)) {
        return 'notification';
    }
    return 'stay';
}

function isSingle(path) {
    return /single|view-profile|wallet\/?$|my-pet\/|checkout|check-out|order-detail/.test(
        path,
    );
}

function payloadFor(path, method) {
    if (method !== 'get') {
        if (/check-stay-availability/.test(path)) {
            return {StatusCode: 6000, data: availabilityObject};
        }
        if (/check-pet-availability/.test(path)) {
            return {StatusCode: 6000, data: [DATE_RANGE]};
        }
        if (/check-trainer-availability/.test(path)) {
            return {StatusCode: 6000, available_date_ranges: [DATE_RANGE], data: [DATE_RANGE]};
        }
        return {
            StatusCode: 6000,
            message: 'Saved',
            data: {id: 'demo-1'},
            cart_count: 2,
        };
    }

    if (/view-profile/.test(path)) {
        return {
            StatusCode: 6000,
            data: {
                name: DEMO_PROFILE.name,
                phone: DEMO_PROFILE.phone,
                email: DEMO_PROFILE.mailId,
                image: DEMO_PROFILE.photo,
            },
        };
    }
    if (/wallet/.test(path)) {
        return {
            StatusCode: 6000,
            data: {coins: 1280, wallet_history: walletHistory},
        };
    }
    if (/banner/.test(path)) {
        return {
            StatusCode: 6000,
            data: [
                {id: 'b1', image: IMG.banner},
                {id: 'b2', image: IMG.banner2},
                {id: 'b3', image: IMG.play},
            ],
        };
    }
    if (/get-pet-types|get-pet-by-category|pet-categor|get-product-categories/.test(path)) {
        return {StatusCode: 6000, data: categories};
    }
    if (/get-breeds/.test(path)) {
        return {
            StatusCode: 6000,
            data: named('breed', ['Golden Retriever', 'British Shorthair', 'Cocker Spaniel', 'Siamese']),
        };
    }
    if (/age-group/.test(path)) {
        return {StatusCode: 6000, data: named('age', ['Puppy', 'Adult', 'Senior'])};
    }
    if (/characteristic/.test(path)) {
        return {
            StatusCode: 6000,
            data: named('trait', ['Friendly', 'House trained', 'Good with kids', 'Calm']),
        };
    }
    if (/medical/.test(path)) {
        return {StatusCode: 6000, data: named('med', ['Vaccinated', 'Neutered', 'No conditions'])};
    }
    if (/get-services|services/.test(path) && !/single/.test(path)) {
        return {
            StatusCode: 6000,
            data: named('service', ['Obedience', 'Puppy class', 'Home visit', 'Agility']),
        };
    }
    if (/address/.test(path)) {
        return {
            StatusCode: 6000,
            data: [
                {
                    id: 'addr-1',
                    name: 'Layla Hassan',
                    phone: DEMO_PROFILE.phone,
                    address: 'Marina Gate 2, Apt 1204',
                    city: 'Dubai',
                    area: 'Dubai Marina',
                    is_default: true,
                },
                {
                    id: 'addr-2',
                    name: 'Layla Hassan',
                    phone: DEMO_PROFILE.phone,
                    address: 'Al Wasl Road, Villa 18',
                    city: 'Dubai',
                    area: 'Jumeirah',
                    is_default: false,
                },
            ],
        };
    }
    if (/list-cards|saved-card|cards/.test(path)) {
        return {
            StatusCode: 6000,
            data: [
                {id: 'card-1', brand: 'Visa', last4: '4242', name: 'Layla Hassan'},
                {id: 'card-2', brand: 'Mastercard', last4: '4444', name: 'Layla Hassan'},
            ],
        };
    }
    if (/trainers-wishlist/.test(path)) {
        return {
            StatusCode: 6000,
            data: repeat('trainer', 3).map(trainer => ({
                id: trainer.id,
                trainer_details: trainer,
            })),
        };
    }
    if (/check-out/.test(path)) {
        return {
            StatusCode: 6000,
            data: repeat('product', 2),
            cart_count: 2,
            price_details: {
                total: 124,
                sub_total: 124,
                delivery_charge: 0,
            },
            address: {
                id: 'addr-1',
                name: 'Layla Hassan',
                phone: DEMO_PROFILE.phone,
                address: 'Marina Gate 2, Apt 1204',
                city: 'Dubai',
            },
        };
    }
    if (/cart-items-count/.test(path)) {
        return {StatusCode: 6000, cart_count: 2, data: {cart_count: 2}};
    }
    if (/cart/.test(path)) {
        return {StatusCode: 6000, data: repeat('product', 2), cart_count: 2};
    }
    if (/store-single/.test(path)) {
        return {
            StatusCode: 6000,
            data: {
                id: 'store-1',
                name: 'Paw & Co.',
                title: 'Paw & Co.',
                description: 'Food, beds, and toys delivered across Dubai.',
                image: IMG.food,
                location: 'Dubai Marina',
                rating: 4.8,
            },
            products: repeat('product', 4),
            donated_products: repeat('product', 2),
        };
    }
    if (/product-single|donated-product-single/.test(path)) {
        return {StatusCode: 6000, data: withBase(productDetail(0))};
    }
    if (/trainer/.test(path) && isSingle(path)) {
        const trainer = listing('trainer', 0);
        return {
            StatusCode: 6000,
            data: {
                ...trainer,
                about: trainer.description,
                gallery: gallery([trainer.image, IMG.play]),
                services: named('service', ['Obedience', 'Puppy class', 'Home visit']),
                reviews: [review('r5', 'Layla Hassan', 'Clear, patient, and on time.', 5)],
                provider_details: {...provider, name: trainer.name, image: trainer.image},
                location_data: locationData(trainer.location, 25.09, 55.15),
                price_per_day: 200,
            },
        };
    }
    if (/borrow|my-pet\//.test(path) && isSingle(path)) {
        return {StatusCode: 6000, data: withBase(petDetail(0))};
    }
    if (/booking-single/.test(path)) {
        return {StatusCode: 6000, data: withBase(listing('booking', 0))};
    }
    if (isSingle(path)) {
        return {StatusCode: 6000, data: withBase(stayDetail(0))};
    }
    if (/review/.test(path)) {
        return {
            StatusCode: 6000,
            data: [
                review('r1', 'Layla Hassan', 'Milo came home happy and well walked.', 5),
                review('r2', 'Hassan Ali', 'Clear updates and a very calm house.', 4),
            ],
        };
    }

    return {StatusCode: 6000, data: repeat(kindFor(path)), cart_count: 2};
}

function demoAdapter(config) {
    const path = `${config.baseURL || ''}${config.url || ''}`.split('?')[0].toLowerCase();
    const method = (config.method || 'get').toLowerCase();
    const data = payloadFor(path, method);
    return Promise.resolve({
        data,
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
    });
}

export function installDemoApi(instances) {
    instances.forEach(instance => {
        instance.defaults.adapter = demoAdapter;
    });

    if (global.__petmeDemoFetch) {
        return;
    }
    const originalFetch = global.fetch.bind(global);
    global.fetch = (input, init) => {
        const href = typeof input === 'string' ? input : input?.url || '';
        if (href.includes('/api/v1/')) {
            const body = payloadFor(href.toLowerCase(), (init?.method || 'GET').toLowerCase());
            return Promise.resolve({
                ok: true,
                status: 200,
                json: () => Promise.resolve(body),
                text: () => Promise.resolve(JSON.stringify(body)),
            });
        }
        return originalFetch(input, init);
    };
    global.__petmeDemoFetch = true;
}
