const LOGDOWNLOAD = 'LOGDOWNLOAD';
const today = `TODAYCODE-${(new Date()).toISOString().substring(0,10)}`;

let win = localStorage.getItem('win') || 0;
let lose = localStorage.getItem('lose') || 0;

console.log('basic extension!')
setTimeout(() => {
    document.querySelector('.bet-button')?.addEventListener('click', e=> {
        const tabElement = document.querySelectorAll('.game-data .left-data div.latest .tabs-navs button')[1];
        if(tabElement.classList[1] == 'is-active') {
            setTimeout(() => {
                const tds = document.querySelectorAll('.game-data .left-data div.latest tbody td')
                let betId = tds[0].innerText;
                let betAmount = tds[1].innerText;
                let time = tds[2].innerText;
                let payout = tds[3].innerText;
                let profit = tds[4].innerText;
                let isWin = tds[4].className.substr(14) == 'win';
    
                if (profit[0] != '+') profit = `-${profit}`;
    
                isWin ? win++ : lose++;
                isWin ? localStorage.setItem('win', win) : localStorage.setItem('lose', lose);

                const logString = `${betId}-${payout}-${isWin ? '|' : 'O'}`
                console.log(logString, `w-${win} l-${lose} ${(lose / (win+lose) * 100).toFixed(2)}%`)
    
                const storeString = `${isWin},${betId},${time},${payout},${betAmount},${profit}`
                localStorage.setItem(today, JSON.parse(JSON.stringify(`${storeString}\n${localStorage.getItem(today) ? localStorage.getItem(today) : ''}`)))
            }, 200);
        }
    })
}, 5000);    

const newAnchor = document.createElement('a');
document.querySelector('body').appendChild(newAnchor);

document.addEventListener('logDownload', event=> {
    var json = localStorage.getItem(today);
    blob = new Blob([json], {type: "octet/stream"});
    url = window.URL.createObjectURL(blob);

    newAnchor.href = url;
    newAnchor.download = `${today}.csv`;
    newAnchor.target = '_blank';
    
    var evt = document.createEvent("MouseEvents"); 
    evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
    var allowDefault = newAnchor.dispatchEvent(evt);
    localStorage.setItem(today,'');
})

// Run this command to downlad log file
// document.dispatchEvent(new Event('logDownload'))

document.addEventListener('autoForever', event=> {
    setInterval(() => {
        const runBtn = document.querySelector('div.actions .s-conic2 .button-inner');
        const status = runBtn.innerText;
        console.log('check if it is running...');
        if (runBtn.innerText != 'Stop') {
            var evt = document.createEvent("MouseEvents"); 
            evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null); 
            runBtn.dispatchEvent(evt);
            setTimeout(() => {
                const confirmBtn = document.querySelector('.ui-pop-overlayer > div:last-child .btns button:last-child');
                confirmBtn.dispatchEvent(evt)
                console.log('restarted!')
            }, 1000);
        }    
    },10000)
})