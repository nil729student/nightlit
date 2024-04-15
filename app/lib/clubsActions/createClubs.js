import fs from 'fs';
import prisma from '../prisma.js';

async function main() {
    try {
        const data = JSON.parse(fs.readFileSync('../../db/data.json', 'utf8'));

        for (const item of data.features) {
            const { properties, geometry } = item;
            const { '@id': nodeId, name, amenity, website, 'addr:street': addrStreet, 'addr:housenumber': addrHouseNumber } = properties;
            console.log(nodeId, name, website, addrStreet, addrHouseNumber)
            //const [longitude, latitude] = geometry.coordinates;
            //console.log(properties, geometry)
            const longitude = geometry.coordinates[0];
            const latitude = geometry.coordinates[1];

            console.log(nodeId, name, amenity, website, addrStreet, addrHouseNumber, latitude, longitude)

            try {
                await prisma.club.create({
                    data: {
                        nodeId,
                        amenity,
                        name,
                        website,
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