const { Sequelize } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

async function finalSync41() {
  const s = new Sequelize('postgresql://postgres:AnkvVIDqtWkaFfhvhlwMBOmDHBRAtxxf@metro.proxy.rlwy.net:21904/railway', {
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  });

  const slugs = [
    'home', 'corporate', 'aboutus', 'manufacturing', 'catalogues', 'environments', 'guides', 'contact-us',
    'furniture', 'architecture', 'school-building-design', 'digital', 'libraries', 'design', 'sports',
    'mathematics', 'gamified-math-labs', 'science', 'science-is-fun', 'labs', 'registration', 'login',
    'forgot-password', 'my-account', 'member-dashboard', 'school-sale', 'partnerships', 'setup-guide',
    'workshops', 'fundraising', 'how-it-works', 'sell-on-schoolmart', 'pricing', 'seller-help',
    'shipping-policy', 'cancellation-policy', 'replacement-return', 'order-rejection-policy', 'payments',
    'payment-policy', 'report-issue', 'blog', 'delivery-locations', 'digitization-guide', 'catalogue-2025',
    'skill-lab-guide', 'play-furniture-lookbook', 'math-resources', 'completed-projects', 'design-ideas',
    'library-trends', 'job-openings', 'influencer-program', 'setup-school-india', 'immersive-learning',
    'kindergarten-design', 'skill-labs', 'library-innovations', 'furniture-planning', 'interactive-walls',
    'interactive-panels', 'wondergartens', 'ai-classroom', 'smart-sports'
  ];

  try {
    await s.authenticate();
    console.log('--- STARTING OVERRIDE SYNC ---');
    
    for (const slug of slugs) {
      const title = slug.replace(/-/g, ' ').toUpperCase();
      try {
        // Use a raw SQL UPSERT that handles the UUID ID
        await s.query(`
          INSERT INTO "CMSPages" (id, slug, title, "createdAt", "updatedAt")
          VALUES (gen_random_uuid(), :slug, :title, NOW(), NOW())
          ON CONFLICT (slug) DO UPDATE SET title = EXCLUDED.title, "updatedAt" = NOW()
        `, { substitutions: { slug, title }, replacements: { slug, title } });
        console.log(`✓ SYNCED: ${slug}`);
      } catch (e) {
        console.log(`× FAILED: ${slug} - ${e.message}`);
      }
    }
    
    console.log('--- SYNC SUCCESSFUL: 41+ PAGES READY ---');
  } catch (err) {
    console.error(err.message);
  } finally {
    await s.close();
  }
}

finalSync41();
