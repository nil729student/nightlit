import fs from 'fs/promises';
import path from 'path';

export const POST = async (req) => {
  try {
    // Obtenim les dades del formulari
    const formData = await req.formData();
    console.log(formData)
    const file = formData.get('file');
    const uploadPath = formData.get('path')
    console.log(uploadPath)

    // Validacióp del format
    if (!file || typeof file === 'string') {
      return new Response(
        JSON.stringify({ error: 'Cap fitxer rebut o format incorrecte' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Obtenim les dades del fitxer
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log('A quest es el directori', uploadPath)
    const uploadDir = path.join('public/uploads', uploadPath);

    // Assegurar que la carpeta d'uploads existeix
    await fs.mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, file.name);
    await fs.writeFile(filePath, buffer);

    // Retornem la URL del fitxerr
    const fileUrl = `/${uploadDir}/${file.name}`;
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