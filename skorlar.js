const data = [
    { playerName: "Ahmet", score: 120 },
    { playerName: "Mehmet", score: 90 },
    { playerName: "Ayşe", score: 200 },
    { playerName: "Fatma", score: 150 }
  ];
  
  // Skora göre sıralama
  data.sort((a, b) => b.score - a.score);
  
  // Tablo satırlarını oluşturma
  const tableRows = data.map(item => {
    return `
      <tr>
        <td>${item.playerName}</td>
        <td>${item.score}</td>
      </tr>
    `;
  });
  
  // Tablo satırlarını HTML içine ekleyerek gösterme
  const playerList = document.getElementById("player-list");
  playerList.innerHTML = tableRows.join("");