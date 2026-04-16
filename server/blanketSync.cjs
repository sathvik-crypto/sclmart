const { Sequelize } = require('sequelize');

async function blanketModuleSync() {
  const connectionString = 'postgresql://postgres:AnkvVIDqtWkaFfhvhlwMBOmDHBRAtxxf@metro.proxy.rlwy.net:21904/railway';
  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  });

  try {
    await sequelize.authenticate();
    console.log('--- BLANKET MODULE SYNC STARTED ---');
    
    // 1. Fetch ALL slugs from the database
    const [pages] = await sequelize.query('SELECT slug FROM "CMSPages"');
    console.log(`Found ${pages.length} pages to process.`);

    for (const page of pages) {
      const slug = page.slug;
      console.log(`Ensuring modules for: ${slug}`);
      
      const defaultBlocks = [
        { key: 'inner_page_hero', type: 'inner_page_hero' },
        { key: 'sidebar_categories', type: 'sidebar_categories' },
        { key: 'page_content', type: 'page_content' }
      ];

      for (const block of defaultBlocks) {
        // Use raw SQL to ensure absolute persistence
        await sequelize.query(`
          INSERT INTO "CMSBlocks" (id, "pageSlug", key, type, data, "isVisible", "createdAt", "updatedAt")
          VALUES (gen_random_uuid(), :pageSlug, :key, :type, '{}', true, NOW(), NOW())
          ON CONFLICT ("pageSlug", key) DO NOTHING
        `, { replacements: { pageSlug: slug, key: block.key, type: block.type } });
      }
    }
    
    console.log('--- BLANKET SYNC COMPLETE: ALL PAGES ACTIVATED ---');
  } catch (error) {
    console.error('Blanket Sync Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

blanketModuleSync();
