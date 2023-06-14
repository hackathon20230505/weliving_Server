import dotenv from 'dotenv';
dotenv.config();
import aligoapi from "aligoapi"
import  Cache  from 'memory-cache';

var AuthData = {

	// (알리고셋팅 - 발급키)
    key: 'ugowt50ts7lw7n19lpc6vitrsgnumqol',
    
    // (알리고셋팅 - IdenTifier)
    user_id: 'cowardlion',
}


export const sendmessage = async (req, res) => {

  var result = false;

  const phoneNumber = req.body.phoneNumber; // phoneNumber 값을 받아옴
  Cache.del(phoneNumber);


  const authenticationCode = Math.floor(Math.random() * (999999 - 100000)) + 100000;
  Cache.put(phoneNumber, authenticationCode.toString());
  
  req.body = {
      /*** 필수값입니다 START ***/
      sender: '01026509997', // (최대 16bytes) 발신번호(알리고셋팅에서 설정한 발신번호)
      receiver: `${phoneNumber}`, // 컴마()분기 입력으로 최대 1천명
      msg: `[Well-Living] SMS 인증번호 [${authenticationCode}] 를 입력해주세요 `	// (1~2,000Byte)
      /*** 필수값입니다 END ***/
      //   msg_type: SMS(단문), LMS(장문), MMS(그림문자)
      //   title: 문자제목(LMS, MMS만 허용) // (1~44Byte)
      //   destination: %고객명% 치환용 입력
      //   rdate: 예약일(현재일이상) // YYYYMMDD
      //   rtime: 예약시간-현재시간기준 10분이후 // HHMM
      //   image: 첨부이미지 // JPEG, PNG, GIF
  }
  // req.body 요청값 예시입니다.

  await aligoapi.send(req, AuthData)
  .then((r) => {
    res.send(r)
  })
  .catch((e) => {
    res.send(e)
  })
}
