import Cache from "memory-cache";


export const verifyMessage = async(req,res) => {

try {
    
    let { phoneNumber } = req.body;
    let formattedPhoneNumber = phoneNumber.replace(/-/g, '');
    const { verifyCode } = req.body;    

    const CacheData = Cache.get(formattedPhoneNumber);

    if (!CacheData) {
        return res.json(" msg: 핸드폰 번호를 입력해주세요. ");
      } else if (CacheData !== verifyCode) {
          return res.json(" msg : 입력하신 인증번호와 일치하지 않습니다. ");
      } else {
        return res.status(200).send({
            ok: true,
            msg: " 인증이 완료되었습니다. ",
        });      }
} catch(err) {
    res.status(409).send({
        ok: false,
        msg: err.message,
    })
}


}
