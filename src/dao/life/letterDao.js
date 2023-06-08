//유서 작성
export const insert = async (connection, params) => {
    const create_query = `INSERT INTO Letter (title, content, createdAt, isShare, user_id) VALUES (?, ?, ?, ?, ?)`;

    const [createResult] = await connection.query(create_query, params);

    return [createResult];
};

//유서 리스트 조회
export const select_LetterList = async (connection, params) => {
    const list_query = `SELECT letter_id,title,createdAt FROM Letter
    WHERE user_id = ANY(
        SELECT user_id FROM User WHERE birth LIKE '__?%'
    ) 
    AND isShare=1`;

    const [listResult] = await connection.query(list_query, params);

    return [listResult];
};

//user_id로 유서 가져오기 (내 유서보기)
export const select_userid_Letter = async (connection, params) => {
    const show_query = `SELECT title,content,createdAt FROM Letter WHERE user_id = ? `;

    const [showResult] = await connection.query(show_query, params);

    return [showResult];
};

//letter_id로 유서 가져오기 (다른 사람 유서보기)
export const select_letterid_Letter = async (connection, params) => {
    const show_query = `SELECT title,content,createdAt FROM Letter WHERE letter_id=?`;

    const [showResult] = await connection.query(show_query, params);

    return [showResult];
};

export const update_modify_isShare=async(connection,params)=>{
    const update_query=`UPDATE hackathon.Letter SET isShare = ? WHERE user_id = ?; `

    const [updateResult] = await connection.query(update_query, params);

    return [updateResult];
}

export const update_modify_content=async(connection,params)=>{
    const update_query=`UPDATE hackathon.Letter SET title=?, content=?, createdAt=? WHERE user_id = ?; `

    const [updateResult] = await connection.query(update_query, params);

    return [updateResult];
}