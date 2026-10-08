export const clinic = {
  name: "Family Veterinary Clinic",
  founded: 1982,
  street: "1413 Defense Hwy #100",
  city: "Gambrills",
  region: "MD",
  postalCode: "21054",
  phone: "(410) 721-4545",
  phoneHref: "tel:+14107214545",
  email: "info@familyveterinaryclinic.com",
  areas: ["Crofton", "Gambrills", "Bowie", "Millersville", "Odenton", "Waugh Chapel"],
  geo: { lat: 38.991528, lng: -76.67714 },
};

const OLD = "https://www.familyveterinaryclinic.com";

export const links = {
  appointment: "https://local.demandforce.com/b/familyveterinaryclinic/schedule?widget=1",
  pharmacy: "https://www.myvetstoreonline.pharmacy/shop/LogonForm?catalogId=10101&storeId=10152&langId=-1",
  refill: `${OLD}/rx-refill.pml`,
  newClient: `${OLD}/new-client.pml`,
  changeOfAddress: `${OLD}/change-of-address.pml`,
  files: `${OLD}/files-pdf-or-other.pml`,
  feedback: `${OLD}/client-feedback.pml`,
  googleReviews:
    "https://www.google.com/search?q=Family%20Veterinary%20Clinic&ludocid=5744733075061700981&lrd=0x89b7ee5cdd465ae5:0x4fb9644b7c7d7975,2,5",
  leaveReview:
    "https://www.google.com/search?q=Family%20Veterinary%20Clinic&ludocid=5744733075061700981&lrd=0x89b7ee5cdd465ae5:0x4fb9644b7c7d7975,3",
  facebook: "https://www.facebook.com/FamilyVeterinaryClinic/",
  instagram: "https://www.instagram.com/familyvetclinic/",
  marcieBaer: "https://www.marciebaeracupuncture.com/animal-acupuncture/",
  catFriendly: "https://catvets.com/cfp/cat-friendly-certificate-program/",
  secondChance: "https://www.secondchanceinc.org/",
  arundelFire: "https://www.arundelfire.com/",
  virtualTour:
    "https://www.google.com/maps/embed?pb=!4v1518124397568!6m8!1m7!1sp3GXQuwqJM6624EBBhgl5Q!2m2!1d38.99183175599558!2d-76.6773309482727!3f151.83!4f-42.08!5f0.4000000000000002",
  map: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12404.169717278982!2d-76.67714!3d38.991528!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7ee5cdcf13f55%3A0xdbcdae410793188!2s1413+Defense+Hwy%2C+Gambrills%2C+MD+21054!5e0!3m2!1sen!2sus!4v1518128005912",
  directions: "https://www.google.com/maps/dir/?api=1&destination=1413+Defense+Hwy+%23100+Gambrills+MD+21054",
};

export const emergencyClinic = {
  name: "Anne Arundel Emergency Veterinary Clinic",
  address: "808 Bestgate Rd., Annapolis",
  phone: "(410) 224-0331",
  phoneHref: "tel:+14102240331",
};

export const nav = [
  { label: "About", href: "/#welcome" },
  { label: "Services", href: "/#services" },
  { label: "Team", href: "/#team" },
  { label: "Hours", href: "/#hours" },
  { label: "Resources", href: "/#resources" },
  { label: "Contact", href: "/#contact" },
];

export const trustItems = [
  "Full-service animal hospital",
  "Medical, surgical & dental care",
  "Full in-house lab",
  "Dedicated dental suite",
  "Digital radiology",
  "Cat Friendly Veterinarian (AAFP)",
  "Military, senior & multi-pet discounts",
];

export const timeline = [
  {
    marker: "1982",
    title: "A clinic attached to a home",
    body: "Dr. Linda DeChambeau and Dr. Seth Koch establish Family Veterinary Clinic. The name came from the practice being attached to their home, very much a part of their family life. That spirit shaped the clinic: a place where people and their pets feel at home, reflecting the larger family of humans and animals.",
  },
  {
    marker: "A personal touch",
    title: "Partners in your pet’s health",
    body: "As technology accelerated, the clinic focused on reaching out to pet owners, to inform and educate them and become partners in their pets’ health.",
  },
  {
    marker: "May 2002",
    title: "A new family, the same name",
    body: "Dr. Kristin Varner and her husband, Patrick Maslar, take over from the founders and keep the name, because it reflects the values they wished to continue.",
  },
  {
    marker: "New building",
    title: "Same name, new building",
    body: "The old building wasn’t sent to a landfill. It was donated to Second Chance of Baltimore, a nonprofit deconstruction and materials retailer whose mantra is Retrain, Reclaim, Renew, providing career training to people who need a second chance. The Anne Arundel Volunteer Fire Department used it on February 13th for a day of hands-on training: smoke drills, search and rescue, and ventilation techniques. Second Chance then completed the deconstruction.",
    closing: "Maybe even a piece of her will show up under paws again.",
  },
];

