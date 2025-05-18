document.addEventListener("DOMContentLoaded", () => {
    const player1NameInput = document.getElementById("player1Name");
    const player2NameInput = document.getElementById("player2Name");
    const startBtn = document.getElementById("startBtn");

    const numbersDisplay = document.getElementById("numbers");
    const resultDisplay = document.getElementById("result");
    const playerTurnDisplay = document.getElementById("player-turn");
    const roundInfoDisplay = document.getElementById("round-info");
    const answerInput = document.getElementById("answerInput");
    const submitBtn = document.getElementById("submitBtn");
    const totalDisplay = document.getElementById("total");

    let scores = {};
    let round = 1;
    let currentPlayer;
    let player1Name, player2Name;
    let startTime;
    let correctAnswer;

    function showPopup(message, callback) {
        const popup = document.createElement("div");
        popup.innerHTML = `<div style="
            position: fixed; top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0, 0, 0, 0.8); display: flex;
            justify-content: center; align-items: center;
            color: white; font-size: 24px;">
            <div style="text-align: center;">
                <p>${message}</p>
                <button id="continueBtn" style="font-size: 20px; padding: 10px; margin-top: 10px;
                    background: #ffcc00; border: none; cursor: pointer;">Continue</button>
            </div>
        </div>`;

        document.body.appendChild(popup);
        document.getElementById("continueBtn").addEventListener("click", () => {
            popup.remove();
            callback();
        });
    }

    startBtn.addEventListener("click", () => {
        player1Name = player1NameInput.value.trim();
        player2Name = player2NameInput.value.trim();

        if (!player1Name || !player2Name) {
            alert("Please enter names for both players!");
            return;
        }

        scores[player1Name] = [];
        scores[player2Name] = [];

        player1NameInput.style.display = "none";
        player2NameInput.style.display = "none";
        startBtn.style.display = "none";
        roundInfoDisplay.style.display = "block";
        playerTurnDisplay.style.display = "block";
        numbersDisplay.style.display = "block";
        answerInput.style.display = "block";
        submitBtn.style.display = "block";
        totalDisplay.style.display = "block";

        currentPlayer = player1Name; // Player 1 starts first
        showPopup(`🟢 ${player1Name}'s Turn!`, generateNumbers);
    });

    function generateNumbers() {
        const num1 = Math.floor(Math.random() * 10) + 1;
        const num2 = Math.floor(Math.random() * 10) + 1;
        correctAnswer = num1 + num2;
        numbersDisplay.textContent = `Numbers: ${num1} + ${num2}`;
        startTime = Date.now();
    }

    function checkAnswer() {
        const playerAnswer = Number(answerInput.value);
        const timeTaken = Date.now() - startTime;

        if (playerAnswer === correctAnswer) {
            resultDisplay.textContent = `✅ Correct! (Time: ${timeTaken} ms)`;
            scores[currentPlayer].push(timeTaken);
        } else {
            resultDisplay.textContent = "❌ Wrong Answer!";
        }

        round++;

        if (round > 3 && currentPlayer !== player2Name) {
            showPopup(`🔵 ${player2Name}'s Turn!`, () => {
                currentPlayer = player2Name;
                round = 1;
                generateNumbers();
            });
        } else if (round > 3 && currentPlayer === player2Name) {
            let avgTime1 = scores[player1Name].reduce((a, b) => a + b, 0) / 3;
            let avgTime2 = scores[player2Name].reduce((a, b) => a + b, 0) / 3;

            let winner = avgTime1 < avgTime2 ? player1Name : player2Name;
            setTimeout(() => {
                showPopup(`🏆 ${winner} wins! Fastest avg time: ${Math.min(avgTime1, avgTime2)} ms`, () => {});
            }, 500);
            return;
        } else {
            showPopup(`Next Round! ${currentPlayer}, get ready!`, generateNumbers);
        }

        playerTurnDisplay.textContent = `Current Player: ${currentPlayer}`;
        roundInfoDisplay.textContent = `Round: ${round} / 3`;
        answerInput.value = "";
    }

    submitBtn.addEventListener("click", checkAnswer);
});
