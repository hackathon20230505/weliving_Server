const today = new Date();

// 현재 시간을 얻고 날짜 형식으로 저장
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');
const hours = String(today.getHours()).padStart(2, '0');
const minutes = String(today.getMinutes()).padStart(2, '0');
const seconds = String(today.getSeconds()).padStart(2, '0');

export let formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;