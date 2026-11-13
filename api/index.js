const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = async (req, res) => {
  try {
    // 1. CREATE
    const kategoriBaru = await prisma.categories.create({ 
      data: { name: 'Fiksi Ilmiah' } 
    });
    
    // 2. READ
    const semuaKategori = await prisma.categories.findMany();
    
    // 3. UPDATE
    const kategoriUpdate = await prisma.categories.update({
      where: { id: kategoriBaru.id },
      data: { name: 'Fiksi & Fantasi' },
    });

    // 4. DELETE
    const kategoriHapus = await prisma.categories.delete({
      where: { id: kategoriBaru.id },
    });

    // Kirim hasil ke browser
    res.status(200).json({
      message: "CRUD Berhasil!",
      data: { kategoriBaru, semuaKategori, kategoriUpdate, kategoriHapus }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    await prisma.$disconnect();
  }
};
