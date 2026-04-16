const { Sequelize } = require('sequelize');

async function bruteForceSync() {
  const s = new Sequelize('postgresql://postgres:AnkvVIDqtWkaFfhvhlwMBOmDHBRAtxxf@metro.proxy.rlwy.net:21904/railway', {
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  });

  const slugs = [
    'partnerships', 'setup-guide', 'workshops', 'fundraising', 'registration', 'login', 'contact-us',
    'digitization-guide', 'catalogue-2025', 'skill-lab-guide', 'play-furniture-lookbook', 'math-resources',
    'completed-projects', 'design-ideas', 'library-trends', 'job-openings', 'influencer-program',
    'setup-school-india', 'libraries', 'forgot-password', 'my-account', 'member-dashboard',
    'how-it-works', 'sell-on-schoolmart', 'pricing', 'seller-help', 'shipping-policy',
    'cancellation-policy', 'replacement-return', 'order-rejection-policy', 'payments',
    'payment-policy', 'report-issue', 'blog', 'delivery-locations'
  ];

  try {
    await s.authenticate();
    console.log('--- STARTING BRUTE FORCE INJECTION ---');
    for (const slug of slugs) {
      try {
        await s.query(`INSERT INTO "CMSPages" (slug, title, "createdAt", "updatedAt") VALUES (?, ?, NOW(), NOW())`, {
          replacements: [slug, slug.replace(/-/g, ' ').toUpperCase()]
        });
        console.log(`INSERTED: ${slug}`);
      } catch (e) {
        console.log(`SKIPPED: ${slug} (Already exists or error)`);
      }
    }
    console.log('--- BRUTE FORCE SYNC COMPLETE ---');
  } catch (err) {
    console.error(err.message);
  } finally {
    await s.close();
  }
}

bruteForceSync();
