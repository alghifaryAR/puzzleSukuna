const puzzleArea = document.getElementById("puzzle-area");
const btnAcak = document.getElementById("btn-acak");
const btnReset = document.getElementById("btn-reset");
const suksesMessage = document.getElementById("sukses");
const suksesGambar = document.getElementById("sukses-gambar");

// Gambar puzzle (ubah dengan gambar Anda)
const gambar = [
  "1.jpeg",
  "2.jpeg",
  "3.jpeg",
  "4.jpeg",
  "5.jpeg",
  "6.jpeg",
  "7.jpeg",
  "8.jpeg",
  "9.jpeg",
  "10.jpeg",
  "11.jpeg",
  "12.jpeg",
];

// Posisi awal potongan
let positions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

// Fungsi untuk mengacak posisi potongan saat memuat permainan
function shufflePositions() {
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }
}

// Menampilkan potongan puzzle
function displayPuzzle() {
  puzzleArea.innerHTML = ""; // Menghapus konten sebelumnya

  for (let i = 0; i < positions.length; i++) {
    const div = document.createElement("div");
    if (positions[i] !== 11) {
      div.textContent = positions[i] + 1; // Tampilkan nomor urut
      div.style.backgroundImage = `url(images/${gambar[positions[i]]})`; // Atur gambar
    } else {
      div.style.background = "#fff"; // Kotak kosong
    }
    div.dataset.index = i; // Menyimpan indeks potongan
    puzzleArea.appendChild(div);
  }
}

// Acak potongan puzzle
function acakPuzzle() {
  // Mengacak posisi potongan
  for (let i = positions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [positions[i], positions[j]] = [positions[j], positions[i]];
  }

  displayPuzzle(); // Tampilkan puzzle yang diacak
}

// Memeriksa kemenangan
function checkWin() {
  for (let i = 0; i < positions.length; i++) {
    if (positions[i] !== i) {
      return false;
    }
  }
  return true;
}

// Menampilkan pesan selamat
function showCongratulation() {
  if (checkWin()) {
    puzzleArea.style.display = "none";
    btnAcak.style.display = "none";
    btnReset.style.display = "none";
    suksesMessage.style.display = "block";
    suksesGambar.src = "images/sukses1.jpeg"; // Atur gambar sukses
  }
}

// Menangani klik potongan puzzle
function handlePuzzleClick(event) {
  const clickedDiv = event.target;
  if (clickedDiv.dataset.index) {
    const index = parseInt(clickedDiv.dataset.index);
    let blankIndex = positions.indexOf(11);

    // Tukar posisi potongan yang diklik dengan potongan kosong
    const validMoves = [index - 1, index + 1, index - 3, index + 3];
    if (
      validMoves.includes(blankIndex) &&
      !(index % 3 === 2 && blankIndex % 3 === 0) &&
      !(index % 3 === 0 && blankIndex % 3 === 2)
    ) {
      [positions[index], positions[blankIndex]] = [
        positions[blankIndex],
        positions[index],
      ];
      displayPuzzle();

      // Periksa kemenangan dan tampilkan pesan selamat
      showCongratulation();
    }
  }
}

// Menambahkan event listener untuk klik dan sentuhan pada puzzle
puzzleArea.addEventListener("click", handlePuzzleClick);
puzzleArea.addEventListener("touchstart", handlePuzzleClick);

// Menambahkan event listener untuk tombol acak
btnAcak.addEventListener("click", function () {
  acakPuzzle();
});

// Menambahkan event listener untuk tombol reset
btnReset.addEventListener("click", function () {
  positions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  displayPuzzle();
  puzzleArea.style.display = "grid";
  btnAcak.style.display = "inline-block";
  btnReset.style.display = "inline-block";
  suksesMessage.style.display = "none";
  suksesGambar.src = ""; // Reset gambar sukses
});

// Memulai permainan dengan menampilkan puzzle awal
shufflePositions(); // Mengacak posisi potongan saat memuat permainan
displayPuzzle(); // Menampilkan puzzle pada awal permainan
