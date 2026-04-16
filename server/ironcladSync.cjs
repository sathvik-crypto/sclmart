const { Sequelize, DataTypes } = require('sequelize');

async function forceSeed() {
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
    { slug: 'home', title: 'HOME PAGE' },
    { slug: 'corporate', title: 'CORPORATE SOLUTIONS' },
    { slug: 'aboutus', title: 'ABOUT US' },
    { slug: 'manufacturing', title: 'MANUFACTURING' },
    { slug: 'catalogues', title: 'CATALOGUES' },
    { slug: 'environments', title: 'ENVIRONMENTS' },
    { slug: 'guides', title: 'GUIDES & MANUALS' },
    { slug: 'contact-us', title: 'CONTACT US' },
    { slug: 'furniture', title: 'FURNITURE PAGE' },
    { slug: 'architecture', title: 'ARCHITECTURE' },
    { slug: 'school-building-design', title: 'SCHOOL DESIGN' },
    { slug: 'digital', title: 'DIGITAL INFRASTRUCTURE' },
    { slug: 'libraries', title: 'LIBRARIES' },
    { slug: 'design', title: 'SCHOOL DESIGNS' },
    { slug: 'sports', title: 'SPORTS PAGE' },
    { slug: 'mathematics', title: 'MATHEMATICS' },
    { slug: 'gamified-math-labs', title: 'MATH LABS' },
    { slug: 'science', title: 'SCIENCE' },
    { slug: 'science-is-fun', title: 'SCIENCE CENTER' },
    { slug: 'labs', title: 'LABS & LIBRARIES' },
    { slug: 'registration', title: 'REGISTRATION' },
    { slug: 'login', title: 'LOGIN' },
    { slug: 'forgot-password', title: 'FORGOT PASSWORD' },
    { slug: 'my-account', title: 'MY ACCOUNT' },
    { slug: 'member-dashboard', title: 'MEMBER DASHBOARD' },
    { slug: 'school-sale', title: 'SCHOOL SALE' },
    { slug: 'partnerships', title: 'PARTNERSHIPS' },
    { slug: 'setup-guide', title: 'SETUP GUIDE' },
    { slug: 'workshops', title: 'WORKSHOPS' },
    { slug: 'fundraising', title: 'FUNDRAISING' },
    { slug: 'how-it-works', title: 'HOW IT WORKS' },
    { slug: 'sell-on-schoolmart', title: 'SELL ON SCHOOLMART' },
    { slug: 'pricing', title: 'PRICING' },
    { slug: 'seller-help', title: 'SELLER HELP' },
    { slug: 'shipping-policy', title: 'SHIPPING POLICY' },
    { slug: 'cancellation-policy', title: 'CANCELLATION POLICY' },
    { slug: 'replacement-return', title: 'REPLACEMENT & RETURN' },
    { slug: 'order-rejection-policy', title: 'ORDER REJECTION' },
    { slug: 'payments', title: 'PAYMENTS' },
    { slug: 'payment-policy', title: 'PAYMENT POLICY' },
    { slug: 'report-issue', title: 'REPORT ISSUE' },
    { slug: 'blog', title: 'BLOG' },
    { slug: 'delivery-locations', title: 'DELIVERY LOCATIONS' }
  ];

  try {
    await sequelize.authenticate();
    console.log('--- IRONCLAD SYNC STARTED ---');
    for (const item of slugs) {
      const [page, created] = await CMSPage.findOrCreate({ 
        where: { slug: item.slug }, 
        defaults: item 
      });
      if (!created && page.title !== item.title) {
        page.title = item.title;
        await page.save();
        console.log(`Updated title for: ${item.slug}`);
      }
      console.log(`Confirmed: ${item.slug} (${item.title})`);
    }
    console.log('--- ALL 43 PAGES CONFIRMED IN DB ---');
  } catch (error) {
    console.error('Error during sycn:', error);
  } finally {
    await sequelize.close();
  }
}

forceSeed();
