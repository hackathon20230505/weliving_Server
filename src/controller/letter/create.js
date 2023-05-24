import pool from "../../config/database.js";


const create = async (req, res) => {
    //현재 날짜 불러오기
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);

    //데이터 할당
    const [title, content] = req.body; //req.body.title, req.body.content
    const createdAt = today.toISOString().slice(0, 10);
    const [isTemp, isShare] = ['1', '1']; //1==true, 0==false
    const [user_id] = req.id; //미들웨어에서 req.id로 사용자의 아이디를 받아옴
    const params = [title, content, createdAt, isTemp, isShare, user_id];

    const create_query = `INSERT INTO hackathon.Letter (title, content, createdAt, isTemp, isShare, user_id) VALUES (?, ?, ?, ?, ?, ?)`;

    // db
    try {
        //쿼리 실행
        const data = await pool.query(create_query, params,
            (err, result) => {
                if (err) {
                    console.log('SQL Error');
                    res.render('/');
                    return;
                }
                if (result) {
                    console.log('Inserted 성공')
                    console.log(paramId + ' ' + paramName + ' ' + paramPNumber + ' ' + paramPassword)
                    res.json('Insert succeed!');
                    return;
                }else{
                    console.log('Inserted 실패');
                    res.render('/');
                }
            })
    } catch (error) {
        console.log("error");
        return res.json(error);
    }
};

export default create;