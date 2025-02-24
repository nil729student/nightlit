import fs from 'fs';
import prisma from '../prisma.js';

// per executar a questa funcionalitat haurem de insertar la propietat "type": module al package.json llavors anar a la ruta: cd ./app/lib/clubsActions i execuatr node createClubs.js
// Funció per carregar les dades a la base de dades del jon extret de la api: openstreetmap
async function main() {
    try {
        const data = JSON.parse(fs.readFileSync('../../db/data.json', 'utf8'));

        for (const item of data.features) {
            const { properties, geometry } = item;
            const { '@id': nodeId, name, amenity, website, 'addr:region': region, 'addr:city': addrCity, 'addr:street': addrStreet, 'addr:housenumber': addrHouseNumber } = properties;
            //const [longitude, latitude] = geometry.coordinates;
            //console.log(properties, geometry)
            const longitude = geometry.coordinates[0];
            const latitude = geometry.coordinates[1];


            try {

                await prisma.club.create({
                    data: {
                        nodeId,
                        amenity,
                        name,
                        website,
                        region,
                        addrCity,
                        addrStreet,
                        addrHouseNumber,
                        longitude,
                        latitude,
                    },
                });

            } catch (error) {
                console.error('An error occurred:', error);
                throw error;

            }


        }
    } catch (error) {
        console.error('An error occurred:', error);
        throw error;
    } finally {
        await prisma.$disconnect();
    }
}

main().catch((error) => {
    console.error('An unhandled error occurred:', error);
});