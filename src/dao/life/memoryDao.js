//추억 카드 작성
export const insert_memory = async (connection, params) => {
    const create_query = `INSERT INTO Memory (content, user_id,letter_id) VALUES (?, ?,?)`;
    const letter_query = `SELECT letter_id FROM Letter WHERE user_id=?`;

    const [res] = await connection.query(letter_query, params[1]);

    let create_param=[];
    create_param.push(params[0][0]);
    create_param.push(params[0][1]);
    create_param.push(res[0].letter_id);

    console.log(create_param);
    await connection.query(create_query, create_param);

    return [res[0].letter_id];
};

//user_id로 추억 카드 가져오기 (내 추억 카드 보기)
export const select_userid_Memory = async (connection, params) => {
    const show_query = `SELECT content FROM Memory WHERE user_id = ? `;

    const [showResult] = await connection.query(show_query, params);

    return [showResult];
};

//letter_id로 추억 카드 가져오기 (다른 사람 추억 카드 보기)
export const select_letterid_Memory = async (connection, params) => {
    const show_query = `SELECT content FROM Memory WHERE letter_id=?`;

    const [showResult] = await connection.query(show_query, params);

    return [showResult];
};
