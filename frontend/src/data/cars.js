import AlpineWhite from "../assets/images/Alpine White.jpg";
import alpineWhite from "../assets/images/II Alpine white.jpg";
import OxideGrey from "../assets/images/II OxideGrey.jpg";
import RoyalBrown from "../assets/images/II Royal Brown.jpg";

import alpinewhite from "../assets/images/III AlpineWhite.jpg";
import DravitGrey from "../assets/images/III Dravit Grey.jpg";
import EmeraldGreen from "../assets/images/III Emerald Green.jpg";
import TorontoRed from "../assets/images/III TorontoRed.jpg";

import BlackSapphire from "../assets/images/IV BlackSapphire.jpg";
import SaoPauloYellow from "../assets/images/IV Sao paulo yellow.jpg";

import MarinaBayBlue from "../assets/images/MarinaBayBlue.jpg";
import SapphireBlack from "../assets/images/Sapphire Black.jpg";

import ArcticGrey from "../assets/images/V arctic grey.jpg";
import Blue from "../assets/images/v Blue.jpg";
import Orange from "../assets/images/V Orange.jpg";

import marinabayblue from "../assets/images/VI MarinaBayBlue.jpg";
import pink from "../assets/images/VI Pink.jpg";
import PistolBlack from "../assets/images/VI PistolBlack.jpg";


export const STOCK_CARS = [

  {
    id: "m8",
    name: "BMW M8 Competition Coupe",
    model: "M8.glb",
    basePrice: "₹2,44,00,000",
    tagline: "Luxury Performance Coupe",

    thumbnail: AlpineWhite,

    colors: {
      AlpineWhite: AlpineWhite,
      SapphireBlack: SapphireBlack,
      MarinaBayBlue: MarinaBayBlue,
    },

    wheels: [
      "20 Star-Spoke",
      "20 Jet Black",
    ],
  },


  {
    id: "i7",
    name: "BMW i7",
    model: "BMW i7.glb",
    basePrice: "₹2,13,00,000",
    tagline: "Electric Luxury Sedan",

    thumbnail: alpineWhite,

    colors: {
      AlpineWhite: alpineWhite,
      RoyalBrown: RoyalBrown,
      OxideGrey: OxideGrey,
    },

    wheels: [
      "21 Aero",
      "21 Titanium",
    ],
  },


  {
    id: "xm",
    name: "BMW XM",
    model: "BMW XM.glb",
    basePrice: "₹2,60,00,000",
    tagline: "Luxury Performance SUV",

    thumbnail: alpinewhite,

    colors: {
      AlpineWhite: alpinewhite,
      DravitGrey: DravitGrey,
      TorontoRed: TorontoRed,
    },

    wheels: [
      "22 Alloy",
      "23 Gold",
    ],
  },


  {
    id: "m4",
    name: "BMW M4",
    model: "M4.glb",
    basePrice: "₹1,56,00,000",
    tagline: "Motorsport Coupe",

    thumbnail: EmeraldGreen,

    colors: {
      EmeraldGreen: EmeraldGreen,
      SaoPauloYellow: SaoPauloYellow,
      BlackSapphire: BlackSapphire,
    },

    wheels: [
      "19 M Sport",
      "20 Forged",
    ],
  },


  {
    id: "ix",
    name: "BMW iX",
    model: "BMW iX.glb",
    basePrice: "₹1,40,00,000",
    tagline: "Electric SUV",

    thumbnail: ArcticGrey,

    colors: {
      ArcticGrey: ArcticGrey,
      MineralBlue: Blue,
      StormOrange: Orange,
    },

    wheels: [
      "21 Aero",
      "22 Sport",
    ],
  },


  {
    id: "m5",
    name: "BMW M5",
    model: "BMW M5.glb",
    basePrice: "₹1,99,00,000",
    tagline: "Luxury Performance Sedan",

    thumbnail: PistolBlack,

    colors: {
      PistolBlack: PistolBlack,
      MarinaBayBlue: marinabayblue,
      PinkMelody: pink,
    },

    wheels: [
      "20 Alloy",
      "20 Forged",
    ],
  },

];