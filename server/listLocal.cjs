const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

async function listLocalPages() {
  const sequelize = new Sequelize('schoolmart', 'postgres', 'Ankit@191', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
  });

  const CMSPage = sequelize.define('CMSPage', {
    slug: { type: DataTypes.STRING, unique: true, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false }
  }, { tableName: 'CMSPages' });

  try {
    await sequelize.authenticate();
    const pages = await CMSPage.findAll();
    console.log(`--- FOUND ${pages.length} PAGES IN LOCAL DB ---`);
    pages.forEach(p => console.log(`- ${p.title} (${p.slug})`));
    console.log('------------------------------------------');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

listLocalPages();
