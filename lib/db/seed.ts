import { randomUUID } from "crypto";

import { aiEmbed } from "@/lib/ai";
import { db } from "@/lib/db";
import { schema } from "@/lib/db/schemas";

async function seed() {
  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Big Stack Burger",
    description: "Triple beef patties with melted cheese, lettuce, and signature sauce.",
    price: 8.99,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Big Stack Burger`, `Description: Triple beef patties with melted cheese, lettuce, and signature sauce.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Crispy Chicken Wrap",
    description: "Fried chicken, lettuce, tomatoes, and ranch dressing in a flour tortilla.",
    price: 6.49,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Crispy Chicken Wrap`, `Description: Fried chicken, lettuce, tomatoes, and ranch dressing in a flour tortilla.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Double Cheese Melt",
    description: "Two beef patties, double cheese, pickles, onions, and ketchup.",
    price: 7.79,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Double Cheese Melt`, `Description: Two beef patties, double cheese, pickles, onions, and ketchup.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Bacon Ranch Fries",
    description: "French fries topped with bacon bits, ranch dressing, and shredded cheese.",
    price: 5.99,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Bacon Ranch Fries`, `Description: French fries topped with bacon bits, ranch dressing, and shredded cheese.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Spicy BBQ Wings",
    description: "Crispy chicken wings tossed in spicy barbecue sauce.",
    price: 9.49,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Spicy BBQ Wings`, `Description: Crispy chicken wings tossed in spicy barbecue sauce.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Veggie Supreme",
    description: "Grilled veggie patty, avocado, spinach, and tomato on a multigrain bun.",
    price: 7.29,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Veggie Supreme`, `Description: Grilled veggie patty, avocado, spinach, and tomato on a multigrain bun.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Ranch Chicken Bites",
    description: "Crunchy chicken bites with a creamy ranch dipping sauce.",
    price: 5.49,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Ranch Chicken Bites`, `Description: Crunchy chicken bites with a creamy ranch dipping sauce.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Ocean Fish Sandwich",
    description: "Breaded fish fillet with lettuce, cheese, and tartar sauce on a sesame bun.",
    price: 6.99,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Ocean Fish Sandwich`, `Description: Breaded fish fillet with lettuce, cheese, and tartar sauce on a sesame bun.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Cheddar Popcorn",
    description: "Bite-sized popcorn chicken with a cheddar cheese coating.",
    price: 4.99,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Cheddar Popcorn`, `Description: Bite-sized popcorn chicken with a cheddar cheese coating.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Jalapeño Slider",
    description: "Small burger with spicy jalapeños, pepper jack cheese, and chipotle mayo.",
    price: 3.99,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Jalapeño Slider`, `Description: Small burger with spicy jalapeños, pepper jack cheese, and chipotle mayo.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "BBQ Bacon Crunch",
    description: "Grilled beef patty, barbecue sauce, bacon, and crispy onion rings.",
    price: 8.49,
    // prettier-ignore
    embedding: await aiEmbed([`Name: BBQ Bacon Crunch`, `Description: Grilled beef patty, barbecue sauce, bacon, and crispy onion rings.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Cheese Bomb Bites",
    description: "Fried dough balls stuffed with gooey melted cheese.",
    price: 4.49,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Cheese Bomb Bites`, `Description: Fried dough balls stuffed with gooey melted cheese.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Mango Chili Wrap",
    description: "Sweet and spicy chicken with mango salsa and chili sauce in a tortilla.",
    price: 6.79,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Mango Chili Wrap`, `Description: Sweet and spicy chicken with mango salsa and chili sauce in a tortilla.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Breakfast Blaster",
    description: "Sausage, egg, and cheese wrapped in a flaky pastry.",
    price: 4.99,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Breakfast Blaster`, `Description: Sausage, egg, and cheese wrapped in a flaky pastry.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Nacho Fiesta Fries",
    description: "Fries loaded with melted cheese, jalapeños, and sour cream.",
    price: 5.79,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Nacho Fiesta Fries`, `Description: Fries loaded with melted cheese, jalapeños, and sour cream.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Truffle Melt Deluxe",
    description: "Beef patty with truffle aioli, caramelized onions, and Swiss cheese.",
    price: 9.99,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Truffle Melt Deluxe`, `Description: Beef patty with truffle aioli, caramelized onions, and Swiss cheese.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Sweet Heat Burger",
    description: "Burger with sweet chili sauce, pepper jack cheese, and pineapple slices.",
    price: 8.29,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Sweet Heat Burger`, `Description: Burger with sweet chili sauce, pepper jack cheese, and pineapple slices.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Classic Hot Dog",
    description: "Grilled hot dog with mustard, ketchup, and relish.",
    price: 4.49,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Classic Hot Dog`, `Description: Grilled hot dog with mustard, ketchup, and relish.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Buffalo Ranch Wrap",
    description: "Spicy buffalo chicken, lettuce, and ranch dressing in a soft tortilla.",
    price: 6.59,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Buffalo Ranch Wrap`, `Description: Spicy buffalo chicken, lettuce, and ranch dressing in a soft tortilla.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Chili Cheese Dog",
    description: "Hot dog smothered in chili and topped with shredded cheese.",
    price: 5.99,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Chili Cheese Dog`, `Description: Hot dog smothered in chili and topped with shredded cheese.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Honey Garlic Wings",
    description: "Wings coated in honey garlic sauce for a sweet-savory flavor.",
    price: 9.29,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Honey Garlic Wings`, `Description: Wings coated in honey garlic sauce for a sweet-savory flavor.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Double Bacon Smash",
    description: "Two patties, bacon, American cheese, and burger sauce.",
    price: 8.79,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Double Bacon Smash`, `Description: Two patties, bacon, American cheese, and burger sauce.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Crispy Onion Stack",
    description: "Thick-cut onion rings served with a tangy dipping sauce.",
    price: 4.29,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Crispy Onion Stack`, `Description: Thick-cut onion rings served with a tangy dipping sauce.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Sweet Potato Bites",
    description: "Seasoned sweet potato fries served with maple dipping sauce.",
    price: 4.99,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Sweet Potato Bites`, `Description: Seasoned sweet potato fries served with maple dipping sauce.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Strawberry Swirl",
    description: "Vanilla ice cream topped with strawberry syrup and whipped cream.",
    price: 3.99,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Strawberry Swirl`, `Description: Vanilla ice cream topped with strawberry syrup and whipped cream.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Cookie Sundae Blast",
    description: "Warm cookie pieces over vanilla ice cream with chocolate drizzle.",
    price: 5.29,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Cookie Sundae Blast`, `Description: Warm cookie pieces over vanilla ice cream with chocolate drizzle.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Berry Lemon Freeze",
    description: "Frozen lemonade with mixed berry syrup and crushed ice.",
    price: 2.99,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Berry Lemon Freeze`, `Description: Frozen lemonade with mixed berry syrup and crushed ice.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Classic Shake",
    description: "Thick milkshake available in chocolate, vanilla, or strawberry.",
    price: 3.49,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Classic Shake`, `Description: Thick milkshake available in chocolate, vanilla, or strawberry.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Cinnamon Churros",
    description: "Fried churros coated in cinnamon sugar with chocolate dipping sauce.",
    price: 4.79,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Cinnamon Churros`, `Description: Fried churros coated in cinnamon sugar with chocolate dipping sauce.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  await db.insert(schema.product).values({
    id: randomUUID(),
    name: "Deluxe Egg Muffin",
    description: "Egg, sausage, cheese, and tomato on an English muffin.",
    price: 5.59,
    // prettier-ignore
    embedding: await aiEmbed([`Name: Deluxe Egg Muffin`, `Description: Egg, sausage, cheese, and tomato on an English muffin.`].join("\n")),
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log("Database seeded successfully");
}

seed();
