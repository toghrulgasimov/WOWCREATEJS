function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(s) {
    let ans = "";
    let j, x, i;
    let a = s.split('');
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    ans = a.join();
    return ans;
}

module.exports = {
    shuffle : shuffle,
    getRandom : getRandom
}