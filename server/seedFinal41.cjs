const { Sequelize, DataTypes } = require('sequelize');

async function seed41() {
  const connectionString = 'postgresql://postgres:AnkvVIDqtWkaFfhvhlwMBOmDHBRAtxxf@metro.proxy.rlwy.net:21904/railway';
  const sequelize = new Sequelize(connectionString, {
    dialect: 'postgres',
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  });

  const CMSPage = sequelize.define('CMSPage', {
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false }
  }, { tableName: 'CMSPages' });

  const slugs = [
    'home', 'corporate', 'aboutus', 'manufacturing', 'catalogues', 'environments',
    'guides', 'contact-us', 'furniture', 'architecture', 'school-building-design',
    'digital', 'libraries', 'design', 'sports', 'mathematics', 'gamified-math-labs',
    'science', 'science-is-fun', 'labs', 'registration', 'login', 'forgot-password',
    'my-account', 'member-dashboard', 'school-sale', 'partnerships', 'setup-guide',
    'workshops', 'fundraising', 'how-it-works', 'sell-on-schoolmart', 'pricing',
    'seller-help', 'shipping-policy', 'cancellation-policy', 'replacement-return',
    'order-rejection-policy', 'payments', 'payment-policy', 'report-issue', 'blog',
    'delivery-locations'
  ];

  try {
    await sequelize.authenticate();
    console.log('Final Sync: Injecting 41+ pages...');
    for (const slug of slugs) {
      await CMSPage.findOrCreate({ 
        where: { slug }, 
        defaults: { slug, title: slug.replace(/-/g, ' ').toUpperCase() } 
      });
    }
    console.log('✅ PRODUCTION PARITY ACHIEVED: 41+ PAGES SYNCED.');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

seed41();
