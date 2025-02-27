export async function uploadImage(file, path) {
    // 500KB = 1024 * 500
    const MAX_FILE_SIZE = 1024 * 500;

    try {
        if (file.size > MAX_FILE_SIZE) {
            throw new Error("La mida de la imatge és massa gran. El límit és de 500kb.");
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("path", path);
        console.log('Contingut del fixer:', formData);

        const response = await fetch("/api/uploadImage", {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Error pujant la imatge");
        }

        const data = await response.json();
        return data.url;
    } catch (error) {
        console.log(error);
        throw error; 
    }
}
