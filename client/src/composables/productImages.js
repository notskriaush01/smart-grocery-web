/**
 * productImages.js
 * Single source of truth for product images across the app.
 *
 * Structure per entry:
 *   main  — shown on ProductCard and as the hero on ProductDetailView
 *   extra — 3 additional thumbnails shown only on ProductDetailView
 *
 * All URLs are Wikimedia Commons (stable, free, no API key needed).
 *
 * Usage:
 *   import { getProductImage, getProductImages } from '@/composables/productImages.js'
 *
 *   getProductImage('Bananas')        → main URL (string | null)
 *   getProductImages('Bananas')       → [main, extra1, extra2, extra3]
 */

const PRODUCT_IMAGES = {
  // ── FRESH FOOD ─────────────────────────────────────────────────────────────
  Apples: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/400px-Red_Apple.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Honeycrisp.jpg/400px-Honeycrisp.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Apple_slices.jpg/400px-Apple_slices.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/400px-Red_Apple.jpg',
    ],
  },
  Bananas: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/400px-Bananas_white_background_DS.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Bananas_white_background_DS.jpg/400px-Bananas_white_background_DS.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Chocolate-Chip-Cookies-Recipe.jpg/400px-Banana-Chocolate-Chip-Cookies-Recipe.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapus_Mango.jpg/400px-Hapus_Mango.jpg',
    ],
  },
  Oranges: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Oranges_and_orange_juice.jpg/400px-Oranges_and_orange_juice.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Orange-Fruit-Pieces.jpg/400px-Orange-Fruit-Pieces.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Oranges_and_orange_juice.jpg/400px-Oranges_and_orange_juice.jpg',
    ],
  },
  Pears: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Pears.jpg/400px-Pears.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Pears_on_a_branch.jpg/400px-Pears_on_a_branch.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Pears.jpg/400px-Pears.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/400px-Red_Apple.jpg',
    ],
  },
  Tomatoes: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Tomato_je.jpg/400px-Tomato_je.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Tomato_je.jpg/400px-Tomato_je.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/TomatoCutaway.jpg/400px-TomatoCutaway.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
    ],
  },
  Cucumbers: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Cucumbers_sliced.jpg/400px-Cucumbers_sliced.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Cucumbers_sliced.jpg/400px-Cucumbers_sliced.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
    ],
  },
  Carrots: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Tomato_je.jpg/400px-Tomato_je.jpg',
    ],
  },
  'Bell Peppers': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Peppers_grilled.jpg/400px-Peppers_grilled.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Tomato_je.jpg/400px-Tomato_je.jpg',
    ],
  },

  // ── DAIRY & EGGS ───────────────────────────────────────────────────────────
  'Whole Milk': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Milk_splash.jpg/400px-Milk_splash.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Oat_milk.jpg/400px-Oat_milk.jpg',
    ],
  },
  'Skimmed Milk': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Milk_splash.jpg/400px-Milk_splash.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Oat_milk.jpg/400px-Oat_milk.jpg',
    ],
  },
  'Lactose Free Milk': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Milk_splash.jpg/400px-Milk_splash.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Oat_milk.jpg/400px-Oat_milk.jpg',
    ],
  },
  'Oat Milk': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Oat_milk.jpg/400px-Oat_milk.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Oat_milk.jpg/400px-Oat_milk.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Milk_splash.jpg/400px-Milk_splash.jpg',
    ],
  },
  'Cheddar Cheese': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cheese_platter.jpg/400px-Cheese_platter.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Edam_cheese.jpg/400px-Edam_cheese.jpg',
    ],
  },
  'Edam Cheese': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Edam_cheese.jpg/400px-Edam_cheese.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Edam_cheese.jpg/400px-Edam_cheese.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cheese_platter.jpg/400px-Cheese_platter.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
    ],
  },
  'Gouda Cheese': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Gouda_cheese.jpg/400px-Gouda_cheese.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Gouda_cheese.jpg/400px-Gouda_cheese.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cheese_platter.jpg/400px-Cheese_platter.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
    ],
  },
  Mozzarella: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Mozzarella_di_bufala.jpg/400px-Mozzarella_di_bufala.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Mozzarella_di_bufala.jpg/400px-Mozzarella_di_bufala.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cheese_platter.jpg/400px-Cheese_platter.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
    ],
  },
  'Irish Butter': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Irish_butter.jpg/400px-Irish_butter.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Irish_butter.jpg/400px-Irish_butter.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
    ],
  },
  'Salted Butter': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Irish_butter.jpg/400px-Irish_butter.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Irish_butter.jpg/400px-Irish_butter.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
    ],
  },
  'Unsalted Butter': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Irish_butter.jpg/400px-Irish_butter.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Irish_butter.jpg/400px-Irish_butter.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
    ],
  },
  'Spreadable Butter': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Irish_butter.jpg/400px-Irish_butter.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Irish_butter.jpg/400px-Irish_butter.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
    ],
  },
  'Natural Yoghurt': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
    ],
  },
  'Greek Yoghurt': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
    ],
  },
  'Strawberry Yoghurt': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/PerfectStrawberry.jpg/400px-PerfectStrawberry.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    ],
  },
  'Blueberry Yoghurt': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Blueberries_with_straw.jpg/400px-Blueberries_with_straw.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    ],
  },

  // ── MEAT & SEAFOOD ─────────────────────────────────────────────────────────
  'Chicken Breast': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chicken_drumstick.jpg/400px-Chicken_drumstick.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
    ],
  },
  'Chicken Thighs': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chicken_drumstick.jpg/400px-Chicken_drumstick.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
    ],
  },
  'Chicken Drumsticks': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chicken_drumstick.jpg/400px-Chicken_drumstick.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chicken_drumstick.jpg/400px-Chicken_drumstick.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
    ],
  },
  'Chicken Wings': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chicken_drumstick.jpg/400px-Chicken_drumstick.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Chicken_drumstick.jpg/400px-Chicken_drumstick.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
    ],
  },
  'Beef Steak': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
    ],
  },
  'Beef Mince': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
    ],
  },
  'Beef Strips': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
    ],
  },
  'Beef Burgers': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
    ],
  },
  'Pork Belly': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pork_sausages.jpg/400px-Pork_sausages.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
    ],
  },
  'Pork Chops': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pork_sausages.jpg/400px-Pork_sausages.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
    ],
  },
  'Pork Mince': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pork_sausages.jpg/400px-Pork_sausages.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
    ],
  },
  'Pork Sausages': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pork_sausages.jpg/400px-Pork_sausages.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Pork_sausages.jpg/400px-Pork_sausages.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/60/Standing-rib-roast.jpg/400px-Standing-rib-roast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
    ],
  },
  'Turkey Mince': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
    ],
  },
  'Turkey Burgers': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Ground_beef.jpg/400px-Ground_beef.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
    ],
  },
  'Turkey Ham': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sliced_ham.jpg/400px-Sliced_ham.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sliced_ham.jpg/400px-Sliced_ham.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Salami_aka.jpg/400px-Salami_aka.jpg',
    ],
  },
  'Turkey Slices': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sliced_ham.jpg/400px-Sliced_ham.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sliced_ham.jpg/400px-Sliced_ham.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Salami_aka.jpg/400px-Salami_aka.jpg',
    ],
  },
  'Ham Slices': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sliced_ham.jpg/400px-Sliced_ham.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sliced_ham.jpg/400px-Sliced_ham.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Salami_aka.jpg/400px-Salami_aka.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
    ],
  },
  'Chicken Ham': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sliced_ham.jpg/400px-Sliced_ham.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sliced_ham.jpg/400px-Sliced_ham.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Salami_aka.jpg/400px-Salami_aka.jpg',
    ],
  },
  Salami: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Salami_aka.jpg/400px-Salami_aka.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Salami_aka.jpg/400px-Salami_aka.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Sliced_ham.jpg/400px-Sliced_ham.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cheese_platter.jpg/400px-Cheese_platter.jpg',
    ],
  },
  'Salmon Fillet': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Salmon_fillet.jpg/400px-Salmon_fillet.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Salmon_fillet.jpg/400px-Salmon_fillet.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Fish_fingers.jpg/400px-Fish_fingers.jpg',
    ],
  },
  'Cod Fillet': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Salmon_fillet.jpg/400px-Salmon_fillet.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Fish_fingers.jpg/400px-Fish_fingers.jpg',
    ],
  },
  'Haddock Fillet': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Salmon_fillet.jpg/400px-Salmon_fillet.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Fish_fingers.jpg/400px-Fish_fingers.jpg',
    ],
  },
  'Tilapia Fillet': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Salmon_fillet.jpg/400px-Salmon_fillet.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Fish_fingers.jpg/400px-Fish_fingers.jpg',
    ],
  },

  // ── BAKERY & BREAD ─────────────────────────────────────────────────────────
  'White Bread': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/400px-Fresh_made_bread_05.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/400px-Fresh_made_bread_05.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Rye_bread.jpg/400px-Rye_bread.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
    ],
  },
  'Wholegrain Bread': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/400px-Fresh_made_bread_05.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/400px-Fresh_made_bread_05.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Rye_bread.jpg/400px-Rye_bread.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
    ],
  },
  'Sourdough Bread': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/400px-Fresh_made_bread_05.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/400px-Fresh_made_bread_05.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Rye_bread.jpg/400px-Rye_bread.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
    ],
  },
  'Rye Bread': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Rye_bread.jpg/400px-Rye_bread.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Rye_bread.jpg/400px-Rye_bread.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Fresh_made_bread_05.jpg/400px-Fresh_made_bread_05.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
    ],
  },
  Croissants: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cinnamon_Rolls.jpg/400px-Cinnamon_Rolls.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
    ],
  },
  'Pain au Chocolat': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_Cake_Flourless_%281%29.jpg/400px-Chocolate_Cake_Flourless_%281%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cinnamon_Rolls.jpg/400px-Cinnamon_Rolls.jpg',
    ],
  },
  'Cinnamon Rolls': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cinnamon_Rolls.jpg/400px-Cinnamon_Rolls.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cinnamon_Rolls.jpg/400px-Cinnamon_Rolls.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
    ],
  },
  Muffins: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cinnamon_Rolls.jpg/400px-Cinnamon_Rolls.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Croissant_Ritz_Paris.jpg/400px-Croissant_Ritz_Paris.jpg',
    ],
  },
  'Carrot Cake': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_Cake_Flourless_%281%29.jpg/400px-Chocolate_Cake_Flourless_%281%29.jpg',
    ],
  },
  'Chocolate Cake': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_Cake_Flourless_%281%29.jpg/400px-Chocolate_Cake_Flourless_%281%29.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_Cake_Flourless_%281%29.jpg/400px-Chocolate_Cake_Flourless_%281%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Chocolate_bar.jpg/400px-Chocolate_bar.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
    ],
  },
  Cheesecake: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cheese_platter.jpg/400px-Cheese_platter.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Cheese_platter.jpg/400px-Cheese_platter.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
    ],
  },
  'Lemon Cake': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Oranges_and_orange_juice.jpg/400px-Oranges_and_orange_juice.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_Cake_Flourless_%281%29.jpg/400px-Chocolate_Cake_Flourless_%281%29.jpg',
    ],
  },

  // ── FROZEN FOOD ────────────────────────────────────────────────────────────
  'Frozen Pizza': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/400px-Eq_it-na_pizza-margherita_sep2005_sml.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg/400px-Eq_it-na_pizza-margherita_sep2005_sml.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Broccoli_on_white.jpg/400px-Broccoli_on_white.jpg',
    ],
  },
  'Frozen Peas': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Broccoli_on_white.jpg/400px-Broccoli_on_white.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
    ],
  },
  'Frozen Mixed Veg': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Broccoli_on_white.jpg/400px-Broccoli_on_white.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
    ],
  },
  'Frozen Broccoli': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Broccoli_on_white.jpg/400px-Broccoli_on_white.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Broccoli_on_white.jpg/400px-Broccoli_on_white.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
    ],
  },
  'Frozen Spinach': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Broccoli_on_white.jpg/400px-Broccoli_on_white.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
    ],
  },
  'Frozen Lasagna': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lasagna_-_stonesoup.jpg/400px-Lasagna_-_stonesoup.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lasagna_-_stonesoup.jpg/400px-Lasagna_-_stonesoup.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
    ],
  },
  'Frozen Curry': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
    ],
  },
  'Onion Rings': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Onion_rings.jpg/400px-Onion_rings.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Onion_rings.jpg/400px-Onion_rings.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chicken_nuggets.jpg/400px-Chicken_nuggets.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Fish_fingers.jpg/400px-Fish_fingers.jpg',
    ],
  },
  'Fish Fingers': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Fish_fingers.jpg/400px-Fish_fingers.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Fish_fingers.jpg/400px-Fish_fingers.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Onion_rings.jpg/400px-Onion_rings.jpg',
    ],
  },
  'Chicken Nuggets': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chicken_nuggets.jpg/400px-Chicken_nuggets.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chicken_nuggets.jpg/400px-Chicken_nuggets.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Chicken_breast.jpg/400px-Chicken_breast.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Onion_rings.jpg/400px-Onion_rings.jpg',
    ],
  },
  'Mozzarella Sticks': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Mozzarella_di_bufala.jpg/400px-Mozzarella_di_bufala.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Mozzarella_di_bufala.jpg/400px-Mozzarella_di_bufala.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Chicken_nuggets.jpg/400px-Chicken_nuggets.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Onion_rings.jpg/400px-Onion_rings.jpg',
    ],
  },
  'Vanilla Ice Cream': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapjeong-dong_Ice_Cream_Sandwich.jpg/400px-Hapjeong-dong_Ice_Cream_Sandwich.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapjeong-dong_Ice_Cream_Sandwich.jpg/400px-Hapjeong-dong_Ice_Cream_Sandwich.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Yogurt-blackberry-unsweetened.jpg/400px-Yogurt-blackberry-unsweetened.jpg',
    ],
  },
  'Chocolate Ice Cream': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapjeong-dong_Ice_Cream_Sandwich.jpg/400px-Hapjeong-dong_Ice_Cream_Sandwich.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapjeong-dong_Ice_Cream_Sandwich.jpg/400px-Hapjeong-dong_Ice_Cream_Sandwich.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_Cake_Flourless_%281%29.jpg/400px-Chocolate_Cake_Flourless_%281%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Chocolate_bar.jpg/400px-Chocolate_bar.jpg',
    ],
  },
  'Strawberry Ice Cream': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapjeong-dong_Ice_Cream_Sandwich.jpg/400px-Hapjeong-dong_Ice_Cream_Sandwich.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapjeong-dong_Ice_Cream_Sandwich.jpg/400px-Hapjeong-dong_Ice_Cream_Sandwich.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/PerfectStrawberry.jpg/400px-PerfectStrawberry.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    ],
  },
  'Mint Ice Cream': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapjeong-dong_Ice_Cream_Sandwich.jpg/400px-Hapjeong-dong_Ice_Cream_Sandwich.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Hapjeong-dong_Ice_Cream_Sandwich.jpg/400px-Hapjeong-dong_Ice_Cream_Sandwich.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Milk_glass.jpg/400px-Milk_glass.jpg',
    ],
  },

  // ── SNACKS & BEVERAGES ─────────────────────────────────────────────────────
  'Salted Crisps': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pretzel.jpg/400px-Pretzel.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pretzel.jpg/400px-Pretzel.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
    ],
  },
  'Tortilla Chips': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pretzel.jpg/400px-Pretzel.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
    ],
  },
  Pretzels: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pretzel.jpg/400px-Pretzel.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pretzel.jpg/400px-Pretzel.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
    ],
  },
  'Cheese Crackers': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Cheddar_cheese_4.jpg/400px-Cheddar_cheese_4.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pretzel.jpg/400px-Pretzel.jpg',
    ],
  },
  'Chocolate Cookies': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Chocolate_bar.jpg/400px-Chocolate_bar.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
    ],
  },
  'Caramel Biscuits': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Pretzel.jpg/400px-Pretzel.jpg',
    ],
  },
  'Milk Chocolate Bar': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Chocolate_bar.jpg/400px-Chocolate_bar.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Chocolate_bar.jpg/400px-Chocolate_bar.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Chocolate_Cake_Flourless_%281%29.jpg/400px-Chocolate_Cake_Flourless_%281%29.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
    ],
  },
  'Chocolate Wafers': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Chocolate_bar.jpg/400px-Chocolate_bar.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Chocolate_bar.jpg/400px-Chocolate_bar.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Chocolate_cookies.jpg/400px-Chocolate_cookies.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Snack_Crackers.jpg/400px-Snack_Crackers.jpg',
    ],
  },
  Cola: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Glass_of_water_with_bubbles.jpg/400px-Glass_of_water_with_bubbles.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Glass_of_water_with_bubbles.jpg/400px-Glass_of_water_with_bubbles.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
    ],
  },
  'Orange Juice': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Oranges_and_orange_juice.jpg/400px-Oranges_and_orange_juice.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
    ],
  },
  'Apple Juice': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Red_Apple.jpg/400px-Red_Apple.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
    ],
  },
  Lemonade: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Glass_of_water_with_bubbles.jpg/400px-Glass_of_water_with_bubbles.jpg',
    ],
  },
  'Sparkling Water': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Glass_of_water_with_bubbles.jpg/400px-Glass_of_water_with_bubbles.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Glass_of_water_with_bubbles.jpg/400px-Glass_of_water_with_bubbles.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Glass-of-water.jpg/400px-Glass-of-water.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
    ],
  },
  'Still Water': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Glass-of-water.jpg/400px-Glass-of-water.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Glass-of-water.jpg/400px-Glass-of-water.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Glass_of_water_with_bubbles.jpg/400px-Glass_of_water_with_bubbles.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
    ],
  },
  'Sports Drink': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Glass_of_water_with_bubbles.jpg/400px-Glass_of_water_with_bubbles.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
    ],
  },
  'Vitamin Drink': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Orange_juice_1.jpg/400px-Orange_juice_1.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Glass_of_water_with_bubbles.jpg/400px-Glass_of_water_with_bubbles.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Lemonade_at_Zak%27s.jpg/400px-Lemonade_at_Zak%27s.jpg',
    ],
  },
  'Black Tea Bags': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Teacup_with_saucer.jpg/400px-Teacup_with_saucer.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Teacup_with_saucer.jpg/400px-Teacup_with_saucer.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/400px-A_small_cup_of_coffee.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Glass-of-water.jpg/400px-Glass-of-water.jpg',
    ],
  },
  'Green Tea': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Teacup_with_saucer.jpg/400px-Teacup_with_saucer.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Teacup_with_saucer.jpg/400px-Teacup_with_saucer.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/400px-A_small_cup_of_coffee.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
    ],
  },
  'Ground Coffee': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/400px-A_small_cup_of_coffee.JPG',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/400px-A_small_cup_of_coffee.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Teacup_with_saucer.jpg/400px-Teacup_with_saucer.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Brown_sugar_closeup.jpg/400px-Brown_sugar_closeup.jpg',
    ],
  },
  'Instant Coffee': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/400px-A_small_cup_of_coffee.JPG',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/400px-A_small_cup_of_coffee.JPG',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Teacup_with_saucer.jpg/400px-Teacup_with_saucer.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Brown_sugar_closeup.jpg/400px-Brown_sugar_closeup.jpg',
    ],
  },

  // ── PANTRY / DRY GOODS ─────────────────────────────────────────────────────
  'Pasta Spaghetti': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lasagna_-_stonesoup.jpg/400px-Lasagna_-_stonesoup.jpg',
    ],
  },
  'Penne Pasta': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Lasagna_-_stonesoup.jpg/400px-Lasagna_-_stonesoup.jpg',
    ],
  },
  'Basmati Rice': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Basmati_rice.jpg/400px-Basmati_rice.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Basmati_rice.jpg/400px-Basmati_rice.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
    ],
  },
  'Jasmine Rice': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Basmati_rice.jpg/400px-Basmati_rice.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Basmati_rice.jpg/400px-Basmati_rice.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Chicken_curry.jpg/400px-Chicken_curry.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
    ],
  },
  'Plain Flour': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Brown_sugar_closeup.jpg/400px-Brown_sugar_closeup.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cinnamon_Rolls.jpg/400px-Cinnamon_Rolls.jpg',
    ],
  },
  'Baking Powder': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Brown_sugar_closeup.jpg/400px-Brown_sugar_closeup.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Cinnamon_Rolls.jpg/400px-Cinnamon_Rolls.jpg',
    ],
  },
  'Icing Sugar': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Brown_sugar_closeup.jpg/400px-Brown_sugar_closeup.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Muffins.jpg/400px-Muffins.jpg',
    ],
  },
  'Brown Sugar': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Brown_sugar_closeup.jpg/400px-Brown_sugar_closeup.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Brown_sugar_closeup.jpg/400px-Brown_sugar_closeup.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Plain_flour_in_bowl.jpg/400px-Plain_flour_in_bowl.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/A_small_cup_of_coffee.JPG/400px-A_small_cup_of_coffee.JPG',
    ],
  },
  'Canned Tomatoes': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Tomato_je.jpg/400px-Tomato_je.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
    ],
  },
  'Canned Beans': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Pasta_e_fagioli.jpg/400px-Pasta_e_fagioli.jpg',
    ],
  },
  'Canned Corn': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/GreenPeas.jpg/400px-GreenPeas.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vegetable-Carrot-Bundle-wStalks.jpg/400px-Vegetable-Carrot-Bundle-wStalks.jpg',
    ],
  },
  'Canned Tuna': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Canned_tomatoes.jpg/400px-Canned_tomatoes.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Cod_fillet.jpg/400px-Cod_fillet.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Salmon_fillet.jpg/400px-Salmon_fillet.jpg',
    ],
  },
  'Soy Sauce': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Ketchup-Squeeze-Bottle.jpg/400px-Ketchup-Squeeze-Bottle.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
    ],
  },
  Mayonnaise: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Ketchup-Squeeze-Bottle.jpg/400px-Ketchup-Squeeze-Bottle.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
    ],
  },
  'Tomato Ketchup': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Ketchup-Squeeze-Bottle.jpg/400px-Ketchup-Squeeze-Bottle.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Ketchup-Squeeze-Bottle.jpg/400px-Ketchup-Squeeze-Bottle.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Tomato_je.jpg/400px-Tomato_je.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
    ],
  },
  'BBQ Sauce': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Ketchup-Squeeze-Bottle.jpg/400px-Ketchup-Squeeze-Bottle.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Beef_burger.jpg/400px-Beef_burger.jpg',
    ],
  },
  Paprika: {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
    ],
  },
  'Chili Flakes': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
    ],
  },
  'Garlic Powder': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
    ],
  },
  'Black Pepper': {
    main: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
    extra: [
      'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Paprika.jpg/400px-Paprika.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Soy_sauce_in_spoon.jpg/400px-Soy_sauce_in_spoon.jpg',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sweet-Pepper.jpg/400px-Sweet-Pepper.jpg',
    ],
  },
}

/**
 * Returns the main (card) image URL for a product name.
 * Falls back to null if the product isn't in the map.
 */
export function getProductImage(name) {
  return PRODUCT_IMAGES[name]?.main ?? null
}

/**
 * Returns all 4 images [main, extra1, extra2, extra3] for a product name.
 * Falls back to [null, null, null, null] if not in map.
 */
export function getProductImages(name) {
  const entry = PRODUCT_IMAGES[name]
  if (!entry) return [null, null, null, null]
  return [entry.main, ...entry.extra]
}

export default PRODUCT_IMAGES