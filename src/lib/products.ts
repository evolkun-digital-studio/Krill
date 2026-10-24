import mustard from "@/assets/prod-mustard-oil.jpg";
import groundnut from "@/assets/prod-groundnut-oil.jpg";
import sesame from "@/assets/prod-sesame-oil.jpg";
import coconut from "@/assets/prod-coconut-oil.jpg";
import forestHoney from "@/assets/prod-forest-honey.jpg";
import wildHoney from "@/assets/prod-wildflower-honey.jpg";
import jaggery from "@/assets/prod-jaggery.jpg";
import jaggeryPowder from "@/assets/prod-jaggery-powder.jpg";
import basket from "@/assets/prod-ringal-basket.jpg";
import shawl from "@/assets/prod-woollen-shawl.jpg";
import stole from "@/assets/prod-handloom-stole.jpg";
import box from "@/assets/prod-bamboo-box.jpg";
import tray from "@/assets/prod-cane-tray.jpg";
import bowl from "@/assets/prod-wooden-bowl.jpg";
import aipan from "@/assets/prod-aipan-plate.jpg";
import runner from "@/assets/prod-table-runner.jpg";
import ghee from "@/assets/prod-ghee.jpg";
import paneer from "@/assets/prod-paneer.jpg";
import curd from "@/assets/prod-curd.jpg";
import butter from "@/assets/prod-white-butter.jpg";
import khoa from "@/assets/prod-khoa.jpg";
import buttermilk from "@/assets/prod-buttermilk.jpg";

export type ShopService = "organics" | "handicraft" | "dairy";

export type Product = {
  slug: string;
  name: string;
  service: ShopService;
  short: string;
  description: string;
  image: string;
  sizes: string[];
  price: null;
  status: "sold_out" | "available";
};

export const NO_PALM_OIL_NOTE =
  "Contains no palm oil. Made in small batches, so we take orders on request.";

export const serviceNames: Record<ShopService, string> = {
  organics: "Kinikh Organics",
  handicraft: "Kinikh Handicraft",
  dairy: "Kinikh Dairy",
};

const p = (
  slug: string,
  name: string,
  service: ShopService,
  short: string,
  description: string,
  image: string,
  sizes: string[],
): Product => ({
  slug,
  name,
  service,
  short,
  description: service === "organics" ? `${description} ${NO_PALM_OIL_NOTE}` : description,
  image,
  sizes,
  price: null,
  status: "sold_out",
});

const oilSizes = ["500 ml", "1 litre", "5 litre"];
const honeySizes = ["250 g", "500 g", "1 kg"];

