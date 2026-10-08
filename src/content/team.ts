import { links } from "./site";

export type TeamGroup = "doctors" | "providers" | "office" | "technicians";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  group: TeamGroup;
  bio: string | null;
  photo: string | null;
  /** CSS object-position for photos where the person isn't centred. */
  focus?: string;
  badge?: "cat-friendly";
  link?: { label: string; href: string };
};

export const teamGroups: { key: TeamGroup; label: string }[] = [
  { key: "doctors", label: "Doctors" },
  { key: "providers", label: "Providers" },
  { key: "office", label: "Office" },
  { key: "technicians", label: "Technicians" },
];

const photo = (id: string) => `/images/team/${id}.jpg`;

export const team: TeamMember[] = [
  {
    id: "kristin-varner-maslar",
    name: "Kristin Varner-Maslar, DVM",
    role: "Co-owner & Medical Director",
    group: "doctors",
    photo: photo("kristin-varner-maslar"),
    bio: "Co-owns FVC with her husband, Patrick Maslar, who runs the business side; they’ve owned it since May 2002. Born and raised in Waterloo, Iowa, she earned her DVM and BS from Iowa State University in May 1991. She moved to Maryland to work with horses and practiced mainly equine medicine for 3 years before switching to small animals. Mother of Joseph and Charlotte. She enjoys horses, riding, hiking, biking, water sports, and reading, and shares life with 2 dogs and 3 horses.",
  },
  {
    id: "jodi-edwards",
    name: "Jodi Edwards, DVM",
    role: "Cat Friendly Veterinarian (AAFP)",
    group: "doctors",
    photo: photo("jodi-edwards"),
    badge: "cat-friendly",
    bio: "Born and raised in Knoxville, Tennessee, at the foot of the Great Smoky Mountains. She graduated from the University of Tennessee College of Veterinary Medicine in 2003. Her interests are lifelong preventive care and geriatric medicine. She loves all her patients but is especially drawn to cats, “especially the old grumpy ones.” She enjoys running, cooking, hiking, camping, and kayaking. She and her wife are “owned by eight cats.”",
  },
  { id: "heather-hendler", name: "Heather Hendler, VMD", role: "Veterinarian", group: "doctors", photo: photo("heather-hendler"), bio: null },
  { id: "carrie-begin-guter", name: "Carrie Begin-Guter, DVM", role: "Veterinarian", group: "doctors", photo: photo("carrie-begin-guter"), bio: null },
  { id: "jacquelin-koenig", name: "Jacquelin Koenig, DVM", role: "Veterinarian", group: "doctors", photo: photo("jacquelin-koenig"), bio: null, focus: "75% 30%" },
  {
    id: "marcie-baer",
    name: "Marcie Baer",
    role: "Holistics: acupuncture & herbal treatments",
    group: "providers",
    photo: photo("marcie-baer"),
    bio: "Master’s from the Traditional Acupuncture Institute (Columbia, MD); she later took over Cyrie Barnes’ human and animal acupuncture practice in Columbia. Training in Chinese and American herbs, homeopathy, NAET allergy elimination, animal acupuncture, and biomeridian testing. Magna Cum Laude graduate of Elmira College (triple major) with pre-med/vet requirements. She has owned, bred, and trained Labrador Retrievers since 1970 and is an AKC Judge for Hunting Retriever Events.",
    link: { label: "Holistic Wellness and Acupuncture", href: links.marcieBaer },
  },
  { id: "alyssa-carman", name: "Alyssa Carman", role: "Office Manager", group: "office", photo: null, bio: null },
  {
    id: "sharon-hughes",
    name: "Sharon Hughes",
    role: "Receptionist",
    group: "office",
    photo: photo("sharon-hughes"),
    bio: "With the clinic since 1993. Mother of 4 sons and a grandmother, she shares her home with her husband and a very spoiled pit bull named Sage. An avid teddy bear collector who enjoys interacting with clients; her pet health knowledge and customer service are an asset to the clinic.",
  },
  { id: "eileen-cord", name: "Eileen Cord", role: "Receptionist", group: "office", photo: photo("eileen-cord"), bio: null },
  { id: "casey-kiser", name: "Casey Kiser", role: "Receptionist", group: "office", photo: null, bio: null },
  { id: "sara-roman", name: "Sara Roman", role: "Technician/Receptionist", group: "technicians", photo: photo("sara-roman"), bio: null },
  {
    id: "eve-laurange",
    name: "Eve Laurange",
    role: "Technician",
    group: "technicians",
    photo: photo("eve-laurange"),
    bio: "Our most senior employee: a technician since 1984 and at FVC since 1991. You’ll most often find her drawing blood, bathing dogs and cats, assisting in surgery and dental procedures, doing nail trims, or showering love on hospitalized pets. She pet sits in her off time, and shares her home with dogs Summer and Tiki, a cat named Clarence who came to FVC as a stray, and her husband, Daryl.",
  },
  {
    id: "debi-persing",
    name: "Debi Persing",
    role: "Technician",
    group: "technicians",
    photo: photo("debi-persing"),
    bio: "A vet tech since 1991 who previously worked with Dr. Varner for several years; at FVC since April 2003. Experience with exotic pets and animal eye care. She and her husband volunteer for Greyhound Pets of America, and she shares her life with a greyhound, 5 Boston terriers, and 2 birds.",
  },
  { id: "bliss-bohuslav", name: "Bliss Bohuslav", role: "Technician", group: "technicians", photo: photo("bliss-bohuslav"), bio: null },
  { id: "ashley-thompson", name: "Ashley Thompson", role: "Technician-Inventory", group: "technicians", photo: photo("ashley-thompson"), bio: null, focus: "20% 50%" },
  { id: "jamila-hewitt", name: "Jamila Hewitt", role: "Technician", group: "technicians", photo: null, bio: null },
  { id: "nadia-khan", name: "Nadia Khan", role: "Technician", group: "technicians", photo: photo("nadia-khan"), bio: null },
  { id: "kenna-contee", name: "Kenna Contee", role: "Technician", group: "technicians", photo: photo("kenna-contee"), bio: null },
  { id: "katie-arnold", name: "Katie Arnold", role: "Technician", group: "technicians", photo: null, bio: null },
  { id: "tristan-johnson", name: "Tristan Johnson", role: "Technician", group: "technicians", photo: null, bio: null },
  { id: "natalie-reitz", name: "Natalie Reitz", role: "Technician", group: "technicians", photo: null, bio: null },
];