export type ServiceKey = "exams" | "vaccines" | "spay" | "nutrition";

export const petCare = {
  cats: {
    label: "Cats",
    heading: "Care for cats",
    body: [
      "Just like us, cats need continual check-ups to stay strong and healthy. Cats in the Crofton area need immunizations and regular vet visits to maintain optimal health. Services include exams, microchipping, and dental care.",
      "No two cats are alike, so we tailor our recommendations to your cat’s lifestyle and the Crofton area, and build a preventive care plan for your individual pet.",
    ],
    image: { src: "/images/cat-with-train.jpg", alt: "A black-and-white tuxedo cat resting beside a toy train set" },
  },
  dogs: {
    label: "Dogs",
    heading: "Care for dogs",
    body: [
      "Regular annual visits are vital to the health of your furry family member. We work with you to recommend the best preventive care for your “other children.” Dogs need immunizations and regular health screenings, and as they get older they may need specialized care.",
      "No two dogs are alike, so we create an individualized plan just for them.",
    ],
    image: { src: "/images/girl-with-dog.jpg", alt: "A young girl hugging a senior brown dog on a rug" },
  },
} as const;

export const petServices: { key: ServiceKey; label: string }[] = [
  { key: "exams", label: "Exams" },
  { key: "vaccines", label: "Vaccines" },
  { key: "spay", label: "Spay/Neuter" },
  { key: "nutrition", label: "Nutrition" },
];

export const moreServices = [
  {
    icon: "pulse",
    title: "Sick & Injured Care / Emergencies",
    body: "Certain illnesses may require sick care or hospitalization. We provide heated kennels when necessary, an isolation area when needed, and visitation during your pet’s stay.",
  },
  {
    icon: "xray",
    title: "Digital Radiology",
    body: "Digital X-rays produce high-resolution images in seconds, reducing waiting times and helping our veterinarians reach an accurate diagnosis.",
  },
  {
    icon: "surgery",
    title: "Surgical Care & Services",
    body: "Spays, neuters, mass removals, eye surgeries and more, performed in our state-of-the-art facility with heated recovery cages.",
  },
  {
    icon: "leaf",
    title: "Holistic Wellness & Acupuncture",
    body: "Acupuncture and herbal treatments with Marcie Baer.",
    href: links.marcieBaer,
    cta: "Holistic Wellness and Acupuncture",
  },
] as const;

export const clinicPhotos = [
  { src: "/images/waiting-room.jpg", alt: "The clinic’s warm waiting room with a dog sitting in a leather armchair", w: 1500, h: 1001 },
  { src: "/images/exam-room.jpg", alt: "A veterinarian listening to a Boston terrier’s heart in an exam room", w: 515, h: 460 },
  { src: "/images/cat-with-train.jpg", alt: "A tuxedo cat curled up beside a holiday train set", w: 1500, h: 1000 },
  { src: "/images/girl-with-dog.jpg", alt: "A young girl hugging a senior brown dog", w: 1024, h: 685 },
];

export const steps = [
  {
    title: "Request an appointment",
    body: "Request an appointment online or call (410) 721-4545.",
    action: { label: "Request online", href: links.appointment },
  },
  {
    title: "New client?",
    body: "Fill out the New Client form before your visit.",
    action: { label: "New Client form", href: links.newClient },
  },
  {
    title: "Need a drop-off?",
    body: "Drop-offs are 7:30–8:30am on weekdays. Please arrange in advance by calling reception.",
    action: { label: "Call reception", href: clinic.phoneHref },
  },
  {
    title: "Food & medication orders",
    body: "Call ahead with enough notice, and we’ll have your order ready when you arrive.",
    action: { label: "Request a refill", href: links.refill },
  },
];

/** Day index follows Date#getDay(): 0 = Sunday. Times are minutes after midnight, America/New_York. */
export type HoursRow = {
  days: number[];
  label: string;
  dropOff?: string;
  surgery?: string;
  appointments?: string[];
  closed?: boolean;
};

