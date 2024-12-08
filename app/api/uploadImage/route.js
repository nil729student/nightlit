import fs from 'fs/promises';
import path from 'path';

export const POST = async (req) => {
  try {
    // Obtenim les dades del formulari
    const formData = await req.formData();
    const file = formData.get('file');

    // Validacióp del format
    if (!file || typeof file === 'string') {
      return new Response(
        JSON.stringify({ error: 'Cap fitxer rebut o format incorrecte' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtenim les dades del fitxer
    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), 'public/uploads/usersProfileImages');

    // Assegurar que la carpeta d'uploads existeix
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);

    // Retornem la URL del fitxerr
    const fileUrl = `/uploads/usersProfileImages/${file.name}`;
    return new Response(JSON.stringify({ imageUrl: fileUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error pujant la imatge:', error);
    return new Response(
      JSON.stringify({ error: 'Error processant la pujada' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
