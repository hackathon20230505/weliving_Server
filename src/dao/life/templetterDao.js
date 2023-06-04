//유서 작성
export const insert_tempLetter = async (connection, params) => {
    const tempcreate_query = `INSERT INTO TempLetter (title, content, createdAt, user_id) VALUES (?, ?, ?, ?)`;

    const [tempcreateResult] = await connection.query(tempcreate_query, params);

    return [tempcreateResult];
};

//임시 유서 리스트 조회
export const select_tempLetterList = async (connection, params) => {
    const templist_query = `SELECT letter_id,title,createdAt FROM TempLetter WHERE user_id = ?`;

    const [templistResult] = await connection.query(templist_query, params);

    return [templistResult];
};

//임시 유서 불러오기
export const select_tempLetter = async (connection, params) => {
    const tempshow_query = `SELECT title,content,createdAt FROM TempLetter WHERE letter_id = ? `;

    const [tempshowResult] = await connection.query(tempshow_query, params);

    return [tempshowResult];
};
