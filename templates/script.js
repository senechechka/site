let stavka = 10;
let balance = 7550;
let win = 0;
document.getElementById('stavka').innerText = stavka;
document.getElementById('balance').innerText = balance;
let stats = {wins: 0, loses: 0};
let transactions = [];

let allEarn = 0;
let passivEarn = 100;
let passivInt;
let minerOneCount = 0;
let minerTwoCount = 0;
let minerThreeCount = 0;
let gameInt = null;
let prize = 0;
let stavkaAdd = 0;

document.getElementById('passivEarn').innerText = 0;

let addToDepStatus = false; 
let addToLoseStatusPer = false;
let addToLoseStavka = null;

console.clear();

function addToDep() {
    if (!addToDepStatus) {
        if (balance >= 3000) {
            balance -= 3000;
            document.getElementById('balance').innerText = balance;
            prize = 300;
            addToDepStatus = true;
        } else {
            document.getElementById('result').innerText = "❌Недостаточно денег";
        }
    }
}

function showInfo() {
    console.clear();
    console.log(stats);
    console.log(transactions);
}

function stavkaChange(count) {
    stavka = count;
    document.getElementById('stavka').innerText = stavka;
}

function addToLose() {
    if (addToLoseStatusPer) {
        if (stavka === 5) stavkaAdd = 2.5;
        else if (stavka === 10) stavkaAdd = 5;
        else if (stavka === 20) stavkaAdd = 10;
        else if (stavka === 50) stavkaAdd = 25;
    }
}

function addToLoseStatus() {
    if (!addToLoseStatusPer) {
        if (balance >= 7500) {
            balance -= 7500;
            addToLoseStatusPer = true;
            document.getElementById('balance').innerText = balance;
        } else {
            document.getElementById('result').innerText = "❌Недостаточно денег";
        }
    }
}

function krutit() {
    win = stavka*10;
    if (balance < stavka) {
        document.getElementById('result').innerText = "❌Недостаточно денег";
        return;
    } else if (balance >= stavka) {
        let random = Math.floor(Math.random() * 100);

        balance -= stavka;

        if (random < 15) {
            balance += win+prize;
            document.getElementById('result').innerText = "😃Вы выиграли";
            stats.wins++;
            let winStats = win+prize;
            transactions.unshift('+' + winStats);
            showInfo();
        } else {
            if (addToLoseStatusPer) {
                balance += stavkaAdd;
            }
            document.getElementById('result').innerText = "😪Вы проиграли, додепывай";
            document.getElementById('balance').innerText = balance;
            stats.loses++;
            transactions.unshift('-' + reLoos);
            showInfo();
        }
    }
document.getElementById('balance').innerText = balance;
}

function AllIn() {
    let oldBalance = balance;
    let maxWin = 10*balance;
    let randomAll = Math.floor(Math.random() * 10)
    if (balance > 0) {
        balance -= balance;
        if (randomAll === 4 || randomAll === 7) {
            balance += maxWin;
            document.getElementById('result').innerText = "😁Вы выиграли макс ставку!";
            stats.wins++;
            transactions.unshift('+' + maxWin);
            showInfo();
        } else {
            document.getElementById('result').innerText = "🙁Вы проиграли все.";
            stats.loses++;
            transactions.unshift('-' + oldBalance);
            showInfo();
        }
    } else {
        document.getElementById('result').innerText = "❌Недостаточно денег";
    }
    document.getElementById('balance').innerText = balance;
}

function miner(lvl) {
    const prices = [0, 1000, 5000, 15000];
    const maxCount = 3;

    if (prices[lvl] > 0 && balance >= prices[lvl] && (lvl === 1 ? minerOneCount : lvl === 2 ? minerTwoCount : minerThreeCount) < maxCount) {
        balance -= prices[lvl];
        document.getElementById('balance').innerText = balance;

        if (lvl === 1) {
            minerOneCount++;
        } else if (lvl === 2) {
            minerTwoCount++;
        } else if (lvl === 3) {
            minerThreeCount++;
        }

        if (!gameInt) {
            gameInt = setInterval(function () {
                let totalEarn = (minerOneCount*100 + minerTwoCount*150 + minerThreeCount*350);
                balance += totalEarn;
                allEarn += totalEarn;
                document.getElementById('balance').innerText = balance;
                document.getElementById('passivEarn').innerText = totalEarn;
            }, 2250)
        }
    }
}

console.log(transactions)
console.log(stats)