export const productsData = [
  { 
  //  id: "MAVERICK-001",
    Img1: [
        {
          "publicId": "IMG_4074_2_i0u7ds",
          "size": 1000
        }
    ],

    Img2: [
        {
          "publicId": "IMG_4113_2_hgg2ta",
          "size": 1000
        }],
    productName: "Maverick Batik Pant",
    desc: "Made with Adire Batik with a line of Pink like aso oke.",
    features: [
      "100% Adire crepe, Midi length with full gathers.",
      "Adjustable tie-back detail with peekaboo cutout.",
      "Padded bust(No bra needed.", 
      "Concealed zipper on the side."],

    material: "100% Cotton Ghana Batik",
    sizes: "(M-XXL)",
    price: 25000,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { 
  //  id: "CELO-002",
    Img1: [
        {
          "publicId": "image00032_kpqkuj",
          "size": 1000
        }
    ],

    Img2: [
        {
          "publicId": "image00072_brmslx",
          "size": 1000
        }],
    productName: "Cleo dress",
    desc: "100% hand-dyed Adire Crepe short midi flaired dress",
    features: [
      "Midi length with a flared hem.",
      "Unique asymmetrical neckline.",
      "Back zipper closure."
    ],

    material: "100% Adire cotton",
    sizes: "(M-XXL)",
    price: 35000,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { 
  //  id: "LYRA-003",
    Img1: [
        {
          "publicId": "image00030_xcmudx",
          "size": 1000
        }
    ],
    Img2: [
        {
          "publicId": "image00076_wkqchy",
          "size": 1000
        }],
    productName: "Lyra Set",
    desc: "Relaxed fit shirt with front buttons and piping available in blue, orange, wine.",
    features: [
      "Go classic with the shirt and matching shorts",
      "Keep it chill with the shirt and long trousers.",
       "Full 3-piece (shirt, shorts, and trousers).",

      "OPTIONS AVAILABLE",
  
      "2-piece: Shirt + Shorts",
      "2-piece: Shirt + Long Trousers",
      "3-piece: Shirt + Shorts + Long Trousers"
    ],

    material: "100% Cotton Ghana Batik",
    sizes: "(M-XXL)",
    price: 45000,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  { 
  //  id: "IRIS-004",
    Img1: [
        {
          "publicId": "image00069_gqdbuw",
          "size": 1000
        }
    ],

    Img2: [
        {
          "publicId": "image00033_phqpyo",
          "size": 1000
        }],
    productName: "Iris Dress",
    desc: "Fit-and-flare silhouette, dainty straps, and a statement open cutout and tie detail.",
    features: [
      "100% Adire crepe, midi length with full gathers.",
      "Padded bust(No bra needed).",
      "Adjustable tie-back detail with peekaboo cutout.", 
      "Concealed zipper on the side."
    ],

    material: "100% Cotton Ghana Batik",
    sizes: "(M-XXL)",
    price: 20000,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },  
  },

  {    
  //  id: "MAIA-005",
    Img1: [
      {
        "publicId": "image00052_jqfl3e",
        "size": 1000
      }
    ],
    Img2: [{
        "publicId": "image00050_icusf5",
        "size": 1000
      }],
    productName: "Maia Set",
    desc: "100% Adire cotton 2 piece set long-sleeve bishop colar shirt and trousers",
    features: [
      "Adjustable side drawstring shirt.",
      "Relaxed fit trousers with side pockets.",
      "Made from 100% locally hand-dyed Adire cotton.", 
      "2 piece set long-sleeve bishop colar shirt and trousers."],

    material: "100% Adire cotton",
    sizes: "(M-XXL)",
    price: 35000,
    userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    },
  },

  { 
   id: "ELAN-006",
    Img1: [
      {
        "publicId": "image00013_zatsb0",
        "size": 1000
      }],
    Img2: [{
        "publicId": "image00009_x8nicr",
        "size": 1000
      }],
    
    productName: "Elan Linen shirt",
    desc: "Available in biewge, black, white and orange.",
    features: [
      "Adjustable sleeve: full length or 3/4 with tab.",
      "Fine pleated detailing",
      "Mandarin collar"
    ],
    material: "100% linen",
    sizes: "(M-XXL)",
    price: 25000,
  },

  { 
  //  id: "ADE-007",
    Img1: [{
        "publicId": "image00011_gwdlce",
        "size": 1000
      }],
    Img2: [{
        "publicId": "image00014_lclgeb",
        "size": 1000
      }],
    productName: "Ade pants",
    desc: "Slim-straight fit made with Adire Batik with a line of Pink like aso oke.",
    features: [
      "Slim-straight fit.",
      "Side Aso Oke detailing (contrast strip).",
      "Functional side pockets.", 
      "Clean waistband lined with aso oke."
    ],

    material: "100% Ghana Batik, hand-crafted",
    sizes: "(M-XXL)",
    price: 40000,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
  //  id: "ELAN-008",
    Img1: [{
        "publicId": "image00025_omlkze",
        "size": 1000
      }],
    Img2: [{
        "publicId": "image00022_wk3slu",
        "size": 1000
      }],

    productName: "Elan Linen shirt",
    desc: "Crafted from premium white linen, Designed with a soft collar, hidden button placket.",
    features: [
      "Hidden front button placket.",
      "Soft collar with neat tailoring.",
      "Lightweight, relaxed fit.", 
      "Available in biege, black, white and orange",
      "Adjustable sleeve: full length or 3/4 with tab",
      "Fine pleated detailing",
      "Mandarin collar"
    ],
    material: "100% Linen",
    sizes: "(M-XXL)",
    price: 30000,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },

  {
  //  id: "IKEMBA-009",
    Img1: [{
        "publicId": "image00025_omlkze",
        "size": 1000
      }],
    Img2: [{
        "publicId": "image00022_wk3slu",
        "size": 1000
      }],

    productName: "Ikemba Adire Linen Pant",
    desc: "Hand dyed 100% batik linen pant.",
    features: [
      "Available in Blue and Green.",
      "Straight-leg fit.",
      "Lightweight, relaxed fit.", 
      "Slit detail at the hem",
      "Side pockets ",
      "Zip and hook closure",
    ],
    material: "100% linen Adire (hand-dyed)",
    sizes: "(M-XXL)",
    price: 30000,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
]