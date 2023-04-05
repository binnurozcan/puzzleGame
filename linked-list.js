class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
		this.selected = null; // selected özelliği eklendi	
        this.moveCount = 0; // hamle sayısı özelliği eklendi
        this.shuffled = false;	
        
	}

    addPhoto(photo) {
        const node = new Node(photo);
        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }
    }

    displayPhotos(containerId) {
        let current = this.head;
        const container = document.getElementById(containerId);

        const table = document.createElement("table");
        let row = document.createElement("tr");
        let count = 0;

        while (current !== null) {
            const img = document.createElement("img");
            img.src = current.data;

            const cell = document.createElement("td");
            cell.appendChild(img);
            row.appendChild(cell);
            count++;

            if (count % 4 === 0) {
                table.appendChild(row);
                row = document.createElement("tr");
            }

            current = current.next;
            
            
			// Fotoğrafın tıklanma olayı eklendi
			img.addEventListener("click", () => {
               
                if (this.selected === null) {
                    this.selected = img;
                } else {
                    const selectedImg = this.selected;
                    const temp = selectedImg.src;
                    selectedImg.src = img.src;
                    img.src = temp;
                    this.selected = null;
                    this.moveCount++; // hamle sayısı artırılıyor
                    const moveCountElement = document.getElementById("move-count");
                    moveCountElement.innerHTML = this.moveCount.toString();
                }
                                
            });

            
        }

        container.innerHTML = "";
        container.appendChild(table);

        
        
    }

    shufflePhotos() {		
		let current = this.head;
		let arr = [];
        
			
		// Copying photo links to an array
		while (current !== null) {
			arr.push(current.data);
			current = current.next;
		}
			
		// Shuffling the array
		for (let i = arr.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[arr[i], arr[j]] = [arr[j], arr[i]];
		}
			
		// Updating nodes with shuffled links
		current = this.head;
		let i = 0;
		while (current !== null) {
			current.data = arr[i];
			current = current.next;
			i++;
		}
			
		this.shuffled = true; // shuffled özelliği true olarak ayarlanıyor 
        
    }

    

}


const photoList = new LinkedList();
const piecesCount = 16;
const fileInput = document.getElementById("file-input");
fileInput.addEventListener("change", function() {
    const playerName = window.prompt("Lütfen isminizi girin:");
    const file = fileInput.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function(event) {
        const img = new Image();
        img.src = event.target.result;
        img.onload = function() {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            const pieceWidth = img.width / 4;
            const pieceHeight = img.height / 4;
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);

            for (let i = 0; i < 4; i++) {
                for (let j = 0; j < 4; j++) {
                    const nodeCanvas = document.createElement("canvas");
                    nodeCanvas.width = pieceWidth;
                    nodeCanvas.height = pieceHeight;
                    const nodeCtx = nodeCanvas.getContext("2d");
                    nodeCtx.drawImage(canvas, j * pieceWidth, i * pieceHeight, pieceWidth, pieceHeight, 0, 0, pieceWidth, pieceHeight);
                    const nodeDataUrl = nodeCanvas.toDataURL();
                    photoList.addPhoto(nodeDataUrl);
                }
            }

            photoList.displayPhotos("photo-container");            
        };
    };


    const endBtn = document.getElementById("end-btn");
    endBtn.addEventListener("click", function() {
        const moveCount = photoList.moveCount;
        alert("Kullanıcı adı: "+playerName +"\n" +"Hamle sayısı: "+moveCount);
        
        
        
    });
    
});





const shuffleBtn = document.getElementById("shuffle-btn");
shuffleBtn.addEventListener("click", function() {
    photoList.shufflePhotos();
    photoList.displayPhotos("photo-container");
});



