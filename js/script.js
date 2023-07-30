const input = document.querySelector("#input-file");
const dropZone = document.querySelector(".drop-zone");
const preview = document.querySelector(".preview__image");

const percentage = document.querySelector(".value-radius");
const radius = document.querySelector(".range");
const imgResult = document.querySelector(".download__image");
const download = document.querySelector(".download");


radius.addEventListener("input", (e) => {
    percentage.textContent = `${radius.value}%`;
})


dropZone.addEventListener("dragover", e => {
    e.preventDefault();
})


dropZone.addEventListener("drop", (e) =>{
    e.preventDefault();
    
    dropZone.style.display = "none";
    
    const files = e.dataTransfer.files;
    const fragment = document.createDocumentFragment();
    
    for (const file of files){
        const img = document.createElement("img");
        const imgFinal = new Image();
        
        const reader = new FileReader();
        reader.readAsDataURL(file)
        
        reader.addEventListener("load", e => {
            img.classList.add("img-preview");
            img.setAttribute("src", e.target.result);

            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            ctx.drawImage(imgFinal, 0, 0);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            

            imgFinal.src = reader.result;
            imgFinal.classList.add("img-download");
            // imgFinal.setAttribute("src", e.target.result);            
        })
        



        radius.addEventListener("input", () => {
            // imgFinal.style.borderRadius = `${percentage.textContent}`;
        })

        
        fragment.appendChild(img)
        imgResult.appendChild(imgFinal);


        download.addEventListener("click", (e) => {
            download.setAttribute("download", "rounded");
            download.setAttribute("href", imgFinal.getAttribute("src"));           
        })


    }
    
    preview.style.display = "flex";
    preview.appendChild(fragment);
})




/*
input.addEventListener("change", e => {
    const files = e.target.files;
    const fragment = document.createDocumentFragment();
    
    for (const file of files){
        const filePreview = document.createElement("div");
        const img = document.createElement("img");
        const text = document.createElement("p");
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", e => {
            filePreview.classList.add("file-preview");
            img.setAttribute("src", e.target.result);
            text.textContent = file.name;
            filePreview.appendChild(img);
            filePreview.appendChild(text);
        })
        fragment.appendChild(filePreview)
    }
    preview.style.display = "flex";
    preview.appendChild(fragment);
}) */


