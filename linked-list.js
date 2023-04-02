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
		this.shuffled = false; // shuffled özelliği eklendi, biri denk gelirse karıştırama için
		this.correctPhotos = new Set(); // correctPhotos özelliği eklendi
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

			// Fotoğrafın tıklanma olayı eklendi
			img.addEventListener("click", () => {
				if (!this.correctPhotos.has(img.src)) { // Fotoğraf doğru yerde değilse işlem yap
					if (this.selected === null) {
						this.selected = img;
						img.classList.add("selected"); // Seçilen fotoğraf sarı çerçeveli hale getirildi
					} else {
						const selectedImg = this.selected;
						const temp = selectedImg.src;
						selectedImg.src = img.src;
						img.src = temp;
						selectedImg.classList.remove("selected"); // Önceki seçili fotoğrafın sarı çerçevesi kaldırıldı
						this.selected = null;
			
						if (this.correctPhotos.size === 7) { // Tüm fotoğraflar doğru yerdeyse karıştırma işlemi iptal ediliyor
							this.shuffled = true;
						}
					}
				}
			});

            const cell = document.createElement("td");
            cell.appendChild(img);
            row.appendChild(cell);
            count++;

            if (count % 4 === 0) {
                table.appendChild(row);
                row = document.createElement("tr");
            }

            current = current.next;
        }

        if (count % 4 !== 0) {
            table.appendChild(row);
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
			
	sortPhotos() {
		let current = this.head;
        let arr = [];

        // Copying nodes to an array
        while (current !== null) {
            arr.push(current);
            current = current.next;
        }


        // Sorting the array by data value
        arr.sort((a, b) => {
            if (a.data < b.data) {
                return -1;
            } else if (a.data > b.data) {
                return 1;
            } else {
                return 0;
            }
        });


        // Updating linked list with sorted nodes
        this.head = arr[0];
        this.tail = arr[arr.length - 1];
        for (let i = 0; i < arr.length - 1; i++) {
            arr[i].next = arr[i + 1];
        }
        arr[arr.length - 1].next = null;

		this.shuffled = false; // shuffled özelliği false olarak ayarlanıyor
	}
}
			
const photoList = new LinkedList();
photoList.addPhoto("bopeep_1.jpg");
photoList.addPhoto("bopeep_2.jpg");
photoList.addPhoto("bopeep_3.jpg");
photoList.addPhoto("bopeep_4.jpg");
photoList.addPhoto("bopeep_5.jpg");
photoList.addPhoto("bopeep_6.jpg");
photoList.addPhoto("bopeep_7.jpg");
photoList.addPhoto("bopeep_8.jpg");
photoList.addPhoto("bopeep_9.jpg");
photoList.addPhoto("bopeep_10.jpg");
photoList.addPhoto("bopeep_11.jpg");
photoList.addPhoto("bopeep_12.jpg");
photoList.addPhoto("bopeep_13.jpg");
photoList.addPhoto("bopeep_14.jpg");
photoList.addPhoto("bopeep_15.jpg");
photoList.addPhoto("bopeep_16.jpg");
photoList.displayPhotos("photo-container");

const shuffleBtn = document.getElementById("shuffle-btn");
shuffleBtn.addEventListener("click", function() {
    photoList.shufflePhotos();
    photoList.displayPhotos("photo-container");
});

const sortBtn = document.getElementById("sort-btn");
sortBtn.addEventListener("click", function() {
    photoList.sortPhotos();
    photoList.displayPhotos("photo-container");
});
    