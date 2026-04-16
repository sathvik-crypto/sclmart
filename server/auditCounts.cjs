const { Sequelize } = require('sequelize');

async function audit() {
  const s = new Sequelize('postgresql://postgres:AnkvVIDqtWkaFfhvhlwMBOmDHBRAtxxf@metro.proxy.rlwy.net:21904/railway', {
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });

  try {
    const [cmsPages] = await s.query('SELECT count(*) FROM "CMSPages"');
    const [pageTable] = await s.query('SELECT count(*) FROM "Page"').catch(() => [[{count: 'N/A'}]]);
    console.log(`CMSPages Count: ${cmsPages[0].count}`);
    console.log(`Page Table Count: ${pageTable[0].count}`);
    
    if (cmsPages[0].count == 44) {
        console.log('SUCCESS: CMSPages has all 44 entries.');
    }
  } catch (err) {
    console.error(err.message);
  } finally {
    await s.close();
  }
}

audit();
