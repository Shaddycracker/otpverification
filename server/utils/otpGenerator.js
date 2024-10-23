const otpGenerator = () => {
    let res = "";
    for(let i=0; i<4; i++){
        res += Math.floor(Math.random() * 9);
    }
    return res;
}

module.exports = otpGenerator;