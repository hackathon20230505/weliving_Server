//추억 카드 작성
export const insert_memory = async (connection, params) => {
    const create_query = `INSERT INTO Memory (content, user_id) VALUES (?, ?)`;
    const select_memory_query = `SELECT memory_id FROM Memory WHERE user_id=?`;
    const letter_update_query=`UPDATE Letter SET memory_id = ? WHERE user_id=?`;


    let create_param=[];
    create_param.push(params[0][0].toString());
    create_param.push(params[0][1]);

    //Memory table에 추억카드 작성
    await connection.query(create_query, create_param);

    //memory_id 불러오기
    const [data]=await connection.query(select_memory_query,params[0][1]);

    //Letter table에 memory_id 추가하기
    await connection.query(letter_update_query,[data[0].memory_id,params[0][1]]);

    return;
};

//user_id로 추억 카드 가져오기 (내 추억 카드 보기)
export const select_userid_Memory = async (connection, params) => {
    const show_query = `SELECT content FROM Memory WHERE user_id = ? `;

    const [showResult] = await connection.query(show_query, params);

    return [showResult];
};

//letter_id로 추억 카드 가져오기 (다른 사람 추억 카드 보기)
export const select_letterid_Memory = async (connection, params) => {
    const get_memoryid_query=`SELECT memory_id FROM hackathon.Letter WHERE letter_id=?`;

    const show_query = `SELECT content FROM Memory WHERE memory_id=?`;

    const [data] = await connection.query(get_memoryid_query, params);
    const [showResult] = await connection.query(show_query, data[0].memory_id);

    return [showResult];
};
