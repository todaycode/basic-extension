const LOGDOWNLOAD = 'LOGDOWNLOAD';
const today = `TODAYCODE-${(new Date()).toISOString().substring(0,10)}`;

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
                let winOrLose = tds[4].className.substr(14);
    
                if (profit[0] != '+') profit = `-${profit}`;
    
    
                const logString = `${betId}-${payout}-${winOrLose == 'win' ? '|' : 'O'}`
                console.log(logString)
    
                const storeString = `${winOrLose},${betId},${time},${payout},${betAmount},${profit}`
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