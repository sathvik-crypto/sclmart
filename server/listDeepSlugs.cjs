const { Sequelize } = require('sequelize');

async function listSlugs() {
  const s = new Sequelize('postgresql://postgres:AnkvVIDqtWkaFfhvhlwMBOmDHBRAtxxf@metro.proxy.rlwy.net:21904/railway', {
    logging: false,
    dialectOptions: { ssl: { require: true, rejectUnauthorized: false } }
  });

  try {
    const [rows] = await s.query('SELECT slug FROM "CMSPages"');
    console.log('--- SLUGS IN RAW CMSPages ---');
    rows.forEach(r => console.log(r.slug));
    console.log('----------------------------');
    
    const [rows2] = await s.query('SELECT slug FROM "Page"').catch(() => [[]]);
    console.log('--- SLUGS IN RAW Page ---');
    rows2.forEach(r => console.log(r.slug));
    console.log('----------------------------');

  } catch (err) {
    console.error(err.message);
  } finally {
    await s.close();
  }
}

listSlugs();
