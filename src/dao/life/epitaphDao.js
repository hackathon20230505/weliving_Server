//묘비명 저장
export const insert_epitaph = async(connection, params) => {
    const create_query = `UPDATE Letter SET epitaph = ? WHERE user_id = ?;`;
    const get_query=`SELECT letter_id FROM Letter WHERE user_id = ?;`;
    
    await connection.query(create_query, params);
    const [createResult] = await connection.query(get_query, params[1]);

    return [createResult];
};


//묘비명 불러오기
export const select_epitaph = async (connection, params) => {
    const show_query = `SELECT epitaph FROM Letter WHERE user_id = ? `;

    const [showResult] = await connection.query(show_query, params);

    return [showResult];
};
