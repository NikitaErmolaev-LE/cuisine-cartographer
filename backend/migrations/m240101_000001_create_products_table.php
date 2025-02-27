
<?php

use yii\db\Migration;

/**
 * Create products table and seed it with data
 */
class m240101_000001_create_products_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('products', [
            'id' => $this->primaryKey(),
            'title' => $this->string()->notNull(),
            'img' => $this->string(1000)->notNull(),
            'price' => $this->decimal(10, 2)->notNull(),
        ]);

        // Seed the database with products
        $this->insertProducts();
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        $this->dropTable('products');
    }

    /**
     * Insert products into the database
     */
    private function insertProducts()
    {
        $products = [
            ['Fresh Basil', 'https://images.unsplash.com/photo-1600058215001-e4a33dc87d17?w=600&auto=format&fit=crop', 2.99],
            ['Olive Oil (Extra Virgin)', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=600&auto=format&fit=crop', 8.99],
            ['Garlic Bulb', 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=600&auto=format&fit=crop', 1.49],
            ['Parmesan Cheese', 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?w=600&auto=format&fit=crop', 6.99],
            ['Pine Nuts', 'https://images.unsplash.com/photo-1645630729453-3e736a1f67c9?w=600&auto=format&fit=crop', 9.99],
            ['Spaghetti Pasta', 'https://images.unsplash.com/photo-1551462147-ff29053bfc14?w=600&auto=format&fit=crop', 2.49],
            ['Tomatoes', 'https://images.unsplash.com/photo-1546094096-0df4bcaad1de?w=600&auto=format&fit=crop', 3.99],
            ['Onions', 'https://images.unsplash.com/photo-1618512496248-a07c50a9102e?w=600&auto=format&fit=crop', 1.99],
            ['Bell Peppers', 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=600&auto=format&fit=crop', 2.99],
            ['Ground Beef', 'https://images.unsplash.com/photo-1618512496724-b54b4f7a2175?w=600&auto=format&fit=crop', 7.99],
            ['Butter', 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=600&auto=format&fit=crop', 4.49],
            ['Flour', 'https://images.unsplash.com/photo-1600109081256-75a8cc7bbc4e?w=600&auto=format&fit=crop', 2.29],
            // Adding more products for European cuisine
            ['Arborio Rice', 'https://images.unsplash.com/photo-1586201375761-83865001e8ac?w=600&auto=format&fit=crop', 5.99],
            ['Mushrooms', 'https://images.unsplash.com/photo-1611591437268-1b845b1884ab?w=600&auto=format&fit=crop', 4.49],
            ['White Wine', 'https://images.unsplash.com/photo-1566452348683-79a7daa7b37f?w=600&auto=format&fit=crop', 12.99],
            ['Vegetable Stock', 'https://images.unsplash.com/photo-1617118602627-ded3b7e95c11?w=600&auto=format&fit=crop', 3.49],
            ['Lemons', 'https://images.unsplash.com/photo-1582636244208-bce7e9c9c529?w=600&auto=format&fit=crop', 1.99],
            ['Eggs', 'https://images.unsplash.com/photo-1598965675045-45c5e72c7d05?w=600&auto=format&fit=crop', 3.99],
            ['Pancetta', 'https://images.unsplash.com/photo-1625944266103-f6d2d0dab703?w=600&auto=format&fit=crop', 8.99],
            ['Pecorino Romano Cheese', 'https://images.unsplash.com/photo-1634487359989-3e90c9432133?w=600&auto=format&fit=crop', 7.99],
            ['Black Pepper', 'https://images.unsplash.com/photo-1588165171080-c89acfa5ee83?w=600&auto=format&fit=crop', 2.99],
            ['Baguette', 'https://images.unsplash.com/photo-1597079910443-60c4aecd2db3?w=600&auto=format&fit=crop', 3.49],
            ['Mozzarella Cheese', 'https://images.unsplash.com/photo-1626957341926-98752fc2ba47?w=600&auto=format&fit=crop', 5.99],
            ['Active Dry Yeast', 'https://images.unsplash.com/photo-1626074353765-517a681e40be?w=600&auto=format&fit=crop', 2.99],
            ['Potatoes', 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop', 2.49],
            ['Heavy Cream', 'https://images.unsplash.com/photo-1622897347507-da5d329dfc26?w=600&auto=format&fit=crop', 4.99],
            ['Dijon Mustard', 'https://images.unsplash.com/photo-1589010588553-46e8e7c21a8a?w=600&auto=format&fit=crop', 3.49],
            ['White Vinegar', 'https://images.unsplash.com/photo-1605486186897-27d6ea8d7d4a?w=600&auto=format&fit=crop', 2.99],
            ['Sugar', 'https://images.unsplash.com/photo-1486959440778-5de775b4b6b3?w=600&auto=format&fit=crop', 1.99],
            ['Bay Leaves', 'https://images.unsplash.com/photo-1607436519269-39695f93089a?w=600&auto=format&fit=crop', 2.49],
            ['Rosemary', 'https://images.unsplash.com/photo-1515586000433-45406d8e6662?w=600&auto=format&fit=crop', 2.99],
            ['Thyme', 'https://images.unsplash.com/photo-1603964088262-9c72100f0388?w=600&auto=format&fit=crop', 2.99],
            ['Sage', 'https://images.unsplash.com/photo-1601289166888-94c3d12a92f7?w=600&auto=format&fit=crop', 2.99],
            ['Paprika', 'https://images.unsplash.com/photo-1633168883629-e999cab7c591?w=600&auto=format&fit=crop', 2.49],
            ['Cumin', 'https://images.unsplash.com/photo-1605709303005-0034b400761a?w=600&auto=format&fit=crop', 2.49],
            ['Red Wine', 'https://images.unsplash.com/photo-1584916601605-34afda74a6e8?w=600&auto=format&fit=crop', 13.99],
            ['Balsamic Vinegar', 'https://images.unsplash.com/photo-1520981825232-ece5ef48e7fa?w=600&auto=format&fit=crop', 6.99],
            ['Capers', 'https://images.unsplash.com/photo-1604553063488-10e0bf573bf5?w=600&auto=format&fit=crop', 3.99],
            ['Olives', 'https://images.unsplash.com/photo-1562039095-05dd9ae86355?w=600&auto=format&fit=crop', 4.49],
            ['Anchovies', 'https://images.unsplash.com/photo-1603908029136-53b1e4293dd0?w=600&auto=format&fit=crop', 5.99],
            ['Fennel', 'https://images.unsplash.com/photo-1615485290382-469b4f01abbd?w=600&auto=format&fit=crop', 3.99],
            ['Carrots', 'https://images.unsplash.com/photo-1582515073490-39981397c445?w=600&auto=format&fit=crop', 2.49],
            ['Celery', 'https://images.unsplash.com/photo-1580391564590-aeca65c5e2d3?w=600&auto=format&fit=crop', 2.49],
            ['Shallots', 'https://images.unsplash.com/photo-1614253429340-d5142734735a?w=600&auto=format&fit=crop', 2.99],
            ['Nutmeg', 'https://images.unsplash.com/photo-1621059559475-38b4aac4dcef?w=600&auto=format&fit=crop', 3.49],
            ['Chicken Stock', 'https://images.unsplash.com/photo-1620706857370-0484d9227556?w=600&auto=format&fit=crop', 3.49],
            ['Beef Stock', 'https://images.unsplash.com/photo-1620706857370-0484d9227556?w=600&auto=format&fit=crop', 3.99],
            ['Canned Tomatoes', 'https://images.unsplash.com/photo-1598511757337-fe2cafc31ba0?w=600&auto=format&fit=crop', 2.99],
            ['Tomato Paste', 'https://images.unsplash.com/photo-1622479233122-4f7927180b07?w=600&auto=format&fit=crop', 1.99],
            ['Ricotta Cheese', 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=600&auto=format&fit=crop', 4.99],
            ['Mascarpone Cheese', 'https://images.unsplash.com/photo-1634487359989-3e90c9432133?w=600&auto=format&fit=crop', 5.99],
            ['Goat Cheese', 'https://images.unsplash.com/photo-1588365953227-33061d3ba9b8?w=600&auto=format&fit=crop', 6.99],
            ['Blue Cheese', 'https://images.unsplash.com/photo-1593116241657-9c1c83a5b904?w=600&auto=format&fit=crop', 7.99],
        ];

        foreach ($products as $product) {
            $this->insert('products', [
                'title' => $product[0],
                'img' => $product[1],
                'price' => $product[2],
            ]);
        }
    }
}
