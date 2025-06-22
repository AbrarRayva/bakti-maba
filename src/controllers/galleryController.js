const galleryIndex = async (req, res) => {
    try {
        const buildings = [
            {
                name: 'Gedung Rektorat',
                description: 'Pusat administrasi dan rektorat Universitas Andalas.',
                image: '/images/building-gallery/rektorat.jpg',
                category: 'Administrasi',
                year: '1955',
                location: 'Kampus Limau Manis'
            },
            {
                name: 'Fakultas Teknik',
                description: 'Mencetak insinyur-insinyur handal dengan fasilitas modern.',
                image: '/images/building-gallery/teknik.jpg',
                category: 'Fakultas',
                year: '1985',
                location: 'Kampus Limau Manis'
            },
            {
                name: 'Perpustakaan Pusat',
                description: 'Jantung pengetahuan universitas dengan koleksi ribuan buku.',
                image: '/images/building-gallery/perpustakaan.jpg',
                category: 'Fasilitas',
                year: '2002',
                location: 'Kampus Limau Manis'
            },
            {
                name: 'Fakultas Teknologi Informasi',
                description: 'Fakultas yang berfokus pada pengembangan teknologi dan inovasi digital.',
                image: '/images/building-gallery/teknologi-informasi.jpg',
                category: 'Fakultas',
                year: '2012',
                location: 'Kampus Limau Manis'
            }
        ];
        
        res.render('galeri/index', {
            pageTitle: 'Galeri Gedung Universitas Andalas',
            buildings: buildings
        });
        
    } catch (error) {
        console.error('Error loading gallery:', error);
        res.status(500).send('Terjadi kesalahan saat memuat galeri');
    }
};

module.exports = {
    galleryIndex
}; 