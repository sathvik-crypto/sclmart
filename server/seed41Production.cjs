const { Sequelize, DataTypes } = require('sequelize');

async function seedAllProduction() {
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

  const CMSBlock = sequelize.define('CMSBlock', {
    pageSlug: { type: DataTypes.STRING, allowNull: false },
    key: { type: DataTypes.STRING, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    data: { type: DataTypes.JSONB, defaultValue: {} },
    order: { type: DataTypes.INTEGER, defaultValue: 0 },
    isVisible: { type: DataTypes.BOOLEAN, defaultValue: true }
  }, { tableName: 'CMSBlocks' });

  const INNER_PAGES = {
    'furniture': { title: 'Furniture', blocks: [{ key: 'inner_page_hero', type: 'inner_page_hero', order: 1, data: { badge: 'Performance 2025', titleHtml: 'School<br/><span class="text-sm-blue">Furniture</span>', subtitle: 'Ergonomic designs for modern classrooms' } },{ key: 'sidebar_categories', type: 'sidebar_categories', order: 2, data: { categories: ['Classroom Desks','Student Chairs','Lab Furniture','Library Furniture','Teacher Desks','Storage','Hostel Furniture','Kindergarten'] } }] },
    'school-building-design': { title: 'Architecture', blocks: [{ key: 'inner_page_hero', type: 'inner_page_hero', order: 1, data: { badge: 'Design Excellence', titleHtml: 'School<br/><span class="text-sm-blue">Architecture</span>', subtitle: 'NEP-ready campus planning and design' } }] },
    'digital': { title: 'Digital Infra', blocks: [{ key: 'inner_page_hero', type: 'inner_page_hero', order: 1, data: { badge: 'Future Ready', titleHtml: 'Digital<br/><span class="text-sm-blue">Infrastructure</span>', subtitle: 'Smart classrooms and ed-tech solutions' } },{ key: 'sidebar_categories', type: 'sidebar_categories', order: 2, data: { categories: ['Interactive Panels','Smart Boards','Projectors','Computer Labs','Digital Podiums','AV Systems'] } }] },
    'sports': { title: 'Sports', blocks: [{ key: 'inner_page_hero', type: 'inner_page_hero', order: 1, data: { badge: 'Champions Arena', titleHtml: 'Sports<br/><span class="text-sm-blue">Infrastructure</span>', subtitle: 'Professional-grade sports facilities for schools' } },{ key: 'sidebar_categories', type: 'sidebar_categories', order: 2, data: { categories: ['Cricket','Football','Basketball','Tennis','Swimming','Athletics','Indoor Sports','Playground Equipment'] } }] },
    'libraries': { title: 'Libraries', blocks: [{ key: 'inner_page_hero', type: 'inner_page_hero', order: 1, data: { badge: 'Knowledge Hub', titleHtml: 'Modern<br/><span class="text-sm-blue">Libraries</span>', subtitle: 'Phygital libraries and reading spaces' } }] },
    'environments': { title: 'Environments', blocks: [{ key: 'inner_page_hero', type: 'inner_page_hero', order: 1, data: { badge: 'Learning Spaces', titleHtml: 'Learning<br/><span class="text-sm-blue">Environments</span>', subtitle: 'STEM labs, maker-spaces and activity rooms' } }] },
    'aboutus': { title: 'About Us', blocks: [{ key: 'page_hero', type: 'page_hero', order: 1, data: { badge: 'Our Story', titleHtml: 'About<br/><span class="text-sm-blue">SchoolMart</span>', subtitle: 'India\'s leading school infrastructure partner' } },{ key: 'page_content', type: 'page_content', order: 2, data: { heading: 'Our Mission', content: '' } },{ key: 'page_stats', type: 'page_stats', order: 3, data: { stats: [{ value: '4000+', label: 'Partner Schools' },{ value: '7+', label: 'Years' },{ value: '1200+', label: 'Products' },{ value: '16+', label: 'Architects' }] } }] },
    'contact-us': { title: 'Contact Us', blocks: [{ key: 'page_hero', type: 'page_hero', order: 1, data: { badge: 'Get in Touch', titleHtml: 'Contact<br/><span class="text-sm-blue">Us</span>', subtitle: 'From architectural blueprints to furniture installations, we assist you in every step.' } }] },
    'mathematics': { title: 'Mathematics', blocks: [{ key: 'inner_page_hero', type: 'inner_page_hero', order: 1, data: { badge: 'Gamified Learning', titleHtml: 'Gamified<br/><span class="text-sm-blue">Math Labs</span>', subtitle: 'Making mathematics fun and interactive' } }] },
    'science': { title: 'Science', blocks: [{ key: 'inner_page_hero', type: 'inner_page_hero', order: 1, data: { badge: 'Discovery Zone', titleHtml: 'Science<br/><span class="text-sm-blue">is Fun</span>', subtitle: 'Interactive science labs and equipment' } }] },
    'design': { title: 'School Designs', blocks: [{ key: 'inner_page_hero', type: 'inner_page_hero', order: 1, data: { badge: 'Campus Blueprint', titleHtml: 'School<br/><span class="text-sm-blue">Designs</span>', subtitle: 'End-to-end campus setup and renovation services' } }] },
    'manufacturing': { title: 'Manufacturing', blocks: [{ key: 'manufacturing_hero', type: 'manufacturing_hero', order: 1, data: { badge: 'Made in India', titleHtml: 'Our<br/><span class="text-sm-blue">Manufacturing</span>', description: 'State-of-the-art production facilities' } }] },
    'corporate': { title: 'Corporate', blocks: [{ key: 'page_hero', type: 'page_hero', order: 1, data: { badge: 'Enterprise', titleHtml: 'Corporate<br/><span class="text-sm-blue">Solutions</span>', subtitle: 'Office and corporate furniture solutions' } }] },
    'catalogues': { title: 'Catalogues', blocks: [{ key: 'page_hero', type: 'page_hero', order: 1, data: { badge: 'Downloads', titleHtml: 'Product<br/><span class="text-sm-blue">Catalogues</span>', subtitle: 'Download our complete product catalogues' } }] },
    'guides': { title: 'Guides', blocks: [{ key: 'page_hero', type: 'page_hero', order: 1, data: { badge: 'Resources', titleHtml: 'Setup<br/><span class="text-sm-blue">Guides</span>', subtitle: 'Comprehensive guides for school setup and infrastructure' } }] },
    'school-sale': { title: 'School Sale', blocks: [{ key: 'page_hero', type: 'page_hero', order: 1, data: { badge: 'Opportunities', titleHtml: 'School<br/><span class="text-sm-blue">Buy & Sell</span>', subtitle: 'Explore school acquisition and partnership opportunities' } }] },
    'partnerships': { title: 'Partnerships', blocks: [{ key: 'page_hero', type: 'page_hero', order: 1, data: { badge: 'Collaborate', titleHtml: 'Strategic<br/><span class="text-sm-blue">Partnerships</span>', subtitle: 'Join our growing network of education partners' } }] },
    'setup-guide': { title: 'Setup Guide', blocks: [{ key: 'page_hero', type: 'page_hero', order: 1, data: { badge: 'Step by Step', titleHtml: 'School<br/><span class="text-sm-blue">Setup Guide</span>', subtitle: 'Everything you need to start a new school in India' } }] },
    'workshops': { title: 'Workshops', blocks: [{ key: 'inner_page_hero', type: 'inner_page_hero', order: 1, data: { badge: 'Events', titleHtml: 'Professional<br/><span class="text-sm-blue">Workshops</span>', subtitle: 'Training and development programs for educators' } }] },
    'fundraising': { title: 'Fundraising', blocks: [{ key: 'inner_page_hero', type: 'inner_page_hero', order: 1, data: { badge: 'Growth Capital', titleHtml: 'School<br/><span class="text-sm-blue">Fundraising</span>', subtitle: 'Funding solutions for school infrastructure' } }] },
    'how-it-works': { title: 'How It Works', blocks: [{ key: 'page_hero', type: 'page_hero', order: 1, data: { badge: 'Process', titleHtml: 'How It<br/><span class="text-sm-blue">Works</span>', subtitle: 'Our end-to-end school infrastructure process' } }] },
    'pricing': { title: 'Pricing', blocks: [{ key: 'page_hero', type: 'page_hero', order: 1, data: { badge: 'Transparent', titleHtml: 'Our<br/><span class="text-sm-blue">Pricing</span>', subtitle: 'Competitive institutional pricing' } }] },
    'shipping-policy': { title: 'Shipping Policy', blocks: [{ key: 'page_content', type: 'page_content', order: 1, data: { heading: 'Shipping Policy', content: '' } }] },
    'cancellation-policy': { title: 'Cancellation Policy', blocks: [{ key: 'page_content', type: 'page_content', order: 1, data: { heading: 'Cancellation Policy', content: '' } }] },
    'replacement-return': { title: 'Returns & Refunds', blocks: [{ key: 'page_content', type: 'page_content', order: 1, data: { heading: 'Returns & Refund Policy', content: '' } }] },
    'payments': { title: 'Payments', blocks: [{ key: 'page_content', type: 'page_content', order: 1, data: { heading: 'Payment Methods', content: '' } }] },
    'order-rejection-policy': { title: 'Order Rejection', blocks: [{ key: 'page_content', type: 'page_content', order: 1, data: { heading: 'Order Rejection Policy', content: '' } }] },
    'seller-help': { title: 'Seller Help', blocks: [{ key: 'page_content', type: 'page_content', order: 1, data: { heading: 'Seller Help Center', content: '' } }] },
    'sell-on-schoolmart': { title: 'Sell on SchoolMart', blocks: [{ key: 'page_content', type: 'page_content', order: 1, data: { heading: 'Sell on SchoolMart', content: '' } }] },
    'report-issue': { title: 'Report Issue', blocks: [{ key: 'page_content', type: 'page_content', order: 1, data: { heading: 'Report an Issue', content: '' } }] },
    'blog': { title: 'Blog', blocks: [{ key: 'page_hero', type: 'page_hero', order: 1, data: { badge: 'Insights', titleHtml: 'Our<br/><span class="text-sm-blue">Blog</span>', subtitle: 'Latest news and insights from the education sector' } }] },
    'delivery-locations': { title: 'Delivery Locations', blocks: [{ key: 'page_content', type: 'page_content', order: 1, data: { heading: 'Delivery Locations', content: '' } }] },
  };

  try {
    await sequelize.authenticate();
    console.log('Connected to Production.');
    for (const [slug, pageData] of Object.entries(INNER_PAGES)) {
       await CMSPage.findOrCreate({ where: { slug }, defaults: { title: pageData.title, slug } });
       for (const block of pageData.blocks) {
          await CMSBlock.findOrCreate({
            where: { pageSlug: slug, key: block.key },
            defaults: { ...block, pageSlug: slug, isVisible: true }
          });
       }
    }
    console.log('✅ ALL PAGES SYNCED TO PRODUCTION');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

seedAllProduction();
