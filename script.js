// Function to announce scores using Text-to-Speech
function announceScores() {
    const speech = new SpeechSynthesisUtterance();
    let announcement = "Scores: ";

    // Generate the score announcement
    for (let i = 1; i <= playerCount; i++) {
        const playerName = document.getElementById(`player${i}`).value || `Player ${i}`;
        const totalScore = scores[i - 1];
        announcement += `${playerName} has ${totalScore} points. `;
    }

    // Set the speech properties
    speech.text = announcement;
    speech.lang = 'en-US';
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;

    // Speak the announcement
    window.speechSynthesis.speak(speech);
}

// Add Round Logic (with score announcement)
function addRound() {
    roundCount++;

    // Create new row for the current round
    const roundRow = document.createElement('tr');
    roundRow.innerHTML = `<td>Round ${roundCount}</td>`;

    for (let i = 1; i <= playerCount; i++) {
        const bid = document.getElementById(`bid${i}`).value;
        const result = document.getElementById(`result${i}`).value;
        let currentRoundResult = 0;

        if (isBlind[i - 1]) {
            // Blind Mode Calculation
            const bidInt = parseInt(bid);
            const resultInt = parseInt(result);
            
            if (bidInt === resultInt) {
                currentRoundResult = bidInt * 2;
            } else if (bidInt > resultInt) {
                currentRoundResult = -(bidInt * 2);
            } else if (bidInt < resultInt) {
                currentRoundResult = (bidInt * 2) - (resultInt - bidInt);
            }
            
            if (bidInt === 0 && resultInt === 0) {
                currentRoundResult = 20;
            }
            if (bidInt === 0 && resultInt > 0) {
                currentRoundResult = -20;
            }

        } else {
            // Standard Mode Calculation
            const bidInt = parseInt(bid);
            const resultInt = parseInt(result);

            if (bidInt === resultInt) {
                currentRoundResult = bidInt;
            } else if (bidInt > resultInt) {
                currentRoundResult = -bidInt;
            } else if (bidInt < resultInt) {
                currentRoundResult = bidInt - (resultInt - bidInt);
            }
            
            if (bidInt === 0 && resultInt === 0) {
                currentRoundResult = 10;
            }
            if (bidInt === 0 && resultInt > 0) {
                currentRoundResult = -10;
            }
        }

        // Update the player score
        scores[i - 1] += currentRoundResult;
        const scoreCell = document.getElementById(`totalScore${i}`);
        scoreCell.textContent = scores[i - 1];
        roundRow.innerHTML += `<td>${currentRoundResult}</td>`;
    }

    // Append the round row to the table
    document.getElementById('scoreTable').appendChild(roundRow);

    // Announce the updated scores
    announceScores();
}
