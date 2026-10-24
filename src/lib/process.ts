import heroOrganics from "@/assets/hero-organics.jpg";
import heroHandicraft from "@/assets/hero-handicraft.jpg";
import heroDairy from "@/assets/hero-dairy.jpg";
import heroFishery from "@/assets/hero-fishery.jpg";
import beeFrame from "@/assets/p-bee-frame.jpg";
import beeExtract from "@/assets/p-bee-extract.jpg";
import beeJar from "@/assets/K-Hive Raw Honey Still Life.png";
import oilSeeds from "@/assets/p-oil-seeds.jpg";
import oilPress from "@/assets/p-oil-press.jpg";
import oilDrip from "@/assets/p-oil-drip.jpg";
import giftCrate from "@/assets/Kinikh Rustic Wellness Gift Crate.png";
import loom from "@/assets/p-craft-loom.jpg";
import cane from "@/assets/p-craft-cane.jpg";
import wool from "@/assets/p-craft-wool.jpg";
import wood from "@/assets/p-craft-wood.jpg";
import milk from "@/assets/p-dairy-milk.jpg";
import cans from "@/assets/p-dairy-cans.jpg";
import bilona from "@/assets/p-dairy-bilona.jpg";
import paneer from "@/assets/p-dairy-paneer.jpg";
import fishNet from "@/assets/p-fish-net.jpg";
import fishLive from "@/assets/p-fish-live.jpg";
import type { Step } from "@/components/ProcessSteps";

export const beeSteps: Step[] = [
  { title: "Hives in the hills", text: "Wooden bee boxes sit in flowering hillside fields, away from sprays and roads.", image: heroOrganics, alt: "Beekeeper in a veil lifting a honey frame beside wooden bee boxes on a Himalayan hillside" },
  { title: "Full frames", text: "Beekeepers check each frame and take only what the colony can spare.", image: beeFrame, alt: "Honeycomb frame full of capped golden honey with bees" },
  { title: "Gentle extraction", text: "Honey is spun out by hand and strained through cloth, never heated.", image: beeExtract, alt: "Honey flowing from a hand extractor into a steel vessel" },
  { title: "Into glass jars", text: "Raw honey is poured straight into clean glass jars.", image: beeJar, alt: "K-Hive raw honey jar with honeycomb and a wooden dipper" },
];

export const oilSteps: Step[] = [
  { title: "Raw seeds", text: "Mustard, groundnut and sesame from nearby farms are cleaned and sun-dried.", image: oilSeeds, alt: "Baskets of mustard seeds, groundnuts and sesame seeds" },
  { title: "Slow pressing", text: "A wooden kolhu turns slowly so the seeds never get hot.", image: oilPress, alt: "Traditional wooden kolhu oil press crushing mustard seeds in a village" },
  { title: "Fresh oil", text: "Oil drips out on its own and rests for days to settle.", image: oilDrip, alt: "Fresh cold-pressed oil dripping from a wooden spout into a brass bowl" },
  { title: "Bottled in glass", text: "Settled oil is filtered through cloth and filled into glass bottles.", image: giftCrate, alt: "Kinikh rustic wellness gift crate" },
];

export const craftSteps: Step[] = [
  { title: "Loom weaving", text: "Women weavers of the Northeast make stoles and runners on traditional looms.", image: loom, alt: "Northeast Indian woman weaving colourful fabric on a wooden loom" },
  { title: "Bamboo and cane", text: "Bamboo and cane are split by hand into thin, even strips.", image: cane, alt: "Artisan's hands splitting bamboo and cane strips" },
  { title: "Ringal baskets", text: "Pahadi artisans weave ringal, a slender hill bamboo, into baskets and boxes.", image: heroHandicraft, alt: "Hands of an Uttarakhand artisan weaving a ringal bamboo basket" },
  { title: "Wool and wood", text: "Shawls are spun and woven at home, and bowls are carved from single blocks of wood.", image: wool, alt: "Pahadi woman spinning wool beside folded handwoven shawls" },
];
export const craftExtra = wood;

export const dairySteps: Step[] = [
  { title: "Open pastures", text: "Desi cows graze freely on green village pastures.", image: heroDairy, alt: "Cows grazing in a green village pasture at golden hour" },
  { title: "Clean milking", text: "Milking is done by hand into clean steel buckets.", image: milk, alt: "Farmer hand-milking a cow into a steel bucket" },
  { title: "Fresh milk", text: "Milk is collected in steel cans the same morning.", image: cans, alt: "Fresh milk in steel cans in a village courtyard" },
  { title: "Bilona churning", text: "Curd is churned with a wooden bilona to make butter and ghee.", image: bilona, alt: "Woman churning curd in a clay pot with a wooden bilona" },
  { title: "Paneer and curd", text: "Paneer and curd are made fresh in small batches.", image: paneer, alt: "Fresh paneer and curd in clay bowls" },
];

export const fisherySteps: Step[] = [
  { title: "Clean ponds", text: "Wide freshwater ponds in open countryside.", image: heroFishery, alt: "Freshwater fish ponds at sunrise with a farmer casting a net" },
  { title: "Netted by hand", text: "Fish farmers net fish only when an order comes in.", image: fishNet, alt: "Two fish farmers pulling a net in a freshwater pond" },
  { title: "Always alive", text: "Fish stay alive in clean water until they reach you.", image: fishLive, alt: "Live freshwater fish swimming in clear pond water" },
];