export const products: Product[] = [
  p("cold-pressed-mustard-oil", "Cold-Pressed Mustard Oil", "organics", "Sharp, golden kachi ghani oil pressed slowly from village mustard.", "Pressed in a wooden kolhu at low speed so the oil keeps its natural pungency and colour. Left to settle and filtered through cloth.", mustard, oilSizes),
  p("cold-pressed-groundnut-oil", "Cold-Pressed Groundnut Oil", "organics", "Mild, nutty oil for everyday cooking.", "Made from sun-dried groundnuts pressed without heat. Light in taste and good for daily cooking and frying.", groundnut, oilSizes),
  p("cold-pressed-sesame-oil", "Cold-Pressed Sesame Oil", "organics", "Warm, aromatic til oil for cooking and care.", "Pressed from clean white sesame seeds. Used in kitchens and for traditional oil massage.", sesame, oilSizes),
  p("cold-pressed-coconut-oil", "Cold-Pressed Coconut Oil", "organics", "Clear, gentle coconut oil from dried copra.", "Slowly pressed from dried coconut and settled naturally. Good for cooking, hair and skin.", coconut, oilSizes),
  p("raw-forest-honey", "Raw Forest Honey", "organics", "Dark, rich honey from wild forest flowers.", "Collected by hill beekeepers and strained gently. Never heated, so it may crystallise naturally in winter.", forestHoney, honeySizes),
  p("wild-flower-honey", "Wild Flower Honey", "organics", "Light, floral honey from mountain meadows.", "Gathered from hives placed in flowering hillside fields. Raw and unprocessed.", wildHoney, honeySizes),
  p("organic-jaggery", "Organic Jaggery", "organics", "Traditional gur made from farm sugarcane.", "Sugarcane juice boiled in open pans and set into blocks, with no chemicals added.", jaggery, ["500 g", "1 kg"]),
  p("jaggery-powder", "Jaggery Powder", "organics", "Easy-to-use powdered gur for tea and sweets.", "The same traditional jaggery, gently powdered so it dissolves easily.", jaggeryPowder, ["500 g", "1 kg"]),

  p("ringal-bamboo-basket", "Ringal Bamboo Basket", "handicraft", "Woven from hill bamboo by Uttarakhand artisans.", "Ringal is a slender bamboo that grows in the Himalayan forests. Each basket is split, shaped and woven by hand in mountain villages.", basket, ["Small", "Medium", "Large"]),
  p("pahadi-woollen-shawl", "Pahadi Woollen Shawl", "handicraft", "Soft, warm shawl spun and woven in the hills.", "Hand-spun wool woven on village looms in Uttarakhand. Simple borders in natural colours.", shawl, ["Standard"]),
  p("northeast-handloom-stole", "Northeast Handloom Stole", "handicraft", "Bright traditional weave from the Northeast.", "Woven on loin and frame looms by women weavers of the Northeast, with patterns passed down through families.", stole, ["Standard"]),
  p("bamboo-storage-box", "Bamboo Storage Box", "handicraft", "Sturdy woven box with a fitted lid.", "Hand-woven bamboo box for keeping grains, spices or small things. Light and long-lasting.", box, ["Small", "Medium"]),
  p("cane-decor-tray", "Cane Decor Tray", "handicraft", "Round cane tray with woven handles.", "Made from cane by Northeast artisans. Good for serving or as a table piece.", tray, ["Standard"]),
  p("hand-carved-wooden-bowl", "Hand-Carved Wooden Bowl", "handicraft", "Carved by hand with visible chisel marks.", "Carved from a single piece of wood by hill craftsmen and finished with natural oil.", bowl, ["Small", "Medium"]),
  p("aipan-art-wall-plate", "Aipan Art Wall Plate", "handicraft", "Kumaoni folk art painted by hand.", "Aipan is a traditional Kumaoni art of white patterns on red ochre. Each plate is painted by hand.", aipan, ["8 inch", "12 inch"]),
  p("handwoven-table-runner", "Handwoven Table Runner", "handicraft", "Cotton runner in warm, earthy stripes.", "Woven on handlooms in cotton yarn, finished with hand-tied tassels.", runner, ["Standard"]),

  p("desi-cow-ghee-bilona", "Desi Cow Ghee (Bilona)", "dairy", "Grainy, aromatic ghee made the bilona way.", "Curd is churned by hand into butter, then slowly heated into ghee. Made from the milk of village desi cows.", ghee, ["250 ml", "500 ml", "1 litre"]),
  p("fresh-paneer", "Fresh Paneer", "dairy", "Soft paneer made the same morning.", "Made from fresh village milk and pressed in muslin cloth.", paneer, ["250 g", "500 g", "1 kg"]),
  p("fresh-curd", "Fresh Curd", "dairy", "Thick curd set in clay pots.", "Set overnight from whole milk in clay pots for a thick, mild curd.", curd, ["500 g", "1 kg"]),
  p("white-butter", "White Butter", "dairy", "Fresh makhan churned from curd.", "Unsalted white butter churned by hand from homemade curd.", butter, ["250 g", "500 g"]),
  p("khoa", "Khoa", "dairy", "Slow-cooked milk solids for sweets.", "Whole milk cooked slowly in an iron kadhai until thick. Used for traditional sweets.", khoa, ["250 g", "500 g", "1 kg"]),
  p("buttermilk", "Buttermilk", "dairy", "Light, cooling chaas with a hint of spice.", "Churned from curd with water, salt and roasted cumin.", buttermilk, ["500 ml", "1 litre"]),
];

export const getProduct = (slug: string) => products.find((x) => x.slug === slug);
export const productsByService = (s: ShopService) => products.filter((x) => x.service === s);
export const featuredProducts = [
  "raw-forest-honey",
  "cold-pressed-mustard-oil",
  "ringal-bamboo-basket",
  "desi-cow-ghee-bilona",
  "northeast-handloom-stole",
  "wild-flower-honey",
  "aipan-art-wall-plate",
  "fresh-paneer",
].map((s) => getProduct(s)!);
