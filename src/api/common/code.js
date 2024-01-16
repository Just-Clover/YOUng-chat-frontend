const errors = () => [
    // 글로벌 1000번대
    {code: 1000, message: "알 수 없는 에러가 발생했습니다."},
    {code: 1001, message: "접근 권한이 없습니다."},
    {code: 1002, message: "입력값이 올바르지 않습니다."},
    {code: 1003, message: "해당 파일을 찾을 수 없습니다."},
    {code: 1004, message: "지원하지 않는 파일 형식 입니다."},

    // 유저 2000번대
    {code: 2000, message: "중복된 Email 이 존재합니다"},
    {code: 2001, message: "존재하지 않는 사용자 입니다."},
    {code: 2002, message: "기존 비밀번호가 일치하지 않습니다."},
    {code: 2003, message: "변경된 비밀번호와 확인 비밀번호가 일치하지 않습니다."},
    {code: 2004, message: "이전 비밀번호와 같습니다."},
    {code: 2005, message: "해당 이메일을 찾을 수 없습니다."},
    {code: 2006, message: "이메일 전송에 실패했습니다."},
    {code: 2007, message: "인증번호 코드가 일치하지 않습니다"},
    {code: 2008, message: "인증되지 않은 이메일입니다."},

    // 채팅방 3000번대
    {code: 3000, message: "존재하지 않는 채팅방 입니다."},
    {code: 3001, message: "채팅방의 멤버만 접근할 수 있습니다"},

    // 채팅 4000번대
    {code: 4000, message: "채팅을 찾을 수 없습니다."},

    // 친구 5000번대
    {code: 5000, message: "친구를 찾을 수 없습니다."}
];

export default errors