export const hours: HoursRow[] = [
  { days: [1], label: "Monday", dropOff: "7:30–8:30am", appointments: ["9:00am–1:30pm", "2:00–6:30pm"] },
  { days: [2], label: "Tuesday", dropOff: "7:30–8:30am", surgery: "9:00am", appointments: ["9:00am–1:30pm", "2:00–6:30pm"] },
  { days: [3], label: "Wednesday", dropOff: "7:30–8:30am", appointments: ["9:00am–1:30pm", "2:00–6:30pm"] },
  { days: [4], label: "Thursday", dropOff: "7:30–8:30am", surgery: "9:00am", appointments: ["9:00am–1:30pm", "2:00–6:30pm"] },
  { days: [5], label: "Friday", dropOff: "7:30–8:30am", appointments: ["9:00am–1:30pm", "2:00–6:30pm"] },
  { days: [6], label: "Saturday", appointments: ["8:00am–1:00pm"] },
  { days: [0], label: "Sunday", closed: true },
];

/** Open windows used for the “Open now” badge: from first drop-off to last appointment. */
export const openWindows: Record<number, [number, number] | null> = {
  0: null,
  1: [7 * 60 + 30, 18 * 60 + 30],
  2: [7 * 60 + 30, 18 * 60 + 30],
  3: [7 * 60 + 30, 18 * 60 + 30],
  4: [7 * 60 + 30, 18 * 60 + 30],
  5: [7 * 60 + 30, 18 * 60 + 30],
  6: [8 * 60, 13 * 60],
};

export const phoneLines = "Phone lines: 8:00am–7:00pm Monday–Friday, 8:00am–1:30pm Saturday.";

export const whyUs = [
  "Family-owned since 1982",
  "Wellness, prevention & sick care",
  "Medical, surgical & dental",
  "Full in-house lab & digital radiology",
  "Dedicated dental suite & heated recovery",
  "Cat Friendly Veterinarian",
  "Acupuncture & holistic options",
  "Saturday appointments",
  "Military, senior & multi-pet discounts",
];

export const forms = [
  { title: "New Client", body: "Fill this out before your first visit.", href: links.newClient },
  { title: "Product Refill", body: "Request a refill of food or medication.", href: links.refill },
  { title: "Change of Address", body: "Keep your contact details up to date.", href: links.changeOfAddress },
  { title: "Files (PDF or other)", body: "Send us records and documents.", href: links.files },
  { title: "Request Appointment", body: "Book online in a few clicks.", href: links.appointment },
  { title: "Client Feedback", body: "Tell us how we’re doing.", href: links.feedback },
];

export const faqs = [
  {
    q: "What are your hours?",
    a: "Weekdays: appointments 9:00am–1:30pm and 2:00–6:30pm, with weekday drop-offs from 7:30–8:30am. Saturday: 8:00am–1:00pm.",
  },
  {
    q: "What if my pet has an emergency after hours?",
    a: "Contact Anne Arundel Emergency Veterinary Clinic, 808 Bestgate Rd., Annapolis, (410) 224-0331.",
  },
  { q: "Can I drop off my pet?", a: "Yes, for exams and procedures. Please arrange in advance with reception." },
  { q: "Can I pre-order food or medication?", a: "Yes. Call ahead with enough notice and it’ll be ready when you arrive." },
  { q: "Do you offer discounts?", a: "Yes: military, senior, and multi-pet. Call for details." },
  { q: "Do you offer holistic care?", a: "Yes, acupuncture and herbal treatments with Marcie Baer." },
  {
    q: "Which areas do you serve?",
    a: "Crofton, Gambrills, Bowie, Millersville, Odenton, and Waugh Chapel.",
  },
];

/** Featured articles from the old homepage. Their source text was syndicated and isn’t on the old site any more. */
export const featuredArticles = [
  "Air Travel with Your Pets",
  "Financial Assistance for Veterinary Bills",
  "Barking Dogs",
  "Adverse Reactions to Spot-on Flea and Tick Products",
  "Ice or Ice Water Does Not Cause Bloat in Dogs",
  "Canine Influenza Expert Calls for Better Border Protection",
];

export const resourceLinks: { label: string; href: string | null; external?: boolean }[] = [
  { label: "Pet Food Recalls", href: "https://www.vin.com/recallcenter/default.aspx", external: true },
  { label: "How-To Videos", href: "/resources/how-to-videos" },
  { label: "Poisonous Plants", href: "/resources/poisonous-plants" },
  { label: "Pet Library", href: null },
  { label: "Pet Travel", href: "/resources/pet-travel" },
  { label: "Links", href: "/resources/links" },
  { label: "Local Businesses We Support", href: "/resources/local-businesses-we-support" },
  { label: "Giving Back", href: "/resources/giving-back" },
];
