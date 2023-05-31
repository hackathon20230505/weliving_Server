import signInKakao from"../../utils/kakao.js";

export const kakao = async (req, res) => {
    const headers = req.headers["authorization"];
    const kakaoToken = headers.split(" ")[1];
    
    //테스트용
    // const kakaoToken = "UXqkrFHif23Y0KMQ6wP2rh9AGcFPSvhiFX_ydxcACiolUQAAAYhwSGuA";
    
    const accessToken = await signInKakao(kakaoToken);
    
    return res.status(200).json({ accessToken: accessToken });
};

export default kakao;