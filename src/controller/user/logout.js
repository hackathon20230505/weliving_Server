import { redisClient } from "../../utils/cache.js";
import { promisify } from "util";

export const deleteToken = async (token, email) => {
    // Redis 클라이언트를 사용하여 토큰 블랙리스트 관리
    const delAsync = promisify(redisClient.del).bind(redisClient);
    try {
      // 토큰을 블랙리스트에 추가하여 유효성 검사 시 확인할 수 있도록 함
      await delAsync(email, token);

      return { success: true };
    } catch (err) {
      console.error("로그아웃 실패:", err);
      return { success: false };
    }
};

export const logout = async (req, res) => {

    const { token, email } = req.body;
    
    const result = await deleteToken(token, email);

    if (result.success) {
      res.status(200).json({ message: "로그아웃 되었습니다." });
    } else {
      res.status(500).json({ message: "로그아웃 실패" });
    }
  };