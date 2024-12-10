export async function uploadImage(file, path) {
    try{
        const formData = new FormData();
        formData.append("file", file);
        formData.append("path", path);
        console.log(formData)
    
        const response = await fetch("/api/uploadImage", {
            method: "POST",
            body: formData,
        });
    
        if (!response.ok) {
            throw new Error("Error pujant la imatge");
        }
    
        const data = await response.json();
        return data.url; // Retorna l'URL de la imatge pujada
    } catch(error){
        console.log(error)
    }
}
