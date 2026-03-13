import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { products } from "../src/db/schema";

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  console.log("🌱 Seeding database...");

  // Create the products table
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      description TEXT NOT NULL,
      price NUMERIC(10, 2) NOT NULL,
      image TEXT NOT NULL,
      category TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT NOW() NOT NULL,
      updated_at TIMESTAMP DEFAULT NOW() NOT NULL
    )
  `;

  console.log("✅ Products table created");

  // Clear existing products
  await sql`DELETE FROM products`;

  // Seed Adidas products
  const adidasProducts = [
    {
      name: "Adidas Ultraboost 22",
      description:
        "Experience incredible energy return with the Adidas Ultraboost 22. Featuring responsive BOOST midsole cushioning and a Primeknit upper for a snug, supportive fit.",
      price: "190.00",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500",
      category: "Running",
      stock: 45,
    },
    {
      name: "Adidas Stan Smith",
      description:
        "The iconic Adidas Stan Smith sneaker. Clean, classic, and timeless with a smooth leather upper and signature perforated 3-Stripes.",
      price: "100.00",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500",
      category: "Lifestyle",
      stock: 120,
    },
    {
      name: "Adidas NMD_R1",
      description:
        "The Adidas NMD_R1 blends heritage style with modern tech. Built with BOOST cushioning and a stretchy knit upper for all-day comfort.",
      price: "150.00",
      image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=500",
      category: "Lifestyle",
      stock: 78,
    },
    {
      name: "Adidas Superstar",
      description:
        "Born on the basketball court, the Adidas Superstar has become a street-style icon. Features the classic rubber shell toe and leather upper.",
      price: "95.00",
      image: "https://images.unsplash.com/photo-1588361861040-ac9b1018f6d5?w=500",
      category: "Originals",
      stock: 200,
    },
    {
      name: "Adidas Forum Low",
      description:
        "The Adidas Forum Low brings 80s basketball heritage to the streets. Premium leather build with the iconic ankle strap detail.",
      price: "110.00",
      image: "https://images.unsplash.com/photo-1612902456551-404b5820afd7?w=500",
      category: "Originals",
      stock: 65,
    },
    {
      name: "Adidas Gazelle",
      description:
        "The Adidas Gazelle is a timeless sneaker with suede upper, contrast 3-Stripes, and a rubber outsole for everyday comfort and style.",
      price: "100.00",
      image: "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500",
      category: "Originals",
      stock: 90,
    },
    {
      name: "Adidas Samba OG",
      description:
        "Originally designed for indoor soccer, the Adidas Samba OG is a versatile classic with a soft leather upper and gum rubber outsole.",
      price: "120.00",
      image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=500",
      category: "Originals",
      stock: 55,
    },
    {
      name: "Adidas Terrex Free Hiker 2",
      description:
        "Conquer any trail with the Adidas Terrex Free Hiker 2. Featuring BOOST midsole, Continental rubber outsole, and a sock-like Primeknit upper.",
      price: "230.00",
      image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500",
      category: "Outdoor",
      stock: 30,
    },
    {
      name: "Adidas Predator Edge.1 FG",
      description:
        "Dominate the pitch with the Adidas Predator Edge.1. Designed for control and power with Zone Skin technology and a Facet Frame outsole.",
      price: "275.00",
      image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=500",
      category: "Soccer",
      stock: 40,
    },
    {
      name: "Adidas Adilette Comfort Slides",
      description:
        "Slip into comfort with Adidas Adilette Comfort Slides. Cloudfoam footbed provides plush cushioning for post-workout recovery or casual wear.",
      price: "35.00",
      image: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=500",
      category: "Slides",
      stock: 150,
    },
  ];

  await db.insert(products).values(adidasProducts);

  console.log(`✅ Seeded ${adidasProducts.length} Adidas products`);
  console.log("🎉 Seeding complete!");
}

seed().catch((error) => {
  console.error("❌ Seeding failed:", error);
  process.exit(1);
});
